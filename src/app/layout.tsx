import type { Metadata } from "next";
import "./globals.css";
import NavigationWrapper from '@/components/NavigationWrapper';
import Footer from '@/components/Footer';
import Script from "next/script";

export const metadata: Metadata = {
  title: "夜の性格診断",
  description: "あなたの隠された夜の性格を診断します",
  alternates: {
    canonical: "https://nightpersonality.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
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
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-white">
          <NavigationWrapper />
          <main className="flex-1 flex flex-col items-center justify-center w-full">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
} 