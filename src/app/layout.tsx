import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import Script from "next/script";
// フィードバックボタンを全ページ右下に表示
import FeedbackButton from '../components/FeedbackButton';

export const metadata: Metadata = {
  title: "夜の性格診断",
  description: "あなたの隠された夜の性格を診断します",
  openGraph: {
    title: "夜の性格診断",
    description: "あなたの隠された夜の性格を診断します",
    url: "https://nightpersonality.com",
    siteName: "夜の性格診断",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 512,
        height: 512,
        alt: "夜の性格診断",
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "夜の性格診断",
    description: "あなたの隠された夜の性格を診断します",
    images: ["https://nightpersonality.com/og.png"],
  },
  alternates: {
    canonical: "https://nightpersonality.com",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <meta name="theme-color" content="#000000" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HLM13T0M2K" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HLM13T0M2K');
          `}
        </Script>
        <Script id="structured-data-site-name-ja" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "夜の性格診断",
              "alternateName": "夜MBTI",
              "url": "https://nightpersonality.com",
              "inLanguage": "ja"
            }
          `}
        </Script>
        <Script id="structured-data-site-name-en" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Night Personality",
              "alternateName": "Night Personality",
              "url": "https://nightpersonality.com",
              "inLanguage": "en"
            }
          `}
        </Script>
        {/* favicon & icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        {/* 背景と星 */}
        <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
          <div className="absolute inset-0" style={{background: '#141e30'}} />
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
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
                animation: 'twinkle 3s infinite',
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
        {/* 通常のレイアウト */}
        <div className="flex flex-col min-h-screen">
          <NavigationWrapper />
          <main className="flex-1 flex flex-col items-center justify-center w-full p-0 m-0">
            {children}
            {/* 右下固定のフィードバックボタン */}
            <div style={{position:'fixed',right:'2rem',bottom:'2rem',zIndex:50}}>
              <FeedbackButton />
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 