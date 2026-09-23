import React, { useState } from 'react';
import { InterviewHistoryItem, UserProfile, JobRole } from '../types';
import {
  getUserProfile,
  saveUserProfile
} from '../utils/storage';
import {
  User,
  ArrowLeft,
  Edit3,
  Check,
  X,
  Award,
  TrendingUp,
  Target,
  Brain,
  MessageSquare,
  Sparkles,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Briefcase
} from 'lucide-react';

interface ProfileViewProps {
  history: InterviewHistoryItem[];
  onBack: () => void;
  onOpenReport: (item: InterviewHistoryItem) => void;
  onStartNew: () => void;
  onProfileUpdated?: (profile: UserProfile) => void;
}

const AVAILABLE_ROLES: JobRole[] = [
  'Python Developer',
  'Web Developer',
  'Software Engineer',
  'Java Developer',
  'Data Analyst',
  'Machine Learning Engineer',
  'General Interview'
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  history,
  onBack,
  onOpenReport,
  onStartNew,
  onProfileUpdated
}) => {
  const [profile, setProfile] = useState<UserProfile>(() => getUserProfile());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(profile.name);
  const [editPrimaryRole, setEditPrimaryRole] = useState<string>(profile.primaryRole || 'Python Developer');
  const [editPreferredRoles, setEditPreferredRoles] = useState<string[]>(profile.preferredRoles);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Derive initials for avatar
  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CN';

  // Calculate actual statistics from history
  const interviewsCompleted = history.length;

  const averageScore = interviewsCompleted > 0
    ? Math.round(history.reduce((sum, item) => sum + (item.finalScore || item.sessionData?.finalReport?.overallScore || 0), 0) / interviewsCompleted)
    : 0;

  const bestScore = interviewsCompleted > 0
    ? Math.max(...history.map((item) => item.finalScore || item.sessionData?.finalReport?.overallScore || 0))
    : 0;

  const totalQuestionsAnswered = history.reduce(
    (sum, item) => sum + (item.questionCount || item.sessionData?.questions?.length || item.sessionData?.evaluations?.length || 0),
    0
  );

  const technicalScores = history
    .map((item) => item.sessionData?.finalReport?.technicalScore)
    .filter((s): s is number => typeof s === 'number');
  const averageTechnicalScore = technicalScores.length > 0
    ? Math.round(technicalScores.reduce((a, b) => a + b, 0) / technicalScores.length)
    : (interviewsCompleted > 0 ? averageScore : 0);

  const relevanceScores = history
    .map((item) => item.sessionData?.finalReport?.relevanceScore)
    .filter((s): s is number => typeof s === 'number');
  const averageRelevanceScore = relevanceScores.length > 0
    ? Math.round(relevanceScores.reduce((a, b) => a + b, 0) / relevanceScores.length)
    : (interviewsCompleted > 0 ? averageScore : 0);

  const clarityScores = history
    .map((item) => item.sessionData?.finalReport?.clarityScore)
    .filter((s): s is number => typeof s === 'number');
  const averageClarityScore = clarityScores.length > 0
    ? Math.round(clarityScores.reduce((a, b) => a + b, 0) / clarityScores.length)
    : (interviewsCompleted > 0 ? 85 : 0);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated: UserProfile = {
      ...profile,
      name: editName.trim() || 'Candidate',
      primaryRole: editPrimaryRole,
      preferredRoles: editPreferredRoles.length > 0 ? editPreferredRoles : [editPrimaryRole]
    };

    saveUserProfile(updated);
    setProfile(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    if (onProfileUpdated) onProfileUpdated(updated);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleToggleRole = (role: string) => {
    if (editPreferredRoles.includes(role)) {
      if (editPreferredRoles.length > 1) {
        setEditPreferredRoles(editPreferredRoles.filter((r) => r !== role));
      }
    } else {
      setEditPreferredRoles([...editPreferredRoles, role]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:px-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <button
          type="button"
          id="profile-back-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/60 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Close / Back</span>
        </button>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
              <Check className="h-3.5 w-3.5" />
              <span>Profile Saved Successfully</span>
            </span>
          )}
          {!isEditing && (
            <button
              type="button"
              id="edit-profile-btn"
              onClick={() => {
                setEditName(profile.name);
                setEditPrimaryRole(profile.primaryRole);
                setEditPreferredRoles(profile.preferredRoles);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Header & Identity Card */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Edit Candidate Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Candidate Name
                </label>
                <input
                  type="text"
                  id="profile-name-input"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full sm:max-w-md px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
                  Primary Preferred Role
                </label>
                <select
                  id="profile-primary-role-select"
                  value={editPrimaryRole}
                  onChange={(e) => {
                    setEditPrimaryRole(e.target.value);
                    if (!editPreferredRoles.includes(e.target.value)) {
                      setEditPreferredRoles([...editPreferredRoles, e.target.value]);
                    }
                  }}
                  className="w-full sm:max-w-md px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {AVAILABLE_ROLES.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Select Preferred Roles (Click to toggle)
                </label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ROLES.map((role) => {
                    const isSelected = editPreferredRoles.includes(role);
                    return (
                      <button
                        type="button"
                        key={role}
                        onClick={() => handleToggleRole(role)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-700 dark:text-indigo-300'
                            : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {role}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                type="submit"
                id="save-profile-btn"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Check className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white font-extrabold text-xl shadow-md shrink-0">
                {initials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {profile.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </span>
                </div>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  Profile Type: <span className="text-slate-700 dark:text-slate-300 font-normal">{profile.profileType}</span>
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mr-1">
                    Preferred Roles:
                  </span>
                  {profile.preferredRoles.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-0.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={onStartNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Start New Mock Interview</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Calculated Interview Statistics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              Candidate Performance Analytics
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated directly from your completed interview history and NLP linguistic evaluations.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
            {interviewsCompleted} {interviewsCompleted === 1 ? 'Session' : 'Sessions'} Recorded
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Card 1: Interviews Completed */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Interviews Completed</span>
              <Award className="h-4 w-4 text-indigo-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {interviewsCompleted}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Mock sessions completed
            </p>
          </div>

          {/* Card 2: Average Score */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Average Score</span>
              <TrendingUp className="h-4 w-4 text-sky-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 font-mono">
              {averageScore}%
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Across all evaluations
            </p>
          </div>

          {/* Card 3: Best Score */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Best Score</span>
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {bestScore}%
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Peak evaluation record
            </p>
          </div>

          {/* Card 4: Total Questions Answered */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Questions</span>
              <MessageSquare className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {totalQuestionsAnswered}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Questions answered & scored
            </p>
          </div>
        </div>

        {/* 3 Detailed Average NLP Competency Scores */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
          {/* Average Technical Score */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Average Technical Score
              </span>
              <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                {averageTechnicalScore}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${averageTechnicalScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Concept alignment, keyword accuracy & technical depth
            </p>
          </div>

          {/* Average Relevance Score */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Average Relevance Score
              </span>
              <span className="text-lg font-black text-sky-600 dark:text-sky-400 font-mono">
                {averageRelevanceScore}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-sky-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${averageRelevanceScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              TF-IDF cosine similarity & prompt focus adherence
            </p>
          </div>

          {/* Average Clarity Score */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Average Clarity Score
              </span>
              <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                {averageClarityScore}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${averageClarityScore}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Structural coherence, conciseness & tone polish
            </p>
          </div>
        </div>
      </div>

      {/* Recent Interviews List */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
          Completed Interviews
        </h3>

        {history.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center space-y-3">
            <Brain className="h-8 w-8 text-slate-400 mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              No interview records found yet.
            </p>
            <button
              onClick={onStartNew}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Start an Interview
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {history.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-[10px] font-bold border border-indigo-200/50 dark:border-indigo-800/50">
                      {item.level}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {item.durationMinutes} mins
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Score
                    </span>
                    <span className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-mono">
                      {item.finalScore}%
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenReport(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all cursor-pointer"
                  >
                    <span>View Report</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
