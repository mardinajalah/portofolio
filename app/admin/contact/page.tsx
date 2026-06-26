import { AdminContactForm } from '@/components/admin/AdminContactForm';

export const dynamic = 'force-dynamic';

const AdminContactPage = () => {
  return (
    <div className='mx-auto max-w-5xl'>
      <AdminContactForm />
    </div>
  );
};

export default AdminContactPage;
