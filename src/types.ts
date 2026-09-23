export type JobRole =
  | 'Python Developer'
  | 'Java Developer'
  | 'Web Developer'
  | 'Data Analyst'
  | 'Machine Learning Engineer'
  | 'Software Engineer'
  | 'General Interview';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type InterviewType = 'Technical' | 'HR' | 'Mixed';

export type QuestionCount = 5 | 10 | 15;

export interface Question {
  id: string;
  question: string;
  role: JobRole;
  level: ExperienceLevel;
  type: 'Technical' | 'HR';
  expectedConcepts: string[];
  expectedKeywords: string[];
  benchmarkAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

export interface SentimentAnalysis {
  tone: 'Positive' | 'Neutral' | 'Negative';
  score: number; // -1 to +1
  confidence: number; // 0 to 1
  politeness: 'Polite' | 'Neutral' | 'Direct';
}

export type AnswerCorrectness =
  | 'Correct'
  | 'Mostly Correct'
  | 'Partially Correct'
  | 'Incorrect / Not Relevant';

export type CommunicationClassification =
  | 'Strong'
  | 'Good'
  | 'Needs Improvement'
  | 'Not Relevant';

export interface AnswerScores {
  relevanceScore: number; // 0-100
  technicalScore: number; // 0-100 (for Technical)
  completenessScore: number; // 0-100
  clarityScore: number; // 0-100
  grammarScore?: number; // 0-100 (for HR / Communication)
  structureScore?: number; // 0-100 (for HR / Communication)
  overallScore: number; // 0-100
}

export interface RepeatedWordItem {
  word: string;
  count: number;
}

export interface NLPAnalysisResult {
  rawText: string;
  cleanedText: string;
  tokens: string[];
  filteredTokens: string[];
  extractedKeywords: string[];
  matchedExpectedKeywords: string[];
  missingKeywords: string[];
  semanticSimilarity: number; // 0-1
  relevanceCategory: 'Highly Relevant' | 'Relevant' | 'Partially Relevant' | 'Not Relevant';
  correctness: AnswerCorrectness;
  communicationClassification?: CommunicationClassification;
  feedback: string;
  expectedConceptHighlight?: string;
  sentiment: SentimentAnalysis;
  scores: AnswerScores;
  strengths: string[];
  improvements: string[];
  scoringFormulaExplanation: string;
  tokenCount: number;
  stopwordCount: number;
  // Dedicated HR / Communication properties
  isHrQuestion?: boolean;
  grammarObservations?: string[];
  detectedKeyPhrases?: string[];
  sentenceCount?: number;
  wordCount?: number;
  repeatedWords?: RepeatedWordItem[];
  vocabularyAssessment?: string;
  structureNotes?: string;
}

export interface InterviewMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
  timestamp: string;
  questionId?: string;
  questionIndex?: number;
  nlpAnalysis?: NLPAnalysisResult;
  isFollowUp?: boolean;
  isEvaluation?: boolean;
  isHrEvaluation?: boolean;
}

export interface FinalReport {
  overallScore: number;
  technicalScore: number;
  relevanceScore: number;
  completenessScore: number;
  clarityScore: number;
  grammarScore?: number;
  structureScore?: number;
  communicationScore?: number;
  isHrOnly?: boolean;
  isMixed?: boolean;
  strengths: string[];
  weaknesses: string[];
  aiFeedback: string;
  studyTopics: string[];
  recommendations: string[];
  commonGrammarIssues?: string[];
  recommendedPracticeAreas?: string[];
  technicalSummary?: {
    overallScore: number;
    technicalScore: number;
    relevanceScore: number;
    completenessScore: number;
    clarityScore: number;
    count: number;
  };
  communicationSummary?: {
    overallScore: number;
    relevanceScore: number;
    clarityScore: number;
    grammarScore: number;
    structureScore: number;
    completenessScore: number;
    count: number;
  };
  questionEvaluations: {
    questionNumber: number;
    questionText: string;
    userAnswer: string;
    isHr?: boolean;
    overallScore: number;
    relevanceScore: number;
    technicalScore: number;
    completenessScore: number;
    clarityScore: number;
    grammarScore?: number;
    structureScore?: number;
    classification?: string;
    relevanceCategory: string;
    extractedKeywords: string[];
    sentimentTone: string;
    improvements: string[];
    feedback?: string;
    grammarObservations?: string[];
  }[];
}

export interface InterviewSession {
  id: string;
  role: JobRole;
  level: ExperienceLevel;
  type: InterviewType;
  questionCount: number;
  currentQuestionIndex: number;
  questions: Question[];
  messages: InterviewMessage[];
  evaluations: NLPAnalysisResult[];
  isCompleted: boolean;
  startTime: string;
  endTime?: string;
  finalReport?: FinalReport;
  voiceEnabled: boolean;
  isDemo?: boolean;
}

export interface InterviewHistoryItem {
  id: string;
  date: string;
  role: JobRole;
  level: ExperienceLevel;
  type: InterviewType;
  questionCount: number;
  finalScore: number;
  durationMinutes: number;
  sessionData: InterviewSession;
}

export interface UserProfile {
  name: string;
  profileType: string;
  preferredRoles: string[];
  primaryRole: string;
}

export type ActiveTab =
  | 'landing'
  | 'setup'
  | 'chat'
  | 'report'
  | 'history'
  | 'performance'
  | 'how-it-works'
  | 'nlp-docs'
  | 'academic-about'
  | 'profile';
