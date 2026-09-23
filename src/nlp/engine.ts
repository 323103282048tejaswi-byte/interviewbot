import { NLPAnalysisResult, Question, SentimentAnalysis, AnswerScores } from '../types';

// Standard English Stopwords list for NLP Preprocessing
export const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', "aren't",
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', "can't", 'cannot', 'could', "couldn't", 'did', "didn't", 'do', 'does', "doesn't", 'doing',
  "don't", 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', "hadn't", 'has', "hasn't",
  'have', "haven't", 'having', 'he', "he'd", "he'll", "he's", 'her', 'here', "here's", 'hers', 'herself',
  'him', 'himself', 'his', 'how', "how's", 'i', "i'd", "i'll", "i'm", "i've", 'if', 'in', 'into', 'is',
  "isn't", 'it', "it's", 'its', 'itself', 'let', "let's", 'me', 'more', 'most', "mustn't", 'my', 'myself',
  'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'ought', 'our', 'ours', 'ourselves',
  'out', 'over', 'own', 'same', "shan't", 'she', "she'd", "she'll", "she's", 'should', "shouldn't", 'so',
  'some', 'such', 'than', 'that', "that's", 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', "there's", 'these', 'they', "they'd", "they'll", "they're", "they've", 'this', 'those', 'through',
  'to', 'too', 'under', 'until', 'up', 'very', 'was', "wasn't", 'we', "we'd", "we'll", "we're", "we've",
  'were', "weren't", 'what', "what's", 'when', "when's", 'where', "where's", 'which', 'while', 'who',
  "who's", 'whom', 'why', "why's", 'with', "won't", 'would', "wouldn't", 'you', "you'd", "you'll",
  "you're", "you've", 'your', 'yours', 'yourself', 'yourselves'
]);

// Sentiment Lexicons
const POSITIVE_WORDS = new Set([
  'good', 'great', 'efficient', 'effective', 'scalable', 'optimal', 'robust', 'clean', 'benefit',
  'advantage', 'faster', 'reliable', 'correct', 'accurately', 'best', 'improved', 'successful',
  'flexible', 'organized', 'clearly', 'standard', 'ideal', 'strong', 'structured', 'safety', 'secure',
  'productive', 'streamlined', 'maintainable', 'elegantly', 'decoupled', 'proven'
]);

const NEGATIVE_WORDS = new Set([
  'bad', 'slow', 'leak', 'bug', 'crash', 'error', 'failure', 'blocking', 'overhead', 'expensive',
  'vulnerable', 'complex', 'bottleneck', 'race', 'inconsistent', 'corrupted', 'fail', 'flaw',
  'deprecated', 'cluttered', 'poor', 'danger', 'risk', 'problematic'
]);

/**
 * Step A: Text Preprocessing Pipeline
 */
export function cleanText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenize(text: string): string[] {
  const cleaned = cleanText(text);
  if (!cleaned) return [];
  return cleaned.split(/\s+/).filter(Boolean);
}

export function removeStopwords(tokens: string[]): {
  filteredTokens: string[];
  removedStopwords: string[];
} {
  const filteredTokens: string[] = [];
  const removedStopwords: string[] = [];

  for (const token of tokens) {
    if (STOPWORDS.has(token) || token.length <= 1) {
      removedStopwords.push(token);
    } else {
      filteredTokens.push(token);
    }
  }

  return { filteredTokens, removedStopwords };
}

export function preprocessText(text: string): {
  cleanedText: string;
  tokens: string[];
  filteredTokens: string[];
} {
  if (!text) return { cleanedText: '', tokens: [], filteredTokens: [] };

  const cleaned = cleanText(text);
  const tokens = tokenize(text);
  const { filteredTokens } = removeStopwords(tokens);

  return {
    cleanedText: cleaned,
    tokens,
    filteredTokens
  };
}

/**
 * Step B: Keyword Extraction
 * Identifies important technical keywords from the answer and matches against domain expectations.
 */
export function extractKeywords(
  input: string | string[],
  rawTextArg?: string,
  expectedKeywordsArg?: string[]
): {
  extractedKeywords: string[];
  matchedKeywords: string[];
  missingKeywords: string[];
} {
  let filteredTokens: string[] = [];
  let rawText = '';
  let expectedKeywords: string[] = expectedKeywordsArg || [];

  if (typeof input === 'string') {
    rawText = input;
    const pre = preprocessText(input);
    filteredTokens = pre.filteredTokens;
  } else {
    filteredTokens = input;
    rawText = rawTextArg || input.join(' ');
  }

  const tokenSet = new Set(filteredTokens);
  const rawLower = rawText.toLowerCase();

  // Matched expected keywords (including multi-word keywords like "hash table", "young generation")
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const kw of expectedKeywords) {
    const kwLower = kw.toLowerCase();
    if (kwLower.includes(' ')) {
      // multi-word term
      if (rawLower.includes(kwLower)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    } else {
      if (tokenSet.has(kwLower) || rawLower.includes(kwLower)) {
        matchedKeywords.push(kw);
      } else {
        missingKeywords.push(kw);
      }
    }
  }

  // Also collect non-stopword tokens that appear in user answer as candidate keywords
  // Filter out short numbers or generic verbs
  const userKeywords = Array.from(
    new Set(
      filteredTokens.filter((token) => {
        return (
          token.length >= 3 &&
          !/^\d+$/.test(token) &&
          !['also', 'used', 'make', 'like', 'know', 'using', 'done', 'need', 'well', 'give'].includes(token)
        );
      })
    )
  );

  // Merge matched expected with top candidate tokens
  const allExtracted = Array.from(new Set([...matchedKeywords, ...userKeywords]));

  return {
    extractedKeywords: allExtracted,
    matchedKeywords,
    missingKeywords
  };
}

/**
 * Step C: Semantic Relevance
 * Calculates TF-IDF vectors and Cosine Similarity between user answer and reference benchmark answer.
 */
export function computeCosineSimilarity(text1: string, text2: string): number {
  const { filteredTokens: tokens1 } = preprocessText(text1);
  const { filteredTokens: tokens2 } = preprocessText(text2);

  if (tokens1.length === 0 || tokens2.length === 0) return 0;

  // Build vocabulary
  const vocab = Array.from(new Set([...tokens1, ...tokens2]));

  // Term Frequency calculations
  const tf1: Record<string, number> = {};
  const tf2: Record<string, number> = {};

  tokens1.forEach((t) => (tf1[t] = (tf1[t] || 0) + 1));
  tokens2.forEach((t) => (tf2[t] = (tf2[t] || 0) + 1));

  // Compute dot product and magnitudes
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;

  for (const word of vocab) {
    const val1 = (tf1[word] || 0) / tokens1.length;
    const val2 = (tf2[word] || 0) / tokens2.length;

    dotProduct += val1 * val2;
    mag1 += val1 * val1;
    mag2 += val2 * val2;
  }

  if (mag1 === 0 || mag2 === 0) return 0;
  const similarity = dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
  return Math.min(Math.max(similarity, 0), 1);
}

