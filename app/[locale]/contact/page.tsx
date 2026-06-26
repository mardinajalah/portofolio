import ContactPageContent from '@/components/Molecules/ContactPageContent';
import { getContactInfo } from '@/lib/contact-info';

export const dynamic = 'force-dynamic';

const Contact = async () => {
  const contactInfo = await getContactInfo();

  return <ContactPageContent contactInfo={contactInfo} />;
};

export default Contact;
