import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Cpu,
  Layers,
  CheckCircle2,
  Code2,
  HelpCircle,
  Sparkles,
  Server,
  Lock,
  ChevronDown
} from 'lucide-react';

export const AcademicAboutView: React.FC = () => {
  const vivaQuestions = [
    {
      q: 'Q1: What are the core NLP techniques implemented in this project?',
      a: 'The system implements 5 core NLP techniques: (1) Lexical Preprocessing (lowercasing, punctuation stripping, whitespace normalization), (2) Tokenization & Stopword Elimination (filtering a 100+ word non-informative lexicon), (3) Technical Keyword & Entity Extraction via n-gram token matching, (4) Semantic Relevance measurement using Vector Space Modeling & TF-IDF Cosine Similarity, and (5) Lexicon-based Sentiment and Politeness Polarity analysis.'
    },
    {
      q: 'Q2: How does the Cosine Similarity calculation work mathematically?',
      a: 'Each text string (candidate answer and reference benchmark) is mapped into a vector of term weights. Term Frequency (TF) counts term occurrences normalized by document length, and Inverse Document Frequency (IDF) penalizes common terms across documents. The Cosine Similarity is computed as: Cosine(A, B) = (A • B) / (||A|| × ||B||), which measures the angle between the two vectors independently of document length.'
    },
    {
      q: 'Q3: Why is TF-IDF Cosine Similarity superior to simple Jaccard Index or keyword counting?',
      a: 'Simple keyword counting awards points even if words appear haphazardly out of context, and Jaccard index treats all overlapping words with identical weight regardless of informativeness. TF-IDF Cosine Similarity appropriately weights rare technical vocabulary (like "concurrency", "garbage collection") much higher than generic domain verbs, and measures the direction of the semantic vector rather than raw length.'
    },
    {
      q: 'Q4: How does the system prevent black-box scoring and ensure academic transparency?',
      a: 'The scoring formula is deterministic and fully inspectable via the built-in "NLP Diagnostic Inspector": Overall Score = (0.35 × Relevance) + (0.30 × Technical Keywords) + (0.20 × Completeness) + (0.15 × Clarity). Every candidate response includes an audit breakdown displaying the exact tokens, matched keywords, missing terms, and vector similarity value.'
    },
    {
      q: 'Q5: What is the architectural role of Google Gemini in relation to the local NLP Engine?',
      a: 'The local NLP engine in src/nlp/engine.ts handles deterministic semantic similarity, keyword matching, and mathematical scoring. The server-side Gemini endpoint (gemini-3.8-flash) acts as the conversational interviewer layer: it generates natural verbal transitions, contextual follow-ups, and executive summary feedback based on the computed scores.'
    },
    {
      q: 'Q6: How does the architecture secure API keys and prevent client-side leaks?',
      a: 'All LLM calls are routed through an Express backend (/api/interview/*). The Gemini API key remains strictly server-side in process.env.GEMINI_API_KEY and is never exposed in browser network requests or bundle files. If no API key is provided, the application automatically uses an algorithmic fallback response pipeline, ensuring 100% offline functionality.'
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
          <GraduationCap className="h-3.5 w-3.5" />
          <span>Academic Project Presentation Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          About the NLP Mini Project
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Comprehensive project metadata, system architecture, and ready-to-present Viva Voce defense questions for college evaluation.
        </p>
      </div>

      {/* Project Meta Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Project Identification & Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Project Name:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              InterviewBot – AI Mock Interviewer
            </strong>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Academic Domain:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              Natural Language Processing (NLP)
            </strong>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Demonstration Level:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              Undergraduate / Engineering Mini-Project
            </strong>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Backend & Server:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              Express.js + Vite Middleware (TypeScript)
            </strong>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Frontend Stack:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              React 19 + Tailwind CSS + Recharts
            </strong>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-slate-400 block font-medium">Speech Recognition:</span>
            <strong className="text-slate-900 dark:text-white text-sm">
              Web Speech API (SpeechRecognition)
            </strong>
          </div>
        </div>
      </div>

      {/* System Architecture Block */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Server className="h-5 w-5 text-sky-600" />
          Three-Tier System Architecture
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase">
              <Layers className="h-4 w-4" />
              <span>1. Presentation Layer</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Responsive React single-page interface with ChatGPT-style conversation flow, live speech-to-text dictation, and Recharts performance dashboards.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase">
              <Cpu className="h-4 w-4" />
              <span>2. Core NLP Engine</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Stateless linguistic processor running tokenization, regex normalization, stopword filtering, TF-IDF vectorization, cosine similarity, and transparent scoring.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase">
              <Lock className="h-4 w-4" />
              <span>3. Proxy & LLM Service</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Secure Express server handling Gemini 3.8 Flash orchestration with graceful local fallback, ensuring API keys remain strictly hidden on the server.
            </p>
          </div>
        </div>
      </div>

      {/* Viva Voce Defense Q&A Sheet */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Viva Voce & Academic Defense Cheat Sheet
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Standard questions asked by internal and external academic examiners during NLP project evaluation
        </p>

        <div className="space-y-3 pt-2">
          {vivaQuestions.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-2"
            >
              <h3 className="text-xs sm:text-sm font-bold text-indigo-700 dark:text-indigo-400">
                {item.q}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
