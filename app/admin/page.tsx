'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

const AdminIndexPage = () => {
  const router = useRouter();

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
      <div className='flex items-center gap-3 rounded-xl border border-gray-700/50 bg-gray-900/40 px-5 py-4 shadow-lg'>
        <Loader2
          className='animate-spin text-blue-400'
          size={20}
        />
        <span className='text-sm text-gray-300'>Mengarahkan ke admin...</span>
      </div>
    </main>
  );
};

export default AdminIndexPage;
