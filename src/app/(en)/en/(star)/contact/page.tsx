import type { Metadata } from 'next';
import EnContactPage from '@/components/en/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Us | Night Personality Test',
  description: 'Get in touch with the Night Personality Test team. Send us your questions, feedback, or suggestions.',
  alternates: {
    canonical: 'https://nightpersonality.com/en/contact',
    languages: {
      'ja': 'https://nightpersonality.com/contact',
      'en': 'https://nightpersonality.com/en/contact',
    },
  },
};

export default function Contact() {
  return <EnContactPage />;
}
