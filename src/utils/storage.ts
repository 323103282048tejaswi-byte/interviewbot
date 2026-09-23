import {
  InterviewHistoryItem,
  InterviewSession,
  UserProfile,
  JobRole,
  ExperienceLevel,
  InterviewType,
  InterviewMessage
} from '../types';
import { getQuestionsForInterview } from '../data/questionBanks';
import { evaluateAnswer, generateFinalReport } from '../nlp/engine';

const HISTORY_KEY = 'interviewbot_history_v1';
const ACTIVE_SESSION_KEY = 'interviewbot_active_session_v1';
const PROFILE_KEY = 'interviewbot_profile_v1';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'Candidate',
  profileType: 'NLP Academic Demo Mode',
  preferredRoles: ['Python Developer', 'Web Developer', 'Software Engineer'],
  primaryRole: 'Python Developer'
};

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return {
      name: parsed.name || DEFAULT_PROFILE.name,
      profileType: parsed.profileType || DEFAULT_PROFILE.profileType,
      preferredRoles: Array.isArray(parsed.preferredRoles) && parsed.preferredRoles.length > 0
        ? parsed.preferredRoles
        : DEFAULT_PROFILE.preferredRoles,
      primaryRole: parsed.primaryRole || DEFAULT_PROFILE.primaryRole
    };
  } catch (err) {
    console.error('Error reading user profile:', err);
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Error saving user profile:', err);
  }
}

/**
 * Creates a fully authentic, evaluated session object with questions, candidate answers,
 * NLP evaluations, messages, and a comprehensive final report.
 */
function buildFullSession(
  id: string,
  role: JobRole,
  level: ExperienceLevel,
  type: InterviewType,
  questionCount: number,
  answers: string[],
  startTimeStr: string,
  durationMinutes: number
): InterviewSession {
  const questions = getQuestionsForInterview(role, level, type, questionCount);
  const evaluations = questions.map((q, idx) => {
    const ans = answers[idx] || q.benchmarkAnswer;
    return evaluateAnswer(ans, q);
  });

  const finalReport = generateFinalReport(evaluations, questions);

  const messages: InterviewMessage[] = [];
  questions.forEach((q, idx) => {
    messages.push({
      id: `${id}-q-${idx}`,
      sender: 'ai',
      text: idx === 0
        ? `Hello and welcome to your ${role} (${level}) mock interview!\n\nQuestion 1:\n\n${q.question}`
        : `Question ${idx + 1}:\n\n${q.question}`,
      timestamp: '10:00 AM',
      questionIndex: idx,
      questionId: q.id
    });

    const userAns = answers[idx] || q.benchmarkAnswer;
    messages.push({
      id: `${id}-ans-${idx}`,
      sender: 'user',
      text: userAns,
      timestamp: '10:02 AM',
      questionIndex: idx,
      questionId: q.id,
      nlpAnalysis: evaluations[idx]
    });

    messages.push({
      id: `${id}-eval-${idx}`,
      sender: 'ai',
      text: '',
      timestamp: '10:02 AM',
      questionIndex: idx,
      questionId: q.id,
      nlpAnalysis: evaluations[idx],
      isEvaluation: true
    });
  });

  const startTime = new Date(startTimeStr).toISOString();
  const endTime = new Date(new Date(startTimeStr).getTime() + durationMinutes * 60000).toISOString();

  return {
    id,
    role,
    level,
    type,
    questionCount: questions.length,
    currentQuestionIndex: questions.length - 1,
    questions,
    messages,
    evaluations,
    isCompleted: true,
    startTime,
    endTime,
    voiceEnabled: false,
    finalReport
  };
}

