import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import ResultsBackground from '@/components/ResultsBackground';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '統計情報 | 夜の性格診断8',
  description: '夜の性格診断8の統計情報ページ。8タイプの分布や男女比率などのデータを公開しています。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function StatsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <ResultsBackground />
      <NavigationWrapper />
      <main className="relative flex flex-1 flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

