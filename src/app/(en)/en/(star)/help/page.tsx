import type { Metadata } from 'next';
import EnHelpPage from '@/components/en/HelpPage';

export const metadata: Metadata = {
  title: 'Help & FAQ - Intimate Personality Test Questions Answered | Night Personality',
  description: 'Got questions about the Night Personality Test? Find answers about the intimate personality quiz, compatibility test, QR code sharing, privacy, and how the 5-axis system works.',
  keywords: 'night personality test FAQ, intimate quiz help, how does compatibility test work, personality test questions, is it anonymous, QR code sharing help',
  openGraph: {
    title: 'Help & FAQ | Night Personality Test',
    description: 'Find answers about the intimate personality quiz, compatibility test, QR code sharing, and privacy.',
    url: 'https://nightpersonality.com/en/help',
    siteName: 'Night Personality Test',
    locale: 'en_US',
    type: 'website',
  },
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
