import React from 'react';
import {
  Sparkles,
  Briefcase,
  Bot,
  Cpu,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Layers,
  HelpCircle,
  Scissors,
  Tag,
  Scale,
  Smile,
  FileCheck
} from 'lucide-react';

interface HowItWorksViewProps {
  onStartSetup: () => void;
  onExploreNlp: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onStartSetup,
  onExploreNlp
}) => {
  const steps = [
    {
      num: '01',
      title: 'Select Job Role & Setup',
      desc: 'Pick your target domain (Python, Java, Web, Data, ML, or HR) along with your experience level (Beginner, Intermediate, Advanced) and question count.',
      icon: Briefcase,
      badge: 'Step 1'
    },
    {
      num: '02',
      title: 'Engage in Realistic Interview',
      desc: 'The AI interviewer asks questions sequentially, one at a time. Respond via natural text or speak through speech-to-text voice dictation.',
      icon: Bot,
      badge: 'Step 2'
    },
    {
      num: '03',
      title: 'Linguistic NLP Processing',
      desc: 'Each answer is cleaned, tokenized, and evaluated against domain keywords and semantic cosine similarity without human latency.',
      icon: Cpu,
      badge: 'Step 3'
    },
    {
      num: '04',
      title: 'Detailed Performance Audit',
      desc: 'Receive transparent score metrics, dynamic strength/weakness matrices, radar competencies, and study topic recommendations.',
      icon: BarChart3,
      badge: 'Step 4'
    }
  ];

  const pipelineStages = [
    { name: '1. Raw Answer', desc: 'Candidate speaks or types response', icon: Bot, color: 'border-slate-500' },
    { name: '2. Text Preprocessing', desc: 'Lowercasing, punctuation stripping, whitespace normalization', icon: Scissors, color: 'border-sky-500' },
    { name: '3. Tokenization', desc: 'Splitting into discrete tokens, removing 100+ stop-words', icon: Layers, color: 'border-indigo-500' },
    { name: '4. Keyword Extraction', desc: 'Matching domain entities & n-gram technical terminology', icon: Tag, color: 'border-purple-500' },
    { name: '5. Semantic Cosine Vector', desc: 'TF-IDF Vector Space Model similarity vs benchmark', icon: Scale, color: 'border-emerald-500' },
    { name: '6. Sentiment & Tone', desc: 'Lexical polarity, confidence, and professionalism scoring', icon: Smile, color: 'border-amber-500' },
    { name: '7. Final Evaluation', desc: 'Weighted 35/30/20/15 formula and actionable report', icon: FileCheck, color: 'border-rose-500' }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">
          <HelpCircle className="h-3.5 w-3.5" />
          <span>System Architecture & Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          How InterviewBot Works
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Combining conversational AI with transparent Natural Language Processing to deliver an authentic, objective mock interview simulation.
        </p>
      </div>

      {/* 4 Step Process Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4 shadow-2xs relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-indigo-600/30 dark:text-indigo-400/30">
                  {st.num}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-600 dark:text-slate-400">
                  {st.badge}
                </span>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{st.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* NLP Pipeline Visual Flowchart (Section 18) */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-600" />
              The End-to-End NLP Pipeline Flowchart
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The internal data pipeline transforming candidate utterance into quantifiable metrics
            </p>
          </div>
          <button
            onClick={onExploreNlp}
            className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            <span>View NLP Theory & Formulas</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Pipeline steps vertical or horizontal flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {pipelineStages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-3.5 flex flex-col justify-between space-y-2 hover:border-indigo-400 transition-colors"
              >
                <div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-2xs mb-2">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{stage.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {stage.desc}
                  </p>
                </div>
                {i < pipelineStages.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-slate-300 dark:text-slate-700">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Formula Display Box */}
      <div className="rounded-2xl bg-slate-900 text-white p-6 space-y-4 border border-slate-800 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Transparent Academic Scoring Equation</h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            Deterministic Formula
          </span>
        </div>

        <div className="font-mono text-xs sm:text-sm text-indigo-200 bg-slate-950 p-4 rounded-xl border border-slate-800">
          <code>
            Final_Score = (0.35 × Cosine_Similarity) + (0.30 × Technical_Keywords) + (0.20 × Word_Completeness) + (0.15 × Sentence_Clarity)
          </code>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-slate-300">
          <div className="bg-slate-800/60 p-2.5 rounded-lg">
            <strong className="text-white block">35% Relevance:</strong> Cosine angle between candidate TF-IDF vector & model answer vector.
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg">
            <strong className="text-white block">30% Technical:</strong> Exact match ratio against role-specific benchmark keywords.
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg">
            <strong className="text-white block">20% Completeness:</strong> Ratio of answer depth against expected word count threshold.
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-lg">
            <strong className="text-white block">15% Clarity:</strong> Vocabulary diversity & sentence structure readability index.
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="text-center pt-2">
        <button
          onClick={onStartSetup}
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>Configure & Begin Interview Now</span>
        </button>
      </div>
    </div>
  );
};
