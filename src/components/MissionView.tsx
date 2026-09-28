import { useState } from 'react';
import { MissionData } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface MissionViewProps {
  mission: MissionData;
  totalMissions: number;
  isCleared: boolean;
  onClearMission: (missionId: number) => void;
  onNextMission: () => void;
  onGoToConceptDrill: () => void;
}

export function MissionView({
  mission,
  totalMissions,
  isCleared,
  onClearMission,
  onNextMission,
  onGoToConceptDrill,
}: MissionViewProps) {
  // Practice state
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [numberInput, setNumberInput] = useState<string>('');
  const [multiInputs, setMultiInputs] = useState<Record<string, string>>({});
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  // Tricky check state (for Mission 6)
  const [trickySelected, setTrickySelected] = useState<boolean | null>(null);

  // Active step revelation for visual example
  const [activeStepIndex, setActiveStepIndex] = useState<number>(
    mission.example.steps.length
  );

  const resetPractice = () => {
    setSelectedChoice('');
    setNumberInput('');
    setMultiInputs({});
    setHasSubmitted(false);
    setIsAnswerCorrect(false);
  };

  const handlePracticeSubmit = () => {
    if (mission.practice.type === 'choice') {
      const correct = selectedChoice.trim() === String(mission.practice.correctAnswer).trim();
      setIsAnswerCorrect(correct);
      setHasSubmitted(true);
      if (correct) {
        onClearMission(mission.id);
      }
    } else if (mission.practice.type === 'number') {
      const correct = numberInput.trim() === String(mission.practice.correctAnswer).trim();
      setIsAnswerCorrect(correct);
      setHasSubmitted(true);
      if (correct) {
        onClearMission(mission.id);
      }
    } else if (mission.practice.type === 'multi-part' && mission.practice.multiParts) {
      const allCorrect = mission.practice.multiParts.every((part) => {
        const val = multiInputs[part.id]?.trim();
        return val === part.correctAnswer.trim();
      });
      setIsAnswerCorrect(allCorrect);
      setHasSubmitted(true);
      if (allCorrect) {
        onClearMission(mission.id);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Top Mission Status Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs sm:text-sm rounded-lg">
            MISSION {mission.missionNumber} / {totalMissions}
          </div>
          <span className="font-bold text-slate-800 text-sm sm:text-base">{mission.keyword}</span>
        </div>

        <div>
          {isCleared ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs sm:text-sm font-bold animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>CLEAR</span>
            </span>
          ) : (
            <span className="text-xs text-slate-400 font-medium">풀어보기 완료 시 완료</span>
          )}
        </div>
      </div>

      {/* Warning banner for tricky missions like Mission 3 */}
      {mission.isTrickyWarning && (
        <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-sm sm:text-base flex items-center gap-2">
              <span>⚠️ 헷갈림 주의! 고등 사회 시험 최다 오답 포인트</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              비율 자체가 변할 때와 그 변화의 비율을 구할 때를 반드시 구별해야 합니다.
            </p>
          </div>
        </div>
      )}

      {/* ① 개념 설명 Card */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
          <span className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center text-[11px]">
            1
          </span>
          <span>개념 설명</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          {mission.title}
        </h2>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
          {mission.explanation}
        </p>

        {/* Formula Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            핵심 공식
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-indigo-800 whitespace-pre-line bg-white p-3 rounded-lg border border-slate-200/80">
            {mission.formula}
          </div>
        </div>

        {/* Key Tip */}
        <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 flex items-start gap-2.5">
          <Lightbulb className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="text-sm font-semibold text-indigo-950 whitespace-pre-line leading-relaxed">
            {mission.keyTip}
          </div>
        </div>
      </section>

      {/* ② 쉬운 예시 Card (Step-by-step visual demonstration) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-sky-600">
            <span className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center text-[11px]">
              2
            </span>
            <span>쉬운 예시로 확인하기</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() =>
                setActiveStepIndex((prev) =>
                  prev < mission.example.steps.length ? prev + 1 : 1
                )
              }
              className="text-xs text-sky-700 hover:text-sky-900 font-semibold px-2 py-1 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors"
            >
              단계 다시 보기
            </button>
          </div>
        </div>

        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-slate-900">{mission.example.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{mission.example.description}</p>
        </div>

        {/* Example Data Card */}
        {mission.example.dataCard && (
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="text-xs font-bold text-slate-500">
              {mission.example.dataCard.category}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mission.example.dataCard.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border text-center ${
                    item.highlight
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-950'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                  <div className="text-base sm:text-lg font-bold font-mono mt-0.5 tabular-nums">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Visual Comparison for Mission 3 (% vs %p) */}
        {mission.id === 3 && (
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-sky-50 border-2 border-indigo-200 space-y-4">
            <div className="text-center font-bold text-xl sm:text-2xl text-slate-900 font-mono">
              50% → 60%
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>10%p 증가</span>
                </div>
                <div className="text-xs font-mono text-slate-600">60% - 50% = 10%p</div>
                <p className="text-xs text-slate-500 pt-1">비율 숫자 자체의 차이를 단순 뺄셈할 때</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-indigo-200 shadow-xs space-y-1">
                <div className="flex items-center gap-1.5 text-indigo-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>20% 증가</span>
                </div>
                <div className="text-xs font-mono text-slate-600">
                  (60 - 50) ÷ 50 × 100 = 20%
                </div>
                <p className="text-xs text-slate-500 pt-1">처음 고용률(50%)을 기준으로 성장률을 잴 때</p>
              </div>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-indigo-100 text-xs sm:text-sm font-semibold text-indigo-900 text-center space-y-1">
              <div>📌 비율끼리 빼면 → %p</div>
              <div>📌 처음 값과 비교하면 → %</div>
            </div>
          </div>
        )}

        {/* Step by step calculation flow */}
        <div className="space-y-3">
          {mission.example.steps.slice(0, activeStepIndex).map((st) => (
            <div
              key={st.stepNum}
              className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-700">
                  STEP {st.stepNum}. {st.label}
                </span>
                <span className="text-sm font-bold font-mono text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md tabular-nums">
                  = {st.result}
                </span>
              </div>
              <div className="font-mono text-xs sm:text-sm text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-100 tabular-nums">
                계산: {st.calculation}
              </div>
              <p className="text-xs text-slate-600">{st.explanation}</p>
            </div>
          ))}
        </div>

        {/* Counter Example (for Mission 5 reverse order) */}
        {mission.example.counterExample && (
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
            <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>{mission.example.counterExample.title}</span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              {mission.example.counterExample.description}
            </p>
            <div className="font-mono text-xs font-bold text-amber-900 bg-white p-2 rounded-lg border border-amber-200 tabular-nums">
              {mission.example.counterExample.calculation} = {mission.example.counterExample.result}
            </div>
            <p className="text-xs text-amber-900 font-semibold">
              💡 {mission.example.counterExample.lesson}
            </p>
          </div>
        )}

        {/* Visual Takeaway Note */}
        {mission.example.visualNote && (
          <div className="p-3.5 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs sm:text-sm font-semibold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{mission.example.visualNote}</span>
          </div>
        )}
      </section>

      {/* 헷갈림 체크 (Interactive True/False for Mission 6) */}
      {mission.trickyCheck && (
        <section className="bg-white rounded-2xl border-2 border-indigo-200 p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>생각해보기: 헷갈림 체크</span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            {mission.trickyCheck.question}
          </h3>

          <div className="grid grid-cols-2 gap-3 max-w-sm">
            {mission.trickyCheck.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setTrickySelected(opt.isCorrect)}
                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all ${
                  trickySelected === null
                    ? 'border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 text-slate-800'
                    : opt.isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-slate-100 text-slate-400'
                }`}
              >
                [ {opt.text} ]
              </button>
            ))}
          </div>

          {trickySelected !== null && (
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl text-xs sm:text-sm text-indigo-950 whitespace-pre-line leading-relaxed font-medium animate-in fade-in">
              {mission.trickyCheck.explanation}
            </div>
          )}
        </section>
      )}

      {/* ③ 학생이 직접 풀어보기 & ④ 정답 피드백 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[11px]">
              3
            </span>
            <span>직접 풀어보기</span>
          </div>
          {hasSubmitted && (
            <button
              onClick={resetPractice}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>다시 풀기</span>
            </button>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-900">
          {mission.practice.question}
        </h3>

        {/* Practice Table if exists */}
        {mission.practice.tableData && (
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  {mission.practice.tableData.headers.map((h, i) => (
                    <th key={i} className="py-2.5 px-4">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {mission.practice.tableData.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50">
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
        )}

        {/* Input formats */}
        {mission.practice.type === 'choice' && mission.practice.options && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            {mission.practice.options.map((opt, i) => {
              const isSelected = selectedChoice === opt;
              return (
                <button
                  key={i}
                  disabled={hasSubmitted && isAnswerCorrect}
                  onClick={() => setSelectedChoice(opt)}
                  className={`py-3 px-4 rounded-xl border text-sm font-bold font-mono transition-all tabular-nums ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {mission.practice.type === 'number' && (
          <div className="flex items-center gap-3 pt-2 max-w-xs">
            <div className="relative flex-1">
              <input
                type="text"
                value={numberInput}
                disabled={hasSubmitted && isAnswerCorrect}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="숫자 입력"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handlePracticeSubmit();
                }}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white tabular-nums"
              />
              {mission.practice.unit && (
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                  {mission.practice.unit}
                </span>
              )}
            </div>
          </div>
        )}

        {mission.practice.type === 'multi-part' && mission.practice.multiParts && (
          <div className="space-y-3 pt-2">
            {mission.practice.multiParts.map((part) => (
              <div
                key={part.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="text-sm font-semibold text-slate-800">{part.prompt}</div>
                <div className="flex items-center gap-2">
                  <div className="relative w-32">
                    <input
                      type="text"
                      value={multiInputs[part.id] || ''}
                      disabled={hasSubmitted && isAnswerCorrect}
                      onChange={(e) =>
                        setMultiInputs({ ...multiInputs, [part.id]: e.target.value })
                      }
                      placeholder="입력"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 tabular-nums"
                    />
                    {part.unit && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                        {part.unit}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        {(!hasSubmitted || !isAnswerCorrect) && (
          <div className="pt-2">
            <button
              onClick={handlePracticeSubmit}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-xs hover:shadow-md transition-all"
            >
              정답 확인하기
            </button>
          </div>
        )}

        {/* ④ 정답 피드백 Box */}
        {hasSubmitted && (
          <div
            className={`p-5 rounded-2xl border ${
              isAnswerCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            } space-y-3 animate-in fade-in duration-200`}
          >
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              {isAnswerCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>정답입니다! 완벽하게 이해하셨네요 👏</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>아쉽습니다. 기준값과 공식을 다시 한 번 확인해보세요!</span>
                </>
              )}
            </div>

            <div className="text-xs sm:text-sm font-mono whitespace-pre-line leading-relaxed p-3 bg-white/80 rounded-xl border border-current/10">
              {mission.practice.explanation}
            </div>

            {isAnswerCorrect && (
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-emerald-700 font-semibold">
                  🎉 이 개념의 연구를 완료했습니다!
                </span>

                {mission.id < totalMissions ? (
                  <button
                    onClick={onNextMission}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
                  >
                    <span>다음 미션으로 이동</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={onGoToConceptDrill}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
                  >
                    <span>개념 선택 훈련으로 이동</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="text-xs text-slate-400">
          모든 6개 미션을 차례로 익히면 실전 문제 풀이가 훨씬 쉬워집니다.
        </div>
        {isCleared && mission.id < totalMissions && !hasSubmitted && (
          <button
            onClick={onNextMission}
            className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <span>다음 미션</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