/**
 * Step D: Sentiment & Tone Analysis
 */
export function analyzeSentiment(input: string[] | string): SentimentAnalysis {
  let tokens: string[] = [];
  if (typeof input === 'string') {
    tokens = tokenize(input);
  } else {
    tokens = input;
  }

  let posCount = 0;
  let negCount = 0;

  for (const token of tokens) {
    if (POSITIVE_WORDS.has(token)) posCount++;
    if (NEGATIVE_WORDS.has(token)) negCount++;
  }

  const rawScore = (posCount - negCount) / Math.max(1, posCount + negCount);

  let tone: 'Positive' | 'Neutral' | 'Negative' = 'Neutral';
  if (rawScore > 0.2) tone = 'Positive';
  else if (rawScore < -0.2) tone = 'Negative';

  const confidence = Math.min(0.95, 0.5 + Math.abs(rawScore) * 0.4 + (posCount + negCount) * 0.05);

  return {
    tone,
    score: Math.round(rawScore * 100) / 100,
    confidence: Math.round(confidence * 100) / 100,
    politeness: 'Polite'
  };
}

/**
 * Step E: Answer Quality, Semantic Relevance & Transparent Scoring System
 * Pipeline: User Answer -> Preprocessing -> Tokenization -> Keyword Extraction -> Semantic/Concept Relevance -> Correctness -> Score -> Feedback
 */

/**
 * Extracts core subject focus terms from the question itself,
 * filtering out generic question prompts.
 */
export function extractQuestionSubjectTerms(questionText: string): string[] {
  const genericQuestionWords = new Set([
    'what', 'is', 'the', 'key', 'difference', 'between', 'in', 'how', 'does', 'do',
    'work', 'internally', 'explain', 'can', 'you', 'why', 'use', 'used', 'using',
    'which', 'when', 'where', 'and', 'or', 'a', 'an', 'of', 'for', 'with', 'by',
    'describe', 'define', 'meaning', 'tell', 'me', 'about', 'python', 'java', 'role',
    'handling', 'overview', 'simple', 'terms'
  ]);
  const tokens = tokenize(questionText);
  const subjects: string[] = [];
  for (const t of tokens) {
    if (!genericQuestionWords.has(t) && t.length >= 3) {
      subjects.push(t);
    }
  }
  return subjects;
}

// ============================================================================
// HR / COMMUNICATION NLP EVALUATION PIPELINE
// ============================================================================

// Professional workplace communication vocabulary
const PROFESSIONAL_COMMUNICATION_WORDS = new Set([
  'collaborate', 'collaboration', 'collaborated', 'collaborative',
  'communicate', 'communication', 'communicated',
  'responsibility', 'responsible', 'initiative', 'ownership',
  'deliver', 'delivered', 'delivery', 'outcome', 'outcomes',
  'priority', 'priorities', 'prioritize', 'prioritized', 'prioritization',
  'objective', 'objectives', 'impact', 'stakeholder', 'stakeholders',
  'adapt', 'adaptable', 'adaptability', 'resilience', 'resilient',
  'solution', 'solutions', 'feedback', 'improve', 'improvement',
  'transparent', 'transparency', 'mentor', 'mentored', 'mentorship',
  'consensus', 'alignment', 'empathy', 'benchmark', 'benchmarks',
  'milestone', 'milestones', 'framework', 'methodology', 'analytical',
  'compromise', 'systematic', 'proactive', 'pragmatic', 'efficiency'
]);

// Structural framing phrases for communication responses
const INTRO_PATTERNS = [
  /\b(i am|my background|in my experience|throughout my|to answer|when it comes to|regarding|in terms of|first and foremost|as a)\b/i,
  /\b(i believe|in my role|over the past|my journey)\b/i
];

const BODY_EXAMPLE_PATTERNS = [
  /\b(for example|specifically|for instance|in particular|as an example|such as|in my previous role|on a recent project|when we faced|in one project)\b/i,
  /\b(at my last|during my time|we implemented|i spearheaded|we noticed)\b/i
];

const STAR_INDICATORS = [
  /\b(situation|context|task|responsibility|action|actions|decision|steps?|result|outcome|impact|metric|improved by|reduced by|solved)\b/i
];

const CONCLUSION_PATTERNS = [
  /\b(in summary|overall|ultimately|in conclusion|looking forward|this helped me|this taught me|as a result|moving forward|this experience taught)\b/i,
  /\b(to conclude|that is why|which shaped my|key takeaway)\b/i
];

