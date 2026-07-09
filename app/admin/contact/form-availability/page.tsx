import { FormAvailability } from '@/components/admin/FormAvailability';

type FormAvailabilityPageProps = {
  searchParams: Promise<{
    id?: string | string[];
  }>;
};

const FormAvailabilityPage = async ({ searchParams }: FormAvailabilityPageProps) => {
  const params = await searchParams;
  const editingItemId = Array.isArray(params.id) ? params.id[0] : params.id;

  return <FormAvailability editingItemId={editingItemId ?? null} />;
};

export default FormAvailabilityPage;
