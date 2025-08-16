import { Experience, Project, Skill, OpenSourceProject } from '@/types';

export const experiences: Experience[] = [
  {
    company: '메가존클라우드',
    position: '프론트엔드 개발 매니저',
    period: '2018.08 - 현재',
    description: 'B2B SaaS 플랫폼 HyperBilling 프론트엔드 개발 총괄',
    projects: ['HyperBilling 3.0', 'HyperBilling 3.1', 'React Demo'],
    achievements: [
      '레거시 jQuery 시스템을 Vue.js 기반으로 전면 재구축',
      '프론트엔드 성능 30% 개선으로 고객 이탈률 15% 감소',
      '디자인시스템 Vuesign 구축으로 개발 생산성 50% 향상',
      '5명 개발팀 리드 및 신입 개발자 온보딩 프로세스 구축',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'hyperbilling-3',
    title: 'HyperBilling 3.0',
    description: '10년된 jQuery 레거시를 운영 중단 없이 Vue.js 기반 마이크로프론트엔드로 전환',
    technologies: ['Vue.js', 'TypeScript', 'Webpack', 'REST API', 'AWS'],
    role: '프론트엔드 리드',
    period: '2019.08 - 2022.11',
    achievements: [
      { description: '페이지 로드 시간 개선', metric: '3초 → 1.2초' },
      { description: '코드 재사용률 향상', metric: '70% 달성' },
      { description: '번들 사이즈 감소', metric: '40% 감소' },
      { description: '연간 유지보수 비용 절감', metric: '40% 절감' },
    ],
    featured: true,
  },
  {
    id: 'vue-pivottable',
    title: 'Vue Pivottable',
    description: 'jQuery 기반 Pivottable.js를 Vue 환경에 최적화된 컴포넌트로 재설계',
    technologies: ['Vue.js', 'JavaScript', 'Rollup', 'NPM'],
    role: '오픈소스 메인테이너',
    period: '2019.08 - 현재',
    achievements: [
      { description: '주간 다운로드', metric: '700회+' },
      { description: 'GitHub Stars', metric: '144개' },
      { description: 'NPM 총 다운로드', metric: '50,000회+' },
    ],
    links: [
      { type: 'github', url: 'https://github.com/Seungwoo321/vue-pivottable' },
      { type: 'npm', url: 'https://www.npmjs.com/package/vue-pivottable' },
      { type: 'demo', url: 'https://seungwoo321.github.io/vue-pivottable/' },
    ],
    featured: true,
  },
];

export const skills: Skill[] = [
  { category: 'expert', name: 'Vue.js', years: 6 },
  { category: 'expert', name: 'React', years: 3 },
  { category: 'expert', name: 'TypeScript', years: 4 },
  { category: 'expert', name: 'JavaScript', years: 10 },
  { category: 'proficient', name: 'Node.js', years: 5 },
  { category: 'proficient', name: 'AWS', years: 4 },
  { category: 'proficient', name: 'Docker', years: 3 },
  { category: 'proficient', name: 'CI/CD', years: 4 },
  { category: 'experienced', name: 'React Native', years: 1 },
  { category: 'experienced', name: 'Three.js', years: 1 },
  { category: 'experienced', name: 'Python', years: 2 },
];

export const openSourceProjects: OpenSourceProject[] = [
  {
    name: 'vue-pivottable',
    description: 'Vue.js 피벗 테이블 컴포넌트',
    stars: 144,
    forks: 42,
    downloads: 700,
    url: 'https://github.com/Seungwoo321/vue-pivottable',
    language: 'JavaScript',
  },
  {
    name: 'vue3-pivottable',
    description: 'Vue 3 버전 피벗 테이블',
    stars: 12,
    forks: 3,
    downloads: 150,
    url: 'https://github.com/vue-pivottable/vue3-pivottable',
    language: 'TypeScript',
  },
  {
    name: 'vue-datamaps',
    description: 'D3 기반 지도 시각화',
    stars: 19,
    forks: 7,
    downloads: 250,
    url: 'https://github.com/Seungwoo321/vue-datamaps',
    language: 'JavaScript',
  },
];