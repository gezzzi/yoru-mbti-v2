import { PersonalityType } from '../../types/personality';

export const personalityTypes: PersonalityType[] = [
  // Leader types (dom)
  {
    code: 'LAL',
    name: 'The Passionate Leader',
    summary: 'A charisma who commands the night',
    fullDescription: 'A natural-born charisma who takes charge of the night. Goes all-in on both love and excitement. Once hooked, there\'s no escape from their dangerous allure.',
    category: 'dom',
    emoji: '👑',
    description: 'An extroverted type who takes the lead, has a strong sense of adventure, and values romance. Passionately guides their partner while exploring new experiences together.',
    traits: ['Passionate', 'Strong leadership', 'Adventurous', 'Deeply loving', 'Charismatic'],
    compatibility: ['FSL', 'FAL'],
    strengths: ['Natural leader', 'Passionate', 'Strong sense of responsibility', 'Protective instinct'],
    weaknesses: ['Can be too possessive', 'Excessive jealousy', 'Jealous nature', 'Tendency to dominate'],
    nightPersonality: 'Foreplay: Takes charge and warms up the scene like a DJ. Controls arousal through eye contact and body language. Main event: Fast-paced and direct. Focused on bringing both partners to climax, always updating the next move. After: Suggests another round right after the peak. Produces an encore of pleasure.',
    smTendency: 'S',
    libidoLevel: 5,
    recommendedPositions: ['Missionary', 'Cowgirl', 'Doggy Style', 'Standing Carry', 'Face-to-Face Sitting', 'Prone Bone', 'Standing'],
    bodyConfidence: {
      level: 'Confident',
      parts: ['Hips', 'Butt']
    },
    compatibleTraits: ['Sensitive and affectionate partners', 'Drawn to those who trust their lead'],
    incompatibleTraits: ['Stiff or unresponsive types', 'Too passive or unreactive partners create a disconnect'],
    nightGapLevel: 'Quiet by day, beast by night. The calmer they seem, the wilder the transformation.',
    sexualPreferences: ['Loses interest without intense foreplay', 'Kissing is essential - temperature drops without it', 'Loves intertwining fingers'],
    relationshipStyle: 'Wants a deep, exclusive connection when they click. Ideally builds emotional bonds through physical chemistry.',
    shortcomingsAdvice: {
      shortcoming: 'Can be moody and suddenly lose interest',
      advice: 'Nurture trust and manage emotional temperature for lasting love'
    }
  },
  {
    code: 'LAF',
    name: 'The Wild Maverick',
    summary: 'A free-spirited pleasure expert',
    fullDescription: 'A freedom-loving leader with untamed instincts. A master at enjoying romance and pleasure on their own terms. Yet somehow, they can never go all-in on "the one."',
    category: 'dom',
    emoji: '👑',
    description: 'An extroverted type who takes the lead, has a strong sense of adventure, and prefers free relationships. Enjoys multiple connections without being tied down emotionally.',
    traits: ['Free-spirited', 'Leadership', 'Adventurous', 'Open to multiple partners', 'Can separate emotions'],
    compatibility: ['FAF', 'FSF'],
    strengths: ['Decisive', 'Action-oriented', 'Realistic', 'Flexible'],
    weaknesses: ['Dismissive of emotions', 'Too impulsive', 'Lacks stability', 'Difficulty building deep connections'],
    nightPersonality: 'Foreplay: Creates a light rhythm while teasing and observing reactions. Main event: Freely changes positions. Never gives up control, deliberately keeps things unpredictable. After: Seems to pull away quickly, but with the right person, wraps their arms around and monopolizes the afterglow.'
  },
  {
    code: 'LSL',
    name: 'The Devoted Protector',
    summary: 'A caring and loving guardian',
    fullDescription: 'Caring, approachable, and warm. Loves to devote themselves to others, naturally drawing people in. But secretly, they also crave being pampered.',
    category: 'dom',
    emoji: '👑',
    description: 'An extroverted type who takes the lead, seeks stability, and values romance. Devoted to their partner while maintaining control.',
    traits: ['Caring', 'Deeply loving', 'Stability-oriented', 'Devoted', 'Responsible'],
    compatibility: ['FSL', 'FAL'],
    strengths: ['Dedicated', 'Stable', 'Responsible', 'Deeply loving'],
    weaknesses: ['Over-giving', 'Self-sacrificing', 'Possessive', 'Expectations too high'],
    nightPersonality: 'Foreplay: Lots of skin contact in a "wrapping" style. Creates maximum comfort with compliments and smiles. Main event: Matches the partner\'s pace but switches to lead mode when requested. After: Strokes hair, offers drinks - full caretaker mode. Occasionally sneaks in a desire to be pampered too.'
  },
  {
    code: 'LSF',
    name: 'The Cool Strategist',
    summary: 'Reliable but emotionally reserved',
    fullDescription: 'Cool, calm, and collected. Not swayed by emotions, preferring efficient relationships. But their nighttime persona... is left to your imagination.',
    category: 'dom',
    emoji: '👑',
    description: 'An extroverted type who takes the lead, seeks stability, and prefers free relationships. Separates emotions and approaches things technically.',
    traits: ['Cool-headed', 'Technique-focused', 'Leadership', 'Stability-oriented', 'Emotionally detached'],
    compatibility: ['FSF', 'FAF'],
    strengths: ['Logical', 'Calm', 'Highly skilled', 'Efficient'],
    weaknesses: ['Poor at expressing emotions', 'Can seem cold', 'Lacks empathy', 'Shallow relationships'],
    nightPersonality: 'Foreplay: Calculates temperature and timing. Quietly collects "response profiles." Main event: Optimizes stimulation efficiently. Fine-tunes pace using voice and breathing as indicators. After: Checks satisfaction levels coolly. Mentally notes "improvements" for next time.'
  },
  // Devotee types (fantasy)
  {
    code: 'FAL',
    name: 'The Romantic Enthusiast',
    summary: 'A mood-maker who lives for love',
    fullDescription: 'A mood-making expert who goes all-in on romance. Skilled at romantic mind games that stir hearts. But deep down, they\'re actually quite lonely.',
    category: 'fantasy',
    emoji: '💖',
    description: 'An extroverted type who prefers to follow, has a strong sense of adventure, and values romance. Seeks new experiences while being guided by their partner.',
    traits: ['Great entertainer', 'Romantic strategist', 'Adventurous', 'Secretly lonely', 'Deeply loving'],
    compatibility: ['LAL', 'LSL'],
    strengths: ['Charming', 'Social', 'Cooperative', 'Honest'],
    weaknesses: ['Dependent', 'Lacks independence', 'Too clingy', 'Weak self-assertion'],
    nightPersonality: 'Foreplay: Sets the scene with mood lighting, music, and scent. Uses verbal teasing to quicken heartbeats. Main event: An emotional explosive type. Reads partner\'s expressions and throws in surprises. After: Suddenly becomes clingy with "I\'m lonely" - the gap raises heart rates all over again.'
  },
  {
    code: 'FAF',
    name: 'The Free Spirit',
    summary: 'A party-loving free soul',
    fullDescription: 'A free spirit who chases vibes and thrills. In love and play, "having fun right now" is the top priority. But rumor has it they get just a bit serious at night...?',
    category: 'fantasy',
    emoji: '💖',
    description: 'An extroverted type who prefers to follow, has a strong sense of adventure, and prefers free relationships. A pleasure-seeker who constantly craves stimulation.',
    traits: ['Vibe-driven', 'Thrill-seeker', 'Free soul', 'Lives in the moment', 'Serious at night'],
    compatibility: ['LAF', 'LSF'],
    strengths: ['Curious', 'Open-minded', 'Adaptable', 'Optimistic'],
    weaknesses: ['Gets bored easily', 'Lacks stability', 'Impulsive', 'Low responsibility'],
    nightPersonality: 'Foreplay: Vibe-first approach with humor and bold advances. Main event: Fast tempo, non-stop stimulation. High toy-introduction rate. After: Short cool-down. Quick transition to the next activity (late-night snack, afterparty).'
  },
  {
    code: 'FSL',
    name: 'The Tender Soul',
    summary: 'A soothing devoted lover',
    fullDescription: 'Can\'t relax without someone by their side. Completely devoted to their partner with a gentle personality. But their possessive side might be stronger than you\'d think.',
    category: 'fantasy',
    emoji: '💖',
    description: 'An extroverted type who prefers to follow, seeks stability, and values romance. Devoted to and dependent on their partner.',
    traits: ['Clingy', 'Dependent', 'Devoted', 'Possessive', 'Deeply loving'],
    compatibility: ['LAL', 'LSL'],
    strengths: ['Faithful', 'Deeply loving', 'Dedicated', 'Stability-oriented'],
    weaknesses: ['Too dependent', 'Jealous', 'Anxiety-prone', 'Lacks independence'],
    nightPersonality: 'Foreplay: Clings close while peeking at partner\'s reactions - "puppy-like" style. Main event: The more they give, the more they want. Frequent "don\'t leave me" signals. Possessiveness sends excitement skyrocketing. After: Spooning and cuddling mandatory. May issue a "no phone checking" decree.'
  },
  {
    code: 'FSF',
    name: 'The Easy-Going Charmer',
    summary: 'A laid-back mood-maker',
    fullDescription: 'Gentle and natural with everyone. Not aggressive about romance, going with the flow. But secretly, they\'re easily swept off their feet by a single word.',
    category: 'fantasy',
    emoji: '💖',
    description: 'An extroverted type who prefers to follow, seeks stability, and prefers free relationships. Goes at their own pace without being swayed by emotions.',
    traits: ['Gentle', 'Natural', 'Goes with the flow', 'Easily charmed', 'Easy-going'],
    compatibility: ['LSF', 'LAF'],
    strengths: ['High freedom', 'Low stress', 'Realistic', 'Rational'],
    weaknesses: ['Emotionally detached', 'Difficulty building deep connections', 'Can seem irresponsible', 'Can seem cold'],
    nightPersonality: 'Foreplay: Melts tension with casual conversation, closing distance naturally. Main event: Flexibly adapts to partner\'s pace. Occasional sweet whispers completely change the atmosphere. After: Snuggles up like a warm blanket while casually discussing plans.'
  },
];

export const getCategoryColor = (category: PersonalityType['category']) => {
  switch (category) {
    case 'dom':
      return 'from-red-500 to-pink-500';
    case 'fantasy':
      return 'from-blue-500 to-cyan-400';
    default:
      return 'from-gray-500 to-gray-600';
  }
};

export const getCategoryName = (category: PersonalityType['category']) => {
  switch (category) {
    case 'dom':
      return 'Leader';
    case 'fantasy':
      return 'Devotee';
    default:
      return '';
  }
};
