'use client';

import { useEffect, useState } from 'react';
import { CircleAlert, Inbox, MessageSquareText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ContactForm from '@/components/Molecules/ContactForm';
import { OwnContactMessageCard } from '@/components/Molecules/OwnContactMessageCard';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import { SectionEmptyState } from '@/components/shared/SectionEmptyState';
import {
  ContactMessage,
  contactMessageLimit,
  isValidContactMessageText,
} from '@/lib/contact-message-utils';

type PublicContactMessagesProps = {
  isDark: boolean;
};

type PublicMessageFeedback = {
  message: string;
  title: string;
  type: 'success' | 'error';
};

const OwnMessagesSkeleton = ({ isDark, label }: { isDark: boolean; label: string }) => (
  <div
    role='status'
    aria-label={label}
    className='mt-5 space-y-3'
  >
    {[0, 1].map((item) => (
      <div
        key={item}
        className={`h-28 animate-pulse rounded-lg border ${
          isDark ? 'border-gray-800 bg-gray-900/40' : 'border-gray-200 bg-white/40'
        }`}
      />
    ))}
  </div>
);

export const PublicContactMessages = ({ isDark }: PublicContactMessagesProps) => {
  const t = useTranslations('ContactPage.ownMessages');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);
  const [feedback, setFeedback] = useState<PublicMessageFeedback | null>(null);
  const [updatingMessageId, setUpdatingMessageId] = useState('');
  const [deletingMessageId, setDeletingMessageId] = useState('');

  useEffect(() => {
    let isCancelled = false;
    let unsubscribe: (() => void) | undefined;

    const initializeMessages = async () => {
      try {
        const {
          ensurePublicContactUser,
          subscribeToOwnContactMessages,
        } = await import('@/lib/contact-messages');
        const user = await ensurePublicContactUser();

        if (isCancelled) {
          return;
        }

        unsubscribe = subscribeToOwnContactMessages(
          user.uid,
          (nextMessages) => {
            if (!isCancelled) {
              setMessages(nextMessages);
              setHasLoadError(false);
              setIsLoading(false);
            }
          },
          () => {
            if (!isCancelled) {
              setHasLoadError(true);
              setIsLoading(false);
            }
          },
        );
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Failed to initialize the public contact message session.', error);
        }

        if (!isCancelled) {
          setHasLoadError(true);
          setIsLoading(false);
        }
      }
    };

    void initializeMessages();

    return () => {
      isCancelled = true;
      unsubscribe?.();
    };
  }, []);

  const updateMessage = async (messageId: string, message: string) => {
    setFeedback(null);

    if (!isValidContactMessageText(message)) {
      setFeedback({
        message: t('validation'),
        title: t('updateErrorTitle'),
        type: 'error',
      });
      return false;
    }

    setUpdatingMessageId(messageId);

    try {
      const { updateOwnContactMessage } = await import('@/lib/contact-messages');
      await updateOwnContactMessage(messageId, message);
      setFeedback({
        message: t('updateSuccess'),
        title: t('updateSuccessTitle'),
        type: 'success',
      });
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to update the public contact message.', error);
      }

      setFeedback({
        message: t('updateError'),
        title: t('updateErrorTitle'),
        type: 'error',
      });
      return false;
    } finally {
      setUpdatingMessageId('');
    }
  };

  const deleteMessage = async (messageId: string) => {
    setFeedback(null);
    setDeletingMessageId(messageId);

    try {
      const { deleteOwnContactMessage } = await import('@/lib/contact-messages');
      await deleteOwnContactMessage(messageId);
      setFeedback({
        message: t('deleteSuccess'),
        title: t('deleteSuccessTitle'),
        type: 'success',
      });
      return true;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to delete the public contact message.', error);
      }

      setFeedback({
        message: t('deleteError'),
        title: t('deleteErrorTitle'),
        type: 'error',
      });
      return false;
    } finally {
      setDeletingMessageId('');
    }
  };

  const isSessionReady = !isLoading && !hasLoadError;

  return (
    <>
      {feedback && (
        <FloatingMessage
          key={`${feedback.type}-${feedback.message}`}
          closeLabel={t('closeMessage')}
          message={feedback.message}
          onClose={() => setFeedback(null)}
          title={feedback.title}
          type={feedback.type}
        />
      )}

      <ContactForm
        isDark={isDark}
        isSessionReady={isSessionReady}
        messageCount={messages.length}
      />

      <section
        aria-labelledby='own-contact-messages-title'
        className={`mt-7 border-t pt-6 ${isDark ? 'border-gray-700/50' : 'border-gray-300/70'}`}
      >
        <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
          <div className='flex items-start gap-3'>
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${isDark ? 'bg-blue-400/10 text-blue-300' : 'bg-blue-500/10 text-blue-600'}`}>
              <MessageSquareText aria-hidden='true' size={20} />
            </div>
            <div>
              <h2
                id='own-contact-messages-title'
                className={`text-lg font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
              >
                {t('title')}
              </h2>
              <p className={`mt-1 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {t('description')}
              </p>
            </div>
          </div>
          <span
            aria-live='polite'
            className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              isDark
                ? 'border-blue-400/20 bg-blue-500/10 text-blue-200'
                : 'border-blue-500/20 bg-blue-50 text-blue-700'
            }`}
          >
            {t('summary', { count: messages.length, limit: contactMessageLimit })}
          </span>
        </div>

        {isLoading ? (
          <OwnMessagesSkeleton isDark={isDark} label={t('loading')} />
        ) : hasLoadError ? (
          <div className='mt-5'>
            <SectionEmptyState
              description={t('loadErrorDescription')}
              icon={CircleAlert}
              isDark={isDark}
              title={t('loadErrorTitle')}
            />
          </div>
        ) : messages.length === 0 ? (
          <div className='mt-5'>
            <SectionEmptyState
              description={t('emptyDescription')}
              icon={Inbox}
              isDark={isDark}
              title={t('emptyTitle')}
            />
          </div>
        ) : (
          <div className='mt-5 space-y-3'>
            {messages.map((message) => (
              <OwnContactMessageCard
                key={message.id}
                isDark={isDark}
                isDeleting={deletingMessageId === message.id}
                isUpdating={updatingMessageId === message.id}
                message={message}
                onDelete={deleteMessage}
                onUpdate={updateMessage}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
};
