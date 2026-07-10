import {
  browserLocalPersistence,
  setPersistence,
  signInAnonymously,
  type User,
} from 'firebase/auth';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  getFirebaseDb,
  getPublicContactFirebaseAuth,
  getPublicContactFirebaseDb,
} from '@/lib/firebase/client';
import {
  ContactMessage,
  ContactMessageLocale,
  ContactMessageInput,
  ContactMessageStatus,
  contactMessageLimit,
  contactMessageLimitErrorCode,
  contactMessageOwnershipErrorCode,
  isValidContactMessageText,
  isValidContactMessageInput,
  normalizeContactMessageText,
  normalizeContactMessageInput,
} from '@/lib/contact-message-utils';

export type {
  ContactMessage,
  ContactMessageInput,
  ContactMessageLocale,
  ContactMessageStatus,
} from '@/lib/contact-message-utils';

const contactMessagesCollection = 'contactMessages';
const contactMessageSlotIds = Array.from(
  { length: contactMessageLimit },
  (_, index) => `slot_${index + 1}`,
);

let publicContactUserPromise: Promise<User> | null = null;

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const asLocale = (value: unknown): ContactMessageLocale => (value === 'en' ? 'en' : 'id');

const asStatus = (value: unknown): ContactMessageStatus => (value === 'read' ? 'read' : 'unread');

const asTimestamp = (value: unknown) => (value instanceof Timestamp ? value : null);

const getContactMessageId = (ownerId: string, slotId: string) => `${ownerId}__${slotId}`;

const isContactMessageOwnedBy = (messageId: string, ownerId: string) => {
  return contactMessageSlotIds.some((slotId) => messageId === getContactMessageId(ownerId, slotId));
};

const asContactMessage = (id: string, data: Record<string, unknown>): ContactMessage => ({
  id,
  ownerId: asString(data.ownerId),
  name: asString(data.name),
  email: asString(data.email),
  subject: asString(data.subject),
  message: asString(data.message),
  locale: asLocale(data.locale),
  status: asStatus(data.status),
  createdAt: asTimestamp(data.createdAt),
  updatedAt: asTimestamp(data.updatedAt),
  readAt: asTimestamp(data.readAt),
});

const sortContactMessages = (messages: ContactMessage[]) => {
  return [...messages].sort((firstMessage, secondMessage) => {
    return (secondMessage.createdAt?.toMillis() ?? 0) - (firstMessage.createdAt?.toMillis() ?? 0);
  });
};

export const ensurePublicContactUser = async (): Promise<User> => {
  if (!publicContactUserPromise) {
    publicContactUserPromise = (async () => {
      const auth = getPublicContactFirebaseAuth();

      await auth.authStateReady();

      if (auth.currentUser) {
        return auth.currentUser;
      }

      await setPersistence(auth, browserLocalPersistence);

      return (await signInAnonymously(auth)).user;
    })().finally(() => {
      publicContactUserPromise = null;
    });
  }

  return publicContactUserPromise;
};

export const submitContactMessage = async (input: ContactMessageInput): Promise<string> => {
  const normalizedInput = normalizeContactMessageInput(input);

  if (!isValidContactMessageInput(normalizedInput)) {
    throw new Error('INVALID_CONTACT_MESSAGE');
  }

  const user = await ensurePublicContactUser();
  const db = getPublicContactFirebaseDb();
  const messageReferences = contactMessageSlotIds.map((slotId) => (
    doc(db, contactMessagesCollection, getContactMessageId(user.uid, slotId))
  ));

  return runTransaction(db, async (transaction) => {
    const messageSnapshots = [];

    for (const messageReference of messageReferences) {
      messageSnapshots.push(await transaction.get(messageReference));
    }

    const availableSlotIndex = messageSnapshots.findIndex((snapshot) => !snapshot.exists());

    if (availableSlotIndex === -1) {
      throw new Error(contactMessageLimitErrorCode);
    }

    const availableMessageReference = messageReferences[availableSlotIndex];

    transaction.set(availableMessageReference, {
      ...normalizedInput,
      ownerId: user.uid,
      status: 'unread',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      readAt: null,
    });

    return availableMessageReference.id;
  });
};

export const subscribeToOwnContactMessages = (
  ownerId: string,
  onMessages: (messages: ContactMessage[]) => void,
  onError: (error: Error) => void,
) => {
  const messagesQuery = query(
    collection(getPublicContactFirebaseDb(), contactMessagesCollection),
    where('ownerId', '==', ownerId),
  );

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      onMessages(sortContactMessages(snapshot.docs.map((messageDocument) => (
        asContactMessage(messageDocument.id, messageDocument.data())
      ))));
    },
    (error) => onError(error),
  );
};

export const updateOwnContactMessage = async (messageId: string, message: string) => {
  const normalizedMessage = normalizeContactMessageText(message);

  if (!isValidContactMessageText(normalizedMessage)) {
    throw new Error('INVALID_CONTACT_MESSAGE');
  }

  const user = await ensurePublicContactUser();

  if (!isContactMessageOwnedBy(messageId, user.uid)) {
    throw new Error(contactMessageOwnershipErrorCode);
  }

  await updateDoc(doc(getPublicContactFirebaseDb(), contactMessagesCollection, messageId), {
    message: normalizedMessage,
    status: 'unread',
    updatedAt: serverTimestamp(),
    readAt: null,
  });
};

export const deleteOwnContactMessage = async (messageId: string) => {
  const user = await ensurePublicContactUser();

  if (!isContactMessageOwnedBy(messageId, user.uid)) {
    throw new Error(contactMessageOwnershipErrorCode);
  }

  await deleteDoc(doc(getPublicContactFirebaseDb(), contactMessagesCollection, messageId));
};

export const subscribeToContactMessages = (
  onMessages: (messages: ContactMessage[]) => void,
  onError: (error: Error) => void,
) => {
  const messagesQuery = query(
    collection(getFirebaseDb(), contactMessagesCollection),
    orderBy('createdAt', 'desc'),
  );

  return onSnapshot(
    messagesQuery,
    (snapshot) => {
      const messages = snapshot.docs.map((messageDocument) => {
        return asContactMessage(messageDocument.id, messageDocument.data());
      });

      onMessages(messages);
    },
    (error) => onError(error),
  );
};

export const setContactMessageStatus = async (
  messageId: string,
  status: ContactMessageStatus,
) => {
  await updateDoc(doc(getFirebaseDb(), contactMessagesCollection, messageId), {
    status,
    readAt: status === 'read' ? serverTimestamp() : null,
  });
};

export const deleteContactMessage = async (messageId: string) => {
  await deleteDoc(doc(getFirebaseDb(), contactMessagesCollection, messageId));
};
