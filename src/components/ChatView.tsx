import React, { useState, useEffect, useRef } from 'react';
import {
  InterviewSession,
  InterviewMessage,
  NLPAnalysisResult,
  Question
} from '../types';
import { evaluateAnswer } from '../nlp/engine';
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Sparkles,
  Cpu,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Info,
  Clock,
  RotateCcw,
  ArrowRight,
  XCircle
} from 'lucide-react';

interface ChatViewProps {
  session: InterviewSession;
  onUpdateSession: (session: InterviewSession) => void;
  onFinishInterview: (session: InterviewSession) => void;
  onInspectNlp: (nlp: NLPAnalysisResult, questionText?: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  session,
  onUpdateSession,
  onFinishInterview,
  onInspectNlp
}) => {
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Separate state variables for speech recognition (Requirement 4)
  const [, setBaseText] = useState('');
  const [, setFinalTranscript] = useState('');
  const [, setInterimTranscript] = useState('');

  // Refs to avoid stale closures in SpeechRecognition callbacks (Requirement 10)
  const baseTextRef = useRef('');
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const nextFinalIndexRef = useRef(0);
  const isListeningRef = useRef(false);

  // Safely combines the base text, finalized transcripts, and interim transcript
  const combineTranscripts = (base: string, finalPart: string, interimPart: string): string => {
    const parts = [base.trim(), finalPart.trim(), interimPart.trim()].filter(Boolean);
    return parts.join(' ');
  };

  // Cleanup active recognition instance and detach listeners (Requirements 9 & 11)
  const cleanupRecognition = () => {
    if (recognitionRef.current) {
      const rec = recognitionRef.current;
      recognitionRef.current = null;
      try {
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.onstart = null;
        rec.stop();
      } catch (_) {
        try {
          rec.abort();
        } catch (__) {}
      }
    }
  };

  // Commit final transcript exactly once and clear temporary recognition state (Requirement 8)
  const handleRecognitionEnd = () => {
    if (
      !isListeningRef.current &&
      !baseTextRef.current &&
      !finalTranscriptRef.current &&
      !interimTranscriptRef.current
    ) {
      return;
    }

    const committed = combineTranscripts(
      baseTextRef.current,
      finalTranscriptRef.current,
      interimTranscriptRef.current
    );
    setInputText(committed);

    // Clear temporary recognition state
    baseTextRef.current = '';
    setBaseText('');
    finalTranscriptRef.current = '';
    setFinalTranscript('');
    interimTranscriptRef.current = '';
    setInterimTranscript('');
    nextFinalIndexRef.current = 0;

    setIsListening(false);
    isListeningRef.current = false;
  };

  // Stop active recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {
        handleRecognitionEnd();
      }
    } else {
      handleRecognitionEnd();
    }
  };

  // Start fresh speech recognition session (Requirements 7, 9, 10, 11)
  const startListening = () => {
    setSpeechError(null);

    // Stop and cleanup any existing recognition instance (Requirements 9 & 11)
    cleanupRecognition();

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setSpeechError('Speech recognition is not supported in this browser environment.');
      return;
    }

    // Store the current textbox value as baseText (Requirement 7)
    const currentBase = inputText.trim();
    baseTextRef.current = currentBase;
    setBaseText(currentBase);

    // Reset current recognition session's finalTranscript and interimTranscript (Requirement 7)
    finalTranscriptRef.current = '';
    setFinalTranscript('');
    interimTranscriptRef.current = '';
    setInterimTranscript('');
    nextFinalIndexRef.current = 0;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
      };

      // Process SpeechRecognition onresult events without duplication (Requirements 3, 5, 6)
      recognition.onresult = (event: any) => {
        if (!event.results) return;

        let newlyFinalized = '';
        let currentInterim = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (!res || !res[0]) continue;
          const transcriptPart = res[0].transcript || '';

          if (res.isFinal) {
            // Process only the newly finalized result indexes. Do not add already-finalized results again (Req 5 & 6)
            if (i >= nextFinalIndexRef.current) {
              const piece = transcriptPart.trim();
              if (piece) {
                newlyFinalized = newlyFinalized ? `${newlyFinalized} ${piece}` : piece;
              }
              nextFinalIndexRef.current = i + 1;
            }
          } else {
            // Collect active interim speech for this event
            const piece = transcriptPart.trim();
            if (piece) {
              currentInterim = currentInterim ? `${currentInterim} ${piece}` : piece;
            }
          }
        }

        // Update final transcript if new finalized results occurred
        if (newlyFinalized) {
          finalTranscriptRef.current = finalTranscriptRef.current
            ? `${finalTranscriptRef.current} ${newlyFinalized}`.trim()
            : newlyFinalized;
          setFinalTranscript(finalTranscriptRef.current);
        }

        // Interim transcript is the non-final speech segment for this event
        interimTranscriptRef.current = currentInterim;
        setInterimTranscript(currentInterim);

        // Display: baseText + finalTranscript + interimTranscript (Requirement 5)
        const combined = combineTranscripts(
          baseTextRef.current,
          finalTranscriptRef.current,
          interimTranscriptRef.current
        );
        setInputText(combined);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission denied. You can continue typing your answer.');
        } else if (event.error !== 'no-speech') {
          setSpeechError(`Speech recognition notice: ${event.error}`);
        }
        setIsListening(false);
        isListeningRef.current = false;
      };

      // On recognition end, commit final transcript exactly once (Requirement 8)
      recognition.onend = () => {
        handleRecognitionEnd();
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Could not start recognition:', err);
      setIsListening(false);
      isListeningRef.current = false;
      setSpeechError('Could not start microphone. Please check permissions.');
    }
  };

  // Check initial browser support and cleanup on unmount
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }

    return () => {
      cleanupRecognition();
    };
  }, []);

  // Cleanup speech recognition when current question changes
  useEffect(() => {
    cleanupRecognition();
    setIsListening(false);
    isListeningRef.current = false;
    baseTextRef.current = '';
    setBaseText('');
    finalTranscriptRef.current = '';
    setFinalTranscript('');
    interimTranscriptRef.current = '';
    setInterimTranscript('');
    nextFinalIndexRef.current = 0;
  }, [session.currentQuestionIndex]);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [session.messages, isAiThinking]);

  // Voice toggle
  const toggleListening = () => {
    if (isListeningRef.current) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Submit Answer handler
  const handleSend = async () => {
    if (isListeningRef.current) {
      const currentCommitted = combineTranscripts(
        baseTextRef.current,
        finalTranscriptRef.current,
        interimTranscriptRef.current
      );
      cleanupRecognition();
      baseTextRef.current = '';
      setBaseText('');
      finalTranscriptRef.current = '';
      setFinalTranscript('');
      interimTranscriptRef.current = '';
      setInterimTranscript('');
      nextFinalIndexRef.current = 0;
      setIsListening(false);
      isListeningRef.current = false;
      if (currentCommitted) {
        setInputText(currentCommitted);
      }
    }

    const trimmed = (textareaRef.current?.value || inputText).trim();
    if (!trimmed || isAiThinking) return;

    const currentQuestionIndex = session.currentQuestionIndex;
    const currentQuestion = session.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    // 1. Run rigorous NLP processing pipeline on the candidate's answer
    const nlpResult = evaluateAnswer(trimmed, currentQuestion);

    // 2. Add user message with attached NLP result
    const userMsg: InterviewMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      questionId: currentQuestion.id,
      questionIndex: currentQuestionIndex,
      nlpAnalysis: nlpResult
    };

    // 3. Add explicit Answer Evaluation message
    const evalMsg: InterviewMessage = {
      id: `msg-eval-${Date.now()}`,
      sender: 'ai',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      questionId: currentQuestion.id,
      questionIndex: currentQuestionIndex,
      nlpAnalysis: nlpResult,
      isEvaluation: true
    };

    const updatedEvaluations = [...session.evaluations, nlpResult];
    const updatedMessages = [...session.messages, userMsg, evalMsg];

    const updatedSession: InterviewSession = {
      ...session,
      messages: updatedMessages,
      evaluations: updatedEvaluations
    };

    onUpdateSession(updatedSession);
    setInputText('');
  };

  // Continue to Next Question handler (Explicit User Action - No Auto Advance)
  const handleContinueNext = async () => {
    const currentQuestionIndex = session.currentQuestionIndex;
    const nextIndex = currentQuestionIndex + 1;
    const isLastQuestion = nextIndex >= session.questions.length;

    if (isLastQuestion) {
      const completedSession: InterviewSession = {
        ...session,
        isCompleted: true
      };
      onUpdateSession(completedSession);
      onFinishInterview(completedSession);
      return;
    }

    const nextQuestion = session.questions[nextIndex];
    if (!nextQuestion) return;

    setIsAiThinking(true);

    const nextQMsg: InterviewMessage = {
      id: `msg-ai-${Date.now()}`,
      sender: 'ai',
      text: `Question ${nextIndex + 1}:\n\n${nextQuestion.question}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      questionIndex: nextIndex
    };

    const finalUpdatedSession: InterviewSession = {
      ...session,
      currentQuestionIndex: nextIndex,
      messages: [...session.messages, nextQMsg]
    };

    onUpdateSession(finalUpdatedSession);
    setIsAiThinking(false);

    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Progress metrics
  const totalQuestions = session.questions.length;
  const currentQNum = Math.min(session.currentQuestionIndex + 1, totalQuestions);
  const progressPercent = Math.round((session.evaluations.length / totalQuestions) * 100);

  const lastMessage = session.messages[session.messages.length - 1];
  const isWaitingToContinue = Boolean(lastMessage && lastMessage.isEvaluation);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto w-full">
      {/* Top Header matching Section 3 */}
      <div
        id="chat-header-bar"
        className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">AI Mock Interview</h2>
              <span className="rounded-md bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                {session.role}
              </span>
              <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                {session.level}
              </span>
              {session.isDemo && (
                <span className="rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 px-2 py-0.5 text-[10px] font-bold border border-amber-300 dark:border-amber-800">
                  Demo Mode
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Evaluating one question at a time using automated NLP processing
            </p>
          </div>
        </div>

        {/* Progress Display */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              Question {currentQNum} / {totalQuestions}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {progressPercent}% Completed
            </div>
          </div>

          <div className="w-24 sm:w-32 bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-200 dark:border-slate-700">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Message Stream */}
      <div
        id="chat-message-stream"
        className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/40 dark:bg-slate-950/40"
      >
        {session.messages.map((msg, index) => {
          // If this is an Answer Evaluation Card message
          if (msg.isEvaluation && msg.nlpAnalysis) {
            const nlp = msg.nlpAnalysis;
            const isPendingContinue = index === session.messages.length - 1;
            const nextQIndex = (msg.questionIndex ?? 0) + 1;
            const isLastQ = nextQIndex >= session.questions.length;
            const qText = session.questions[msg.questionIndex ?? 0]?.question;

            if (nlp.isHrQuestion) {
              const classification = nlp.communicationClassification ||
                (nlp.scores.overallScore >= 80 ? 'Strong' : nlp.scores.overallScore >= 65 ? 'Good' : nlp.scores.overallScore >= 45 ? 'Needs Improvement' : 'Not Relevant');

              const isStrong = classification === 'Strong';
              const isGood = classification === 'Good';
              const isNeedsImprovement = classification === 'Needs Improvement';

              const badgeStyle = isStrong
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : isGood
                ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800'
                : isNeedsImprovement
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
                : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800';

              const statusEmoji = isStrong ? '🌟' : isGood ? '👍' : isNeedsImprovement ? '📝' : '⚠️';

              return (
                <div
                  key={msg.id || index}
                  id={`hr-evaluation-card-${index}`}
                  className="w-full max-w-2xl mx-auto my-3 rounded-2xl border border-indigo-200/80 dark:border-indigo-900/60 bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in duration-200"
                >
                  {/* Header: Communication Evaluation */}
                  <div className="px-5 py-3.5 border-b border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/40 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{statusEmoji}</span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        Communication Evaluation
                      </h4>
                      <span className={`ml-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle}`}>
                        {classification}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-slate-400 font-medium">Score:</span>
                      <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                        {nlp.scores.overallScore}%
                      </span>
                    </div>
                  </div>

                  {/* 5 HR Communication Scores */}
                  <div className="p-5 space-y-3.5">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Relevance</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                          {nlp.scores.relevanceScore}%
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Clarity</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                          {nlp.scores.clarityScore}%
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Grammar</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                          {nlp.scores.grammarScore ?? 85}%
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Structure</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                          {nlp.scores.structureScore ?? 80}%
                        </span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center col-span-2 sm:col-span-1">
                        <span className="text-[10px] uppercase font-semibold text-slate-400 block truncate">Completeness</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                          {nlp.scores.completenessScore}%
                        </span>
                      </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="p-3.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40">
                      <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 block mb-1">
                        Feedback:
                      </span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                        {nlp.feedback}
                      </p>
                    </div>

                    {/* NLP Transparency Trigger */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        id={`inspect-nlp-btn-${index}`}
                        onClick={() => onInspectNlp(nlp, qText)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
                        title="Inspect tokenization, keywords, key phrases, and grammar observations"
                      >
                        <Cpu className="h-3.5 w-3.5" />
                        <span>View NLP Analysis</span>
                      </button>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Continue Button Section */}
                    {isPendingContinue && (
                      <div className="mt-3 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          {isLastQ ? 'All questions answered! Review is complete.' : "Let's move to the next question."}
                        </span>
                        <button
                          type="button"
                          id="continue-next-question-btn"
                          onClick={handleContinueNext}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                        >
                          <span>{isLastQ ? 'View Final Report' : 'Continue → Next Question'}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            }

            const isCorrect = nlp.correctness === 'Correct';
            const isMostlyCorrect = nlp.correctness === 'Mostly Correct';
            const isPartiallyCorrect = nlp.correctness === 'Partially Correct';
            const isIncorrect = nlp.correctness === 'Incorrect / Not Relevant';

            const badgeStyle = isCorrect
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
              : isMostlyCorrect
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800'
              : isPartiallyCorrect
              ? 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800'
              : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800';

            const statusEmoji = isCorrect ? '✅' : isMostlyCorrect ? '🟡' : isPartiallyCorrect ? '🟠' : '❌';

            return (
              <div
                key={msg.id || index}
                id={`evaluation-card-${index}`}
                className="w-full max-w-2xl mx-auto my-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden animate-in fade-in duration-200"
              >
                {/* Header matching Example: ✅ Answer Evaluation */}
                <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{statusEmoji}</span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Answer Evaluation
                    </h4>
                    <span className={`ml-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeStyle}`}>
                      {nlp.correctness}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-400 font-medium">Score:</span>
                    <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                      {nlp.scores.overallScore}%
                    </span>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="p-5 space-y-3.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Correctness</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 truncate">
                        {nlp.correctness}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Relevance</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                        {nlp.scores.relevanceScore}%
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Technical Accuracy</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                        {nlp.scores.technicalScore}%
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block">Completeness</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mt-0.5 font-mono">
                        {nlp.scores.completenessScore}%
                      </span>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="p-3.5 rounded-xl bg-indigo-50/30 dark:bg-indigo-950/20 border border-indigo-100/80 dark:border-indigo-900/40">
                    <span className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 block mb-1">
                      Feedback:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                      {nlp.feedback}
                    </p>
                    {isIncorrect && nlp.expectedConceptHighlight && (
                      <div className="mt-2 pt-2 border-t border-indigo-100/60 dark:border-indigo-900/40 text-xs">
                        <span className="font-semibold text-rose-600 dark:text-rose-400">Expected concept: </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">"{nlp.expectedConceptHighlight}"</span>
                      </div>
                    )}
                  </div>

                  {/* NLP Transparency Trigger */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      id={`inspect-nlp-btn-${index}`}
                      onClick={() => onInspectNlp(nlp, qText)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
                      title="Inspect tokenization, keywords, and semantic scores"
                    >
                      <Cpu className="h-3.5 w-3.5" />
                      <span>View NLP Analysis</span>
                    </button>

                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Continue Button Section */}
                  {isPendingContinue && (
                    <div className="mt-3 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                        {isLastQ ? 'All questions answered! Review is complete.' : "Let's move to the next question."}
                      </span>
                      <button
                        type="button"
                        id="continue-next-question-btn"
                        onClick={handleContinueNext}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>{isLastQ ? 'View Final Report' : 'Continue → Next Question'}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          const isAi = msg.sender === 'ai';

          return (
            <div
              key={msg.id || index}
              className={`flex items-start gap-3 max-w-3xl ${
                isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'
              } animate-in fade-in duration-200`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-2xs ${
                  isAi
                    ? 'bg-indigo-600 text-white'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {isAi ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1.5 max-w-[85%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-2xs ${
                    isAi
                      ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800'
                      : 'bg-indigo-600 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Sub-bar: Timestamp + NLP Inspector trigger for user messages */}
                <div
                  className={`flex items-center gap-2 text-[11px] text-slate-400 ${
                    isAi ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {msg.timestamp}
                  </span>

                  {msg.nlpAnalysis && (
                    <button
                      id={`inspect-nlp-btn-${index}`}
                      onClick={() => {
                        const qIndex = msg.questionIndex ?? 0;
                        const qText = session.questions[qIndex]?.question;
                        onInspectNlp(msg.nlpAnalysis!, qText);
                      }}
                      className="inline-flex items-center gap-1 rounded-md bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors cursor-pointer"
                      title="Inspect NLP Preprocessing, Keywords & Similarity calculation"
                    >
                      <Cpu className="h-3 w-3" />
                      <span>NLP Score: {msg.nlpAnalysis.scores.overallScore}%</span>
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* AI Typing Indicator */}
        {isAiThinking && (
          <div className="flex items-center gap-3 mr-auto animate-in fade-in duration-150">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                AI Interviewer is preparing next question...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input / Control Area */}
      <div
        id="chat-input-container"
        className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
      >
        {speechError && (
          <div className="mb-2 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{speechError}</span>
          </div>
        )}

        {isListening && (
          <div className="mb-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="font-semibold">Microphone active — Listening to your answer...</span>
            </div>
            <button
              onClick={toggleListening}
              className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[10px]"
            >
              Stop
            </button>
          </div>
        )}

        {isWaitingToContinue ? (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                  Answer Evaluated
                </h5>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Review your evaluation above and click Continue to proceed to the next question.
                </p>
              </div>
            </div>
            <button
              type="button"
              id="bottom-continue-next-btn"
              onClick={handleContinueNext}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              <span>
                {session.currentQuestionIndex + 1 >= session.questions.length
                  ? 'View Final Report'
                  : 'Continue → Next Question'}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600/20 transition-all shadow-sm">
            <textarea
              ref={textareaRef}
              id="candidate-answer-textarea"
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isAiThinking || session.isCompleted}
              placeholder={
                session.isCompleted
                  ? 'Interview completed. Generating report...'
                  : 'Type your answer here, or click the microphone to dictate... (Press Enter to submit, Shift+Enter for new line)'
              }
              className="w-full resize-none p-3.5 pb-10 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 bg-transparent focus:outline-none"
            />

            {/* Action Row inside Textarea */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
              {/* Left buttons: Voice & word count */}
              <div className="flex items-center gap-2">
                {session.voiceEnabled && speechSupported && (
                  <button
                    type="button"
                    id="voice-mic-button"
                    onClick={toggleListening}
                    disabled={isAiThinking || session.isCompleted}
                    className={`p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                    title="Dictate with voice"
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    <span className="text-[11px] hidden sm:inline">
                      {isListening ? 'Listening...' : 'Voice Dictate'}
                    </span>
                  </button>
                )}

                <span className="text-[11px] text-slate-400 font-mono">
                  {inputText.trim().split(/\s+/).filter(Boolean).length} words
                </span>
              </div>

              {/* Right: Submit Button */}
              <div className="flex items-center gap-2">
                {session.isDemo && (
                  <button
                    type="button"
                    id="demo-fill-sample-answer-btn"
                    onClick={() => {
                      const currentQ = session.questions[session.currentQuestionIndex];
                      if (currentQ) {
                        setInputText(currentQ.benchmarkAnswer);
                      }
                    }}
                    className="hidden sm:inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                  >
                    <span>Fill Sample Answer</span>
                  </button>
                )}

                <button
                  type="button"
                  id="send-answer-button"
                  onClick={handleSend}
                  disabled={!inputText.trim() || isAiThinking || session.isCompleted}
                  className="flex items-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white px-4 py-2 text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <span>Send Answer</span>
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>AI will evaluate your answer with NLP and transition to the next question.</span>
          <span className="hidden sm:inline">Transparent Academic Mini-Project Scoring</span>
        </div>
      </div>
    </div>
  );
};
