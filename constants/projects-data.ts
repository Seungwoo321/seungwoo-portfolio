import { Project, ProjectCategory } from '@/types';

export const projects: Project[] = [
  // ===== 오픈소스 프로젝트 =====
  {
    id: 'vue-pivottable',
    title: 'Vue Pivottable',
    subtitle: 'Vue.js Pivot Table Component',
    description: 'jQuery 기반 PivotTable.js를 Vue 생태계에 최적화된 컴포넌트로 재설계한 데이터 시각화 라이브러리',
    longDescription: '복잡한 데이터를 드래그 앤 드롭으로 쉽게 분석할 수 있는 피벗 테이블 컴포넌트입니다. 원본 PivotTable.js의 jQuery 의존성을 완전히 제거하고 Vue.js의 반응형 시스템으로 재구현하여 번들 사이즈를 40% 줄이고 성능을 30% 개선했습니다. 5년간 지속적으로 유지보수하며 커뮤니티 기여를 받아 발전시켜온 프로젝트입니다.',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['Vue.js 2', 'JavaScript', 'Rollup', 'NPM', 'Jest'],
    role: '오픈소스 메인테이너',
    period: '2019.08 - 현재',
    featured: true,
    order: 1,
    stats: {
      stars: 147,
      forks: 42,
      downloads: 700,
    },
    achievements: [
      { description: 'GitHub Stars', metric: '147+' },
      { description: '주간 NPM 다운로드', metric: '700+' },
      { description: '커뮤니티 기여자', metric: '7명' },
      { description: '현재 버전', metric: 'v0.4.68' },
    ],
    features: [
      '드래그 앤 드롭으로 행/열 재배치',
      '다양한 집계 함수 (Sum, Count, Average, Min, Max, Sum over Sum 등)',
      'Table, Table Barchart, Heatmap, Row/Col Heatmap 렌더러',
      'TSV Export 렌더러 (테이블을 TSV 형식으로 표시)',
      'Plotly 차트 지원 (vue-plotly-js 별도 설치 시)',
      '커스텀 집계 함수 추가 가능',
      'Vue 2.6+ 호환',
      'jQuery 의존성 완전 제거',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/vue-pivottable' },
      { type: 'npm', url: 'https://www.npmjs.com/package/vue-pivottable' },
      { type: 'docs', url: 'https://seungwoo321.github.io/vue-pivottable/', label: 'Documentation' },
    ],
    images: [
      { url: '/images/vue-pivottable-demo.gif', alt: 'Vue Pivottable 데모', caption: '실시간 드래그 앤 드롭 피벗 테이블' },
      { url: '/images/vue-pivottable-table.png', alt: '테이블 렌더러', caption: '기본 Table 렌더러' },
      { url: '/images/vue-pivottable-heatmap.png', alt: '히트맵 렌더러', caption: 'Table Heatmap으로 데이터 시각화' },
      { url: '/images/vue-pivottable-tsv.png', alt: 'TSV Export 렌더러', caption: 'TSV Export 렌더러 - 복사 가능한 TSV 형식' },
    ],
    challenges: [
      'Vue.js 처음 학습하며 진행한 첫 오픈소스 프로젝트',
      'jQuery 80KB를 제거하고 순수 Vue.js로 재구현',
      'jQuery UI 드래그 앤 드롭을 vuedraggable로 대체',
      'pnpm workspace로 모노레포 구성, Plotly/Scroll 렌더러 별도 패키지 분리',
      '원본과 100% API 호환성 유지하며 마이그레이션 용이성 확보',
      '실무 프로젝트에 직접 적용하며 지속적 개선',
    ],
  },

  {
    id: 'vue3-pivottable',
    title: 'Vue3 Pivottable',
    subtitle: 'Vue 3 Migration & Team Collaboration',
    description: 'Vue 2 버전을 Vue 3와 TypeScript로 마이그레이션하며 팀 협업을 통해 현대화한 프로젝트',
    longDescription: '개인 프로젝트를 팀 프로젝트로 전환하여 2명의 개발자와 함께 Vue 3 마이그레이션을 진행했습니다. Composition API와 TypeScript를 도입하여 코드 품질을 향상시켰습니다.',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['Vue.js 3', 'TypeScript', 'Vite', 'pnpm'],
    role: '프로젝트 리드',
    period: '2025.02 - 현재',
    teamSize: 3,
    order: 2,
    stats: {
      stars: 8,
      forks: 3,
    },
    achievements: [
      { description: '팀 빌딩 및 협업', metric: '3명' },
      { description: 'TypeScript 전환', metric: '100%' },
      { description: '번들 사이즈 감소', metric: '35%' },
      { description: 'GitHub Stars', metric: '8' },
    ],
    features: [
      'Vue 3 Composition API',
      'TypeScript 완전 지원',
      'Vite 기반 빠른 빌드',
      '향상된 트리 쉐이킹',
    ],
    links: [
      { type: 'github', url: 'https://github.com/vue-pivottable/vue3-pivottable' },
      { type: 'npm', url: 'https://www.npmjs.com/package/vue-pivottable' },
      { type: 'docs', url: 'https://vue-pivottable.vercel.app/' },
    ],
    images: [
      { url: '/images/vue3-pivottable.png', alt: 'Vue3 Pivottable 개발 화면', caption: '로컬 개발 환경 테스트 화면' },
      { url: '/images/vue3-pivottable-issue.png', alt: 'GitHub 이슈 협업', caption: 'GitHub 이슈를 통한 팀 협업' },
    ],
    challenges: [
      'Vue 2에서 Vue 3 Composition API로 전환',
      'JavaScript에서 TypeScript 100% 마이그레이션',
      'pnpm workspace 모노레포 구조 유지 및 개선',
      'GitHub Actions 자동 배포 프로세스 구축',
      'Changeset을 활용한 버전 관리 자동화',
      '팀 협업을 위한 브랜치 전략 및 CI/CD 파이프라인 설계',
    ],
  },

  {
    id: 'vue-datamaps',
    title: 'Vue Datamaps',
    subtitle: 'Interactive Map Visualization',
    description: 'D3.js 기반 DataMaps를 Vue 컴포넌트로 포팅한 인터랙티브 지도 시각화 라이브러리',
    longDescription: 'DataMaps.js를 Vue 생태계에 최적화하여 재구현한 지도 시각화 컴포넌트입니다. 전 세계 지도 데이터를 지원하며 다양한 시각화 방식을 제공합니다. AWS 리전 표시 기능을 직접 추가 개발하여 실무 프로젝트에서 클라우드 인프라 비용 분석과 트래픽 흐름 시각화에 활용했습니다.',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['Vue.js 2', 'D3.js v4', 'JavaScript', 'Vite'],
    role: '오픈소스 메인테이너',
    period: '2019.10 - 현재',
    order: 3,
    stats: {
      stars: 20,
      forks: 10,
      downloads: 158,
    },
    achievements: [
      { description: 'GitHub Stars', metric: '20' },
      { description: '주간 다운로드', metric: '158' },
      { description: '기여자', metric: '2명' },
    ],
    features: [
      '전 세계/미국 지도 데이터 지원',
      'Bubbles, Arcs 시각화 방식',
      '다양한 지도 투영법 지원 (Mercator, Orthographic 등)',
      'AWS 리전 표시 플러그인 추가 개발',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/vue-datamaps' },
      { type: 'npm', url: 'https://www.npmjs.com/package/vue-datamaps' },
    ],
    images: [
      { url: '/images/vue-datamaps-basic.png', alt: 'Vue Datamaps Basic', caption: '기본 세계 지도' },
      { url: '/images/vue-datamaps-state-label.png', alt: 'Vue Datamaps USA', caption: '미국 주별 데이터 시각화' },
      { url: '/images/vue-datamaps-demo-bubbles.png', alt: 'Vue Datamaps Bubbles', caption: 'Bubbles 시각화' },
      { url: '/images/vue-datamaps-demo-arcs.png', alt: 'Vue Datamaps Arcs', caption: 'Arcs 연결선 시각화' },
    ],
    challenges: [
      'D3.js v3에서 v4로 마이그레이션하며 Breaking Changes 대응',
      'TopoJSON 데이터 최적화로 번들 사이즈 감소',
      'Vue 반응형 시스템과 D3.js DOM 조작 간 충돌 해결',
      'AWS 리전 표시 기능 추가하여 실무 프로젝트 적용',
    ],
  },

  {
    id: 'code-style',
    title: 'Code Style Plugins',
    subtitle: 'ESLint 9 Standard.js Rules',
    description: 'Standard.js 코딩 규칙을 ESLint 9 Flat Config로 현대화한 모노레포 기반 개발 도구',
    longDescription: 'Standard.js 코딩 규칙을 ESLint 9 Flat Config 형식으로 재구현한 프로젝트입니다. NaverPayDev/code-style에서 영감을 받아 모노레포 구조로 구성했으며, base/stylistic/recommended 설정을 분리하여 제공합니다. Prettier와 함께 사용 가능한 유연한 구조로 설계했습니다.',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['ESLint 9', 'TypeScript', '@stylistic/eslint-plugin', 'pnpm workspace', 'Turbo'],
    role: '오픈소스 메인테이너',
    period: '2025.04 - 현재',
    order: 7,
    achievements: [
      { description: 'NPM 패키지', metric: '3개' },
      { description: '패키지 버전', metric: 'v1.0.1' },
      { description: 'Node.js 요구사항', metric: '18.20.8+' },
    ],
    features: [
      'ESLint 9 Flat Config 네이티브 지원',
      'Standard.js 규칙 완벽 재구현',
      'base/stylistic/recommended 설정 제공',
      '@stylistic/eslint-plugin 기반 포맷팅',
      'TypeScript ESLint 통합 지원',
      'Prettier와 함께 사용 가능',
      'React JSX 규칙 별도 패키지',
      'semantic-release 자동 배포',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/code-style' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@seungwoo321/eslint-plugin-standard-js' },
    ],
    challenges: [
      'ESLint 8에서 9로 마이그레이션 Breaking Changes 대응',
      'Standard.js 규칙을 Flat Config 형식으로 재구현',
      '@stylistic/eslint-plugin으로 포맷팅 규칙 분리',
      'Prettier와 충돌 없는 설정 구조 설계',
    ],
    images: [
      { url: '/images/code-style-github.png', alt: 'GitHub 리포지토리', caption: '모노레포 구조의 Code Style 프로젝트' },
      { url: '/images/code-style-npm.png', alt: 'NPM 패키지', caption: '@seungwoo321/eslint-plugin-standard-js NPM 페이지' },
      { url: '/images/code-style-usage.png', alt: 'Vue3 Pivottable 사용 예시', caption: 'Vue3 Pivottable에서 실제 사용' },
    ],
  },

  // ===== AI 바이브 코딩 프로젝트 =====
  {
    id: 'e-torch',
    title: 'E-Torch',
    subtitle: '경제지표 통합 시각화 대시보드',
    description: 'AI 페어 프로그래밍으로 기획부터 구현까지 진행 중인 B2C SaaS 경제 데이터 플랫폼',
    longDescription: 'Claude AI와 함께 기획서, 설계 문서를 작성하고 구현 중인 프로젝트입니다. KOSIS/ECOS 데이터를 활용한 실시간 경제지표 시각화 서비스로, 구독 모델 UI와 결제 플로우를 구현했으며 TossPay 연동을 준비 중입니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Turborepo', 'Zustand', 'TanStack Query', 'Tailwind CSS 4', 'Supabase', 'TossPay'],
    role: '풀스택 개발자',
    period: '2025.05 - 현재',
    featured: true,
    order: 4,
    stats: {
      completion: '70%',
    },
    achievements: [
      { description: '모노레포 패키지', metric: '12개' },
      { description: '차트 위젯 종류', metric: '7종' },
      { description: '경제 지표', metric: '40+개' },
      { description: '구독 플랜', metric: 'Basic/Pro' },
    ],
    features: [
      'KOSIS/ECOS/OECD 3개 데이터소스 통합',
      'Basic(무료)/Pro(9,900원) 구독 모델',
      'React Grid Layout 드래그 앤 드롭 에디터',
      'Google/Naver/Kakao 소셜 로그인',
      '결제 UI 및 플로우 구현 (TossPay 연동 준비)',
      'LTTB 알고리즘 차트 최적화',
      '7종 차트 위젯 (시계열, 막대, 산점도, 레이더, 방사형 등)',
      'Vitest 기반 테스트 커버리지',
    ],
    challenges: [
      'Turborepo 기반 12개 패키지 모노레포 구조 설계',
      '복잡한 다중 시계열 차트 UI/UX 문제 해결',
      '효율적인 상태 관리와 데이터 페칭 전략 구현',
      '드래그앤드롭 대시보드 에디터 구현',
      '확장 가능한 데이터 소스 아키텍처 설계',
      'TypeScript로 안정적인 타입 시스템 구축',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/etorch-docs', label: '설계 문서' },
      { type: 'demo', url: 'https://etorch-mock-api.vercel.app/api', label: 'Mock API' },
    ],
    images: [
      { 
        url: '/images/e-torch-1.png', 
        alt: '위젯 편집 모달 - 지표 추가', 
        caption: 'SeriesConfiguration 컴포넌트로 경제지표 선택 및 Y축 할당 인터페이스' 
      },
      { 
        url: '/images/e-torch-2.png', 
        alt: '다중 시계열 위젯 생성', 
        caption: '2개 지표를 left/right Y축에 할당한 다중 시계열 차트 설정 화면' 
      },
      { 
        url: '/images/e-torch-3.png', 
        alt: '구독 플랜 관리', 
        caption: 'Basic(무료)과 Pro(월 9,900원) 플랜 비교 및 사용량 현황 대시보드' 
      },
      { 
        url: '/images/e-torch-4.png', 
        alt: '관리자 페이지 - 지표 관리', 
        caption: 'DB 기반 경제지표 관리 시스템 - KOSIS/ECOS/OECD 지표 목록 및 상태 관리' 
      },
    ],
  },

  {
    id: 'tailwind-grid-layout',
    title: 'Tailwind Grid Layout',
    subtitle: 'Modern React Grid System',
    description: 'react-grid-layout의 Tailwind CSS 기반 경량 대안으로 AI와 함께 개발한 그리드 레이아웃 시스템',
    longDescription: 'E-Torch 프로젝트에서 react-grid-layout의 반복적인 버그(resize 시 height=0, drag 시 width=0)로 인해 shadcn/ui + Tailwind 환경에 최적화된 대안을 AI 주도로 개발했습니다. Claude Code + MCP CLI를 활용한 완전한 AI 페어 프로그래밍으로 100% 테스트 커버리지와 API 호환성을 달성했으며, 사내 프론트엔드 유닛에서 AI 개발 사례로 발표했습니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'maintained',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS 4', 'Vitest', 'Storybook'],
    role: '오픈소스 메인테이너',
    period: '2025.06 - 현재',
    featured: true,
    order: 5,
    stats: {
      coverage: 100,
    },
    achievements: [
      { description: '테스트 커버리지', metric: '100%' },
      { description: '번들 사이즈 감소', metric: '30%' },
      { description: 'API 호환성', metric: '100%' },
      { description: '모바일 터치 지원', metric: '✓' },
    ],
    features: [
      'react-grid-layout 완벽 호환',
      'Tailwind CSS 네이티브',
      '모바일 터치 최적화',
      'TypeScript 완전 지원',
      'ResponsiveGrid 컴포넌트',
      '8방향 리사이즈 핸들',
    ],
    challenges: [
      'AI와 TDD로 100% 커버리지 달성',
      '복잡한 드래그 앤 드롭 로직 구현',
      '터치 이벤트 최적화',
      'Tailwind v4 CSS-first 접근',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/tailwind-grid-layout' },
      { type: 'npm', url: 'https://www.npmjs.com/package/tailwind-grid-layout' },
      { type: 'demo', url: 'https://tailwind-grid-layout-omega.vercel.app/' },
    ],
    images: [
      { 
        url: '/images/tailwind-grid-1.png', 
        alt: '그리드 레이아웃 데모',
        caption: '드래그 앤 드롭으로 자유롭게 배치 가능한 그리드 시스템 - 각 아이템의 위치와 크기를 실시간으로 조정'
      },
      { 
        url: '/images/tailwind-grid-2.png', 
        alt: '반응형 브레이크포인트',
        caption: '화면 크기에 따라 자동으로 재배치되는 반응형 그리드 - lg, md, sm, xs 브레이크포인트 지원'
      },
      { 
        url: '/images/tailwind-grid-3.png', 
        alt: '드래그 앤 드롭',
        caption: '직관적인 드래그 앤 드롭 인터페이스 - 충돌 감지 및 자동 재배치 기능 포함'
      },
      { 
        url: '/images/tailwind-grid-4.png', 
        alt: '리사이즈 기능',
        caption: '8방향 리사이즈 핸들을 통한 정밀한 크기 조절 - 그리드 스냅 기능으로 정확한 배치'
      },
    ],
  },

  {
    id: 'penguinjs',
    title: 'PenguinJS',
    subtitle: 'JavaScript Learning Game Platform',
    description: 'JavaScript 핵심 개념을 게임으로 학습하는 인터랙티브 교육 플랫폼 (18개 게임 기획, 2개 완료)',
    longDescription: 'Flexbox Froggy에서 영감을 받아 JavaScript의 복잡한 개념들을 게임으로 학습할 수 있도록 설계했습니다. 클로저, 콜스택 같은 추상적 개념을 시각화하여 실제 코딩과 메모리 상태 시뮬레이션을 통해 깊이 있게 학습합니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Zustand'],
    role: '프론트엔드 개발자',
    period: '2025.06 - 현재',
    order: 6,
    stats: {
      completion: '11%',
    },
    achievements: [
      { description: '기획 게임 수', metric: '18개' },
      { description: '총 스테이지', metric: '270개' },
      { description: '구현 완료', metric: '2개 게임' },
      { description: '다국어 지원', metric: '한/영/일/중' },
    ],
    features: [
      'Closure Cave: 클로저 개념 15단계 완료',
      'CallStack Library: 콜스택 시뮬레이션 24단계 (초급 8, 중급 8, 고급 8)',
      '난이도별 스테이지: beginner/intermediate/advanced',
      '코드 에디터에서 실시간 JavaScript 실행',
      '다국어 지원: 한/영/일/중 (메인 페이지만)',
      '진행도 로컬 스토리지 저장',
    ],
    challenges: [
      'AI와 협업하여 18개 게임 기획 및 전체 아키텍처 설계',
      '추상적 JavaScript 개념의 시각적 게임 메카닉 변환',
      'CallStack Library 6가지 레이아웃 시스템 구현',
      '사용자 코드 실행과 게임 상태 동기화',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/penguinjs' },
      { type: 'demo', url: 'https://penguinjs-playground.vercel.app/ko' },
      { type: 'docs', url: 'https://github.com/Seungwoo321/penguinjs/tree/main/docs', label: '설계 문서' },
    ],
    images: [
      { 
        url: '/images/penguinjs-1.png', 
        alt: 'PenguinJS 메인 화면', 
        caption: '게임 선택 화면 - Closure Cave와 CallStack Library 2개 게임 구현 완료' 
      },
      { 
        url: '/images/penguinjs-2.png', 
        alt: 'Closure Cave 게임 플레이', 
        caption: 'Closure Cave Stage 3 - 외부 변수 접근하기: 펭귄이 동굴에서 보물(🔮)을 찾는 클로저 학습' 
      },
      { 
        url: '/images/penguinjs-3.png', 
        alt: 'CallStack Library 게임 플레이', 
        caption: 'CallStack Library 레이아웃 A - 함수 호출 순서 예측: 콜스택 LIFO 원칙 시각적 학습' 
      },
      { 
        url: '/images/penguinjs-4.png', 
        alt: 'Closure Cave 스테이지 선택', 
        caption: 'Closure Cave 전체 15단계 - 초급 5단계 완료, 중급/고급 단계 진행 중' 
      },
    ],
  },

  {
    id: 'frontend-learning-app',
    title: 'Frontend Hit',
    subtitle: 'React Native Educational App',
    description: 'AI를 활용한 프론트엔드 학습 콘텐츠를 3단계 난이도로 제공하는 모바일 앱 프로토타입',
    longDescription: 'AI를 활용하여 프론트엔드 개념을 쉬움(중학생 수준), 일반, 전문가 3단계로 설명하는 학습 앱입니다. 초기에는 TypeScript 모듈로 콘텐츠를 관리했으나, React Native의 Markdown 렌더링 제약으로 WebView 통합 아키텍처로 전환했습니다. 현재 약 20개의 완성된 학습 콘텐츠와 커스텀 학습 경로 기능을 구현했으며, AI 콘텐츠 생성 파이프라인을 통해 확장 중입니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['React Native', 'Expo SDK 53', 'TypeScript', 'NativeWind v4', 'Zustand', 'WebView'],
    role: '모바일 앱 개발자',
    period: '2025.07 - 현재',
    order: 8,
    achievements: [
      { description: '완성 콘텐츠', metric: '20+ 토픽' },
      { description: 'AI 콘텐츠 파이프라인', metric: '설계 완료' },
      { description: 'WebView 렌더링', metric: '구현 완료' },
      { description: '플랫폼', metric: 'iOS/Android/Web' },
    ],
    features: [
      'WebView 통합: React 웹앱과 RN 앱 연동으로 MD 콘텐츠 렌더링',
      '커스텀 학습 경로: 생성/수정/삭제 가능한 학습 계획 관리',
      '학습 카탈로그: 카테고리별 코스 관리 시스템',
      '복습/연습 모드: 퀴즈 기반 학습 점검 시스템',
      'Zustand + AsyncStorage: 진도 및 설정 영구 저장',
      'Expo Router v4: 파일 기반 라우팅 시스템',
    ],
    challenges: [
      'AI 콘텐츠 대량 생성 파이프라인 구축',
      'Markdown 파일을 React Native에서 렌더링하는 기술적 제약 해결',
      'WebView 통합으로 콘텐츠 렌더링 문제 해결',
      '크로스 플랫폼 일관성 확보',
      'React 19와 Expo SDK 53 호환성 이슈 해결',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/frontend-learning-app' },
    ],
    images: [
      { url: '/images/learning-app-1.png', alt: '홈 화면', caption: '앱 메인 화면과 빠른 시작' },
      { url: '/images/learning-app-2.png', alt: '학습 카탈로그', caption: '10개 주제, 261개 카테고리 탐색' },
      { url: '/images/learning-app-3.png', alt: '카테고리 상세', caption: 'JavaScript 핵심 > 변수 완전 정복 토픽 목록' },
      { url: '/images/learning-app-4.png', alt: 'WebView 학습 화면', caption: '3단계 난이도로 학습 콘텐츠 제공 (React Native + WebView)' },
      { url: '/images/learning-app-5.png', alt: '웹 전체 화면', caption: 'WebView 콘텐츠 전체 화면 (웹 버전)' },
    ],
  },

  // ===== 업무 프로젝트 =====
  {
    id: 'hyperbilling-3',
    title: 'HyperBilling 3.0',
    subtitle: 'B2B SaaS Billing Platform',
    description: '10년된 jQuery 레거시를 운영 중단 없이 Vue.js 기반 마이크로프론트엔드로 전환',
    longDescription: '메가존클라우드의 핵심 빌링 플랫폼을 레거시 jQuery에서 Vue.js로 전면 재구축했습니다. 운영 중단 없이 점진적 마이그레이션을 수행하여 안정성을 확보했습니다.',
    category: 'work' as ProjectCategory,
    status: 'production',
    technologies: ['Vue.js 2', 'TypeScript', 'Webpack', 'REST API', 'AWS', 'Jenkins'],
    role: '프론트엔드 리드',
    period: '2019.08 - 2022.11',
    teamSize: 5,
    order: 9,
    achievements: [
      { description: '페이지 로드 시간', metric: '60% 개선' },
      { description: '코드 재사용률', metric: '70%' },
      { description: '번들 사이즈', metric: '40% 감소' },
      { description: '유지보수 비용', metric: '40% 절감' },
    ],
    features: [
      '마이크로프론트엔드 아키텍처',
      '무중단 점진적 마이그레이션',
      'Vuesign 디자인 시스템',
      '다국어 지원 (한/영/일)',
    ],
    challenges: [
      '레거시 코드와 신규 코드 공존',
      '점진적 마이그레이션 전략',
      '팀원 교육 및 온보딩',
      '성능 최적화',
    ],
  },
];

