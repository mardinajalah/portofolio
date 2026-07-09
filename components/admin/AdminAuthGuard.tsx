'use client';

import { onAuthStateChanged, User } from 'firebase/auth';
import { Loader2, ShieldAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

type AdminAuthContextValue = {
  user: User;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error('useAdminAuth must be used inside AdminAuthGuard.');
  }

  return context;
};

type AdminAuthGuardProps = {
  children: ReactNode;
};

const AdminLoadingState = () => {
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? 'dark') === 'dark';

  return (
    <main className='min-h-screen bg-(--bg) text-(--text) flex items-center justify-center p-4'>
      <div
        className={`flex items-center gap-3 rounded-xl border px-5 py-4 shadow-lg ${
          isDark
            ? 'border-gray-700 bg-gray-950/80 shadow-black/30'
            : 'border-white/30 bg-white/20'
        }`}
      >
        <Loader2
          className={`animate-spin ${isDark ? 'text-blue-300' : 'text-blue-500'}`}
          size={20}
        />
        <span className={`text-sm font-medium ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
          Memeriksa sesi admin...
        </span>
      </div>
    </main>
  );
};

const AdminConfigMissingState = () => {
  const { resolvedTheme, theme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? 'dark') === 'dark';

  return (
    <main className='min-h-screen bg-(--bg) text-(--text) flex items-center justify-center p-4'>
      <section
        className={`w-full max-w-md rounded-2xl border border-yellow-500/30 p-6 shadow-lg ${
          isDark ? 'bg-gray-950/80 shadow-black/30' : 'bg-yellow-500/10'
        }`}
      >
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/15 ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>
          <ShieldAlert size={24} />
        </div>
        <h1 className='text-xl font-bold'>Firebase belum dikonfigurasi</h1>
        <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-gray-100' : 'text-gray-700'}`}>
          Lengkapi environment variables Firebase di `.env.local` atau Vercel Project Settings untuk mengakses admin.
        </p>
      </section>
    </main>
  );
};

export const AdminAuthGuard = ({ children }: AdminAuthGuardProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setIsCheckingSession(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (currentUser) => {
      if (!currentUser) {
        router.replace('/admin/login');
        return;
      }

      setUser(currentUser);
      setIsCheckingSession(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (isCheckingSession) {
    return <AdminLoadingState />;
  }

  if (!isFirebaseConfigured) {
    return <AdminConfigMissingState />;
  }

  if (!user) {
    return <AdminLoadingState />;
  }

  return <AdminAuthContext.Provider value={{ user }}>{children}</AdminAuthContext.Provider>;
};
