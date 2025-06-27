import { notFound } from 'next/navigation';
import { personalityTypes } from '@/data/personalityTypes';
import PersonalityTypeDetail from '@/components/PersonalityTypeDetail';

interface TypePageProps {
  params: {
    typeCode: string;
  };
}

export default function TypePage({ params }: TypePageProps) {
  const { typeCode } = params;
  
  // 該当する性格タイプを検索
  const personalityType = personalityTypes.find(
    type => type.code.toLowerCase() === typeCode.toLowerCase()
  );
  
  // 該当するタイプが見つからない場合は404
  if (!personalityType) {
    notFound();
  }
  
  return <PersonalityTypeDetail type={personalityType} />;
}

// 静的生成用のパラメータを生成
export async function generateStaticParams() {
  return personalityTypes.map((type) => ({
    typeCode: type.code.toLowerCase(),
  }));
}

// SEO用のメタデータ生成
export async function generateMetadata({ params }: TypePageProps) {
  const { typeCode } = params;
  const personalityType = personalityTypes.find(
    type => type.code.toLowerCase() === typeCode.toLowerCase()
  );
  
  if (!personalityType) {
    return {
      title: 'ページが見つかりません',
    };
  }
  
  return {
    title: `${personalityType.name} (${personalityType.code}) - 夜の性格診断`,
    description: personalityType.description,
    keywords: [
      personalityType.name,
      personalityType.code,
      '性格診断',
      '性格タイプ',
      ...personalityType.traits,
    ].join(', '),
  };
} 