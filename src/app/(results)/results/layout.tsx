import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import FeedbackButton from '@/components/FeedbackButton';
import ResultsBackground from '@/components/ResultsBackground';

export default function ResultsLayout({
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
        <div style={{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: 50 }}>
          <FeedbackButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
