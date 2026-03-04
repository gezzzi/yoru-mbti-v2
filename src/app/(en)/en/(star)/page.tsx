import { Metadata } from "next";
import EnHero from '@/components/en/Hero';
import EnLandingPage from '@/components/en/LandingPage';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Intimate Personality Test for Couples | Free 5-Minute Quiz - Night Personality",
  description: "What's your bedroom personality type? Take our free 5-axis intimacy quiz with your partner. Discover your intimate compatibility, get actionable tips, and share results via QR code. No sign up, 100% anonymous.",
  keywords: "intimate personality test for couples,couple intimacy compatibility quiz free,sexual compatibility test anonymous,bedroom personality type quiz,what is my intimate personality type,couple quiz to do together at night,free relationship quiz no sign up,romantic compatibility test,intimacy test for couples,night personality test",
  openGraph: {
    title: "What's Your Bedroom Personality Type? | Free Couple Intimacy Quiz",
    description: "Discover your intimate personality type in just 5 minutes. Take the quiz solo or with your partner using QR codes. Free, anonymous, no account needed.",
    url: "https://nightpersonality.com/en",
    siteName: "Night Personality Test",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 1200,
        height: 630,
        alt: "Night Personality Test - Free Intimate Compatibility Quiz for Couples",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What's Your Bedroom Personality Type? | Free Quiz",
    description: "Discover your intimate personality type in 5 minutes. Free, anonymous, no sign up. Take it with your partner via QR code!",
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
                "name": "Can I take the intimate personality test on my own?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. You can take the personality test solo anytime to discover your bedroom personality type. Later, your partner can take it too and you can compare results via QR code to get a full compatibility report."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the couple intimacy quiz take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "About 5 minutes. You answer 40 carefully crafted questions across 5 intimate personality axes and get your detailed personality analysis right away. No waiting, no email required."
                }
              },
              {
                "@type": "Question",
                "name": "Is this sexual compatibility test really anonymous?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, 100% anonymous. We don't collect any personal data, don't require sign-up or email, and all results are stored only on your device. Nothing is sent to any server. Your intimate data stays completely private."
                }
              },
              {
                "@type": "Question",
                "name": "How does the QR code sharing work for couples?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After completing the test, you receive a unique QR code. Your partner scans it with their phone to instantly load the compatibility comparison. No accounts needed - just scan and see your intimate compatibility score and detailed analysis."
                }
              },
              {
                "@type": "Question",
                "name": "What are the 5 axes in the intimate personality test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The 5 axes measure: Social vs Reserved (how you connect), Lead vs Follow (who takes initiative), Adventurous vs Stable (openness to new experiences), Devoted vs Free (attachment style), and Open vs Private (communication about intimacy). Together they create your unique intimate personality type."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of results and advice will I get?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You receive your intimate personality type (one of 8 types), detailed trait analysis across 5 axes with percentage scores, personalized strengths and weaknesses, compatibility insights, and actionable tips for improving your intimate relationships."
                }
              },
              {
                "@type": "Question",
                "name": "Can I take the bedroom compatibility quiz with my boyfriend or girlfriend?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! The test is designed for couples. Each partner takes the test individually, then you share results via QR code to unlock a detailed compatibility report with scores, analysis, and improvement tips. It's a fun activity to do together at night."
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
            "alternateName": ["NightPersonality", "Night Personality", "Intimate Personality Test", "Bedroom Personality Quiz"],
            "url": "https://nightpersonality.com/en",
            "inLanguage": "en",
            "description": "Free intimate personality test for couples. Discover your bedroom personality type with our unique 5-axis system. Anonymous, no sign up, results in 5 minutes.",
            "publisher": {
              "@type": "Organization",
              "name": "Night Personality Test",
              "url": "https://nightpersonality.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://nightpersonality.com/og.png"
              }
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://nightpersonality.com/en/types/{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        `}
      </Script>

      {/* Quiz Schema */}
      <Script id="quiz-schema-en" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "Night Personality Test - Intimate Personality Quiz",
            "description": "A free 5-axis intimate personality assessment that reveals your bedroom personality type. 40 questions, 5 minutes, completely anonymous.",
            "url": "https://nightpersonality.com/en/test",
            "educationalAlignment": {
              "@type": "AlignmentObject",
              "alignmentType": "educationalSubject",
              "targetName": "Psychology"
            },
            "about": {
              "@type": "Thing",
              "name": "Intimate Personality Types",
              "description": "8 intimate personality types based on 5 psychological axes: Social/Reserved, Lead/Follow, Adventurous/Stable, Devoted/Free, Open/Private"
            },
            "provider": {
              "@type": "Organization",
              "name": "Night Personality Test",
              "url": "https://nightpersonality.com"
            },
            "typicalAgeRange": "18-",
            "inLanguage": "en",
            "isAccessibleForFree": true,
            "numberOfQuestions": 40,
            "timeRequired": "PT5M"
          }
        `}
      </Script>
    </>
  );
}
