import EnNavigationWrapper from '@/components/en/NavigationWrapper';
import EnFooter from '@/components/en/Footer';
import ResultsBackground from '@/components/ResultsBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistics | Night Personality Test',
  description: 'View statistics for the Night Personality Test. Explore type distribution, gender ratios, and more.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function EnStatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ResultsBackground />
      <EnNavigationWrapper />
      <main className="relative flex flex-1 flex-col items-center">
        {children}
      </main>
      <EnFooter />
    </div>
  );
}
