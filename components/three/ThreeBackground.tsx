'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 불꽃 효과를 위한 단일 입자 - 양자리의 열정적인 에너지 표현
function FireEmber({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  const speed = 0.8 + Math.random() * 0.8;
  const amplitude = 0.3 + Math.random() * 0.4;
  
  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime;
      // 상승하는 불꽃 효과 - 순환
      const cycleTime = (time * speed) % 10;  // 10초마다 순환
      ref.current.position.y = initialY + cycleTime * 0.3 + Math.sin(time * speed) * amplitude;
      ref.current.position.x = position[0] + Math.sin(time * speed * 0.7) * amplitude;
      ref.current.position.z = position[2] + Math.cos(time * speed * 0.5) * amplitude * 0.5;
      ref.current.rotation.y += 0.02;
      ref.current.rotation.x += 0.01;
      
      // 깜빡이는 효과
      const scale = 0.8 + Math.sin(time * speed * 3) * 0.4;
      ref.current.scale.set(scale, scale, scale);
      
      // 상승할수록 투명하게
      if (ref.current.material) {
        (ref.current.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 1 - (ref.current.position.y - initialY) / 3);
      }
    }
  });

  return (
    <Box ref={ref} position={position} args={[0.05, 0.05, 0.05]}>
      <meshStandardMaterial 
        color="#ff4500" 
        emissive="#ff6b35"
        emissiveIntensity={3}
        toneMapped={false}
        transparent
        opacity={1}
      />
    </Box>
  );
}

