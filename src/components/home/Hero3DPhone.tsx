import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import { useRef, Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

interface Props {
  screenshotUrl: string;
}

function PhoneMockup({ screenshotUrl }: { screenshotUrl: string }) {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useLoader(THREE.TextureLoader, screenshotUrl);

  useFrame(({ pointer }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * 0.15,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef}>
        {/* Phone body */}
        <RoundedBox args={[2.2, 4.5, 0.15]} radius={0.15} smoothness={4}>
          <meshStandardMaterial
            color="#131316"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        {/* Screen with screenshot */}
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[2, 4.2]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </group>
    </Float>
  );
}

function PhonePlaceholder() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className="w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] rounded-[32px] glass"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          animation: 'shimmer 2s ease-in-out infinite',
          backgroundImage:
            'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}

function StaticPhoneFallback({ screenshotUrl }: { screenshotUrl: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
      <div
        className="relative w-[200px] h-[400px] sm:w-[240px] sm:h-[480px] rounded-[32px] glass overflow-hidden"
        style={{
          transform: 'perspective(800px) rotateY(-8deg) rotateX(4deg)',
        }}
      >
        <img
          src={screenshotUrl}
          alt=""
          className="absolute inset-[8px] rounded-[24px] object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default function Hero3DPhone({ screenshotUrl }: Props) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        <PhonePlaceholder />
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
        <StaticPhoneFallback screenshotUrl={screenshotUrl} />
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px]">
      <Suspense fallback={<PhonePlaceholder />}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <PhoneMockup screenshotUrl={screenshotUrl} />
          <Environment preset="city" />
        </Canvas>
      </Suspense>
    </div>
  );
}
