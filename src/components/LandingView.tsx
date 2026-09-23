import React from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  BarChart3,
  TrendingUp,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  Cpu,
  Layers,
  Award,
  ArrowRight
} from 'lucide-react';

interface LandingViewProps {
  onStartSetup: () => void;
  onStartDemo: () => void;
  onHowItWorks: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStartSetup,
  onStartDemo,
  onHowItWorks
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-4 sm:pt-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 dark:border-indigo-800 bg-indigo-50/80 dark:bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-2xs">
          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
          <span>NLP Mini Project Academic Demonstration</span>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Ace Your Next Interview with <span className="bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-500 bg-clip-text text-transparent">AI</span>
          </h1>
          <p className="text-xl sm:text-2xl font-medium text-slate-700 dark:text-slate-200">
            InterviewBot – Your AI-powered mock interview partner
          </p>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Practice realistic interviews, receive transparent NLP-powered linguistic feedback, and track your improvement across technical, relevance, and clarity dimensions.
          </p>
          <div className="pt-2 flex items-center justify-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Practice.</span>
            <span>•</span>
            <span>Analyze.</span>
            <span>•</span>
            <span>Improve.</span>
          </div>
        </div>

        {/* Hero Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="landing-start-mock-btn"
            onClick={onStartSetup}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 text-sm font-semibold shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all cursor-pointer"
          >
            <Sparkles className="h-4 w-4" />
            <span>Start Mock Interview</span>
          </button>

          <button
            id="landing-view-demo-btn"
            onClick={onStartDemo}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <PlayCircle className="h-4 w-4" />
            <span>Try Demo Interview</span>
          </button>

          <button
            id="landing-how-it-works-btn"
            onClick={onHowItWorks}
            className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-3.5 text-sm font-semibold transition-all cursor-pointer"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span>How It Works</span>
          </button>
        </div>
      </section>

      {/* Modern Visual AI Card preview */}
      <section className="relative rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 px-2.5 py-1 text-xs font-semibold">
              <Cpu className="h-3.5 w-3.5" />
              <span>Real-Time NLP Processing</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              An NLP Project, Not Just a Chatbot.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every candidate answer passes through an explicit Natural Language Processing pipeline:
              Tokenization, Stopword Filtering, Technical Keyword Extraction, TF-IDF Vector Cosine Similarity, and Lexical Sentiment Analysis.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Role-Specific Difficulty:</strong> Questions adapt automatically from Junior fundamentals to Senior system internals.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Live Voice Recognition:</strong> Speak your answers using browser Speech-to-Text with instant editable transcription.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Transparent Mathematical Scoring:</strong> Weighted evaluation combining 35% Relevance + 30% Technical + 20% Completeness + 15% Clarity.</span>
              </div>
            </div>
          </div>

          {/* Interactive Visual NLP Pipeline Mini-card */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900 border border-slate-800 p-5 text-slate-100 font-mono text-xs shadow-inner space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400 text-[11px] flex items-center gap-1.5 font-sans font-semibold">
                <Bot className="h-3.5 w-3.5 text-indigo-400" />
                Live NLP Pipeline Example
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                Processed
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-slate-500 text-[11px]">User Input:</span>
              <p className="text-slate-200 bg-slate-800/80 p-2 rounded-lg text-[11px]">
                "A dictionary in Python uses hash tables for O(1) key lookups."
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                <span className="text-sky-400 block font-bold mb-1">Keywords Extracted:</span>
                <span className="text-slate-300">dictionary, hash table, o(1), lookup</span>
              </div>
              <div className="bg-slate-800/50 p-2 rounded-lg border border-slate-700/50">
                <span className="text-purple-400 block font-bold mb-1">Semantic Match:</span>
                <span className="text-slate-300">92% Cosine • Highly Relevant</span>
              </div>
            </div>

            <div className="bg-indigo-950/60 p-2.5 rounded-lg border border-indigo-800/60 flex items-center justify-between text-[11px]">
              <span className="text-indigo-300 font-bold">Computed Quality Score:</span>
              <span className="text-white font-bold text-sm bg-indigo-600 px-2 py-0.5 rounded-md">
                88 / 100
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards matching Section 17 */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Core Features Designed for Mastery
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything you need for comprehensive interview preparation and academic presentation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: AI Interviewer */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">AI Interviewer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Practice realistic interviews asked one question at a time across Python, Java, Web, Data, ML, and HR tracks.
            </p>
          </div>

          {/* Card 2: NLP Analysis */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 hover:shadow-lg hover:border-sky-300 dark:hover:border-sky-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">NLP Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Understand how your answers perform through text tokenization, keyword extraction, and vector semantic similarity.
            </p>
          </div>

          {/* Card 3: Smart Feedback */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Smart Feedback</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Receive personalized improvement suggestions, specific strengths, missing terminology, and study roadmaps.
            </p>
          </div>

          {/* Card 4: Progress Tracking */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-3 hover:shadow-lg hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Progress Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Track your interview performance over time with interactive line charts, radar competency models, and session history.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action footer banner */}
      <section className="rounded-2xl bg-indigo-600 dark:bg-indigo-950/80 border border-indigo-500/40 p-8 text-center text-white space-y-4">
        <h3 className="text-2xl font-bold">Ready to Practice for Your Next Technical Interview?</h3>
        <p className="text-sm text-indigo-100 max-w-xl mx-auto">
          Select your target role, experience level, and start an interactive AI interview right now.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            id="landing-cta-setup-btn"
            onClick={onStartSetup}
            className="rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2.5 text-xs font-bold shadow-md transition-colors cursor-pointer"
          >
            Launch Interview Setup
          </button>
          <button
            id="landing-cta-demo-btn"
            onClick={onStartDemo}
            className="rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white border border-indigo-400/40 px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer"
          >
            Try Quick Demo
          </button>
        </div>
      </section>
    </div>
  );
};
