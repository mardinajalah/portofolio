'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CheckCircle2, Loader2, MessageSquareText, Save, ShieldAlert } from 'lucide-react';
import { ContactInfo, fallbackContactInfo, getContactInfo, saveContactInfo } from '@/lib/contact-info';

const contactFields = [
  {
    id: 'facebookUrl',
    label: 'Facebook URL',
    placeholder: 'https://www.facebook.com/username',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp URL / Number',
    placeholder: 'https://wa.me/628xxxx or 628xxxx',
  },
  {
    id: 'telegram',
    label: 'Telegram URL / Username',
    placeholder: 'https://t.me/username or @username',
  },
  {
    id: 'githubUrl',
    label: 'GitHub URL',
    placeholder: 'https://github.com/username',
  },
] as const;

export const AdminContactForm = () => {
  const [formData, setFormData] = useState<ContactInfo>(fallbackContactInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadContactInfo = async () => {
      const contactInfo = await getContactInfo();

      if (isMounted) {
        setFormData(contactInfo);
        setIsLoading(false);
      }
    };

    loadContactInfo();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateField = (field: keyof Omit<ContactInfo, 'location'>, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateLocation = (field: keyof ContactInfo['location'], value: string) => {
    setFormData((current) => ({
      ...current,
      location: {
        ...current.location,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    setError('');
    setIsSaving(true);

    try {
      const savedContactInfo = await saveContactInfo(formData);
      setFormData(savedContactInfo);
      setMessage('Contact info berhasil disimpan.');
    } catch {
      setError('Gagal menyimpan contact info. Pastikan Firestore aktif dan akun admin punya akses.');
    } finally {
      setIsSaving(false);
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
          <span className='text-sm'>Memuat contact info...</span>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='rounded-2xl border border-gray-800 bg-gray-900/40 p-5 shadow-lg md:p-7'
    >
      <div className='flex flex-col gap-4 border-b border-gray-800 pb-6 md:flex-row md:items-start md:justify-between'>
        <div>
          <div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300'>
            <MessageSquareText size={24} />
          </div>
          <p className='text-sm font-semibold uppercase tracking-[0.16em] text-blue-300'>Contact Info</p>
          <h1 className='mt-2 text-2xl font-bold md:text-3xl'>Kelola informasi kontak</h1>
          <p className='mt-3 max-w-2xl text-sm leading-6 text-gray-400'>
            Data ini akan dipakai oleh halaman Contact publik. Kosongkan field sosial jika belum ingin ditampilkan,
            sementara lokasi tetap punya fallback bilingual.
          </p>
        </div>

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
          {isSaving ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className='mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2'>
        {contactFields.map((field) => (
          <label
            key={field.id}
            htmlFor={field.id}
            className='block'
          >
            <span className='text-sm font-semibold text-gray-200'>{field.label}</span>
            <input
              id={field.id}
              type='text'
              value={formData[field.id]}
              onChange={(event) => updateField(field.id, event.target.value)}
              placeholder={field.placeholder}
              className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-blue-400'
            />
          </label>
        ))}

        <label
          htmlFor='location-en'
          className='block'
        >
          <span className='text-sm font-semibold text-gray-200'>Location EN</span>
          <input
            id='location-en'
            type='text'
            value={formData.location.en}
            onChange={(event) => updateLocation('en', event.target.value)}
            placeholder='Indonesia'
            className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-blue-400'
          />
        </label>

        <label
          htmlFor='location-id'
          className='block'
        >
          <span className='text-sm font-semibold text-gray-200'>Location ID</span>
          <input
            id='location-id'
            type='text'
            value={formData.location.id}
            onChange={(event) => updateLocation('id', event.target.value)}
            placeholder='Indonesia'
            className='mt-2 w-full rounded-lg border border-gray-700/70 bg-black/20 px-4 py-3 text-sm text-gray-100 outline-none transition placeholder:text-gray-600 focus:border-blue-400'
          />
        </label>
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
    </form>
  );
};
