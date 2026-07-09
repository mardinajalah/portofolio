'use client';

import { FormEvent, useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { SkeletonAdminForm } from '@/components/Molecules/Skeleton';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import { getContactAvailability, saveContactAvailability } from '@/lib/contact-availability';
import {
  AvailabilityItem,
  ContactAvailability,
  availabilityIconOptions,
  createBlankAvailabilityItem,
  fallbackContactAvailability,
  sortAvailabilityItems,
} from '@/lib/contact-availability-utils';

type FormAvailabilityProps = {
  editingItemId: string | null;
};

const normalizeAvailabilityOrder = (items: AvailabilityItem[]) => {
  return sortAvailabilityItems(items).map((item, index) => ({
    ...item,
    order: item.order || index + 1,
  }));
};

export const FormAvailability = ({ editingItemId }: FormAvailabilityProps) => {
  const router = useRouter();
  const { resolvedTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted ? (resolvedTheme ?? theme ?? 'dark') === 'dark' : true;
  const [availabilityData, setAvailabilityData] = useState<ContactAvailability>(fallbackContactAvailability);
  const [editingItem, setEditingItem] = useState<AvailabilityItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [shouldReturnToTable, setShouldReturnToTable] = useState(false);
  const isAdding = !editingItemId;
  const inputClassName = `mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 ${
    isDark
      ? 'border-gray-700/70 bg-black/20 text-gray-100 focus:border-blue-400'
      : 'border-white/50 bg-white/40 text-gray-900 focus:border-blue-500'
  }`;
  const labelClassName = `text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadAvailability = async () => {
      const nextAvailability = await getContactAvailability();
      const normalizedItems = normalizeAvailabilityOrder(nextAvailability.items);
      const selectedItem = editingItemId
        ? normalizedItems.find((item) => item.id === editingItemId)
        : createBlankAvailabilityItem(normalizedItems.length + 1);

      if (isActive) {
        setAvailabilityData({ items: normalizedItems });
        setEditingItem(
          selectedItem
            ? {
                ...selectedItem,
                title: { ...selectedItem.title },
                description: { ...selectedItem.description },
              }
            : null,
        );
        setIsLoading(false);
      }
    };

    loadAvailability();

    return () => {
      isActive = false;
    };
  }, [editingItemId]);

  const updateEditingItem = (updater: (item: AvailabilityItem) => AvailabilityItem) => {
    setEditingItem((current) => (current ? updater(current) : current));
  };

  const backToTable = () => {
    router.push('/admin/contact');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    const hasEmptyRequiredField = [
      editingItem.title.id,
      editingItem.title.en,
      editingItem.description.id,
      editingItem.description.en,
    ].some((value) => !value.trim());

    setMessage('');
    setError('');
    setShouldReturnToTable(false);

    if (hasEmptyRequiredField) {
      setError('Judul dan deskripsi dalam bahasa Indonesia dan Inggris wajib diisi.');
      return;
    }

    if (isAdding && availabilityData.items.length >= 30) {
      setError('Maksimal 30 data ketersediaan dapat disimpan.');
      return;
    }

    setIsSaving(true);

    const nextItems = isAdding
      ? [...availabilityData.items, editingItem]
      : availabilityData.items.map((item) => (item.id === editingItem.id ? editingItem : item));

    try {
      await saveContactAvailability({ items: normalizeAvailabilityOrder(nextItems) });
      setShouldReturnToTable(true);
      setMessage(isAdding ? 'Data ketersediaan baru berhasil ditambahkan.' : 'Data ketersediaan berhasil diperbarui.');
    } catch {
      setShouldReturnToTable(false);
      setError('Gagal menyimpan data ketersediaan. Pastikan Firestore rules sudah sesuai dan akun admin punya akses.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <SkeletonAdminForm isDark={isDark} />;
  }

  if (!editingItem) {
    return (
      <section className={`rounded-xl border p-6 shadow-lg ${isDark ? 'border-red-400/30 bg-red-500/10 text-red-100' : 'border-red-500/30 bg-red-500/10 text-red-700'}`}>
        <h1 className='text-xl font-bold'>Data ketersediaan tidak ditemukan</h1>
        <p className='mt-2 text-sm'>Data yang ingin diedit tidak tersedia. Kembali ke tabel Contact untuk memilih data lain.</p>
        <button
          type='button'
          onClick={backToTable}
          className='mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600'
        >
          <ArrowLeft size={18} />
          Kembali ke Tabel
        </button>
      </section>
    );
  }

  return (
    <>
      {message && (
        <FloatingMessage
          key={`success-${message}`}
          message={message}
          onClose={() => {
            setMessage('');

            if (shouldReturnToTable) {
              router.push('/admin/contact');
            }
          }}
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

      <form
        onSubmit={handleSubmit}
        className={`rounded-xl border p-5 ${isDark ? 'border-gray-800 bg-black/20' : 'border-white/30 bg-white/20'}`}
      >
        <div className={`flex flex-col gap-3 border-b pb-5 md:flex-row md:items-start md:justify-between ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-300'>
              {isAdding ? 'Tambah Ketersediaan' : 'Edit Ketersediaan'}
            </p>
            <h1 className='mt-2 text-xl font-bold'>{isAdding ? 'Form input ketersediaan baru' : editingItem.title.id}</h1>
            <p className={`mt-2 max-w-2xl text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Isi data bilingual yang akan ditampilkan sebagai card Ketersediaan pada halaman Contact pengunjung.
            </p>
          </div>
          <button
            type='button'
            onClick={backToTable}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
              isDark ? 'border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800' : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-white/80'
            }`}
          >
            <ArrowLeft size={16} />
            Kembali
          </button>
        </div>

        <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <label className='block'>
            <span className={labelClassName}>Icon</span>
            <select
              value={editingItem.icon}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  icon: event.target.value as AvailabilityItem['icon'],
                }))
              }
              className={inputClassName}
            >
              {availabilityIconOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={isDark ? 'bg-gray-950 text-gray-100' : 'bg-white text-gray-900'}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className='block'>
            <span className={labelClassName}>Urutan</span>
            <input
              type='number'
              min='1'
              required
              value={editingItem.order}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  order: Math.max(1, Number(event.target.value) || 1),
                }))
              }
              className={inputClassName}
            />
          </label>

          <label className='block'>
            <span className={labelClassName}>Judul Indonesia</span>
            <input
              type='text'
              required
              value={editingItem.title.id}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  title: { ...current.title, id: event.target.value },
                }))
              }
              className={inputClassName}
              placeholder='Contoh: Kolaborasi'
            />
          </label>

          <label className='block'>
            <span className={labelClassName}>Judul Inggris</span>
            <input
              type='text'
              required
              value={editingItem.title.en}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  title: { ...current.title, en: event.target.value },
                }))
              }
              className={inputClassName}
              placeholder='Example: Collaboration'
            />
          </label>

          <label className='block'>
            <span className={labelClassName}>Deskripsi Indonesia</span>
            <textarea
              rows={4}
              required
              value={editingItem.description.id}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  description: { ...current.description, id: event.target.value },
                }))
              }
              className={`${inputClassName} resize-y`}
              placeholder='Jelaskan ketersediaan dalam bahasa Indonesia'
            />
          </label>

          <label className='block'>
            <span className={labelClassName}>Deskripsi Inggris</span>
            <textarea
              rows={4}
              required
              value={editingItem.description.en}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  description: { ...current.description, en: event.target.value },
                }))
              }
              className={`${inputClassName} resize-y`}
              placeholder='Describe the availability in English'
            />
          </label>
        </div>

        <div className={`mt-5 flex items-center justify-between gap-4 rounded-lg border px-4 py-3 ${isDark ? 'border-gray-700/70 bg-black/20' : 'border-white/50 bg-white/30'}`}>
          <div>
            <p className={labelClassName}>Status card</p>
            <p className={`mt-1 text-xs ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Card nonaktif tetap tersimpan, tetapi tidak tampil di halaman publik.</p>
          </div>
          <label className='inline-flex cursor-pointer items-center gap-3'>
            <input
              type='checkbox'
              checked={editingItem.isActive}
              onChange={(event) =>
                updateEditingItem((current) => ({
                  ...current,
                  isActive: event.target.checked,
                }))
              }
              className='h-5 w-5 accent-blue-500'
            />
            <span className={labelClassName}>{editingItem.isActive ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        </div>

        <div className='mt-5 flex justify-end'>
          <button
            type='submit'
            disabled={isSaving}
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70'
          >
            {isSaving ? (
              <Loader2
                className='animate-spin'
                size={18}
              />
            ) : (
              <Save size={18} />
            )}
            {isSaving ? 'Menyimpan...' : isAdding ? 'Simpan Ketersediaan' : 'Update Ketersediaan'}
          </button>
        </div>
      </form>
    </>
  );
};