// 황금 보석 - 신금년(금속 양)의 번영과 부를 상징
function GoldenTreasure() {
  const groupRef = useRef<THREE.Group>(null);
  const coinRefs = useRef<THREE.Group[]>([]);
  const coinData = useRef<Array<{
    rotationSpeed: { x: number; y: number; z: number };
    floatSpeed: number;
    floatAmplitude: number;
    tiltAngle: { x: number; z: number };
  }>>([]);
  
  // 공통 재질 정의
  const goldMaterials = useMemo(() => ({
    body: {
      color: "#FFD700",
      metalness: 0.9,
      roughness: 0.08,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1,
      emissive: "#FFD700",
      emissiveIntensity: 0.1
    },
    raised: {
      color: "#FFD700",
      metalness: 0.75,
      roughness: 0.05,
      clearcoat: 0.4,
      clearcoatRoughness: 0.02,
      emissive: "#FFD700",
      emissiveIntensity: 0.25
    },
    recessed: {
      color: "#D4AF37",
      metalness: 0.6,
      roughness: 0.5,
      emissive: "#B8860B",
      emissiveIntensity: 0.05
    },
    edge: {
      color: "#FFD700",
      metalness: 0.88,
      roughness: 0.3,
      side: THREE.DoubleSide
    }
  }), []);
  
  // 각 금화의 랜덤 속성 초기화 - 더 역동적으로
  useMemo(() => {
    coinData.current = Array.from({ length: 5 }, (_, i) => ({
      rotationSpeed: {
        x: 0.5 + Math.random() * 1,  // 적당한 X축 회전
        y: 0.3 + Math.random() * 0.7,  // Y축 회전
        z: 0.2 + Math.random() * 0.5  // Z축 회전
      },
      floatSpeed: 0.5 + Math.random() * 0.5,
      floatAmplitude: 0.3 + Math.random() * 0.3,  // 더 큰 움직임으로 구체 통과 방지
      tiltAngle: {
        x: (Math.random() - 0.5) * Math.PI * 0.3,
        z: (Math.random() - 0.5) * Math.PI * 0.3
      },
      initialX: Math.cos((i / 5) * Math.PI * 2) * 1.5,  // 초기 위치 저장
      initialZ: Math.sin((i / 5) * Math.PI * 2) * 1.5
    }));
  }, []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
    
    // 각 금화가 랜덤하게 회전하며 떠다니는 효과
    coinRefs.current.forEach((coin, i) => {
      if (coin && coinData.current[i]) {
        const data = coinData.current[i];
        const time = state.clock.elapsedTime;
        
        // 역동적인 3D 회전 - 마치 던진 동전처럼
        coin.rotation.x = time * data.rotationSpeed.x;  // 계속 뒤집어지는 효과
        coin.rotation.y = time * data.rotationSpeed.y;  // 빙글빙글 도는 효과
        coin.rotation.z = time * data.rotationSpeed.z;  // 추가 회전축
        
        // 더 활발한 위아래 움직임
        const baseY = Math.sin(i * 1.5) * 0.5;
        coin.position.y = baseY + Math.sin(time * data.floatSpeed + i) * data.floatAmplitude;
        
        // 좌우로도 살짝 움직이는 효과 - 초기 위치 기준
        coin.position.x = data.initialX + Math.sin(time * 0.7 + i) * 0.05;
        coin.position.z = data.initialZ + Math.cos(time * 0.5 + i) * 0.05;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* 입체적인 황금 동전들 - 5개로 조정 */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2;
        const radius = 2.2;  // 구체와 충돌하지 않도록 반경 확대
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = -0.5 + i * 0.4;  // 높이 분산
        
        return (
          <group
            key={i}
            position={[x, y, z]}
            ref={(el) => { if (el) coinRefs.current[i] = el; }}
          >
            {/* 금화 본체 - 통합된 구조 */}
            <group name="coin-body">
              {/* 메인 본체 */}
              <mesh>
                <cylinderGeometry args={[0.5, 0.5, 0.15, 64, 1]} />
                <meshPhysicalMaterial {...goldMaterials.body} />
              </mesh>
              
              {/* 금화 옆면 무늬 (milled edge) */}
              <mesh>
                <cylinderGeometry args={[0.501, 0.501, 0.15, 128, 1, true]} />
                <meshPhysicalMaterial {...goldMaterials.edge} />
              </mesh>
            </group>
            
            {/* 동전 앞면 - 통합된 구조 */}
            <group name="coin-front">
              {/* 앞면 기본 표면 제거 - 본체가 이미 있음 */}
              
              {/* 외곽 림 (raised rim) - 얇게 조정 */}
              <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.485, 0.01, 6, 64]} />
                <meshPhysicalMaterial {...goldMaterials.raised} />
              </mesh>
              
              {/* 중앙 양 얼굴 (양각 - raised) */}
              <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.35, 32]} />
                <meshPhysicalMaterial {...goldMaterials.raised} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 양 뿔 (양각) - 평평한 형태로 */}
              <mesh position={[-0.18, 0.0755, -0.18]} rotation={[-Math.PI / 2, 0, -0.3]}>
                <boxGeometry args={[0.04, 0.15, 0.005]} />
                <meshPhysicalMaterial {...goldMaterials.raised} />
              </mesh>
              <mesh position={[0.18, 0.0755, -0.18]} rotation={[-Math.PI / 2, 0, 0.3]}>
                <boxGeometry args={[0.04, 0.15, 0.005]} />
                <meshPhysicalMaterial {...goldMaterials.raised} />
              </mesh>
              
              {/* 양 눈 (음각 효과) */}
              <mesh position={[-0.08, 0.0755, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.03, 16]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[0.08, 0.0755, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.03, 16]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 양 코 (음각) */}
              <mesh position={[0, 0.0755, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.02, 3]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 양 입 (음각) */}
              <mesh position={[0, 0.0755, 0.12]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.08, 0.01]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 내부 원형 홈 (음각) */}
              <mesh position={[0, 0.074, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.44, 0.46, 64]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.FrontSide} />
              </mesh>
              
              {/* 辛未年 텍스트 영역 (프로스팅 효과) */}
              <mesh position={[0, 0.0752, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.2, 0.04]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} roughness={0.8} side={THREE.FrontSide} />
              </mesh>
            </group>
            
            {/* 동전 뒷면 - 통합된 구조 */}
            <group name="coin-back">
              {/* 뒷면 기본 표면 제거 - 본체가 이미 있음 */}
              
              {/* 외곽 림 (raised rim) */}
              <mesh position={[0, -0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.485, 0.01, 6, 64]} />
                <meshPhysicalMaterial {...goldMaterials.raised} />
              </mesh>
              
              {/* 중앙 태양 (양각) */}
              <mesh position={[0, -0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.28, 32]} />
                <meshPhysicalMaterial {...goldMaterials.raised} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 태양 광선 (양각) - 8개 */}
              {Array.from({ length: 8 }, (_, j) => {
                const rayAngle = (j / 8) * Math.PI * 2;
                return (
                  <mesh 
                    key={`ray-${j}`} 
                    position={[0, -0.076, 0]} 
                    rotation={[-Math.PI / 2, 0, rayAngle]}
                  >
                    <boxGeometry args={[0.08, 0.4, 0.005]} />
                    <meshPhysicalMaterial {...goldMaterials.raised} />
                  </mesh>
                );
              })}
              
              {/* 태양 중심 디테일 (음각) */}
              <mesh position={[0, -0.0755, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.12, 0.18, 32]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.DoubleSide} />
              </mesh>
              
              {/* 내부 원형 홈 (음각) */}
              <mesh position={[0, -0.074, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.44, 0.46, 64]} />
                <meshPhysicalMaterial {...goldMaterials.recessed} side={THREE.BackSide} />
              </mesh>
            </group>
          </group>
        );
      })}
      
      {/* 황금 구체들 및 크리스탈 제거 - 성능 최적화 */}
    </group>
  );
}