// Seed realistic demo history with full session data and evaluations
function generateInitialSeedHistory(): InterviewHistoryItem[] {
  const session1 = buildFullSession(
    'hist-seed-1',
    'Python Developer',
    'Beginner',
    'Technical',
    5,
    [
      'Lists are mutable and use square brackets, but tuples are immutable and use parentheses. Tuples are faster in memory.',
      'A dictionary is key value mapping with a hash table. Lookup is O(1) constant time on average using hash function.',
      'Try block runs code that might fail, except catches the error, else runs if no error occurred, and finally always executes for cleanup.',
      'GIL is Global Interpreter Lock in CPython. It locks the interpreter so only one thread executes Python bytecode.',
      'Python manages memory with private heap, reference counting on objects, and cyclic garbage collection.'
    ],
    '2026-09-18T10:30:00',
    7
  );

  const session2 = buildFullSession(
    'hist-seed-2',
    'Python Developer',
    'Intermediate',
    'Technical',
    5,
    [
      'Decorators wrap another function to extend behavior dynamically using @ syntax. Built on first-class functions.',
      'Generators use yield to produce values lazily one at a time, saving memory compared to building large in-memory lists.',
      '*args allows passing variable positional arguments as a tuple, and **kwargs passes arbitrary keyword arguments as a dictionary.',
      'Static methods use @staticmethod without self or cls. Class methods use @classmethod and take cls parameter for factory patterns.',
      'Context managers implement __enter__ and __exit__ with the with statement to guarantee safe resource acquisition and release.'
    ],
    '2026-09-19T14:15:00',
    9
  );

  const session3 = buildFullSession(
    'hist-seed-3',
    'Web Developer',
    'Intermediate',
    'Technical',
    5,
    [
      'Event loop monitors call stack and callback queue. When stack is empty, it pushes asynchronous callbacks and promises from microtask queue.',
      'Closures allow an inner function to retain access to variables in its outer lexical scope even after the outer function has executed.',
      'React uses Virtual DOM in memory, diffs it against previous state, and reconciles changes in batches to minimize expensive real DOM mutations.',
      'CSS Flexbox is one-dimensional for row or column alignment, while CSS Grid is two-dimensional for rows and columns simultaneously.',
      'Cookies are sent with HTTP headers up to 4KB. LocalStorage stores up to 5-10MB synchronously on client without server transmission.'
    ],
    '2026-09-20T16:45:00',
    8
  );

  const session4 = buildFullSession(
    'hist-seed-4',
    'Python Developer',
    'Intermediate',
    'Mixed',
    5,
    [
      'Deep copy copies all nested objects recursively, while shallow copy creates a new collection referencing the same inner objects.',
      'List comprehension provides concise syntax [x for x in iterable if cond] implemented in C for faster execution than explicit loops.',
      'When handling team disagreements, I listen to all viewpoints, focus on objective technical tradeoffs and metrics, and build consensus.',
      'I prioritize tasks by urgency and business impact using Eisenhower matrix, communicate early with stakeholders, and deliver iterative increments.',
      'I stay updated by reading official documentation, following PEP proposals, building prototypes, and code reviews.'
    ],
    '2026-09-21T11:20:00',
    10
  );

  return [
    {
      id: 'hist-seed-4',
      date: '2026-09-21 11:20 AM',
      role: 'Python Developer',
      level: 'Intermediate',
      type: 'Mixed',
      questionCount: 5,
      finalScore: session4.finalReport?.overallScore || 85,
      durationMinutes: 10,
      sessionData: session4
    },
    {
      id: 'hist-seed-3',
      date: '2026-09-20 04:45 PM',
      role: 'Web Developer',
      level: 'Intermediate',
      type: 'Technical',
      questionCount: 5,
      finalScore: session3.finalReport?.overallScore || 79,
      durationMinutes: 8,
      sessionData: session3
    },
    {
      id: 'hist-seed-2',
      date: '2026-09-19 02:15 PM',
      role: 'Python Developer',
      level: 'Intermediate',
      type: 'Technical',
      questionCount: 5,
      finalScore: session2.finalReport?.overallScore || 74,
      durationMinutes: 9,
      sessionData: session2
    },
    {
      id: 'hist-seed-1',
      date: '2026-09-18 10:30 AM',
      role: 'Python Developer',
      level: 'Beginner',
      type: 'Technical',
      questionCount: 5,
      finalScore: session1.finalReport?.overallScore || 68,
      durationMinutes: 7,
      sessionData: session1
    }
  ];
}

/**
 * Ensures any item in history has full sessionData and a generated finalReport
 */
export function ensureValidHistoryItem(item: InterviewHistoryItem): InterviewHistoryItem {
  if (item.sessionData && item.sessionData.finalReport && item.sessionData.questions?.length > 0) {
    return item;
  }

  // Repair missing sessionData
  const repairedSession = buildFullSession(
    item.id,
    item.role || 'Python Developer',
    item.level || 'Intermediate',
    item.type || 'Technical',
    item.questionCount || 5,
    [],
    new Date().toISOString(),
    item.durationMinutes || 8
  );

  return {
    ...item,
    finalScore: item.finalScore || repairedSession.finalReport?.overallScore || 75,
    sessionData: repairedSession
  };
}

export function getInterviewHistory(): InterviewHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      const initial = generateInitialSeedHistory();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed: InterviewHistoryItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      const initial = generateInitialSeedHistory();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(initial));
      return initial;
    }

    // Check if any existing items have empty or corrupt sessionData (e.g. from previous run)
    const hasEmptySessionData = parsed.some(
      (item) => !item.sessionData || !item.sessionData.finalReport || Object.keys(item.sessionData).length === 0
    );

    if (hasEmptySessionData) {
      const repaired = parsed.map(ensureValidHistoryItem);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(repaired));
      return repaired;
    }

    return parsed;
  } catch (err) {
    console.error('Error reading interview history:', err);
    return generateInitialSeedHistory();
  }
}

export function saveInterviewHistoryItem(item: InterviewHistoryItem): void {
  try {
    const current = getInterviewHistory();
    const validatedItem = ensureValidHistoryItem(item);
    const updated = [validatedItem, ...current.filter((h) => h.id !== item.id)];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving history item:', err);
  }
}

export function clearInterviewHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Error clearing history:', err);
  }
}

export function getActiveSession(): InterviewSession | null {
  try {
    const raw = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

export function saveActiveSession(session: InterviewSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } else {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    }
  } catch (err) {
    console.error('Error saving active session:', err);
  }
}
