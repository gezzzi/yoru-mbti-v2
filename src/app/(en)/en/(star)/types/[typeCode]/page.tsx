import { notFound } from 'next/navigation';
import { personalityTypes } from '@/data/en/personalityTypes';
import EnPersonalityTypeDetail from '@/components/en/PersonalityTypeDetail';
import { getModernPersonalityCode } from '@/utils/personalityImage';

interface TypePageProps {
  params: {
    typeCode: string;
  };
}

export default function EnTypePage({ params }: TypePageProps) {
  const { typeCode } = params;
  const normalizedCode = getModernPersonalityCode(typeCode);

  // Find the matching personality type
  const personalityType = personalityTypes.find(
    type => type.code.toLowerCase() === normalizedCode.toLowerCase()
  );

  // Show 404 if no matching type found
  if (!personalityType) {
    notFound();
  }

  return <EnPersonalityTypeDetail type={personalityType} />;
}

// Generate static params for static generation
export async function generateStaticParams() {
  return personalityTypes.map((type) => ({
    typeCode: type.code.toLowerCase(),
  }));
}

// SEO descriptions for each personality type
const typeSeoDescriptions: Record<string, { seoTitle: string; seoDesc: string; seoKeywords: string[] }> = {
  LAL: {
    seoTitle: 'The Passionate Leader - Dominant Intimate Personality Type',
    seoDesc: 'Are you The Passionate Leader? This dominant intimate personality type takes charge with passion and adventure. Discover your bedroom leadership style, compatible types, and relationship tips.',
    seoKeywords: ['dominant personality type', 'bedroom leader', 'passionate lover type', 'intimate leadership style', 'charismatic partner'],
  },
  LAF: {
    seoTitle: 'The Wild Maverick - Free-Spirited Intimate Personality',
    seoDesc: 'Are you The Wild Maverick? This adventurous, free-spirited intimate personality type leads with excitement and spontaneity. Discover your intimate style and best-matching types.',
    seoKeywords: ['free spirit personality', 'adventurous lover type', 'wild personality type', 'spontaneous intimate style', 'maverick partner'],
  },
  LSL: {
    seoTitle: 'The Devoted Protector - Caring Intimate Personality Type',
    seoDesc: 'Are you The Devoted Protector? This caring, stability-focused intimate personality leads with devotion and warmth. Learn about your protective love style and ideal partner types.',
    seoKeywords: ['devoted partner type', 'caring lover personality', 'protective intimate style', 'stable relationship type', 'guardian personality'],
  },
  LSF: {
    seoTitle: 'The Cool Strategist - Analytical Intimate Personality',
    seoDesc: 'Are you The Cool Strategist? This calm, technique-focused intimate personality approaches relationships with logic and skill. Discover your analytical love style and compatible types.',
    seoKeywords: ['analytical lover type', 'strategic personality', 'cool intimate style', 'technique focused partner', 'logical relationship type'],
  },
  FAL: {
    seoTitle: 'The Romantic Enthusiast - Passionate Follower Personality',
    seoDesc: 'Are you The Romantic Enthusiast? This romantic, adventurous intimate personality excels at creating mood and emotional connection. Discover your love style and ideal matches.',
    seoKeywords: ['romantic personality type', 'mood maker lover', 'enthusiastic partner type', 'romantic intimate style', 'emotional connection type'],
  },
  FAF: {
    seoTitle: 'The Free Spirit - Fun-Loving Intimate Personality Type',
    seoDesc: 'Are you The Free Spirit? This fun-loving, thrill-seeking intimate personality lives for excitement and new experiences. Discover your vibe-driven love style and compatible types.',
    seoKeywords: ['free spirit lover', 'fun loving personality', 'thrill seeker intimate type', 'party personality', 'excitement driven partner'],
  },
  FSL: {
    seoTitle: 'The Tender Soul - Devoted Follower Personality Type',
    seoDesc: 'Are you The Tender Soul? This deeply devoted intimate personality seeks stability and closeness with unwavering loyalty. Discover your attachment style and best-matching types.',
    seoKeywords: ['devoted follower type', 'tender personality', 'clingy lover type', 'loyal intimate style', 'attachment personality'],
  },
  FSF: {
    seoTitle: 'The Easy-Going Charmer - Gentle Intimate Personality',
    seoDesc: 'Are you The Easy-Going Charmer? This gentle, adaptable intimate personality goes with the flow while creating warm connections. Discover your relaxed love style and ideal matches.',
    seoKeywords: ['easy going personality type', 'charmer lover type', 'gentle intimate style', 'adaptable partner', 'relaxed relationship type'],
  },
};

// Generate SEO metadata
export async function generateMetadata({ params }: TypePageProps) {
  const { typeCode } = params;
  const normalizedCode = getModernPersonalityCode(typeCode);
  const personalityType = personalityTypes.find(
    type => type.code.toLowerCase() === normalizedCode.toLowerCase()
  );

  if (!personalityType) {
    return {
      title: 'Page Not Found',
    };
  }

  const seoData = typeSeoDescriptions[personalityType.code];

  return {
    title: seoData?.seoTitle || `${personalityType.name} (${personalityType.code}) - Intimate Personality Type`,
    description: seoData?.seoDesc || personalityType.description,
    keywords: [
      personalityType.name,
      personalityType.code,
      'intimate personality type',
      'bedroom personality test result',
      'night personality test type',
      ...(seoData?.seoKeywords || []),
      ...personalityType.traits,
    ].join(', '),
    openGraph: {
      title: `${personalityType.name} - ${personalityType.summary} | Night Personality Test`,
      description: seoData?.seoDesc || personalityType.description,
      url: `https://nightpersonality.com/en/types/${typeCode.toLowerCase()}`,
      siteName: 'Night Personality Test',
      locale: 'en_US',
      type: 'article',
    },
    alternates: {
      canonical: `https://nightpersonality.com/en/types/${typeCode.toLowerCase()}`,
      languages: {
        'ja': `https://nightpersonality.com/types/${typeCode.toLowerCase()}`,
        'en': `https://nightpersonality.com/en/types/${typeCode.toLowerCase()}`,
      },
    },
  };
}
