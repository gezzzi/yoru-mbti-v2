import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";
import { Kiwi_Maru, Dela_Gothic_One } from "next/font/google";
import MobileOverlayAd from "@/components/MobileOverlayAd";
import DeferredStyles from "@/components/DeferredStyles";

const kiwiMaru = Kiwi_Maru({
  weight: ["400"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-kiwi",
});

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  display: "optional",
  variable: "--font-dela",
});

export const metadata: Metadata = {
  title: "夜の性格診断８　MBTI・セックス相性診断",
  description: "あなたの隠された夜の性格を診断します",
  applicationName: "夜の性格診断8",
  authors: [{ name: "夜の性格診断8" }],
  generator: "Next.js",
  keywords: ["性格診断", "MBTI", "夜の性格", "personality test"],
  openGraph: {
    title: "夜の性格診断８　MBTI・セックス相性診断",
    description: "あなたの隠された夜の性格を診断します",
    url: "https://nightpersonality.com",
    siteName: "夜の性格診断8",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 512,
        height: 512,
        alt: "夜の性格診断8",
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "夜の性格診断８　MBTI・セックス相性診断",
    description: "あなたの隠された夜の性格を診断します",
    images: ["https://nightpersonality.com/og.png"],
    creator: "@nightpersonality",
    site: "@nightpersonality",
  },
  alternates: {
    canonical: "https://nightpersonality.com",
    languages: {
      'ja': 'https://nightpersonality.com',
      'en': 'https://nightpersonality.com/en',
    },
  },
  metadataBase: new URL("https://nightpersonality.com"),
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${kiwiMaru.variable} ${delaGothicOne.variable}`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="夜の性格診断8" />
        <meta name="application-name" content="夜の性格診断8" />
        <meta name="apple-mobile-web-app-title" content="夜の性格診断8" />

        {/* Preconnect for performance optimization */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Critical CSS - minimal inline for faster initial paint */}
        <style dangerouslySetInnerHTML={{
          __html: `*,::before,::after{box-sizing:border-box;border-width:0;border-style:solid}html{line-height:1.5;-webkit-text-size-adjust:100%}body{margin:0;background:#0c1220;color:#fff;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.min-h-screen{min-height:100vh}@keyframes twinkle{0%,100%{opacity:0}50%{opacity:1}}`
        }} />

        {/* Google Analytics 4 (gtag.js) - GTMを介さず直接導入 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="structured-data-website" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "夜の性格診断8",
              "alternateName": ["NightPersonality"],
              "url": "https://nightpersonality.com",
              "inLanguage": "ja",
              "publisher": {
                "@type": "Organization",
                "name": "夜の性格診断8",
                "url": "https://nightpersonality.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://nightpersonality.com/og.png"
                }
              }
            }
          `}
        </Script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <meta name="msapplication-TileImage" content="/mstile-150x150.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${kiwiMaru.className} bg-[#0c1220] text-white antialiased`}>
        {children}
        <DeferredStyles />
        <MobileOverlayAd />
      </body>
    </html>
  );
}
