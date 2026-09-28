export type ScreenType =
  | 'intro'
  | 'mission'
  | 'concept-drill'
  | 'challenge'
  | 'graduation';

export interface MissionData {
  id: number;
  missionNumber: number;
  keyword: string;
  badge: string;
  title: string;
  subtitle: string;
  explanation: string;
  formula: string;
  formulaDetails?: { label: string; formula: string };
  keyTip: string;
  isTrickyWarning?: boolean;
  example: {
    title: string;
    description: string;
    dataCard?: {
      category: string;
      items: { label: string; value: string | number; highlight?: boolean }[];
    };
    steps: {
      stepNum: number;
      label: string;
      calculation: string;
      result: string;
      explanation: string;
    }[];
    visualNote?: string;
    counterExample?: {
      title: string;
      description: string;
      calculation: string;
      result: string;
      lesson: string;
    };
  };
  trickyCheck?: {
    question: string;
    options: { text: string; isCorrect: boolean }[];
    explanation: string;
  };
  practice: {
    question: string;
    tableData?: {
      headers: string[];
      rows: (string | number)[][];
    };
    type: 'choice' | 'number' | 'multi-part';
    options?: string[];
    correctAnswer: string | number;
    unit?: string;
    explanation: string;
    multiParts?: {
      id: string;
      prompt: string;
      type: 'choice' | 'number';
      options?: string[];
      correctAnswer: string;
      unit?: string;
      explanation: string;
    }[];
  };
}

export interface ConceptDrillItem {
  id: number;
  scenario: string;
  dataNote?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  whyNotOthers?: { option: string; reason: string }[];
}

export interface ChallengeQuestion {
  id: number;
  topic: string;
  title: string;
  tableData: {
    headers: string[];
    rows: (string | number)[][];
    caption?: string;
  };
  question: string;
  type: 'choice' | 'number';
  options?: string[];
  correctAnswer: string | number;
  unit?: string;
  tolerance?: number;
  calculationType: '비율' | '증가율' | '감소율' | '%p' | '격차' | '격차 증감' | '몇 배' | 'A는 B의 몇 %' | '계산법 판단';
  hint1: string; // 1차 오답 힌트
  hint2: string; // 2차 오답 계산법
  solution: string; // 3차 오답 최종 정답 및 상세 풀이
}

export interface UserAnswerState {
  questionId: number;
  attempts: number;
  userInputs: string[];
  isCorrect: boolean;
  status: 'unanswered' | 'attempt1_wrong' | 'attempt2_wrong' | 'solved' | 'revealed';
}
