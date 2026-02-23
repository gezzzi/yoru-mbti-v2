'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { TestResult } from '../../types/personality';
import { getCategoryColor, getCategoryName, personalityTypes } from '../../data/en/personalityTypes';
import { copyToClipboard } from '../../utils/snsShare';
import { Heart, Share2, User, Shield, Zap, Eye, Moon } from 'lucide-react';
import Image from 'next/image';
import SNSShareModal from '../SNSShareModal';
import NeonText from '../NeonText';
import { ScrollAnimation } from '../ScrollAnimation';
import { TagDescriptionModal } from '../TagDescriptionModal';
import { tagDescriptions } from '../../data/en/tagDescriptions';
import { tagColors } from '../../data/tagColors';
import { tagShapes } from '../../data/tagShapes';
import { positions48, getPositionsByMood, moodDescriptions, PositionMood, Position48 } from '../../data/en/positions48';
import { EnPositionDescriptionModal } from './PositionDescriptionModal';
import { nightPersonalityDescriptions } from '@/data/en/nightPersonalityDescriptions';
import { buildPersonalityImageSources, getModernPersonalityCode } from '@/utils/personalityImage';

type AxisLetter = 'E' | 'I';
type OpennessLetter = 'O' | 'S';

type AxisVariant = {
  first: AxisLetter;
  fifth: OpennessLetter;
};

type AxisPreference = Partial<AxisVariant>;

const typeAxisVariantMap: Record<string, AxisVariant[]> = Object.keys(nightPersonalityDescriptions).reduce(
  (acc, rawCode) => {
    if (rawCode.length !== 5) return acc;

    const first = rawCode[0];
    const base = rawCode.slice(1, 4);
    const fifth = rawCode[4];

    if ((first === 'E' || first === 'I') && (fifth === 'O' || fifth === 'S')) {
      acc[base] = acc[base] || [];
      acc[base].push({ first, fifth } as AxisVariant);
    }

    return acc;
  },
  {} as Record<string, AxisVariant[]>
);

const selectAxisVariant = (baseCode: string, preference?: AxisPreference): AxisVariant | null => {
  const variants = typeAxisVariantMap[baseCode];
  if (!variants || variants.length === 0) return null;

  if (!preference) {
    return variants[0];
  }

  const { first, fifth } = preference;

  if (first && fifth) {
    const matchBoth = variants.find(variant => variant.first === first && variant.fifth === fifth);
    if (matchBoth) return matchBoth;
  }

  if (first) {
    const matchFirst = variants.find(variant => variant.first === first);
    if (matchFirst) return matchFirst;
  }

  if (fifth) {
    const matchFifth = variants.find(variant => variant.fifth === fifth);
    if (matchFifth) return matchFifth;
  }

  return variants[0];
};

// Category color settings
const categoryColorSchemes = {
  dom: 'bg-purple-400/50',
  sub: 'bg-pink-400/50',
  introvert: 'bg-cyan-400/50',
  fantasy: 'bg-blue-400/50',
};

interface PersonalityDimension {
  id: string;
  leftLabel: string;
  rightLabel: string;
  percentage: number;
  color: string;
  resultLabel: string;
  icon: React.ReactNode;
  description: string;
  category: string;
}

interface ResultsProps {
  result: TestResult;
}

// Component to display image or emoji
const TypeImage: React.FC<{ typeCode: string; fiveAxisCode: string; emoji: string; name: string }> = ({
  typeCode,
  fiveAxisCode,
  emoji,
  name,
}) => {
  const [imageError, setImageError] = useState(false);
  const [sourceIndex, setSourceIndex] = useState(0);

  const sources = useMemo(
    () => buildPersonalityImageSources([fiveAxisCode, typeCode]),
    [fiveAxisCode, typeCode]
  );

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
    return (
      <div className="w-full max-w-[24rem] h-[24rem] mx-auto flex items-center justify-center">
        <span className="text-[clamp(3rem,10vw,6rem)]">{emoji}</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[24rem] h-[24rem] mx-auto rounded-2xl overflow-hidden bg-transparent flex items-center justify-center">
      <Image
        src={sources[sourceIndex]}
        alt={name}
        width={384}
        height={384}
        className="w-full h-full object-contain"
        onError={handleImageError}
      />
    </div>
  );
};

const buildFiveAxisCode = (result: TestResult): string => {
  return [
    result.E >= 50 ? 'E' : 'I',
    result.L >= 50 ? 'L' : 'F',
    result.A >= 50 ? 'A' : 'S',
    result.L2 >= 50 ? 'L' : 'F',
    result.O >= 50 ? 'O' : 'S',
  ].join('');
};