// 프로젝트를 시작 날짜 기준 내림차순으로 정렬하는 헬퍼
const sortProjectsByDateDesc = (projects: Project[]) => {
  return projects.sort((a, b) => {
    // period에서 시작 년월 추출 (예: "2025.05 - 현재" -> "2025.05")
    const getStartDate = (period: string) => {
      const startPart = period.split(' - ')[0];
      const [year, month] = startPart.split('.');
      return new Date(parseInt(year), parseInt(month) - 1);
    };
    
    const dateA = getStartDate(a.period);
    const dateB = getStartDate(b.period);
    
    return dateB.getTime() - dateA.getTime(); // 내림차순 (최신 먼저)
  });
};

// 카테고리별 프로젝트 필터링 헬퍼
export const getProjectsByCategory = (category: ProjectCategory) => 
  sortProjectsByDateDesc(projects.filter(p => p.category === category));

// Featured 프로젝트 가져오기
export const getFeaturedProjects = () => 
  sortProjectsByDateDesc(projects.filter(p => p.featured));

// 전체 프로젝트 (work 제외) 날짜순 정렬
export const getAllProjects = () => 
  sortProjectsByDateDesc(projects.filter(p => p.category !== 'work'));

// 프로젝트 ID로 찾기
export const getProjectById = (id: string) => 
  projects.find(p => p.id === id);