import { useState } from 'react';
import { CONCEPT_DRILL_ITEMS } from '../data/conceptSelectionData';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, Target } from 'lucide-react';

interface ConceptSelectionViewProps {
  onStartChallenge: () => void;
  onReviewMissions: () => void;
}

export function ConceptSelectionView({
  onStartChallenge,
  onReviewMissions,
}: ConceptSelectionViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<number, boolean>>({});

  const currentItem = CONCEPT_DRILL_ITEMS[currentIdx];
  const selectedAnswer = userAnswers[currentItem.id];
  const isAnswered = showFeedback[currentItem.id];
  const isCorrect = selectedAnswer === currentItem.correctAnswer;

  const totalItems = CONCEPT_DRILL_ITEMS.length;
  const answeredCount = Object.keys(showFeedback).length;
  const correctCount = Object.entries(userAnswers).filter(
    ([id, ans]) =>
      ans === CONCEPT_DRILL_ITEMS.find((it) => it.id === Number(id))?.correctAnswer
  ).length;

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setUserAnswers((prev) => ({ ...prev, [currentItem.id]: opt }));
    setShowFeedback((prev) => ({ ...prev, [currentItem.id]: true }));
  };

  const handleNext = () => {
    if (currentIdx < totalItems - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowFeedback({});
    setCurrentIdx(0);
  };

  const isAllCompleted = answeredCount === totalItems;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-50 text-sky-700 font-bold text-xs rounded-lg">
            <Target className="w-3.5 h-3.5 text-sky-600" />
            <span>판단력 강화 트레이닝</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            진행도: {answeredCount} / {totalItems} (정답 {correctCount}개)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          이 문제에서는 어떤 계산을 해야 할까?
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed">
          공식을 무작정 계산하기 전에, <strong>문제가 요구하는 핵심이 무엇인지</strong> 먼저 판단하는
          가장 중요한 훈련입니다.
        </p>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5 pt-2">
          {CONCEPT_DRILL_ITEMS.map((item, i) => {
            const isDone = showFeedback[item.id];
            const isItemCorrect = userAnswers[item.id] === item.correctAnswer;
            const isCurrent = currentIdx === i;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(i)}
                className={`h-2 flex-1 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-indigo-600 ring-2 ring-indigo-300 ring-offset-1'
                    : isDone
                    ? isItemCorrect
                      ? 'bg-emerald-500'
                      : 'bg-rose-400'
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
                title={`훈련 ${i + 1}`}
              />
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-indigo-600">
            훈련 {currentIdx + 1} / {totalItems}
          </span>
          {isAnswered && (
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isCorrect ? '정답' : '오답'}
            </span>
          )}
        </div>

        {/* Scenario Box */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-500">제시된 상황</div>
          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
            “{currentItem.scenario}”
          </p>
        </div>

        <h3 className="text-lg font-bold text-slate-900">{currentItem.question}</h3>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentItem.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            const isThisOptionCorrect = opt === currentItem.correctAnswer;

            let buttonStyle = 'bg-slate-50 hover:bg-indigo-50/50 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (isThisOptionCorrect) {
                buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'bg-rose-50 border-rose-400 text-rose-950';
              } else {
                buttonStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              buttonStyle = 'bg-indigo-600 text-white border-indigo-600';
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-xl border text-sm font-semibold transition-all text-left flex items-center justify-between ${buttonStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isThisOptionCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Feed */}
        {isAnswered && (
          <div
            className={`p-5 rounded-xl border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            } space-y-3 animate-in fade-in duration-150`}
          >
            <div className="font-bold text-sm sm:text-base flex items-center gap-2">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>맞았습니다! 올바른 계산법입니다.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>정답은 &apos;{currentItem.correctAnswer}&apos;입니다.</span>
                </>
              )}
            </div>

            <p className="text-xs sm:text-sm leading-relaxed">{currentItem.explanation}</p>

            {currentItem.whyNotOthers && currentItem.whyNotOthers.length > 0 && (
              <div className="pt-2 border-t border-current/10 space-y-1">
                <div className="text-xs font-bold opacity-80">💡 왜 다른 보기는 아닐까요?</div>
                {currentItem.whyNotOthers.map((w, idx) => (
                  <div key={idx} className="text-xs opacity-90">
                    • <strong>{w.option}</strong>: {w.reason}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Card Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 rounded-lg transition-colors"
          >
            이전
          </button>

          {currentIdx < totalItems - 1 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              다음 문제
            </button>
          ) : (
            <span className="text-xs text-slate-500 font-medium">마지막 문제입니다</span>
          )}
        </div>
      </div>

      {/* Completion Banner for Concept Drill */}
      {isAllCompleted && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>개념 선택 훈련 완료!</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            어떤 공식을 써야 할지 감을 잡으셨습니다! 🔥
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            이제 성별 임금, 고용률, 가사노동 시간 등 고등학교 통합사회2의 실제 가상 통계표를 바탕으로
            <strong> 8문제 실전 도전</strong>에 나설 차례입니다.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onStartChallenge}
              className="px-6 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <span>🔥 실전 도전 모드 입장하기 (8문항)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>선택 훈련 다시 풀기</span>
            </button>

            <button
              onClick={onReviewMissions}
              className="px-4 py-3 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
            >
              미션 복습하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
