// ─── AI SERVICE ───────────────────────────────────────────────────────────────
// Every AI-generated string in the app comes from here. Screens fetch through
// `useAIBrief`, which fires on screen focus — nothing is computed at import time.
//
// TODO: replace the mocked bodies with real calls once the backend ships the
// endpoints from the architecture doc:
//   getAIBrief          → GET  /api/v1/ai/briefing
//   getAICopilotInsight → POST /api/v1/ai/copilot

const SIMULATED_LATENCY_MS = 700;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ── Per-screen daily briefs ──────────────────────────────────────────────────
const AI_BRIEFS = {
  home: {
    summary:
      "Heavy day ahead — 3 back-to-back classes. Prep for your Web Dev quiz during the 11 AM break. Data Structures attendance is at risk; consider attending today's session.",
    tags: ["Web Dev quiz", "Attendance risk", "3 classes"],
  },
  schedule: {
    summary:
      "Database Systems is cancelled today and Software Engineering moved to Friday — that frees your entire afternoon. I've blocked 15 mins of prep before Data Structures to keep your focus high.",
    tags: ["1 cancelled", "1 rescheduled", "Afternoon free"],
  },
  tasks: {
    summary:
      "Focus Mode: Your Database assignment is due in 2 days, and you usually struggle with this subject. Start now to avoid a late-night crunch.",
    tags: ["Due in 2 days", "High effort"],
  },
  grades: {
    summary:
      "You're 0.08 off your 3.90 target. Holding an A- in Advanced Algorithms and Data Structures this semester gets you there without needing a perfect finish.",
    tags: ["3.82 CGPA", "0.08 to target"],
  },
  announcements: {
    summary:
      "Focus on the final exam schedule released 30 mins ago. Your Math exam is scheduled for next Monday. Prepare early!",
    tags: ["Exam schedule", "Math on Monday"],
  },
};

// ── Header copilot insights ──────────────────────────────────────────────────
const AI_INSIGHTS = {
  general: {
    title: "Today's Cognitive Overview",
    content:
      "Hello Saif! I'm your Unimate AI assistant. Based on your current calendar, you have a high cognitive load today with 3 classes and a database assignment. Let's optimize your day!",
    icon: "psychology",
  },
  workload: {
    title: "Cognitive Load Forecast",
    content:
      "You have 3 classes today (Web Dev, Data Structures, Database Systems) and 1 urgent task due at 5:00 PM. I've calculated a high mental burden between 11 AM - 3 PM. Take a 15-minute break after your second class to stay sharp!",
    icon: "bar-chart",
  },
  gpa: {
    title: "GPA & Academic Analysis",
    content:
      "Outstanding job! Your current CGPA is 3.82. You have completed 100% of your tasks this week. If you maintain this submission streak, you are on track to graduate with first-class honors!",
    icon: "trending-up",
  },
  attendance: {
    title: "Attendance & Class Safety",
    content:
      "Your attendance in Data Structures is currently at 70% (Critical). You need to attend today's session to raise it above the 75% safe threshold. I highly recommend not skipping any classes today!",
    icon: "timer",
  },
};

// Responses are stable for a session, so a hit avoids re-showing the skeleton
// when the user navigates back to a screen.
const briefCache = new Map();
const insightCache = new Map();

/**
 * Daily brief for a screen.
 * @param {'home'|'schedule'|'tasks'|'grades'} scope
 * @returns {Promise<{ summary: string, tags?: string[] }>}
 */
export async function getAIBrief(scope) {
  if (briefCache.has(scope)) return briefCache.get(scope);

  await delay(SIMULATED_LATENCY_MS);

  const brief = AI_BRIEFS[scope];
  if (!brief) throw new Error(`Unknown AI brief scope: ${scope}`);

  briefCache.set(scope, brief);
  return brief;
}

/**
 * Copilot insight behind the header sparkle button.
 * @param {'general'|'workload'|'gpa'|'attendance'} topic
 * @returns {Promise<{ title: string, content: string, icon: string }>}
 */
export async function getAICopilotInsight(topic) {
  if (insightCache.has(topic)) return insightCache.get(topic);

  await delay(SIMULATED_LATENCY_MS);

  const insight = AI_INSIGHTS[topic];
  if (!insight) throw new Error(`Unknown AI insight topic: ${topic}`);

  insightCache.set(topic, insight);
  return insight;
}

/** Drops cached responses — call after data the AI reasons over changes. */
export function clearAICache() {
  briefCache.clear();
  insightCache.clear();
}
