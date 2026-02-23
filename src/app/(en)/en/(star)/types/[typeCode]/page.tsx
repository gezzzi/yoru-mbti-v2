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

  return {
    title: `${personalityType.name} (${personalityType.code}) - Night Personality Test`,
    description: personalityType.description,
    keywords: [
      personalityType.name,
      personalityType.code,
      'personality test',
      'personality type',
      ...personalityType.traits,
    ].join(', '),
    alternates: {
      canonical: `https://nightpersonality.com/en/types/${typeCode.toLowerCase()}`,
      languages: {
        'ja': `https://nightpersonality.com/types/${typeCode.toLowerCase()}`,
        'en': `https://nightpersonality.com/en/types/${typeCode.toLowerCase()}`,
      },
    },
  };
}
