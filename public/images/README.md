# 프로젝트 스크린샷 가이드

이 디렉토리는 포트폴리오 프로젝트의 스크린샷을 저장하는 곳입니다.

## 파일 명명 규칙

각 프로젝트별로 다음과 같은 명명 규칙을 따릅니다:

### 오픈소스 프로젝트
- `vue-pivottable-1.png` ~ `vue-pivottable-4.png`: Vue Pivottable 스크린샷
- `vue-datamaps-1.png` ~ `vue-datamaps-4.png`: Vue Datamaps 스크린샷
- `vue3-pivottable-1.png` ~ `vue3-pivottable-4.png`: Vue3 Pivottable 스크린샷
- `code-style-1.png` ~ `code-style-4.png`: Code Style 플러그인 스크린샷

### AI 개발 프로젝트
- `e-torch-1.png` ~ `e-torch-4.png`: E-Torch 메인 스크린샷
- `e-torch-architecture-before.png`: 아키텍처 변경 전
- `e-torch-architecture-after.png`: 아키텍처 변경 후
- `e-torch-admin-panel.png`: 관리자 패널
- `e-torch-pricing.png`: 구독 플랜
- `e-torch-chart-performance.png`: 차트 성능 비교
- `e-torch-ai-collaboration.png`: AI 협업 과정

- `penguinjs-1.png` ~ `penguinjs-4.png`: PenguinJS 메인 스크린샷
- `penguinjs-game-concept.png`: 게임 컨셉
- `penguinjs-target-analysis.png`: 타겟 분석
- `penguinjs-closure-cave.png`: Closure Cave 게임
- `penguinjs-callstack-library.png`: CallStack Library 게임
- `penguinjs-roadmap.png`: 개발 로드맵

- `tailwind-grid-1.png` ~ `tailwind-grid-4.png`: Tailwind Grid Layout 스크린샷
- `tailwind-grid-comparison.png`: react-grid-layout 비교
- `tailwind-grid-coverage.png`: 테스트 커버리지
- `tailwind-grid-mobile.png`: 모바일 최적화

- `learning-app-1.png` ~ `learning-app-4.png`: Frontend Learning App 스크린샷
- `learning-app-content-pipeline.png`: 콘텐츠 생성 파이프라인
- `learning-app-architecture.png`: 하이브리드 아키텍처
- `learning-app-difficulty-levels.png`: 3단계 난이도 시스템

### 업무 프로젝트
- `hyperbilling-1.png` ~ `hyperbilling-4.png`: HyperBilling 3.0 스크린샷

## 스크린샷 가이드라인

1. **해상도**: 최소 1920x1080, 최대 2560x1440
2. **파일 형식**: PNG (투명 배경이 필요한 경우) 또는 JPG (일반 스크린샷)
3. **파일 크기**: 최대 500KB (웹 최적화 필수)
4. **비율**: 16:9 또는 4:3 권장

## 스크린샷 최적화

```bash
# ImageMagick을 사용한 이미지 최적화
convert input.png -quality 85 -resize 1920x1080\> output.png

# 또는 squoosh-cli 사용
npx @squoosh/cli --mozjpeg '{"quality":85}' *.png
```

## 임시 플레이스홀더

실제 스크린샷이 준비되지 않은 경우, 다음 서비스를 사용하여 임시 이미지를 생성할 수 있습니다:
- https://via.placeholder.com/800x600
- https://picsum.photos/800/600

## 체크리스트

프로젝트별 필수 스크린샷:
- [ ] 메인 화면 (홈/대시보드)
- [ ] 핵심 기능 화면
- [ ] 모바일/반응형 뷰
- [ ] 기술적 특징을 보여주는 화면