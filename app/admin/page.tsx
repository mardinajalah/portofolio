'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'nextjs-toploader/app';
import { useTheme } from 'next-themes';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

const AdminIndexPage = () => {
  const router = useRouter();
  const { resolvedTheme, theme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const isDark = isMounted ? (resolvedTheme ?? theme ?? 'dark') === 'dark' : true;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      router.replace('/admin/login');
      return;
    }

    const unsubscribe = onAuthStateChanged(getFirebaseAuth(), (user) => {
      router.replace(user ? '/admin/dashboard' : '/admin/login');
    });

    return () => unsubscribe();
  }, [router]);

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
          Mengarahkan ke admin...
        </span>
      </div>
    </main>
  );
};

export default AdminIndexPage;
