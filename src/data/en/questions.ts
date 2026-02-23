import { Question } from '../../types/personality';

// Question text variations
const questionVariations: { [key: number]: string[] } = {
  1: [
    'I can talk openly about sex and romance',
    "I'm fine with dirty jokes if the atmosphere allows it",
    'I can share romance and sex topics without hiding'
  ],
  2: [
    'I only share sexual preferences with very few trusted people',
    'I only talk about sex with a select trusted few',
    'I keep my sexual honesty to close partners only'
  ],
  3: [
    'I often feel the urge to take the lead',
    'I want to take charge and guide in many situations',
    'I often find myself naturally being the pace-setter'
  ],
  4: [
    'Being told what to do gives me a thrill',
    'Being given firm instructions sometimes makes me want to obey',
    'Being pulled along by someone actually feels comfortable'
  ],
  5: [
    'Trying unusual play excites me',
    "When I see new things to try, I can't help wanting to experiment",
    "I'm drawn to the unknown rather than routine"
  ],
  6: [
    'There are certain things that are absolutely off-limits for me',
    'I have clear boundaries set from the start',
    'I tell people my limits upfront'
  ],
  7: [
    "One-night stands are fine with me",
    "Even without deep feelings, sometimes the mood is enough",
    'I sometimes find casual relationships easier'
  ],
  8: [
    "Sometimes I can't do it without emotional connection",
    "Without emotional connection I can't take the step",
    'I need to feel safe with someone first'
  ],
  9: [
    "I'm uncomfortable when asked to act sexy or pose",
    'Being asked for seductive behavior makes me tense up',
    'I pull back when asked for provocative expressions'
  ],
  10: [
    "I'm not fully confident in my body, but I want to show it off a bit",
    'Even if I\'m not perfect, I have a desire to show off a little',
    "I don't mind subtly putting myself out there"
  ],
  11: [
    'My sex drive sometimes feels overwhelming',
    'When desire hits, I want to act on it immediately',
    'Sexual fantasies and urges come to me frequently'
  ],
  12: [
    'I feel unsatisfied without vocal reactions',
    'Whispers and tone of voice instantly turn me on',
    'The more erotic word play, the more excited I get'
  ],
  13: [
    "I'm drawn to role-playing scenarios",
    'Setting up scenarios and acting them out makes it more fun',
    'I enjoy pretending to be characters in a story'
  ],
  14: [
    'I need time to share the afterglow',
    'Cuddling and talking afterward is essential',
    'Having cool-down time together makes me feel fulfilled'
  ],
  15: [
    'I enjoy drawing out reactions from my partner',
    "Finding my partner's pleasure spots is fun",
    'I feel joy when new stimulation gets a reaction'
  ],
  16: [
    'Light restraint or pain adds spice',
    'A touch of restraint or control feels pleasantly exciting',
    'I can enjoy mild pain or pressure as an accent'
  ],
  17: [
    'I want to set the mood with music, lighting, and scent',
    'I enjoy creating atmosphere with music and lighting',
    'I want to enhance immersion with scent and ambiance'
  ],
  18: [
    "I'd rather skip foreplay and get to the main event",
    'When the mood is right, I want to move to action quickly',
    'A faster pace suits me better'
  ],
  19: [
    'I often start on impulse',
    'The mood or energy in the moment can trigger me',
    'When I feel a spark, I want to act immediately'
  ],
  20: [
    'Watching ourselves in a mirror heightens the mood',
    'Seeing each other through a mirror is stimulating',
    'Reflections of our movements enhance the atmosphere'
  ],
  21: [
    'I can clearly communicate my limits',
    'I can state my boundaries and limits upfront',
    "I'm confident in firmly saying no to things I don't like"
  ],
  22: [
    'Adding mission or game elements makes it more exciting',
    'Rules and challenges fuel my excitement',
    'Point systems or challenges make it even more fun'
  ],
  23: [
    'Uniforms or costumes heighten my excitement',
    'Outfits that completely change the vibe appeal to me',
    'Dressing up in character costumes increases arousal'
  ],
  24: [
    'Proper hygiene preparation is essential',
    'I want to shower and clean up before and after',
    "I can't relax without a clean environment and preparation"
  ],
  25: [
    'Imagining or watching others excites me',
    "Other people's stories or videos turn me on",
    'Watching or being watched gives me a thrill'
  ],
  26: [
    'I want to avoid risky or outdoor locations',
    'I prefer to avoid dangerous or high-risk settings',
    'I want to choose private, safe environments'
  ],
  27: [
    'Texting or voice messages build the mood',
    'Chat and call exchanges heighten the atmosphere',
    'I enjoy building anticipation through texts and voice'
  ],
  28: [
    "It doesn't feel like it's started without kissing",
    'I want lots of kisses before progressing',
    'Kissing switches on both my heart and body'
  ],
  29: [
    "I'm more in the mood in the morning or daytime",
    'My switch turns on more easily in the morning or afternoon',
    'I feel more aroused during daylight hours'
  ],
  30: [
    "One round often isn't enough",
    'I want to go again after the first time',
    'I enjoy taking breaks and going multiple rounds'
  ],
  31: [
    'Explicit language and dirty talk turn me on',
    'Explicit expressions and erotic jokes boost my energy',
    'I can enjoy direct verbal play'
  ],
  32: [
    'I read books and articles about sex',
    'I enjoy reading about sex-related topics',
    'I find it fun to learn from experiences and gather knowledge'
  ],
  33: [
    "I'm good at reading and guiding my partner",
    "I can sense my partner's state and lead effectively",
    "I'm skilled at matching my partner's pace while guiding them"
  ],
  34: [
    'I like giving or receiving multiple stimulations at once',
    'I enjoy using hands, mouth, and toys simultaneously',
    'I want to enjoy various stimulations at the same time'
  ],
  35: [
    'I prefer a slow pace and soft stimulation',
    'I want to proceed slowly and gently',
    'A calm tempo and careful approach feels most comfortable'
  ]
};

