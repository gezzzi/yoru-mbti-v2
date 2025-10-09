import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import FeedbackButton from '@/components/FeedbackButton';

export default function StarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="fixed inset-0 -z-10 h-full w-full overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#141e30' }} />
        {[...Array(50)].map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '3px',
              height: '3px',
              background: 'white',
              borderRadius: '50%',
              opacity: 0.8,
              filter: 'blur(0.5px)',
              animation: 'twinkle 3s 80',
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <NavigationWrapper />

      <main className="relative flex flex-1 flex-col items-center justify-center">
        {children}
        <div style={{ position: 'fixed', right: '2rem', bottom: '2rem', zIndex: 50 }}>
          <FeedbackButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
