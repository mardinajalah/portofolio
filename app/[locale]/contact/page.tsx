import ContactPageContent from '@/components/Molecules/ContactPageContent';
import { getContactAvailability } from '@/lib/contact-availability';
import { getContactInfo } from '@/lib/contact-info';

export const dynamic = 'force-dynamic';

const Contact = async () => {
  const [contactInfo, contactAvailability] = await Promise.all([
    getContactInfo(),
    getContactAvailability(),
  ]);

  return (
    <ContactPageContent
      contactAvailability={contactAvailability}
      contactInfo={contactInfo}
    />
  );
};

export default Contact;
