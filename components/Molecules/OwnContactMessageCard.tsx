'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Check, Loader2, Pencil, Trash2, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import {
  ContactMessage,
  contactMessageLimits,
  isValidContactMessageText,
  normalizeContactMessageText,
} from '@/lib/contact-message-utils';

type OwnContactMessageCardProps = {
  isDark: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  message: ContactMessage;
  onDelete: (messageId: string) => Promise<boolean>;
  onUpdate: (messageId: string, message: string) => Promise<boolean>;
};

export const OwnContactMessageCard = ({
  isDark,
  isDeleting,
  isUpdating,
  message,
  onDelete,
  onUpdate,
}: OwnContactMessageCardProps) => {
  const t = useTranslations('ContactPage.ownMessages');
  const locale = useLocale();
  const [draftMessage, setDraftMessage] = useState(message.message);
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const normalizedDraftMessage = normalizeContactMessageText(draftMessage);
  const isDraftValid = isValidContactMessageText(draftMessage);
  const isDraftUnchanged = normalizedDraftMessage === message.message;
  const wasEdited = Boolean(
    message.updatedAt
    && message.createdAt
    && message.updatedAt.toMillis() > message.createdAt.toMillis(),
  );
  const displayedTimestamp = wasEdited ? message.updatedAt : message.createdAt;
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(
    locale === 'en' ? 'en-US' : 'id-ID',
    { dateStyle: 'medium', timeStyle: 'short' },
  ), [locale]);

  useEffect(() => {
    if (!isEditing) {
      setDraftMessage(message.message);
    }
  }, [isEditing, message.message]);

  const cancelEditing = () => {
    setDraftMessage(message.message);
    setIsEditing(false);
  };

  const saveMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isDraftValid || isDraftUnchanged) {
      return;
    }

    if (await onUpdate(message.id, draftMessage)) {
      setIsEditing(false);
    }
  };

  const deleteMessage = async () => {
    if (await onDelete(message.id)) {
      setIsConfirmingDelete(false);
    }
  };

  const timestampLabel = displayedTimestamp
    ? (wasEdited ? t('editedAt', { date: dateFormatter.format(displayedTimestamp.toDate()) }) : t('sentAt', { date: dateFormatter.format(displayedTimestamp.toDate()) }))
    : t('justNow');

  return (
    <article
      aria-busy={isDeleting || isUpdating}
      className={`rounded-lg border p-4 shadow-sm transition ${
        isDark
          ? 'border-gray-700/60 bg-gray-900/30'
          : 'border-gray-300/70 bg-white/30'
      }`}
    >
      <div className='flex items-start justify-between gap-3'>
        <time
          dateTime={displayedTimestamp?.toDate().toISOString()}
          className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {timestampLabel}
        </time>

        {!isEditing && !isConfirmingDelete && (
          <div className='flex shrink-0 items-center gap-2'>
            <button
              type='button'
              aria-label={t('edit')}
              title={t('edit')}
              disabled={isDeleting || isUpdating}
              onClick={() => setIsEditing(true)}
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? 'border-blue-400/20 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20'
                  : 'border-blue-500/20 bg-blue-50 text-blue-700 hover:bg-blue-100'
              }`}
            >
              <Pencil aria-hidden='true' size={17} />
            </button>
            <button
              type='button'
              aria-label={t('delete')}
              title={t('delete')}
              disabled={isDeleting || isUpdating}
              onClick={() => setIsConfirmingDelete(true)}
              className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                isDark
                  ? 'border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20'
                  : 'border-red-500/20 bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              <Trash2 aria-hidden='true' size={17} />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={saveMessage}
          className='mt-3'
        >
          <label
            htmlFor={`own-message-${message.id}`}
            className='sr-only'
          >
            {t('editLabel')}
          </label>
          <textarea
            id={`own-message-${message.id}`}
            autoFocus
            required
            rows={5}
            minLength={contactMessageLimits.message.min}
            maxLength={contactMessageLimits.message.max}
            value={draftMessage}
            onChange={(event) => setDraftMessage(event.target.value)}
            className={`w-full resize-y rounded-lg border px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500 ${
              isDark
                ? 'border-gray-700 bg-gray-950/60 text-gray-100'
                : 'border-gray-300 bg-white/60 text-gray-900'
            }`}
          />
          <div className='mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              {t('characters', { count: draftMessage.length, max: contactMessageLimits.message.max })}
            </span>
            <div className='flex gap-2'>
              <button
                type='button'
                disabled={isUpdating}
                onClick={cancelEditing}
                className={`inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:flex-none ${
                  isDark ? 'border-gray-700 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                }`}
              >
                <X aria-hidden='true' size={16} />
                {t('cancel')}
              </button>
              <button
                type='submit'
                disabled={isUpdating || !isDraftValid || isDraftUnchanged}
                className='inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-3 text-sm font-semibold text-white transition hover:bg-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none'
              >
                {isUpdating ? <Loader2 aria-hidden='true' className='animate-spin' size={16} /> : <Check aria-hidden='true' size={16} />}
                {isUpdating ? t('saving') : t('save')}
              </button>
            </div>
          </div>
        </form>
      ) : (
        <p className={`mt-3 whitespace-pre-wrap break-words text-sm leading-7 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
          {message.message}
        </p>
      )}

      {isConfirmingDelete && (
        <div
          role='alert'
          className={`mt-4 border-t pt-4 ${isDark ? 'border-red-400/20' : 'border-red-200'}`}
        >
          <p className='font-semibold text-red-500'>{t('confirmDelete')}</p>
          <p className={`mt-1 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t('confirmDeleteDescription')}
          </p>
          <div className='mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end'>
            <button
              type='button'
              disabled={isDeleting}
              onClick={() => setIsConfirmingDelete(false)}
              className={`inline-flex min-h-10 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 ${
                isDark ? 'border-gray-700 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {t('cancel')}
            </button>
            <button
              type='button'
              disabled={isDeleting}
              onClick={() => void deleteMessage()}
              className='inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-red-500 px-3 text-sm font-semibold text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isDeleting ? <Loader2 aria-hidden='true' className='animate-spin' size={16} /> : <Trash2 aria-hidden='true' size={16} />}
              {isDeleting ? t('deleting') : t('delete')}
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
