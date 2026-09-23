import React from 'react';
import { NLPAnalysisResult } from '../types';
import {
  X,
  Cpu,
  Scissors,
  Tag,
  Scale,
  Smile,
  BarChart3,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface NlpInspectorModalProps {
  nlpData: NLPAnalysisResult | null;
  questionText?: string;
  onClose: () => void;
}

export const NlpInspectorModal: React.FC<NlpInspectorModalProps> = ({
  nlpData,
  questionText,
  onClose
}) => {
  if (!nlpData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div
        id="nlp-inspector-dialog"
        className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50/80 dark:bg-slate-800/40">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                NLP Pipeline Diagnostic Inspector
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800">
                  Academic Proof
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Detailed step-by-step breakdown of natural language processing & transparent scoring
              </p>
            </div>
          </div>
          <button
            id="nlp-inspector-close-btn"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-sm">
          {questionText && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-4 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Question
              </span>
              <p className="mt-1 font-medium text-slate-900 dark:text-white">
                {questionText}
              </p>
            </div>
          )}

          {/* User Answer Raw */}
          <div className="rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 p-4 border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider">
              Candidate Response (Original Answer)
            </span>
            <p className="mt-1 text-slate-800 dark:text-slate-200 italic font-medium">
              "{nlpData.rawText}"
            </p>
          </div>

          {/* HR / Communication NLP Inspection */}
          {nlpData.isHrQuestion ? (
            <div className="space-y-6">
              {/* Communication Evaluation Overview */}
              <div className="rounded-xl border border-indigo-200 dark:border-indigo-800 p-4 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Communication Evaluation
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        nlpData.communicationClassification === 'Strong'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                          : nlpData.communicationClassification === 'Good'
                          ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
                          : nlpData.communicationClassification === 'Needs Improvement'
                          ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                          : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                      }`}
                    >
                      {nlpData.communicationClassification || 'Evaluated'}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs">
                      Final Score: {nlpData.scores.overallScore}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Feedback:</strong>
                  {nlpData.feedback}
                </div>
              </div>

              {/* Step 1: Text Preprocessing & Tokens */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Scissors className="h-4 w-4 text-sky-500" />
                  <span>1. Preprocessing, Tokens & Text Statistics</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      Cleaned & Normalized Text
                    </span>
                    <p className="mt-1 font-mono text-xs text-slate-700 dark:text-slate-300 break-words bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
                      {nlpData.cleanedText || '(empty)'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      Linguistic Statistics
                    </span>
                    <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="text-slate-400 block text-[10px]">Sentence Count:</span>
                        <strong className="text-slate-900 dark:text-white font-mono text-sm">
                          {nlpData.sentenceCount ?? 1}
                        </strong>
                      </div>
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="text-slate-400 block text-[10px]">Word Count:</span>
                        <strong className="text-slate-900 dark:text-white font-mono text-sm">
                          {nlpData.wordCount ?? nlpData.tokenCount}
                        </strong>
                      </div>
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="text-slate-400 block text-[10px]">Stopwords Removed:</span>
                        <strong className="text-amber-600 dark:text-amber-400 font-mono text-sm">
                          {nlpData.stopwordCount}
                        </strong>
                      </div>
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <span className="text-slate-400 block text-[10px]">Content Tokens:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                          {nlpData.filteredTokens.length}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tokens display */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                    Extracted Tokens ({nlpData.tokens.length} total):
                  </span>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                    {nlpData.tokens.map((tok, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                      >
                        {tok}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 2: Keywords & Key Phrases */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Tag className="h-4 w-4 text-indigo-500" />
                  <span>2. Important Keywords & Detected Key Phrases</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-indigo-200 dark:border-indigo-900/60 p-3 bg-indigo-50/20 dark:bg-indigo-950/20">
                    <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 block mb-1.5">
                      Important Extracted Keywords:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {nlpData.extractedKeywords.length > 0 ? (
                        nlpData.extractedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-semibold text-xs"
                          >
                            #{kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">None extracted</span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-sky-200 dark:border-sky-900/60 p-3 bg-sky-50/20 dark:bg-sky-950/20">
                    <span className="text-xs font-semibold text-sky-700 dark:text-sky-400 block mb-1.5">
                      Detected Key Phrases / Action Verbs:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {nlpData.detectedKeyPhrases && nlpData.detectedKeyPhrases.length > 0 ? (
                        nlpData.detectedKeyPhrases.map((phrase, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 text-xs font-medium"
                          >
                            "{phrase}"
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">No multi-word key phrases detected</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Grammar Observations & Repeated Words */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>3. Grammar Observations & Vocabulary Structure</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Grammar & Mechanics Observations:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                      {nlpData.grammarObservations && nlpData.grammarObservations.length > 0 ? (
                        nlpData.grammarObservations.map((obs, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-indigo-500 font-bold">•</span>
                            <span>{obs}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-emerald-600 dark:text-emerald-400">Clean grammar and mechanics.</li>
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
                      Repeated Words & Vocabulary Diversity:
                    </span>
                    {nlpData.repeatedWords && nlpData.repeatedWords.length > 0 ? (
                      <div className="space-y-1.5">
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium block">
                          Frequently repeated content words:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {nlpData.repeatedWords.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs font-mono"
                            >
                              {item.word} ({item.count}x)
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">
                        Well balanced vocabulary; no excessive repetition detected.
                      </span>
                    )}

                    {nlpData.structureNotes && (
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                        <strong className="text-slate-700 dark:text-slate-300">Structure note: </strong>
                        {nlpData.structureNotes}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 4: Question Relevance & 5-Part HR Scoring Formula */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <BarChart3 className="h-4 w-4 text-indigo-500" />
                    <span>4. Question Relevance & Communication Scoring Formula</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    Communication: {nlpData.scores.overallScore} / 100
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-medium truncate">Relevance (25%)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {nlpData.scores.relevanceScore}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-medium truncate">Clarity (25%)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {nlpData.scores.clarityScore}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-medium truncate">Grammar (15%)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {nlpData.scores.grammarScore ?? 85}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-500 block font-medium truncate">Structure (20%)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {nlpData.scores.structureScore ?? 80}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-500 block font-medium truncate">Completeness (15%)</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                      {nlpData.scores.completenessScore}%
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 text-slate-100 p-3 font-mono text-xs">
                  <span className="text-slate-400 block mb-1">Academic Formula:</span>
                  <p className="text-emerald-400 font-semibold">{nlpData.scoringFormulaExplanation}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Section: NLP Answer Evaluation Result */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Evaluation Result
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      nlpData.correctness === 'Correct'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                        : nlpData.correctness === 'Mostly Correct'
                        ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                        : nlpData.correctness === 'Partially Correct'
                        ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800'
                        : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                    }`}
                  >
                    {nlpData.correctness === 'Correct' && '✅ '}
                    {nlpData.correctness === 'Mostly Correct' && '🟡 '}
                    {nlpData.correctness === 'Partially Correct' && '🟠 '}
                    {nlpData.correctness === 'Incorrect / Not Relevant' && '❌ '}
                    {nlpData.correctness}
                  </span>
                </div>

                <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                  <strong className="text-slate-900 dark:text-white block mb-0.5">Feedback:</strong>
                  {nlpData.feedback}
                  {nlpData.expectedConceptHighlight && (
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 font-medium text-slate-600 dark:text-slate-300">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Expected Concept: </span>
                      "{nlpData.expectedConceptHighlight}"
                    </div>
                  )}
                </div>
              </div>

              {/* Section A: Text Preprocessing */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Scissors className="h-4 w-4 text-sky-500" />
                  <span>Step A: Text Preprocessing & Tokenization</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      1. Cleaned & Lowercased Text
                    </span>
                    <p className="mt-1 font-mono text-xs text-slate-700 dark:text-slate-300 break-words bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
                      {nlpData.cleanedText || '(empty)'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900">
                    <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">
                      2. Token Metrics
                    </span>
                    <div className="mt-2 flex gap-4 text-xs">
                      <div>
                        <span className="text-slate-400">Total Tokens:</span>{' '}
                        <strong className="text-slate-800 dark:text-slate-200">{nlpData.tokenCount}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Stopwords Removed:</span>{' '}
                        <strong className="text-amber-600 dark:text-amber-400">{nlpData.stopwordCount}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Content Tokens:</span>{' '}
                        <strong className="text-emerald-600 dark:text-emerald-400">{nlpData.filteredTokens.length}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filtered tokens pill list */}
                <div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-1.5">
                    Extracted Content Tokens (Post-Stopwords Filter):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {nlpData.filteredTokens.length > 0 ? (
                      nlpData.filteredTokens.map((tok, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
                        >
                          {tok}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">No content tokens extracted.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Section B: Keyword Extraction */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                  <Tag className="h-4 w-4 text-indigo-500" />
                  <span>Step B: Keyword Extraction & Domain Matching</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 p-3 bg-emerald-50/30 dark:bg-emerald-950/20">
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Matched Expected Technical Keywords ({nlpData.matchedExpectedKeywords.length})
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {nlpData.matchedExpectedKeywords.length > 0 ? (
                        nlpData.matchedExpectedKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-semibold text-xs"
                          >
                            ✓ {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-500">None identified</span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-xl border border-amber-200 dark:border-amber-900/60 p-3 bg-amber-50/30 dark:bg-amber-950/20">
                    <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Missing Expected Technical Keywords ({nlpData.missingKeywords.length})
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {nlpData.missingKeywords.length > 0 ? (
                        nlpData.missingKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 text-xs"
                          >
                            • {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                          All expected keywords covered!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section C & D: Semantic Relevance & Sentiment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Semantic Relevance */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <Scale className="h-4 w-4 text-purple-500" />
                    <span>Step C: Semantic Similarity</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-white dark:bg-slate-900 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">TF-IDF Cosine Similarity:</span>
                      <strong className="font-mono text-purple-600 dark:text-purple-400 text-sm">
                        {nlpData.semanticSimilarity}
                      </strong>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Relevance Classification:</span>
                      <span
                        className={`px-2 py-0.5 rounded-md font-semibold text-xs ${
                          nlpData.relevanceCategory === 'Highly Relevant'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400'
                            : nlpData.relevanceCategory === 'Relevant'
                            ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-400'
                            : nlpData.relevanceCategory === 'Partially Relevant'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400'
                            : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400'
                        }`}
                      >
                        {nlpData.relevanceCategory}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Sentiment & Tone */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <Smile className="h-4 w-4 text-emerald-500" />
                    <span>Step D: Sentiment & Tone Analysis</span>
                  </div>
                  <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-white dark:bg-slate-900 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Detected Tone:</span>
                      <span
                        className={`font-semibold ${
                          nlpData.sentiment.tone === 'Positive'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : nlpData.sentiment.tone === 'Negative'
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {nlpData.sentiment.tone} (Score: {nlpData.sentiment.score})
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Confidence Metric:</span>
                      <strong className="text-slate-800 dark:text-slate-200">
                        {Math.round(nlpData.sentiment.confidence * 100)}%
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section E: Transparent Scoring System */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                    <BarChart3 className="h-4 w-4 text-indigo-500" />
                    <span>Step E: Transparent Scoring Formula & Metrics</span>
                  </div>
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    Overall: {nlpData.scores.overallScore} / 100
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block font-medium">Relevance (35%)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {nlpData.scores.relevanceScore}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block font-medium">Technical (30%)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {nlpData.scores.technicalScore}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block font-medium">Completeness (20%)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {nlpData.scores.completenessScore}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-slate-50 dark:bg-slate-800/80 p-2.5 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] text-slate-500 block font-medium">Clarity (15%)</span>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {nlpData.scores.clarityScore}%
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-900 text-slate-100 p-3 font-mono text-xs">
                  <span className="text-slate-400 block mb-1">Academic Mathematical Formulation:</span>
                  <p className="text-emerald-400 font-semibold">{nlpData.scoringFormulaExplanation}</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-3.5 bg-slate-50/50 dark:bg-slate-900 flex justify-end">
          <button
            id="nlp-inspector-dismiss-btn"
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-4 py-2 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
