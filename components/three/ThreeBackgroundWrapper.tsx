'use client';

import dynamic from 'next/dynamic';

const ThreeBackground = dynamic(
  () => import('./ThreeBackground'),
  { 
    ssr: false,
    loading: () => (
      <div 
        className="three-canvas" 
        style={{ 
          background: 'linear-gradient(to bottom, #2a1810 0%, #1a0f0a 50%, #0f0705 100%)' 
        }} 
      />
    )
  }
);

export default ThreeBackground;