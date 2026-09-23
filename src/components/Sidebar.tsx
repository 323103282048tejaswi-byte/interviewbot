import React from 'react';
import { ActiveTab, InterviewSession, UserProfile } from '../types';
import {
  Bot,
  PlusCircle,
  MessageSquare,
  History,
  TrendingUp,
  Settings,
  HelpCircle,
  FileCode,
  GraduationCap,
  User,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  activeSession: InterviewSession | null;
  onNewInterview: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onOpenSettings: () => void;
  userProfile?: UserProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeSession,
  onNewInterview,
  isOpenMobile,
  setIsOpenMobile,
  onOpenSettings,
  userProfile
}) => {
  const hasActiveSession = Boolean(activeSession && !activeSession.isCompleted);

  const profileName = userProfile?.name || 'Candidate';
  const profileInitials = profileName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'CN';

  const navItems = [
    {
      id: 'sidebar-new-interview',
      tab: 'setup' as ActiveTab,
      label: 'New Interview',
      icon: PlusCircle,
      action: onNewInterview,
      badge: 'Start'
    },
    {
      id: 'sidebar-current-interview',
      tab: 'chat' as ActiveTab,
      label: 'Current Interview',
      icon: MessageSquare,
      disabled: !hasActiveSession,
      badge: hasActiveSession ? `Q${(activeSession?.currentQuestionIndex ?? 0) + 1}/${activeSession?.questionCount}` : undefined
    },
    {
      id: 'sidebar-history',
      tab: 'history' as ActiveTab,
      label: 'Interview History',
      icon: History
    },
    {
      id: 'sidebar-performance',
      tab: 'performance' as ActiveTab,
      label: 'Performance',
      icon: TrendingUp
    },
    {
      id: 'sidebar-how-it-works',
      tab: 'how-it-works' as ActiveTab,
      label: 'How It Works',
      icon: HelpCircle
    },
    {
      id: 'sidebar-nlp-docs',
      tab: 'nlp-docs' as ActiveTab,
      label: 'NLP Technology',
      icon: FileCode
    },
    {
      id: 'sidebar-academic',
      tab: 'academic-about' as ActiveTab,
      label: 'Academic Viva / Info',
      icon: GraduationCap
    },
    {
      id: 'sidebar-candidate-profile-nav',
      tab: 'profile' as ActiveTab,
      label: 'Candidate Profile',
      icon: User
    }
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-left-sidebar"
        className={`fixed md:static inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-transform duration-300 md:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Header / Branding */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => {
                setActiveTab('landing');
                setIsOpenMobile(false);
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white shadow-sm">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white tracking-tight">InterviewBot</span>
                <span className="block text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                  AI Mock Interviewer
                </span>
              </div>
            </div>

            <button
              id="sidebar-settings-quick"
              onClick={onOpenSettings}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>

          {/* Quick active interview banner in sidebar */}
          {hasActiveSession && (
            <div className="mt-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 p-2.5 border border-indigo-200/50 dark:border-indigo-800/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300">
                  Active Session
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400 truncate">
                {activeSession?.role} • {activeSession?.level}
              </p>
            </div>
          )}
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.id}
                id={item.id}
                disabled={item.disabled}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    setActiveTab(item.tab);
                  }
                  setIsOpenMobile(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  item.disabled
                    ? 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-600'
                    : isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 dark:border-indigo-800/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Profile at Bottom (as specified in Section 3) */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            type="button"
            id="sidebar-candidate-profile"
            onClick={() => {
              setActiveTab('profile');
              setIsOpenMobile(false);
            }}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-indigo-50 border-indigo-300 dark:bg-indigo-950/70 dark:border-indigo-700 ring-2 ring-indigo-500/20'
                : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100/70 dark:hover:bg-slate-800 shadow-2xs'
            }`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-sky-500 text-white font-bold text-xs shrink-0">
              {profileInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {profileName}
                </span>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {userProfile?.profileType || 'NLP Academic Demo Mode'}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
};
