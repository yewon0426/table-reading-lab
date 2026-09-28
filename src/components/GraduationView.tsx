import { ChallengeQuestion, UserAnswerState } from '../types';
import {
  Trophy,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  BookOpen,
} from 'lucide-react';

interface GraduationViewProps {
  questions: ChallengeQuestion[];
  userStates: Record<number, UserAnswerState>;
  onRetryIncorrect: () => void;
  onRestartAll: () => void;
  onReviewMissions: () => void;
}

export function GraduationView({
  questions,
  userStates,
  onRetryIncorrect,
  onRestartAll,
  onReviewMissions,
}: GraduationViewProps) {
  const total = questions.length;
  const score = Object.values(userStates).filter((s) => s.isCorrect).length;

  // Grade determination according to user prompt
  let rankBadge = '';
  let rankTitle = '';
  let rankDesc = '';
  let rankColor = '';

  if (score === 8) {
    rankBadge = '👑';
    rankTitle = '표 읽기 마스터';
    rankDesc = '완벽합니다! 고교 통합사회2의 모든 불평등 통계 자료를 막힘없이 해석할 수 있는 최고 레벨입니다.';
    rankColor = 'from-amber-500 to-yellow-500 text-amber-950 border-amber-300';
  } else if (score >= 6) {
    rankBadge = '🔎';
    rankTitle = '자료 분석가';
    rankDesc = '훌륭합니다! 대부분의 도표 계산 원리를 정확하게 파악하고 있습니다.';
    rankColor = 'from-indigo-500 to-sky-500 text-indigo-950 border-indigo-300';
  } else if (score >= 4) {
    rankBadge = '📊';
    rankTitle = '조금만 더!';
    rankDesc = '기본 공식은 잡혔습니다. %와 %p 구분, 분모 기준값 설정에 조금만 더 주의하면 완벽해집니다.';
    rankColor = 'from-sky-500 to-teal-500 text-teal-950 border-teal-300';
  } else {
    rankBadge = '🧪';
    rankTitle = '다시 연구실로!';
    rankDesc = '아직 분모(기준값)와 뺄셈(%p) 개념이 헷갈릴 수 있습니다. 핵심 미션을 다시 복습해보세요!';
    rankColor = 'from-slate-600 to-slate-700 text-slate-100 border-slate-400';
  }

  const incorrectQuestions = questions.filter(
    (q) => !userStates[q.id] || !userStates[q.id].isCorrect
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>전체 훈련 코스 이수</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          🎉 표 읽기 연구소 수료!
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-lg mx-auto">
          숫자 앞에서도 망설이지 않는 사회 자료 해석 능력을 갖추셨습니다.
        </p>
      </div>

      {/* Rank Result Card */}
      <div
        className={`bg-gradient-to-br ${rankColor} p-6 sm:p-8 rounded-3xl shadow-xl border text-white space-y-4 text-center sm:text-left flex flex-col sm:flex-row items-center gap-6`}
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl sm:text-6xl shrink-0 shadow-inner">
          {rankBadge}
        </div>

        <div className="space-y-2 flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-white/80">
            실전 도전 평가 결과
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            {rankTitle} ({score} / {total}점)
          </div>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            {rankDesc}
          </p>
        </div>
      </div>

      {/* Question Results Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-indigo-600" />
          <span>문제별 성취도 분석</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {questions.map((q, idx) => {
            const state = userStates[q.id];
            const isCorrect = state?.isCorrect;

            return (
              <div
                key={q.id}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs sm:text-sm ${
                  isCorrect
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                    : 'border-rose-200 bg-rose-50/40 text-rose-950'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold">
                    Q{idx + 1}. {q.topic}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">유형: {q.calculationType}</div>
                </div>

                <div className="flex items-center gap-1.5 font-bold">
                  {isCorrect ? (
                    <span className="flex items-center gap-1 text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      정답
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-rose-700">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      오답
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button row */}
        <div className="pt-2 flex flex-wrap items-center gap-3">
          {incorrectQuestions.length > 0 && (
            <button
              onClick={onRetryIncorrect}
              className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold shadow-xs transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>틀린 문제 다시 풀기 ({incorrectQuestions.length}문항)</span>
            </button>
          )}

          <button
            onClick={onRestartAll}
            className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>실전 8문항 전체 다시 도전</span>
          </button>

          <button
            onClick={onReviewMissions}
            className="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>핵심 미션 복습하기</span>
          </button>
        </div>
      </div>

      {/* 도표 해석 생존 공식 Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            연구소 수료 기념 요약
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
            도표 해석 생존 공식
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            시험 직전이나 수능 사회탐구 표 풀이 전 꼭 한 번씩 눈에 담아두세요.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>📊</span>
              <span>비율</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              해당 수 ÷ 전체 × 100
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>📈</span>
              <span>증가율·감소율</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              (나중 - 처음) ÷ 처음 × 100
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>📍</span>
              <span>%p</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              나중 비율 - 처음 비율
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>↔️</span>
              <span>격차</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              큰 값 - 작은 값
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>✖️</span>
              <span>몇 배</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              비교할 값(위) ÷ 기준값(아래)
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <span>💯</span>
              <span>A는 B의 몇 %</span>
            </div>
            <div className="font-mono text-xs font-bold text-indigo-700 bg-white p-2 rounded-lg border border-slate-200">
              A ÷ B × 100
            </div>
          </div>
        </div>

        {/* Final Takeaway Golden Rule Card */}
        <div className="p-6 rounded-2xl bg-indigo-900 text-white space-y-3">
          <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
            기억하자!
          </div>
          <div className="text-lg sm:text-xl font-bold leading-relaxed space-y-1">
            <p className="text-emerald-300">비율은 전체로 나누고,</p>
            <p className="text-sky-300">증감률은 처음으로 나누고,</p>
            <p className="text-amber-300">격차는 빼고, 배수는 나눈다.</p>
          </div>
          <div className="pt-2 border-t border-indigo-800 text-sm font-semibold text-indigo-200">
            그리고 <span className="text-yellow-300 font-extrabold">%끼리의 차이는 %p!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
