import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack 설정 (stable로 이동)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // GSAP 모듈 transpile 처리
  transpilePackages: ['gsap'],
  
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  
  // Source maps 완전 비활성화
  productionBrowserSourceMaps: false,
};

export default nextConfig;