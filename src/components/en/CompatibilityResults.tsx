'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TestResult, PersonalityType } from '../../types/personality';
import { Heart, Share2, Check } from 'lucide-react';
import { personalityTypes } from '../../data/en/personalityTypes';
import Image from 'next/image';
import NeonText from '../NeonText';
import { ScrollAnimation } from '../ScrollAnimation';
import dynamic from 'next/dynamic';

const Fireworks = dynamic(() => import('../Fireworks'), { ssr: false });
const HeartRain = dynamic(() => import('../HeartRain'), { ssr: false });
const SnowfallAnimation = dynamic(() => import('../SnowfallAnimation'), { ssr: false });
const PetalAnimation = dynamic(() => import('../PetalAnimation'), { ssr: false });
import { EnPositionDescriptionModal } from './PositionDescriptionModal';
import { Position48, positions48, PositionMood } from '../../data/en/positions48';
import { questions } from '../../data/en/questions';
import SNSShareModal from '../SNSShareModal';
import { calculateImprovedTagCompatibility, TagScore } from '../../utils/tagCompatibility';
import { getTagRecommendations, selectAndFormatRecommendations, stabilizeRecommendedPlayText } from './CompatibilityResultsHelper';
import { nightCompatibilityDescriptions, NightCompatibilityKey } from '@/data/en/nightCompatibilityDescriptions';
import { buildPersonalityImageSources, getLegacyPersonalityCode } from '@/utils/personalityImage';

interface CompatibilityResult {
  compatibility: number;
  description: string;
  tips: string[];
}

interface CompatibilityResultsProps {
  myResult: TestResult;
  partnerResult: TestResult;
  onBack: () => void;
  onNewTest: () => void;
}

