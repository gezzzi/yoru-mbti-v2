import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import ResultsBackground from '@/components/ResultsBackground';

export default function BlogDetailLayout({
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

