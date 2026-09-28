import { useState, useEffect } from 'react';
import { ScreenType, UserAnswerState } from './types';
import { MISSIONS } from './data/missionsData';
import { CHALLENGE_QUESTIONS } from './data/challengeData';
import { Header } from './components/Header';
import { IntroScreen } from './components/IntroScreen';
import { MissionView } from './components/MissionView';
import { ConceptSelectionView } from './components/ConceptSelectionView';
import { ChallengeView } from './components/ChallengeView';
import { GraduationView } from './components/GraduationView';
import { FormulaModal } from './components/FormulaModal';
import { MiniCalculator } from './components/MiniCalculator';

const STORAGE_KEY_MISSIONS = 'table_reading_lab_missions';
const STORAGE_KEY_CHALLENGE = 'table_reading_lab_challenge';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('intro');
  const [currentMissionId, setCurrentMissionId] = useState<number>(1);
  const [completedMissions, setCompletedMissions] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_MISSIONS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [challengeStates, setChallengeStates] = useState<Record<number, UserAnswerState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHALLENGE);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active challenge questions subset (either all 8 or only retry list)
  const [activeChallengeQuestions, setActiveChallengeQuestions] = useState(CHALLENGE_QUESTIONS);

  // Modals
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_MISSIONS, JSON.stringify(completedMissions));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [completedMissions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHALLENGE, JSON.stringify(challengeStates));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [challengeStates]);

  const handleClearMission = (missionId: number) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions((prev) => [...prev, missionId]);
    }
  };

  const handleNextMission = () => {
    if (currentMissionId < MISSIONS.length) {
      setCurrentMissionId((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentScreen('concept-drill');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectScreen = (screen: ScreenType, missionId?: number) => {
    setCurrentScreen(screen);
    if (missionId) {
      setCurrentMissionId(missionId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetProgress = () => {
    if (window.confirm('연구 진행 상태를 초기화하시겠습니까?')) {
      setCompletedMissions([]);
      setChallengeStates({});
      try {
        localStorage.removeItem(STORAGE_KEY_MISSIONS);
        localStorage.removeItem(STORAGE_KEY_CHALLENGE);
      } catch (e) {
        console.warn(e);
      }
      setCurrentMissionId(1);
      setCurrentScreen('intro');
      setActiveChallengeQuestions(CHALLENGE_QUESTIONS);
    }
  };

  // Challenge logic with 3-tier feedback
  const handleChallengeAnswerSubmit = (questionId: number, userInput: string) => {
    const q = CHALLENGE_QUESTIONS.find((item) => item.id === questionId);
    if (!q) return;

    const prevState = challengeStates[questionId] || {
      questionId,
      attempts: 0,
      userInputs: [],
      isCorrect: false,
      status: 'unanswered',
    };

    const newAttempts = prevState.attempts + 1;
    const newInputs = [...prevState.userInputs, userInput];

    // Check correctness
    let isCorrect = false;
    const cleanUser = userInput.replace(/%|%p|만|원|,|\s/g, '').trim().toLowerCase();
    const cleanTarget = String(q.correctAnswer).replace(/%|%p|만|원|,|\s/g, '').trim().toLowerCase();

    if (q.type === 'choice') {
      isCorrect = userInput.trim() === String(q.correctAnswer).trim();
    } else {
      const numUser = parseFloat(cleanUser);
      const numTarget = parseFloat(cleanTarget);
      if (!isNaN(numUser) && !isNaN(numTarget)) {
        isCorrect = Math.abs(numUser - numTarget) <= (q.tolerance || 0.05);
      } else {
        isCorrect = cleanUser === cleanTarget;
      }
    }

    let nextStatus: UserAnswerState['status'] = prevState.status;
    if (isCorrect) {
      nextStatus = 'solved';
    } else {
      if (newAttempts === 1) {
        nextStatus = 'attempt1_wrong';
      } else if (newAttempts >= 2) {
        nextStatus = 'attempt2_wrong';
      }
    }

    setChallengeStates((prev) => ({
      ...prev,
      [questionId]: {
        questionId,
        attempts: newAttempts,
        userInputs: newInputs,
        isCorrect,
        status: nextStatus,
      },
    }));
  };

  const handleRevealSolution = (questionId: number) => {
    setChallengeStates((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {
          questionId,
          attempts: 2,
          userInputs: [],
          isCorrect: false,
        }),
        status: 'revealed',
      },
    }));
  };

  const handleRetryIncorrect = () => {
    const incorrects = CHALLENGE_QUESTIONS.filter(
      (q) => !challengeStates[q.id] || !challengeStates[q.id].isCorrect
    );
    if (incorrects.length > 0) {
      setActiveChallengeQuestions(incorrects);
      // Reset statuses for these questions
      setChallengeStates((prev) => {
        const next = { ...prev };
        incorrects.forEach((q) => {
          delete next[q.id];
        });
        return next;
      });
      setCurrentScreen('challenge');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleRestartChallengeAll = () => {
    setActiveChallengeQuestions(CHALLENGE_QUESTIONS);
    setChallengeStates({});
    setCurrentScreen('challenge');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMission =
    MISSIONS.find((m) => m.id === currentMissionId) || MISSIONS[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Noto_Sans_KR',sans-serif]">
      {/* Top Bar Contract compliant Header */}
      <Header
        currentScreen={currentScreen}
        currentMissionId={currentMissionId}
        completedMissions={completedMissions}
        onSelectScreen={handleSelectScreen}
        onOpenFormula={() => setIsFormulaOpen(true)}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onResetProgress={handleResetProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentScreen === 'intro' && (
          <IntroScreen
            onStart={() => {
              setCurrentScreen('mission');
              setCurrentMissionId(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onJumpToMission={(id) => {
              setCurrentScreen('mission');
              setCurrentMissionId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedMissions={completedMissions}
          />
        )}

        {currentScreen === 'mission' && (
          <MissionView
            mission={currentMission}
            totalMissions={MISSIONS.length}
            isCleared={completedMissions.includes(currentMission.id)}
            onClearMission={handleClearMission}
            onNextMission={handleNextMission}
            onGoToConceptDrill={() => {
              setCurrentScreen('concept-drill');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'concept-drill' && (
          <ConceptSelectionView
            onStartChallenge={() => {
              setActiveChallengeQuestions(CHALLENGE_QUESTIONS);
              setCurrentScreen('challenge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReviewMissions={() => {
              setCurrentScreen('mission');
              setCurrentMissionId(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'challenge' && (
          <ChallengeView
            questions={activeChallengeQuestions}
            userStates={challengeStates}
            onAnswerSubmit={handleChallengeAnswerSubmit}
            onRevealSolution={handleRevealSolution}
            onFinishChallenge={() => {
              setCurrentScreen('graduation');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
          />
        )}

        {currentScreen === 'graduation' && (
          <GraduationView
            questions={CHALLENGE_QUESTIONS}
            userStates={challengeStates}
            onRetryIncorrect={handleRetryIncorrect}
            onRestartAll={handleRestartChallengeAll}
            onReviewMissions={() => {
              setCurrentScreen('mission');
              setCurrentMissionId(1);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Floating Helpers Drawer/Modals */}
      <FormulaModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />
      <MiniCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>📊 표 읽기 연구소</strong> · 고등학교 「통합사회2」 사회 자료 해석 훈련
          </div>
          <div className="text-slate-400">
            비율은 전체로 나누고, 증감률은 처음으로 나누고, 격차는 빼고, 배수는 나눈다.
          </div>
        </div>
      </footer>
    </div>
  );
}
