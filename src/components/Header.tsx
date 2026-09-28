import { ScreenType } from '../types';
import { Calculator, BookOpen, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  currentMissionId: number;
  completedMissions: number[];
  onSelectScreen: (screen: ScreenType, missionId?: number) => void;
  onOpenFormula: () => void;
  onOpenCalculator: () => void;
  onResetProgress: () => void;
}

export function Header({
  currentScreen,
  currentMissionId,
  completedMissions,
  onSelectScreen,
  onOpenFormula,
  onOpenCalculator,
  onResetProgress,
}: HeaderProps) {
  const missionShorts = [
    { id: 1, name: '1.비율' },
    { id: 2, name: '2.증감률' },
    { id: 3, name: '3.%·%p' },
    { id: 4, name: '4.격차' },
    { id: 5, name: '5.몇 배' },
    { id: 6, name: '6.A는 B%' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectScreen('intro')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center gap-1.5"
        >
          <span className="text-xl">📊</span>
          <span>표 읽기 연구소</span>
        </button>

        {/* Zone 2: Navigation Links (single line with horizontal scroll on small viewports) */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs font-semibold">
          {missionShorts.map((m) => {
            const isCurrent = currentScreen === 'mission' && currentMissionId === m.id;
            const isDone = completedMissions.includes(m.id);

            return (
              <button
                key={m.id}
                onClick={() => onSelectScreen('mission', m.id)}
                className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : isDone
                    ? 'bg-slate-100 text-emerald-700 hover:bg-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>{m.name}</span>
                {isDone && <span className="text-[10px]">✓</span>}
              </button>
            );
          })}

          <button
            onClick={() => onSelectScreen('concept-drill')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              currentScreen === 'concept-drill'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            선택훈련
          </button>

          <button
            onClick={() => onSelectScreen('challenge')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors font-bold ${
              currentScreen === 'challenge'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-600 hover:bg-rose-50'
            }`}
          >
            🔥실전
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={onOpenCalculator}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="계산기 도우미 열기"
          >
            <Calculator className="w-4 h-4 text-indigo-600" />
            <span className="hidden md:inline">계산기</span>
          </button>

          <button
            onClick={onOpenFormula}
            className="p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
            title="생존 공식 보기"
          >
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span className="hidden sm:inline">생존 공식</span>
          </button>

          <button
            onClick={onResetProgress}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            title="학습 진행 초기화"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
