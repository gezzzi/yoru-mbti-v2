import type { Metadata } from 'next';
import EnPrivacyPage from '@/components/en/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | Night Personality Test',
  description: 'Privacy policy for Night Personality Test. Learn how we handle your personal information.',
  alternates: {
    canonical: 'https://nightpersonality.com/en/privacy',
    languages: {
      'ja': 'https://nightpersonality.com/privacy',
      'en': 'https://nightpersonality.com/en/privacy',
    },
  },
};

export default function Privacy() {
  return <EnPrivacyPage />;
}
