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
      downloads: 50000,
    },
    achievements: [
      { description: 'GitHub Stars', metric: '147+' },
      { description: '주간 NPM 다운로드', metric: '700+' },
      { description: '총 다운로드', metric: '50,000+' },
      { description: '커뮤니티 기여자', metric: '7명' },
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
      'jQuery 80KB를 제거하고 순수 Vue.js로 재구현',
      'jQuery UI 드래그 앤 드롭을 HTML5 네이티브 API로 대체',
      '원본과 100% API 호환성 유지하며 마이그레이션 용이성 확보',
      '대용량 데이터셋(10만 행 이상) 렌더링 최적화',
      '다국어 지원 및 로케일 시스템 구축',
    ],
  },

  {
    id: 'vue3-pivottable',
    title: 'Vue3 Pivottable',
    subtitle: 'Vue 3 Migration & Team Collaboration',
    description: 'Vue 2 버전을 Vue 3와 TypeScript로 마이그레이션하며 팀 협업을 통해 현대화한 프로젝트',
    longDescription: '개인 프로젝트를 팀 프로젝트로 전환하여 2명의 개발자와 함께 Vue 3 마이그레이션을 진행했습니다. Composition API와 TypeScript를 도입하여 코드 품질을 향상시켰습니다.',
    category: 'opensource' as ProjectCategory,
    status: 'development',
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
      { type: 'npm', url: 'https://www.npmjs.com/package/@vue-pivottable/vue3-pivottable' },
      { type: 'docs', url: 'https://vue-pivottable.vercel.app/' },
    ],
    images: [
      { url: '/images/vue3-pivottable.png', alt: 'Vue3 Pivottable', caption: 'Vue 3 버전 피벗 테이블' },
      { url: '/images/vue3-pivottable-issue.png', alt: 'GitHub 이슈 협업', caption: 'GitHub 이슈를 통한 팀 협업' },
    ],
  },

  {
    id: 'vue-datamaps',
    title: 'Vue Datamaps',
    subtitle: 'Interactive Map Visualization',
    description: 'D3.js 기반 DataMaps를 Vue 컴포넌트로 포팅한 인터랙티브 지도 시각화 라이브러리',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['Vue.js 2', 'D3.js', 'JavaScript', 'Webpack'],
    role: '오픈소스 메인테이너',
    period: '2019.10 - 현재',
    order: 3,
    stats: {
      stars: 20,
      forks: 7,
      downloads: 15000,
    },
    achievements: [
      { description: 'GitHub Stars', metric: '20+' },
      { description: '주간 다운로드', metric: '250+' },
      { description: '지원 지도 타입', metric: '195개국' },
    ],
    features: [
      '전 세계 지도 데이터 지원',
      'Choropleth, Bubbles, Arcs 시각화',
      '커스텀 프로젝션 지원',
      'AWS 리전 시각화 플러그인',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/vue-datamaps' },
      { type: 'npm', url: 'https://www.npmjs.com/package/vue-datamaps' },
      { type: 'demo', url: 'https://jsfiddle.net/seungwoo321/437a5wvf/' },
    ],
  },

  {
    id: 'code-style',
    title: 'Code Style Plugins',
    subtitle: 'ESLint 9 Standard.js Rules',
    description: 'Standard.js 코딩 규칙을 ESLint 9 Flat Config로 현대화한 개발 생산성 도구',
    category: 'opensource' as ProjectCategory,
    status: 'maintained',
    technologies: ['ESLint 9', 'TypeScript', 'JavaScript', 'pnpm workspace'],
    role: '오픈소스 메인테이너',
    period: '2024.10 - 현재',
    order: 7,
    achievements: [
      { description: 'ESLint 플러그인', metric: '2개' },
      { description: 'Vite 템플릿', metric: '5개' },
      { description: '모노레포 패키지', metric: '3개' },
    ],
    features: [
      'ESLint 9 Flat Config 지원',
      'Standard.js 규칙 완벽 호환',
      'TypeScript 지원',
      'React/Vue 템플릿 제공',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/code-style' },
      { type: 'npm', url: 'https://www.npmjs.com/package/@seungwoo321/eslint-plugin-standard-js' },
    ],
  },

  // ===== AI 바이브 코딩 프로젝트 =====
  {
    id: 'e-torch',
    title: 'E-Torch',
    subtitle: '경제지표 통합 시각화 대시보드',
    description: 'AI 페어 프로그래밍으로 기획부터 구현까지 완성한 B2C SaaS 경제 데이터 플랫폼',
    longDescription: 'Claude AI와 함께 기획서, 설계 문서를 작성하고 구현한 프로젝트입니다. KOSIS/ECOS 데이터를 활용한 실시간 경제지표 시각화 서비스로, 구독 모델과 결제 시스템까지 구현했습니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Turborepo', 'Zustand', 'TanStack Query', 'Tailwind CSS 4', 'Supabase', 'TossPay'],
    role: '풀스택 개발자',
    period: '2024.12 - 현재',
    featured: true,
    order: 4,
    stats: {
      completion: '70%',
    },
    achievements: [
      { description: '모노레포 패키지', metric: '9개' },
      { description: '차트 위젯 종류', metric: '7종' },
      { description: '경제 지표', metric: '40+개' },
      { description: '구독 플랜', metric: 'Basic/Pro' },
    ],
    features: [
      'KOSIS/ECOS/OECD 3개 데이터소스 통합',
      'Basic(무료)/Pro(9,900원) 구독 모델',
      'React Grid Layout 드래그 앤 드롭 에디터',
      'Google/Naver/Kakao 소셜 로그인',
      'TossPay SDK v2 결제 시스템',
      'LTTB 알고리즘 차트 최적화',
      '7종 차트 위젯 (시계열, 막대, 산점도, 레이더, 방사형 등)',
      '실시간 데이터 업데이트',
    ],
    challenges: [
      'AI와 협업하여 전체 설계 문서 작성',
      '복잡한 경제 데이터 구조 설계',
      '실시간 데이터 업데이트 최적화',
      '구독 및 결제 시스템 구현',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/etorch-docs', label: '설계 문서' },
      { type: 'demo', url: 'https://etorch-mock-api.vercel.app/api', label: 'Mock API' },
    ],
    images: [
      { url: '/images/e-torch-1.png', alt: 'E-Torch 대시보드' },
      { url: '/images/e-torch-2.png', alt: '차트 위젯' },
      { url: '/images/e-torch-3.png', alt: '데이터 테이블' },
      { url: '/images/e-torch-4.png', alt: '구독 플랜' },
    ],
  },

  {
    id: 'tailwind-grid-layout',
    title: 'Tailwind Grid Layout',
    subtitle: 'Modern React Grid System',
    description: 'react-grid-layout의 Tailwind CSS 기반 경량 대안으로 AI와 함께 개발한 그리드 레이아웃 시스템',
    longDescription: 'E-Torch 프로젝트 중 react-grid-layout의 스타일링 문제를 해결하기 위해 AI 페어 프로그래밍으로 새로 개발한 라이브러리입니다. 100% 테스트 커버리지와 완벽한 API 호환성을 달성했습니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'production',
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
      { url: '/images/tailwind-grid-1.png', alt: '그리드 레이아웃 데모' },
      { url: '/images/tailwind-grid-2.png', alt: '반응형 브레이크포인트' },
      { url: '/images/tailwind-grid-3.png', alt: '드래그 앤 드롭' },
      { url: '/images/tailwind-grid-4.png', alt: '리사이즈 기능' },
    ],
  },

  {
    id: 'penguinjs',
    title: 'PenguinJS',
    subtitle: 'JavaScript Learning Game Platform',
    description: 'JavaScript 핵심 개념을 게임으로 학습하는 인터랙티브 교육 플랫폼 (18개 게임 기획, 2개 완료)',
    longDescription: 'Flexbox Froggy에서 영감을 받아 JavaScript의 복잡한 개념들을 게임으로 학습할 수 있도록 설계했습니다. 중급 이상 개발자를 위한 심화 학습 플랫폼으로, 실제 코딩과 메모리 상태 시뮬레이션을 통해 학습합니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Monaco Editor', 'Web Worker', 'Tailwind CSS'],
    role: '풀스택 개발자',
    period: '2025.01 - 현재',
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
      'CallStack Library: 콜스택 시뮬레이션 15단계 완료',
      '난이도: beginner/intermediate/advanced',
      'Monaco Editor 실시간 코드 편집',
      '한/영/일/중 4개국어 지원',
      'PWA 오프라인 지원',
      '진행도 로컬 스토리지 저장',
      '중급 이상 개발자 타겟',
    ],
    challenges: [
      'AI와 함께 270개 스테이지 설계',
      '안전한 코드 실행 환경 구축',
      '게임 메커니즘 설계',
      '학습 곡선 최적화',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/penguinjs' },
      { type: 'demo', url: 'https://penguinjs-playground.vercel.app/ko' },
      { type: 'docs', url: 'https://github.com/Seungwoo321/penguinjs/tree/main/docs', label: '설계 문서' },
    ],
    images: [
      { url: '/images/penguinjs-1.png', alt: 'PenguinJS 메인 화면' },
      { url: '/images/penguinjs-2.png', alt: 'Closure Cave 게임' },
      { url: '/images/penguinjs-3.png', alt: 'CallStack Library 게임' },
      { url: '/images/penguinjs-4.png', alt: '게임 선택 화면' },
    ],
  },

  {
    id: 'frontend-learning-app',
    title: 'Frontend Learning App',
    subtitle: 'React Native Educational App',
    description: 'AI가 생성한 1600+ 토픽의 프론트엔드 학습 콘텐츠를 3단계 난이도로 제공하는 모바일 앱',
    longDescription: 'AI를 활용하여 프론트엔드 개념을 쉬움(중학생 수준), 일반, 전문가 3단계로 설명하는 학습 앱입니다. 현재 약 200개 토픽이 구현되었고, React Native와 웹뷰를 결합한 하이브리드 아키텍처로 구현했습니다.',
    category: 'ai-powered' as ProjectCategory,
    status: 'development',
    technologies: ['React Native', 'Expo SDK 53', 'TypeScript', 'NativeWind', 'Zustand', 'WebView'],
    role: '모바일 앱 개발자',
    period: '2024.11 - 현재',
    order: 8,
    achievements: [
      { description: '목표 토픽 수', metric: '1600+' },
      { description: '구현 완료', metric: '200+ 토픽' },
      { description: '난이도 레벨', metric: '3단계' },
      { description: '플랫폼', metric: 'iOS/Android' },
    ],
    features: [
      '3단계 난이도 시스템 (쉬움/일반/전문가)',
      'AI 생성 콘텐츠 1600+ 토픽',
      'HTML/CSS/JavaScript 핵심 개념',
      'React Native + WebView 하이브리드',
      '오프라인 학습 지원',
      '학습 진도 추적 시스템',
      '퀴즈 및 실습 문제',
      '프론트엔드 개발자 타겟',
    ],
    challenges: [
      'AI 콘텐츠 품질 관리',
      'React Native 콘텐츠 렌더링 제약 해결',
      '웹뷰 통합 아키텍처',
      '크로스 플랫폼 일관성',
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/frontend-learning-app' },
    ],
    images: [
      { url: '/images/learning-app-1.png', alt: '홈 화면' },
      { url: '/images/learning-app-2.png', alt: '학습 카탈로그' },
      { url: '/images/learning-app-3.png', alt: '난이도 선택' },
      { url: '/images/learning-app-4.png', alt: '학습 화면' },
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

// 카테고리별 프로젝트 필터링 헬퍼
export const getProjectsByCategory = (category: ProjectCategory) => 
  projects.filter(p => p.category === category).sort((a, b) => (a.order || 999) - (b.order || 999));

// Featured 프로젝트 가져오기
export const getFeaturedProjects = () => 
  projects.filter(p => p.featured).sort((a, b) => (a.order || 999) - (b.order || 999));

// 프로젝트 ID로 찾기
export const getProjectById = (id: string) => 
  projects.find(p => p.id === id);