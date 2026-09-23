import React, { useState } from 'react';
import {
  ActiveTab,
  InterviewSession,
  InterviewHistoryItem,
  JobRole,
  ExperienceLevel,
  InterviewType,
  NLPAnalysisResult,
  UserProfile
} from './types';
import { getQuestionsForInterview } from './data/questionBanks';
import { generateFinalReport } from './nlp/engine';
import {
  getInterviewHistory,
  saveInterviewHistoryItem,
  clearInterviewHistory,
  getActiveSession,
  saveActiveSession,
  getUserProfile,
  ensureValidHistoryItem
} from './utils/storage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingView } from './components/LandingView';
import { SetupView } from './components/SetupView';
import { ChatView } from './components/ChatView';
import { ReportView } from './components/ReportView';
import { HistoryView } from './components/HistoryView';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { HowItWorksView } from './components/HowItWorksView';
import { NlpDocsView } from './components/NlpDocsView';
import { AcademicAboutView } from './components/AcademicAboutView';
import { ProfileView } from './components/ProfileView';
import { NlpInspectorModal } from './components/NlpInspectorModal';
import { SettingsModal } from './components/SettingsModal';
import { Menu } from 'lucide-react';

function AppContent() {
  const { isDark, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<ActiveTab>('landing');
  const [activeSession, setActiveSession] = useState<InterviewSession | null>(() => getActiveSession());
  const [viewingReportSession, setViewingReportSession] = useState<InterviewSession | null>(null);
  const [history, setHistory] = useState<InterviewHistoryItem[]>(() => getInterviewHistory());
  const [userProfile, setUserProfile] = useState<UserProfile>(() => getUserProfile());
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Inspector Modal State
  const [inspectData, setInspectData] = useState<{
    nlp: NLPAnalysisResult;
    questionText?: string;
  } | null>(null);

  // Handle Starting a Configured Interview
  const handleStartInterview = (config: {
    role: JobRole;
    level: ExperienceLevel;
    type: InterviewType;
    questionCount: number;
    voiceEnabled: boolean;
  }) => {
    const questions = getQuestionsForInterview(
      config.role,
      config.level,
      config.type,
      config.questionCount
    );

    const firstQuestion = questions[0];

    const initialSession: InterviewSession = {
      id: `session-${Date.now()}`,
      startTime: new Date().toISOString(),
      role: config.role,
      level: config.level,
      type: config.type,
      questionCount: questions.length,
      currentQuestionIndex: 0,
      questions,
      evaluations: [],
      voiceEnabled: config.voiceEnabled,
      isCompleted: false,
      messages: [
        {
          id: `msg-welcome-${Date.now()}`,
          sender: 'ai',
          text: `Hello and welcome to your ${config.role} (${config.level}) mock interview! I will be asking you ${questions.length} questions one by one. Take your time to structure your thoughts clearly.\n\nHere is Question 1:\n\n${firstQuestion.question}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          questionIndex: 0
        }
      ]
    };

    setActiveSession(initialSession);
    setViewingReportSession(null);
    saveActiveSession(initialSession);
    setActiveTab('chat');
  };

  // Handle Starting Instant 3-Question Demo Interview
  const handleStartDemo = () => {
    const questions = getQuestionsForInterview('Python Developer', 'Intermediate', 'Technical', 3);
    const firstQuestion = questions[0];

    const demoSession: InterviewSession = {
      id: `demo-${Date.now()}`,
      startTime: new Date().toISOString(),
      role: 'Python Developer',
      level: 'Intermediate',
      type: 'Technical',
      questionCount: 3,
      currentQuestionIndex: 0,
      questions,
      evaluations: [],
      voiceEnabled: true,
      isDemo: true,
      isCompleted: false,
      messages: [
        {
          id: `msg-demo-${Date.now()}`,
          sender: 'ai',
          text: `Welcome to the quick 3-Question Demo Interview for Python Developer (Intermediate)! You can answer using voice dictation, type your own thoughts, or click "Fill Sample Answer" for rapid academic testing.\n\nLet's begin with Question 1:\n\n${firstQuestion.question}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          questionIndex: 0
        }
      ]
    };

    setActiveSession(demoSession);
    setViewingReportSession(null);
    saveActiveSession(demoSession);
    setActiveTab('chat');
  };

  // Update session during chat
  const handleUpdateSession = (updatedSession: InterviewSession) => {
    setActiveSession(updatedSession);
    saveActiveSession(updatedSession);
  };

  // Interview Finished Handler
  const handleFinishInterview = async (completedSession: InterviewSession) => {
    // 1. Generate transparent algorithmic report from NLP engine
    const baseReport = generateFinalReport(
      completedSession.evaluations,
      completedSession.questions
    );

    // 2. Synthesize enhanced AI executive feedback via server proxy
    try {
      const res = await fetch('/api/interview/ai-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: completedSession.role,
          level: completedSession.level,
          finalScore: baseReport.overallScore,
          evaluations: completedSession.evaluations,
          strengths: baseReport.strengths,
          weaknesses: baseReport.weaknesses
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.personalizedFeedback) {
          baseReport.aiFeedback = data.personalizedFeedback;
        }
      }
    } catch (e) {
      console.warn('Using local feedback generator fallback:', e);
    }

    const finalSession: InterviewSession = {
      ...completedSession,
      isCompleted: true,
      finalReport: baseReport
    };

    // Calculate approximate duration
    const startTime = new Date(completedSession.startTime).getTime();
    const durationMinutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));

    // Save to history
    const historyItem: InterviewHistoryItem = {
      id: completedSession.id,
      date: new Date().toLocaleString([], {
        dateStyle: 'medium',
        timeStyle: 'short'
      }),
      role: completedSession.role,
      level: completedSession.level,
      type: completedSession.type,
      questionCount: completedSession.questions.length,
      finalScore: baseReport.overallScore,
      durationMinutes,
      sessionData: finalSession
    };

    saveInterviewHistoryItem(historyItem);
    setHistory(getInterviewHistory());

    setActiveSession(finalSession);
    setViewingReportSession(finalSession);
    saveActiveSession(finalSession);
    setActiveTab('report');
  };

  // Open a past report from History or Profile
  const handleOpenReportFromHistory = (item: InterviewHistoryItem) => {
    try {
      const validItem = ensureValidHistoryItem(item);
      if (validItem.sessionData && validItem.sessionData.finalReport) {
        setViewingReportSession(validItem.sessionData);
        setActiveTab('report');
      }
    } catch (err) {
      console.error('Failed to open report for history item:', err);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your interview records?')) {
      clearInterviewHistory();
      setHistory([]);
    }
  };

  // Determine which session to render in ReportView
  const reportSession = viewingReportSession || (activeSession?.finalReport ? activeSession : null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={isDark}
        setDarkMode={(val) => setTheme(val ? 'dark' : 'light')}
        hasActiveSession={Boolean(activeSession && !activeSession.isCompleted)}
        onStartDemo={handleStartDemo}
      />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeSession={activeSession}
          onNewInterview={() => setActiveTab('setup')}
          isOpenMobile={isMobileSidebarOpen}
          setIsOpenMobile={setIsMobileSidebarOpen}
          onOpenSettings={() => setIsSettingsOpen(true)}
          userProfile={userProfile}
        />

        {/* Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Mobile hamburger row */}
          <div className="md:hidden flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-2 text-xs font-semibold"
            >
              <Menu className="h-4 w-4" />
              <span>Menu</span>
            </button>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {activeTab.replace('-', ' ').toUpperCase()}
            </span>
          </div>

          {/* Active View Routing */}
          <div className="flex-1">
            {activeTab === 'landing' && (
              <LandingView
                onStartSetup={() => setActiveTab('setup')}
                onStartDemo={handleStartDemo}
                onHowItWorks={() => setActiveTab('how-it-works')}
              />
            )}

            {activeTab === 'setup' && (
              <SetupView
                onStartInterview={handleStartInterview}
                onStartDemo={handleStartDemo}
              />
            )}

            {activeTab === 'chat' && activeSession && (
              <ChatView
                session={activeSession}
                onUpdateSession={handleUpdateSession}
                onFinishInterview={handleFinishInterview}
                onInspectNlp={(nlp, qText) => setInspectData({ nlp, questionText: qText })}
              />
            )}

            {activeTab === 'report' && (
              reportSession ? (
                <ReportView
                  session={reportSession}
                  onNewInterview={() => setActiveTab('setup')}
                  onViewHistory={() => setActiveTab('history')}
                  onBackToHistory={() => setActiveTab('history')}
                  onInspectNlp={(nlp, qText) => setInspectData({ nlp, questionText: qText })}
                />
              ) : (
                <div className="w-full max-w-5xl mx-auto px-4 py-16 text-center space-y-4">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                    No Report Selected
                  </h2>
                  <p className="text-sm text-slate-500">
                    Select a completed interview from your history to view its detailed assessment report.
                  </p>
                  <button
                    onClick={() => setActiveTab('history')}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    View Interview History
                  </button>
                </div>
              )
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                onOpenReport={handleOpenReportFromHistory}
                onClearHistory={handleClearHistory}
                onStartNew={() => setActiveTab('setup')}
              />
            )}

            {activeTab === 'performance' && (
              <PerformanceDashboard
                history={history}
                onStartNew={() => setActiveTab('setup')}
              />
            )}

            {activeTab === 'how-it-works' && (
              <HowItWorksView
                onStartSetup={() => setActiveTab('setup')}
                onExploreNlp={() => setActiveTab('nlp-docs')}
              />
            )}

            {activeTab === 'nlp-docs' && <NlpDocsView />}

            {activeTab === 'academic-about' && <AcademicAboutView />}

            {activeTab === 'profile' && (
              <ProfileView
                history={history}
                onBack={() => setActiveTab('landing')}
                onOpenReport={handleOpenReportFromHistory}
                onStartNew={() => setActiveTab('setup')}
                onProfileUpdated={(updated) => setUserProfile(updated)}
              />
            )}
          </div>
        </main>
      </div>

      {/* Global NLP Inspector Modal */}
      {inspectData && (
        <NlpInspectorModal
          nlpData={inspectData.nlp}
          questionText={inspectData.questionText}
          onClose={() => setInspectData(null)}
        />
      )}

      {/* Global Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        darkMode={isDark}
        setDarkMode={(val) => setTheme(val ? 'dark' : 'light')}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