const EnResults: React.FC<ResultsProps> = ({ result }) => {
  const { type } = result;

  // Code is the 3-letter aggregated type (e.g. LAL, FSL)
  const baseTypeCode = getModernPersonalityCode(type.code) || personalityTypes[0].code;

  // Get latest info from personalityTypes
  const basePersonalityType = personalityTypes.find(pt => pt.code === baseTypeCode) || personalityTypes[0];
  const typeWithRuby = useMemo(() => ({
    ...basePersonalityType,
    ...type,
    code: baseTypeCode,
    name: basePersonalityType.name, // Always use latest name
  }), [basePersonalityType, type, baseTypeCode]);

  const normalizedResult = useMemo(() => ({
    ...result,
    type: typeWithRuby,
  }), [result, typeWithRuby]);


  const fiveAxisCode = useMemo(() => buildFiveAxisCode(result), [result]);

  const axisSignature = useMemo(() => {
    const first = fiveAxisCode?.[0]?.toUpperCase?.() ?? '';
    const fifth = fiveAxisCode?.[4]?.toUpperCase?.() ?? '';
    if (!first || !fifth) return '';
    return `${first}${fifth}`;
  }, [fiveAxisCode]);

  type FormatCodeOptions = {
    preference?: AxisPreference;
    fallbackSignature?: string;
  };

  const formatCodeWithAxes = useCallback((baseCode?: string, options?: FormatCodeOptions) => {
    if (!baseCode) return '';
    const normalizedBase = baseCode.toUpperCase();
    const preferredVariant = selectAxisVariant(normalizedBase, options?.preference);

    if (preferredVariant) {
      return `${normalizedBase}-${preferredVariant.first}${preferredVariant.fifth}`;
    }

    if (options?.fallbackSignature) {
      return `${normalizedBase}-${options.fallbackSignature}`;
    }

    return normalizedBase;
  }, []);

  const displayCode = useMemo(
    () => formatCodeWithAxes(typeWithRuby.code, { fallbackSignature: axisSignature }),
    [formatCodeWithAxes, typeWithRuby.code, axisSignature]
  );

  const userFifthAxis: OpennessLetter = result.O >= 50 ? 'O' : 'S';

  const { compatibleFirstAxis, incompatibleFirstAxis } = useMemo(() => {
    if (result.E > 50 && result.L > 50) {
      return { compatibleFirstAxis: 'I' as AxisLetter, incompatibleFirstAxis: 'E' as AxisLetter };
    }

    if (result.E > 50 && result.L <= 50) {
      return { compatibleFirstAxis: 'E' as AxisLetter, incompatibleFirstAxis: 'I' as AxisLetter };
    }

    if (result.E <= 50 && result.L > 50) {
      return { compatibleFirstAxis: 'E' as AxisLetter, incompatibleFirstAxis: 'I' as AxisLetter };
    }

    return { compatibleFirstAxis: 'I' as AxisLetter, incompatibleFirstAxis: 'E' as AxisLetter };
  }, [result.E, result.L]);

  const compatibilityAxisPreference = useMemo<AxisPreference>(
    () => ({
      first: compatibleFirstAxis,
      fifth: userFifthAxis === 'O' ? 'S' : 'O',
    }),
    [compatibleFirstAxis, userFifthAxis]
  );

  const incompatibilityAxisPreference = useMemo<AxisPreference>(
    () => ({
      first: incompatibleFirstAxis,
      fifth: userFifthAxis,
    }),
    [incompatibleFirstAxis, userFifthAxis]
  );

  const nightPersonalityText = nightPersonalityDescriptions[fiveAxisCode];

  const [showShareModal, setShowShareModal] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedTag, setSelectedTag] = useState<{ tag: string; description: string } | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Position48 | null>(null);

  // Calculate and memoize recommended positions
  const recommendedPositions = useMemo(() => {
    const ensureThreePositions = (basePositions: Position48[]): Position48[] => {
      const filled = [...basePositions];
      const availablePool = positions48.filter((position) => !filled.some(existing => existing?.id === position.id));

      while (filled.length < 3 && availablePool.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePool.length);
        const [next] = availablePool.splice(randomIndex, 1);
        if (next) {
          filled.push(next);
        }
      }

      return filled.slice(0, 3);
    };

    // Get saved positions from localStorage
    const storageKey = `en_recommended_positions_${typeWithRuby.code}`;
    if (typeof window !== 'undefined') {
      const savedPositions = localStorage.getItem(storageKey);
      if (savedPositions) {
        try {
          const parsed = JSON.parse(savedPositions);
          // Restore actual position objects from saved IDs
          const restoredPositions = parsed
            .map((id: number) => positions48.find((candidate) => candidate?.id === id) ?? null)
            .filter((possiblePosition: Position48 | null): possiblePosition is Position48 => possiblePosition !== null);

          if (restoredPositions.length > 0) {
            const ensured = ensureThreePositions(restoredPositions);
            if (ensured.length > 0) {
              if (ensured.length === 3) {
                const ensuredIds = ensured.map((p: Position48) => p.id);
                localStorage.setItem(storageKey, JSON.stringify(ensuredIds));
              }
              return ensured;
            }
          }
        } catch (e) {
          // On parse error, proceed to new generation
        }
      }
    }

    // New generation
    const selectedPositions: Position48[] = [];
    const usedIds = new Set<number>();

    // Determine main mood based on personality
    const moodPriorities: PositionMood[] = [];

    // 1. Determine main mood from personality type
    if (result.L2 > 50 && result.A <= 50) {
      moodPriorities.push('romantic'); // Love type & stable type
    } else if (result.L > 50 || result.additionalResults?.smTendency === 'S') {
      moodPriorities.push('wild'); // Lead type or S tendency
    } else if (result.E > 50 && result.O > 50) {
      moodPriorities.push('playful'); // Extroverted & open type
    } else if (result.A > 50) {
      moodPriorities.push('technical'); // Adventurous type
    } else {
      moodPriorities.push('romantic'); // Default
    }

    // 2. Add supplementary moods from tags
    const tags = result.additionalResults?.tags || [];
    if (tags.includes('🕯 Romance First') || tags.includes('🛁 Aftercare Essential')) {
      if (!moodPriorities.includes('romantic')) moodPriorities.push('romantic');
    }
    if (tags.includes('⚡️ Speed Runner') || tags.includes('🧷 Light BDSM OK')) {
      if (!moodPriorities.includes('wild')) moodPriorities.push('wild');
    }
    if (tags.includes('🎭 Role Play Fan') || tags.includes('🤹‍♀️ Multitasker')) {
      if (!moodPriorities.includes('playful')) moodPriorities.push('playful');
    }
    if (tags.includes('⛏️ Explorer')) {
      if (!moodPriorities.includes('technical')) moodPriorities.push('technical');
    }

    // Always include at least one foreplay position
    moodPriorities.push('foreplay');

    // 3. Select positions from each mood (randomly)
    moodPriorities.forEach((mood, index) => {
      const moodPositions = getPositionsByMood(mood).filter((position) => !usedIds.has(position.id));

      // Difficulty filter based on adventure level
      let filtered = moodPositions;
      if (result.A < 30) {
        // Low adventure: easy positions only
        filtered = moodPositions.filter((position) => position.difficulty === 'easy');
      } else if (result.A > 70) {
        // High adventure: include hard positions
        filtered = moodPositions;
      } else {
        // Medium: up to medium difficulty
        filtered = moodPositions.filter((position) => position.difficulty !== 'hard');
      }

      // If no positions after filter, use original list
      if (filtered.length === 0) filtered = moodPositions;

      // Randomly select one
      if (filtered.length > 0 && selectedPositions.length < 3) {
        const randomIndex = Math.floor(Math.random() * filtered.length);
        const selected = filtered[randomIndex];
        selectedPositions.push(selected);
        usedIds.add(selected.id);
      }
    });

    // Save selected position IDs to localStorage
    const ensuredSelection = ensureThreePositions(selectedPositions);

    if (typeof window !== 'undefined' && ensuredSelection.length > 0) {
      const positionIds = ensuredSelection.map((p: Position48) => p.id);
      localStorage.setItem(storageKey, JSON.stringify(positionIds));
    }

    return ensuredSelection;
  }, [result, typeWithRuby.code]);

  // Save test result to localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('en_personality_test_result', JSON.stringify(normalizedResult));
    }
  }, [normalizedResult]);

  // Load saved username
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUsername = localStorage.getItem('en_personality_test_username');
      if (savedUsername) {
        setUsername(savedUsername);
      }
    }
  }, []);

  const dimensions: PersonalityDimension[] = [
    {
      id: 'lead',
      leftLabel: 'Lead (L)',
      rightLabel: 'Follow (F)',
      percentage: result.L >= 50 ? result.L : (100 - result.L),
      color: 'bg-blue-500',
      resultLabel: result.L >= 50 ? 'Lead (L)' : 'Follow (F)',
      icon: <Shield className="w-4 h-4" />,
      description: result.L >= 50
        ? 'Lead types prefer to take charge and guide their partner. They tend to be proactive and enjoy being in control of the dynamic.'
        : 'Follow types prefer to be guided by their partner, taking a more receptive stance. They excel at matching their partner\'s pace.',
      category: 'Leadership'
    },
    {
      id: 'adventure',
      leftLabel: 'Adventurous (A)',
      rightLabel: 'Stable (S)',
      percentage: result.A >= 50 ? result.A : (100 - result.A),
      color: 'bg-orange-500',
      resultLabel: result.A >= 50 ? 'Adventurous (A)' : 'Stable (S)',
      icon: <Zap className="w-4 h-4" />,
      description: result.A >= 50
        ? 'Adventurous types seek new experiences and unexplored pleasures. They enjoy change and prefer stimulating situations.'
        : 'Stable types value familiar relationships and reliable pleasures. They prefer intimacy in comfortable, secure environments.',
      category: 'Excitement'
    },
    {
      id: 'love',
      leftLabel: 'Devoted (L)',
      rightLabel: 'Free (F)',
      percentage: result.L2 >= 50 ? result.L2 : (100 - result.L2),
      color: 'bg-green-500',
      resultLabel: result.L2 >= 50 ? 'Devoted (L)' : 'Free (F)',
      icon: <Heart className="w-4 h-4" />,
      description: result.L2 >= 50
        ? 'Devoted types value deep connections with one partner and cherish romantic feelings and passionate bonds.'
        : 'Free types prefer relationships with multiple partners or connections without emotional attachment.',
      category: 'Relationship'
    },
    {
      id: 'extraversion',
      leftLabel: 'Social (E)',
      rightLabel: 'Reserved (I)',
      percentage: result.E >= 50 ? result.E : (100 - result.E),
      color: 'bg-purple-500',
      resultLabel: result.E >= 50 ? 'Social (E)' : 'Reserved (I)',
      icon: <User className="w-4 h-4" />,
      description: result.E >= 50
        ? 'Social types are outgoing and energetic, thriving in active environments.'
        : 'Reserved types prefer deep, meaningful interactions over stimulating ones. They are drawn to calm environments.',
      category: 'Energy'
    },
    {
      id: 'openness',
      leftLabel: 'Open (O)',
      rightLabel: 'Private (S)',
      percentage: result.O >= 50 ? result.O : (100 - result.O),
      color: 'bg-red-500',
      resultLabel: result.O >= 50 ? 'Open (O)' : 'Private (S)',
      icon: <Eye className="w-4 h-4" />,
      description: result.O >= 50
        ? 'Open types freely express their desires and preferences, enjoying sharing them with their partner.'
        : 'Private types keep their inner desires hidden and prioritize protecting their personal side.',
      category: 'Expression'
    }
  ];

  const getResultColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'text-blue-400',
      'bg-orange-500': 'text-orange-400',
      'bg-green-500': 'text-green-400',
      'bg-purple-500': 'text-purple-400',
      'bg-red-500': 'text-red-400'
    };
    return colorMap[color] || 'text-gray-400';
  };

  const getBackgroundColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getIndicatorCenterColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500': 'bg-blue-500',
      'bg-orange-500': 'bg-orange-500',
      'bg-green-500': 'bg-green-500',
      'bg-purple-500': 'bg-purple-500',
      'bg-red-500': 'bg-red-500'
    };
    return colorMap[color] || 'bg-gray-500';
  };


  return (
    <div className="relative z-10 min-h-screen pt-28 pb-12 overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <ScrollAnimation animation="fadeIn" duration={800}>
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg select-none text-center">
              <NeonText text={["Your", "Results"]} specialCharIndex={5} className="gap-1" />
            </h1>
            {/* Username Display */}
            {username && (
              <ScrollAnimation animation="fadeInUp" delay={100}>
                <div className="text-center mt-12 sm:mt-16">
                  <p className="text-white text-lg sm:text-base">
                    <span className="font-bold text-xl text-pink-400">{username}</span>
                    <span className="font-bold text-xl">&apos;s Personality Report</span>
                  </p>
                </div>
              </ScrollAnimation>
            )}
          </div>
        </ScrollAnimation>

        {/* Results Content */}
        <ScrollAnimation animation="fadeInUp" delay={200}>
          <div>
            {/* Header Section */}
            <div className="rounded-t-3xl overflow-hidden">
              <div className="p-8 text-white flex justify-center">
                <div className="w-full">
                  {/* Personality Type Name */}
                  <div className="flex flex-col items-center gap-3 mb-6 mt-0">
                    <span className="block h-[2px] w-56 sm:w-80 bg-pink-300/80" aria-hidden="true" />
                    <div className="flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 sm:gap-4 mx-auto">
                      <span className="shrink-0 text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]" aria-hidden="true">
                        <Moon className="w-6 h-6 sm:w-8 sm:h-8" />
                      </span>
                      <div className="min-w-0 flex-1 px-2 sm:px-4 text-center">
                        <div className="font-head text-[clamp(1.25rem,3vw,2.5rem)] leading-tight text-white font-bold drop-shadow-[0_0_18px_rgba(244,114,182,0.35)] break-words whitespace-normal">
                          {typeWithRuby?.name || 'Unknown Type'}
                        </div>
                      </div>
                      <span className="shrink-0 text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)]" aria-hidden="true">
                        <Moon className="w-6 h-6 sm:w-8 sm:h-8" />
                      </span>
                    </div>
                    <span className="block h-[2px] w-56 sm:w-80 bg-pink-300/80" aria-hidden="true" />
                  </div>
                  <div className="code text-center mb-6">
                    <h1 className="font-head text-2xl md:text-3xl m-0 text-white font-bold">
                      {displayCode ? `Type: ${displayCode}` : ''}
                    </h1>
                  </div>
                  {/* SVG Image */}
                  <TypeImage
                    typeCode={typeWithRuby.code}
                    fiveAxisCode={fiveAxisCode}
                    emoji={typeWithRuby.emoji}
                    name={typeWithRuby.name}
                  />
                  {/* Share Button */}
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="bg-teal-500 text-teal-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-teal-400 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg text-lg sm:text-lg"
                    >
                      <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Main Content */}
            <div className="rounded-b-3xl overflow-hidden">
                {/* New Graph Design */}
                <div className="mb-12" style={{backgroundColor: 'transparent'}}>
                    {/* Personality Dimensions */}
                    <div style={{backgroundColor: 'transparent'}}>

                      {dimensions.map((dimension) => (
                        <div
                          key={dimension.id}
                          className="space-y-3 py-2 px-3"
                        >
                          <div className="relative py-1">
                            {/* Percentage text above the graph - centered */}
                            <div className="text-center mb-2">
                              <span className={`text-base font-bold ${getResultColor(dimension.color)}`}>
                                {dimension.percentage}% {dimension.resultLabel}
                              </span>
                            </div>

                            <div className="relative">
                              <div className={`w-full ${getBackgroundColor(dimension.color)} rounded-full h-4 relative`}>
                                <div className="absolute inset-0 bg-white/20 rounded-full"></div>
                              </div>
                              {(() => {
                                const isReverse = dimension.resultLabel.includes('Reserved') ||
                                                  dimension.resultLabel.includes('Follow') ||
                                                  dimension.resultLabel.includes('Stable') ||
                                                  dimension.resultLabel.includes('Free') ||
                                                  dimension.resultLabel.includes('Private');
                                const circlePosition = isReverse ? (100 - dimension.percentage) : dimension.percentage;
                                const clampedPosition = Math.min(Math.max(circlePosition, 5), 95);
                                return (
                                  <div
                                    className="absolute w-5 h-5 bg-white rounded-full shadow-lg border-2 border-white flex items-center justify-center"
                                    style={{ left: `${clampedPosition}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                                  >
                                    <div className={`w-3 h-3 ${getIndicatorCenterColor(dimension.color)} rounded-full`}></div>
                                  </div>
                                );
                              })()}

                            </div>

                            {/* Labels below the graph */}
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-base font-medium text-white sm:text-sm">
                                {dimension.leftLabel}
                              </span>
                              <span className="text-base font-medium text-white sm:text-sm">
                                {dimension.rightLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

              {/* Tags section - hidden */}
              {/* {result.additionalResults?.tags && result.additionalResults.tags.length > 0 && (
                <div className="rounded-xl px-4 pt-4 sm:px-6 sm:pt-6 pb-4 mt-0 mb-8 mx-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {result.additionalResults.tags.map((tag, index) => {
                      const colors = tagColors[tag] || { bg: '#6B7280', border: '#4B5563', text: '#FFFFFF' };
                      const shape = tagShapes[tag] || 'rounded-full';
                      return (
                        <button
                          key={index}
                          className={`px-4 py-2 text-base font-medium flex items-center gap-1 hover:brightness-110 hover:scale-105 transition-transform cursor-pointer relative shadow-md animate-fadeIn ${shape}`}
                          style={{
                            backgroundColor: colors.bg,
                            border: 'none',
                            color: colors.text || '#FFFFFF',
                            '--animation-delay': `${index * 0.3}s`
                          } as React.CSSProperties}
                          onClick={() => setSelectedTag({ tag, description: tagDescriptions[tag] || '' })}
                        >
                          <span>{tag.replace(/^[^\s]+\s/, '')}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )} */}

              {/* Detailed Info Card */}
              <div className="rounded-xl bg-transparent pt-4 sm:pt-6 pb-2 sm:pb-3 mt-8">
                <div className="space-y-2">
                  {/* Night Personality */}
                  <div className="pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                          <h4 className="font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                            Night Personality
                          </h4>
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white text-xl sm:text-2xl space-y-3">
                          {nightPersonalityText
                            ? nightPersonalityText
                                .split(/\n{2,}/)
                                .map(paragraph => paragraph.trim())
                                .filter(paragraph => paragraph.length > 0)
                                .map((paragraph, index) => (
                                  <p key={`${fiveAxisCode}-${index}`} className="leading-relaxed">
                                    {paragraph}
                                  </p>
                                ))
                            : (
                              <p className="leading-relaxed">
                                Night personality description is unavailable.
                              </p>
                            )}

                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Positions */}
                  <div className="!mt-16 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                          <h4 className="font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                            Recommended Positions
                          </h4>
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                          {recommendedPositions.map((position: Position48, index: number) => (
                                  <div
                                    key={position.id}
                                    className="shine-card relative bg-white/10 border border-white/20 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-colors"
                                    onClick={() => setSelectedPosition(position)}
                                  >
                                    <span className="absolute top-3 right-3 text-xs text-white">No.{position.id}</span>
                                    <div className="text-center mb-2">
                                      <p className="text-xs text-white mb-1">{position.kana || position.name}</p>
                                      <h5 className="font-semibold text-white text-xl">{position.name}</h5>
                                    </div>
                                    <div className="flex flex-wrap gap-1 justify-center mb-2">
                                      {position.moods.map(mood => {
                                        const moodColors = {
                                          'romantic': 'bg-pink-500/20 border-pink-400 text-pink-300',
                                          'wild': 'bg-red-500/20 border-red-400 text-red-300',
                                          'playful': 'bg-yellow-500/20 border-yellow-400 text-yellow-300',
                                          'technical': 'bg-purple-500/20 border-purple-400 text-purple-300',
                                          'foreplay': 'bg-blue-500/20 border-blue-400 text-blue-300'
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
                          <p className="text-white text-xl sm:text-2xl text-center mt-3">
                            {result.A > 70 ? 'Enjoy with fierce passion' :
                             result.A < 30 ? 'Take it slow and gentle' :
                             'Balance pleasure with playful teasing'}
                          </p>
                      </div>
                    </div>
                  </div>
                  {/* Compatibility & Relationships */}
                  <div className="!mt-16 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                          <h4 className="font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                            Compatibility & Relationships
                          </h4>
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <div className="text-white text-xl sm:text-2xl space-y-8">
                          <div className="space-y-4 px-2 sm:px-4">
                            <div className="flex justify-center">
                              <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-pink-300/70 pb-1 px-2">Most Compatible Types</h5>
                            </div>
                            {(() => {
                              const compatibleTypes: { code: string; name: string; reason: string }[] = [];

                              // Get compatible types based on personality
                              const getTypeNameByCode = (code: string) => {
                                const foundType = personalityTypes.find(pt => pt.code === code);
                                return foundType ? foundType.name : code;
                              };

                              // E/I axis and L/F axis judgment
                              if (result.E > 50 && result.L > 50) {
                                // Extroverted lead type -> Introverted follow type is compatible
                                compatibleTypes.push({ code: 'FSL', name: getTypeNameByCode('FSL'), reason: 'Calm listeners who embrace your lead' });
                                compatibleTypes.push({ code: 'FAL', name: getTypeNameByCode('FAL'), reason: 'Share your adventurous spirit while supporting you' });
                              } else if (result.E > 50 && result.L <= 50) {
                                // Extroverted follow type -> Extroverted lead type is compatible
                                compatibleTypes.push({ code: 'LAL', name: getTypeNameByCode('LAL'), reason: 'Passionately take the lead and keep things exciting' });
                                compatibleTypes.push({ code: 'LSL', name: getTypeNameByCode('LSL'), reason: 'Provide stable, reassuring leadership' });
                              } else if (result.E <= 50 && result.L > 50) {
                                // Introverted lead type -> Extroverted follow type is compatible
                                compatibleTypes.push({ code: 'FSL', name: getTypeNameByCode('FSL'), reason: 'Bright and open, naturally follow your pace' });
                                compatibleTypes.push({ code: 'FAL', name: getTypeNameByCode('FAL'), reason: 'Adventurous yet willing to let you take charge' });
                              } else {
                                // Introverted follow type -> Introverted lead type is compatible
                                compatibleTypes.push({ code: 'LAL', name: getTypeNameByCode('LAL'), reason: 'Quietly passionate with gentle leadership' });
                                compatibleTypes.push({ code: 'LSL', name: getTypeNameByCode('LSL'), reason: 'Build a relationship grounded in comfort and trust' });
                              }

                              // Additional judgment based on tags
                              const tagTraits = [];
                              if (result.additionalResults?.tags?.includes('🛁 Aftercare Essential')) {
                                tagTraits.push('Gentle and caring partners who value aftercare');
                              }

                              // Combine personality types and general traits for display
                              const displayItems: React.ReactNode[] = [];
                              compatibleTypes.slice(0, 2).forEach((type, idx) => {
                                const formattedCode = formatCodeWithAxes(type.code, { preference: compatibilityAxisPreference });
                                displayItems.push(
                                  <React.Fragment key={`compatible-${type.code}-${idx}`}>
                                    <Link
                                      href={`/en/types/${type.code.toLowerCase()}`}
                                      className="text-cyan-300 hover:text-cyan-200 underline decoration-cyan-300/50 hover:decoration-cyan-200 transition-colors"
                                    >
                                      {type.name}
                                    </Link>
                                    {' '}({formattedCode || type.code}): {type.reason}
                                  </React.Fragment>
                                );
                              });
                              tagTraits.forEach((trait, idx) => {
                                displayItems.push(<React.Fragment key={`trait-${idx}`}>{trait}</React.Fragment>);
                              });

                              return displayItems.slice(0, 3).map((item, index) => (
                                <div
                                  key={index}
                                  className="sm:ml-12 md:ml-24 lg:ml-32 leading-relaxed"
                                >
                                  {item}
                                </div>
                              ));
                            })()}
                          </div>
                          <div className="space-y-4 px-2 sm:px-4">
                            <div className="flex justify-center">
                              <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-rose-300/60 pb-1 px-2">Least Compatible Types</h5>
                            </div>
                            {(() => {
                              const incompatibleTypes: { code: string; name: string; reason: string }[] = [];

                              // Get incompatible types based on personality
                              const getTypeNameByCode = (code: string) => {
                                const foundType = personalityTypes.find(pt => pt.code === code);
                                return foundType ? foundType.name : code;
                              };

                              // E/I axis and L/F axis judgment
                              if (result.E > 50 && result.L > 50) {
                                // Extroverted lead type -> Same type causes conflict
                                incompatibleTypes.push({ code: 'LAL', name: getTypeNameByCode('LAL'), reason: 'Power struggles over who leads' });
                                incompatibleTypes.push({ code: 'LAF', name: getTypeNameByCode('LAF'), reason: 'Too free-spirited and hard to manage' });
                              } else if (result.E > 50 && result.L <= 50) {
                                // Extroverted follow type -> Introverted follow type is incompatible
                                incompatibleTypes.push({ code: 'FSL', name: getTypeNameByCode('FSL'), reason: 'Both too passive, nothing progresses' });
                                incompatibleTypes.push({ code: 'FSF', name: getTypeNameByCode('FSF'), reason: 'Lacks excitement and stimulation' });
                              } else if (result.E <= 50 && result.L > 50) {
                                // Introverted lead type -> Same type causes quiet conflict
                                incompatibleTypes.push({ code: 'LAL', name: getTypeNameByCode('LAL'), reason: 'Silent power struggles arise' });
                                incompatibleTypes.push({ code: 'LSL', name: getTypeNameByCode('LSL'), reason: 'Neither gives in, creating a stalemate' });
                              } else {
                                // Introverted follow type -> Aggressive extroverted lead type
                                incompatibleTypes.push({ code: 'LAF', name: getTypeNameByCode('LAF'), reason: 'Too wild and unpredictable to keep up with' });
                                incompatibleTypes.push({ code: 'LAL', name: getTypeNameByCode('LAL'), reason: 'Overly forceful and overwhelming' });
                              }

                              // Additional judgment based on tags
                              const tagTraits = [];
                              if (result.additionalResults?.tags?.includes('🚪 Clear Boundaries')) {
                                tagTraits.push('People who disrespect boundaries and push too aggressively');
                              }

                              if (result.additionalResults?.tags?.includes('🪞 Mirror Play')) {
                                tagTraits.push('People who lack confidence in their body or appearance');
                              }

                              if (result.additionalResults?.tags?.includes('🎮 Gamification')) {
                                tagTraits.push('People who are too serious and lack playfulness');
                              }

                              if (result.additionalResults?.tags?.includes('💋 Kiss Addict')) {
                                tagTraits.push('People who don\'t value kissing and are emotionally distant');
                              }

                              if (result.additionalResults?.tags?.includes('🧥 Cosplay Fan')) {
                                tagTraits.push('People who are overly practical and don\'t appreciate romantic expression');
                              }

                              // Combine personality types and general traits for display
                              const displayItems: React.ReactNode[] = [];
                              incompatibleTypes.slice(0, 2).forEach((type, idx) => {
                                const formattedCode = formatCodeWithAxes(type.code, { preference: incompatibilityAxisPreference });
                                displayItems.push(
                                  <React.Fragment key={`incompatible-${type.code}-${idx}`}>
                                    <Link
                                      href={`/en/types/${type.code.toLowerCase()}`}
                                      className="text-rose-300 hover:text-rose-200 underline decoration-rose-300/50 hover:decoration-rose-200 transition-colors"
                                    >
                                      {type.name}
                                    </Link>
                                    {' '}({formattedCode || type.code}): {type.reason}
                                  </React.Fragment>
                                );
                              });
                              tagTraits.forEach((trait, idx) => {
                                displayItems.push(<React.Fragment key={`trait-incompat-${idx}`}>{trait}</React.Fragment>);
                              });

                              return displayItems.slice(0, 3).map((item, index) => (
                                <div
                                  key={index}
                                  className="sm:ml-12 md:ml-24 lg:ml-32 leading-relaxed"
                                >
                                  {item}
                                </div>
                              ));
                            })()}
                          </div>
                          <div className="space-y-4 px-2 sm:px-4">
                            <div className="flex justify-center">
                              <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-indigo-300/60 pb-1 px-2">Ideal Relationship Style</h5>
                            </div>
                            <p className="text-center text-xl sm:text-2xl leading-relaxed">
                              {(() => {
                                const styles = [];

                                // Love/Free axis is the main axis
                                if (result.L2 > 50) {
                                  styles.push('You value emotional connection and prefer building trust before taking things to the physical level');
                                } else {
                                  styles.push('You prefer starting with casual connections and continuing when the chemistry is right');
                                }

                                // Open/Secret axis addition
                                if (result.O > 50) {
                                  styles.push('A relationship where you can openly discuss each other\'s desires and preferences');
                                } else {
                                  styles.push('A relationship that cherishes an intimate world shared only between the two of you');
                                }

                                // Tag-based additions
                                if (result.additionalResults?.tags?.includes('🛁 Aftercare Essential')) {
                                  styles.push('A relationship where tenderness continues after intimacy, nurturing emotional connection');
                                }

                                return styles.join('. ') + '.';
                              })()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* Weaknesses & Advice */}
                  <div className="!mt-16 pb-2 overflow-hidden">
                    <div className="w-full rounded-lg py-2">
                      <div className="mb-8">
                        <div className="flex items-center justify-center gap-2 sm:gap-3">
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-l from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                          <h4 className="font-semibold text-2xl sm:text-3xl text-pink-200 drop-shadow-[0_0_10px_rgba(244,114,182,0.4)] tracking-wide">
                            Weaknesses & Advice
                          </h4>
                          <span
                            aria-hidden="true"
                            className="block h-px w-10 sm:w-24 bg-gradient-to-r from-pink-300/80 via-pink-300/40 to-transparent"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        {(() => {
                          const shortcomings = [];
                          const advices = [];
                          const hints = [];
                          const tags = result.additionalResults?.tags || [];

                          // Tag-based weakness assessment
                          if (tags.includes('🪞 Mirror Play')) {
                            shortcomings.push('You may overthink your appearance and how others perceive you, making it hard to relax');
                            advices.push('Remember that your partner accepts all of you -- embrace your authentic self');
                            hints.push('Adjust the lighting to create an environment where you feel most comfortable');
                          }

                          if (tags.includes('🎮 Gamification')) {
                            shortcomings.push('You might push for too many playful elements, which can tire your partner');
                            advices.push('Respect your partner\'s pace and mood, and appreciate the beauty of simplicity');
                            hints.push('Save game-like elements as a special treat once or twice a month');
                          }

                          if (tags.includes('💋 Kiss Addict')) {
                            shortcomings.push('Your focus on kissing might cause you to overlook other forms of stimulation');
                            advices.push('While cherishing kisses, balance them with other expressions of affection');
                            hints.push('Between kisses, don\'t forget to gently explore your partner\'s body');
                          }

                          if (tags.includes('🧥 Cosplay Fan')) {
                            shortcomings.push('You might rely too heavily on costumes and roles, losing confidence in your natural self');
                            advices.push('Enjoy cosplay as a spice while also cultivating your natural charm');
                            hints.push('Find ways to feel attractive even in everyday clothes');
                          }

                          if (tags.includes('🏃‍♂️ Impulse Trigger')) {
                            shortcomings.push('Your impulsiveness may lead you to act without considering your partner\'s readiness');
                            advices.push('Build a habit of pausing to check in with your partner before acting');
                            hints.push('Never skip the simple question: "Is now a good time?"');
                          }

                          // Combination-based weaknesses
                          if (tags.includes('⚡️ Speed Runner') && !tags.includes('🛁 Aftercare Essential')) {
                            shortcomings.push('You tend to prioritize your own satisfaction and neglect aftercare');
                            advices.push('Make time for tenderness after intimacy to deepen your bond');
                            hints.push('Dedicate at least 10 minutes afterward to be present with your partner');
                          }

                          if (tags.includes('🧷 Light BDSM OK') && !tags.includes('🚪 Clear Boundaries')) {
                            shortcomings.push('You might prioritize your preferences and misjudge your partner\'s boundaries');
                            advices.push('Always confirm your partner\'s limits beforehand and build a safe dynamic');
                            hints.push('Check in regularly with "Is this okay?" during intimate moments');
                          }

                          // Default weaknesses
                          if (shortcomings.length === 0) {
                            shortcomings.push('No major weaknesses, but you may occasionally become self-centered');
                            advices.push('Cultivate the habit of seeing things from your partner\'s perspective for a stronger relationship');
                            hints.push('Regularly check in on your partner\'s satisfaction');
                          }

                          // Add general hints
                          if (hints.length < 3) {
                            const generalHints = [
                              'Respect your partner\'s pace and find a good balance',
                              'Introduce new experiences regularly to keep things fresh',
                              'Set aside time to discuss each other\'s preferences openly',
                              'Make it a habit to express gratitude through words'
                            ];
                            while (hints.length < 3) {
                              hints.push(generalHints[hints.length]);
                            }
                          }

                          return (
                            <div className="space-y-8 px-2 sm:px-4">
                              <div className="space-y-3">
                                <div className="flex justify-center">
                                  <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-amber-300/70 pb-1 px-2">Weakness</h5>
                                </div>
                                <p className="text-white text-xl sm:text-2xl leading-relaxed">
                                  {shortcomings[0]}
                                </p>
                              </div>

                              <div className="space-y-3">
                                <div className="flex justify-center">
                                  <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-emerald-300/60 pb-1 px-2">Advice</h5>
                                </div>
                                <p className="text-white text-xl sm:text-2xl leading-relaxed text-center">
                                  {advices[0]}
                                </p>
                              </div>

                              <div className="space-y-4">
                                <div className="flex justify-center">
                                  <h5 className="font-semibold text-white text-2xl sm:text-3xl border-b-2 border-sky-300/60 pb-1 px-2">3 Tips for a Better Relationship</h5>
                                </div>
                                <ul className="text-white text-xl sm:text-2xl space-y-3 list-none">
                                  {hints.slice(0, 3).map((hint, index) => (
                                    <li key={index} className="flex items-start">
                                      <span className="sm:ml-12 md:ml-24 lg:ml-32 mr-3 text-yellow-400">&#128161;</span>
                                      <span className="leading-relaxed">{hint}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>{/* Close Detailed Info Card */}

              {/* Action Buttons */}
              <div className="text-center mt-8 px-4 pb-4 space-y-6">
                <div className="inline-flex flex-col items-center gap-4 bg-white/10 border border-white/20 rounded-2xl px-6 py-6 shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                  <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                    <div>
                      <p className="text-sm sm:text-base uppercase tracking-[0.3em] text-pink-200/80">Match Check</p>
                      <p className="text-xl sm:text-2xl font-semibold text-white">Take your results and discover what lies ahead for you two</p>
                    </div>
                  </div>
                  <p className="text-base sm:text-lg text-white/80 max-w-xl leading-relaxed">
                    Use your personality test results to dive deeper into your compatibility and relationship dynamics.
                    Personalized tips and recommended plans await.
                  </p>
                  <Link
                    href="/en/compatibility"
                    className="bg-gradient-to-r from-[#ec4899] to-[#ffb8ce] text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold tracking-wide hover:from-[#ffb8ce] hover:to-[#ffb8ce] transition-all transform hover:scale-110 shadow-[0_10px_30px_rgba(236,72,153,0.45)] inline-flex items-center gap-2"
                  >
                    <span>Go to Compatibility Test</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* SNS Share Modal */}
      <SNSShareModal
        result={normalizedResult}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Tag Description Modal */}
      {selectedTag && (
        <TagDescriptionModal
          tag={selectedTag.tag}
          description={selectedTag.description}
          isOpen={!!selectedTag}
          onClose={() => setSelectedTag(null)}
        />
      )}

      {/* Position Description Modal */}
      <EnPositionDescriptionModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />

    </div>
  );
};

export default EnResults;
