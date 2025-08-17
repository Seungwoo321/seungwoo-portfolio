export interface ProjectQA {
  question: string;
  answer: string;
  type: 'technical' | 'business' | 'design';
  code?: string;
}

const projectQAs: Record<string, ProjectQA[]> = {
  'e-torch': [
    {
      question: '데이터 소스 아키텍처가 개발 중에 변경된 이유는 무엇인가요?',
      answer: `초기에는 KOSIS/ECOS 데이터를 별도 DB에 마이그레이션하여 관리하는 구조로 설계했습니다. 이를 위해:
- CLI 도구를 개발하여 데이터 마이그레이션 자동화
- Mock API 서버를 구축하여 개발 환경 구성
  - URL: https://etorch-mock-api.vercel.app/
  - GitHub: https://github.com/Seungwoo321/etorch-mock-api
  - JSON Server 기반으로 RESTful API 구현
- 별도 DB 운영을 위한 인프라 설계

하지만 실제 개발 과정에서 몇 가지 문제점을 발견했습니다:
1. DB 운영 비용이 예상보다 높음
2. 데이터 동기화 문제 (원본 데이터 업데이트 시 지연)
3. 새로운 지표 추가 시 개발자의 수동 작업 필요

AI와 논의 끝에 관리자 페이지를 통해 원본 데이터 소스에 직접 접근하는 방식으로 전환했습니다:
- 관리자가 필요한 지표의 파라미터를 DB에 저장
- 실시간으로 원본 API에서 데이터 페칭
- 비용 절감 및 데이터 최신성 보장`,
      type: 'technical'
    },
    {
      question: '파라미터 관리 방식을 하드코딩에서 DB 관리로 변경한 이유는?',
      answer: `초기에 파일로 하드코딩한 이유:
- KOSIS/ECOS 각각 파라미터 체계가 달라 복잡함
- 원하는 지표만 선별하여 관리 필요
- 처음부터 DB 구축은 개발 부담이 큼
- 초기 52개 지표로 시작 (KOSIS 14개, ECOS 38개)
  참고: https://github.com/Seungwoo321/etorch-docs/blob/main/product-spec.md#부록-제공-경제지표-상세-목록

하지만 파일 관리의 문제점 발견:
- 52개 지표로 제한, 확장 불가능
- 새 지표 추가 시 개발자가 코드 수정 필요
- 배포 없이는 지표 추가 불가능
- 비개발자는 지표 관리 불가능

AI 기반 개발의 이점 발견:
- AI와 협업하여 관리자 페이지 빠르게 구현
- 복잡한 파라미터 체계도 UI로 쉽게 관리
- DB 설계와 구현이 예상보다 빠름

최종 해결책 - 관리자 페이지 + DB:
- 관리자가 UI를 통해 지표 파라미터 설정
- 실시간 지표 추가/수정/삭제 가능
- 파라미터 템플릿 시스템 도입

결과:
- 52개 제한에서 무제한 확장 가능한 구조로 전환
- 개발자 개입 없이 KOSIS/ECOS 수천 개 지표 즉시 추가 가능
- 지표 추가 시간: 1-2일(개발/배포) → 5분(관리자 페이지)`,
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
const data = await fetchAPI(indicator.source, indicator.params);`
    },
    {
      question: '복잡한 다중 시계열 차트 UI를 어떻게 설계했나요?',
      answer: `서로 다른 단위의 경제 지표를 하나의 차트에 표시하는 UI 플로우 설계 과정입니다:

초기 접근의 문제점 (2024년 6월):
기존 방식: 옵션창에서 지표 선택 → 조회 버튼 → 데이터 가져와서 차트 표시
- 단일 지표는 간단했지만 복수 지표에서 문제 발생
- GDP(조 단위), 환율(천원대), 실업률(%)을 하나의 Y축에?
- 각 지표마다 Y축 설정을 사용자가 수동으로?
- 데이터 조회 후에야 스케일 문제 발견

핵심 문제:
"지표 선택 → 데이터 조회 → Y축 할당" 순서가 잘못됐다!
- 데이터를 먼저 가져온 후 Y축을 정하니 너무 복잡
- 사용자는 어떤 Y축에 할당될지 예측 불가
- 스케일이 다른 데이터가 섞여 차트가 망가짐

해결책 - 플로우 재설계 (2025년 5월):
1. 시리즈 슬롯 먼저 생성 (최대 5개)
2. 각 슬롯에서 지표 검색 (모달로 분리)
3. Y축 자동 제안 (첫 번째=left, 두 번째=right, 변경 가능)
4. 설정 완료 후 데이터 조회
5. 차트에 시각화

SeriesConfiguration 컴포넌트의 혁신:
- 데이터 조회 전에 Y축 할당 완료
- 시리즈별 독립적 설정으로 명확한 구조
- 지표 검색과 설정을 분리해 복잡도 감소
- 실시간 미리보기로 결과 예측 가능

결과:
- "설정 먼저, 조회 나중" 패러다임으로 문제 해결
- 사용자가 Y축 배치를 완전히 제어 가능
- 복잡한 다중 지표도 직관적으로 설정`,
      type: 'technical'
    },
    {
      question: 'AI와의 협업 방법론은 어떻게 구축했나요?',
      answer: `체계적인 AI 협업을 위해 2개의 개발 가이드라인을 작성하여 프로젝트 전반에 적용했습니다:

AI 개발 가이드라인:
https://github.com/Seungwoo321/etorch-docs/blob/main/AI_DEVELOPMENT_GUIDELINES.md
https://github.com/Seungwoo321/etorch-docs/blob/main/ROOT_CAUSE_ANALYSIS_GUIDE.md

핵심 협업 원칙:
1. Sequential Thinking 접근법
   - 모든 작업을 단계별로 체계적 수행
   - 분석 → 계획 → 실행 → 검증 순서 준수
   - 각 단계별 명확한 문서화

2. 승인 기반 작업 프로세스
   - 코드 변경 전 명시적 승인 필수
   - 변경 이유와 영향 범위 설명
   - 무단 수정 엄격히 금지

3. 근본 원인 분석 (RCA)
   - "코드는 진실이다" 원칙
   - 가정 없이 증거 기반 분석
   - 시각화를 통한 문제 파악

실제 적용 사례:
- 개발 중 발생한 모든 이슈를 가이드라인 기반으로 해결
- Sequential Thinking으로 문제를 단계별 분해
- 근본 원인 분석으로 정확한 문제 지점 파악
- 관리자 페이지, LTTB 등 AI 제안사항 검토 후 적용

결과:
- 명확한 가이드라인으로 AI와 일관된 협업
- 예상치 못한 개선사항 발견 및 적용
- 6개월 막혔던 문제를 2주 만에 해결`,
      type: 'technical'
    }
  ],

  'penguinjs': [
    {
      question: '왜 JavaScript 학습 플랫폼을 게임으로 만들었나요?',
      answer: `Flexbox Froggy를 즐겁게 플레이한 경험에서 영감을 받았습니다.

시작 계기:
- JavaScript의 추상적 개념들도 게임으로 만들면 재미있겠다는 생각
- 클로저나 콜스택 같은 개념을 시각적으로 표현해보고 싶었음
- 개인적으로 게임을 만들어보고 싶다는 호기심

게임 방식을 선택한 이유:
- 코드만 보면 지루한데 시각적 피드백이 있으면 재미있음
- 스테이지 클리어하는 성취감이 학습 동기가 됨
- 틀려도 게임이니까 부담 없이 다시 시도
- 자연스럽게 반복하면서 개념이 익숙해짐

개발 과정의 재미:
- 동굴 탐험, 도서관 정리 등 게임 메타포 설계
- 펭귄이 보물을 찾아가는 애니메이션 구현
- 코드 에디터에서 실제 코딩하면서 게임 진행

향후 계획:
- 18개 게임 기획 중 2개 완료, 나머지 점진적 구현 예정
- Promise Battle (비동기) 게임 개발 중
- 각 게임당 15단계씩 총 270개 스테이지 목표`,
      type: 'design'
    },
    {
      question: 'Closure Cave 게임의 학습 메커니즘은 어떻게 설계했나요?',
      answer: `클로저 개념을 동굴 탐험 메타포로 구현했습니다:

게임 메커니즘:
1. 동굴 = 함수 스코프
2. 보물 = 변수 (💎 다이아몬드, 💚 에메랄드, 💙 사파이어)
3. 펭귄 = 실행 컨텍스트
4. 열쇠 = 클로저로 접근 권한

실제 구현된 15개 스테이지 예시:
- 초급: 기본 함수 스코프, 간단한 클로저, 외부 변수 접근 등 5단계
- 중급: 카운터 구현, 데이터 보호, 모듈 패턴 등 5단계  
- 고급: 메모리 관리, 팩토리 패턴, 이벤트 핸들러 등 5단계

학습 강화 요소:
- gameElements: 펭귄 위치, 보물, 장애물, 출구 포털
- successConditions: 수집한 보물 수, 생성된 변수, 반환된 함수
- 테스트 케이스: 각 스테이지별 자동 검증
- 힌트 시스템: 3단계 점진적 도움말

실제 구현 방식:
- 코드 에디터에서 JavaScript 작성
- eval()과 Function()으로 코드 실행 및 검증
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
return getTreasure(); // 펭귄이 보물 획득!`
    },
    {
      question: 'CallStack Library 게임은 어떻게 콜스택을 학습시키나요?',
      answer: `콜스택 동작을 5가지 레이아웃 타입으로 단계적으로 학습합니다:

6가지 레이아웃 시스템:
1. 레이아웃 A (초급 1-8단계): 기본 콜스택
   - 함수 호출 순서 예측
   - 코드 에디터 + 콜스택 + 함수 선택기
   - 단순한 함수 호출과 반환 흐름 이해

2. 레이아웃 A+ (중급 9-16단계): 시작/종료 추적
   - LIFO(Last In First Out) 원칙 체득
   - 함수 시작과 종료 시점 파악
   - 중첩 함수와 재귀 패턴 학습

3. 레이아웃 E (고급 17-21단계): 스택 스냅샷
   - 실행 단계별 스택 상태 예측
   - 스냅샷 빌더로 각 시점의 콜스택 상태 구성
   - 복잡한 재귀와 중첩 호출 분석

4. 레이아웃 B (고급 22단계): 이벤트 루프
   - 콜스택 + 마이크로/매크로 태스크 큐
   - Promise, setTimeout 등 비동기 처리

5. 레이아웃 C (고급 23단계): 다중 큐 시스템
   - 5개 큐 (콜스택, 마이크로, 매크로, 애니메이션, 제너레이터)
   - 복잡한 비동기 패턴 이해

6. 레이아웃 D (고급 24단계): 최종 통합
   - 6개 큐 시스템 완전 통합
   - 실무 수준의 복잡한 비동기 처리

교육적 특징:
- 레이아웃별로 UI 구성과 평가 방식이 다름
- 점진적 난이도 상승으로 자연스러운 학습
- 실제 코드 작성과 실행 순서 예측 병행`,
      type: 'technical'
    },
    {
      question: '게임 개발하면서 가장 어려웠던 점은 무엇인가요?',
      answer: `기획 없이 시작해서 개발하면서 동시에 설계하는 것이 가장 어려웠습니다:

1. 디자인 시스템 부재
   - 다크/라이트 테마 구현에서 상당히 애먹음
   - 게임별 일관된 UI/UX 가이드라인 없음
   - E-Torch와 달리 기획서나 화면 설계 없이 시작
   
2. CallStack Library 레이아웃 설계 혼란
   - 6개 레이아웃별로 다른 화면 구성과 기능
   - 처음 15단계로 시작했다가 24단계로 증가
   - 레이아웃 B, C, D는 각 1회만 사용 (22, 23, 24단계)
   - 반복 학습 부족으로 학습 효과 저하 우려
   
3. 개발과 기획의 충돌
   - 코드 작성하면서 동시에 게임 설계
   - 이미 구현한 부분 때문에 기획 변경 어려움
   - 전체적인 일관성과 완성도 부족
   
4. 시행착오로 얻은 교훈
   - 단순한 호기심 "이게 될까?"로 시작
   - 아무것도 없이 바로 코딩 시작
   - 기획과 디자인이 막히니 개발도 막힘
   - 체계적인 기획의 중요성 절감

E-Torch와의 차이:
- E-Torch: 2주간 문서 작성 후 개발 → 순조로운 진행
- PenguinJS: 기획 없이 바로 개발 → 지속적인 설계 변경과 혼란

AI 개발의 교훈:
"AI 개발은 상상을 현실로 만들어주지만, 구체적인 상상이 없으면 AI도 현실화하기 어렵다"
- 명확한 비전과 설계가 있어야 AI가 제대로 도와줄 수 있음
- 추상적인 아이디어만으로는 AI와 협업해도 한계가 명확

그럼에도 불구하고:
- 기획 없이 시작했지만 결과물의 완성도에는 만족
- 아직 버그는 있지만 핵심 게임플레이는 잘 작동
- 추상적인 JavaScript 개념을 실제 플레이 가능한 게임으로 구현한 것 자체가 성과`,
      type: 'technical'
    }
  ],

  'tailwind-grid-layout': [
    {
      question: 'react-grid-layout이 있는데 왜 새로 만들었나요?',
      answer: `E-Torch 프로젝트에서 react-grid-layout을 사용하며 반복적인 문제가 발생했습니다:

구체적인 문제점:
- resize 시 height = 0
- drag 시 width = 0  
- 위젯 위치가 비정상적으로 이동
- shadcn/ui + Tailwind CSS 조합에서 충돌 추정

기존 해결 시도:
- 다양한 설정 조합 시도
- CSS 오버라이드 적용
- 여러 버전 테스트
- 모두 근본적 해결 불가

새로운 접근:
"포기 대신 AI 활용해 새로 만들기로 결정"
- Claude Code + MCP CLI 기반 AI 주도 개발
- 처음부터 만드는 프로젝트라 AI에 전면 위임 가능
- Tailwind CSS v4 + shadcn/ui 환경에 최적화

결과:
- react-grid-layout 100% API 호환성 유지
- 번들 사이즈 30% 감소
- shadcn/ui 환경에서 안정적 동작
- 100% 테스트 커버리지와 자동 배포 구축`,
      type: 'technical'
    },
    {
      question: 'AI와의 역할 분담은 어떻게 했나요?',
      answer: `Claude Code + MCP CLI를 활용한 완전한 AI 주도 개발을 실험했습니다:

내 역할:
- 기능 테스트 및 요구사항 정리
- Vercel에서 GitHub 레포 직접 연동
- NPM 배포용 키 등록 등 민감한 설정 처리

Claude 역할:
- 코드 작성 및 리팩토링 모든 개발 전담
- GitHub Actions 워크플로우 작성
- 브랜치 생성, PR, 커밋 등 Git 전담
- 테스트 코드 생성 및 커버리지 100%

AI 협업에서 발견한 인사이트:
- 복잡도가 올라갈수록 명확한 프롬프트가 중요
- Claude는 모든 맥락을 기억하지 못함 → 방향 이탈 가능
- 컨텍스트 압축에도 한계 존재
- 잘못된 작업 시 git reset --hard로 복구한 적도 있음
- 프롬프트와 내부 규칙(지침 문서 등)으로 방향 제시가 핵심

병렬 작업 실험:
- 터미널 화면 3-4분할 + Git 워크트리로 개별 브랜치 동시 작업
- 3개 이상부터는 작업 이력 추적과 지시 관리가 어려워짐
- 현실적 병렬 작업 개수: 1~2개가 적절
- 병렬 진행은 효율보다 피로도가 높아질 수 있음

결론: 처음부터 만드는 프로젝트라 AI에 전면 위임이 가능했고, 
기존 프로젝트에선 AI 수정이 부담될 수 있지만 새 프로젝트에서는 매우 효과적`,
      type: 'technical'
    },
    {
      question: '테스트 커버리지 100%인데 버그가 발견되었다고요?',
      answer: `100% 테스트 커버리지를 달성했지만, Storybook 인터랙션 테스트에서 실제 사용 시나리오의 버그들을 추가로 발견했습니다.

발견된 4가지 버그:
1. fix-autosize-dropping-item - 드롭 프리뷰가 항상 표시되는 문제
2. fix-droppable-container-tracking - 외부 드래그 아이템 실시간 추적 불가
3. fix-dropping-item-preview-position - 드롭 프리뷰 위치와 마우스 커서 불일치
4. fix-resize-handle-static-collision - 리사이즈 시 정적 아이템 충돌 감지 미흡

해결 진행 중:
여러 버그를 효율적으로 수정하기 위해 Git 워크트리를 활용하고 있습니다. 각 버그별로 독립된 작업 공간을 만들어 병렬 개발을 진행하고, CLAUDE_HANDOVER.md로 AI와의 작업 인수인계를 체계화했습니다.

단순 유닛 테스트로는 발견하기 어려운 복잡한 상호작용 버그들을 동시에 해결해 나가고 있으며, 최종 테스트를 거친 후 다시 배포될 예정입니다.`,
      type: 'technical'
    }
  ],

  'frontend-learning-app': [
    {
      question: '앞으로의 개발 로드맵은 어떻게 되나요?',
      answer: `주요 개발 계획을 우선순위별로 정리했습니다:

1. 콘텐츠 완성 (최우선)
   - AI 파이프라인으로 2,610개 세부 토픽 생성
   - 각 토픽별 3단계 난이도 콘텐츠 작성
   - 퀴즈 및 연습 문제 추가

2. 핵심 기능 구현
   - WebView-RN 양방향 통신으로 진도 추적
   - WebView 기반 퀴즈 렌더링 시스템

3. 사용성 개선
   - 다국어 지원 (영어, 일본어, 중국어)
   - 다크 테마 구현

4. 선택적 기능 (낮은 우선순위)
   - 성취도 배지 시스템
   - 오프라인 지원 (콘텐츠 번들링)
   - 소셜 공유 기능

콘텐츠 생산과 핵심 학습 기능 완성에 집중하여,
실제 사용 가능한 학습 앱으로 발전시킬 계획입니다.`,
      type: 'business'
    },
    {
      question: '이 프로젝트를 시작하게 된 계기는 무엇인가요?',
      answer: `AI의 우수한 답변을 정적 학습 자료로 체계적으로 보관하고자 시작했습니다.

문제 인식:
AI와의 대화는 휘발성이 높고, 같은 질문을 반복할 때마다 토큰을 소비합니다. 
특히 "중학생도 이해할 수 있게 설명해줘" 같은 쉬운 설명은 일반 자료에서 찾기 어렵습니다.

해결 방안:
모든 학습 콘텐츠를 3단계 난이도로 생성하여 언제든 접근 가능한 개인 지식 라이브러리를 구축했습니다.

3단계 난이도 시스템:
• 쉬움 (중학생): 일상 비유와 친근한 설명
• 일반 (실무자): 적절한 전문 용어와 실용 예제
• 전문가 (심화): 내부 원리와 성능 최적화

콘텐츠 구조:
• 10개 주제 (HTML, CSS, JavaScript, React, Next.js 등)
• 261개 카테고리 (주제당 평균 26개)
• 2,610개 세부 토픽 (카테고리당 평균 10개)

확장 가능성:
MD 파일 기반이라 주제만 바꾸면 경제, 블록체인, AI 등 다양한 분야로 확장 가능합니다.

현재 상황:
20+ 토픽 완성, AI 콘텐츠 생성 파이프라인 구축, WebView 통합 완료`,
      type: 'business'
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
      type: 'technical'
    }
  ],

  'vue-pivottable': [
    {
      question: 'Vue.js를 처음 학습하면서 오픈소스를 만든 계기는?',
      answer: `실무에서 Vue.js 전환이 예정되어 있어 미리 학습하면서 실제 프로젝트를 만들어보고자 했습니다:

학습 과정:
1. Vue.js 기초 학습
   - 공식 문서와 튜토리얼로 시작
   - 반응형 시스템과 컴포넌트 이해
   - 실제 프로젝트로 실습 필요성 느낌

2. PivotTable.js 선택 이유
   - 실무에서 데이터 분석 도구 필요
   - jQuery 버전만 존재, Vue 버전 없음
   - 복잡한 상태 관리로 Vue 학습에 적합

3. 오픈소스 개발 시작
   - 2019년 8월 첫 커밋
   - 실무 적용하며 지속적 개선
   - 커뮤니티 피드백으로 성장

현재 성과:
- GitHub Stars 147개
- 주간 다운로드 700+
- 5년간 지속적 유지보수
- 실무 프로젝트 다수 적용`,
      type: 'business'
    },
    {
      question: '모노레포 구조로 설계한 이유는?',
      answer: `번들 사이즈 최적화와 유지보수성을 위해 pnpm workspace 기반 모노레포를 구성했습니다:

문제점:
- 원본은 Plotly가 기본 포함되어 번들 크기 증가
- 모든 사용자가 차트 렌더러를 필요로 하지 않음
- 다양한 렌더러 추가 시 의존성 관리 복잡

해결 방안:
1. 모노레포 구조
   ├── packages/
   │   ├── plotly-renderer/  # 선택적 설치
   │   └── scroll-renderer/  # 대용량 데이터용
   └── src/                  # 코어 라이브러리

2. 장점
   - 필요한 렌더러만 선택적 설치
   - 번들 사이즈 40% 감소
   - 독립적인 버전 관리
   - 공통 의존성 공유

3. 사용 방법
   - 기본: npm install vue-pivottable
   - Plotly 필요시: npm install @vue-pivottable/plotly-renderer
   - 각 패키지 독립적 업데이트 가능`,
      type: 'technical',
      code: `// pnpm-workspace.yaml
packages:
  - 'packages/*'
  - 'docs'

// 선택적 렌더러 사용
import VuePivottable from 'vue-pivottable'
import PlotlyRenderer from '@vue-pivottable/plotly-renderer'

// 필요한 경우만 Plotly 렌더러 추가
Vue.use(PlotlyRenderer)`
    }
  ],

  'vue-datamaps': [
    {
      question: '실무에 어떻게 적용했나요?',
      answer: `Vue Datamaps에 AWS 리전 표시 기능을 직접 추가하여 실무 프로젝트에 적용했습니다:

내가 추가한 기능:
- AWS 리전 좌표 데이터 구축 (46개 기본 내장)
- awsRegionsConfig 플러그인 개발 (외부 데이터 제공 가능)
- 리전 코드(ap-northeast-2) → 도시명(Seoul) 매핑
- LayerAwsRegions 컴포넌트 개발

실무 적용 사례 (HyperBilling):
1. 다이나믹 서치 메뉴
   - Bubbles로 AWS 리전별 비용 시각화
   - 비용 규모를 버블 크기로 표현
   - 리전 타입별 색상 구분 (Region/Edge/Local/Wavelength)

2. 데이터 전송 분석 메뉴  
   - Arcs로 리전 간 트래픽 흐름 시각화
   - 소스-타겟 리전 자동 연결
   - 트래픽 양을 선 굵기로 표현

기술적 구현:
- 46개 기본 리전 내장 + 외부 데이터 확장 가능
- popupTemplate로 리전 정보 표시
- fillKey로 활성 리전 구분`,
      type: 'technical'
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

2. 역할 분담
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
      answer: `기술적 도전보다 GitHub Actions를 통한 자동 배포 프로세스 구축이 가장 어려웠습니다:

기술적 도전:
1. Composition API 전환
   - Options API → Composition API
   - 반응성 시스템 변경 (Proxy 기반)
   - TypeScript 도입과 타입 정의

2. GitHub Actions 자동 배포의 난관:
   - 브랜치 보호 규칙과 자동 배포의 충돌
   - 버전 변경 후 main 브랜치 push 권한 문제
   - Personal Access Token 관리의 번거로움

3. 배포 프로세스 설계 과정:
   - 시도 1: PAT 사용 → 정기 재발급 필요, 개인 의존성
   - 시도 2: 릴리즈 브랜치 분리 → 커밋 기록 분화 문제
   - 최종: develop → staging → main 플로우 채택

팀 협업 측면:
- 팀원 2명에게 동등한 배포 권한 부여
- 개인 토큰 의존성 제거
- 지속 가능한 관리 체계 구축`,
      type: 'technical'
    },
    {
      question: 'GitHub Actions 배포 프로세스는 어떻게 구성했나요?',
      answer: `브랜치 보호와 자동 배포의 균형을 위해 3단계 브랜치 전략을 채택했습니다:

배포 프로세스 진화:
1. 초기 시도의 문제점
   - 브랜치 보호 규칙 적용 시 자동 push 불가
   - Personal Access Token 관리 부담
   - 팀원과 권한 공유 어려움

2. 최종 솔루션: 3단계 브랜치 플로우
   develop (개발) → staging (베타) → main (안정)
   
   - develop: 기능 개발 및 버그 수정
   - staging: 자동 베타 버전 배포
   - main: 수동 태그로 안정 버전 배포

3. 자동화 프로세스
   - PR 자동 생성 (develop → staging → main)
   - staging 머지 시 베타 배포 자동 실행
   - main 머지 후 태그 생성으로 정식 배포

장점:
- 불필요한 브랜치 생성 없음
- 명확한 버전 관리
- 팀원 모두 동등한 배포 권한
- PAT 없이도 운영 가능

운영 경험:
- Vue 2 버전 5년 운영 경험 활용
- 버그 수정 외 큰 변경 없음 예상
- 유지보수 부담 최소화 설계

상세 문서:
- 릴리즈 전략: https://github.com/vue-pivottable/vue3-pivottable/blob/main/docs/RELEASE_STRATEGY.ko.md
- Git Flow 전략: https://github.com/vue-pivottable/vue3-pivottable/blob/main/docs/GIT_FLOW_STRATEGY.md`,
      type: 'business'
    }
  ],

  'code-style': [
    {
      question: 'NaverPayDev/code-style에서 영감을 받았다고 했는데 차별점은?',
      answer: `NaverPayDev/code-style의 모노레포 구조에서 영감을 받아 제 방식으로 구현했습니다:

공통점:
- pnpm workspace 기반 모노레포
- 패키지별 분리 전략
- semantic-release 자동 배포

차별점:
1. 규칙 체계
   - NaverPayDev: 자체 코딩 컨벤션 정의
   - 내 프로젝트: Standard.js 규칙 100% 준수

2. 패키지 구성
   - NaverPayDev: eslint/prettier/stylelint/markdown-lint 등 6개
   - 내 프로젝트: eslint-standard-js/jsx + prettier 3개 (최소 구성)

3. 사용 방식
   - 내 프로젝트: ESLint 9 표준 패턴 (...configs.base 직접 spread)
   - 추가 설정 필요시 ESLint 표준 방식으로 커스터마이징

4. 타겟 사용자
   - NaverPayDev: 팀 내부 컨벤션 필요한 조직
   - 내 프로젝트: Standard.js + ESLint 9 개인/소규모 팀`,
      type: 'design'
    },
    {
      question: 'Standard.js를 직접 ESLint 9로 마이그레이션한 이유는?',
      answer: `ESLint 팀이 Flat Config를 새로운 표준으로 설계했는데, Standard.js가 이를 지원하지 않아서입니다:

ESLint 9의 변화 (2024년 4월 출시):
- ESLint 팀이 Flat Config를 기본 설정 방식으로 채택
- 기존 .eslintrc 방식은 deprecated (ESLINT_USE_FLAT_CONFIG=false로 사용 가능)
- ESLint v10 (출시 예정)에서 eslintrc 완전 제거 예정

Standard.js 생태계 현황:
- 공식 standard/eslint-config-standard: ESLint 8까지만 지원 (ESLint 9 미지원)
- neostandard: 자체 옵션 시스템 도입 (semi→@stylistic/semi 매핑 등)
- @eslinter/eslint-config-standard: 포크 버전, ESLint 9 지원하지만 비공식

직접 구현 이유:
- ESLint 9의 표준 설정 패턴 준수 (configs 객체 직접 spread)
- ESLint 규칙명 그대로 사용 (추가 추상화 없음)
- 다른 ESLint 9 플러그인과 동일한 사용 경험
- Standard.js 원본 규칙 100% 유지`,
      type: 'technical',
      code: `// neostandard - 자체 옵션 API
neostandard({ semi: true, ts: true })

// 내 프로젝트 - ESLint 9 표준 방식
...standardjs.configs.base`
    },
    {
      question: '실제 활용 사례와 향후 계획은?',
      answer: `현재 Vue3 Pivottable에서 사용 중이며, 개인 프로젝트를 위한 템플릿을 구축하고 있습니다:

실제 사용 사례:
- Vue3 Pivottable 프로젝트에서 ESLint 9 마이그레이션 시 적용
- 팀 협업을 위한 일관된 코드 스타일 확보

Vite 템플릿 구축 (개인 프로젝트 용):
완료 (5개):
- vite-react-ts-standard
- vite-react-js-standard
- vite-vue3-ts-standard
- vite-vue2-ts-standard
- vite-vue2-js-standard

개발 중 (3개):
- vite-js-standard
- vite-ts-standard
- vite-vue3-standard

핵심 철학:
"특정 규칙을 강요하는 것이 아니라, ESLint와 Prettier 같은 도구를 
잘 활용하여 일관성 있는 코드 스타일을 유지하는 것이 중요합니다."

- Standard.js는 제가 선호하는 규칙일 뿐
- 팀이나 개발 환경에 맞는 규칙 선택이 중요
- 일관성 있는 코드 스타일이 핵심

향후 목표:
- 개인 개발 시 템플릿 활용으로 생산성 향상
- 향후 팀 프로젝트에서도 유사한 템플릿 방식 적용 검토
- 각 팀의 코딩 컨벤션에 맞는 템플릿 구축 경험 축적`,
      type: 'business',
      code: `# 개인 프로젝트 시작 시
git clone https://github.com/Seungwoo321/vite-react-ts-standard
pnpm install && pnpm dev`
    }
  ]
};

export const getProjectQA = (projectId: string): ProjectQA[] => {
  return projectQAs[projectId] || [];
};