// 바닥의 따뜻한 빛
function WarmFloor() {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current && ref.current.material) {
      const material = ref.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Plane 
      ref={ref}
      args={[20, 20]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -2, 0]}
    >
      <meshStandardMaterial
        color="#2a1810"
        emissive="#ff6b35"
        emissiveIntensity={0.3}
        roughness={0.9}
      />
    </Plane>
  );
}

export default function ThreeBackground() {
  return (
    <div className="three-canvas">
      <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
        {/* 환경맵 제거 - Context Lost 방지 */}
        
        <fog attach="fog" args={['#3d2817', 12, 28]} />
        <ambientLight intensity={0.9} color="#ffffff" />
        <pointLight position={[5, 5, 5]} color="#ffffff" intensity={1.5} />
        <pointLight position={[-5, 3, -5]} color="#ffd700" intensity={1.3} />
        <pointLight position={[0, 3, 0]} color="#ffffff" intensity={1.2} />
        {/* 금화를 비추는 추가 조명 */}
        <directionalLight position={[0, 5, 5]} color="#ffd700" intensity={0.8} />
        <directionalLight position={[0, -3, 3]} color="#ffffff" intensity={0.4} />
        
        {/* 바닥의 따뜻한 빛 */}
        <WarmFloor />
        
        {/* 황금 보물 - 진짜 황금처럼 반짝이는 효과 */}
        <GoldenTreasure />
        
        {/* 떠다니는 불꽃 입자들 - 20개로 축소 */}
        {Array.from({ length: 20 }, (_, i) => (
          <FireEmber
            key={i}
            position={[
              (Math.random() - 0.5) * 6,
              -2 + Math.random() * 2,
              (Math.random() - 0.5) * 6
            ]}
          />
        ))}
        
        {/* 중앙의 에너지 태양 - 양자리와 신금년의 융합 */}
        <Sphere args={[0.5, 32, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial
            color="#ff6b35"
            emissive="#ff8c42"
            emissiveIntensity={2}
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        
        {/* 황금 오라 */}
        <Sphere args={[0.7, 32, 32]} position={[0, 1, 0]}>
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffd700"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
            transparent
            opacity={0.3}
          />
        </Sphere>
      </Canvas>
    </div>
  );
}