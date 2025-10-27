import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Kiwi_Maru, Dela_Gothic_One } from "next/font/google";

const kiwiMaru = Kiwi_Maru({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kiwi",
});

const delaGothicOne = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dela",
});

export const metadata: Metadata = {
  title: "夜の性格診断",
  description: "あなたの隠された夜の性格を診断します",
  applicationName: "夜の性格診断",
  authors: [{ name: "夜の性格診断" }],
  generator: "Next.js",
  keywords: ["性格診断", "MBTI", "夜の性格", "personality test"],
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
    creator: "@nightpersonality",
    site: "@nightpersonality",
  },
  alternates: {
    canonical: "https://nightpersonality.com",
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
        <meta property="og:site_name" content="夜の性格診断" />
        <meta name="application-name" content="夜の性格診断" />
        <meta name="apple-mobile-web-app-title" content="夜の性格診断" />

        {/* Preconnect for performance optimization */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Critical CSS - inline for faster initial paint */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            *, ::before, ::after {
              box-sizing: border-box;
              border-width: 0;
              border-style: solid;
              border-color: #e5e7eb;
            }
            html {
              line-height: 1.5;
              -webkit-text-size-adjust: 100%;
              -moz-tab-size: 4;
              tab-size: 4;
              font-family: 'Kiwi Maru', 'Hiragino Mincho ProN', 'Yu Mincho', 'MS PMincho', serif;
            }
            body {
              margin: 0;
              line-height: inherit;
              background: #0c1220;
              color: #ffffff;
              font-family: 'Kiwi Maru', 'Hiragino Mincho ProN', 'Yu Mincho', 'MS PMincho', serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            h1, h2, h3, h4, h5, h6, .font-head {
              font-family: 'Dela Gothic One', 'Hiragino Kaku Gothic ProN', 'Meiryo', sans-serif;
            }
            .min-h-dvh {
              min-height: 100vh;
            }
            @supports (min-height: 100dvh) {
              .min-h-dvh {
                min-height: 100dvh;
              }
            }
            .bg-gradient-to-br {
              background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
            }
            .from-purple-900 {
              --tw-gradient-from: #581c87;
              --tw-gradient-to: rgb(88 28 135 / 0);
              --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
            }
            .via-purple-800 {
              --tw-gradient-to: rgb(107 33 168 / 0);
              --tw-gradient-stops: var(--tw-gradient-from), #6b21a8, var(--tw-gradient-to);
            }
            .to-pink-900 {
              --tw-gradient-to: #831843;
            }
            .text-white {
              color: #ffffff;
            }
            .antialiased {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            /* Starfield animation base */
            @keyframes twinkle {
              0%, 100% { opacity: 0; }
              50% { opacity: 1; }
            }
            /* Button and interactive element base styles */
            button {
              font-family: inherit;
              font-size: 100%;
              font-weight: inherit;
              line-height: inherit;
              color: inherit;
              margin: 0;
              padding: 0;
              background-color: transparent;
              background-image: none;
              text-transform: none;
              cursor: pointer;
            }
            a {
              color: inherit;
              text-decoration: inherit;
            }
            /* Flexbox utilities for layout */
            .flex {
              display: flex;
            }
            .flex-col {
              flex-direction: column;
            }
            .items-center {
              align-items: center;
            }
            .justify-center {
              justify-content: center;
            }
            /* Text utilities */
            .text-center {
              text-align: center;
            }
            .text-4xl {
              font-size: 2.25rem;
              line-height: 2.5rem;
            }
            .text-xl {
              font-size: 1.25rem;
              line-height: 1.75rem;
            }
            .font-bold {
              font-weight: 700;
            }
            /* Spacing utilities */
            .p-4 {
              padding: 1rem;
            }
            .px-8 {
              padding-left: 2rem;
              padding-right: 2rem;
            }
            .py-4 {
              padding-top: 1rem;
              padding-bottom: 1rem;
            }
            .mt-8 {
              margin-top: 2rem;
            }
            .mb-8 {
              margin-bottom: 2rem;
            }
            /* Hide scrollbar */
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `
        }} />

        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5710738744843996"
          crossOrigin="anonymous"
        />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-HLM13T0M2K" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HLM13T0M2K');
          `}
        </Script>
        <Script id="structured-data-website" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "夜の性格診断",
              "alternateName": ["NightPersonality"],
              "url": "https://nightpersonality.com",
              "inLanguage": "ja",
              "publisher": {
                "@type": "Organization",
                "name": "夜の性格診断",
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
      </body>
    </html>
  );
}