export function splitSentences(text: string): string[] {
  if (!text) return [];
  // Split on periods, exclamation marks, question marks followed by space or end
  return text
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export function detectGrammarIssues(rawText: string): {
  grammarScore: number;
  observations: string[];
} {
  const observations: string[] = [];
  let deductions = 0;

  if (!rawText || rawText.trim().length === 0) {
    return {
      grammarScore: 40,
      observations: ['No text provided to evaluate.']
    };
  }

  const sentences = splitSentences(rawText);

  // 1. Sentence Capitalization
  let uncapitalizedSentences = 0;
  for (const s of sentences) {
    const firstChar = s.replace(/^["'(\s]+/, '').charAt(0);
    if (firstChar && firstChar === firstChar.toLowerCase() && /[a-z]/.test(firstChar)) {
      uncapitalizedSentences++;
    }
  }
  if (uncapitalizedSentences > 0) {
    deductions += Math.min(15, uncapitalizedSentences * 5);
    observations.push(
      `${uncapitalizedSentences} sentence${uncapitalizedSentences > 1 ? 's do' : ' does'} not begin with a capital letter.`
    );
  }

  // 2. Subject-Verb Agreement / Common Syntax Patterns
  const subjectVerbErrors = [
    { pattern: /\bi is\b/i, msg: 'Subject-verb mismatch ("I is" -> use "I am")' },
    { pattern: /\bthey was\b/i, msg: 'Subject-verb mismatch ("they was" -> use "they were")' },
    { pattern: /\bwe was\b/i, msg: 'Subject-verb mismatch ("we was" -> use "we were")' },
    { pattern: /\bhe have\b/i, msg: 'Subject-verb mismatch ("he have" -> use "he has")' },
    { pattern: /\bshe have\b/i, msg: 'Subject-verb mismatch ("she have" -> use "she has")' },
    { pattern: /\bit have\b/i, msg: 'Subject-verb mismatch ("it have" -> use "it has")' },
    { pattern: /\bhe do\b/i, msg: 'Subject-verb mismatch ("he do" -> use "he does")' },
    { pattern: /\bwe does\b/i, msg: 'Subject-verb mismatch ("we does" -> use "we do")' },
    { pattern: /\bthey does\b/i, msg: 'Subject-verb mismatch ("they does" -> use "they do")' },
    { pattern: /\byou is\b/i, msg: 'Subject-verb mismatch ("you is" -> use "you are")' }
  ];

  for (const err of subjectVerbErrors) {
    if (err.pattern.test(rawText)) {
      deductions += 10;
      observations.push(err.msg);
    }
  }

  // 3. Double Negatives
  const doubleNegativePatterns = [
    { pattern: /\bdon't have no\b/i, msg: 'Double negative detected ("don\'t have no" -> use "do not have any")' },
    { pattern: /\bcan't do nothing\b/i, msg: 'Double negative detected ("can\'t do nothing" -> use "cannot do anything")' },
    { pattern: /\bnot got no\b/i, msg: 'Double negative detected ("not got no" -> use "do not have any")' },
    { pattern: /\bhardly never\b/i, msg: 'Double negative detected ("hardly never" -> use "hardly ever")' }
  ];

  for (const dn of doubleNegativePatterns) {
    if (dn.pattern.test(rawText)) {
      deductions += 10;
      observations.push(dn.msg);
    }
  }

  // 4. Repeated Punctuation (e.g. ??, !!, ,,)
  if (/([?!,;])\1{1,}/.test(rawText)) {
    deductions += 6;
    observations.push('Contains redundant repeated punctuation marks (e.g., "??" or "!!").');
  }

  // 5. Punctuation Spacing (e.g. "word,word" instead of "word, word")
  if (/[a-zA-Z],[a-zA-Z]/.test(rawText)) {
    deductions += 5;
    observations.push('Missing space following punctuation comma.');
  }

  // 6. Sentence Run-on Check (sentences longer than 45 words without punctuation break)
  let runOnCount = 0;
  for (const s of sentences) {
    const wordCount = s.split(/\s+/).filter(Boolean).length;
    if (wordCount > 45 && !s.includes(',') && !s.includes(';') && !s.includes('—')) {
      runOnCount++;
    }
  }
  if (runOnCount > 0) {
    deductions += 8;
    observations.push('Detected run-on sentence structure; consider adding conjunctions or commas.');
  }

  // 7. Missing Terminal Punctuation
  const trimmed = rawText.trim();
  if (trimmed.length > 15 && !/[.?!]$/.test(trimmed)) {
    deductions += 5;
    observations.push('Response ends without concluding punctuation mark (. or ?).');
  }

  if (observations.length === 0) {
    observations.push('Clean grammar: Proper capitalization, subject-verb agreement, and terminal punctuation observed.');
  }

  const grammarScore = Math.max(35, Math.min(100, 100 - deductions));
  return { grammarScore, observations };
}

export function detectStructure(
  rawText: string,
  sentences: string[]
): {
  structureScore: number;
  structureNotes: string;
  hasIntro: boolean;
  hasBody: boolean;
  hasConclusion: boolean;
  hasStar: boolean;
} {
  const hasIntro = INTRO_PATTERNS.some((p) => p.test(rawText));
  const hasBody = BODY_EXAMPLE_PATTERNS.some((p) => p.test(rawText));
  const hasStar = STAR_INDICATORS.some((p) => p.test(rawText));
  const hasConclusion = CONCLUSION_PATTERNS.some((p) => p.test(rawText));

  let score = 55; // baseline

  if (sentences.length >= 2) score += 10;
  if (sentences.length >= 3) score += 5;
  if (hasIntro) score += 10;
  if (hasBody) score += 10;
  if (hasStar) score += 5;
  if (hasConclusion) score += 10;

  // Penalty if single unformatted sentence under 15 words
  const words = rawText.split(/\s+/).filter(Boolean);
  if (sentences.length <= 1 && words.length < 20) {
    score = Math.min(score, 50);
  }

  const notesParts: string[] = [];
  if (hasIntro) notesParts.push('Opening introduction/framing present');
  if (hasBody || hasStar) notesParts.push('Concrete body elaboration with experiential context');
  if (hasConclusion) notesParts.push('Concluding summary or key takeaway provided');

  let structureNotes = '';
  if (notesParts.length > 0) {
    structureNotes = notesParts.join('; ') + '.';
  } else {
    structureNotes = 'Consider organizing answers into Introduction, Concrete Example (STAR), and Conclusion.';
  }

  return {
    structureScore: Math.min(100, Math.max(35, score)),
    structureNotes,
    hasIntro,
    hasBody,
    hasConclusion,
    hasStar
  };
}

export function detectRepetition(
  filteredTokens: string[]
): {
  repeatedWords: { word: string; count: number }[];
  repetitionPenalty: number;
} {
  const freq: Record<string, number> = {};
  for (const t of filteredTokens) {
    if (t.length > 2 && !STOPWORDS.has(t)) {
      freq[t] = (freq[t] || 0) + 1;
    }
  }

  const repeatedWords: { word: string; count: number }[] = [];
  let excessiveRepeats = 0;

  for (const [w, count] of Object.entries(freq)) {
    if (count >= 3) {
      repeatedWords.push({ word: w, count });
      if (count >= 4) excessiveRepeats += count - 3;
    }
  }

  repeatedWords.sort((a, b) => b.count - a.count);
  const repetitionPenalty = Math.min(20, excessiveRepeats * 4);

  return { repeatedWords, repetitionPenalty };
}

/**
 * Dedicated HR / Communication Answer Evaluator
 * Evaluates linguistic characteristics, relevance, grammar, structure, clarity, and completeness.
 * Strictly adheres to safe academic language analysis boundaries (no personality or psychological inferences).
 */
export function evaluateHRAnswer(rawText: string, question: Question): NLPAnalysisResult {
  const { cleanedText, tokens, filteredTokens } = preprocessText(rawText);
  const sentences = splitSentences(rawText);
  const wordCount = tokens.length;
  const sentenceCount = sentences.length;

  // 1. Semantic Relevance Analysis
  const rawCosine = computeCosineSimilarity(rawText, question.benchmarkAnswer);
  const subjectTerms = extractQuestionSubjectTerms(question.question);
  const lowerAnswer = rawText.toLowerCase();

  let subjectMatchesCount = 0;
  for (const st of subjectTerms) {
    const singular = st.endsWith('s') ? st.slice(0, -1) : st;
    if (lowerAnswer.includes(singular)) {
      subjectMatchesCount++;
    }
  }
  const subjectCoverageRatio = subjectTerms.length > 0 ? subjectMatchesCount / subjectTerms.length : 0.5;

  // Key phrase and keyword matching
  const { extractedKeywords, matchedKeywords } = extractKeywords(
    filteredTokens,
    rawText,
    question.expectedKeywords
  );

  // Detect professional communication keywords
  const detectedKeyPhrases: string[] = [];
  for (const token of filteredTokens) {
    if (PROFESSIONAL_COMMUNICATION_WORDS.has(token) && !detectedKeyPhrases.includes(token)) {
      detectedKeyPhrases.push(token);
    }
  }
  for (const mk of matchedKeywords) {
    if (!detectedKeyPhrases.includes(mk)) {
      detectedKeyPhrases.push(mk);
    }
  }

  // Off-topic detection
  const isOffTopic =
    (wordCount > 6 && subjectMatchesCount === 0 && matchedKeywords.length === 0 && rawCosine < 0.18) ||
    (wordCount < 4);

  // 2. Grammar Analysis
  const { grammarScore, observations: grammarObservations } = detectGrammarIssues(rawText);

  // 3. Structure Analysis
  const { structureScore, structureNotes, hasBody, hasConclusion, hasIntro } = detectStructure(
    rawText,
    sentences
  );

  // 4. Conciseness and Repetition Analysis
  const { repeatedWords, repetitionPenalty } = detectRepetition(filteredTokens);

  // 5. Clarity Analysis
  // Optimal sentence length: 12-25 words per sentence
  const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : wordCount;
  let clarityScore = 80;
  if (avgSentenceLength >= 10 && avgSentenceLength <= 26) {
    clarityScore = 92;
  } else if (avgSentenceLength > 35) {
    clarityScore = Math.max(55, 80 - Math.round((avgSentenceLength - 35) * 1.5));
  } else if (avgSentenceLength < 6 && wordCount > 10) {
    clarityScore = 75;
  }
  // Penalize for excessive repetition
  clarityScore = Math.max(40, clarityScore - repetitionPenalty);

  // 6. Completeness Analysis
  let completenessScore = 50;
  if (wordCount < 15) {
    completenessScore = Math.min(50, Math.max(25, wordCount * 3));
  } else if (wordCount < 30) {
    completenessScore = Math.round(55 + (wordCount - 15) * 1.2);
  } else if (wordCount <= 160) {
    completenessScore = Math.round(80 + Math.min(18, (wordCount - 30) * 0.15));
  } else if (wordCount <= 250) {
    completenessScore = 92;
  } else {
    // Slightly verbose
    completenessScore = 86;
  }

  // 7. Relevance Score
  let relevanceScore = 0;
  if (isOffTopic) {
    relevanceScore = Math.min(30, Math.max(10, Math.round(rawCosine * 50 + subjectCoverageRatio * 15)));
  } else {
    relevanceScore = Math.min(
      98,
      Math.max(
        60,
        Math.round(50 + rawCosine * 30 + subjectCoverageRatio * 15 + Math.min(10, matchedKeywords.length * 2))
      )
    );
  }

  // -------------------------------------------------------------
  // DEDICATED HR SCORING FORMULA
  // Relevance: 25%, Clarity: 25%, Grammar: 15%, Structure: 20%, Completeness: 15%
  // -------------------------------------------------------------
  const overallCommunicationScore = Math.min(
    100,
    Math.max(
      15,
      Math.round(
        relevanceScore * 0.25 +
        clarityScore * 0.25 +
        grammarScore * 0.15 +
        structureScore * 0.20 +
        completenessScore * 0.15
      )
    )
  );

  // Classification: Strong (>= 80), Good (>= 65), Needs Improvement (>= 45), Not Relevant (< 45 or relevance < 40)
  let communicationClassification: 'Strong' | 'Good' | 'Needs Improvement' | 'Not Relevant';
  if (isOffTopic || relevanceScore < 40 || overallCommunicationScore < 45) {
    communicationClassification = 'Not Relevant';
  } else if (overallCommunicationScore >= 80) {
    communicationClassification = 'Strong';
  } else if (overallCommunicationScore >= 65) {
    communicationClassification = 'Good';
  } else {
    communicationClassification = 'Needs Improvement';
  }

  // Feedback Generation (concise, actionable feedback)
  let feedback = '';
  if (communicationClassification === 'Not Relevant') {
    feedback = `Your answer does not directly address the question "${question.question}". Focus on sharing relevant experience or concrete examples related to the prompt.`;
  } else if (communicationClassification === 'Strong') {
    feedback = 'Your answer directly addresses the question and is clearly expressed. You demonstrated solid structure with balanced clarity and relevant professional terminology.';
  } else if (communicationClassification === 'Good') {
    if (!hasBody) {
      feedback = 'Your answer is clear and relevant. You could elevate your response by providing a specific real-world example using the STAR approach.';
    } else if (grammarScore < 75) {
      feedback = 'Good response content and structure. Pay close attention to sentence capitalization and punctuation to sharpen your professional presentation.';
    } else {
      feedback = 'Well-articulated response. To make it even stronger, consider adding a brief concluding sentence that summarizes your key learning or takeaway.';
    }
  } else {
    // Needs Improvement
    if (wordCount < 25) {
      feedback = 'Your response is too brief. Elaborate further by detailing your thought process, actions taken, and the resulting outcome.';
    } else if (structureScore < 60) {
      feedback = 'Work on structuring your answer: start with a clear opening statement, elaborate with a concrete example, and close with a brief takeaway.';
    } else {
      feedback = 'Review your response for clarity and ensure your key points directly answer the interviewer prompt.';
    }
  }

  // Strengths and Improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (relevanceScore >= 80) strengths.push('Directly addressed the behavioral prompt with high relevance.');
  if (clarityScore >= 85) strengths.push('Expressive and easy-to-read phrasing with well-balanced sentence lengths.');
  if (grammarScore >= 90) strengths.push('Excellent grammatical precision and proper sentence mechanics.');
  if (structureScore >= 80) strengths.push('Well-structured narrative flow with clear introduction and experiential context.');
  if (detectedKeyPhrases.length >= 2) strengths.push(`Effectively integrated professional vocabulary: ${detectedKeyPhrases.slice(0, 3).join(', ')}.`);
  if (strengths.length === 0) strengths.push('Attempted the question with initial conversational awareness.');

  if (isOffTopic) {
    improvements.push(`Align your response with the prompt: "${question.question}".`);
  }
  if (wordCount < 30) {
    improvements.push('Expand response length to 50–150 words to provide sufficient context and depth.');
  }
  if (!hasBody) {
    improvements.push('Incorporate the STAR framework: Situation, Task, Action, and Result.');
  }
  if (!hasConclusion) {
    improvements.push('Add a concise concluding statement to tie your example back to the role.');
  }
  if (grammarObservations.length > 0 && grammarScore < 85) {
    improvements.push(grammarObservations[0]);
  }
  if (repeatedWords.length > 0 && repeatedWords[0].count >= 4) {
    improvements.push(`Vary vocabulary; the word "${repeatedWords[0].word}" was repeated ${repeatedWords[0].count} times.`);
  }

  const scores: AnswerScores = {
    relevanceScore,
    technicalScore: 0,
    clarityScore,
    completenessScore,
    grammarScore,
    structureScore,
    overallScore: overallCommunicationScore
  };

  const scoringFormulaExplanation = `HR Communication Score (${overallCommunicationScore}%) = 25% Relevance (${relevanceScore}%) + 25% Clarity (${clarityScore}%) + 15% Grammar (${grammarScore}%) + 20% Structure (${structureScore}%) + 15% Completeness (${completenessScore}%)`;

  let relevanceCategory: 'Highly Relevant' | 'Relevant' | 'Partially Relevant' | 'Not Relevant' = 'Relevant';
  if (relevanceScore >= 85) relevanceCategory = 'Highly Relevant';
  else if (relevanceScore >= 65) relevanceCategory = 'Relevant';
  else if (relevanceScore >= 45) relevanceCategory = 'Partially Relevant';
  else relevanceCategory = 'Not Relevant';

  let correctness: 'Correct' | 'Mostly Correct' | 'Partially Correct' | 'Incorrect / Not Relevant' = 'Mostly Correct';
  if (communicationClassification === 'Strong') correctness = 'Correct';
  else if (communicationClassification === 'Good') correctness = 'Mostly Correct';
  else if (communicationClassification === 'Needs Improvement') correctness = 'Partially Correct';
  else correctness = 'Incorrect / Not Relevant';

  const sentiment = analyzeSentiment(filteredTokens);

  return {
    rawText,
    cleanedText,
    tokens,
    filteredTokens,
    extractedKeywords,
    matchedExpectedKeywords: matchedKeywords,
    missingKeywords: [],
    semanticSimilarity: Math.round(rawCosine * 100) / 100,
    relevanceCategory,
    correctness,
    communicationClassification,
    feedback,
    sentiment,
    scores,
    strengths,
    improvements,
    scoringFormulaExplanation,
    tokenCount: tokens.length,
    stopwordCount: tokens.length - filteredTokens.length,
    isHrQuestion: true,
    grammarObservations,
    detectedKeyPhrases,
    sentenceCount,
    wordCount,
    repeatedWords,
    vocabularyAssessment: `${detectedKeyPhrases.length} professional vocabulary term${detectedKeyPhrases.length === 1 ? '' : 's'} identified`,
    structureNotes
  };
}

/**
 * Evaluates semantic concept relevance against expected concepts and question benchmarks.
 * Dispatches to specialized HR engine when question.type === 'HR'.
 */
export function evaluateAnswer(rawText: string, question: Question): NLPAnalysisResult {
  if (question.type === 'HR') {
    return evaluateHRAnswer(rawText, question);
  }

  const { cleanedText, tokens, filteredTokens } = preprocessText(rawText);

  const { extractedKeywords, matchedKeywords, missingKeywords } = extractKeywords(
    filteredTokens,
    rawText,
    question.expectedKeywords
  );

  const rawCosine = computeCosineSimilarity(rawText, question.benchmarkAnswer);
  const lowerAnswer = rawText.toLowerCase();

  // 1. Identify Question Focus Subjects
  const subjectTerms = extractQuestionSubjectTerms(question.question);
  let subjectMatchesCount = 0;
  for (const st of subjectTerms) {
    // Check direct word, plural forms (e.g. list/lists, tuple/tuples, dict/dictionaries)
    const singular = st.endsWith('s') ? st.slice(0, -1) : st;
    const plural = singular + 's';
    if (lowerAnswer.includes(singular) || lowerAnswer.includes(plural)) {
      subjectMatchesCount++;
    }
  }

  const subjectCoverageRatio = subjectTerms.length > 0 ? subjectMatchesCount / subjectTerms.length : 0.5;

  // 2. Semantic Concept Matching
  // Check expected concepts with domain synonym expansions
  const matchedConcepts: string[] = [];
  const missingConcepts: string[] = [];

  // Mutability concept detection helpers
  const mentionsList = lowerAnswer.includes('list') || lowerAnswer.includes('lists');
  const mentionsTuple = lowerAnswer.includes('tuple') || lowerAnswer.includes('tuples');
  const mentionsFormalMutable = lowerAnswer.includes('mutable') && !lowerAnswer.includes('immutable');
  const mentionsFormalImmutable = lowerAnswer.includes('immutable');
  const mentionsBothFormal = lowerAnswer.includes('mutable') && lowerAnswer.includes('immutable');

  const mentionsColloquialChange =
    (lowerAnswer.includes('can be changed') ||
      lowerAnswer.includes('can change') ||
      lowerAnswer.includes('can be modified') ||
      lowerAnswer.includes('modifiable') ||
      lowerAnswer.includes('changeable')) &&
    (lowerAnswer.includes('cannot be changed') ||
      lowerAnswer.includes('cannot change') ||
      lowerAnswer.includes('cannot be modified') ||
      lowerAnswer.includes('tuples cannot') ||
      lowerAnswer.includes('immutable') ||
      lowerAnswer.includes('fixed'));

  // Dictionary / Hash table concept detection helpers
  const mentionsDictLookup =
    (lowerAnswer.includes('dictionary') || lowerAnswer.includes('dict')) &&
    (lowerAnswer.includes('key') || lowerAnswer.includes('hash') || lowerAnswer.includes('o(1)') || lowerAnswer.includes('constant time'));

  for (const concept of question.expectedConcepts) {
    const conceptLower = concept.toLowerCase();
    let isCovered = false;

    // Mutability concept check
    if (conceptLower.includes('mutable') && conceptLower.includes('immutable')) {
      if ((mentionsList && mentionsTuple && (mentionsBothFormal || mentionsColloquialChange)) ||
          mentionsBothFormal) {
        isCovered = true;
      }
    }
    // Hash table / internal dictionary lookup check
    else if (conceptLower.includes('hash') || conceptLower.includes('key-value') || conceptLower.includes('o(1)')) {
      if (mentionsDictLookup ||
          (lowerAnswer.includes('hash table') || lowerAnswer.includes('hashmap') || lowerAnswer.includes('key-value') || lowerAnswer.includes('o(1)'))) {
        isCovered = true;
      }
    }
    // General concept word-overlap check
    else {
      const conceptTokens = conceptLower.split(/\s+/).filter((t) => !STOPWORDS.has(t) && t.length >= 3);
      const overlap = conceptTokens.filter((ct) => cleanedText.includes(ct));
      if (overlap.length >= 2 || (conceptTokens.length === 1 && overlap.length === 1)) {
        isCovered = true;
      }
    }

    if (isCovered) {
      matchedConcepts.push(concept);
    } else {
      missingConcepts.push(concept);
    }
  }

  const primaryConcept = question.expectedConcepts[0] || 'Core technical concept';
  const primaryConceptCovered = matchedConcepts.includes(primaryConcept) ||
    (primaryConcept.toLowerCase().includes('mutable') && (mentionsBothFormal || (mentionsList && mentionsTuple && mentionsColloquialChange)));

  // Calculate concept coverage ratio
  const conceptCoverageRatio =
    question.expectedConcepts.length > 0 ? matchedConcepts.length / question.expectedConcepts.length : 0.5;

  // Keyword match ratio
  const keywordRatio =
    question.expectedKeywords.length > 0 ? matchedKeywords.length / question.expectedKeywords.length : 0.5;

  // Off-topic guard:
  // If the candidate mentions zero subject terms, zero expected keywords, and matches zero concepts,
  // the answer is completely off-topic (e.g. "Python was developed by Google" for list vs tuple).
  const isOffTopic =
    (subjectTerms.length > 0 && subjectMatchesCount === 0 && matchedKeywords.length === 0 && !primaryConceptCovered) ||
    (rawCosine < 0.15 && matchedKeywords.length === 0 && !primaryConceptCovered);

  // -------------------------------------------------------------
  // ACADEMIC SCORING FORMULA
  // Overall = 35% Relevance + 30% Technical Accuracy + 20% Completeness + 15% Clarity
  // -------------------------------------------------------------

  let relevanceScore = 0;
  let technicalScore = 0;
  let completenessScore = 0;
  let clarityScore = 0;

  if (isOffTopic) {
    // Punish off-topic answers strictly as mandated by prompt guidelines
    relevanceScore = Math.max(10, Math.min(22, Math.round(rawCosine * 50 + 10)));
    technicalScore = Math.max(10, Math.min(18, Math.round(keywordRatio * 20 + 10)));
    completenessScore = Math.max(8, Math.min(15, Math.round(conceptCoverageRatio * 20 + 8)));
    clarityScore = Math.min(80, Math.max(30, tokens.length >= 5 ? 70 : 40));
  } else if (primaryConceptCovered && mentionsBothFormal) {
    // Case 1: Ideal formal answer (e.g. "Lists are mutable while tuples are immutable.")
    // Concise, highly accurate, direct answer to the prompt's key difference
    relevanceScore = Math.min(96, Math.max(90, Math.round(92 + (matchedConcepts.length - 1) * 2)));
    technicalScore = Math.min(95, Math.max(88, Math.round(90 + matchedKeywords.length * 2)));
    completenessScore = Math.min(95, Math.max(85, Math.round(85 + (conceptCoverageRatio > 0.5 ? 10 : 0))));
    clarityScore = 95;
  } else if (primaryConceptCovered && mentionsColloquialChange && !mentionsBothFormal) {
    // Case 3: Colloquial answer (e.g. "Lists can be changed, but tuples cannot.")
    // Captured meaning, but informal vocabulary
    relevanceScore = Math.min(88, Math.max(80, Math.round(82 + subjectCoverageRatio * 6)));
    technicalScore = Math.min(78, Math.max(70, Math.round(72 + keywordRatio * 6)));
    completenessScore = Math.min(82, Math.max(74, Math.round(76 + conceptCoverageRatio * 6)));
    clarityScore = 88;
  } else if (primaryConceptCovered || conceptCoverageRatio >= 0.5) {
    // Good technical coverage
    relevanceScore = Math.min(92, Math.max(75, Math.round(70 + rawCosine * 20 + subjectCoverageRatio * 15)));
    technicalScore = Math.min(90, Math.max(68, Math.round(65 + keywordRatio * 25)));
    completenessScore = Math.min(90, Math.max(70, Math.round(65 + conceptCoverageRatio * 25)));
    clarityScore = 85;
  } else if (matchedKeywords.length >= 1 || subjectMatchesCount >= 1 || conceptCoverageRatio > 0) {
    // Partially correct: addressed some elements but incomplete or missing key distinction
    relevanceScore = Math.min(68, Math.max(45, Math.round(40 + rawCosine * 25 + subjectCoverageRatio * 15)));
    technicalScore = Math.min(65, Math.max(40, Math.round(40 + keywordRatio * 25)));
    completenessScore = Math.min(60, Math.max(35, Math.round(30 + conceptCoverageRatio * 30)));
    clarityScore = 80;
  } else {
    // Weak / minimal response
    relevanceScore = Math.min(35, Math.max(15, Math.round(rawCosine * 40 + 15)));
    technicalScore = Math.min(30, Math.max(15, Math.round(keywordRatio * 20 + 15)));
    completenessScore = Math.min(30, Math.max(15, Math.round(conceptCoverageRatio * 25 + 10)));
    clarityScore = 70;
  }

  // Calculate Overall Weighted Score
  const overallScore = Math.min(
    100,
    Math.max(
      10,
      Math.round(
        relevanceScore * 0.35 +
        technicalScore * 0.30 +
        completenessScore * 0.20 +
        clarityScore * 0.15
      )
    )
  );

  // Determine Answer Correctness Category
  let correctness: 'Correct' | 'Mostly Correct' | 'Partially Correct' | 'Incorrect / Not Relevant';

  if (isOffTopic || overallScore < 40) {
    correctness = 'Incorrect / Not Relevant';
  } else if (overallScore >= 85 && primaryConceptCovered && technicalScore >= 80) {
    correctness = 'Correct';
  } else if (overallScore >= 70 && primaryConceptCovered) {
    correctness = 'Mostly Correct';
  } else if (overallScore >= 45 || matchedKeywords.length >= 1 || conceptCoverageRatio > 0) {
    correctness = 'Partially Correct';
  } else {
    correctness = 'Incorrect / Not Relevant';
  }

  // Determine Semantic Relevance Category
  let relevanceCategory: 'Highly Relevant' | 'Relevant' | 'Partially Relevant' | 'Not Relevant';
  if (relevanceScore >= 80) relevanceCategory = 'Highly Relevant';
  else if (relevanceScore >= 60) relevanceCategory = 'Relevant';
  else if (relevanceScore >= 40) relevanceCategory = 'Partially Relevant';
  else relevanceCategory = 'Not Relevant';

  // Generate Specific Actionable Feedback
  let feedback = '';
  let expectedConceptHighlight = primaryConcept;

  if (correctness === 'Correct') {
    if (primaryConcept.toLowerCase().includes('mutable')) {
      feedback = 'Excellent explanation. You accurately addressed the core distinction (mutability) between lists and tuples with precise technical accuracy.';
    } else {
      feedback = `Excellent response. You accurately explained the core concept (${primaryConcept}) with sound technical depth.`;
    }
  } else if (correctness === 'Mostly Correct') {
    if (mentionsColloquialChange && !mentionsBothFormal) {
      feedback = 'Good understanding of mutability. You could improve the answer by explicitly explaining that lists and tuples are different sequence types and using formal technical terms ("mutable" and "immutable").';
    } else {
      feedback = `Solid answer covering the main concept. You could elevate your response by providing formal technical terminology and covering secondary details like internal memory or syntax.`;
    }
  } else if (correctness === 'Partially Correct') {
    if (mentionsList && !mentionsTuple) {
      feedback = 'Partially correct. You explained lists, but did not contrast them with tuples. Expected comparison: ' + primaryConcept + '.';
    } else if (mentionsTuple && !mentionsList) {
      feedback = 'Partially correct. You addressed tuples, but did not contrast them with lists. Expected comparison: ' + primaryConcept + '.';
    } else {
      feedback = `Partially correct. You touched on the topic, but missed critical aspects. Key expected concept: ${primaryConcept}.`;
    }
  } else {
    // Incorrect / Not Relevant
    const subjectLabel = subjectTerms.length > 0 ? subjectTerms.join(' and ') : 'the question';
    feedback = `Your answer does not address the required topic (${subjectLabel}). Expected concept: "${primaryConcept}".`;
  }

  const scores: AnswerScores = {
    relevanceScore,
    technicalScore,
    completenessScore,
    clarityScore,
    overallScore
  };

  const sentiment = analyzeSentiment(filteredTokens);

  // Dynamic strengths & improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (relevanceScore >= 80) {
    strengths.push('Directly addressed the core interview prompt with high topical alignment.');
  }
  if (technicalScore >= 80) {
    strengths.push(`Accurately integrated domain-specific technical terminology.`);
  }
  if (completenessScore >= 80) {
    strengths.push('Provided a comprehensive answer covering essential expected concepts.');
  }
  if (clarityScore >= 85) {
    strengths.push('Articulated response clearly with concise language and logical structure.');
  }
  if (strengths.length === 0) {
    strengths.push('Attempted the interview prompt; initial familiarity with general domain context.');
  }

  if (isOffTopic) {
    improvements.push(`Focus directly on the question topic: "${question.question.slice(0, 70)}...".`);
    improvements.push(`Explain the expected concept: "${primaryConcept}".`);
  } else {
    if (missingKeywords.length > 0) {
      improvements.push(`Include missing technical keywords: ${missingKeywords.slice(0, 3).join(', ')}.`);
    }
    if (missingConcepts.length > 0) {
      improvements.push(`Expand on concept: ${missingConcepts[0]}.`);
    }
    if (technicalScore < 75) {
      improvements.push('Use precise industry-standard terminology rather than colloquial language.');
    }
  }

  const scoringFormulaExplanation = `Overall Score (${overallScore}%) = 35% Relevance (${relevanceScore}%) + 30% Technical Accuracy (${technicalScore}%) + 20% Completeness (${completenessScore}%) + 15% Clarity (${clarityScore}%)`;

  return {
    rawText,
    cleanedText,
    tokens,
    filteredTokens,
    extractedKeywords,
    matchedExpectedKeywords: matchedKeywords,
    missingKeywords,
    semanticSimilarity: Math.round(rawCosine * 100) / 100,
    relevanceCategory,
    correctness,
    feedback,
    expectedConceptHighlight,
    sentiment,
    scores,
    strengths,
    improvements,
    scoringFormulaExplanation,
    tokenCount: tokens.length,
    stopwordCount: tokens.length - filteredTokens.length
  };
}

/**
 * Computes Final Interview Aggregates across all answered questions.
 * Handles pure Technical, pure HR, and alternating Mixed interview sessions.
 */
export function generateFinalReportData(
  evaluations: NLPAnalysisResult[],
  questions: Question[]
) {
  if (evaluations.length === 0) {
    return {
      overallScore: 0,
      technicalScore: 0,
      relevanceScore: 0,
      completenessScore: 0,
      clarityScore: 0,
      strengths: ['No answers were recorded.'],
      weaknesses: ['Interview terminated before completion.'],
      aiFeedback: 'Please complete an interview session to generate diagnostic analytics.',
      studyTopics: [],
      recommendations: [],
      questionEvaluations: []
    };
  }

  const hrEvals = evaluations.filter((e, idx) => e.isHrQuestion || questions[idx]?.type === 'HR');
  const techEvals = evaluations.filter((e, idx) => !e.isHrQuestion && questions[idx]?.type !== 'HR');

  const isHrOnly = hrEvals.length > 0 && techEvals.length === 0;
  const isMixed = hrEvals.length > 0 && techEvals.length > 0;

  // Technical aggregates
  const avgTechRelevance = techEvals.length > 0
    ? Math.round(techEvals.reduce((sum, e) => sum + e.scores.relevanceScore, 0) / techEvals.length)
    : 0;
  const avgTechAccuracy = techEvals.length > 0
    ? Math.round(techEvals.reduce((sum, e) => sum + e.scores.technicalScore, 0) / techEvals.length)
    : 0;
  const avgTechCompleteness = techEvals.length > 0
    ? Math.round(techEvals.reduce((sum, e) => sum + e.scores.completenessScore, 0) / techEvals.length)
    : 0;
  const avgTechClarity = techEvals.length > 0
    ? Math.round(techEvals.reduce((sum, e) => sum + e.scores.clarityScore, 0) / techEvals.length)
    : 0;
  const techOverallScore = techEvals.length > 0
    ? Math.round(avgTechRelevance * 0.35 + avgTechAccuracy * 0.30 + avgTechCompleteness * 0.20 + avgTechClarity * 0.15)
    : 0;

  // HR / Communication aggregates
  const avgHrRelevance = hrEvals.length > 0
    ? Math.round(hrEvals.reduce((sum, e) => sum + e.scores.relevanceScore, 0) / hrEvals.length)
    : 0;
  const avgHrClarity = hrEvals.length > 0
    ? Math.round(hrEvals.reduce((sum, e) => sum + e.scores.clarityScore, 0) / hrEvals.length)
    : 0;
  const avgHrGrammar = hrEvals.length > 0
    ? Math.round(hrEvals.reduce((sum, e) => sum + (e.scores.grammarScore ?? 85), 0) / hrEvals.length)
    : 0;
  const avgHrStructure = hrEvals.length > 0
    ? Math.round(hrEvals.reduce((sum, e) => sum + (e.scores.structureScore ?? 80), 0) / hrEvals.length)
    : 0;
  const avgHrCompleteness = hrEvals.length > 0
    ? Math.round(hrEvals.reduce((sum, e) => sum + e.scores.completenessScore, 0) / hrEvals.length)
    : 0;
  const hrOverallScore = hrEvals.length > 0
    ? Math.round(
        avgHrRelevance * 0.25 +
        avgHrClarity * 0.25 +
        avgHrGrammar * 0.15 +
        avgHrStructure * 0.20 +
        avgHrCompleteness * 0.15
      )
    : 0;

  // Overall session score calculation
  let finalScore = 0;
  if (isHrOnly) {
    finalScore = hrOverallScore;
  } else if (isMixed) {
    // Balanced practice score: weight by count of tech vs hr questions
    finalScore = Math.round(
      (techOverallScore * techEvals.length + hrOverallScore * hrEvals.length) / evaluations.length
    );
  } else {
    finalScore = techOverallScore;
  }

  // Aggregate common grammar issues from HR questions
  const commonGrammarIssuesSet = new Set<string>();
  hrEvals.forEach((e) => {
    if (e.grammarObservations) {
      e.grammarObservations.forEach((obs) => {
        if (!obs.includes('Clean grammar')) {
          commonGrammarIssuesSet.add(obs);
        }
      });
    }
  });
  const commonGrammarIssues = Array.from(commonGrammarIssuesSet);
  if (commonGrammarIssues.length === 0 && hrEvals.length > 0) {
    commonGrammarIssues.push('No systemic grammatical or punctuation errors observed across answers.');
  }

  // Aggregate dynamic strengths and weaknesses
  const allStrengths = new Set<string>();
  const allWeaknesses = new Set<string>();
  const studyTopics = new Set<string>();

  evaluations.forEach((evalItem, idx) => {
    evalItem.strengths.forEach((s) => allStrengths.add(s));
    evalItem.improvements.forEach((i) => allWeaknesses.add(i));

    if (evalItem.scores.overallScore < 70 && questions[idx]) {
      if (questions[idx].type === 'HR') {
        studyTopics.add(`Communication: ${questions[idx].category}`);
      } else {
        studyTopics.add(`${questions[idx].category}: ${questions[idx].expectedKeywords.slice(0, 3).join(', ')}`);
      }
    }
  });

  // Recommended Practice Areas
  const recommendedPracticeAreas: string[] = [];
  if (isHrOnly || isMixed) {
    if (avgHrStructure < 80) {
      recommendedPracticeAreas.push('STAR Behavioral Framework: Structure stories with Situation, Task, Action, and measurable Result.');
    }
    if (avgHrGrammar < 85) {
      recommendedPracticeAreas.push('Sentence Mechanics: Review subject-verb agreement and sentence capitalization.');
    }
    if (avgHrClarity < 80) {
      recommendedPracticeAreas.push('Concise Phrasing: Break complex sentences into clear, easily digestible statements (12-25 words).');
    }
    if (avgHrCompleteness < 75) {
      recommendedPracticeAreas.push('Elaborate with Evidence: Provide concrete examples rather than general statements.');
    }
    recommendedPracticeAreas.push('Executive Summaries: Conclude behavioral answers with a clear professional learning takeaway.');
  }

  // Construct synthetic AI Feedback based on actual metrics
  let feedbackSummary = '';
  if (isHrOnly) {
    if (finalScore >= 80) {
      feedbackSummary =
        'Strong communication performance! Your answers were clearly structured, highly relevant, and demonstrated professional vocabulary and grammatical accuracy.';
    } else if (finalScore >= 65) {
      feedbackSummary =
        'Good communication practice session! You articulated key points well. Deepen your answers by incorporating specific STAR examples and polishing sentence structure.';
    } else {
      feedbackSummary =
        'Valuable communication practice. Focus on aligning answers directly to the prompt, avoiding overly brief statements, and organizing answers into an introduction, concrete example, and takeaway.';
    }
  } else if (isMixed) {
    feedbackSummary = `Mixed Interview Completed: Technical Performance scored ${techOverallScore}%, while Communication Performance scored ${hrOverallScore}%. Continue practicing both domain depth and structured behavioral delivery.`;
  } else {
    if (finalScore >= 80) {
      feedbackSummary =
        'Outstanding technical performance! You displayed strong mastery of domain concepts, articulated responses with clear structure, and accurately utilized industry-standard terminology.';
    } else if (finalScore >= 60) {
      feedbackSummary =
        'Solid performance! You demonstrated a good foundational understanding of core topics. Your explanations were generally accurate, but adding more depth and technical keywords will elevate your performance.';
    } else {
      feedbackSummary =
        'Good initial effort! While you attempted all questions, several answers were either too brief or missed critical technical concepts. We recommend revisiting core fundamentals.';
    }
  }

  const recommendations = isHrOnly
    ? [
        'Adopt the STAR method (Situation, Task, Action, Result) for all scenario-based questions.',
        'Begin responses with a direct 1-sentence thesis before elaborating with context.',
        'Proofread or listen carefully to maintain consistent subject-verb agreement.',
        'Tie your past lessons directly to the role requirements.'
      ]
    : [
        'Adopt the STAR method for behavioral questions and asymptotic complexity for technical questions.',
        'Always mention time and space complexity when discussing algorithms or data structures.',
        'Include practical code examples or architectural use cases to validate theoretical points.',
        'Review the highlighted missing keywords from this session before your real interview.'
      ];

  const questionEvaluations = evaluations.map((e, idx) => {
    const isHr = e.isHrQuestion || questions[idx]?.type === 'HR';
    const classification = isHr
      ? e.communicationClassification || (e.scores.overallScore >= 80 ? 'Strong' : e.scores.overallScore >= 65 ? 'Good' : 'Needs Improvement')
      : e.correctness;

    return {
      questionNumber: idx + 1,
      questionText: questions[idx]?.question || `Question ${idx + 1}`,
      userAnswer: e.rawText,
      isHr,
      overallScore: e.scores.overallScore,
      relevanceScore: e.scores.relevanceScore,
      technicalScore: e.scores.technicalScore || 0,
      completenessScore: e.scores.completenessScore,
      clarityScore: e.scores.clarityScore,
      grammarScore: e.scores.grammarScore,
      structureScore: e.scores.structureScore,
      classification,
      relevanceCategory: e.relevanceCategory,
      extractedKeywords: e.extractedKeywords,
      sentimentTone: e.sentiment.tone,
      improvements: e.improvements,
      feedback: e.feedback,
      grammarObservations: e.grammarObservations
    };
  });

  return {
    overallScore: finalScore,
    technicalScore: isHrOnly ? 0 : avgTechAccuracy,
    relevanceScore: isHrOnly ? avgHrRelevance : isMixed ? Math.round((avgTechRelevance + avgHrRelevance) / 2) : avgTechRelevance,
    completenessScore: isHrOnly ? avgHrCompleteness : isMixed ? Math.round((avgTechCompleteness + avgHrCompleteness) / 2) : avgTechCompleteness,
    clarityScore: isHrOnly ? avgHrClarity : isMixed ? Math.round((avgTechClarity + avgHrClarity) / 2) : avgTechClarity,
    grammarScore: isHrOnly || isMixed ? avgHrGrammar : undefined,
    structureScore: isHrOnly || isMixed ? avgHrStructure : undefined,
    communicationScore: isHrOnly ? hrOverallScore : isMixed ? hrOverallScore : undefined,
    isHrOnly,
    isMixed,
    technicalSummary: techEvals.length > 0 ? {
      overallScore: techOverallScore,
      technicalScore: avgTechAccuracy,
      relevanceScore: avgTechRelevance,
      completenessScore: avgTechCompleteness,
      clarityScore: avgTechClarity,
      count: techEvals.length
    } : undefined,
    communicationSummary: hrEvals.length > 0 ? {
      overallScore: hrOverallScore,
      relevanceScore: avgHrRelevance,
      clarityScore: avgHrClarity,
      grammarScore: avgHrGrammar,
      structureScore: avgHrStructure,
      completenessScore: avgHrCompleteness,
      count: hrEvals.length
    } : undefined,
    strengths: Array.from(allStrengths).slice(0, 4),
    weaknesses: Array.from(allWeaknesses).slice(0, 4),
    aiFeedback: feedbackSummary,
    studyTopics: Array.from(studyTopics),
    recommendations,
    commonGrammarIssues,
    recommendedPracticeAreas,
    questionEvaluations
  };
}

export const generateFinalReport = generateFinalReportData;
