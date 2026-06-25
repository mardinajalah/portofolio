'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { LayoutDashboard, Loader2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getFirebaseAuth, isFirebaseConfigured } from '@/lib/firebase/client';

export const dynamic = 'force-dynamic';

const adminMenus = ['Manage Profile', 'Manage About', 'Manage Projects', 'Manage Certificates', 'Manage Contact'];

const AdminDashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      router.replace('/admin/login');
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

  const handleLogout = async () => {
    await signOut(getFirebaseAuth());
    router.replace('/admin/login');
  };

  if (isCheckingSession) {
    return (
      <main className='min-h-screen bg-(--bg) text-(--text) flex items-center justify-center p-4'>
        <Loader2 className='animate-spin text-blue-500' />
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-(--bg) text-(--text) p-4 md:p-8'>
      <section className='max-w-5xl mx-auto'>
        <div className='p-6 rounded-2xl backdrop-blur-xl border border-gray-700/40 bg-gray-800/20 shadow-lg'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
            <div>
              <div className='w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5'>
                <LayoutDashboard size={24} />
              </div>
              <h1 className='text-2xl md:text-3xl font-bold'>Admin Dashboard</h1>
              <p className='mt-2 text-sm text-gray-400'>Login sebagai {user?.email}</p>
            </div>

            <button
              type='button'
              onClick={handleLogout}
              className='inline-flex items-center justify-center gap-2 font-semibold px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all shadow-md cursor-pointer'
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
          {adminMenus.map((menu) => (
            <div
              key={menu}
              className='p-5 rounded-xl backdrop-blur-xl border border-gray-700/40 bg-gray-800/20 shadow-md'
            >
              <h2 className='font-semibold'>{menu}</h2>
              <p className='mt-2 text-sm text-gray-400'>Fitur ini akan dibuat pada tahap berikutnya.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboardPage;
