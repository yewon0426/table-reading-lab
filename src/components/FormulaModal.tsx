import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormulaModal({ isOpen, onClose }: FormulaModalProps) {
  if (!isOpen) return null;

  const formulas = [
    {
      icon: '📊',
      name: '비율',
      calc: '해당 수 ÷ 전체 × 100',
      tip: '반드시 전체(모수)를 분모에 놓는다.',
    },
    {
      icon: '📈',
      name: '증가율·감소율',
      calc: '(나중 값 - 처음 값) ÷ 처음 값 × 100',
      tip: '기준(분모)은 항상 과거의 "처음 값"이다.',
    },
    {
      icon: '📍',
      name: '%와 %p',
      calc: '비율의 단순 차이 = 나중 % - 처음 % (%p)\n비율의 증가율 = (차이 ÷ 처음 %) × 100 (%)',
      tip: '%끼리 그냥 빼면 %p! 처음 값과 비교하면 %!',
    },
    {
      icon: '↔️',
      name: '격차',
      calc: '큰 값 - 작은 값',
      tip: '두 집단이 모두 증가해도 격차는 줄어들 수 있다.',
    },
    {
      icon: '✖️',
      name: '몇 배',
      calc: 'A ÷ B (A가 분자 / B가 분모)',
      tip: '“A는 B의 몇 배?” → A를 위에, B를 아래에!',
    },
    {
      icon: '💯',
      name: 'A는 B의 몇 %',
      calc: '(A ÷ B) × 100',
      tip: '기준값 B가 분모로 들어간다.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h2 className="text-lg font-bold text-slate-900">도표 해석 생존 공식 카드</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-indigo-50/70 border border-indigo-100 rounded-xl">
            <div className="flex items-center gap-2 mb-1.5 text-indigo-950 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>연구소 핵심 4원칙 암기 비법</span>
            </div>
            <p className="text-sm font-medium text-indigo-900 leading-relaxed">
              <strong>비율은 전체로 나누고,</strong> 증감률은 처음으로 나누고,
              <br />
              <strong>격차는 빼고,</strong> 배수는 나눈다.
              <br />
              그리고 <strong>%끼리의 차이는 %p!</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formulas.map((f) => (
              <div
                key={f.name}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 hover:bg-white hover:border-indigo-200 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{f.icon}</span>
                  <span className="font-bold text-slate-900 text-sm">{f.name}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-100 font-mono text-xs text-indigo-700 font-semibold mb-2 whitespace-pre-line">
                  {f.calc}
                </div>
                <div className="flex items-start gap-1.5 text-xs text-slate-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
}
