import { useState } from 'react';
import { ChallengeQuestion, UserAnswerState } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  BookOpen,
  ArrowRight,
  Calculator,
} from 'lucide-react';

interface ChallengeViewProps {
  questions: ChallengeQuestion[];
  userStates: Record<number, UserAnswerState>;
  onAnswerSubmit: (questionId: number, userInput: string) => void;
  onRevealSolution: (questionId: number) => void;
  onFinishChallenge: () => void;
  onOpenCalculator: () => void;
}

export function ChallengeView({
  questions,
  userStates,
  onAnswerSubmit,
  onRevealSolution,
  onFinishChallenge,
  onOpenCalculator,
}: ChallengeViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const currentQ = questions[currentIdx];
  const currentState = userStates[currentQ.id] || {
    questionId: currentQ.id,
    attempts: 0,
    userInputs: [],
    isCorrect: false,
    status: 'unanswered',
  };

  const isSolved = currentState.isCorrect;
  const isRevealed = currentState.status === 'revealed';
  const isFinished = isSolved || isRevealed;

  const totalQuestions = questions.length;
  const solvedCount = Object.values(userStates).filter((s) => s.isCorrect).length;
  const completedCount = Object.values(userStates).filter(
    (s) => s.isCorrect || s.status === 'revealed'
  ).length;

  const handleSubmit = () => {
    const answerToSubmit = currentQ.type === 'choice' ? selectedOption : currentInput;
    if (!answerToSubmit.trim()) return;

    onAnswerSubmit(currentQ.id, answerToSubmit.trim());
    if (currentQ.type === 'choice') {
      setSelectedOption('');
    } else {
      setCurrentInput('');
    }
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) {
      setCurrentIdx((prev) => prev + 1);
      setCurrentInput('');
      setSelectedOption('');
    } else {
      onFinishChallenge();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setCurrentInput('');
      setSelectedOption('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Bar for Challenge Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-extrabold">
            🔥 실전 도전 모드
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-800">
            문제 {currentIdx + 1} / {totalQuestions}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalculator}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-indigo-600" />
            <span>계산기</span>
          </button>
          <span className="text-xs text-slate-500 font-medium">
            정답 {solvedCount} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Progress Dots */}
      <div className="grid grid-cols-8 gap-2">
        {questions.map((q, idx) => {
          const state = userStates[q.id];
          const isDone = state?.isCorrect;
          const isFailed = state?.status === 'revealed';
          const isCurrent = currentIdx === idx;

          return (
            <button
              key={q.id}
              onClick={() => {
                setCurrentIdx(idx);
                setCurrentInput('');
                setSelectedOption('');
              }}
              className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                isCurrent
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-400'
                  : isDone
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                  : isFailed
                  ? 'border-slate-300 bg-slate-100 text-slate-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              Q{idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Topic Tag & Calculation Type */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">통합사회2 주제:</span>
            <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">
              {currentQ.topic}
            </span>
          </div>

          <span className="text-xs font-mono font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
            유형: {currentQ.calculationType}
          </span>
        </div>

        {/* Statistical Table Box */}
        <div className="space-y-2">
          <div className="text-sm sm:text-base font-bold text-slate-900">{currentQ.title}</div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  {currentQ.tableData.headers.map((h, i) => (
                    <th key={i} className="py-2.5 px-4 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {currentQ.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50/60">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-4 tabular-nums font-medium text-slate-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {currentQ.tableData.caption && (
            <p className="text-[11px] text-slate-400 text-right">{currentQ.tableData.caption}</p>
          )}
        </div>

        {/* Question Prompt */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
          <div className="text-xs font-bold text-slate-500">질문</div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQ.question}
          </h3>
        </div>

        {/* Interaction Form (Choices or Number input) */}
        {!isFinished && (
          <div className="space-y-4">
            {currentQ.type === 'choice' && currentQ.options && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentQ.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedOption(opt)}
                      className={`p-3.5 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'number' && (
              <div className="flex items-center gap-3 max-w-sm">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    placeholder="숫자 입력"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSubmit();
                    }}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white tabular-nums"
                  />
                  {currentQ.unit && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                      {currentQ.unit}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-xs hover:shadow-md transition-all"
              >
                정답 제출
              </button>

              {currentState.attempts >= 2 && !isRevealed && (
                <button
                  onClick={() => onRevealSolution(currentQ.id)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span>풀이 및 정답 바로 보기</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 3-Tier Feedback System */}
        {/* Tier 1: 1차 오답 힌트 */}
        {currentState.status === 'attempt1_wrong' && !isFinished && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>오답입니다! 1차 힌트를 확인해보세요.</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {currentQ.hint1}
            </p>
          </div>
        )}

        {/* Tier 2: 2차 오답 계산법 제공 */}
        {currentState.status === 'attempt2_wrong' && !isFinished && (
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 space-y-2 animate-in fade-in">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-sky-900">
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>2차 오답: 구체적인 계산 방법을 안내해 드립니다.</span>
            </div>
            <p className="text-xs sm:text-sm text-sky-950 whitespace-pre-line leading-relaxed font-medium">
              {currentQ.hint2}
            </p>
          </div>
        )}

        {/* Solved or Revealed State */}
        {isFinished && (
          <div
            className={`p-5 rounded-2xl border space-y-3 animate-in fade-in ${
              isSolved
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              {isSolved ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    정답입니다!{' '}
                    {currentState.attempts === 1
                      ? '한 번에 맞히셨네요 🎯'
                      : `${currentState.attempts}번째 시도에 성공하셨습니다!`}
                  </span>
                </>
              ) : (
                <>
                  <Lightbulb className="w-5 h-5 text-indigo-600" />
                  <span>정답 및 풀이를 확인하세요. 다음 번엔 꼭 맞힐 수 있습니다!</span>
                </>
              )}
            </div>

            <div className="p-3.5 bg-white rounded-xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-line leading-relaxed tabular-nums">
              {currentQ.solution}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>{currentIdx < totalQuestions - 1 ? '다음 문제로' : '결과 확인하기'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 rounded-lg transition-colors"
          >
            이전 문제
          </button>

          {isFinished && currentIdx < totalQuestions - 1 && (
            <button
              onClick={handleNext}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              다음 문제 →
            </button>
          )}

          {completedCount === totalQuestions && (
            <button
              onClick={onFinishChallenge}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors"
            >
              최종 결과 보기 🏆
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
