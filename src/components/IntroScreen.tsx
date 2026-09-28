import { ArrowRight, Sparkles, CheckCircle2, Trophy, Target } from 'lucide-react';
import { MISSIONS } from '../data/missionsData';

interface IntroScreenProps {
  onStart: () => void;
  onJumpToMission: (id: number) => void;
  completedMissions: number[];
}

export function IntroScreen({ onStart, onJumpToMission, completedMissions }: IntroScreenProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>고등학교 「통합사회2」 불평등 통계 자료 완벽 정복</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          📊 표 읽기 연구소
        </h1>

        <p className="text-base sm:text-xl font-medium text-slate-600 max-w-xl mx-auto">
          숫자만 보면 멈추는 사람들을 위한 사회 자료 해석 훈련
        </p>

        {/* Highlighted Quote Box */}
        <div className="max-w-md mx-auto p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
            “비율, 증가율, 격차…
            <br />
            표만 보면 헷갈렸다면 하나씩 익혀보자.”
          </p>
        </div>

        {/* Primary CTA Button */}
        <div className="pt-2">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-8 py-4 text-base sm:text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>연구소 입장하기 🚪</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Learning Flow Architecture Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="text-xs font-bold text-indigo-600 tracking-wider">학습 로드맵</div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            짧은 설명 → 쉬운 예시 → 바로 연습 → 실전 혼합 문제
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            복잡한 계산 암기가 아닌, 무엇을 기준으로 나누고 빼야 하는지 직관적으로 익힙니다.
          </p>
        </div>

        {/* 6 Missions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MISSIONS.map((m) => {
            const isDone = completedMissions.includes(m.id);
            return (
              <div
                key={m.id}
                onClick={() => onJumpToMission(m.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left ${
                  isDone
                    ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
                    : 'border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-600">{m.badge}</span>
                  {isDone ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      CLEAR
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">대기 중</span>
                  )}
                </div>
                <div className="font-bold text-slate-900 text-sm mb-1">{m.keyword}</div>
                <div className="text-xs text-slate-500 line-clamp-2">{m.title}</div>
              </div>
            );
          })}
        </div>

        {/* Step 7 & 8 High-Level Anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-sky-700" />
              <span className="text-xs font-bold text-sky-700">핵심 브릿지</span>
            </div>
            <div className="font-bold text-slate-900 text-sm mb-1">개념 선택 훈련</div>
            <p className="text-xs text-slate-600">
              “이 문제에서는 어떤 계산을 해야 하는가?”를 먼저 판별하는 직관 훈련
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-rose-700" />
              <span className="text-xs font-bold text-rose-700">최종 테스트</span>
            </div>
            <div className="font-bold text-slate-900 text-sm mb-1">🔥 실전 도전 모드 (8문항)</div>
            <p className="text-xs text-slate-600">
              성별 임금·고용률·가사노동 등 통합사회2 표 자료로 실전 완벽 대비
            </p>
          </div>
        </div>
      </div>

      {/* Core Principle Footer Callout */}
      <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-indigo-300">연구소 지도 원칙</div>
          <div className="font-bold text-sm sm:text-base mt-0.5">
            비율은 전체로 나누고, 증감률은 처음으로 나누고, 격차는 빼고, 배수는 나눈다.
          </div>
        </div>
        <button
          onClick={onStart}
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold whitespace-nowrap transition-colors"
        >
          학습 시작하기
        </button>
      </div>
    </div>
  );
}
