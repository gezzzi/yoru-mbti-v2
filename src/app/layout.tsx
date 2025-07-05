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