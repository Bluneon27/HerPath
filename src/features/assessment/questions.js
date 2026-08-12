export const QUESTIONS = [
  {
    id: 'q1', field: 'q1_current_season', type: 'single-select', scored: false,
    text: "Which statement best describes where you are right now?",
    options: [
      { id: 'Q1-A', label: "I feel clear about where I'm going, but I need to become more consistent." },
      { id: 'Q1-B', label: "I'm doing many things, but I'm struggling to create balance." },
      { id: 'Q1-C', label: "I feel like I'm in a transition and need clarity about what's next." },
      { id: 'Q1-D', label: "I'm generally doing well, but I know there is more I need to develop." },
      { id: 'Q1-E', label: "I feel stuck in one or more areas and don't know where to begin." },
    ],
  },
  {
    id: 'q2', field: 'q2_primary_priority', type: 'single-select', scored: true, weight: 4,
    text: "If you could make significant progress in ONE area over the next six months, what would it be?",
    options: [
      { id: 'Q2-A', label: "Spiritual Growth", path: 'SP' },
      { id: 'Q2-B', label: "Life & Relationships", path: 'LR' },
      { id: 'Q2-C', label: "Personal Growth", path: 'PG' },
      { id: 'Q2-D', label: "Purpose & Progress", path: 'PP' },
    ],
  },
  {
    id: 'q3', field: 'q3_current_focus', type: 'single-select', scored: true, weight: 3,
    text: "Which of these currently takes up the most mental or emotional space for you?",
    options: [
      { id: 'Q3-A', label: "My relationship with God and spiritual life", path: 'SP' },
      { id: 'Q3-B', label: "My marriage, children, family, or relationships", path: 'LR' },
      { id: 'Q3-C', label: "My personal well-being, habits, discipline, or confidence", path: 'PG' },
      { id: 'Q3-D', label: "My purpose, career, business, finances, or future", path: 'PP' },
    ],
  },
  {
    id: 'q4', field: 'q4_perceived_barrier', type: 'single-select', scored: true, weight: 3,
    text: "Complete this sentence: \"I know I would make progress if I could just...\"",
    options: [
      { id: 'Q4-A', label: "Develop more consistency and discipline", path: 'PG' },
      { id: 'Q4-B', label: "Figure out what I really need to do next", path: 'PP' },
      { id: 'Q4-C', label: "Create better balance and structure in my life", path: 'LR' },
      { id: 'Q4-D', label: "Strengthen my relationship with God", path: 'SP' },
      { id: 'Q4-E', label: "Take better care of myself", path: 'PG' },
      { id: 'Q4-F', label: "Improve my relationships", path: 'LR' },
      { id: 'Q4-G', label: "Move forward in my career, business, finances, or goals", path: 'PP' },
    ],
  },
  {
    id: 'q5', field: 'q5_current_challenge', type: 'single-select', scored: true, weight: 2,
    text: "Which statement sounds most like you?",
    options: [
      { id: 'Q5-A', label: "I know what I need to do, but I struggle to follow through", path: 'PG' },
      { id: 'Q5-B', label: "I have several responsibilities competing for my attention", path: 'LR' },
      { id: 'Q5-C', label: "I'm not sure what my next chapter should look like", path: 'PP' },
      { id: 'Q5-D', label: "I want to grow spiritually but struggle to remain consistent", path: 'SP' },
      { id: 'Q5-E', label: "I've been putting myself last for too long", path: 'PG' },
      { id: 'Q5-F', label: "Some of my relationships need attention", path: 'LR' },
      { id: 'Q5-G', label: "I feel ready for the next level professionally or financially", path: 'PP' },
    ],
  },
  {
    id: 'q6', field: 'q6_life_season', type: 'single-select', scored: false,
    text: "How would you describe your current season?",
    options: [
      { id: 'Q6-A', label: "Building — I'm establishing something new." },
      { id: 'Q6-B', label: "Balancing — I'm trying to manage many responsibilities." },
      { id: 'Q6-C', label: "Transitioning — I'm moving from one season to another." },
      { id: 'Q6-D', label: "Recovering — I'm trying to regain stability and direction." },
      { id: 'Q6-E', label: "Growing — I'm doing well and want to reach the next level." },
      { id: 'Q6-F', label: "Searching — I'm still trying to figure things out." },
    ],
  },
  {
    id: 'q7', field: 'q7_consistency_profile', type: 'single-select', scored: false,
    text: "When you set a goal for yourself, what usually happens?",
    options: [
      { id: 'Q7-A', label: "I follow through consistently." },
      { id: 'Q7-B', label: "I start strongly but lose momentum." },
      { id: 'Q7-C', label: "I struggle to get started." },
      { id: 'Q7-D', label: "I get overwhelmed by everything else going on." },
      { id: 'Q7-E', label: "I achieve the goal but struggle to maintain the change." },
    ],
  },
  {
    id: 'q8', field: 'q8_support_need', type: 'single-select', scored: false,
    text: "What kind of support would help you most right now?",
    options: [
      { id: 'Q8-A', label: "A clear plan showing me what to do" },
      { id: 'Q8-B', label: "Someone to hold me accountable" },
      { id: 'Q8-C', label: "Someone experienced to teach and guide me" },
      { id: 'Q8-D', label: "A community of women going through similar things" },
      { id: 'Q8-E', label: "Time and space to reflect and understand myself better" },
    ],
  },
  {
    id: 'q9', field: 'q9_growth_capacity', type: 'single-select', scored: false,
    text: "How much time can you realistically dedicate to your growth each week?",
    options: [
      { id: 'Q9-A', label: "Less than 1 hour" },
      { id: 'Q9-B', label: "1–2 hours" },
      { id: 'Q9-C', label: "3–5 hours" },
      { id: 'Q9-D', label: "More than 5 hours" },
    ],
  },
  {
    id: 'q10', field: 'q10_current_life_challenge', type: 'free-text', scored: false,
    text: "What is one thing you wish was different about your life right now?",
    maxLength: 1000,
  },
  {
    id: 'q11', field: 'q11_six_month_success', type: 'free-text', scored: false,
    text: "What would meaningful progress look like for you six months from now?",
    maxLength: 1000,
  },
];
