import { Metadata } from "next";
import EnHero from '@/components/en/Hero';
import EnLandingPage from '@/components/en/LandingPage';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Night Personality Test - Discover Your Intimate Compatibility",
  description: "Take the free couple intimacy and satisfaction test in just 5 minutes. Our 5-axis personality system reveals your intimate compatibility, highlights strengths and red flags, and provides a practical improvement plan. Anonymous and completely free.",
  keywords: "intimate personality test,compatibility test,couple intimacy test,relationship quiz,night personality,sexual compatibility,couple satisfaction,free personality test,anonymous relationship test,intimate compatibility",
  openGraph: {
    title: "Night Personality Test - Discover Your Intimate Compatibility",
    description: "Free 5-minute intimate compatibility test for couples. Scientifically analyze your connection and get actionable advice to deepen your relationship.",
    url: "https://nightpersonality.com/en",
    siteName: "Night Personality Test",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 1200,
        height: 630,
        alt: "Night Personality Test - Intimate Compatibility",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Night Personality Test - Discover Your Intimate Compatibility",
    description: "Free 5-minute intimate personality and compatibility test. Anonymous and completely free.",
    images: ["https://nightpersonality.com/og.png"],
  },
  alternates: {
    canonical: "https://nightpersonality.com/en",
    languages: {
      'ja': 'https://nightpersonality.com',
      'en': 'https://nightpersonality.com/en',
    },
  },
};

export default function EnHomePage() {
  return (
    <>
      <EnHero />
      <EnLandingPage />

      {/* FAQ Schema Structured Data */}
      <Script id="faq-schema-en" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is the Night Personality Test free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, the test is completely free with no strings attached. No account or sign-up required. All data is stored locally on your device, so your privacy is fully protected."
                }
              },
              {
                "@type": "Question",
                "name": "Can I take the test on my own?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. You can take the personality test solo anytime. Later, your partner can take it too and you can compare results to get a full compatibility report."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the test take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "About 5 minutes. You answer 40 questions and get your detailed personality analysis right away."
                }
              },
              {
                "@type": "Question",
                "name": "Can I save or share my results?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. You can share your results via QR code or save them as a screenshot. Your results are always accessible from your device."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of advice will I get?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You will receive tips on maintaining your strengths, addressing areas for improvement, and improving communication. Everything comes as a practical, week-by-week plan."
                }
              }
            ]
          }
        `}
      </Script>

      {/* BreadcrumbList Schema */}
      <Script id="breadcrumb-schema-en" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://nightpersonality.com/en"
              }
            ]
          }
        `}
      </Script>

      {/* WebSite Schema */}
      <Script id="website-schema-en" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Night Personality Test",
            "alternateName": ["NightPersonality", "Night Personality"],
            "url": "https://nightpersonality.com/en",
            "inLanguage": "en",
            "description": "Discover your intimate personality type and compatibility with our free 5-axis assessment. Takes just 5 minutes.",
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
    </>
  );
}
