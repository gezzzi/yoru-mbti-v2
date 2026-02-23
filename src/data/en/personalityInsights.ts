export interface PersonalityInsight {
  axisHighlights: string[];
  recommendedActions: string[];
  improvementTips: string[];
  expertCommentary: string[];
}

export const personalityInsights: Record<string, PersonalityInsight> = {
  LAL: {
    axisHighlights: [
      "Highly extroverted with a star quality that instantly raises the temperature of any room.",
      "Strong on the lead axis - the more control they take, the greater their sense of security and immersion.",
      "With a high adventure orientation, introducing new stimulation and creative touches brings out their full potential.",
    ],
    recommendedActions: [
      "Plan a date or an intimate evening at least once a week, and take the initiative to create the fun yourself.",
      "Keep notes on your partner's reactions and build your own personal 'playbook' to refine over time.",
      "Leave voice messages or videos sharing your feelings to extend the afterglow and deepen trust.",
    ],
    improvementTips: [
      "For partners who aren't comfortable with strong leadership, offer choices and ask 'Which would you prefer?' as a gentle cushion.",
      "When things get too heated, set a 3-minute cooldown period to verbally check in on emotions and physical sensations.",
      "When you feel jealousy or possessiveness creeping in, write down the underlying anxieties and share them calmly over the weekend to prevent conflict.",
    ],
    expertCommentary: [
      "LAL types have high extroversion and adventure orientation, which means they tend to impulsively seek new targets when stimulation runs low. Deliberately introducing novelty on a regular basis stabilizes satisfaction and reduces restlessness.",
      "While they thrive on being relied upon, too much dependence can lead to burnout. Practicing self-management through something like a 'weekly leadership memo' helps prevent exhaustion.",
    ],
  },
  LAF: {
    axisHighlights: [
      "The combination of extroversion and a lead tendency makes them skilled at fast-paced push-and-pull dynamics.",
      "They prioritize freedom, and their performance improves when they follow intuition over emotion.",
      "With a high adventure orientation, adding improvisation and playful competition amplifies their charm.",
    ],
    recommendedActions: [
      "Every three months, review which routines have gone stale and which you want to keep, to maintain a sense of playfulness.",
      "Prepare multiple plans and create 'multi-scenario dates' where you can choose based on mood - this stabilizes satisfaction.",
      "Save appealing images on social media or in a scrapbook to build a library of creative ideas for future use.",
    ],
    improvementTips: [
      "While asserting your boundaries around freedom, proactively offer your partner reassurance (such as communication frequency or check-in formats) to reduce friction.",
      "When you feel the urge to impulsively make plans, rate your emotional state on a scale of 1-10 before acting - this habit helps prevent runaway decisions.",
      "Building a habit of sending your partner 'today's best moment' each night fosters steady trust within your carefree nature.",
    ],
    expertCommentary: [
      "LAF types have a strong dopamine sensitivity and can suddenly lose enthusiasm when stimulation drops. Designing environmental changes to maintain motivation is essential.",
      "Because they combine a lead orientation with a freedom preference, they often face the dilemma of 'cooling off toward the one they truly care about.' Creating a priority sheet that maps out who gets what time helps them confidently commit to deeper relationships.",
    ],
  },
  LSL: {
    axisHighlights: [
      "Extroversion and stability orientation coexist, making them a nurturing type known for outstanding care.",
      "While their leadership ability is high, they prioritize their partner's safety above all, making them excellent at building trust.",
      "With a strong love axis, they value consistency between emotions and words.",
    ],
    recommendedActions: [
      "Set aside a 'gratitude time' once a week to verbally acknowledge your partner's small efforts.",
      "When you feel you've been doing too much caregiving, script a situation where you get to be pampered instead, and practice role reversal.",
      "Prepare a hospitality list (drinks, aromatherapy, music) to boost your confidence in creating a comforting atmosphere.",
    ],
    improvementTips: [
      "When you notice signs of burnout from over-giving, schedule a 24-hour digital detox day to reset your mind and body.",
      "Even if your partner seems unresponsive, regularly ask 'Is my care reaching you?' to avoid temperature gaps in the relationship.",
      "Practice expressing your own desires positively - try saying something like 'This week it's my turn, so let me be spoiled' in a gentle way.",
    ],
    expertCommentary: [
      "LSL types have a strong oxytocin orientation, and they can become suddenly unstable when the cycle of empathy is disrupted. Visualizing the balance between giving care and receiving it improves long-term satisfaction.",
      "While they naturally become emotional safe havens, they tend to sacrifice personal time. Building 'self-care slots' into their schedule is an essential form of self-management.",
    ],
  },
  LSF: {
    axisHighlights: [
      "While extroversion and leadership ability are high, they organize situations through logic rather than emotion, serving as a coordinator.",
      "They prioritize efficiency over stability and find fulfillment in contributing through technical skills.",
      "With a high degree of freedom orientation, they excel at maintaining a comfortable distance in relationships.",
    ],
    recommendedActions: [
      "Regularly update your playlists and gadgets, making it a habit to 'keep your techniques and presentations fresh.'",
      "After each session, share a 3-point feedback (2 positives + 1 improvement) to maintain a sense of ongoing growth in the relationship.",
      "Share scripts or item lists in advance so you can prepare at your own pace, which increases a sense of security.",
    ],
    improvementTips: [
      "When you find it hard to read your partner's emotions, switch to quantitative questions like Yes/No or a 5-point scale to gauge the temperature.",
      "Since you tend to forget physical aftercare, set a timer dedicated to aftercare and ensure time for hydration and massage.",
      "Given your temperament of not wanting interference, explicitly communicating your boundaries reduces unnecessary friction.",
    ],
    expertCommentary: [
      "LSF types may appear detached, but they possess high concentration and a technical orientation, giving them top-tier performance stability. Keeping observation logs further improves their precision.",
      "However, they tend to deprioritize emotional responses. Scheduling 'emotional check-in conversations' at regular intervals, such as the beginning of each month, helps the relationship grow sustainably.",
    ],
  },
  FAL: {
    axisHighlights: [
      "Highly extroverted with strong emotional expressiveness, they naturally handle public displays of affection with ease.",
      "Their lead tendency is moderate, favoring a collaborative co-creative style.",
      "With a balanced adventure orientation, they strike a good balance between planning and surprises.",
    ],
    recommendedActions: [
      "Set small goals to tackle together each week and share the sense of accomplishment.",
      "Write down 3 of your partner's strengths and aim to compliment them from a different angle the following week - keep your gratitude fresh.",
      "Increase casual physical touch and skinship in everyday settings to enrich your daily connection and boost satisfaction.",
    ],
    improvementTips: [
      "Since conversations tend to branch off in many directions, simply confirming 'the topic I want to discuss right now' at the start reduces friction.",
      "When prioritizing emotions causes delays in practical matters, share a to-do list and clarify role assignments.",
      "During conflicts, make sure to include a 'positive closing remark' within 24 hours so things don't linger.",
    ],
    expertCommentary: [
      "FAL types have a high social synchronization rate and tend to care about external opinions. Establishing 'standards decided together as a couple' helps them stay on course without being swayed by outside voices.",
      "Because their empathy is strong, they easily absorb their partner's emotions. Introducing a system to share your condition as a meter or score is recommended.",
    ],
  },
  FAF: {
    axisHighlights: [
      "Extroversion and freedom orientation stand out prominently, drawing others in with their upbeat energy.",
      "While their leadership ability is also high, they tend to prioritize spontaneous playfulness.",
      "With an extremely high adventure orientation, seeking unknown experiences elevates their motivation.",
    ],
    recommendedActions: [
      "At the start of each month, write down '3 experiences I want to try this month' and share them with your partner to schedule together.",
      "Use voice memos to log your sensory experiences, creating a 'pleasure archive' you can look back on to deepen self-understanding.",
      "Regularly incorporate extraordinary events like trips and festivals to add rhythm and accents to the relationship.",
    ],
    improvementTips: [
      "If you tend toward impulse decisions or sudden schedule changes, apply the 48-hour rule (will I still want this in 2 days?) to keep impulsiveness in check.",
      "To ensure the relationship isn't perceived as superficial, prepare tangible gifts like thank-you letters or photo books at meaningful milestones.",
      "When your partner can't keep up, use a two-step approach: give a quick explanation first, then follow up with a slow confirmation to match their pace.",
    ],
    expertCommentary: [
      "FAF types have a strong stimulus-seeking dopamine circuit and may sabotage relationships out of fear of monotony. Planning changes proactively to 'stay ahead of boredom' creates stability.",
      "The key to balancing freedom and responsibility is creating a values map that visualizes which principles are non-negotiable and which are flexible.",
    ],
  },
  FSL: {
    axisHighlights: [
      "Extroversion and stability orientation coexist, making them a mediator type who soothes people's hearts.",
      "With a high love axis, they excel at caring through expressions and words.",
      "Their lead tendency is moderate, and they have the flexibility to adapt to their partner.",
    ],
    recommendedActions: [
      "Keep a 3-minute reflection journal each night, recording positive interactions and areas for improvement to inform the following week's conversations.",
      "Make casual strolls and coffee-shop chats a routine to maintain comfortable, low-key communication.",
      "Continue a 'gratitude relay' where you express thanks through voice messages or written notes - this strengthens your partner's trust.",
    ],
    improvementTips: [
      "Since you tend to bottle things up, start writing down and sharing frustrations early - when they've only reached about 20%.",
      "When you feel you've been over-supporting others, block out self-care time on your weekend schedule and prioritize physical and mental recovery.",
      "Rather than masking things with surface-level cheerfulness, practice putting your true feelings into words when you feel safe to do so.",
    ],
    expertCommentary: [
      "FSL types have high empathy, and when they absorb others' emotions, their personal boundaries can become blurred. Self-monitoring to ask 'Whose emotions am I picking up right now?' is crucial.",
      "In relationships, they tend to take on 'invisible labor,' so creating a shared role list together helps distribute the load more evenly.",
    ],
  },
  FSF: {
    axisHighlights: [
      "While highly extroverted, they combine a freedom orientation with logical thinking, serving as a cool-headed coordinator.",
      "They switch their lead role depending on the situation, reading the room to find their position.",
      "A realist who prioritizes efficiency over adventure, valuing results over emotions.",
    ],
    recommendedActions: [
      "Once a week, score your KPIs as a couple (satisfaction, stress levels) and discuss improvement actions together.",
      "Share tasks and roles using tools like Trello to visually balance the workload and reduce unnecessary conflict.",
      "Attend events or workshops together that satisfy intellectual curiosity, expanding your shared vocabulary.",
    ],
    improvementTips: [
      "Since emotional expression tends to be understated, set aside time on weekends to verbally share your 'top 3 happiest moments of the week.'",
      "When problems persist that can't be solved logically, establish a rule to ensure rest and nutrition before resuming the discussion.",
      "When your partner is seeking emotional support, consciously switch to prioritizing empathy over solutions.",
    ],
    expertCommentary: [
      "FSF types excel at rationality, but they can sometimes leave their partner's feelings behind by over-prioritizing logical correctness. Simply following the order of 'acknowledge first, then suggest' makes a significant improvement.",
      "Additionally, their performance improves with greater freedom, so managing their schedule with built-in buffer time rather than packing it tight is essential.",
    ],
  },
};
