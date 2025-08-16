#!/usr/bin/env node

/**
 * 프로젝트 스크린샷 플레이스홀더 생성 스크립트
 * 실제 스크린샷이 준비될 때까지 임시로 사용할 이미지를 생성합니다.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

// 프로젝트별 플레이스홀더 이미지 설정
const placeholderImages = [
  // Vue Pivottable
  { name: 'vue-pivottable-1.png', width: 1200, height: 800, text: 'Vue Pivottable - Main View' },
  { name: 'vue-pivottable-2.png', width: 1200, height: 800, text: 'Vue Pivottable - Chart' },
  
  // E-Torch
  { name: 'e-torch-1.png', width: 1200, height: 800, text: 'E-Torch - Dashboard' },
  { name: 'e-torch-2.png', width: 1200, height: 800, text: 'E-Torch - Charts' },
  { name: 'e-torch-3.png', width: 1200, height: 800, text: 'E-Torch - Data Table' },
  { name: 'e-torch-4.png', width: 1200, height: 800, text: 'E-Torch - Pricing' },
  { name: 'e-torch-architecture-before.png', width: 1000, height: 600, text: 'Architecture - Before' },
  { name: 'e-torch-architecture-after.png', width: 1000, height: 600, text: 'Architecture - After' },
  { name: 'e-torch-admin-panel.png', width: 1200, height: 800, text: 'Admin Panel' },
  { name: 'e-torch-pricing.png', width: 1200, height: 800, text: 'Pricing Plans' },
  { name: 'e-torch-chart-performance.png', width: 1000, height: 600, text: 'Chart Performance' },
  { name: 'e-torch-ai-collaboration.png', width: 1200, height: 800, text: 'AI Collaboration' },
  
  // PenguinJS
  { name: 'penguinjs-1.png', width: 1200, height: 800, text: 'PenguinJS - Home' },
  { name: 'penguinjs-2.png', width: 1200, height: 800, text: 'Closure Cave Game' },
  { name: 'penguinjs-3.png', width: 1200, height: 800, text: 'CallStack Library' },
  { name: 'penguinjs-4.png', width: 1200, height: 800, text: 'Game Selection' },
  { name: 'penguinjs-game-concept.png', width: 1000, height: 600, text: 'Game Concept' },
  { name: 'penguinjs-target-analysis.png', width: 1000, height: 600, text: 'Target Analysis' },
  { name: 'penguinjs-closure-cave.png', width: 1200, height: 800, text: 'Closure Cave' },
  { name: 'penguinjs-callstack-library.png', width: 1200, height: 800, text: 'CallStack Library' },
  { name: 'penguinjs-roadmap.png', width: 1000, height: 600, text: 'Development Roadmap' },
  
  // Tailwind Grid Layout
  { name: 'tailwind-grid-1.png', width: 1200, height: 800, text: 'Grid Layout Demo' },
  { name: 'tailwind-grid-2.png', width: 1200, height: 800, text: 'Responsive Breakpoints' },
  { name: 'tailwind-grid-3.png', width: 1200, height: 800, text: 'Drag and Drop' },
  { name: 'tailwind-grid-4.png', width: 1200, height: 800, text: 'Resize Feature' },
  { name: 'tailwind-grid-comparison.png', width: 1000, height: 600, text: 'Library Comparison' },
  { name: 'tailwind-grid-coverage.png', width: 1000, height: 600, text: 'Test Coverage 100%' },
  { name: 'tailwind-grid-mobile.png', width: 400, height: 800, text: 'Mobile Optimized' },
  
  // Frontend Learning App
  { name: 'learning-app-1.png', width: 400, height: 800, text: 'Home Screen' },
  { name: 'learning-app-2.png', width: 400, height: 800, text: 'Learning Catalog' },
  { name: 'learning-app-3.png', width: 400, height: 800, text: 'Difficulty Selection' },
  { name: 'learning-app-4.png', width: 400, height: 800, text: 'Learning Screen' },
  { name: 'learning-app-content-pipeline.png', width: 1000, height: 600, text: 'Content Pipeline' },
  { name: 'learning-app-architecture.png', width: 1000, height: 600, text: 'Hybrid Architecture' },
  { name: 'learning-app-difficulty-levels.png', width: 1000, height: 600, text: '3-Level System' },
  
  // Vue3 Pivottable
  { name: 'vue3-pivottable-team.png', width: 1000, height: 600, text: 'Team Collaboration' },
  
  // Vue Datamaps
  { name: 'vue-datamaps-1.png', width: 1200, height: 800, text: 'Vue Datamaps' },
  
  // Code Style
  { name: 'code-style-1.png', width: 1200, height: 800, text: 'ESLint Plugin' },
  
  // HyperBilling
  { name: 'hyperbilling-1.png', width: 1200, height: 800, text: 'HyperBilling 3.0' },
  
  // Vue Pivottable Migration
  { name: 'vue-pivottable-migration.png', width: 1000, height: 600, text: 'jQuery to Vue Migration' },
];

// 디렉토리 생성
if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

// 플레이스홀더 이미지 다운로드 함수
function downloadImage(imageConfig) {
  return new Promise((resolve, reject) => {
    const { name, width, height, text } = imageConfig;
    const filePath = path.join(IMAGES_DIR, name);
    
    // 이미 파일이 존재하면 스킵
    if (fs.existsSync(filePath)) {
      console.log(`✓ ${name} already exists`);
      resolve();
      return;
    }
    
    // Placeholder.com URL 생성
    const bgColor = '1a1a1a';
    const textColor = 'ffffff';
    const encodedText = encodeURIComponent(text);
    const url = `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}.png?text=${encodedText}`;
    
    const file = fs.createWriteStream(filePath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded ${name}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // 실패 시 파일 삭제
      console.error(`✗ Failed to download ${name}:`, err.message);
      reject(err);
    });
  });
}

// 모든 플레이스홀더 이미지 생성
async function generateAllPlaceholders() {
  console.log('🎨 Generating placeholder images...\n');
  
  for (const imageConfig of placeholderImages) {
    try {
      await downloadImage(imageConfig);
    } catch (error) {
      console.error(`Failed to generate ${imageConfig.name}`);
    }
  }
  
  console.log('\n✅ Placeholder generation complete!');
  console.log(`📁 Images saved to: ${IMAGES_DIR}`);
  console.log('\n⚠️  Note: Replace these placeholder images with actual screenshots when available.');
}

// 실행
generateAllPlaceholders().catch(console.error);