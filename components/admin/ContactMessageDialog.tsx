'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, Mail, MailOpen, Trash2, X } from 'lucide-react';
import { ContactMessage } from '@/lib/contact-messages';

type ContactMessageDialogProps = {
  isDark: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  message: ContactMessage | null;
  onClose: () => void;
  onDelete: () => void;
  onToggleRead: () => void;
};

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'full',
  timeStyle: 'short',
});

const formatMessageDate = (message: ContactMessage) => {
  return message.createdAt ? dateFormatter.format(message.createdAt.toDate()) : 'Baru saja';
};

export const ContactMessageDialog = ({
  isDark,
  isDeleting,
  isUpdating,
  message,
  onClose,
  onDelete,
  onToggleRead,
}: ContactMessageDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (message && dialog && !dialog.open) {
      dialog.showModal();
    }

    if (!message && dialog?.open) {
      dialog.close();
    }
  }, [message]);

  useEffect(() => {
    setIsConfirmingDelete(false);
  }, [message?.id]);

  const closeDialog = () => {
    if (!isDeleting && !isUpdating) {
      dialogRef.current?.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby='contact-message-title'
      onCancel={(event) => {
        if (isDeleting || isUpdating) {
          event.preventDefault();
        }
      }}
      onClose={onClose}
      className='m-auto w-[calc(100%-2rem)] max-w-2xl bg-transparent p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm'
    >
      {message && (
        <div className={`max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl border shadow-2xl ${isDark ? 'border-gray-700 bg-gray-950 text-gray-100' : 'border-gray-300 bg-white text-gray-900'}`}>
          <div className={`sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-5 py-4 backdrop-blur-xl md:px-6 ${isDark ? 'border-gray-800 bg-gray-950/95' : 'border-gray-200 bg-white/95'}`}>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${message.status === 'unread' ? (isDark ? 'border-blue-400/30 bg-blue-500/10 text-blue-200' : 'border-blue-500/30 bg-blue-50 text-blue-700') : (isDark ? 'border-gray-700 bg-gray-900 text-gray-400' : 'border-gray-300 bg-gray-100 text-gray-600')}`}>
                  {message.status === 'unread' ? 'Belum dibaca' : 'Sudah dibaca'}
                </span>
                <span className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                  Form {message.locale}
                </span>
              </div>
              <h2
                id='contact-message-title'
                className='mt-3 break-words text-xl font-semibold md:text-2xl'
              >
                {message.subject}
              </h2>
            </div>
            <button
              type='button'
              autoFocus
              aria-label='Tutup detail pesan'
              onClick={closeDialog}
              className={`shrink-0 rounded-lg border p-2 transition ${isDark ? 'border-gray-800 text-gray-400 hover:bg-white/10 hover:text-white' : 'border-gray-200 text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <X size={18} />
            </button>
          </div>

          <div className='space-y-6 p-5 md:p-6'>
            <dl className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div>
                <dt className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Pengirim</dt>
                <dd className='mt-1 break-words font-semibold'>{message.name}</dd>
              </div>
              <div>
                <dt className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Diterima</dt>
                <dd className='mt-1 text-sm'>{formatMessageDate(message)}</dd>
              </div>
              <div className='sm:col-span-2'>
                <dt className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Email</dt>
                <dd className='mt-1'>
                  <a
                    href={`mailto:${message.email}`}
                    className='inline-flex items-center gap-2 break-all text-blue-500 transition hover:text-blue-400 hover:underline'
                  >
                    <Mail
                      aria-hidden='true'
                      className='shrink-0'
                      size={16}
                    />
                    {message.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className={`border-t pt-5 ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
              <p className={`text-xs font-semibold uppercase ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Isi pesan</p>
              <p className='mt-3 whitespace-pre-wrap break-words text-sm leading-7'>{message.message}</p>
            </div>

            {isConfirmingDelete ? (
              <div className={`border-t pt-5 ${isDark ? 'border-red-400/20' : 'border-red-200'}`}>
                <p className='font-semibold text-red-500'>Hapus pesan ini secara permanen?</p>
                <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Tindakan ini tidak dapat dibatalkan.</p>
                <div className='mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
                  <button
                    type='button'
                    disabled={isDeleting}
                    onClick={() => setIsConfirmingDelete(false)}
                    className={`inline-flex min-h-11 items-center justify-center rounded-lg border px-4 text-sm font-semibold transition disabled:opacity-60 ${isDark ? 'border-gray-700 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'}`}
                  >
                    Batal
                  </button>
                  <button
                    type='button'
                    disabled={isDeleting}
                    onClick={onDelete}
                    className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    {isDeleting ? <Loader2 className='animate-spin' size={17} /> : <Trash2 size={17} />}
                    Hapus permanen
                  </button>
                </div>
              </div>
            ) : (
              <div className={`flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-between ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <button
                  type='button'
                  disabled={isUpdating}
                  onClick={onToggleRead}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20' : 'border-blue-500/20 bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
                >
                  {isUpdating ? (
                    <Loader2 className='animate-spin' size={17} />
                  ) : message.status === 'read' ? (
                    <Mail size={17} />
                  ) : (
                    <MailOpen size={17} />
                  )}
                  {message.status === 'read' ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
                </button>
                <button
                  type='button'
                  disabled={isUpdating}
                  onClick={() => setIsConfirmingDelete(true)}
                  className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${isDark ? 'border-red-400/20 bg-red-500/10 text-red-200 hover:bg-red-500/20' : 'border-red-500/20 bg-red-50 text-red-700 hover:bg-red-100'}`}
                >
                  <Trash2 size={17} />
                  Hapus pesan
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
};
