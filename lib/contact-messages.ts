import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase/client';
import {
  ContactMessage,
  ContactMessageLocale,
  ContactMessageInput,
  ContactMessageStatus,
  isValidContactMessageInput,
  normalizeContactMessageInput,
} from '@/lib/contact-message-utils';

export type {
  ContactMessage,
  ContactMessageInput,
  ContactMessageLocale,
  ContactMessageStatus,
} from '@/lib/contact-message-utils';

const contactMessagesCollection = 'contactMessages';

const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '');

const asLocale = (value: unknown): ContactMessageLocale => (value === 'en' ? 'en' : 'id');

const asStatus = (value: unknown): ContactMessageStatus => (value === 'read' ? 'read' : 'unread');

const asTimestamp = (value: unknown) => (value instanceof Timestamp ? value : null);

export const submitContactMessage = async (input: ContactMessageInput) => {
  const normalizedInput = normalizeContactMessageInput(input);

  if (!isValidContactMessageInput(normalizedInput)) {
    throw new Error('INVALID_CONTACT_MESSAGE');
  }

  return addDoc(collection(getFirebaseDb(), contactMessagesCollection), {
    ...normalizedInput,
    status: 'unread',
    createdAt: serverTimestamp(),
    readAt: null,
  });
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
        const data = messageDocument.data();

        return {
          id: messageDocument.id,
          name: asString(data.name),
          email: asString(data.email),
          subject: asString(data.subject),
          message: asString(data.message),
          locale: asLocale(data.locale),
          status: asStatus(data.status),
          createdAt: asTimestamp(data.createdAt),
          readAt: asTimestamp(data.readAt),
        } satisfies ContactMessage;
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
