import { Metadata } from "next";
import Hero from '@/components/Hero';
import LandingPage from '@/components/LandingPage';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "夜の性格診断｜性相性・セックス相性診断 無料（大人の二人用）",
  description: "カップル親密度診断とセックス満足度診断を3分で。夜の相性良い兆候と合わない兆候を可視化し、夫婦・恋人のための相性合わない乗り越え方とセックスコミュニケーションコツを提案。匿名・無料。",
  keywords: "夜の相性診断,性相性診断,セックス相性診断,無料,二人用相性診断,大人,カップル親密度診断,セックス満足度診断,夜の相性良い兆候,夜の相性合わない兆候,相性合わない乗り越え方,セックスコミュニケーションコツ,夫婦夜の溝改善方法,倦怠期解消診断",
  openGraph: {
    title: "夜の性格診断｜性相性・セックス相性診断 無料（大人の二人用）",
    description: "カップル親密度診断とセックス満足度診断を3分で。二人の夜の相性を科学的に分析し、具体的な改善アドバイスを提供。",
    url: "https://nightpersonality.com",
    siteName: "夜の性格診断",
    images: [
      {
        url: "https://nightpersonality.com/og.png",
        width: 1200,
        height: 630,
        alt: "夜の相性診断 - Night Personality",
      }
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "夜の性格診断｜性相性・セックス相性診断 無料（大人の二人用）",
    description: "3分で完了する夜の相性診断。匿名・無料で利用可能。",
    images: ["https://nightpersonality.com/og.png"],
  },
  alternates: {
    canonical: "https://nightpersonality.com",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <LandingPage />

      {/* FAQ Schema Structured Data */}
      <Script id="faq-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "夜の相性診断は無料ですか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、完全無料でご利用いただけます。会員登録も不要で、データは匿名で扱われます。"
                }
              },
              {
                "@type": "Question",
                "name": "一人でも診断できますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、一人でも診断可能です。後からパートナーの回答を追加して、二人の相性診断レポートを作成することもできます。"
                }
              },
              {
                "@type": "Question",
                "name": "診断にはどのくらい時間がかかりますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "約3〜5分で完了します。40問の質問に答えるだけで、詳細な分析結果が得られます。"
                }
              },
              {
                "@type": "Question",
                "name": "結果は保存・共有できますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "はい、診断結果はQRコードで簡単に共有できます。スクリーンショットでの保存も可能です。"
                }
              },
              {
                "@type": "Question",
                "name": "どんな改善アドバイスがもらえますか？",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "相性の良い点の維持方法、改善が必要な点への対処法、コミュニケーションのコツなど、1週間単位の具体的なプランを提供します。"
                }
              }
            ]
          }
        `}
      </Script>

      {/* BreadcrumbList Schema */}
      <Script id="breadcrumb-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "ホーム",
                "item": "https://nightpersonality.com"
              }
            ]
          }
        `}
      </Script>
    </>
  );
}