import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack 최우선 사용 - webpack 경고 완전 해결
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // GSAP 모듈 transpile 처리
  transpilePackages: ['gsap'],
  
  webpack: (config, { dev }) => {
    // 개발 환경에서만 캐시 완전 비활성화
    if (dev) {
      config.cache = false;
    }
    
    // GSAP 모듈 최적화 - dist 버전 강제 사용
    config.resolve.alias = {
      ...config.resolve.alias,
      'gsap': require.resolve('gsap/dist/gsap.min.js'),
      'gsap/ScrollTrigger': require.resolve('gsap/dist/ScrollTrigger.min.js'),
    };
    
    // 소스맵 관련 로더 제거하여 큰 문자열 문제 해결
    config.module.rules = config.module.rules.filter(
      rule => !(rule.loader && rule.loader.includes('source-map-loader'))
    );
    
    return config;
  },
  
  // Source maps 완전 비활성화
  productionBrowserSourceMaps: false,
};

export default nextConfig;