// Shared options array (memory optimization)
// 6-point scale (no neutral option)
const commonOptions = [
  { text: 'Strongly agree', value: 5 },
  { text: 'Agree', value: 4 },
  { text: 'Somewhat agree', value: 3 },
  { text: 'Somewhat disagree', value: 2 },
  { text: 'Disagree', value: 1 },
  { text: 'Strongly disagree', value: 0 }
];

// Seed-based pseudo-random number generator
function seededRandom(seed: number): () => number {
  let x = seed;
  return () => {
    x = (x * 1103515245 + 12345) % 2147483648;
    return x / 2147483648;
  };
}

// Select question text using a seed
function getSeededQuestionText(id: number, rng: () => number): string {
  const variations = questionVariations[id];
  if (!variations) {
    // For questions without variations (36-40), return empty string
    return '';
  }
  // Seed-based selection
  const randomIndex = Math.floor(rng() * variations.length);
  return variations[randomIndex];
}

// Generate question data
const generateQuestions = (): Question[] => {
  // Use a fixed seed for consistency
  const rng = seededRandom(42);

  const baseQuestions: Omit<Question, 'text'>[] = [
    {
      id: 1,
      axis: 'EI',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 2,
      axis: 'EI',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 3,
      axis: 'LF',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 4,
      axis: 'LF',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 5,
      axis: 'AS',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 6,
      axis: 'AS',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 7,
      axis: 'LF2',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 8,
      axis: 'LF2',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 9,
      axis: 'OS',
      isReverse: true,
      options: commonOptions
    },
    {
      id: 10,
      axis: 'OS',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 11,
      axis: null,
      tag: '🔥 Flame of Desire',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 12,
      axis: null,
      tag: '💬 Verbal Play',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 13,
      axis: null,
      tag: '🎭 Role Play Fan',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 14,
      axis: null,
      tag: '🛁 Aftercare Essential',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 15,
      axis: null,
      tag: '⛏️ Explorer',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 16,
      axis: null,
      tag: '🧷 Light BDSM OK',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 17,
      axis: null,
      tag: '🕯 Romance First',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 18,
      axis: null,
      tag: '⚡️ Speed Runner',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 19,
      axis: null,
      tag: '🏃‍♂️ Impulse Trigger',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 20,
      axis: null,
      tag: '🪞 Mirror Play',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 21,
      axis: null,
      tag: '🚪 Clear Boundaries',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 22,
      axis: null,
      tag: '🎮 Gamification',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 23,
      axis: null,
      tag: '🧥 Cosplay Fan',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 24,
      axis: null,
      tag: '🧼 Hygiene First',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 25,
      axis: null,
      tag: '🕵️‍♀️ Voyeur Thrill',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 26,
      axis: null,
      tag: '🛡 Safety First',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 27,
      axis: null,
      tag: '📱 Digital Foreplay',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 28,
      axis: null,
      tag: '💋 Kiss Addict',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 29,
      axis: null,
      tag: '☀️ Morning Eros',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 30,
      axis: null,
      tag: '🔄 Repeat Seeker',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 31,
      axis: null,
      tag: '🗣 Dirty Talk OK',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 32,
      axis: null,
      tag: '📚 Student of Sex',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 33,
      axis: null,
      tag: '🧭 Gentle Guide',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 34,
      axis: null,
      tag: '🤹‍♀️ Multitasker',
      isReverse: false,
      options: commonOptions
    },
    {
      id: 35,
      axis: null,
      tag: '💤 Slow & Gentle',
      isReverse: false,
      options: commonOptions
    },
    // Questions 36-40 (random-secret) have fixed text
    {
      id: 36,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 37,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 38,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 39,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    },
    {
      id: 40,
      axis: null,
      tag: null,
      isReverse: false,
      options: commonOptions
    }
  ];

  // Fixed question texts (36-40)
  const fixedQuestionTexts: { [key: number]: string } = {
    36: "I've recently looked at someone else in a sexual way",
    37: "If no one would find out, I'd want to try a one-night stand",
    38: 'I\'ve fantasized about "what if" scenarios with someone other than my partner',
    39: 'I still think about my ex sometimes',
    40: "I have secrets I can't tell my partner"
  };

  // Generate questions
  return baseQuestions.map((baseQuestion) => {
    let text: string;

    if (baseQuestion.id <= 35) {
      // Questions 1-35 use seed-based selection
      text = getSeededQuestionText(baseQuestion.id, rng);
    } else {
      // Questions 36-40 are fixed
      text = fixedQuestionTexts[baseQuestion.id] || '';
    }

    return {
      ...baseQuestion,
      text
    } as Question;
  });
};

// Shuffle questions (Fisher-Yates algorithm)
function shuffleQuestions(array: Question[], rng: () => number): Question[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Export question array (before shuffle)
// Exported in generated order for client-side shuffling
export const questions: Question[] = generateQuestions();

// Client-side question shuffle function
export function getShuffledQuestions(seed?: number): Question[] {
  // Use current time if no seed is provided
  const actualSeed = seed ?? Date.now();
  const rng = seededRandom(actualSeed);
  return shuffleQuestions([...questions], rng);
}

// Export shuffle function (for testing)
export { shuffleQuestions };
