'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  Loader2,
  MessageSquareText,
  Pencil,
  Plus,
  Save,
  ShieldAlert,
  Trash2,
  X,
} from 'lucide-react';
import {
  ContactCard,
  ContactInfo,
  contactIconOptions,
  createBlankContactCard,
  fallbackContactInfo,
  sortContactCards,
} from '@/lib/contact-info-utils';
import { getContactInfo, saveContactInfo } from '@/lib/contact-info';

const normalizeTableOrder = (cards: ContactCard[]) => {
  return sortContactCards(cards).map((card, index) => ({
    ...card,
    order: card.order || index + 1,
  }));
};

const emptyEditingCard = (order: number) => createBlankContactCard(order);

export const AdminContactForm = () => {
  const [formData, setFormData] = useState<ContactInfo>(fallbackContactInfo);
  const [editingCard, setEditingCard] = useState<ContactCard | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const formPanelRef = useRef<HTMLDivElement | null>(null);

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

  const openForm = (card: ContactCard, mode: 'add' | 'edit') => {
    setMessage('');
    setError('');
    setEditingCard(card);
    setIsAdding(mode === 'add');
    window.requestAnimationFrame(() => {
      formPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const closeForm = () => {
    setEditingCard(null);
    setIsAdding(false);
  };

  const persistContactInfo = async (nextContactInfo: ContactInfo, successMessage: string) => {
    setMessage('');
    setError('');
    setIsSaving(true);

    try {
      const savedContactInfo = await saveContactInfo(nextContactInfo);
      setFormData({ cards: normalizeTableOrder(savedContactInfo.cards) });
      setMessage(successMessage);
      return true;
    } catch {
      setError('Gagal menyimpan card kontak. Pastikan Firestore rules sudah sesuai dan akun admin punya akses.');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const updateEditingCard = (updater: (card: ContactCard) => ContactCard) => {
    setEditingCard((current) => (current ? updater(current) : current));
  };

  const addCard = () => {
    openForm(emptyEditingCard(formData.cards.length + 1), 'add');
  };

  const editCard = (card: ContactCard) => {
    openForm({ ...card, label: { ...card.label }, value: { ...card.value } }, 'edit');
  };

  const removeCard = async (cardId: string) => {
    const nextContactInfo = {
      cards: normalizeTableOrder(formData.cards.filter((card) => card.id !== cardId)),
    };

    setDeletingCardId(cardId);
    setFormData(nextContactInfo);
    await persistContactInfo(nextContactInfo, 'Card kontak berhasil dihapus.');
    if (editingCard?.id === cardId) {
      closeForm();
    }
    setDeletingCardId('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingCard) {
      return;
    }

    const nextCards = isAdding
      ? [...formData.cards, editingCard]
      : formData.cards.map((card) => (card.id === editingCard.id ? editingCard : card));

    const didSave = await persistContactInfo(
      {
        cards: normalizeTableOrder(nextCards),
      },
      isAdding ? 'Card kontak baru berhasil ditambahkan.' : 'Card kontak berhasil diperbarui.',
    );

    if (didSave) {
      closeForm();
    }
  };

  if (isLoading) {
    return (
      <section className='rounded-2xl border border-gray-800 bg-gray-900/40 p-6 shadow-lg'>
        <div className='flex items-center gap-3 text-gray-300'>
          <Loader2
            className='animate-spin text-blue-300'
            size={20}
          />
          <span className='text-sm'>Memuat tabel kontak...</span>
        </div>
      </section>
    );
  }

  return (
    <section className='rounded-2xl border border-gray-800 bg-gray-900/40 p-5 shadow-lg md:p-7'>
      <div className='flex flex-col gap-4 border-b border-gray-800 pb-6 md:flex-row md:items-start md:justify-between'>
        <div>
          <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300'>
            <MessageSquareText size={24} />
          </div>
          <p className='text-sm font-semibold uppercase tracking-[0.16em] text-blue-300'>Contact Cards</p>
          <h1 className='mt-2 text-2xl font-bold md:text-3xl'>Kelola card kontak</h1>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-gray-400'>
            Tabel dipakai untuk melihat daftar card. Penambahan dan perubahan data dilakukan lewat form terpisah.
          </p>
        </div>

        <button
          type='button'
          onClick={addCard}
          className='inline-flex items-center justify-center gap-2 rounded-lg border border-blue-400/40 bg-blue-500/10 px-4 py-3 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20'
        >
          <Plus size={18} />
          Tambah Card
        </button>
      </div>

      <div className='mt-6 overflow-x-auto rounded-xl border border-gray-800'>
        <table className='w-full min-w-245 border-collapse bg-black/20 text-left text-sm'>
          <thead className='bg-gray-950/70 text-xs uppercase tracking-[0.12em] text-gray-500'>
            <tr>
              <th className='px-4 py-4 font-semibold'>Urutan</th>
              <th className='px-4 py-4 font-semibold'>Status</th>
              <th className='px-4 py-4 font-semibold'>Icon</th>
              <th className='px-4 py-4 font-semibold'>Label</th>
              <th className='px-4 py-4 font-semibold'>Value</th>
              <th className='px-4 py-4 font-semibold'>Link URL</th>
              <th className='px-4 py-4 font-semibold'>Aksi</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-800'>
            {formData.cards.map((card) => (
              <tr
                key={card.id}
                className='align-top transition hover:bg-gray-900/35'
              >
                <td className='px-4 py-4 font-semibold text-gray-200'>{card.order}</td>
                <td className='px-4 py-4'>
                  <span
                    className={`inline-flex rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                      card.isActive
                        ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
                        : 'border-gray-700 bg-gray-900 text-gray-400'
                    }`}
                  >
                    {card.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className='px-4 py-4 text-gray-200'>{contactIconOptions.find((option) => option.value === card.icon)?.label ?? card.icon}</td>
                <td className='px-4 py-4'>
                  <p className='font-semibold text-gray-100'>{card.label.id}</p>
                  <p className='mt-1 text-xs text-gray-500'>{card.label.en}</p>
                </td>
                <td className='px-4 py-4'>
                  <p className='max-w-64 truncate font-semibold text-gray-100'>{card.value.id}</p>
                  <p className='mt-1 max-w-64 truncate text-xs text-gray-500'>{card.value.en}</p>
                </td>
                <td className='px-4 py-4'>
                  <p className='max-w-72 truncate text-gray-300'>{card.href || '-'}</p>
                </td>
                <td className='px-4 py-4'>
                  <div className='flex flex-wrap gap-2'>
                    <button
                      type='button'
                      onClick={() => editCard(card)}
                      className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-blue-400/30 bg-blue-500/10 px-3 font-semibold text-blue-200 transition hover:bg-blue-500/20'
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                    <button
                      type='button'
                      onClick={() => removeCard(card.id)}
                      disabled={isSaving || deletingCardId === card.id}
                      className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-3 font-semibold text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                      {deletingCardId === card.id ? (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        ref={formPanelRef}
        className='mt-6'
      >
        {editingCard ? (
          <form
            onSubmit={handleSubmit}
            className='rounded-xl border border-gray-800 bg-black/20 p-5'
          >
            <div className='flex flex-col gap-3 border-b border-gray-800 pb-5 md:flex-row md:items-start md:justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-300'>
                  {isAdding ? 'Tambah Card' : 'Edit Card'}
                </p>
                <h2 className='mt-2 text-xl font-bold'>{isAdding ? 'Form input card baru' : editingCard.label.id}</h2>
              </div>
              <button
                type='button'
                onClick={closeForm}
                className='inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-3 text-sm font-semibold text-gray-300 transition hover:bg-gray-800'
              >
                <X size={16} />
                Batal
              </button>
            </div>

            <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Icon</span>
                <select
                  value={editingCard.icon}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      icon: event.target.value as ContactCard['icon'],
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                >
                  {contactIconOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className='bg-gray-950 text-gray-100'
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Urutan</span>
                <input
                  type='number'
                  min='1'
                  value={editingCard.order}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      order: Number(event.target.value) || 1,
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Label ID</span>
                <input
                  type='text'
                  value={editingCard.label.id}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      label: { ...current.label, id: event.target.value },
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Label EN</span>
                <input
                  type='text'
                  value={editingCard.label.en}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      label: { ...current.label, en: event.target.value },
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Value ID</span>
                <input
                  type='text'
                  value={editingCard.value.id}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      value: { ...current.value, id: event.target.value },
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-gray-200'>Value EN</span>
                <input
                  type='text'
                  value={editingCard.value.en}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      value: { ...current.value, en: event.target.value },
                    }))
                  }
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition focus:border-blue-400'
                />
              </label>

              <label className='block lg:col-span-2'>
                <span className='text-sm font-semibold text-gray-200'>Link URL</span>
                <input
                  type='text'
                  value={editingCard.href}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      href: event.target.value,
                    }))
                  }
                  placeholder='Kosongkan jika card bukan link, misalnya lokasi.'
                  className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-blue-400'
                />
              </label>

              <label className='flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-950/40 px-4 py-3 lg:col-span-2'>
                <input
                  type='checkbox'
                  checked={editingCard.isActive}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      isActive: event.target.checked,
                    }))
                  }
                  className='h-4 w-4 accent-blue-500'
                />
                <span className='text-sm font-semibold text-gray-200'>Tampilkan card ini di halaman pengunjung</span>
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
                {isSaving ? 'Menyimpan...' : isAdding ? 'Simpan Card' : 'Update Card'}
              </button>
            </div>
          </form>
        ) : (
          <div className='rounded-xl border border-dashed border-gray-700 bg-black/10 p-5 text-sm text-gray-400'>
            Klik `Tambah Card` untuk membuka form input, atau klik `Edit` pada salah satu baris tabel.
          </div>
        )}
      </div>

      {message && (
        <div className='mt-6 flex items-start gap-3 rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-sm text-emerald-200'>
          <CheckCircle2
            className='mt-0.5 shrink-0'
            size={18}
          />
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className='mt-6 flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 text-sm text-red-200'>
          <ShieldAlert
            className='mt-0.5 shrink-0'
            size={18}
          />
          <p>{error}</p>
        </div>
      )}
    </section>
  );
};
