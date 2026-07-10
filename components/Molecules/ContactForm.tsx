'use client';

import { FormEvent, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import {
  ContactMessageInput,
  contactMessageLimit,
  contactMessageLimitErrorCode,
  contactMessageLimits,
  isValidContactMessageInput,
} from '@/lib/contact-message-utils';

interface ContactFormProps {
  isDark: boolean;
  isSessionReady: boolean;
  messageCount: number;
}

type FormFeedback = {
  message: string;
  title: string;
  type: 'success' | 'error';
};

const contactMessageCooldownKey = 'portfolio-contact-message-last-sent';
const contactMessageCooldownMs = 60_000;

const ContactForm = ({ isDark, isSessionReady, messageCount }: ContactFormProps) => {
  const t = useTranslations('ContactPage.form');
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FormFeedback | null>(null);
  const hasReachedLimit = messageCount >= contactMessageLimit;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setFeedback(null);

    if (!isSessionReady) {
      setFeedback({
        message: t('sessionUnavailable'),
        title: t('errorTitle'),
        type: 'error',
      });
      return;
    }

    if (hasReachedLimit) {
      setFeedback({
        message: t('limitReached'),
        title: t('errorTitle'),
        type: 'error',
      });
      return;
    }

    const lastSubmittedAt = Number(window.localStorage.getItem(contactMessageCooldownKey) ?? 0);
    const remainingCooldown = contactMessageCooldownMs - (Date.now() - lastSubmittedAt);

    if (remainingCooldown > 0) {
      setFeedback({
        message: t('cooldown', { seconds: Math.ceil(remainingCooldown / 1000) }),
        title: t('errorTitle'),
        type: 'error',
      });
      return;
    }

    const messageInput: ContactMessageInput = {
      name: String(formData.get('name') ?? ''),
      email: String(formData.get('email') ?? ''),
      subject: String(formData.get('subject') ?? ''),
      message: String(formData.get('message') ?? ''),
      locale: locale === 'en' ? 'en' : 'id',
    };

    if (!isValidContactMessageInput(messageInput)) {
      setFeedback({
        message: t('validation'),
        title: t('errorTitle'),
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { submitContactMessage } = await import('@/lib/contact-messages');
      const messageId = await submitContactMessage(messageInput);

      if (!messageId) {
        throw new Error('CONTACT_MESSAGE_ID_MISSING');
      }

      window.localStorage.setItem(contactMessageCooldownKey, String(Date.now()));
      form.reset();
      setFeedback({
        message: t('success'),
        title: t('successTitle'),
        type: 'success',
      });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Failed to submit contact message to Firestore.', error);
      }

      setFeedback({
        message: error instanceof Error && error.message === contactMessageLimitErrorCode
          ? t('limitReached')
          : t('error'),
        title: t('errorTitle'),
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = `
    w-full px-4 py-3 rounded-lg outline-none border transition
    ${isDark ? 'bg-gray-900/30 border-gray-700/60 focus:border-blue-400 placeholder:text-gray-500' : 'bg-white/40 border-white/50 focus:border-blue-500 placeholder:text-gray-500'}
  `;

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

      <form
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className={`
          p-5 rounded-xl backdrop-blur-xl border shadow-md
          ${isDark ? 'bg-gray-800/20 border-gray-700/40' : 'bg-white/20 border-white/30'}
        `}
      >
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          <div>
            <label
              htmlFor='name'
              className='text-sm font-semibold'
            >
              {t('name')}
            </label>
            <input
              id='name'
              name='name'
              type='text'
              required
              minLength={contactMessageLimits.name.min}
              maxLength={contactMessageLimits.name.max}
              autoComplete='name'
              placeholder={t('namePlaceholder')}
              className={`${inputClassName} mt-2`}
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='text-sm font-semibold'
            >
              {t('email')}
            </label>
            <input
              id='email'
              name='email'
              type='email'
              required
              maxLength={contactMessageLimits.email.max}
              autoComplete='email'
              placeholder={t('emailPlaceholder')}
              className={`${inputClassName} mt-2`}
            />
          </div>
        </div>

      <div className='mt-4'>
        <label
          htmlFor='subject'
          className='text-sm font-semibold'
        >
          {t('subject')}
        </label>
        <input
          id='subject'
          name='subject'
          type='text'
          required
          minLength={contactMessageLimits.subject.min}
          maxLength={contactMessageLimits.subject.max}
          placeholder={t('subjectPlaceholder')}
          className={`${inputClassName} mt-2`}
        />
      </div>

      <div className='mt-4'>
        <label
          htmlFor='message'
          className='text-sm font-semibold'
        >
          {t('message')}
        </label>
        <textarea
          id='message'
          name='message'
          rows={6}
          required
          minLength={contactMessageLimits.message.min}
          maxLength={contactMessageLimits.message.max}
          placeholder={t('messagePlaceholder')}
          className={`${inputClassName} mt-2 resize-none`}
        />
      </div>

      <div className='mt-5 flex flex-col sm:flex-row sm:items-center gap-3'>
        <button
          type='submit'
          disabled={isSubmitting || !isSessionReady || hasReachedLimit}
          className='w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-65'
        >
          {isSubmitting ? (
            <Loader2
              className='animate-spin'
              size={18}
            />
          ) : (
            <Send size={18} />
          )}
          {isSubmitting ? t('sending') : !isSessionReady ? t('preparing') : t('send')}
        </button>
      </div>
      {hasReachedLimit && (
        <p
          role='status'
          className={`mt-3 text-sm ${isDark ? 'text-amber-300' : 'text-amber-700'}`}
        >
          {t('limitReached')}
        </p>
      )}
      </form>
    </>
  );
};

export default ContactForm;
