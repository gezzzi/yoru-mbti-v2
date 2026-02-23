import type { Metadata } from 'next';
import EnHelpPage from '@/components/en/HelpPage';

export const metadata: Metadata = {
  title: 'Help & FAQ | Night Personality Test',
  description: 'Frequently asked questions about Night Personality Test. Find answers about the test, results, compatibility, and more.',
  alternates: {
    canonical: 'https://nightpersonality.com/en/help',
    languages: {
      'ja': 'https://nightpersonality.com/help',
      'en': 'https://nightpersonality.com/en/help',
    },
  },
};

export default function Help() {
  return <EnHelpPage />;
}
