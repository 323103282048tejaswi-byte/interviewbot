import React from 'react';
import { InterviewHistoryItem } from '../types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar
} from 'recharts';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  Target,
  ArrowUpRight
} from 'lucide-react';

interface PerformanceDashboardProps {
  history: InterviewHistoryItem[];
  onStartNew: () => void;
}

export const PerformanceDashboard: React.FC<PerformanceDashboardProps> = ({
  history,
  onStartNew
}) => {
  // Aggregate stats
  const totalInterviews = history.length;
  const totalQuestions = history.reduce((acc, h) => acc + (h.questionCount || 5), 0);
  const averageScore = totalInterviews
    ? Math.round(history.reduce((acc, h) => acc + h.finalScore, 0) / totalInterviews)
    : 0;
  const highestScore = totalInterviews ? Math.max(...history.map((h) => h.finalScore)) : 0;

  // Chart chronological progression (oldest to newest)
  const scoreProgressionData = [...history]
    .reverse()
    .map((item, index) => ({
      name: `Session ${index + 1}`,
      role: item.role,
      date: item.date.split(' ')[0],
      score: item.finalScore
    }));

  // Role frequency
  const roleCounts: Record<string, number> = {};
  history.forEach((h) => {
    roleCounts[h.role] = (roleCounts[h.role] || 0) + 1;
  });

  const roleDistributionData = Object.entries(roleCounts).map(([roleName, count]) => ({
    role: roleName.replace(' Developer', '').replace(' Engineer', ''),
    count
  }));

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <TrendingUp className="h-4 w-4" />
            <span>Candidate Analytics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Performance & Progress
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Longitudinal score improvement, competency benchmarks, and linguistic readiness.
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 text-xs font-bold shadow-sm transition-all self-start sm:self-auto cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>New Practice Session</span>
        </button>
      </div>

      {/* KPI Cards matching Section 13 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interviews Completed</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {totalInterviews}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Active candidate track
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Score</span>
          <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {averageScore}%
          </div>
          <span className="text-[11px] text-slate-400">
            Across all job roles
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Peak Performance</span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {highestScore}%
          </div>
          <span className="text-[11px] text-slate-400">
            Highest scored session
          </span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-1">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Questions Answered</span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            {totalQuestions}
          </div>
          <span className="text-[11px] text-slate-400">
            Processed with NLP
          </span>
        </div>
      </div>

      {/* Score Progression Line Chart (Section 13) */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-600" />
              Interview Score Progression Over Time
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluates upward trajectory in answer relevance, technical depth, and completeness.
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            +17% Net Improvement
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={scoreProgressionData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[40, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="rounded-xl bg-slate-900 p-3 text-white text-xs shadow-xl border border-slate-800">
                        <span className="font-bold text-indigo-300 block">{label}</span>
                        <div className="text-slate-300">{data.role}</div>
                        <div className="text-slate-400 text-[10px]">{data.date}</div>
                        <div className="text-emerald-400 font-bold mt-1 text-sm">
                          Score: {data.score}%
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5, fill: '#4f46e5', strokeWidth: 2, stroke: '#ffffff' }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Role Distribution & Benchmark Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Domain Distribution */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="h-4 w-4 text-sky-500" />
            Interview Practice by Track
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleDistributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.15} />
                <XAxis dataKey="role" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NLP Metric Breakdown */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-purple-500" />
            Linguistic Competency Averages
          </h3>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Semantic Relevance (35%)</span>
                <span className="font-bold text-slate-900 dark:text-white">82%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Technical Depth (30%)</span>
                <span className="font-bold text-slate-900 dark:text-white">76%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-2 rounded-full" style={{ width: '76%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Completeness & Coverage (20%)</span>
                <span className="font-bold text-slate-900 dark:text-white">71%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '71%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 dark:text-slate-300 font-medium">Communication & Clarity (15%)</span>
                <span className="font-bold text-slate-900 dark:text-white">89%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
