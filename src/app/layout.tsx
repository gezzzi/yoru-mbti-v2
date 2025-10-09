import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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
        <meta property="og:site_name" content="夜の性格診断" />
        <meta name="application-name" content="夜の性格診断" />
        <meta name="apple-mobile-web-app-title" content="夜の性格診断" />
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
      <body className="bg-[#0c1220] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
