# Webpack Cache Serialization Warning 해결 방안

## 문제 설명
```
[webpack.cache.PackFileCacheStrategy] Serializing big strings (102-103kiB) 
impacts deserialization performance (consider using Buffer instead and decode when needed)
```

이 경고는 webpack이 큰 문자열을 캐시하려고 할 때 발생하며, 주로 GSAP ScrollTrigger의 source maps 때문입니다.

## 근본 원인
1. **GSAP Source Maps**: GSAP 모듈의 source map 파일들이 큰 문자열을 포함
2. **ES Module vs UMD**: GSAP의 ES module 버전이 webpack과 충돌
3. **Next.js SSR**: 서버사이드 렌더링 환경에서 GSAP 처리 문제

## 해결 방안 (2025년 7월 기준)

### 1. GSAP 모듈 최적화 (핵심 해결책)

**A. GSAP dist 버전 사용**
ES module 대신 UMD 버전 사용:
```typescript
// 변경 전
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 변경 후
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
```

**B. Next.js 설정에서 GSAP transpile**
`next.config.ts`:
```typescript
const nextConfig: NextConfig = {
  // GSAP 모듈 transpile 처리
  transpilePackages: ['gsap'],
  
  webpack: (config) => {
    // Webpack 캐시 완전 비활성화
    config.cache = false;
    
    // GSAP source maps 처리
    config.module.rules.push({
      test: /\.js$/,
      include: /node_modules\/gsap/,
      use: {
        loader: 'source-map-loader',
      },
      enforce: 'pre',
    });
    
    return config;
  },
  
  // Source maps 비활성화 (큰 문자열 원인 제거)
  productionBrowserSourceMaps: false,
};
```

**C. source-map-loader 설치**
```bash
npm install --save-dev source-map-loader
```

### 2. Turbopack 사용 (대안)
GSAP 이슈가 해결되지 않을 경우:

`package.json` 수정:
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

주의: Turbopack 전환 시 일부 webpack 설정 사용 불가능

### 2. 캐시 및 임시 파일 정리
```bash
# .next 폴더 삭제
rm -rf .next

# node_modules 재설치
rm -rf node_modules
npm install
```

### 3. Next.js 및 관련 패키지 최신 버전으로 업그레이드
```bash
npm i next@latest react@latest react-dom@latest eslint-config-next@latest
```

### 4. Webpack 캐시 설정 조정
`next.config.mjs`에 다음 설정 추가:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 메모리 사용량을 최소화하여 큰 문자열 캐싱 문제 완화
    config.cache = {
      type: 'filesystem',
      maxMemoryGenerations: 0, // 메모리 캐싱 비활성화
      compression: 'gzip', // 캐시 압축 사용
    };
    
    return config;
  },
};

export default nextConfig;
```

### 5. 대용량 종속성 확인
다음과 같은 패키지들이 이 문제를 일으킬 수 있습니다:
- `@sentry/nextjs`
- 대용량 CSS/JS 번들
- Source maps

필요하지 않은 대용량 패키지는 제거하거나 동적 import를 사용하세요.

## 추가 참고사항

1. 이는 경고(warning)이며 오류(error)가 아닙니다. 앱이 정상 작동한다면 무시해도 됩니다.
2. 2MB 이상의 데이터를 캐싱하는 경우 코드 구조를 리팩토링하는 것을 고려하세요.
3. Production 빌드에서는 일반적으로 이 경고가 나타나지 않습니다.

## 권장 우선순위
1. **GSAP dist 버전 사용** + **Next.js 설정 최적화**
2. source-map-loader 설치 및 source maps 비활성화
3. 캐시 정리 (`rm -rf .next`)
4. Turbopack 전환 시도
5. Next.js 최신 버전 업그레이드

## 테스트 방법
1. 변경사항 적용 후 캐시 정리: `rm -rf .next`
2. 개발 서버 재시작: `npm run dev`
3. 브라우저에서 페이지 로드 후 터미널 확인
4. PackFileCacheStrategy 경고가 사라졌는지 확인

## 예상 결과
- 경고 메시지 완전 제거
- 빌드 시간 단축
- 개발 서버 시작 속도 향상