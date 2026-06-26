import { NextResponse } from 'next/server';
import { getContactInfo } from '@/lib/contact-info';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const contactInfo = await getContactInfo();

  return NextResponse.json(contactInfo, {
    headers: {
      'Cache-Control': 'no-store',
    },
  });
};
