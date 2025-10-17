import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import FeedbackButton from '@/components/FeedbackButton';

const wavePathDown = 'M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,80 L0,80 Z';
const wavePathUp = 'M0,20 Q150,60 300,20 T600,20 T900,20 T1200,20 L1200,80 L0,80 Z';

const sectionColors = ['#0f172a', '#18233f', '#223356', '#2b426d', '#344881'];

function ResultsBackground() {
  const topColor = sectionColors[0];
  const bottomColor = sectionColors[sectionColors.length - 1];
  const baseColor = '#0c1220';

  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 -z-20"
        style={{
          background: `linear-gradient(to bottom, ${topColor} 0%, ${topColor} 12%, ${baseColor} 12%, ${baseColor} 88%, ${bottomColor} 88%, ${bottomColor} 100%)`,
        }}
      />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="flex h-full flex-col">
          {sectionColors.map((color, index) => {
            const nextColor = sectionColors[index + 1] ?? color;

            return (
              <div
                key={`wave-section-${index}`}
                className="relative flex-1"
                style={{
                  backgroundColor: color,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.04), transparent 45%)',
                  }}
                />
                {index < sectionColors.length - 1 && (
                  <svg
                    className="pointer-events-none absolute -bottom-[1px] left-0 h-24 w-full"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 80"
                  >
                    <path
                      d={index % 2 === 0 ? wavePathDown : wavePathUp}
                      fill={nextColor}
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
