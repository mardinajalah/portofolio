'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Mail, MailOpen } from 'lucide-react';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { ContactMessageDialog } from '@/components/admin/ContactMessageDialog';
import { SkeletonAdminDataTable } from '@/components/Molecules/Skeleton';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import {
  ContactMessage,
  ContactMessageStatus,
  deleteContactMessage,
  setContactMessageStatus,
  subscribeToContactMessages,
} from '@/lib/contact-messages';

type AdminContactMessagesProps = {
  isDark: boolean;
};

type InboxFeedback = {
  message: string;
  title: string;
  type: 'success' | 'error';
};

const tableDateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

const formatTableDate = (message: ContactMessage) => {
  return message.createdAt ? tableDateFormatter.format(message.createdAt.toDate()) : 'Baru saja';
};

export const AdminContactMessages = ({ isDark }: AdminContactMessagesProps) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [feedback, setFeedback] = useState<InboxFeedback | null>(null);
  const [selectedMessageId, setSelectedMessageId] = useState('');
  const [updatingMessageId, setUpdatingMessageId] = useState('');
  const [deletingMessageId, setDeletingMessageId] = useState('');

  useEffect(() => {
    const unsubscribe = subscribeToContactMessages(
      (nextMessages) => {
        setMessages(nextMessages);
        setLoadError('');
        setIsLoading(false);
      },
      () => {
        setLoadError('Pesan masuk tidak dapat dimuat. Pastikan akun admin dan Firestore rules sudah sesuai.');
        setFeedback({
          message: 'Pesan masuk tidak dapat dimuat. Pastikan akun admin dan Firestore rules sudah sesuai.',
          title: 'Gagal memuat inbox',
          type: 'error',
        });
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const selectedMessage = useMemo(
    () => messages.find((message) => message.id === selectedMessageId) ?? null,
    [messages, selectedMessageId],
  );

  const updateMessageStatus = useCallback(async (
    message: ContactMessage,
    status: ContactMessageStatus,
  ) => {
    setFeedback(null);
    setUpdatingMessageId(message.id);

    try {
      await setContactMessageStatus(message.id, status);
      setFeedback({
        message: status === 'read' ? 'Pesan ditandai sudah dibaca.' : 'Pesan ditandai belum dibaca.',
        title: 'Status diperbarui',
        type: 'success',
      });
    } catch {
      setFeedback({
        message: 'Status pesan gagal diperbarui. Silakan coba lagi.',
        title: 'Gagal memperbarui',
        type: 'error',
      });
    } finally {
      setUpdatingMessageId('');
    }
  }, []);

  const openMessage = useCallback((message: ContactMessage) => {
    setSelectedMessageId(message.id);

    if (message.status === 'unread') {
      void updateMessageStatus(message, 'read');
    }
  }, [updateMessageStatus]);

  const toggleSelectedMessageStatus = () => {
    if (selectedMessage) {
      void updateMessageStatus(
        selectedMessage,
        selectedMessage.status === 'read' ? 'unread' : 'read',
      );
    }
  };

  const removeSelectedMessage = async () => {
    if (!selectedMessage) {
      return;
    }

    setFeedback(null);
    setDeletingMessageId(selectedMessage.id);

    try {
      await deleteContactMessage(selectedMessage.id);
      setSelectedMessageId('');
      setFeedback({
        message: 'Pesan berhasil dihapus dari inbox.',
        title: 'Pesan dihapus',
        type: 'success',
      });
    } catch {
      setFeedback({
        message: 'Pesan gagal dihapus. Silakan coba lagi.',
        title: 'Gagal menghapus',
        type: 'error',
      });
    } finally {
      setDeletingMessageId('');
    }
  };

  const columns = useMemo<ColumnDef<ContactMessage>[]>(
    () => [
      {
        id: 'status',
        accessorFn: (message) => message.status,
        header: 'Status',
        size: 128,
        cell: ({ row }) => {
          const isUnread = row.original.status === 'unread';

          return (
            <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${isUnread ? (isDark ? 'border-blue-400/30 bg-blue-500/10 text-blue-200' : 'border-blue-500/30 bg-blue-50 text-blue-700') : (isDark ? 'border-gray-700 bg-gray-900 text-gray-400' : 'border-gray-300 bg-white/60 text-gray-600')}`}>
              {isUnread ? <Mail size={14} /> : <MailOpen size={14} />}
              {isUnread ? 'Baru' : 'Dibaca'}
            </span>
          );
        },
      },
      {
        id: 'createdAt',
        accessorFn: (message) => message.createdAt?.toMillis() ?? 0,
        header: 'Diterima',
        size: 180,
        cell: ({ row }) => (
          <time
            dateTime={row.original.createdAt?.toDate().toISOString()}
            className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
          >
            {formatTableDate(row.original)}
          </time>
        ),
      },
      {
        id: 'sender',
        accessorFn: (message) => message.name,
        header: 'Pengirim',
        size: 220,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p className={`truncate font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>{row.original.name}</p>
            <p
              title={row.original.email}
              className={`mt-1 truncate text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}
            >
              {row.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'subject',
        header: 'Subjek',
        size: 230,
        cell: ({ row }) => (
          <p
            title={row.original.subject}
            className={`truncate font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}
          >
            {row.original.subject}
          </p>
        ),
      },
      {
        accessorKey: 'message',
        header: 'Preview Pesan',
        size: 300,
        cell: ({ row }) => (
          <p
            title={row.original.message}
            className={`line-clamp-2 leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            {row.original.message}
          </p>
        ),
      },
      {
        id: 'actions',
        header: 'Aksi',
        size: 118,
        enableSorting: false,
        cell: ({ row }) => (
          <button
            type='button'
            aria-label={`Lihat pesan dari ${row.original.name}`}
            onClick={() => openMessage(row.original)}
            className={`inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100 hover:bg-blue-500/20' : 'border-blue-500/20 bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            <Eye size={16} />
            Lihat
          </button>
        ),
      },
    ],
    [isDark, openMessage],
  );

  const unreadCount = messages.filter((message) => message.status === 'unread').length;

  return (
    <>
      {feedback && (
        <FloatingMessage
          key={`${feedback.type}-${feedback.message}`}
          message={feedback.message}
          onClose={() => setFeedback(null)}
          title={feedback.title}
          type={feedback.type}
        />
      )}

      {isLoading ? (
        <SkeletonAdminDataTable
          columns={6}
          isDark={isDark}
          rows={4}
          showAction={false}
        />
      ) : (
        <AdminDataTable
          columns={columns}
          data={messages}
          emptyMessage={loadError || 'Belum ada pesan masuk.'}
          isDark={isDark}
          minWidthClassName='min-w-295'
          summary={`${messages.length} pesan tersimpan, ${unreadCount} belum dibaca`}
          title='Pesan Masuk'
        />
      )}

      <ContactMessageDialog
        isDark={isDark}
        isDeleting={deletingMessageId === selectedMessage?.id}
        isUpdating={updatingMessageId === selectedMessage?.id}
        message={selectedMessage}
        onClose={() => setSelectedMessageId('')}
        onDelete={() => void removeSelectedMessage()}
        onToggleRead={toggleSelectedMessageStatus}
      />
    </>
  );
};
