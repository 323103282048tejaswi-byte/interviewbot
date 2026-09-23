import React, { useState } from 'react';
import {
  JobRole,
  ExperienceLevel,
  InterviewType,
  QuestionCount
} from '../types';
import {
  Briefcase,
  Layers,
  HelpCircle,
  Hash,
  Mic,
  MicOff,
  Sparkles,
  ArrowRight,
  Code2,
  Cpu,
  Globe,
  Database,
  Terminal,
  Users
} from 'lucide-react';

interface SetupViewProps {
  onStartInterview: (config: {
    role: JobRole;
    level: ExperienceLevel;
    type: InterviewType;
    questionCount: number;
    voiceEnabled: boolean;
  }) => void;
  onStartDemo: () => void;
}

const ROLES: { role: JobRole; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { role: 'Python Developer', desc: 'Data structures, OOP, GIL, Asyncio, Decorators', icon: Terminal },
  { role: 'Java Developer', desc: 'JVM, Garbage Collection, Spring, Multithreading', icon: Code2 },
  { role: 'Web Developer', desc: 'DOM, React Virtual DOM, SSR, Web Vitals, Security', icon: Globe },
  { role: 'Data Analyst', desc: 'SQL Window Functions, Pandas, A/B Testing, KPIs', icon: Database },
  { role: 'Machine Learning Engineer', desc: 'Transformers, Attention, Overfitting, Optimization', icon: Cpu },
  { role: 'Software Engineer', desc: 'Data Structures, Algorithms, SOLID, System Design', icon: Briefcase },
  { role: 'General Interview', desc: 'Behavioral, STAR method, Leadership & Crisis Mgmt', icon: Users }
];

export const SetupView: React.FC<SetupViewProps> = ({ onStartInterview, onStartDemo }) => {
  const [role, setRole] = useState<JobRole>('Python Developer');
  const [level, setLevel] = useState<ExperienceLevel>('Intermediate');
  const [type, setType] = useState<InterviewType>('Technical');
  const [questionCount, setQuestionCount] = useState<QuestionCount>(5);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    onStartInterview({
      role,
      level,
      type,
      questionCount,
      voiceEnabled
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Step 2 — Interview Configuration</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Configure Your Mock Interview
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Tailor the role domain, question difficulty, and evaluation style for a realistic practice experience.
        </p>
      </div>

      <form onSubmit={handleStart} className="space-y-8">
        {/* Step 1: Select Job Role */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. Select Job Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ROLES.map((item) => {
              const Icon = item.icon;
              const isSelected = role === item.role;
              return (
                <div
                  key={item.role}
                  id={`role-option-${item.role.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setRole(item.role)}
                  className={`cursor-pointer rounded-2xl p-4 border transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.role}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2 & 3: Experience Level & Interview Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Experience Level */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              2. Select Experience Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as ExperienceLevel[]).map((lvl) => {
                const isSelected = level === lvl;
                return (
                  <button
                    type="button"
                    key={lvl}
                    id={`level-option-${lvl.toLowerCase()}`}
                    onClick={() => setLevel(lvl)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {lvl}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {level === 'Beginner' && 'Focuses on syntax, core definitions, and foundational concepts.'}
              {level === 'Intermediate' && 'Focuses on architectural patterns, memory, and practical problem solving.'}
              {level === 'Advanced' && 'Deep dives into concurrency, runtime internals, and system optimizations.'}
            </p>
          </div>

          {/* Interview Type */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              3. Select Interview Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Technical', 'HR', 'Mixed'] as InterviewType[]).map((t) => {
                const isSelected = type === t;
                return (
                  <button
                    type="button"
                    key={t}
                    id={`type-option-${t.toLowerCase()}`}
                    onClick={() => setType(t)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {type === 'Technical' && 'Strictly evaluates technical competence, algorithms, and domain knowledge.'}
              {type === 'HR' && 'Assesses soft skills, STAR method stories, and workplace culture.'}
              {type === 'Mixed' && 'A realistic blend of technical domain questions with behavioral scenarios.'}
            </p>
          </div>
        </div>

        {/* Step 4 & 5: Number of Questions & Voice Option */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Question Count */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              4. Number of Questions
            </label>
            <div className="grid grid-cols-3 gap-2">
              {([5, 10, 15] as QuestionCount[]).map((count) => {
                const isSelected = questionCount === count;
                return (
                  <button
                    type="button"
                    key={count}
                    id={`count-option-${count}`}
                    onClick={() => setQuestionCount(count)}
                    className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {count} Questions
                  </button>
                );
              })}
            </div>
          </div>

          {/* Voice Input Toggle */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              5. Optional Input Mode
            </label>
            <div
              id="voice-input-toggle-box"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                voiceEnabled
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    voiceEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {voiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">Enable Voice Input</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Dictate answers via speech-to-text with inline editing
                  </p>
                </div>
              </div>

              <div
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  voiceEnabled ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    voiceEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            id="setup-try-demo-btn"
            onClick={onStartDemo}
            className="w-full sm:w-auto text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 p-2 text-center"
          >
            ⚡ Or run 3-question instant demo mode
          </button>

          <button
            type="submit"
            id="setup-start-interview-btn"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 text-sm font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
          >
            <span>Start Interview</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