// Horizontal progress bar component
const HorizontalProgressBar: React.FC<{
  percentage: number,
  colorFrom: string,
  colorTo: string,
  isVisible?: boolean,
  delay?: number
}> = ({ percentage, colorFrom, colorTo, isVisible = false, delay = 100 }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const timer = setTimeout(() => {
        setAnimationProgress(percentage);
        setHasAnimated(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [percentage, isVisible, hasAnimated, delay]);

  return (
    <>
      <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorFrom} ${colorTo} rounded-full transition-all duration-1000`}
          style={{ width: `${animationProgress}%` }}
        />
      </div>
      <p className="text-xs text-[#e0e7ff]/60 mt-1 text-right">{Math.round(percentage)}%</p>
    </>
  );
};

// Circular progress bar component
const CircularProgressBar: React.FC<{ percentage: number, size?: number }> = ({ percentage, size = 200 }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animationProgress / 100) * circumference;

  useEffect(() => {
    setAnimationProgress(percentage);
  }, [percentage]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      {/* Progress circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 1s linear',
        }}
      />
      <defs>
        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f9a8d4" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Radar chart component
const RadarChart: React.FC<{ axisScores: { E: number, L: number, A: number, L2: number, O: number }, totalScore: number }> = ({ axisScores, totalScore }) => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const size = 280;
  const center = size / 2;
  const radius = 80;

  useEffect(() => {
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setAnimationProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Pentagon vertex angles (clockwise from top)
  const angles = [
    -Math.PI / 2,
    -Math.PI / 2 + (2 * Math.PI / 5),
    -Math.PI / 2 + (4 * Math.PI / 5),
    -Math.PI / 2 + (6 * Math.PI / 5),
    -Math.PI / 2 + (8 * Math.PI / 5),
  ];

  const axisLabels = ['E/I', 'L/F', 'A/S', 'L/F', 'O/S'];
  const axisValues = [axisScores.E, axisScores.L, axisScores.A, axisScores.L2, axisScores.O];

  // Coordinate calculation
  const getPoint = (angle: number, distance: number) => ({
    x: center + Math.cos(angle) * distance,
    y: center + Math.sin(angle) * distance
  });

  // Background pentagon grid
  const backgroundPentagons = [20, 40, 60, 80, 100].map(percentage => {
    const points = angles.map(angle => {
      const point = getPoint(angle, (radius * percentage) / 100);
      return `${point.x},${point.y}`;
    }).join(' ');
    return { percentage, points };
  });

  // Data polygon with animation
  const dataPoints = angles.map((angle, index) => {
    const value = axisValues[index];
    const pointProgress = Math.max(0, Math.min(1, (animationProgress * 5) - index));
    const animatedValue = value * pointProgress;
    const distance = (radius * animatedValue) / 100;
    return getPoint(angle, distance);
  });

  const dataPolygonPoints = dataPoints.map(point => `${point.x},${point.y}`).join(' ');

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        className="mb-4"
      >
        {/* Background grid */}
        {backgroundPentagons.map(({ percentage, points }) => (
          <polygon
            key={percentage}
            points={points}
            fill="none"
            stroke="rgba(224, 231, 255, 0.2)"
            strokeWidth="1"
          />
        ))}

        {/* Axis lines */}
        {angles.map((angle, index) => {
          const endPoint = getPoint(angle, radius);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endPoint.x}
              y2={endPoint.y}
              stroke="rgba(224, 231, 255, 0.2)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <polygon
          points={dataPolygonPoints}
          fill="rgba(168, 85, 247, 0.3)"
          stroke="#a855f7"
          strokeWidth="2"
          style={{
            opacity: animationProgress,
          }}
        />

        {/* Axis labels */}
        {angles.map((angle, index) => {
          const labelPoint = getPoint(angle, radius + 35);
          let textAnchor: React.SVGProps<SVGTextElement>["textAnchor"] = "middle";
          let dominantBaseline: React.SVGProps<SVGTextElement>["dominantBaseline"] = "middle";

          if (index === 1) { // Lead (top right)
            textAnchor = "start";
            dominantBaseline = "middle";
          } else if (index === 4) { // Open/Private (top left)
            textAnchor = "end";
            dominantBaseline = "middle";
          } else if (index === 0) { // Social (top)
            dominantBaseline = "auto";
          }

          return (
            <text
              key={index}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={textAnchor}
              dominantBaseline={dominantBaseline}
              className="text-sm font-medium fill-[#e0e7ff]"
            >
              {axisLabels[index]}
            </text>
          );
        })}

      </svg>

      {/* Legend */}
      <div className="text-center">
        <div className="mb-3">
          <h4 className="text-sm font-semibold text-[#e0e7ff]">Compatibility Score by Axis</h4>
        </div>
        <div className="text-xs text-[#e0e7ff]/80 space-y-1">
          <div>Social/Reserved: {Math.round(axisScores.E)}% | Lead/Follow: {Math.round(axisScores.L)}%</div>
          <div>Adventurous/Stable: {Math.round(axisScores.A)}% | Devoted/Free: {Math.round(axisScores.L2)}% | Open/Private: {Math.round(axisScores.O)}%</div>
        </div>
      </div>
    </div>
  );
};

// Count-up animation hook
const useCountUp = (end: number, duration: number = 1500, start: boolean = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out for natural feel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, start]);

  return count;
};

const TypeImage: React.FC<{ typeCode: string; emoji: string; name: string }> = ({ typeCode, emoji, name }) => {
  const [imageError, setImageError] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = useMemo(() => buildPersonalityImageSources([typeCode]), [typeCode]);
  const sourceKey = sources.join('|');

  useEffect(() => {
    setSourceIndex(0);
    setImageError(false);
  }, [sourceKey]);

  const handleImageError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };

  if (imageError || sources.length === 0) {
    return <span className="text-6xl md:text-8xl">{emoji}</span>;
  }

  return (
    <div className="w-32 h-32 md:w-48 md:h-48 relative mx-auto mb-4">
      <Image
        src={sources[sourceIndex]}
        alt={name}
        width={192}
        height={192}
        className="w-full h-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
};

const EnCompatibilityResults: React.FC<CompatibilityResultsProps> = ({
  myResult,
  partnerResult,
  onBack,
  onNewTest
}) => {
  // Format your type info
  const myBaseTypeCode = myResult.type.code;
  const myBasePersonalityType = personalityTypes.find(pt => pt.code === myBaseTypeCode) || personalityTypes[0];
  const myTypeWithRuby = useMemo(() => ({
    ...myBasePersonalityType,
    ...myResult.type,
    code: myBaseTypeCode,
    name: myBasePersonalityType.name,
  }), [myResult.type, myBasePersonalityType, myBaseTypeCode]);

  // Format partner type info
  const partnerBaseTypeCode = partnerResult.type.code;
  const partnerBasePersonalityType = personalityTypes.find(pt => pt.code === partnerBaseTypeCode) || personalityTypes[0];
  const partnerTypeWithRuby = useMemo(() => ({
    ...partnerBasePersonalityType,
    ...partnerResult.type,
    code: partnerBaseTypeCode,
    name: partnerBasePersonalityType.name,
  }), [partnerResult.type, partnerBasePersonalityType, partnerBaseTypeCode]);

  const nightCompatibilityKey = `${(getLegacyPersonalityCode(myBaseTypeCode).toLowerCase() || 'elal')}×${(getLegacyPersonalityCode(partnerBaseTypeCode).toLowerCase() || 'elal')}` as NightCompatibilityKey;
  const nightCompatibilityDescription = nightCompatibilityDescriptions[nightCompatibilityKey];
  const nightCompatibilityParagraphs = (nightCompatibilityDescription ?? 'Could not retrieve night compatibility description.')
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0);

  const downloadRef = useRef<HTMLDivElement>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showHeartRain, setShowHeartRain] = useState(false);
  const [showSnowfall, setShowSnowfall] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);
  const [partnerSecretAnswer, setPartnerSecretAnswer] = useState<{ questionId: number; answer: number } | null>(null);
  const [mySecretAnswer, setMySecretAnswer] = useState<{ questionId: number; answer: number } | null>(null);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showSecretConfirm, setShowSecretConfirm] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  const [myUsername, setMyUsername] = useState<string>('');
  const [partnerUsername, setPartnerUsername] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mobile/tablet detection
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Intersection observer for card visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const calculateCompatibility = (user: TestResult, partner: TestResult): CompatibilityResult & {
    axisScores: { E: number, L: number, A: number, L2: number, O: number },
    tagCategoryScores: { [key: string]: number },
    tagDetailScores: { tag: string; score: number; reason: string }[]
  } => {
    // Binarization logic: common count / union

    // Weight settings
    const axisWeights = {
      E: 1.0,
      L: 1.0,
      A: 1.0,
      L2: 1.0,
      O: 1.0
    };

    const tagWeights: { [key: string]: number } = {
      '🔥 欲望の炎': 1.0,
      '💋 キス魔': 1.0,
      '🕯 ロマン重視': 1.0,
      '⚡️ スピード勝負派': 1.0,
      '🛁 アフターケア必須': 1.0,
    };
    const defaultTagWeight = 1.0;

    // 5-axis common judgment (50% threshold)
    let axisCommonWeighted = 0;
    let axisTotalWeighted = 0;

    // E/I axis - similarity axis
    const userE = user.E >= 50 ? 'E' : 'I';
    const partnerE = partner.E >= 50 ? 'E' : 'I';
    if (userE === partnerE) axisCommonWeighted += axisWeights.E;
    axisTotalWeighted += axisWeights.E;

    // L/F axis - complementary axis (match when different)
    const userL = user.L >= 50 ? 'L' : 'F';
    const partnerL = partner.L >= 50 ? 'L' : 'F';
    if (userL !== partnerL) axisCommonWeighted += axisWeights.L;
    axisTotalWeighted += axisWeights.L;

    // A/S axis - similarity axis
    const userA = user.A >= 50 ? 'A' : 'S';
    const partnerA = partner.A >= 50 ? 'A' : 'S';
    if (userA === partnerA) axisCommonWeighted += axisWeights.A;
    axisTotalWeighted += axisWeights.A;

    // L2/F2 axis - similarity axis
    const userL2 = user.L2 >= 50 ? 'L' : 'F';
    const partnerL2 = partner.L2 >= 50 ? 'L' : 'F';
    if (userL2 === partnerL2) axisCommonWeighted += axisWeights.L2;
    axisTotalWeighted += axisWeights.L2;

    // O/S axis - similarity axis
    const userO = user.O >= 50 ? 'O' : 'S';
    const partnerO = partner.O >= 50 ? 'O' : 'S';
    if (userO === partnerO) axisCommonWeighted += axisWeights.O;
    axisTotalWeighted += axisWeights.O;

    // Tag binarization and common judgment
    const userTags = new Set<string>();
    const partnerTags = new Set<string>();

    const userTagScores: TagScore[] = user.additionalResults?.tagScores || [];
    const partnerTagScores: TagScore[] = partner.additionalResults?.tagScores || [];

    userTagScores.forEach(tagScore => {
      if (tagScore.score >= 3) {
        userTags.add(tagScore.tag);
      }
    });

    partnerTagScores.forEach(tagScore => {
      if (tagScore.score >= 3) {
        partnerTags.add(tagScore.tag);
      }
    });

    // Tag common/union calculation (weighted)
    let tagCommonWeighted = 0;
    let tagUnionWeighted = 0;

    const unionTags = new Set<string>();
    userTags.forEach(tag => unionTags.add(tag));
    partnerTags.forEach(tag => unionTags.add(tag));

    unionTags.forEach(tag => {
      const weight = tagWeights[tag] || defaultTagWeight;
      tagUnionWeighted += weight;

      if (userTags.has(tag) && partnerTags.has(tag)) {
        tagCommonWeighted += weight;
      }
    });

    // Compatibility calculation (weighted)
    const numerator = axisCommonWeighted + tagCommonWeighted;
    const denominator = axisTotalWeighted + tagUnionWeighted;

    const compatibility = denominator > 0
      ? Math.round((numerator / denominator) * 100)
      : 0;

    // Detailed scores for display
    const eScore = userE === partnerE ? 100 : 0;
    const lScore = userL !== partnerL ? 100 : 0;
    const aScore = userA === partnerA ? 100 : 0;
    const l2Score = userL2 === partnerL2 ? 100 : 0;
    const oScore = userO === partnerO ? 100 : 0;

    let tagCategoryScores: { [key: string]: number } = {};
    let tagDetailScores: { tag: string; score: number; reason: string }[] = [];

    // Common tags
    const commonTags = new Set<string>();
    userTags.forEach(tag => {
      if (partnerTags.has(tag)) {
        commonTags.add(tag);
      }
    });

    commonTags.forEach(tag => {
      tagDetailScores.push({
        tag: tag,
        score: 100,
        reason: 'Both share this trait'
      });
    });

    userTags.forEach(tag => {
      if (!partnerTags.has(tag)) {
        tagDetailScores.push({
          tag: tag,
          score: 0,
          reason: 'User 1 only'
        });
      }
    });

    partnerTags.forEach(tag => {
      if (!userTags.has(tag)) {
        tagDetailScores.push({
          tag: tag,
          score: 0,
          reason: 'User 2 only'
        });
      }
    });

    let description = '';
    let tips: string[] = [];

    if (compatibility >= 80) {
      description = 'Excellent compatibility! Your values and behavioral patterns are closely aligned, making it easy to understand each other.';
      tips = [
        'Cherish your shared interests and values',
        'Respecting each other\'s individuality will deepen your bond even further',
        'If you\'re too similar in some areas, look for ways to help each other grow'
      ];
    } else if (compatibility >= 60) {
      description = 'Good compatibility. Your differences can actually fuel mutual growth.';
      tips = [
        'Understand each other\'s differences and cultivate a learning mindset',
        'Find common ground and build your relationship from there',
        'Actively acknowledge the good qualities in your partner'
      ];
    } else if (compatibility >= 40) {
      description = 'Average compatibility. Communication will be key to understanding each other.';
      tips = [
        'Make an effort to understand your partner\'s perspective and values',
        'Set aside regular time for meaningful conversations',
        'Aim for a relationship that leverages each other\'s strengths'
      ];
    } else {
      description = 'Compatibility challenges ahead. However, understanding and respecting your differences can create a complementary relationship.';
      tips = [
        'View your differences as unique features, not problems',
        'Practice putting yourself in your partner\'s shoes',
        'Build your connection from small common interests',
        'Aim for a relationship that sparks mutual growth'
      ];
    }

    return {
      compatibility,
      description,
      tips,
      axisScores: {
        E: Math.max(0, Math.min(100, eScore)),
        L: Math.max(0, Math.min(100, lScore)),
        A: Math.max(0, Math.min(100, aScore)),
        L2: Math.max(0, Math.min(100, l2Score)),
        O: Math.max(0, Math.min(100, oScore))
      },
      tagCategoryScores,
      tagDetailScores
    };
  };

  const compatibility = calculateCompatibility(myResult, partnerResult);

  const generateShareText = () => {
    const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://nightpersonality.com';
    return `[Night Personality Test]\n` +
      `Compatibility Result\n` +
      `Our compatibility score is ${Math.round(compatibility.compatibility)}%!\n` +
      `${siteUrl}/en\n` +
      `#NightPersonalityTest`;
  };

  const shareText = generateShareText();

  // Count-up animation
  const animatedScore = useCountUp(Math.round(compatibility.compatibility), 4000, animationStarted);

  // Load secret answers and usernames from localStorage
  useEffect(() => {
    const partnerSecret = localStorage.getItem('en_partner_secret_answer');
    if (partnerSecret) {
      try {
        setPartnerSecretAnswer(JSON.parse(partnerSecret));
      } catch (error) {
        console.error('Failed to load partner secret answer:', error);
      }
    }

    const mySecret = localStorage.getItem('en_my_secret_answer');
    if (mySecret) {
      try {
        setMySecretAnswer(JSON.parse(mySecret));
      } catch (error) {
        console.error('Failed to load my secret answer:', error);
      }
    }

    // Get usernames
    const myName = localStorage.getItem('en_personality_test_username');
    if (myName) {
      setMyUsername(myName);
    }

    const partnerName = localStorage.getItem('en_partner_username');
    if (partnerName) {
      setPartnerUsername(partnerName);
    }
  }, []);

  // Start animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true);

      // Select animation based on compatibility score
      if (compatibility.compatibility < 40) {
        setShowSnowfall(true);
        setTimeout(() => {
          setShowSnowfall(false);
        }, 5000);
      } else if (compatibility.compatibility < 60) {
        setTimeout(() => {
          setShowPetals(true);
          setTimeout(() => {
            setShowPetals(false);
          }, 5500);
        }, 1000);
      } else {
        setShowHeartRain(true);
        setTimeout(() => {
          setShowHeartRain(false);
        }, 5000);
      }

      // Show fireworks for 80%+ scores
      if (compatibility.compatibility >= 80) {
        setTimeout(() => {
          setShowFireworks(true);
          setTimeout(() => {
            setShowFireworks(false);
          }, 4000);
        }, 5000);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [compatibility.compatibility]);

  // Generate intimate compatibility analysis
  const generateIntimateCompatibility = () => {
    const myTagScores = myResult.additionalResults?.tagScores || [];
    const partnerTagScores = partnerResult.additionalResults?.tagScores || [];

    const tagCompatibilityResult = calculateImprovedTagCompatibility(myTagScores, partnerTagScores);

    const myHighTags = myTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
    const partnerHighTags = partnerTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);

    const combinedTags = new Set([...myHighTags, ...partnerHighTags]);
    const sharedTags = myHighTags.filter(tag => partnerHighTags.includes(tag));

    let recommendedPlay = '';

    const score = compatibility.compatibility;
    if (score >= 80) {
      recommendedPlay = `[Score: ${Math.round(score)}%]\nBathed in moonlight, your every breath aligns perfectly. Like long-time lovers who need no words to understand what the other desires -- a fateful connection.`;
    } else if (score >= 60) {
      recommendedPlay = `[Score: ${Math.round(score)}%]\nLike a gentle evening breeze, your warmth dissolves into one another. Sometimes passionate, sometimes tender, you deepen your love with an exquisite rhythm.`;
    } else if (score >= 40) {
      recommendedPlay = `[Score: ${Math.round(score)}%]\nThe thrill of opening an unfamiliar door awaits you. The chemical reaction between your differences may spark unexpected pleasures in this exciting encounter.`;
    } else {
      recommendedPlay = `[Score: ${Math.round(score)}%]\nA journey of discovery through the mist. By taking the time to truly know each other, you may uncover hidden treasures of joy in this relationship.`;
    }

    // Lead/Follow dynamics (L/F axis)
    let dynamics = '\n\n[Dynamics]';
    if (myResult.L > 70 && partnerResult.L < 30) {
      dynamics += 'Every time your fingertips trace their skin, sweet sighs escape. Complete surrender meets complete acceptance -- a beautiful harmony of dominance and submission.';
    } else if (myResult.L < 30 && partnerResult.L > 70) {
      dynamics += 'Held in strong arms, surrendering everything with a sense of security. Guided toward unknown pleasures by your partner\'s confident lead -- a blissful experience.';
    } else if (Math.abs(myResult.L - partnerResult.L) < 20) {
      dynamics += 'Sometimes reaching for each other hungrily, sometimes gently embracing. Roles shift with the mood, creating an ever-evolving dynamic.';
    } else {
      dynamics += 'Push and pull, give and take. The delicious tension of this dance leads to ever deeper pleasure.';
    }
    recommendedPlay += dynamics;

    // Style analysis (E/I and A/S combined)
    let style = '\n\n[Style]';
    const eMatch = Math.abs(myResult.E - partnerResult.E) < 30;
    const aMatch = Math.abs(myResult.A - partnerResult.A) < 30;

    if (eMatch && aMatch) {
      style += 'Your breathing naturally syncs, moving as if you were one. From extended foreplay to the peak, a perfectly paced journey of bliss.';
    } else if ((myResult.E + partnerResult.E) > 100 && (myResult.A + partnerResult.A) > 100) {
      style += 'Fiery passion fills the room. Sweating bodies collide as you explore new positions and uncharted pleasures in an adventurous night.';
    } else if ((myResult.E + partnerResult.E) < 60 && (myResult.A + partnerResult.A) < 60) {
      style += 'Like slowly melting chocolate, time dissolves. Savoring every gesture, checking each other\'s reactions, deepening love moment by moment.';
    } else {
      style += 'Like puzzle pieces clicking together, your differences create new sensations. Unexpected chemistry forges an unforgettable night.';
    }
    recommendedPlay += style;

    // Communication (O axis)
    if (myResult.O > 60 || partnerResult.O > 60) {
      recommendedPlay += ' "More..." "Right there..." Words free of shame drive your excitement to its peak.';
    } else if (myResult.O < 40 && partnerResult.O < 40) {
      recommendedPlay += ' Eyes locked, communicating through trembles and whispered breaths -- a wordless conversation.';
    }

    // Emotional depth (L2 axis)
    if (Math.abs(myResult.L2 - partnerResult.L2) < 30) {
      recommendedPlay += '\n\n[Bond] The moment you embrace, your heartbeats synchronize, your souls seem to melt together. A miraculous connection where you pour love at the same depth.';
    } else if (myResult.L2 > 70 || partnerResult.L2 > 70) {
      recommendedPlay += '\n\n[Bond] Overwhelmingly tender. With every touch, hearts draw closer. Something far beyond mere pleasure -- a special time wrapped in deep affection.';
    }

    // Tag-based recommendations
    const tagBasedRecommendations = () => {
      const allRecommendations = getTagRecommendations(combinedTags);
      const seed = myResult.A + partnerResult.A + myResult.O + partnerResult.O;
      return selectAndFormatRecommendations(allRecommendations, 3, seed);
    };

    const tagRecommendations = tagBasedRecommendations();
    if (tagRecommendations) recommendedPlay += tagRecommendations;

    // Shared traits
    if (sharedTags.length > 0) {
      recommendedPlay += `\n\n[In Common] ${sharedTags[0]}`;
      if (sharedTags.length > 1) {
        recommendedPlay += ` +${sharedTags.length - 1} more`;
      }
    }

    // Text stabilization (800-900 char target)
    const seed = myResult.E + partnerResult.E + myResult.L + partnerResult.L;
    recommendedPlay = stabilizeRecommendedPlayText(recommendedPlay, 800, 900, seed);

    let topPositionMood: PositionMood | null = null;

    // Recommended positions (based on 5-axis data and tags)
    const recommendedPositions = (() => {
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);

      const moodPriorities: PositionMood[] = [];

      // 1. L/F axis determines base mood
      if ((myResult.L > 70 && partnerResult.L < 30) || (myResult.L < 30 && partnerResult.L > 70)) {
        moodPriorities.push('wild');
      } else if (myResult.L < 50 && partnerResult.L < 50) {
        moodPriorities.push('romantic');
      }

      // 2. A/S axis determines adventure level
      if (myResult.A > 50 && partnerResult.A > 50) {
        moodPriorities.push('technical');
      } else if (myResult.A < 30 && partnerResult.A < 30) {
        moodPriorities.push('romantic');
      } else {
        moodPriorities.push('playful');
      }

      // 3. Tag-based adjustments
      if (combinedTags.has('🕯 ロマン重視') || combinedTags.has('🛁 アフターケア必須')) {
        moodPriorities.push('romantic');
      }
      if (combinedTags.has('⚡️ スピード勝負派') || combinedTags.has('🔥 欲望の炎')) {
        moodPriorities.push('wild');
      }
      if (combinedTags.has('💬 言語プレイ派')) {
        moodPriorities.push('playful');
      }

      topPositionMood = moodPriorities[0] ?? null;

      // 4. Difficulty filter
      const maxDifficulty = (myResult.A > 70 && partnerResult.A > 70) ? 'hard' :
                           (myResult.A > 40 && partnerResult.A > 40) ? 'medium' : 'easy';

      // 5. Select positions (based on priority moods)
      const selectedPositions: Position48[] = [];
      const usedIds = new Set();

      for (const mood of moodPriorities) {
        const candidates = positions48.filter(pos =>
          pos.moods.includes(mood) &&
          !usedIds.has(pos.id) &&
          (maxDifficulty === 'hard' ||
           (maxDifficulty === 'medium' && pos.difficulty !== 'hard') ||
           (maxDifficulty === 'easy' && pos.difficulty === 'easy'))
        );

        if (candidates.length > 0 && selectedPositions.length < 3) {
          const seed: number = (myResult.E + partnerResult.E + myResult.L + partnerResult.L) % candidates.length;
          const selected: Position48 = candidates[seed];
          selectedPositions.push(selected);
          usedIds.add(selected.id);
        }
      }

      while (selectedPositions.length < 3) {
        const remainingPositions = positions48.filter(pos =>
          !usedIds.has(pos.id) &&
          (maxDifficulty === 'hard' ||
           (maxDifficulty === 'medium' && pos.difficulty !== 'hard') ||
           (maxDifficulty === 'easy' && pos.difficulty === 'easy'))
        );

        if (remainingPositions.length > 0) {
          const seed: number = (myResult.O + partnerResult.O + selectedPositions.length * 37) % remainingPositions.length;
          const selected: Position48 = remainingPositions[seed];
          selectedPositions.push(selected);
          usedIds.add(selected.id);
        } else {
          const allRemainingPositions = positions48.filter(pos => !usedIds.has(pos.id));
          if (allRemainingPositions.length > 0) {
            const seed: number = (myResult.L2 + partnerResult.L2 + selectedPositions.length * 31) % allRemainingPositions.length;
            const selected: Position48 = allRemainingPositions[seed];
            selectedPositions.push(selected);
            usedIds.add(selected.id);
          } else {
            break;
          }
        }
      }

      return selectedPositions;
    })();

    const calculateRecommendedPositionScore = (primaryMood: PositionMood | null) => {
      const clampScore = (value: number) => Math.max(0, Math.min(100, value));

      const averageA = (myResult.A + partnerResult.A) / 2;
      const eAlignment = clampScore(100 - Math.abs(myResult.E - partnerResult.E));
      const lComplement = clampScore(Math.abs(myResult.L - partnerResult.L));

      const scoreCentered = (value: number, center: number, tolerance: number) => {
        const distance = Math.abs(value - center);
        const normalized = Math.min(distance / tolerance, 1);
        return clampScore((1 - normalized) * 100);
      };

      const scoreHighPreference = (value: number, threshold: number) => {
        if (value <= threshold) return 0;
        const normalized = (value - threshold) / (100 - threshold);
        return clampScore(normalized * 100);
      };

      const mood = primaryMood ?? 'playful';

      let aAlignment: number;
      switch (mood) {
        case 'romantic':
          aAlignment = scoreCentered(averageA, 35, 35);
          break;
        case 'technical':
          aAlignment = scoreHighPreference(averageA, 55);
          break;
        case 'wild':
          aAlignment = scoreHighPreference(averageA, 60);
          break;
        case 'foreplay':
          aAlignment = scoreCentered(averageA, 40, 30);
          break;
        default:
          aAlignment = scoreCentered(averageA, 50, 35);
          break;
      }

      const weightedScore = (aAlignment * 0.4) + (lComplement * 0.3) + (eAlignment * 0.3);
      return Math.round(clampScore(weightedScore));
    };

    const recommendedPositionScore = calculateRecommendedPositionScore(topPositionMood);

    // Position analysis text
    const positionAnalysis = (() => {
      const avgA = (myResult.A + partnerResult.A) / 2;
      if (avgA > 70) return 'Enjoy it passionately and intensely';
      if (avgA < 30) return 'Take it slow and gentle';
      return 'A balanced mix of teasing and pleasure';
    })();

    // Libido balance
    const generateLibidoBalance = () => {
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);

      const calculateLibidoLevel = (result: any, tags: string[]) => {
        let baseLevel = 0;
        baseLevel += result.E * 0.3;
        baseLevel += result.A * 0.2;
        baseLevel += result.O * 0.2;

        if (tags.includes('🔥 欲望の炎')) baseLevel += 20;
        if (tags.includes('🔄 リピート求め派')) baseLevel += 15;
        if (tags.includes('⚡️ スピード勝負派')) baseLevel += 10;
        if (tags.includes('🏃‍♂️ 衝動トリガー型')) baseLevel += 10;
        if (tags.includes('☀️ 朝型エロス')) baseLevel += 5;

        if (tags.includes('💤 まったり派')) baseLevel -= 10;
        if (tags.includes('🕯 ロマン重視')) baseLevel -= 5;

        return Math.min(100, Math.max(0, baseLevel));
      };

      const myLibidoLevel = calculateLibidoLevel(myResult, myTags);
      const partnerLibidoLevel = calculateLibidoLevel(partnerResult, partnerTags);

      const difference = Math.abs(myLibidoLevel - partnerLibidoLevel);

      let analysis = '';

      if (difference < 15) {
        if (myLibidoLevel >= 70 && partnerLibidoLevel >= 70) {
          analysis = 'Battle mode every night! Mutual desire explodes';
        } else if (myLibidoLevel >= 50 && partnerLibidoLevel >= 50) {
          analysis = 'Great balance for getting in the mood together';
        } else if (myLibidoLevel < 30 && partnerLibidoLevel < 30) {
          analysis = 'A peaceful relationship where love grows slowly';
        } else {
          analysis = 'An ideal relationship where your paces match';
        }
      } else if (difference < 30) {
        if (myLibidoLevel > partnerLibidoLevel) {
          analysis = 'Slight temperature gap. You may need to take the lead';
        } else {
          analysis = 'Slight temperature gap. Try matching your partner\'s pace';
        }
      } else {
        analysis = 'Big temperature gap! Communication is crucial';
      }

      if (combinedTags.has('🔥 欲望の炎') && combinedTags.has('🔄 リピート求め派')) {
        analysis += '. One night won\'t be enough for this passionate duo';
      } else if (combinedTags.has('🕯 ロマン重視') && combinedTags.has('🛁 アフターケア必須')) {
        analysis += '. A deep relationship that values quality over quantity';
      } else if (combinedTags.has('⚡️ スピード勝負派') && combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
        analysis += '. Spontaneous passion is likely to ignite often';
      }

      return analysis;
    };

    const libidoBalance = generateLibidoBalance();

    // Before-relationship values
    const generateBeforeRelationship = () => {
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);

      const clamp = (value: number) => Math.max(0, Math.min(100, value));

      const averageA = (myResult.A + partnerResult.A) / 2;
      const aCloseness = clamp(100 - Math.abs(myResult.A - partnerResult.A));
      const l2FreeAlignment = clamp(100 - ((myResult.L2 + partnerResult.L2) / 2));
      const opennessAlignment = clamp((myResult.O + partnerResult.O) / 2);

      const compositeScore = clamp(
        (aCloseness * 0.5) +
        (l2FreeAlignment * 0.3) +
        (opennessAlignment * 0.2)
      );

      const myReadiness = clamp(
        (clamp(100 - Math.abs(myResult.A - averageA)) * 0.5) +
        ((50 - Math.min(50, myResult.L2)) * 0.6) +
        (myResult.O * 0.4)
      );

      const partnerReadiness = clamp(
        (clamp(100 - Math.abs(partnerResult.A - averageA)) * 0.5) +
        ((50 - Math.min(50, partnerResult.L2)) * 0.6) +
        (partnerResult.O * 0.4)
      );

      const myAnswer = myReadiness >= 55 ? 'YES' : 'NO';
      const partnerAnswer = partnerReadiness >= 55 ? 'YES' : 'NO';

      let analysis = '';

      if (myAnswer === 'YES' && partnerAnswer === 'YES') {
        analysis = 'Starting with physical chemistry. You\'re both proactive and direct';
        if (compositeScore >= 80) {
          analysis += '. Things could heat up fast from the very first night';
        }
        if (combinedTags.has('🏃‍♂️ 衝動トリガー型') && combinedTags.has('⚡️ スピード勝負派')) {
          analysis += '. Following your impulses won\'t lead to regret';
        }
      } else if (myAnswer === 'YES' && partnerAnswer === 'NO') {
        analysis = 'Feelings and timing are key. It depends on your emotions and their readiness';
        if (partnerReadiness < 40) {
          analysis += '. Take it slow and create a comfortable atmosphere';
        }
      } else if (myAnswer === 'NO' && partnerAnswer === 'YES') {
        analysis = 'Watch for differing values. Their eagerness might catch you off guard';
        if (combinedTags.has('🚪 NG明確')) {
          analysis += '. Setting clear boundaries is important';
        }
      } else {
        analysis = 'The classic approach: romance first. Let feelings deepen naturally';
        if (combinedTags.has('🕯 ロマン重視')) {
          analysis += '. Cherish the romantic progression';
        }
      }

      const readinessGap = Math.abs(myReadiness - partnerReadiness);
      if (readinessGap > 35) {
        analysis += '. There\'s a temperature gap, so careful communication is needed';
      }

      if (combinedTags.has('🔥 欲望の炎')) {
        analysis += '. Agree on a signal before things get too heated';
      }

      return {
        score: compositeScore,
        analysis
      };
    };

    const beforeRelationship = generateBeforeRelationship();

    // Gap analysis
    const generateGapAnalysis = () => {
      const clamp = (value: number) => Math.max(0, Math.min(100, value));
      const myTagScores = myResult.additionalResults?.tagScores || [];
      const partnerTagScores = partnerResult.additionalResults?.tagScores || [];

      const myHighTags = myTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
      const partnerHighTags = partnerTagScores.filter(ts => ts.score >= 3).map(ts => ts.tag);
      const combinedTags = new Set([...myHighTags, ...partnerHighTags]);

      const gaps = {
        E: Math.abs(myResult.E - partnerResult.E),
        L: Math.abs(myResult.L - partnerResult.L),
        A: Math.abs(myResult.A - partnerResult.A),
        L2: Math.abs(myResult.L2 - partnerResult.L2),
        O: Math.abs(myResult.O - partnerResult.O)
      };

      let gapScore = 0;
      gapScore += gaps.E * 0.15;
      gapScore += gaps.L * 0.25;
      gapScore += gaps.A * 0.20;
      gapScore += gaps.L2 * 0.20;
      gapScore += gaps.O * 0.20;

      const tagDifferences = {
        critical: 0,
        significant: 0,
        minor: 0
      };

      myTagScores.forEach(myTag => {
        const partnerTag = partnerTagScores.find(pt => pt.tag === myTag.tag);
        if (partnerTag) {
          const scoreDiff = Math.abs(myTag.score - partnerTag.score);

          if (myTag.tag === '🕯 ロマン重視' && myTag.score >= 3) {
            const partnerSpeed = partnerTagScores.find(pt => pt.tag === '⚡️ スピード勝負派');
            if (partnerSpeed && partnerSpeed.score >= 3) {
              tagDifferences.critical++;
            }
          }
          if (myTag.tag === '⚡️ スピード勝負派' && myTag.score >= 3) {
            const partnerRomance = partnerTagScores.find(pt => pt.tag === '🕯 ロマン重視');
            if (partnerRomance && partnerRomance.score >= 3) {
              tagDifferences.critical++;
            }
          }

          if (myTag.tag === '🛁 アフターケア必須' && scoreDiff >= 3) {
            tagDifferences.significant++;
          }
        }
      });

      gapScore += tagDifferences.critical * 20;
      gapScore += tagDifferences.significant * 10;

      let analysis = '';

      if (gapScore < 25) {
        analysis = 'Near-perfect match! Your values align remarkably';

        const sharedHighTags = myHighTags.filter(tag => partnerHighTags.includes(tag));
        if (sharedHighTags.length > 3) {
          analysis += '. Many shared preferences create deep mutual understanding';
        }
      } else if (gapScore < 40) {
        analysis = 'Good match. Small differences add healthy spice';

        const maxGapAxis = Object.entries(gaps).reduce((a, b) => a[1] > b[1] ? a : b)[0];
        if (maxGapAxis === 'L' && gaps.L > 30) {
          analysis += '. Watch the balance of control';
        } else if (maxGapAxis === 'A' && gaps.A > 30) {
          analysis += '. Discuss new adventures together first';
        }
      } else if (gapScore < 60) {
        analysis = 'Noticeable gaps. But you can learn to enjoy the differences';

        if (tagDifferences.critical > 0) {
          analysis += '. Bridge value differences through open conversation';
        } else if (gaps.L > 40 && gaps.A > 40) {
          analysis += '. Exciting, but expect some friction';
        }
      } else {
        analysis = 'Major gaps! Understanding and compromise are essential';

        if (tagDifferences.critical > 1) {
          analysis += '. Fundamental value differences need attention';
        } else if (gaps.L2 > 60) {
          analysis += '. Different views on love could be a challenge';
        }
      }

      if (combinedTags.has('🚪 NG明確') && combinedTags.has('💬 言語プレイ派')) {
        analysis += '. Good communication skills will see you through';
      }
      if (myHighTags.includes('🔥 欲望の炎') && partnerHighTags.includes('🔥 欲望の炎')) {
        analysis += '. Expect an intensely passionate connection';
      }

      const normalizedGap = Math.min(gapScore, 100);
      const gapConsistencyScore = clamp(100 - normalizedGap);

      return {
        analysis,
        score: gapConsistencyScore
      };
    };

    const gapAnalysis = generateGapAnalysis();

    // Relationship prediction
    const generateRelationshipPrediction = () => {
      const clamp = (value: number) => Math.max(0, Math.min(100, value));
      const myTags = myResult.additionalResults?.tags || [];
      const partnerTags = partnerResult.additionalResults?.tags || [];
      const combinedTags = new Set([...myTags, ...partnerTags]);
      const sharedTags = myTags.filter(tag => partnerTags.includes(tag));

      let emotionalDepth = 0;
      let physicalIntensity = 0;
      let stabilityScore = 0;
      let passionScore = 0;

      if (myResult.L2 > 50 && partnerResult.L2 > 50) {
        emotionalDepth += 40;
      } else if (myResult.L2 < 30 && partnerResult.L2 < 30) {
        emotionalDepth -= 20;
      } else {
        emotionalDepth += 10;
      }

      if (combinedTags.has('🕯 ロマン重視')) emotionalDepth += 15;
      if (combinedTags.has('🛁 アフターケア必須')) emotionalDepth += 10;
      if (sharedTags.includes('💬 言語プレイ派')) emotionalDepth += 5;

      physicalIntensity += (myResult.E + partnerResult.E) / 4;
      physicalIntensity += (myResult.A + partnerResult.A) / 6;

      if (combinedTags.has('🔥 欲望の炎')) physicalIntensity += 20;
      if (combinedTags.has('🔄 リピート求め派')) physicalIntensity += 15;
      if (combinedTags.has('⚡️ スピード勝負派')) physicalIntensity += 10;

      const axisDifferences = Math.abs(myResult.E - partnerResult.E) +
                             Math.abs(myResult.L - partnerResult.L) +
                             Math.abs(myResult.A - partnerResult.A) +
                             Math.abs(myResult.L2 - partnerResult.L2) +
                             Math.abs(myResult.O - partnerResult.O);

      stabilityScore = 100 - (axisDifferences / 5);

      if (sharedTags.length > 3) stabilityScore += 15;

      passionScore = (physicalIntensity + emotionalDepth) / 2;
      if (combinedTags.has('☀️ 朝型エロス')) {
        passionScore += 5;
      }

      const totalScore = (emotionalDepth * 0.3 + physicalIntensity * 0.2 +
                         stabilityScore * 0.3 + passionScore * 0.2);

      let prediction = '';
      let predictionTier: 'high' | 'medium' | 'low';

      if (totalScore >= 75) {
        predictionTier = 'high';
        if (emotionalDepth >= 60 && stabilityScore >= 70) {
          prediction = 'Even if it starts with physical attraction, deep love is highly likely to develop.';
          prediction += 'Beyond just a physical connection, there\'s a strong spiritual bond between you two.';
          prediction += 'What may begin as physical chemistry can evolve into a true understanding of each other\'s inner selves and a genuine partnership over time.';

          if (sharedTags.includes('🕯 ロマン重視')) {
            prediction += 'As two people who value romance, you can create special moments even in everyday life.';
            prediction += 'Candlelight, soft music, gentle touches -- a love expressed through all five senses that never fades with time.';
          }

          if (emotionalDepth >= 80) {
            prediction += 'Your emotional connection runs especially deep, allowing you to sense each other\'s desires without words -- a truly ideal relationship.';
            prediction += 'Intimacy becomes not just about pleasure, but a precious expression of love.';
          }

          if (Math.abs(myResult.L - partnerResult.L) > 40) {
            prediction += 'The lead-follow balance is exquisite, with roles falling naturally into place for a stress-free relationship.';
          }
        } else if (physicalIntensity >= 70) {
          prediction = 'A passionate relationship that will last. Fulfilling days await where both heart and body are satisfied.';
          prediction += 'Irresistible desire and passion drive this connection.';
          prediction += 'Through intense nights together, deeper bonds form, evolving into a relationship where you seek each other even in daily life.';

          if (combinedTags.has('🔥 欲望の炎')) {
            prediction += 'This burning flame won\'t go out easily. Over time, you\'ll learn to satisfy each other\'s desires in ever more refined ways.';
            prediction += 'In everyday moments, sudden sparks of passion will strengthen your bond even further.';
          }

          if (myResult.E > 70 && partnerResult.E > 70) {
            prediction += 'Both being outgoing and proactive, you can enjoy adventures in new experiences and settings.';
            prediction += 'Boredom is impossible -- you\'ll maintain a relationship filled with fresh excitement.';
          }
        } else {
          prediction = 'A well-balanced, ideal relationship awaits.';
          prediction += 'Neither too intense nor too cold -- a comfortable temperature that lasts.';
          prediction += 'Both in intimacy and daily life, you respect each other\'s pace and maintain a comfortable distance.';
          prediction += 'Sometimes passionate, sometimes gentle -- a mature relationship that flexibly adapts to each moment.';

          if (stabilityScore >= 60) {
            prediction += 'With particularly high stability, this is an ideal combination for building a long-term partnership.';
          }
        }
      } else if (totalScore >= 50) {
        predictionTier = 'medium';
        if (emotionalDepth < 30) {
          prediction = 'Physical chemistry is off the charts. But deepening into romance will be challenging.';
          prediction += 'The physical attraction is strong, with intense pleasure every time you\'re together.';
          prediction += 'However, building a deeper emotional connection may prove difficult.';

          if (myResult.L2 < 30 && partnerResult.L2 < 30) {
            prediction += 'You\'re both able to keep things casual, so this arrangement works fine.';
            prediction += 'A free relationship without attachment or dependency.';
            prediction += 'Just be careful -- if one person catches feelings, the balance could shift.';
          } else {
            prediction += 'If one partner tends toward emotional attachment, the dynamic could become painful.';
            prediction += 'Defining the relationship clearly from the start helps avoid trouble down the road.';
          }

          if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
            prediction += 'Impulsive encounters and partings may repeat. That too is a valid relationship style.';
          }
        } else if (stabilityScore < 40) {
          prediction = 'You\'ll burn bright, but longevity may be tough.';
          prediction += 'From the moment you meet, the attraction is magnetic and the nights are passionate.';
          prediction += 'However, that very intensity makes sustaining the relationship challenging.';

          if (axisDifferences > 200) {
            prediction += 'Value differences could become critical.';
            prediction += 'While nights together are intense, differences in daily thinking and behavior may gradually widen the gap.';
            prediction += 'Whether you can accept each other\'s differences is the key.';
          } else {
            prediction += 'Expect emotional ups and downs -- frequent fights followed by passionate reconciliations.';
            prediction += 'Makeup nights will be especially heated, but the emotional toll may add up.';
          }

          if (myResult.A > 70 || partnerResult.A > 70) {
            prediction += 'A strong appetite for adventure means one partner may always crave new thrills.';
          }
        } else {
          prediction = 'A decent relationship, but something might feel missing.';
          prediction += 'Not bad, but not exceptional either -- a delicately balanced dynamic.';
          prediction += 'Stable, yet you may sometimes feel a lack of spark or passion.';

          if (physicalIntensity < 40) {
            prediction += 'More passion is needed.';
            prediction += 'Intimacy tends to be understated, potentially leaving both partners unsatisfied.';
            prediction += 'Consciously trying new things and setting the mood can help improve the relationship.';
          } else {
            prediction += 'Physical compatibility is fine, so investing in emotional connection could elevate things further.';
            prediction += 'Prioritize daily communication and understanding each other\'s inner world.';
          }
        }
      } else {
        predictionTier = 'low';
        if (physicalIntensity >= 60 && emotionalDepth < 20) {
          prediction = 'Better suited as physical partners. Emotional investment is risky.';
          prediction += 'The physical attraction is strong, but pursuing anything deeper is inadvisable.';
          prediction += 'Keeping things casual lets you both enjoy the pleasure without getting hurt.';

          if (combinedTags.has('🏃‍♂️ 衝動トリガー型')) {
            prediction += 'One passionate night might be the best approach.';
            prediction += 'Enjoy an intense evening and part ways cleanly.';
            prediction += 'Sometimes the memory alone is worth keeping.';
          } else {
            prediction += 'Even with regular meetups, avoid emotional attachment.';
            prediction += 'Set rules and maintain an adult relationship that doesn\'t interfere with each other\'s lives.';
          }

          if (myResult.O < 30 || partnerResult.O < 30) {
            prediction += 'With a private streak, keeping personal boundaries intact is ideal.';
          }
        } else if (stabilityScore < 30) {
          prediction = 'Frequent conflicts make sustaining this relationship difficult.';
          prediction += 'The gap in values and personalities is significant, potentially making time together stressful.';
          prediction += 'Even in the bedroom, your desires may be too different to satisfy each other.';

          if ((myResult.L > 70 && partnerResult.L > 70)) {
            prediction += 'Power struggles are exhausting.';
            prediction += 'Both wanting to lead creates constant tension.';
            prediction += 'This control battle plays out both in and out of the bedroom, risking relationship breakdown.';
          } else {
            prediction += 'Fundamental compatibility is lacking -- rather than forcing it, stepping back may be the wiser choice.';
            prediction += 'Better-matched partners likely exist for both of you.';
          }
        } else {
          prediction = 'It may be best not to force this connection.';
          prediction += 'Unfortunately, this combination lacks fundamental compatibility.';
          prediction += 'A casual encounter might work, but building a long-term relationship would be very challenging.';
          prediction += 'For both your happiness, reconsidering the relationship early on is recommended.';
          prediction += 'Forcing it forward risks hurting each other in the end.';
        }
      }

      if (sharedTags.includes('🛁 アフターケア必須') && emotionalDepth >= 50) {
        prediction += 'Tenderness is the key to deepening your bond.';
        prediction += 'Gentle aftercare following intense nights will make your relationship even stronger.';
        prediction += 'A beautiful dynamic where love for each other shows through in everyday actions.';
      }
      if (sharedTags.includes('🗣 下ネタOK')) {
        prediction += 'Being open about desires lets you build an ideal relationship of honest communication.';
      }

      const gapConsistency = gapAnalysis.score;
      const l2Closeness = clamp(100 - Math.abs(myResult.L2 - partnerResult.L2));
      const stabilityClamped = clamp(stabilityScore);

      let minRange = 0;
      let maxRange = 54;

      if (predictionTier === 'high') {
        minRange = 80;
        maxRange = 100;
      } else if (predictionTier === 'medium') {
        minRange = 55;
        maxRange = 79;
      }

      const adjustmentSource = (gapConsistency * 0.4) + (l2Closeness * 0.3) + (stabilityClamped * 0.3);
      const adjusted = minRange + ((maxRange - minRange) * (adjustmentSource / 100));
      const relationshipScore = clamp(adjusted);

      return {
        prediction,
        score: relationshipScore
      };
    };

    const relationshipPrediction = generateRelationshipPrediction();

    return {
      recommendedPlay,
      recommendedPosition: positionAnalysis,
      recommendedPositions,
      recommendedPositionScore,
      libidoBalance,
      beforeRelationship: beforeRelationship.analysis,
      beforeRelationshipScore: beforeRelationship.score,
      gapAnalysis: gapAnalysis.analysis,
      gapConsistencyScore: gapAnalysis.score,
      relationshipPrediction: relationshipPrediction.prediction,
      relationshipPredictionScore: relationshipPrediction.score
    };
  };

  const intimateCompatibility = generateIntimateCompatibility();

  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return 'from-emerald-500/20 via-green-500/15 to-teal-500/20';
    if (score >= 60) return 'from-blue-500/20 via-cyan-500/15 to-blue-600/20';
    if (score >= 40) return 'from-amber-500/20 via-yellow-500/15 to-orange-500/20';
    return 'from-red-500/20 via-pink-500/15 to-rose-500/20';
  };

  const getCompatibilityIcon = (score: number) => {
    return <Heart className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />;
  };


  return (
    <div className="relative z-10 min-h-screen pt-28 pb-12">
      {/* Celebration fireworks */}
      {showFireworks && <Fireworks />}

      {/* Download container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={downloadRef}>
          {/* Hero Section */}
          <div className="text-white text-center mb-12">
            <ScrollAnimation animation="fadeIn" duration={800}>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
                <NeonText text={["Compatibility", "Results"]} specialCharIndex={1} className="gap-1" />
              </h1>
            </ScrollAnimation>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Compatibility Result */}
            <ScrollAnimation animation="fadeInUp" delay={200}>
              <div className="rounded-xl py-4 sm:py-6 relative">
                {/* Animation based on score */}
                {showSnowfall && <SnowfallAnimation />}
                {showPetals && <PetalAnimation />}
                {showHeartRain && <HeartRain />}

                <div className="text-center relative z-10">
                  {/* Username display */}
                  <div className="flex justify-center items-center gap-4 sm:gap-8 mb-6">
                    {/* You */}
                    <div className="text-center">
                      {myUsername && (
                        <p className="text-[#e0e7ff] text-2xl sm:text-3xl md:text-4xl font-bold">{myUsername}</p>
                      )}
                    </div>

                    {/* Heart icon */}
                    <div className="text-pink-400">
                      <Heart className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                    </div>

                    {/* Partner */}
                    <div className="text-center">
                      {partnerUsername && (
                        <p className="text-[#e0e7ff] text-2xl sm:text-3xl md:text-4xl font-bold">{partnerUsername}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-center mb-4 sm:mb-6">
                    <div className="relative flex items-center justify-center">
                      <CircularProgressBar percentage={animatedScore} size={180} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-pink-400">{animatedScore}%</span>
                        <span className="mt-1 text-base sm:text-lg text-[#e0e7ff]/80">Match Score</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-white text-xl sm:text-2xl font-medium leading-relaxed">
                    {compatibility.description}
                  </p>
                  {/* Share button */}
                  {isMobile && (
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => setShowShareModal(true)}
                        className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-lg sm:text-lg"
                      >
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Share</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fadeInUp" delay={600}>
              <div ref={cardRef} className="rounded-xl py-4 sm:py-6">
                <div className="space-y-16 sm:space-y-20">
                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                      <h4 className="font-head font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                        Night Compatibility
                      </h4>
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                    </div>
                    <div className="px-4">
                      <HorizontalProgressBar
                        percentage={compatibility.compatibility}
                        colorFrom="from-purple-500"
                        colorTo="to-pink-500"
                        isVisible={cardVisible}
                        delay={700}
                      />
                    </div>
                    <div className="mt-4 space-y-4 text-center">
                      {nightCompatibilityParagraphs.map((paragraph, index) => (
                        <p
                          key={`night-compatibility-${index}`}
                          className="text-white text-xl sm:text-2xl leading-relaxed break-words"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                      <h4 className="font-head font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                        Physical First?
                      </h4>
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                    </div>
                    <div className="px-4">
                      <HorizontalProgressBar
                        percentage={intimateCompatibility.beforeRelationshipScore}
                        colorFrom="from-green-500"
                        colorTo="to-emerald-500"
                        isVisible={cardVisible}
                        delay={900}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-white text-xl sm:text-2xl leading-relaxed break-words">
                        {intimateCompatibility.beforeRelationship}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                      <h4 className="font-head font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                        Recommended Positions
                      </h4>
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                    </div>
                    <div className="px-4">
                      <HorizontalProgressBar
                        percentage={intimateCompatibility.recommendedPositionScore}
                        colorFrom="from-blue-500"
                        colorTo="to-cyan-500"
                        isVisible={cardVisible}
                        delay={1100}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {intimateCompatibility.recommendedPositions.map((position: Position48) => (
                          <div
                            key={position.id}
                            className="bg-white/10 border border-white/20 rounded-lg p-3 relative cursor-pointer hover:bg-white/20 transition-colors"
                            onClick={() => setSelectedPosition(position)}
                          >
                            <span className="absolute top-3 right-3 text-xs text-[#e0e7ff]/60">No.{position.id}</span>
                            <div className="text-center mb-2">
                              <p className="text-xs text-[#e0e7ff]/70 mb-1">({position.kana || position.name})</p>
                              <h5 className="font-semibold text-[#e0e7ff]">{position.name}</h5>
                            </div>
                            <div className="flex flex-wrap gap-1 justify-center mb-2">
                              {position.moods.map(mood => {
                                const moodColors: { [key: string]: string } = {
                                  romantic: 'bg-pink-500/20 border-pink-400 text-pink-300',
                                  wild: 'bg-red-500/20 border-red-400 text-red-300',
                                  playful: 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
                                  technical: 'bg-purple-500/20 border-purple-400 text-purple-300',
                                  foreplay: 'bg-blue-500/20 border-blue-400 text-blue-300'
                                };
                                const moodDescriptions: { [key: string]: string } = {
                                  romantic: 'Romantic',
                                  wild: 'Wild',
                                  playful: 'Playful',
                                  technical: 'Technical',
                                  foreplay: 'Foreplay'
                                };
                                return (
                                  <span
                                    key={mood}
                                    className={`px-2 py-0.5 text-xs rounded-full border ${moodColors[mood]}`}
                                  >
                                    {moodDescriptions[mood]}
                                  </span>
                                );
                              })}
                            </div>
                            <div className="text-center">
                              <span className="text-xs text-pink-400">
                                Difficulty: {position.difficulty === 'easy' ? (
                                  <>
                                    <span className="text-pink-400 text-base">&#9829;</span>
                                    <span className="text-gray-400 text-base">&#9829;&#9829;</span>
                                  </>
                                ) : position.difficulty === 'medium' ? (
                                  <>
                                    <span className="text-pink-400 text-base">&#9829;&#9829;</span>
                                    <span className="text-gray-400 text-base">&#9829;</span>
                                  </>
                                ) : (
                                  <span className="text-pink-400 text-base">&#9829;&#9829;&#9829;</span>
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-white text-xl sm:text-2xl text-center mt-4">
                        {intimateCompatibility.recommendedPosition}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                      <h4 className="font-head font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                        Relationship Forecast
                      </h4>
                      <span
                        aria-hidden="true"
                        className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                      />
                    </div>
                    <div className="px-4">
                      <HorizontalProgressBar
                        percentage={intimateCompatibility.relationshipPredictionScore}
                        colorFrom="from-amber-500"
                        colorTo="to-orange-500"
                        isVisible={cardVisible}
                        delay={1300}
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-white text-xl sm:text-2xl leading-relaxed break-words">
                        {intimateCompatibility.relationshipPrediction}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {(mySecretAnswer || partnerSecretAnswer) && (
              <ScrollAnimation animation="fadeInUp" delay={700}>
                <div className="text-center">
                  <div className="inline-flex flex-col items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-6 py-6 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                      <div>
                        <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-pink-200/80">Secret Zone</p>
                        <p className="text-xl sm:text-2xl font-semibold text-white">Peek into each other&apos;s honest answers</p>
                      </div>
                    </div>
                    <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                      How did your partner answer that question? Sneak a look at the honest answers too embarrassing to ask about in person.
                      This secret zone unlocks only when both partners have saved their answers.
                    </p>
                    <button
                      onClick={() => setShowSecretConfirm(true)}
                      className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white px-7 py-3 rounded-full font-semibold tracking-wide hover:from-purple-700 hover:to-pink-600 transition-all transform hover:scale-110 shadow-[0_10px_30px_rgba(236,72,153,0.45)]"
                    >
                      Reveal Secrets
                    </button>
                  </div>
                </div>
              </ScrollAnimation>
            )}

                      </div>
        </div>
      </div>

      {/* SNS Share Modal */}
      <SNSShareModal
        result={myResult}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        initialShareText={shareText}
      />

      {/* Position Description Modal */}
      <EnPositionDescriptionModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />

      {/* Secret confirmation modal */}
      {showSecretConfirm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-6 max-w-md w-full border border-white/20 shadow-2xl">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Are you sure you want to see the secrets?</h3>
              <p className="text-sm text-white/80">
                Your partner&apos;s secret answers will be revealed.<br />
                Once you see them, your relationship might never be the same...
              </p>
              <div className="flex gap-3 justify-center pt-4">
                <button
                  onClick={() => setShowSecretConfirm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Not yet
                </button>
                <button
                  onClick={() => {
                    setShowSecretConfirm(false);
                    setShowSecretModal(true);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                >
                  Reveal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Secret display modal */}
      {showSecretModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Secret Answers</span>
                </h3>
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Your secret */}
              {mySecretAnswer && (
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                    <span>Your Secret</span>
                  </h4>
                  {(() => {
                    const question = questions.find(q => q.id === mySecretAnswer.questionId);
                    if (!question) return null;

                    return (
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-sm font-medium text-white">
                            {question.text}
                          </p>
                        </div>

                        <div className="flex justify-center items-center gap-1 flex-wrap">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`relative w-8 h-8 rounded-full border-2 ${
                                option.value === mySecretAnswer.answer
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 scale-110'
                                  : 'bg-white/10 border-white/30'
                              }`}
                            >
                              {option.value === mySecretAnswer.answer && (
                                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
                              )}
                            </div>
                          ))}
                        </div>

                        <p className="text-center text-sm text-white/90 mt-2">
                          Your answer: <span className="font-bold text-purple-300">
                            {question.options.find(opt => opt.value === mySecretAnswer.answer)?.text}
                          </span>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Partner's secret */}
              {partnerSecretAnswer && (
                <div className="bg-white/10 rounded-xl p-4 space-y-3">
                  <h4 className="font-semibold text-pink-300 flex items-center gap-2">
                    <span>Partner&apos;s Secret</span>
                  </h4>
                  {(() => {
                    const question = questions.find(q => q.id === partnerSecretAnswer.questionId);
                    if (!question) return null;

                    return (
                      <div className="space-y-3">
                        <div className="text-center">
                          <p className="text-sm font-medium text-white">
                            {question.text}
                          </p>
                        </div>

                        <div className="flex justify-center items-center gap-1 flex-wrap">
                          {question.options.map((option, index) => (
                            <div
                              key={index}
                              className={`relative w-8 h-8 rounded-full border-2 ${
                                option.value === partnerSecretAnswer.answer
                                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 border-purple-400 scale-110'
                                  : 'bg-white/10 border-white/30'
                              }`}
                            >
                              {option.value === partnerSecretAnswer.answer && (
                                <Check className="absolute inset-0 m-auto w-4 h-4 text-white" />
                              )}
                            </div>
                          ))}
                        </div>

                        <p className="text-center text-sm text-white/90 mt-2">
                          Partner&apos;s answer: <span className="font-bold text-pink-300">
                            {question.options.find(opt => opt.value === partnerSecretAnswer.answer)?.text}
                          </span>
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="text-center pt-4">
                <button
                  onClick={() => setShowSecretModal(false)}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnCompatibilityResults;
