import { useState } from 'react';
import { Delete, X } from 'lucide-react';

interface MiniCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MiniCalculator({ isOpen, onClose }: MiniCalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    setDisplay('0');
    setMemory(null);
    setOp(null);
    setWaitingForOperand(false);
  };

  const performOp = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (memory === null) {
      setMemory(inputValue);
    } else if (op) {
      const currentValue = memory || 0;
      let newValue = inputValue;

      if (op === '+') newValue = currentValue + inputValue;
      if (op === '-') newValue = currentValue - inputValue;
      if (op === '×') newValue = currentValue * inputValue;
      if (op === '÷') newValue = inputValue !== 0 ? currentValue / inputValue : 0;

      // round to 4 decimal places if needed
      newValue = Math.round(newValue * 10000) / 10000;
      setDisplay(String(newValue));
      setMemory(newValue);
    }

    setWaitingForOperand(true);
    setOp(nextOp === '=' ? null : nextOp);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xs bg-white rounded-2xl shadow-xl border border-slate-200 p-4 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-slate-800">🧮 빠른 계산기</span>
            <span className="text-xs text-slate-400">연구 도우미</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-right mb-3">
          <div className="text-xs text-slate-400 h-4 font-mono tabular-nums">
            {memory !== null && op ? `${memory} ${op}` : ''}
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 truncate tabular-nums">
            {display}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-2 text-sm font-medium">
          <button
            onClick={clearAll}
            className="col-span-2 py-2.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg transition-colors"
          >
            AC (초기화)
          </button>
          <button
            onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')}
            className="py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg flex items-center justify-center transition-colors"
            aria-label="한 글자 지우기"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={() => performOp('÷')}
            className={`py-2.5 rounded-lg transition-colors font-bold ${
              op === '÷' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            ÷
          </button>

          {['7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors font-semibold"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => performOp('×')}
            className={`py-2.5 rounded-lg transition-colors font-bold ${
              op === '×' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            ×
          </button>

          {['4', '5', '6'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors font-semibold"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => performOp('-')}
            className={`py-2.5 rounded-lg transition-colors font-bold ${
              op === '-' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            -
          </button>

          {['1', '2', '3'].map((d) => (
            <button
              key={d}
              onClick={() => handleDigit(d)}
              className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors font-semibold"
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => performOp('+')}
            className={`py-2.5 rounded-lg transition-colors font-bold ${
              op === '+' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            +
          </button>

          <button
            onClick={() => handleDigit('0')}
            className="col-span-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors font-semibold"
          >
            0
          </button>
          <button
            onClick={handleDecimal}
            className="py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-lg transition-colors font-bold"
          >
            .
          </button>
          <button
            onClick={() => performOp('=')}
            className="py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-bold shadow-xs"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
