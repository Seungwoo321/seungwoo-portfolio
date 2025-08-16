# 이승우 포트폴리오

10년차 프론트엔드 개발자 포트폴리오 웹사이트

## 🚀 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Mantine UI v8
- **Styling**: Tailwind CSS v4
- **Animation**: GSAP + React
- **3D Graphics**: Three.js + React Three Fiber
- **State Management**: Zustand
- **Data Fetching**: TanStack Query

## 📁 프로젝트 구조

```
seungwoo-portfolio/
├── app/                    # Next.js App Router
├── components/            
│   ├── sections/          # 페이지 섹션 컴포넌트
│   ├── ui/                # UI 컴포넌트
│   ├── three/             # Three.js 컴포넌트
│   └── providers.tsx      # Context Providers
├── constants/             # 포트폴리오 데이터
├── hooks/                 # Custom hooks
├── lib/                   # 유틸리티 함수
├── store/                 # Zustand stores
├── types/                 # TypeScript types
└── public/                # 정적 파일
```

## 🏃‍♂️ 시작하기

### 개발 서버 실행

```bash
# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev
```

### 빌드

```bash
# 프로덕션 빌드
pnpm build

# 빌드된 앱 실행
pnpm start
```

## 🎨 주요 기능

- **반응형 디자인**: 모든 디바이스에서 최적화된 레이아웃
- **다크 모드**: Mantine의 ColorScheme을 활용한 다크 테마
- **부드러운 애니메이션**: GSAP를 활용한 스크롤 애니메이션
- **3D 배경**: Three.js로 구현된 인터랙티브 배경
- **성능 최적화**: Next.js의 이미지 최적화 및 코드 스플리팅

## 📝 섹션 구성

1. **Hero Section**: 간단한 소개와 핵심 성과
2. **Experience**: 경력 사항 타임라인
3. **Projects**: 주요 프로젝트 쇼케이스
4. **Skills**: 기술 스택 분류
5. **Open Source**: 오픈소스 기여 현황
6. **Contact**: 연락처 정보

## 🔧 커스터마이징

포트폴리오 데이터는 `/constants/portfolio-data.ts`에서 수정할 수 있습니다.

## 📄 라이선스

MIT License