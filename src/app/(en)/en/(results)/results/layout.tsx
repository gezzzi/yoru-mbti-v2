import EnNavigationWrapper from '@/components/en/NavigationWrapper';
import EnFooter from '@/components/en/Footer';
import ResultsBackground from '@/components/ResultsBackground';

export default function EnResultsLayout({
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
