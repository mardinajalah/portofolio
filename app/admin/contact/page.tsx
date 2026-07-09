'use client';

import { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import { AdminDataTable } from '@/components/admin/AdminDataTable';
import { SkeletonAdminDataTable } from '@/components/Molecules/Skeleton';
import { getContactInfo, saveContactInfo } from '@/lib/contact-info';
import { ContactCard, ContactInfo, contactIconOptions, fallbackContactInfo, sortContactCards } from '@/lib/contact-info-utils';

export const dynamic = 'force-dynamic';

const normalizeTableOrder = (cards: ContactCard[]) => {
  return sortContactCards(cards).map((card, index) => ({
    ...card,
    order: card.order || index + 1,
  }));
};

const iconLabels = Object.fromEntries(contactIconOptions.map((option) => [option.value, option.label]));

const AdminContactPage = () => {
  const router = useRouter();
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? 'dark') === 'dark';
  const [formData, setFormData] = useState<ContactInfo>(fallbackContactInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadContactInfo = async () => {
      const contactInfo = await getContactInfo();

      if (isMounted) {
        setFormData({ cards: normalizeTableOrder(contactInfo.cards) });
        setIsLoading(false);
      }
    };

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const addCard = () => {
    router.push('/admin/contact/form-contact-info');
  };

  const editCard = (card: ContactCard) => {
    router.push(`/admin/contact/form-contact-info?id=${encodeURIComponent(card.id)}`);
  };

  const removeCard = async (cardId: string) => {
    const nextContactInfo = {
      cards: normalizeTableOrder(formData.cards.filter((card) => card.id !== cardId)),
    };

    setMessage('');
    setError('');
    setDeletingCardId(cardId);
    setIsSaving(true);
    setFormData(nextContactInfo);

    try {
      const savedContactInfo = await saveContactInfo(nextContactInfo);
      setFormData({ cards: normalizeTableOrder(savedContactInfo.cards) });
      setMessage('Card kontak berhasil dihapus.');
    } catch {
      setError('Gagal menghapus card kontak. Pastikan Firestore rules sudah sesuai dan akun admin punya akses.');
    } finally {
      setDeletingCardId('');
      setIsSaving(false);
    }
  };

  const contactColumns = useMemo<ColumnDef<ContactCard>[]>(
    () => [
      {
        accessorKey: 'order',
        header: 'Urutan',
        size: 86,
        cell: ({ row }) => (
          <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border font-semibold ${isDark ? 'border-gray-700/70 bg-gray-950/60 text-gray-200' : 'border-gray-300 bg-white/50 text-gray-800'}`}>
            {row.original.order}
          </span>
        ),
      },
      {
        accessorKey: 'isActive',
        header: 'Status',
        size: 118,
        cell: ({ row }) => (
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              row.original.isActive
                ? isDark
                  ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
                : isDark
                  ? 'border-gray-700 bg-gray-900 text-gray-400'
                  : 'border-gray-300 bg-white/50 text-gray-500'
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${row.original.isActive ? 'bg-emerald-300' : 'bg-gray-500'}`} />
            {row.original.isActive ? 'Aktif' : 'Nonaktif'}
          </span>
        ),
      },
      {
        accessorKey: 'icon',
        header: 'Icon',
        size: 140,
        cell: ({ row }) => (
          <span className={`inline-flex max-w-full items-center rounded-lg border px-3 py-2 text-xs font-semibold ${isDark ? 'border-blue-400/20 bg-blue-500/10 text-blue-100' : 'border-blue-500/20 bg-blue-500/10 text-blue-700'}`}>
            {iconLabels[row.original.icon] ?? row.original.icon}
          </span>
        ),
      },
      {
        id: 'label',
        accessorFn: (card) => `${card.label.id} ${card.label.en}`,
        header: 'Label',
        size: 140,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p
              className={`truncate font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
              title={row.original.label.id}
            >
              {row.original.label.id}
            </p>
            <p
              className='mt-1 truncate text-xs text-gray-500'
              title={row.original.label.en}
            >
              {row.original.label.en}
            </p>
          </div>
        ),
      },
      {
        id: 'value',
        accessorFn: (card) => `${card.value.id} ${card.value.en}`,
        header: 'Value',
        size: 280,
        cell: ({ row }) => (
          <div className='min-w-0'>
            <p
              className={`truncate font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}
              title={row.original.value.id}
            >
              {row.original.value.id}
            </p>
            <p
              className='mt-1 truncate text-xs text-gray-500'
              title={row.original.value.en}
            >
              {row.original.value.en}
            </p>
          </div>
        ),
      },
      {
        accessorKey: 'href',
        header: 'Link URL',
        size: 260,
        cell: ({ row }) => (
          <p
            className={`truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
            title={row.original.href || '-'}
          >
            {row.original.href || '-'}
          </p>
        ),
      },
      {
        id: 'actions',
        enableSorting: false,
        header: 'Aksi',
        size: 180,
        cell: ({ row }) => (
          <div className='flex items-center justify-center gap-2'>
            <button
              type='button'
              onClick={() => editCard(row.original)}
              className={`inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition hover:bg-blue-500/20 ${
                isDark ? 'border-blue-400/30 bg-blue-500/10 text-blue-200' : 'border-blue-500/30 bg-blue-500/10 text-blue-700'
              }`}
            >
              <Pencil size={16} />
              Edit
            </button>
            <button
              type='button'
              onClick={() => removeCard(row.original.id)}
              disabled={isSaving || deletingCardId === row.original.id}
              className={`inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 text-xs font-semibold transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${
                isDark ? 'border-red-400/30 bg-red-500/10 text-red-200' : 'border-red-500/30 bg-red-500/10 text-red-700'
              }`}
            >
              {deletingCardId === row.original.id ? (
                <Loader2
                  className='animate-spin'
                  size={16}
                />
              ) : (
                <Trash2 size={16} />
              )}
              Hapus
            </button>
          </div>
        ),
      },
    ],
    [deletingCardId, isDark, isSaving],
  );

  if (isLoading) {
    return <SkeletonAdminDataTable isDark={isDark} />;
  }

  return (
    <>
      {message && (
        <FloatingMessage
          key={`success-${message}`}
          message={message}
          onClose={() => setMessage('')}
          title='Berhasil'
          type='success'
        />
      )}

      {error && (
        <FloatingMessage
          key={`error-${error}`}
          message={error}
          onClose={() => setError('')}
          title='Gagal'
          type='error'
        />
      )}

      <AdminDataTable
        addButtonLabel='Tambah'
        columns={contactColumns}
        data={formData.cards}
        emptyMessage='Belum ada card kontak. Klik Tambah untuk membuat card pertama.'
        isDark={isDark}
        onAdd={addCard}
        title='Informasi Kontak'
      />
    </>
  );
};

export default AdminContactPage;
