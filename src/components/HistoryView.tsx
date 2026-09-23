import React from 'react';
import { InterviewHistoryItem } from '../types';
import {
  History,
  Trash2,
  PlayCircle,
  Calendar,
  Briefcase,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface HistoryViewProps {
  history: InterviewHistoryItem[];
  onOpenReport: (item: InterviewHistoryItem) => void;
  onClearHistory: () => void;
  onStartNew: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onOpenReport,
  onClearHistory,
  onStartNew
}) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <History className="h-4 w-4" />
            <span>Interview Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Interview History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review past mock interview sessions, linguistic performance, and longitudinal score evolution.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History List or Empty State */}
      {history.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto">
            <History className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No Interviews Recorded Yet</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Once you complete your first mock interview, your detailed question evaluations and scores will be preserved here.
          </p>
          <button
            onClick={onStartNew}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start Your First Interview</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.role}
                  </h3>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                    {item.level}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-medium">
                    {item.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {item.durationMinutes ? `${item.durationMinutes} mins` : 'Completed'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    {item.questionCount} Questions Answered
                  </span>
                </div>
              </div>

              {/* Score & View Button */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Score
                  </span>
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                    {item.finalScore}%
                  </span>
                </div>

                <button
                  type="button"
                  id={`view-report-${item.id}`}
                  onClick={() => onOpenReport(item)}
                  className="flex items-center gap-1.5 rounded-xl bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3.5 py-2 text-xs font-bold transition-all cursor-pointer"
                >
                  <span>View Report →</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
