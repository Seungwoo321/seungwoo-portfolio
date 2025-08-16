#!/usr/bin/env node

/**
 * SVG 플레이스홀더 이미지 생성 스크립트
 */

const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// SVG 템플릿 생성 함수
function createSVG(width, height, text, bgColor = '#1a1a1a', textColor = '#ffffff') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${bgColor}"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="${textColor}" text-anchor="middle" dy=".3em">
    ${text}
  </text>
</svg>`;
}

// 필요한 플레이스홀더 이미지 목록
const placeholders = [
  // Vue Pivottable
  { name: 'vue-pivottable-1.svg', width: 1200, height: 800, text: 'Vue Pivottable - Main' },
  { name: 'vue-pivottable-2.svg', width: 1200, height: 800, text: 'Vue Pivottable - Chart' },
  { name: 'vue-pivottable-migration.svg', width: 1000, height: 600, text: 'jQuery to Vue Migration' },
  
  // E-Torch Q&A 이미지들
  { name: 'e-torch-architecture-before.svg', width: 1000, height: 600, text: 'Architecture Before' },
  { name: 'e-torch-architecture-after.svg', width: 1000, height: 600, text: 'Architecture After' },
  { name: 'e-torch-admin-panel.svg', width: 1200, height: 800, text: 'Admin Panel' },
  { name: 'e-torch-pricing.svg', width: 1200, height: 800, text: 'Pricing Plans' },
  { name: 'e-torch-chart-performance.svg', width: 1000, height: 600, text: 'Chart Performance' },
  { name: 'e-torch-ai-collaboration.svg', width: 1200, height: 800, text: 'AI Collaboration' },
  
  // PenguinJS Q&A 이미지들
  { name: 'penguinjs-game-concept.svg', width: 1000, height: 600, text: 'Game Concept' },
  { name: 'penguinjs-target-analysis.svg', width: 1000, height: 600, text: 'Target Analysis' },
  { name: 'penguinjs-closure-cave.svg', width: 1200, height: 800, text: 'Closure Cave Game' },
  { name: 'penguinjs-callstack-library.svg', width: 1200, height: 800, text: 'CallStack Library' },
  { name: 'penguinjs-roadmap.svg', width: 1000, height: 600, text: 'Development Roadmap' },
  
  // Tailwind Grid Layout Q&A 이미지들
  { name: 'tailwind-grid-comparison.svg', width: 1000, height: 600, text: 'Library Comparison' },
  { name: 'tailwind-grid-coverage.svg', width: 1000, height: 600, text: 'Test Coverage: 100%' },
  { name: 'tailwind-grid-mobile.svg', width: 400, height: 800, text: 'Mobile Optimized' },
  
  // Frontend Learning App Q&A 이미지들
  { name: 'learning-app-content-pipeline.svg', width: 1000, height: 600, text: 'Content Pipeline' },
  { name: 'learning-app-architecture.svg', width: 1000, height: 600, text: 'Hybrid Architecture' },
  { name: 'learning-app-difficulty-levels.svg', width: 1000, height: 600, text: '3-Level System' },
  
  // 기타 프로젝트
  { name: 'vue3-pivottable-team.svg', width: 1000, height: 600, text: 'Team Collaboration' },
  { name: 'vue-datamaps-1.svg', width: 1200, height: 800, text: 'Vue Datamaps' },
  { name: 'code-style-1.svg', width: 1200, height: 800, text: 'ESLint Plugin' },
  { name: 'hyperbilling-1.svg', width: 1200, height: 800, text: 'HyperBilling 3.0' },
];

// 디렉토리 생성
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// SVG 파일 생성
console.log('🎨 Creating SVG placeholder images...\n');

placeholders.forEach(({ name, width, height, text }) => {
  const filePath = path.join(IMAGES_DIR, name);
  
  // .svg를 .png로 변경 (Next.js Image 컴포넌트 호환성)
  const pngName = name.replace('.svg', '.png');
  const pngPath = path.join(IMAGES_DIR, pngName);
  
  // 이미 파일이 존재하면 스킵
  if (fs.existsSync(pngPath)) {
    console.log(`✓ ${pngName} already exists`);
    return;
  }
  
  // SVG 내용 생성
  const svgContent = createSVG(width, height, text);
  
  // SVG 파일 저장 (나중에 PNG로 변환할 수 있도록)
  fs.writeFileSync(filePath, svgContent);
  console.log(`✓ Created ${name}`);
});

console.log('\n✅ SVG placeholder generation complete!');
console.log(`📁 Images saved to: ${IMAGES_DIR}`);
console.log('\n⚠️  Note: These are temporary SVG placeholders.');
console.log('💡 Tip: Convert to PNG using ImageMagick or similar tools:');
console.log('   convert *.svg -background none -density 150 -resize 1920x1080 output.png');