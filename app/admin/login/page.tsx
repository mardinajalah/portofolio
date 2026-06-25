'use client';

import { FormEvent, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { LockKeyhole, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic';

const AdminLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsCheckingSession(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      if (user) {
        router.replace('/admin/dashboard');
        return;
      }

      setIsCheckingSession(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!isFirebaseConfigured) {
      setError('Konfigurasi Firebase belum tersedia. Lengkapi environment variables terlebih dahulu.');
      return;
    }

    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(getFirebaseAuth(), email, password);
      router.replace('/admin/dashboard');
    } catch {
      setError('Email atau password admin tidak valid.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <main className='min-h-screen bg-(--bg) text-(--text) flex items-center justify-center p-4'>
        <Loader2 className='animate-spin text-blue-500' />
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-(--bg) text-(--text) flex items-center justify-center p-4'>
      <section className='w-full max-w-md p-6 rounded-2xl backdrop-blur-xl border border-gray-700/40 bg-gray-800/20 shadow-lg'>
        <div className='w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5'>
          <LockKeyhole size={24} />
        </div>

        <h1 className='text-2xl font-bold'>Admin Login</h1>
        <p className='mt-2 text-sm text-gray-400'>Masuk untuk mengelola konten portofolio.</p>

        <form
          onSubmit={handleSubmit}
          className='mt-6 space-y-4'
        >
          <div>
            <label
              htmlFor='email'
              className='text-sm font-semibold'
            >
              Email
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder='admin@email.com'
              className='mt-2 w-full px-4 py-3 rounded-lg outline-none border bg-gray-900/30 border-gray-700/60 focus:border-blue-400 placeholder:text-gray-500'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='text-sm font-semibold'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder='••••••••'
              className='mt-2 w-full px-4 py-3 rounded-lg outline-none border bg-gray-900/30 border-gray-700/60 focus:border-blue-400 placeholder:text-gray-500'
            />
          </div>

          {error && <p className='text-sm text-red-400'>{error}</p>}

          {!isFirebaseConfigured && (
            <p className='text-sm text-yellow-400'>
              Firebase belum dikonfigurasi. Isi variable di .env.local atau Vercel Project Settings.
            </p>
          )}

          <button
            type='submit'
            disabled={isLoading}
            className='w-full inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all shadow-md cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed'
          >
            {isLoading && <Loader2 className='animate-spin' size={18} />}
            Login
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLoginPage;
