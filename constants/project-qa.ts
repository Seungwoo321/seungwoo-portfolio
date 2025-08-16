export interface ProjectQA {
  question: string;
  answer: string;
  type: 'technical' | 'business' | 'design';
  code?: string;
  images?: string[];
}

const projectQAs: Record<string, ProjectQA[]> = {
  'e-torch': [
    {
      question: '데이터 소스 아키텍처가 개발 중에 변경된 이유는 무엇인가요?',
      answer: `초기에는 KOSIS/ECOS 데이터를 별도 DB에 마이그레이션하여 관리하는 구조로 설계했습니다. 이를 위해:
- CLI 도구를 개발하여 데이터 마이그레이션 자동화
- Mock API 서버를 구축하여 개발 환경 구성
- 별도 DB 운영을 위한 인프라 설계

하지만 실제 개발 과정에서 몇 가지 문제점을 발견했습니다:
1. DB 운영 비용이 예상보다 높음
2. 데이터 동기화 문제 (원본 데이터 업데이트 시 지연)
3. 새로운 지표 추가 시 개발자의 수동 작업 필요

AI와 논의 끝에 관리자 페이지를 통해 원본 데이터 소스에 직접 접근하는 방식으로 전환했습니다:
- 관리자가 필요한 지표의 파라미터를 DB에 저장
- 실시간으로 원본 API에서 데이터 페칭
- 비용 절감 및 데이터 최신성 보장`,
      type: 'technical',
      images: ['/images/e-torch-architecture-before.svg', '/images/e-torch-architecture-after.svg']
    },
    {
      question: '파라미터 관리 방식을 하드코딩에서 DB 관리로 변경한 이유는?',
      answer: `초기에는 각 경제 지표의 API 파라미터를 파일로 하드코딩하여 관리했습니다:

문제점:
- 새 지표 추가 시 개발자가 코드 수정 필요
- 파라미터 키값을 문서에 수동으로 추가
- 배포 없이는 지표 추가 불가능
- 비개발자는 지표 관리 불가능

해결책 - 관리자 페이지 + DB 관리:
- 관리자가 UI를 통해 지표 파라미터 설정
- 실시간 지표 추가/수정/삭제 가능
- 파라미터 템플릿 시스템 도입
- 버전 관리 및 롤백 기능 추가

이 변경으로 지표 추가 시간이 1-2일에서 5분으로 단축되었습니다.`,
      type: 'technical',
      code: `// Before: 하드코딩된 파라미터
const INDICATORS = {
  GDP: {
    apiKey: 'KOSIS_API_KEY',
    tableId: 'DT_1Y0001',
    params: { startPeriod: '2020', endPeriod: '2024' }
  }
}

// After: DB 기반 동적 파라미터
const indicator = await db.indicators.findOne({ code: 'GDP' });
const data = await fetchAPI(indicator.source, indicator.params);`,
      images: ['/images/e-torch-admin-panel.svg']
    },
    {
      question: '구독 모델(Basic/Pro)의 차별화 전략은 무엇인가요?',
      answer: `구독 모델은 사용자 니즈 분석과 경쟁 서비스 벤치마킹을 통해 설계했습니다:

Basic (무료):
- 개인 사용자, 학생 타겟
- 핵심 기능 제공으로 서비스 체험
- 20개 기본 지표로 시장 진입 장벽 낮춤
- 3년 데이터로 최근 트렌드 파악 가능

Pro (월 9,900원):
- 전문가, 기업 사용자 타겟
- 전체 기간 데이터로 장기 분석 가능
- API 접근으로 자동화 가능
- 워터마크 제거로 보고서 활용

가격 책정 근거:
- 경쟁 서비스 대비 50% 저렴
- 커피 2잔 가격으로 심리적 부담 최소화
- 연간 결제 시 20% 할인으로 lock-in 효과`,
      type: 'business',
      images: ['/images/e-torch-pricing.svg']
    },
    {
      question: 'LTTB 알고리즘을 차트 최적화에 적용한 이유는?',
      answer: `대량의 시계열 데이터를 차트로 렌더링할 때 성능 문제가 발생했습니다:

문제 상황:
- 10년치 일별 데이터 = 3,650개 데이터 포인트
- 브라우저 렌더링 지연 (2-3초)
- 모바일에서 더 심각한 성능 저하

LTTB (Largest Triangle Three Buckets) 알고리즘 적용:
- 시각적 품질 유지하면서 데이터 포인트 감소
- 3,650개 → 500개로 다운샘플링
- 렌더링 시간 80% 단축 (2.5초 → 0.5초)
- 줌인 시 원본 데이터로 점진적 로딩

구현 시 고려사항:
- 데이터 특성에 따른 버킷 크기 동적 조정
- 중요 이벤트(최대/최소값) 보존 로직 추가
- 캐싱 전략으로 재계산 최소화`,
      type: 'technical',
      code: `// LTTB 알고리즘 적용 예시
import { lttb } from '@/utils/lttb';

const optimizedData = lttb(
  originalData,  // 3,650 points
  500            // target points
);

// 성능 비교
// Before: 2,500ms render time
// After: 500ms render time (80% improvement)`,
      images: ['/images/e-torch-chart-performance.svg']
    },
    {
      question: 'AI 페어 프로그래밍은 어떻게 진행했나요?',
      answer: `Claude AI와 함께 전체 개발 프로세스를 진행했습니다:

1. 기획 단계:
- 시장 조사 및 경쟁 분석을 AI와 논의
- 사용자 페르소나 정의
- 기능 우선순위 결정

2. 설계 단계:
- 시스템 아키텍처 다이어그램 작성
- API 스펙 정의
- 데이터베이스 스키마 설계

3. 구현 단계:
- 복잡한 알고리즘 구현 시 AI와 페어 코딩
- 코드 리뷰 및 리팩토링
- 테스트 케이스 작성

4. 문제 해결:
- 데이터 소스 아키텍처 변경 결정
- 성능 최적화 방안 논의
- 버그 원인 분석 및 해결

AI 활용의 장점:
- 24시간 즉시 피드백 가능
- 다양한 관점에서 문제 접근
- 베스트 프랙티스 즉시 적용
- 문서화 자동화로 시간 절약`,
      type: 'technical',
      images: ['/images/e-torch-ai-collaboration.svg']
    }
  ],

  'penguinjs': [
    {
      question: '왜 JavaScript 학습 플랫폼을 게임으로 만들었나요?',
      answer: `기존 온라인 학습 플랫폼의 한계를 극복하고자 했습니다:

문제점:
- 텍스트 위주 설명으로 지루함
- 추상적 개념 이해의 어려움
- 즉각적인 피드백 부족
- 학습 동기 유지 어려움

게임화(Gamification)의 장점:
- 시각적 피드백으로 즉각적인 이해
- 단계별 성취감으로 동기 부여
- 실패를 재미있게 받아들임
- 반복 학습이 자연스러움

Flexbox Froggy의 성공 사례를 JavaScript로 확장:
- CSS는 시각적이라 게임화가 쉬움
- JavaScript는 로직 중심이라 도전적
- 메모리 상태 시각화로 차별화
- 실시간 코드 실행 결과 확인`,
      type: 'design',
      images: ['/images/penguinjs-game-concept.svg']
    },
    {
      question: '중급 이상 개발자를 타겟으로 한 이유는?',
      answer: `시장 분석과 차별화 전략의 결과입니다:

초급자 대상 플랫폼은 이미 포화:
- Codecademy, freeCodeCamp 등 다수 존재
- 기초 문법은 충분한 자료 있음

중급 개발자의 페인 포인트:
- 클로저, 프로토타입 같은 심화 개념 이해 부족
- 실무에서 버그 발생 시 원인 파악 어려움
- 면접 대비 깊이 있는 학습 필요
- 시니어로 성장하기 위한 기반 지식 부족

차별화된 콘텐츠:
- 메모리 동작 원리 시각화
- 실행 컨텍스트 시뮬레이션
- 이벤트 루프 애니메이션
- 실제 버그 시나리오 재현

타겟 검증:
- 중급 개발자 10명 인터뷰 진행
- "이런 걸 신입 때 알았다면" 공통 피드백
- 특히 클로저, 비동기 개념 학습 니즈 확인`,
      type: 'business',
      images: ['/images/penguinjs-target-analysis.svg']
    },
    {
      question: 'Closure Cave 게임의 학습 메커니즘은 어떻게 설계했나요?',
      answer: `클로저 개념을 동굴 탐험 메타포로 구현했습니다:

게임 메커니즘:
1. 동굴 = 함수 스코프
2. 보물 = 변수 (💎 다이아몬드, 💚 에메랄드, 💙 사파이어)
3. 펭귄 = 실행 컨텍스트
4. 열쇠 = 클로저로 접근 권한

실제 구현된 5개 스테이지:
- Stage 1: 동굴 입구 - 첫 번째 보물 (기본 클로저)
- Stage 2: 비밀 통로 - 숨겨진 보물들 (프라이빗 변수)
- Stage 3: 얼음 미로 - 다중 경로 (반복문과 클로저)
- Stage 4: 마법의 연구실 - 주문 제작 (모듈 패턴)
- Stage 5: 최종 보스 - 기억의 수호자 (메모리 관리)

학습 강화 요소:
- gameElements: 펭귄 위치, 보물, 장애물, 출구 포털
- successConditions: 수집한 보물 수, 생성된 변수, 반환된 함수
- 테스트 케이스: 각 스테이지별 자동 검증
- 힌트 시스템: 3단계 점진적 도움말

실제 구현 코드와 연결:
- Monaco Editor로 실제 코드 작성
- Web Worker로 안전한 코드 실행
- 시각적 피드백과 애니메이션 연동`,
      type: 'technical',
      code: `// Stage 1 실제 코드: 동굴 입구 - 첫 번째 보물
function openTreasureBox() {
  let treasure = "💎 다이아몬드";
  
  return function() {
    return treasure; // 클로저로 보물 접근
  };
}

const getTreasure = openTreasureBox();
return getTreasure(); // 펭귄이 보물 획득!`,
      images: ['/images/penguinjs-closure-cave.svg']
    },
    {
      question: 'CallStack Library 게임은 어떻게 콜스택을 학습시키나요?',
      answer: `콜스택 동작을 도서관 메타포로 시각화했습니다:

게임 컨셉:
- 도서관 = 메모리 공간
- 책 = 함수
- 책장 = 콜스택
- 사서 펭귄 = JavaScript 엔진

시각화 메커니즘:
1. 함수 호출 시 책이 책장에 쌓임
2. 실행 중인 함수는 하이라이트
3. return 시 책이 책장에서 제거
4. 스택 오버플로우 시 책장 붕괴 애니메이션

학습 강화 요소:
- 단계별 실행: Step-by-step 디버깅 모드
- 실행 순서 예측: 코드 보고 스택 상태 맞추기
- 재귀 함수 시각화: factorial 같은 실전 예제
- 비동기 구분: 콜스택 vs 태스크 큐 구분

난이도 진행:
- 초급: 단순 함수 호출 순서
- 중급: 중첩 함수, 재귀
- 고급: 비동기 함수, 이벤트 루프와 연계

교육적 효과:
- 스택 오버플로우 에러 원인 이해
- 디버깅 시 콜스택 추적 능력 향상
- 비동기 코드 실행 순서 예측 가능`,
      type: 'technical',
      images: ['/images/penguinjs-callstack-library.svg']
    },
    {
      question: '왜 18개 게임 중 2개만 구현했나요?',
      answer: `MVP(Minimum Viable Product) 전략과 검증 우선 접근:

전체 비전:
- 18개 게임으로 JavaScript 전체 커버
- 각 15단계씩 총 270개 스테이지
- 예상 개발 기간: 1년

MVP로 시작한 이유:
1. 핵심 가설 검증
   - 게임으로 JavaScript 학습이 효과적인가?
   - 중급 개발자에게 어필하는가?
   - 기술적 구현이 가능한가?

2. 가장 어려운 개념부터 구현
   - 클로저와 콜스택이 가장 추상적
   - 이것이 가능하면 나머지도 가능
   - 초기 사용자 피드백 수집

3. 리소스 효율성
   - 전체 구현 전 방향성 검증
   - 사용자 반응 보고 우선순위 조정
   - 펀딩이나 팀 빌딩 위한 프로토타입

현재 성과와 계획:
- 2개 게임으로 컨셉 검증 완료
- 사용자 피드백 긍정적
- Promise Battle 게임 30% 구현
- 점진적으로 나머지 게임 추가 예정`,
      type: 'business',
      images: ['/images/penguinjs-roadmap.svg']
    }
  ],

  'tailwind-grid-layout': [
    {
      question: 'react-grid-layout이 있는데 왜 새로 만들었나요?',
      answer: `E-Torch 프로젝트 개발 중 react-grid-layout의 한계를 발견했습니다:

문제점:
1. Tailwind CSS와 스타일 충돌
   - inline 스타일 의존도 높음
   - Tailwind 유틸리티 클래스 적용 어려움
   - 다크모드 전환 시 복잡한 오버라이드 필요

2. 번들 사이즈
   - 30KB+ gzipped
   - 의존성 포함 시 더 증가
   - 모바일 환경에서 부담

3. 커스터마이징 제약
   - 스타일 수정이 매우 복잡
   - TypeScript 타입 불완전
   - 터치 이벤트 최적화 부족

해결 방안:
- Tailwind CSS 네이티브로 재구현
- 번들 사이즈 30% 감소 (22KB)
- 100% TypeScript로 작성
- API는 100% 호환 유지 (마이그레이션 용이)

개발 과정:
- AI와 TDD로 개발 (테스트 먼저 작성)
- 100% 테스트 커버리지 달성
- react-grid-layout 모든 기능 구현
- 추가로 모바일 터치 최적화`,
      type: 'technical',
      images: ['/images/tailwind-grid-comparison.svg']
    },
    {
      question: '100% 테스트 커버리지는 어떻게 달성했나요?',
      answer: `AI 페어 프로그래밍과 TDD(Test-Driven Development) 방법론을 활용했습니다:

TDD 프로세스:
1. 테스트 먼저 작성 (Red)
2. 최소 코드로 테스트 통과 (Green)
3. 리팩토링 (Refactor)
4. 반복

AI 활용 전략:
- 엣지 케이스 테스트 케이스 생성
- 코드 커버리지 분석 및 누락 부분 발견
- 테스트 시나리오 자동 생성
- 리팩토링 제안

테스트 구성:
- 유닛 테스트: 개별 함수 동작
- 통합 테스트: 컴포넌트 상호작용
- E2E 테스트: 실제 사용 시나리오
- 성능 테스트: 렌더링 최적화 검증

주요 테스트 영역:
- 드래그 앤 드롭 로직
- 충돌 감지 알고리즘
- 반응형 브레이크포인트
- 터치 이벤트 처리
- 접근성 기능

결과:
- 버그 발생률 90% 감소
- 리팩토링 시 안정성 보장
- 새 기능 추가 시 회귀 버그 방지`,
      type: 'technical',
      code: `// TDD 예시: 충돌 감지 테스트
describe('collision detection', () => {
  it('should detect overlap when items intersect', () => {
    const item1 = { x: 0, y: 0, w: 2, h: 2 };
    const item2 = { x: 1, y: 1, w: 2, h: 2 };
    
    expect(detectCollision(item1, item2)).toBe(true);
  });
  
  it('should not detect collision when items are adjacent', () => {
    const item1 = { x: 0, y: 0, w: 2, h: 2 };
    const item2 = { x: 2, y: 0, w: 2, h: 2 };
    
    expect(detectCollision(item1, item2)).toBe(false);
  });
});`,
      images: ['/images/tailwind-grid-coverage.svg']
    },
    {
      question: '모바일 터치 최적화는 어떻게 구현했나요?',
      answer: `모바일 사용성을 위해 터치 이벤트를 완전히 재설계했습니다:

문제점:
- 작은 화면에서 정확한 터치 어려움
- 스크롤과 드래그 충돌
- 멀티터치로 인한 오동작
- 긴 터치 시 컨텍스트 메뉴 표시

해결책:

1. 터치 포인트 정확도 개선
   - 터치 영역 40px로 확대
   - 터치 시작점 보정 알고리즘
   - 시각적 피드백 강화

2. 제스처 인식 시스템
   - 300ms 롱프레스로 드래그 시작
   - 짧은 탭은 선택으로 처리
   - 스와이프는 스크롤로 구분

3. 스크롤-드래그 충돌 방지
   - 드래그 중 스크롤 비활성화
   - 방향 감지로 의도 파악
   - passive 리스너로 성능 최적화

4. 멀티터치 방지
   - 첫 번째 터치만 처리
   - 추가 터치 무시
   - 핀치 줌은 별도 처리

성능 최적화:
- 터치 이벤트 디바운싱 (16ms)
- will-change로 GPU 가속
- 터치 중 애니메이션 비활성화`,
      type: 'technical',
      code: `// 터치 이벤트 최적화
const handleTouchStart = (e: TouchEvent) => {
  // 멀티터치 방지
  if (e.touches.length > 1) return;
  
  // 롱프레스 감지
  longPressTimer = setTimeout(() => {
    setIsDragging(true);
    hapticFeedback(); // 진동 피드백
  }, 300);
  
  // 스크롤 방지
  e.preventDefault();
};`,
      images: ['/images/tailwind-grid-mobile.svg']
    }
  ],

  'frontend-learning-app': [
    {
      question: 'AI로 1600개 토픽을 어떻게 생성했나요?',
      answer: `체계적인 콘텐츠 생성 파이프라인을 구축했습니다:

1. 토픽 구조 설계:
   - HTML/CSS/JavaScript 3개 대분류
   - 각 20-30개 카테고리
   - 카테고리당 20-30개 토픽
   - 총 1600+ 토픽 도출

2. AI 프롬프트 엔지니어링:
   - 일관된 형식의 템플릿 작성
   - 3단계 난이도별 설명 규칙 정의
   - 코드 예제 포함 규칙
   - 용어 일관성 유지 가이드

3. 자동화 스크립트:
   - 토픽별 AI 콘텐츠 생성
   - 마크다운 파일로 자동 저장
   - 메타데이터 자동 생성
   - 품질 검증 스크립트

4. 품질 관리:
   - 중복 내용 체크
   - 난이도 일관성 검증
   - 코드 예제 실행 테스트
   - 수동 샘플링 검토

현재 상태:
- 200+ 토픽 생성 완료
- 일부 파싱 오류 수정 중
- 점진적으로 추가 생성 중`,
      type: 'technical',
      code: `// AI 콘텐츠 생성 스크립트
async function generateTopic(topic) {
  const prompt = \`
    주제: \${topic.name}
    
    다음 3가지 난이도로 설명하세요:
    1. 쉬움 (중학생도 이해 가능)
    2. 일반 (실무 개발자 수준)
    3. 전문가 (깊이 있는 설명)
    
    각 난이도별로:
    - 개념 설명
    - 코드 예제
    - 실습 문제
    - 퀴즈
  \`;
  
  const content = await ai.generate(prompt);
  await saveToFile(topic.id, content);
}`,
      images: ['/images/learning-app-content-pipeline.svg']
    },
    {
      question: 'React Native와 WebView를 혼합한 이유는?',
      answer: `기술적 제약과 유연성을 모두 해결하기 위한 하이브리드 접근:

React Native의 한계:
1. 마크다운 렌더링 제약
   - 복잡한 코드 하이라이팅 어려움
   - 수식, 다이어그램 표현 한계
   - 동적 콘텐츠 업데이트 복잡

2. 콘텐츠 생산성 문제
   - TypeScript 모듈로 작성 시 오류 빈발
   - 백틱, 특수문자 이스케이프 문제
   - 빌드 없이 콘텐츠 수정 불가

해결책 - 하이브리드 아키텍처:

React Native 담당:
- 네비게이션 및 라우팅
- 학습 경로 관리
- 진도 추적 시스템
- 네이티브 기능 (푸시, 저장)

WebView (React 웹앱) 담당:
- 학습 콘텐츠 렌더링
- 코드 에디터 및 실행
- 마크다운 파싱
- 인터랙티브 시각화

통신 브릿지:
- postMessage로 양방향 통신
- 진도 데이터 동기화
- 테마 설정 공유
- 에러 핸들링 통합

장점:
- 콘텐츠 업데이트 유연성
- 웹 기술 활용 가능
- 빠른 개발 속도
- 크로스 플랫폼 일관성`,
      type: 'technical',
      images: ['/images/learning-app-architecture.svg']
    },
    {
      question: '3단계 난이도 시스템의 교육학적 근거는?',
      answer: `Bloom's Taxonomy와 Scaffolding 이론을 기반으로 설계:

이론적 배경:
1. Zone of Proximal Development (ZPD)
   - 현재 수준과 잠재 수준 사이
   - 적절한 도전 과제 제공
   - 점진적 난이도 상승

2. Scaffolding (비계 이론)
   - 초기에 많은 지원
   - 점진적으로 지원 감소
   - 최종적으로 독립 학습

3단계 설계:

쉬움 (중학생 수준):
- 일상 비유 사용
- 전문 용어 최소화
- 시각적 설명 중심
- "마치 ~와 같다" 표현

일반 (실무 수준):
- 적절한 전문 용어
- 실제 사용 사례
- 코드 예제 중심
- 베스트 프랙티스

전문가 (심화 수준):
- 내부 동작 원리
- 성능 고려사항
- 엣지 케이스
- 역사적 맥락

효과:
- 학습자 수준별 맞춤 학습
- 같은 개념 반복으로 강화
- 점진적 깊이 확장
- 자신감 있는 학습 진행`,
      type: 'design',
      images: ['/images/learning-app-difficulty-levels.svg']
    }
  ],

  'vue-pivottable': [
    {
      question: 'jQuery 의존성을 제거한 과정은 어떠했나요?',
      answer: `원본 PivotTable.js의 jQuery 의존성을 Vue의 반응형 시스템으로 대체했습니다:

도전 과제:
1. DOM 조작 로직 변환
   - jQuery의 직접 DOM 조작 → Vue 템플릿
   - 이벤트 핸들링 → Vue 이벤트 시스템
   - 플러그인 시스템 → Vue 컴포넌트

2. 상태 관리 재설계
   - 전역 변수 → Vue data/computed
   - 콜백 함수 → Vue methods/watch
   - 플러그인 상태 → Vuex 고려

3. 드래그 앤 드롭 재구현
   - jQuery UI → 네이티브 HTML5 DnD API
   - 터치 이벤트 추가 지원
   - Vue 디렉티브로 캡슐화

성과:
- 번들 사이즈 40% 감소
- 렌더링 성능 30% 향상
- Vue 생태계 완벽 통합
- 반응형 데이터 업데이트`,
      type: 'technical',
      code: `// jQuery 방식
$('#pivot').pivotUI(data, {
  rows: ['Category'],
  cols: ['Month'],
  onChange: function() { ... }
});

// Vue 방식
<vue-pivottable
  :data="data"
  :rows="['Category']"
  :cols="['Month']"
  @change="handleChange"
/>`,
      images: ['/images/vue-pivottable-migration.svg']
    }
  ],

  'vue3-pivottable': [
    {
      question: '직장 동료와 팀 프로젝트로 진행한 이유는?',
      answer: `Vue 2로 개발한 개인 프로젝트를 Vue 3로 마이그레이션하면서 직장 동료들과 함께 진행했습니다:

배경:
- Vue 2 → Vue 3 생태계 전환 필요성
- 혼자서는 시간과 리소스 한계
- 직장 동료들도 Vue 3 학습 니즈 있음

협업 방식:
1. 주간 미팅
   - 매주 진행 상황 공유
   - 기술적 이슈 논의
   - 코드 리뷰 세션

2. 역할 분담 (GitHub 커밋 로그 기준)
   - Seungwoo321 (나): 프로젝트 리드, 핵심 아키텍처 설계
   - hyemyn2, gingerbeerlime: UI 주요 컴포넌트 개발, 기존 Vue2 코드 분석 및 불필요 코드 제거, 리팩토링 및 로직 개선

3. 개발 프로세스
   - GitHub PR 기반 작업
   - 코드 리뷰 필수
   - 기능별 브랜치 전략

성과:
- TypeScript 100% 전환
- 번들 사이즈 35% 감소
- Vue 3 Composition API 적용
- 팀원들의 Vue 3 역량 향상`,
      type: 'business'
    },
    {
      question: 'Vue 2에서 Vue 3로 마이그레이션하면서 가장 어려웠던 점은?',
      answer: `기술적 도전과 팀 협업의 균형을 맞추는 것이 핵심이었습니다:

기술적 도전:
1. Composition API 전환
   - Options API → Composition API
   - 반응성 시스템 변경 (Proxy 기반)
   - 생명주기 훅 변경

2. TypeScript 도입
   - 기존 JavaScript 코드 타입 정의
   - 제네릭 타입 설계
   - Props/Emit 타입 안정성

3. 빌드 도구 변경
   - Rollup → Vite
   - 개발 환경 최적화
   - 트리 쉐이킹 개선

팀 협업 측면:
- 각자 다른 Vue 3 숙련도
- 코드 스타일 통일
- 리뷰 기준 수립

해결 방법:
- 단계적 마이그레이션 전략
- 페어 프로그래밍 세션
- 내부 스터디 진행
- 상세한 PR 설명과 리뷰`,
      type: 'technical'
    }
  ]
};

export const getProjectQA = (projectId: string): ProjectQA[] => {
  return projectQAs[projectId] || [];
};