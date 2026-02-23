import type { Metadata } from 'next';
import EnAboutPage from '@/components/en/AboutPage';

export const metadata: Metadata = {
  title: 'About Us | Night Personality Test',
  description: 'Learn about Night Personality Test — our mission, team, and the technology behind the 5-axis personality assessment.',
  alternates: {
    canonical: 'https://nightpersonality.com/en/about',
    languages: {
      'ja': 'https://nightpersonality.com/about',
      'en': 'https://nightpersonality.com/en/about',
    },
  },
};

export default function About() {
  return <EnAboutPage />;
}
