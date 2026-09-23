import React, { useEffect } from 'react';
import { FinalReport, InterviewSession, NLPAnalysisResult } from '../types';
import confetti from 'canvas-confetti';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Brain,
  RotateCcw,
  History,
  Printer,
  ChevronDown,
  Sparkles,
  BookOpen,
  Cpu,
  BarChart3,
  TrendingUp,
  FileCheck,
  ArrowLeft,
  Calendar,
  Clock
} from 'lucide-react';

interface ReportViewProps {
  session: InterviewSession;
  onNewInterview: () => void;
  onViewHistory: () => void;
  onBackToHistory?: () => void;
  onInspectNlp: (nlp: NLPAnalysisResult, questionText?: string) => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  session,
  onNewInterview,
  onViewHistory,
  onBackToHistory,
  onInspectNlp
}) => {
  const report: FinalReport | undefined = session.finalReport;

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (_) {}
  }, []);

  if (!report) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold">Report not yet generated</h2>
        <button
          onClick={onNewInterview}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold"
        >
          Start an Interview
        </button>
      </div>
    );
  }

  const isHr = session.type === 'HR' || report.isHrOnly;
  const isMixed = session.type === 'Mixed' || report.isMixed;

  // Radar chart data structure tailored to interview type
  const radarData = isHr
    ? [
        { subject: 'Answer Relevance', value: report.relevanceScore, fullMark: 100 },
        { subject: 'Clarity & Flow', value: report.clarityScore, fullMark: 100 },
        { subject: 'Grammar & Mechanics', value: report.grammarScore ?? 85, fullMark: 100 },
        { subject: 'Structure & Coherence', value: report.structureScore ?? 80, fullMark: 100 },
        { subject: 'Completeness', value: report.completenessScore, fullMark: 100 }
      ]
    : isMixed
    ? [
        { subject: 'Technical Knowledge', value: report.technicalSummary?.technicalScore ?? report.technicalScore, fullMark: 100 },
        { subject: 'Relevance', value: report.relevanceScore, fullMark: 100 },
        { subject: 'Clarity & Fluency', value: report.clarityScore, fullMark: 100 },
        { subject: 'Structure', value: report.communicationSummary?.structureScore ?? report.structureScore ?? 80, fullMark: 100 },
        { subject: 'Grammar', value: report.communicationSummary?.grammarScore ?? report.grammarScore ?? 85, fullMark: 100 },
        { subject: 'Completeness', value: report.completenessScore, fullMark: 100 }
      ]
    : [
        { subject: 'Technical Knowledge', value: report.technicalScore, fullMark: 100 },
        { subject: 'Answer Relevance', value: report.relevanceScore, fullMark: 100 },
        { subject: 'Completeness', value: report.completenessScore, fullMark: 100 },
        { subject: 'Communication & Clarity', value: report.clarityScore, fullMark: 100 },
        { subject: 'Terminology & Keywords', value: Math.min(100, Math.round(report.technicalScore * 1.05)), fullMark: 100 }
      ];

  // Bar chart data for question-by-question breakdown
  const barData = report.questionEvaluations.map((q) => ({
    name: `Q${q.questionNumber}`,
    Overall: q.overallScore,
    Relevance: q.relevanceScore,
    Clarity: q.clarityScore,
    DomainScore: q.isHr ? (q.structureScore ?? q.overallScore) : q.technicalScore
  }));

  const handlePrint = () => {
    window.print();
  };

  // Format date and calculate duration
  const dateFormatted = session.startTime
    ? (new Date(session.startTime).toString() !== 'Invalid Date'
        ? new Date(session.startTime).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
        : session.startTime)
    : 'Session Record';

  const durationStr = (session as any).durationMinutes
    ? `${(session as any).durationMinutes} mins`
    : session.startTime && session.endTime && new Date(session.endTime).toString() !== 'Invalid Date' && new Date(session.startTime).toString() !== 'Invalid Date'
    ? `${Math.max(1, Math.round((new Date(session.endTime).getTime() - new Date(session.startTime).getTime()) / 60000))} mins`
    : `${Math.max(5, session.questions.length * 2)} mins`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-300">
      {/* Top Navigation Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          id="report-back-to-history-btn"
          onClick={onBackToHistory || onViewHistory}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>← Back to Interview History</span>
        </button>

        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-indigo-500" />
            <span>{dateFormatted}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-indigo-500" />
            <span>{durationStr}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <FileCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>{session.questions.length} Questions Evaluated</span>
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Interview Assessment Generated</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Interview Assessment Report 🎉
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          <span className="font-bold text-slate-900 dark:text-white">{session.role}</span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 font-semibold border border-indigo-200/50 dark:border-indigo-800/50">
            {session.level} Level
          </span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
            {session.type} Interview
          </span>
          <span>•</span>
          <span>{session.questions.length} Questions</span>
        </div>
      </div>

      {/* Main Score & Metric Cards */}
      {isHr ? (
        /* HR / Communication Interview Mode Cards */
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Overall Communication Score Highlight */}
            <div className="md:col-span-1 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-700 text-white p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-purple-600/20">
              <span className="text-xs uppercase tracking-wider font-semibold text-purple-200">
                Communication
              </span>
              <div className="my-2 flex items-baseline">
                <span className="text-5xl font-black">{report.overallScore}</span>
                <span className="text-lg text-purple-200 font-medium">/100</span>
              </div>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold">
                {report.overallScore >= 80 ? 'Strong' : report.overallScore >= 60 ? 'Good' : 'Needs Practice'}
              </span>
            </div>

            {/* 5 HR Score Cards */}
            <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Relevance (25%)
                </span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {report.relevanceScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${report.relevanceScore}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Clarity (25%)
                </span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {report.clarityScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${report.clarityScore}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Structure (20%)
                </span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {report.structureScore ?? 80}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${report.structureScore ?? 80}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Grammar (15%)
                </span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {report.grammarScore ?? 85}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${report.grammarScore ?? 85}%` }} />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Completeness (15%)
                </span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {report.completenessScore}%
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${report.completenessScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Observable language characteristics notice */}
          <div className="p-3.5 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-purple-600 dark:text-purple-400" />
            <span>
              <strong>Objective Linguistic Evaluation:</strong> Assesses observable language characteristics only (clarity, relevance, organization, grammar, and completeness). This is not an assessment of general intelligence or psychological suitability.
            </span>
          </div>
        </div>
      ) : isMixed ? (
        /* Mixed Interview Mode Dual Summaries */
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 text-white p-6 shadow-lg shadow-indigo-600/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-100">
                Mixed Assessment Composite Score
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black">{report.overallScore}</span>
                <span className="text-base text-indigo-100 font-medium">/ 100</span>
                <span className="ml-2 rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold">
                  {report.overallScore >= 80 ? 'Proficient' : report.overallScore >= 60 ? 'Competent' : 'Developing'}
                </span>
              </div>
              <p className="mt-1 text-xs text-indigo-100/90">
                Weighted composite formula: 60% Technical Knowledge + 40% HR / Communication Skills
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Technical Section Summary */}
            <div className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/20 dark:bg-sky-950/10 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-sky-100 dark:border-sky-900/40">
                <div className="flex items-center gap-2 font-bold text-sm text-sky-900 dark:text-sky-300">
                  <Cpu className="h-4 w-4 text-sky-600" />
                  <span>Technical Evaluation Summary</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-200 font-bold text-xs font-mono">
                  Score: {report.technicalSummary?.overallScore ?? report.technicalScore}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Technical</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.technicalSummary?.technicalScore ?? report.technicalScore}%
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Relevance</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.technicalSummary?.relevanceScore ?? report.relevanceScore}%
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Completeness</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.technicalSummary?.completenessScore ?? report.completenessScore}%
                  </strong>
                </div>
              </div>
            </div>

            {/* HR / Communication Section Summary */}
            <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-purple-50/20 dark:bg-purple-950/10 p-5 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-purple-100 dark:border-purple-900/40">
                <div className="flex items-center gap-2 font-bold text-sm text-purple-900 dark:text-purple-300">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span>Communication Evaluation Summary</span>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-200 font-bold text-xs font-mono">
                  Score: {report.communicationSummary?.overallScore ?? report.communicationScore ?? report.clarityScore}%
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Clarity</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.communicationSummary?.clarityScore ?? report.clarityScore}%
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Structure</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.communicationSummary?.structureScore ?? report.structureScore ?? 80}%
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Grammar</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.communicationSummary?.grammarScore ?? report.grammarScore ?? 85}%
                  </strong>
                </div>
                <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Relevance</span>
                  <strong className="text-slate-900 dark:text-white font-mono text-sm">
                    {report.communicationSummary?.relevanceScore ?? report.relevanceScore}%
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Technical Interview Cards */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Overall Score Highlight */}
          <div className="md:col-span-1 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-700 text-white p-6 flex flex-col items-center justify-center text-center shadow-lg shadow-indigo-600/20">
            <span className="text-xs uppercase tracking-wider font-semibold text-indigo-200">
              Overall Score
            </span>
            <div className="my-2 flex items-baseline">
              <span className="text-5xl font-black">{report.overallScore}</span>
              <span className="text-lg text-indigo-200 font-medium">/100</span>
            </div>
            <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold">
              {report.overallScore >= 80 ? 'Proficient' : report.overallScore >= 60 ? 'Competent' : 'Developing'}
            </span>
          </div>

          {/* 4 Score Cards */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Technical Knowledge
              </span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {report.technicalScore}%
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: `${report.technicalScore}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Answer Relevance
              </span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {report.relevanceScore}%
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${report.relevanceScore}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Completeness
              </span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {report.completenessScore}%
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${report.completenessScore}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Communication & Clarity
              </span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {report.clarityScore}%
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${report.clarityScore}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visual Analytics with Recharts (Section 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Chart: Competency Matrix */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-500" />
              Competency Radar Analysis
            </h3>
            <span className="text-[10px] text-slate-400 uppercase font-mono">5 Dimensions</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#94a3b8" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" strokeOpacity={0.2} />
                <Radar
                  name="Candidate Score"
                  dataKey="value"
                  stroke="#4f46e5"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Question-by-Question Performance */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-sky-500" />
              Question-by-Question Progression
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Per Answer Score</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="Overall" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Relevance" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Clarity" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dynamic Strengths & Areas to Improve (Section 10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Strengths */}
        <div className="rounded-2xl border border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>Your Strengths</span>
          </div>
          <ul className="space-y-2">
            {report.strengths.map((str, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓</span>
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas to Improve */}
        <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-amber-50/20 dark:bg-amber-950/10 p-5 space-y-3">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span>Areas to Improve</span>
          </div>
          <ul className="space-y-2">
            {report.weaknesses.map((weak, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span>{weak}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Personalized AI Feedback (Section 11) */}
      <div className="rounded-2xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 p-6 space-y-3">
        <div className="flex items-center gap-2 text-indigo-900 dark:text-indigo-300 font-bold text-sm">
          <Brain className="h-4 w-4 text-indigo-600" />
          <span>AI Interviewer Executive Feedback</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          "{report.aiFeedback}"
        </p>

        {report.studyTopics.length > 0 && (
          <div className="pt-3 border-t border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 block mb-1.5">
              Recommended Topics to Study:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {report.studyTopics.map((topic, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-xs font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Question-by-Question Review with Expandable NLP Inspector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-indigo-500" />
            Detailed Question-by-Question Breakdown
          </h3>
          <span className="text-xs text-slate-500">
            Click "Inspect NLP" on any question to examine tokenization & vector math
          </span>
        </div>

        <div className="space-y-3">
          {report.questionEvaluations.map((item, idx) => {
            const evalObject = session.evaluations[idx];
            const isHrQ = item.isHr || evalObject?.isHrQuestion || session.type === 'HR';
            const hrClassification = evalObject?.communicationClassification || item.classification || (
              item.overallScore >= 80 ? 'Strong' : item.overallScore >= 65 ? 'Good' : 'Needs Improvement'
            );

            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold text-xs shrink-0">
                      {item.questionNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border shrink-0 ${
                        isHrQ
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/60'
                          : 'bg-sky-50 text-sky-700 dark:bg-sky-950/70 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/60'
                      }`}
                    >
                      {isHrQ ? 'HR / Communication' : 'Technical'}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.questionText}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-lg">
                      Score: {item.overallScore}%
                    </span>

                    {evalObject && (
                      <button
                        onClick={() => onInspectNlp(evalObject, item.questionText)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline p-1 cursor-pointer"
                      >
                        <Cpu className="h-3.5 w-3.5" />
                        <span>Inspect NLP</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Candidate response snippet */}
                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl italic">
                  "{item.userAnswer}"
                </div>

                {/* Evaluation Feedback and Classification */}
                <div className="p-3.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/70 dark:border-indigo-900/40 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-300">
                      {isHrQ ? 'Communication Assessment:' : 'Technical Assessment:'}
                    </span>

                    {isHrQ ? (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                          hrClassification === 'Strong'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                            : hrClassification === 'Good'
                            ? 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800'
                            : hrClassification === 'Needs Improvement'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                        }`}
                      >
                        {hrClassification}
                      </span>
                    ) : (
                      evalObject?.correctness && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                            evalObject.correctness === 'Correct'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                              : evalObject.correctness === 'Mostly Correct'
                              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                              : evalObject.correctness === 'Partially Correct'
                              ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800'
                              : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800'
                          }`}
                        >
                          {evalObject.correctness}
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {evalObject?.feedback || item.feedback || 'Answer evaluated.'}
                  </p>

                  {/* Grammar observations for HR questions */}
                  {isHrQ && evalObject?.grammarObservations && evalObject.grammarObservations.length > 0 && (
                    <div className="pt-2 border-t border-indigo-100/60 dark:border-indigo-900/30 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      <span className="font-semibold text-purple-700 dark:text-purple-300">
                        Language Observations:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {evalObject.grammarObservations.map((obs, oIdx) => (
                          <li key={oIdx}>{obs}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Matched keywords for Technical questions */}
                  {!isHrQ && evalObject?.matchedExpectedKeywords && evalObject.matchedExpectedKeywords.length > 0 && (
                    <div className="pt-2 border-t border-indigo-100/60 dark:border-indigo-900/30 flex flex-wrap items-center gap-1.5 text-[10px]">
                      <span className="font-semibold text-sky-700 dark:text-sky-300">Keywords Identified:</span>
                      {evalObject.matchedExpectedKeywords.map((kw, kwIdx) => (
                        <span key={kwIdx} className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                          {kw}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metrics chips */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  {isHrQ ? (
                    <>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Relevance: {item.relevanceScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Clarity: {item.clarityScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Grammar: {item.grammarScore ?? evalObject?.scores?.grammarScore ?? 85}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Structure: {item.structureScore ?? evalObject?.scores?.structureScore ?? 80}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Completeness: {item.completenessScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Tone: {item.sentimentTone}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Technical: {item.technicalScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Relevance: {item.relevanceScore}% ({item.relevanceCategory})
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Completeness: {item.completenessScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Clarity: {item.clarityScore}%
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                        Tone: {item.sentimentTone}
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="report-bottom-back-history-btn"
            onClick={onBackToHistory || onViewHistory}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>← Back to Interview History</span>
          </button>
          <button
            type="button"
            onClick={onViewHistory}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <History className="h-4 w-4" />
            <span>All Past Interviews</span>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onNewInterview}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Start Another Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
};
