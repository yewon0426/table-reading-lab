import { MissionData } from '../types';

export const MISSIONS: MissionData[] = [
  {
    id: 1,
    missionNumber: 1,
    keyword: '비율',
    badge: 'MISSION 1',
    title: '전체 중 얼마나 차지할까?',
    subtitle: '비율은 전체 중에서 어떤 부분이 얼마나 차지하는지를 나타냅니다.',
    explanation:
      '비율은 전체를 100으로 놓았을 때 특정 부분이 차지하는 크기(백분율)입니다. 표를 볼 때 항상 "전체 합계"가 얼마인지를 먼저 확인해야 합니다.',
    formula: '비율(%) = (해당 수 ÷ 전체) × 100',
    keyTip: "💡 %를 구하라고 하면 먼저 '전체'를 찾아라!",
    example: {
      title: '회사 내 여성 근로자 비율 구하기',
      description: '어느 회사의 근로자는 남성 600명, 여성 400명입니다.',
      dataCard: {
        category: '근로자 구성',
        items: [
          { label: '남성 근로자', value: '600명' },
          { label: '여성 근로자', value: '400명', highlight: true },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '전체 근로자 수 구하기',
          calculation: '600 + 400',
          result: '1,000명',
          explanation: '남성과 여성을 더해 전체 모수를 구합니다.',
        },
        {
          stepNum: 2,
          label: '여성 근로자 비율 계산',
          calculation: '400 ÷ 1,000 × 100',
          result: '40%',
          explanation: '여성 수(400)를 전체(1,000)로 나누고 100을 곱합니다.',
        },
      ],
      visualNote: '전체 1,000명 중 400명이므로 여성 근로자는 전체의 40%입니다.',
    },
    practice: {
      question: '다음 표를 보고 여성 근로자의 비율을 구해보세요.',
      tableData: {
        headers: ['구분', '남성', '여성'],
        rows: [['근로자 수', '700명', '300명']],
      },
      type: 'choice',
      options: ['30%', '40%', '70%', '300%'],
      correctAnswer: '30%',
      explanation:
        '정답: 30%\n전체 근로자 수 = 700 + 300 = 1,000명입니다.\n여성 근로자 비율 = 300 ÷ 1,000 × 100 = 30%입니다.',
    },
  },
  {
    id: 2,
    missionNumber: 2,
    keyword: '증가율·감소율',
    badge: 'MISSION 2',
    title: '처음보다 얼마나 변했을까?',
    subtitle: '증가율과 감소율은 처음 값과 비교해서 얼마나 변했는지를 나타냅니다.',
    explanation:
      '단순히 몇 명이 늘었는지가 아니라, "처음 상태를 기준(분모)으로 몇 %나 달라졌는가"를 따집니다. 시간이 흐르며 변할 때 항상 출발점(처음 값)을 분모에 둡니다.',
    formula: '증감률(%) = (나중 값 - 처음 값) ÷ 처음 값 × 100',
    keyTip: "🚨 증감률의 기준은 항상 '처음 값'",
    example: {
      title: '여성 평균 임금의 증가율 계산',
      description: '여성 평균 임금이 250만 원에서 300만 원으로 증가했습니다.',
      dataCard: {
        category: '임금 변화',
        items: [
          { label: '처음 값 (과거)', value: '250만 원' },
          { label: '나중 값 (현재)', value: '300만 원', highlight: true },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '증가한 금액(변화량) 계산',
          calculation: '300 - 250',
          result: '50만 원 증가',
          explanation: '나중 값에서 처음 값을 빼서 순수 증가량을 찾습니다.',
        },
        {
          stepNum: 2,
          label: '처음 값과 비교하여 증가율 계산',
          calculation: '50 ÷ 250 × 100',
          result: '20%',
          explanation: '증가량(50)을 나중 값이 아닌 처음 값(250)으로 나눕니다.',
        },
      ],
      visualNote: '250만 원 기준으로 50만 원이 늘었으므로 20% 증가입니다.',
    },
    practice: {
      question: '평균 임금이 200만 원에서 240만 원으로 올랐습니다. 몇 % 증가했을까요?',
      type: 'number',
      unit: '%',
      correctAnswer: '20',
      explanation:
        '정답: 20%\n증가량 = 240 - 200 = 40만 원\n증가율 = 40 ÷ 200 × 100 = 20% 입니다.',
    },
  },
  {
    id: 3,
    missionNumber: 3,
    keyword: '%와 %p',
    badge: 'MISSION 3',
    isTrickyWarning: true,
    title: '10% 증가? 10%p 증가?',
    subtitle: '비율 자체가 변할 때는 %p, 처음 값과 비교해 얼마나 증가했는지는 %를 씁니다.',
    explanation:
      '사회 통계에서 가장 많은 오답이 나오는 부분입니다. 이미 퍼센트(%) 단위인 수치끼리 단순히 뺄셈을 했을 때는 퍼센트포인트(%p)를 붙여야 합니다.',
    formula: '%p 변화 = 나중 비율(%) - 처음 비율(%)\n증가율(%) = (나중 비율 - 처음 비율) ÷ 처음 비율 × 100',
    keyTip: '📌 비율끼리 빼면 → %p\n📌 처음 값과 비교하면 → %',
    example: {
      title: '여성 고용률 변화 분석',
      description: '여성 고용률이 50%에서 60%로 증가했습니다.',
      dataCard: {
        category: '고용률 지표',
        items: [
          { label: '처음 고용률', value: '50%' },
          { label: '나중 고용률', value: '60%', highlight: true },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '비율 자체의 단순 차이 (%p)',
          calculation: '60 - 50',
          result: '10%p 증가',
          explanation: '비율끼리 직접 뺀 수치이므로 단위는 %가 아니라 %p입니다.',
        },
        {
          stepNum: 2,
          label: '처음 고용률 대비 증가율 (%)',
          calculation: '(60 - 50) ÷ 50 × 100',
          result: '20% 증가',
          explanation: '처음 50%에서 10%p가 늘었으므로, 10 ÷ 50 = 0.2 → 20%가 증가한 것입니다.',
        },
      ],
      visualNote: '50% → 60% 변화 시: ✅ 10%p 증가 / ✅ 20% 증가 둘 다 맞지만 의미와 단위가 다릅니다!',
    },
    practice: {
      question: '어느 지역의 고용률이 40%에서 50%로 증가하였습니다. 다음 두 물음에 답해보세요.',
      type: 'multi-part',
      correctAnswer: '10, 25',
      explanation: '① 50 - 40 = 10%p 증가\n② (50 - 40) ÷ 40 × 100 = 10 ÷ 40 × 100 = 25% 증가입니다.',
      multiParts: [
        {
          id: 'part1',
          prompt: '① 몇 %p 증가했는가?',
          type: 'number',
          unit: '%p',
          correctAnswer: '10',
          explanation: '50% - 40% = 10%p 증가',
        },
        {
          id: 'part2',
          prompt: '② 증가율은 몇 %인가?',
          type: 'number',
          unit: '%',
          correctAnswer: '25',
          explanation: '(50 - 40) ÷ 40 × 100 = 25% 증가',
        },
      ],
    },
  },
  {
    id: 4,
    missionNumber: 4,
    keyword: '격차',
    badge: 'MISSION 4',
    title: '두 집단의 차이는 얼마나 될까?',
    subtitle: '격차는 두 집단 값의 단순한 차이를 의미합니다.',
    explanation:
      '남성과 여성, 대기업과 중소기업 등 서로 다른 두 집단 사이의 거리(차이)를 잴 때는 큰 값에서 작은 값을 뺍니다.',
    formula: '격차 = 큰 값 - 작은 값',
    keyTip: '🚨 남성과 여성의 임금이 모두 증가했다고 해서 임금 격차도 반드시 증가하는 것은 아닙니다!',
    example: {
      title: '임금 격차와 격차 변화 추이',
      description: '남성 임금과 여성 임금의 차이를 확인합니다.',
      dataCard: {
        category: '2020년 vs 2025년 임금 비교',
        items: [
          { label: '2020 남성', value: '400만 원' },
          { label: '2020 여성', value: '250만 원' },
          { label: '2025 남성', value: '450만 원' },
          { label: '2025 여성', value: '350만 원' },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '2020년 임금 격차',
          calculation: '400 - 250',
          result: '150만 원',
          explanation: '2020년 남녀 임금 격차는 150만 원이었습니다.',
        },
        {
          stepNum: 2,
          label: '2025년 임금 격차',
          calculation: '450 - 350',
          result: '100만 원',
          explanation: '2025년 남녀 임금 격차는 100만 원입니다.',
        },
      ],
      visualNote: '150만 원 → 100만 원으로 격차가 50만 원 줄어들었습니다. (격차 감소)',
    },
    practice: {
      question: '다음 표를 보고 2020년 대비 2025년 두 집단의 격차 변화를 판단해보세요.',
      tableData: {
        headers: ['연도', 'A집단', 'B집단'],
        rows: [
          ['2020년', '300', '200'],
          ['2025년', '400', '320'],
        ],
      },
      type: 'choice',
      options: ['격차 증가', '격차 감소', '격차 동일', '판단 불가'],
      correctAnswer: '격차 감소',
      explanation:
        '정답: 격차 감소\n2020년 격차 = 300 - 200 = 100\n2025년 격차 = 400 - 320 = 80\n격차가 100에서 80으로 줄어들었으므로 "감소"입니다.',
    },
  },
  {
    id: 5,
    missionNumber: 5,
    keyword: '몇 배',
    badge: 'MISSION 5',
    title: '몇 배 차이일까?',
    subtitle: 'A가 B의 몇 배인지 알고 싶다면 A ÷ B를 계산합니다.',
    explanation:
      '배수를 구할 때는 질문의 주인공이 분자(위), 비교 기준이 분모(아래)에 들어갑니다. 질문 순서가 바뀌면 계산도 정반대가 됩니다.',
    formula: 'A는 B의 몇 배? = A ÷ B',
    keyTip: '“A가 B의 몇 배?” → A를 위에(분자) / B를 아래에(분모)',
    example: {
      title: '관리직 성별 인원 배수 비교',
      description: '남성 관리직 300명, 여성 관리직 100명일 때',
      dataCard: {
        category: '관리직 인원',
        items: [
          { label: '남성 관리직 (A)', value: '300명' },
          { label: '여성 관리직 (B)', value: '100명' },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '남성은 여성의 몇 배인가?',
          calculation: '300 ÷ 100',
          result: '3배',
          explanation: '질문의 주인공인 남성(300)이 분자, 기준인 여성(100)이 분모가 됩니다.',
        },
      ],
      counterExample: {
        title: '반대로 물어본다면?',
        description: '여성 관리직은 남성 관리직의 몇 배인가?',
        calculation: '100 ÷ 300',
        result: '약 0.33배 (3분의 1배)',
        lesson: '질문의 주어와 기준이 바뀌면 분자와 분모의 위치가 바뀝니다!',
      },
      visualNote: '누가 주인공인지 보고 "A ÷ B" 순서를 정확히 잡아야 합니다.',
    },
    practice: {
      question:
        '남성 평균 임금이 360만 원이고, 여성 평균 임금이 120만 원입니다. 남성 평균 임금은 여성 평균 임금의 몇 배일까요?',
      type: 'choice',
      options: ['2배', '3배', '0.33배', '4배'],
      correctAnswer: '3배',
      explanation:
        '정답: 3배\n남성(360) ÷ 여성(120) = 3배 입니다. (여성이 남성의 몇 배냐고 묻는다면 120 ÷ 360 = 약 0.33배)',
    },
  },
  {
    id: 6,
    missionNumber: 6,
    keyword: 'A는 B의 몇 %',
    badge: 'MISSION 6',
    title: '기준값과 비교하기',
    subtitle: 'A가 B의 몇 %인지 구하려면 A ÷ B × 100을 계산합니다.',
    explanation:
      '사회 과목에서 "여성 임금은 남성 임금의 몇 % 수준인가?"와 같이 특정 대상을 기준(B)으로 삼아 상대적 수준을 나타낼 때 사용합니다.',
    formula: 'A는 B의 몇 % = (A ÷ B) × 100',
    keyTip: '기준이 되는 대상(B)이 분모로 내려갑니다!',
    example: {
      title: '남성 임금 대비 여성 임금 비율',
      description: '남성 평균 임금 400만 원, 여성 평균 임금 300만 원',
      dataCard: {
        category: '성별 평균 임금',
        items: [
          { label: '남성 임금 (기준 B)', value: '400만 원' },
          { label: '여성 임금 (비교 대상 A)', value: '300만 원', highlight: true },
        ],
      },
      steps: [
        {
          stepNum: 1,
          label: '여성 임금은 남성 임금의 몇 %?',
          calculation: '300 ÷ 400 × 100',
          result: '75%',
          explanation: '기준이 되는 남성 임금(400)으로 여성 임금(300)을 나눈 뒤 100을 곱합니다.',
        },
      ],
      visualNote: '여성 평균 임금은 남성 평균 임금의 75% 수준입니다.',
    },
    trickyCheck: {
      question: '여성 임금이 남성 임금의 75%라면, 임금 격차도 75%일까요?',
      options: [
        { text: '맞다', isCorrect: false },
        { text: '아니다', isCorrect: true },
      ],
      explanation:
        '정답: 아니다!\n남성 임금을 100으로 보면 남성 = 100, 여성 = 75입니다.\n두 집단의 차이는 100 - 75 = 25입니다.\n따라서 남성 임금 대비 임금 격차는 25%입니다.',
    },
    practice: {
      question:
        '대기업 평균 근로시간이 40시간이고, 중소기업 평균 근로시간이 44시간입니다. 대기업 근로시간은 중소기업 근로시간의 몇 % 수준일까요? (소수점 첫째 자리에서 반올림하여 정수로 입력)',
      type: 'number',
      unit: '%',
      correctAnswer: '91',
      explanation:
        '정답: 91%\n기준(중소기업) = 44시간, 비교대상(대기업) = 40시간\n(40 ÷ 44) × 100 = 90.909...% → 반올림하면 약 91% 수준입니다.',
    },
  },
];
