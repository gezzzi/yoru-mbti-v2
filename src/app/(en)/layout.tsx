import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";
import { Inter, Space_Grotesk } from "next/font/google";
import MobileOverlayAd from "@/components/MobileOverlayAd";
import DeferredStyles from "@/components/DeferredStyles";

const inter = Inter({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: {
    default: "Intimate Personality Test for Couples - Free & Anonymous | Night Personality",
    template: "%s | Night Personality Test",
  },
  description: "Discover your bedroom personality type with our free 5-axis intimacy quiz. Take it solo or with your partner using QR codes. No sign up, 100% anonymous. 40 questions, 5 minutes.",
  applicationName: "Night Personality Test",
  authors: [{ name: "Night Personality Test" }],
  generator: "Next.js",
  keywords: [
    "intimate personality test",
    "couple compatibility quiz",
    "sexual compatibility test free",
    "bedroom personality type",
    "intimacy quiz for couples",
    "relationship compatibility test",
    "couple quiz anonymous",
    "night personality test",
    "romantic personality type",
    "free intimacy test no sign up",
    "couple quiz to do together",
    "5 axis personality test",
  ],
  openGraph: {
    title: "Intimate Personality Test for Couples - Free & Anonymous",
    description: "Discover your bedroom personality type with our free 5-axis intimacy quiz. No sign up, completely anonymous. Share results with your partner via QR code.",
    url: "https://nightpersonality.com/en",
    siteName: "Night Personality Test",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 512,
        height: 512,
        alt: "Night Personality Test - Free Intimate Compatibility Quiz for Couples",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Intimate Personality Test for Couples - Free & Anonymous",
    description: "Discover your bedroom personality type in 5 minutes. Free, anonymous, no sign up. Share with your partner via QR code.",
    images: ["https://nightpersonality.com/og.png"],
    creator: "@nightpersonality",
    site: "@nightpersonality",
  },
  alternates: {
    canonical: "https://nightpersonality.com/en",
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

export default function EnglishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta name="theme-color" content="#000000" />
        <meta property="og:site_name" content="Night Personality Test" />
        <meta name="application-name" content="Night Personality Test" />
        <meta name="apple-mobile-web-app-title" content="Night Personality" />

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

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}`}
          strategy="lazyOnload"
        />
        <Script id="gtag-init-en" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script id="structured-data-website-en" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Night Personality Test",
              "alternateName": ["NightPersonality"],
              "url": "https://nightpersonality.com/en",
              "inLanguage": "en",
              "publisher": {
                "@type": "Organization",
                "name": "Night Personality Test",
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
      <body className={`${inter.className} bg-[#0c1220] text-white antialiased`}>
        {children}
        <DeferredStyles />
        <MobileOverlayAd />
      </body>
    </html>
  );
}
