// English version of night compatibility section helper functions

// Tag recommendation data
export const getTagRecommendations = (combinedTags: Set<string>) => {
  const recommendations: { tag: string; text: string }[] = [];

  // Evocative descriptions for each tag
  const tagTexts: { [key: string]: string } = {
    '\u{1F4AC} \u8A00\u8A9E\u30D7\u30EC\u30A4\u6D3E': 'Sweet nothings whispered in your ear send shivers down your spine. Even the most embarrassing words become secret spells shared only between you two.',
    '\u{1F5E3} \u4E0B\u30CD\u30BFO\uFF2B': 'An open relationship where desires are spoken freely, confirming each other\'s cravings without holding back.',
    '\u{1F56F} \u30ED\u30DE\u30F3\u91CD\u8996': 'Candlelight casts dancing shadows on the wall as aromatherapy awakens all five senses.',
    '\u{1FA9E} \u93E1\u30D7\u30EC\u30A4\u597D\u304D': 'Watching yourselves reflected in the mirror, excitement doubles with a forbidden thrill.',
    '\u{1F3AE} \u30B2\u30FC\u30E0\u6D3E': 'Rolling dice, setting missions -- a thrilling session overflowing with playful energy.',
    '\u{1F48B} \u30AD\u30B9\u9B54': 'Kisses so deep you can hardly breathe. Every time your lips meet, electricity surges through you.',
    '\u{1F9E5} \u30B3\u30B9\u30D7\u30EC\u6D3E': 'Costumes and uniforms create an otherworldly rush. Fantasy becomes reality.',
    '\u26A1\uFE0F \u30B9\u30D4\u30FC\u30C9\u52DD\u8CA0\u6D3E': 'Passion ignites in an instant like a flash of flame. Brief yet intensely concentrated moments.',
    '\u{1F3C3}\u200D\u2642\uFE0F \u885D\u52D5\u30C8\u30EA\u30AC\u30FC\u578B': 'In the kitchen, on the sofa, at the front door. Seizing those special moments hidden within everyday life.',
    '\u{1F525} \u6B32\u671B\u306E\u708E': 'Unbridled passion erupts. Pushing each other to the limit with raw desire.',
    '\u{1F504} \u30EA\u30D4\u30FC\u30C8\u6C42\u3081\u6D3E': 'Once is never enough. Waves of pleasure crash over you again and again.',
    '\u{1F6C1} \u30A2\u30D5\u30BF\u30FC\u30B1\u30A2\u5FC5\u9808': 'A gentle calm after the storm. Precious moments confirming your love while wrapped in each other\'s arms.',
    '\u{1F9FC} \u30B1\u30A2\uFF06\u885B\u751F\u91CD\u8996': 'Clean sheets and gentle hands. A thoughtful, caring time devoted to each other.',
    '\u{1F6E1} \u5B89\u5168\u7B2C\u4E00\u6D3E': 'A safe and secure environment where you can fully relax and enjoy.',
    '\u{1F6AA} N\uFF27\u660E\u78BA': '"This is fine." "That\'s off limits." Clear boundaries that create a foundation of trust.',
    '\u2600\uFE0F \u671D\u578B\u30A8\u30ED\u30B9': 'Morning sunlight streaming into the bedroom -- the bliss of starting a new day in a special way.',
    '\u26CF\uFE0F \u958B\u62D3\u6D3E': 'Exploring uncharted territory. An adventure to discover new sides of each other.',
    '\u{1F3AD} \u30ED\u30FC\u30EB\u30D7\u30EC\u30A4\u597D\u304D': 'Teacher and student, boss and subordinate. Losing yourselves in a story that belongs only to the two of you.',
    '\u{1F4F1} \u30C7\u30B8\u30BF\u30EB\u524D\u622F\u6D3E': 'The excitement starts with daytime messages. Anticipation builds long before you even meet.',
    '\u{1F575}\uFE0F\u200D\u2640\uFE0F \u8986\u304D\u898B\u8208\u596E\u6D3E': 'A sense of secrecy and taboo that triggers deeper arousal.',
    '\u{1F4DA} \u5B66\u7FD2\u7814\u7A76\u6D3E': 'Explorers in pursuit of better pleasure, studying each other\'s bodies inside and out.',
    '\u{1F9ED} \u30AC\u30A4\u30C9\u6D3E': 'Gently guiding your partner, reaching new heights together through patient attention.',
    '\u{1F939}\u200D\u2640\uFE0F \u30DE\u30EB\u30C1\u30BF\u30B9\u30AF\u6D3E': 'Orchestrating multiple sensations at once, savoring pleasure with every fiber of your being.',
    '\u{1F4A4} \u307E\u3063\u305F\u308A\u6D3E': 'Forgetting the passage of time, savoring love slowly without rush or hurry.',
    '\u{1F9F7} \u8EFD\uFF33\uFF2D\u8010\u6027\u3042\u308A': 'Light restraints and blindfolds. A game of dominance and submission that opens new worlds.'
  };

  // Collect recommendations for tags in the combined set
  for (const [tag, text] of Object.entries(tagTexts)) {
    if (combinedTags.has(tag)) {
      recommendations.push({ tag, text });
    }
  }

  return recommendations;
};

// Seeded random number generator
export function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

// Shuffle array
export function shuffleArray<T>(array: T[], rng: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Select and format recommendations into a string
export function selectAndFormatRecommendations(
  recommendations: { tag: string; text: string }[],
  maxCount: number = 5,
  seed: number = 42
): string {
  if (recommendations.length === 0) return '';

  const rng = seededRandom(seed);
  let selected: { tag: string; text: string }[] = [];

  if (recommendations.length <= maxCount) {
    selected = recommendations;
  } else {
    // Randomly select up to maxCount
    selected = shuffleArray(recommendations, rng).slice(0, maxCount);
  }

  return '\n\n' + selected.map(r => r.text).join(' ');
}

// Supplementary texts (evocative English versions)
export const supplementaryTexts = [
  'Even in light sleep, you reach for each other, savoring a sweet intimacy that lasts until dawn.',
  'Sweat-dampened skin pressed together, heartbeats synchronizing in a moment of pure connection.',
  'Every encounter reveals a new expression, sparking an insatiable curiosity that never grows old.',
  'Beginning with gentle kisses that build into a passionate embrace -- the ebb and flow of your rhythm feels effortless.',
  'In a secret garden for two, a communion beyond words begins.'
];

// Stabilize text length
export function stabilizeRecommendedPlayText(
  baseText: string,
  targetMin: number = 800,
  targetMax: number = 900,
  seed: number = 42
): string {
  const currentLength = baseText.length;

  if (currentLength >= targetMin && currentLength <= targetMax) {
    return baseText;
  }

  const rng = seededRandom(seed);

  if (currentLength < targetMin) {
    // If too short, add supplementary text
    let result = baseText;
    const shuffled = shuffleArray(supplementaryTexts, rng);

    for (const supplement of shuffled) {
      if (result.length >= targetMin) break;
      result += '\n\n' + supplement;
    }

    return result;
  }

  // If too long, reduce paragraphs
  const paragraphs = baseText.split('\n\n').filter(p => p.trim());

  // Remove less important paragraphs
  while (paragraphs.length > 4 && paragraphs.join('\n\n').length > targetMax) {
    // Remove second-to-last (keep the conclusion)
    if (paragraphs.length > 5) {
      paragraphs.splice(paragraphs.length - 2, 1);
    } else {
      paragraphs.splice(Math.floor(paragraphs.length / 2), 1);
    }
  }

  return paragraphs.join('\n\n');
}
