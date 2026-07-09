'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader2, MessageSquareText, Plus, Save, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ContactCard, ContactInfo, contactIconOptions, createBlankContactCard, fallbackContactInfo, sortContactCards } from '@/lib/contact-info-utils';
import { getContactInfo, saveContactInfo } from '@/lib/contact-info';
import { FloatingMessage } from '@/components/shared/FloatingMessage';
import { AdminContactDataTable } from './AdminContactDataTable';

const normalizeTableOrder = (cards: ContactCard[]) => {
  return sortContactCards(cards).map((card, index) => ({
    ...card,
    order: card.order || index + 1,
  }));
};

const emptyEditingCard = (order: number) => createBlankContactCard(order);

export const AdminContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState<ContactInfo>(fallbackContactInfo);
  const [editingCard, setEditingCard] = useState<ContactCard | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const formPanelRef = useRef<HTMLDivElement | null>(null);
  const inputClassName = `mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition placeholder:text-gray-500 ${
    isDark
      ? 'border-gray-700/70 bg-black/20 text-gray-100 focus:border-blue-400'
      : 'border-white/50 bg-white/40 text-gray-900 focus:border-blue-500'
  }`;
  const labelClassName = `text-sm font-semibold ${isDark ? 'text-gray-200' : 'text-gray-700'}`;

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

    const nextCards = isAdding ? [...formData.cards, editingCard] : formData.cards.map((card) => (card.id === editingCard.id ? editingCard : card));

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
      <section className={`rounded-2xl border p-6 shadow-lg ${isDark ? 'border-gray-800 bg-gray-900/40' : 'border-white/30 bg-white/20'}`}>
        <div className={`flex items-center gap-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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

      <AdminContactDataTable
        cards={formData.cards}
        deletingCardId={deletingCardId}
        isDark={isDark}
        isSaving={isSaving}
        onDelete={removeCard}
        onEdit={editCard}
        addCard={addCard}
      />

      <div
        ref={formPanelRef}
        className='mt-6'
      >
        {editingCard ? (
          <form
            onSubmit={handleSubmit}
            className={`rounded-xl border p-5 ${isDark ? 'border-gray-800 bg-black/20' : 'border-white/30 bg-white/20'}`}
          >
            <div className={`flex flex-col gap-3 border-b pb-5 md:flex-row md:items-start md:justify-between ${isDark ? 'border-gray-800' : 'border-gray-300'}`}>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-blue-300'>{isAdding ? 'Tambah Card' : 'Edit Card'}</p>
                <h2 className='mt-2 text-xl font-bold'>{isAdding ? 'Form input card baru' : editingCard.label.id}</h2>
              </div>
              <button
                type='button'
                onClick={closeForm}
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
                  isDark ? 'border-gray-700 bg-gray-900 text-gray-300 hover:bg-gray-800' : 'border-gray-300 bg-white/50 text-gray-700 hover:bg-white/80'
                }`}
              >
                <X size={16} />
                Batal
              </button>
            </div>

            <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <label className='block'>
                <span className={labelClassName}>Icon</span>
                <select
                  value={editingCard.icon}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      icon: event.target.value as ContactCard['icon'],
                    }))
                  }
                  className={inputClassName}
                >
                  {contactIconOptions.map((option) => (
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
                  value={editingCard.order}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      order: Number(event.target.value) || 1,
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className='block'>
                <span className={labelClassName}>Label ID</span>
                <input
                  type='text'
                  value={editingCard.label.id}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      label: { ...current.label, id: event.target.value },
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className='block'>
                <span className={labelClassName}>Label EN</span>
                <input
                  type='text'
                  value={editingCard.label.en}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      label: { ...current.label, en: event.target.value },
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className='block'>
                <span className={labelClassName}>Value ID</span>
                <input
                  type='text'
                  value={editingCard.value.id}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      value: { ...current.value, id: event.target.value },
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className='block'>
                <span className={labelClassName}>Value EN</span>
                <input
                  type='text'
                  value={editingCard.value.en}
                  onChange={(event) =>
                    updateEditingCard((current) => ({
                      ...current,
                      value: { ...current.value, en: event.target.value },
                    }))
                  }
                  className={inputClassName}
                />
              </label>

              <label className='block lg:col-span-2'>
                <span className={labelClassName}>Link URL</span>
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
                  className={inputClassName}
                />
              </label>

              <label className={`flex items-center gap-3 rounded-lg border px-4 py-3 lg:col-span-2 ${isDark ? 'border-gray-800 bg-gray-950/40' : 'border-white/30 bg-white/30'}`}>
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
                <span className={labelClassName}>Tampilkan card ini di halaman pengunjung</span>
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
          <div className={`rounded-xl border border-dashed p-5 text-sm ${isDark ? 'border-gray-700 bg-black/10 text-gray-400' : 'border-gray-300 bg-white/20 text-gray-600'}`}>Klik `Tambah Card` untuk membuka form input, atau klik `Edit` pada salah satu baris tabel.</div>
        )}
      </div>
    </>
  );
};
