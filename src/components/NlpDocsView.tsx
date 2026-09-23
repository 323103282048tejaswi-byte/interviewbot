import React, { useState } from 'react';
import {
  tokenize,
  cleanText,
  removeStopwords,
  extractKeywords,
  computeCosineSimilarity,
  analyzeSentiment
} from '../nlp/engine';
import {
  BookOpen,
  Cpu,
  Scissors,
  Tag,
  Scale,
  Smile,
  BarChart3,
  Play,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Code2
} from 'lucide-react';

export const NlpDocsView: React.FC = () => {
  // Interactive Sandbox State
  const [sandboxInput, setSandboxInput] = useState(
    'A dictionary in Python provides average O(1) time complexity for insertions and lookups because it is implemented as an optimized hash table with collision resolution.'
  );
  const [sandboxBenchmark, setSandboxBenchmark] = useState(
    'Python dictionaries are hash map implementations offering constant time O(1) key lookups, insertions, and hashing algorithms.'
  );
  const [analyzed, setAnalyzed] = useState(false);
  const [sandboxResults, setSandboxResults] = useState<{
    cleaned: string;
    allTokens: string[];
    filteredTokens: string[];
    removedStopwords: string[];
    keywords: string[];
    similarity: number;
    sentiment: { tone: string; score: number; confidence: number };
  } | null>(null);

  const handleRunSandbox = () => {
    const cleaned = cleanText(sandboxInput);
    const allTokens = tokenize(sandboxInput);
    const { filteredTokens, removedStopwords } = removeStopwords(allTokens);
    const keywordData = extractKeywords(sandboxInput);
    const similarity = computeCosineSimilarity(sandboxInput, sandboxBenchmark);
    const sentiment = analyzeSentiment(sandboxInput);

    setSandboxResults({
      cleaned,
      allTokens,
      filteredTokens,
      removedStopwords,
      keywords: keywordData.extractedKeywords,
      similarity,
      sentiment
    });
    setAnalyzed(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
          <BookOpen className="h-3.5 w-3.5" />
          <span>NLP Academic Mini-Project Theory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How NLP Powers InterviewBot
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Detailed mathematical formulations, linguistic algorithms, and an interactive NLP sandbox for live academic evaluation.
        </p>
      </div>

      {/* Interactive NLP Sandbox (Section for Live Demonstration) */}
      <div className="rounded-3xl border-2 border-indigo-500/40 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <Play className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Interactive NLP Diagnostic Sandbox
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type any custom candidate answer below and inspect live tokenization, stopword removal, and cosine similarity
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
            Live Execution
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Input Candidate Response:
            </label>
            <textarea
              id="sandbox-input-text"
              rows={3}
              value={sandboxInput}
              onChange={(e) => setSandboxInput(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-indigo-600 focus:bg-white dark:focus:bg-slate-900 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Reference Benchmark Answer:
            </label>
            <textarea
              id="sandbox-benchmark-text"
              rows={3}
              value={sandboxBenchmark}
              onChange={(e) => setSandboxBenchmark(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 p-3 text-xs text-slate-900 dark:text-white focus:outline-indigo-600 focus:bg-white dark:focus:bg-slate-900 font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            id="run-sandbox-btn"
            onClick={handleRunSandbox}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <Cpu className="h-4 w-4" />
            <span>Execute NLP Pipeline</span>
          </button>
        </div>

        {/* Output Box */}
        {sandboxResults && (
          <div className="rounded-2xl bg-slate-950 text-slate-100 p-5 space-y-4 font-mono text-xs border border-slate-800 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-indigo-400 border-b border-slate-800 pb-2">
              <span className="font-bold font-sans">Pipeline Execution Diagnostics:</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Status: Complete
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-slate-400 block mb-1">1. Tokenization & Filtering:</span>
                <p className="text-slate-300">Total Tokens: <strong className="text-white">{sandboxResults.allTokens.length}</strong></p>
                <p className="text-slate-300">Stopwords Removed: <strong className="text-amber-400">{sandboxResults.removedStopwords.length}</strong> ({sandboxResults.removedStopwords.slice(0, 6).join(', ')}...)</p>
                <p className="text-slate-300">Content Tokens: <strong className="text-emerald-400">{sandboxResults.filteredTokens.length}</strong></p>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">2. Semantic Vector Space Model:</span>
                <p className="text-slate-300">TF-IDF Cosine Similarity: <strong className="text-purple-400 text-sm">{sandboxResults.similarity}</strong> ({Math.round(sandboxResults.similarity * 100)}%)</p>
                <p className="text-slate-300">Sentiment Polarity: <strong className="text-sky-400">{sandboxResults.sentiment.tone}</strong> (Score: {sandboxResults.sentiment.score})</p>
              </div>
            </div>

            <div>
              <span className="text-slate-400 block mb-1.5">3. Extracted Domain Keywords:</span>
              <div className="flex flex-wrap gap-1.5">
                {sandboxResults.keywords.map((kw, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-indigo-900/60 text-indigo-200 text-[11px] border border-indigo-700/60">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NLP Concepts Cards (Sections 5 & 6) */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Linguistic Processing Concepts Used in This Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Concept 1: Tokenization */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-sky-600 dark:text-sky-400 font-bold text-sm">
              <Scissors className="h-5 w-5" />
              <span>1. Tokenization & Normalization</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tokenization partitions the continuous stream of user text into discrete atomic tokens (words, symbols, and operators). Case-folding normalizes terms to lowercase, and regex cleanses non-alphanumeric punctuation while preserving technical conventions like <code className="text-indigo-500 font-mono">O(1)</code> and <code className="text-indigo-500 font-mono">C++</code>.
            </p>
          </div>

          {/* Concept 2: Stopword Filtering */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
              <Tag className="h-5 w-5" />
              <span>2. Stop-word Removal</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Syntactic glue words (such as "the", "is", "at", "which", "and", "by") do not carry role-specific semantic weight. A curated corpus of 100+ stop-words is filtered out, leaving high-information content tokens for accurate evaluation.
            </p>
          </div>

          {/* Concept 3: TF-IDF & Cosine Similarity */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-purple-600 dark:text-purple-400 font-bold text-sm">
              <Scale className="h-5 w-5" />
              <span>3. TF-IDF & Cosine Similarity</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Candidate answers and gold-standard benchmarks are vectorized into a high-dimensional vocabulary space. Term Frequency (TF) and Inverse Document Frequency (IDF) weight each word. Cosine Similarity calculates the angle cosine between candidate vector A and model vector B:
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg font-mono text-[11px] text-purple-600 dark:text-purple-400 text-center font-bold">
              Cosine Similarity = (A • B) / (||A|| × ||B||)
            </div>
          </div>

          {/* Concept 4: Keyword Extraction */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Code2 className="h-5 w-5" />
              <span>4. Technical Entity & Keyword Matching</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              N-gram phrase matching identifies compound technical entities (e.g., "hash table", "garbage collection", "attention mechanism"). Candidate extracted entities are matched against role expectations to measure technical depth.
            </p>
          </div>

          {/* Concept 5: Sentiment & Tone Analysis */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Smile className="h-5 w-5" />
              <span>5. Sentiment & Politeness Polarity</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Lexicon-based polarity mapping measures candidate communicative tone. Professional markers (e.g., "effectively", "optimized", "collaborated") vs. negative hedges (e.g., "confused", "cannot", "failed") determine confidence and emotional balance.
            </p>
          </div>

          {/* Concept 6: Scoring Formula */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <BarChart3 className="h-5 w-5" />
              <span>6. Transparent Weighted Scoring</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Unlike black-box models, InterviewBot scores every answer through an explicit formula: 35% Relevance + 30% Technical Accuracy + 20% Completeness + 15% Clarity, providing clear academic defensibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
