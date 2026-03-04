import { Metadata } from 'next';
import EnPersonalityTypesPage from '@/components/en/PersonalityTypesPage';

export const metadata: Metadata = {
  title: 'All 8 Intimate Personality Types Explained | Night Personality Test',
  description: 'Explore all 8 intimate personality types from the Night Personality Test. From The Passionate Leader to The Tender Soul, find your bedroom personality type and learn about compatibility with other types.',
  keywords: 'intimate personality types, bedroom personality types list, all personality types, night personality types explained, romantic personality categories, leader follower personality, dominant submissive personality types',
  openGraph: {
    title: 'All 8 Intimate Personality Types | Night Personality Test',
    description: 'Explore all 8 intimate personality types. Find your type and discover who you are most compatible with.',
    url: 'https://nightpersonality.com/en/types',
    siteName: 'Night Personality Test',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://nightpersonality.com/en/types',
    languages: {
      'ja': 'https://nightpersonality.com/types',
      'en': 'https://nightpersonality.com/en/types',
    },
  },
};

export default function EnTypesPage() {
  return <EnPersonalityTypesPage />;
}
