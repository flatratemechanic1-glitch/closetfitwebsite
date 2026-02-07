import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, RoundedBox, useTexture } from '@react-three/drei';
import { useRef, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import * as THREE from 'three';

interface Props {
  screenshots: string[];
  transformFrames?: string[];
  transformPoster?: string;
}

function PhoneCard({ screenshotUrl }: { screenshotUrl: string }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      screenshotUrl,
      (tex) => setTexture(tex),
      undefined,
      () => setTexture(null),
    );
    return () => {
      if (texture) texture.dispose();
    };
  }, [screenshotUrl]);

  return (
    <group>
      {/* Phone body */}
      <RoundedBox args={[1.6, 3.2, 0.12]} radius={0.12} smoothness={4}>
        <meshStandardMaterial
          color="#131316"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>
      {/* Screen */}
      <mesh position={[0, 0, 0.065]}>
        <planeGeometry args={[1.4, 3.0]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshBasicMaterial color="#1a1a1f" />
        )}
      </mesh>
    </group>
  );
}

function CenterShowcase({ frames }: { frames: string[] }) {
  const textures = useTexture(frames);
  const frameIndex = useRef(0);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const elapsed = useRef(0);

  // Disable mipmaps and use linear filtering to prevent edge blending artifacts
  useEffect(() => {
    for (const tex of textures) {
      tex.generateMipmaps = false;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
    }
  }, [textures]);

  // Cycle frames at ~6fps (167ms per frame)
  useFrame((_, delta) => {
    if (textures.length === 0) return;
    elapsed.current += delta;
    if (elapsed.current >= 0.167) {
      elapsed.current = 0;
      frameIndex.current = (frameIndex.current + 1) % textures.length;
      if (materialRef.current) {
        materialRef.current.map = textures[frameIndex.current];
        materialRef.current.needsUpdate = true;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Frame sequence plane — 4.05×7.5 preserves exact 368:682 aspect ratio.
           No 'transparent' flag — alphaTest alone discards alpha<0.5 fragments
           without compositing artifacts that cause the visible rectangle. */}
      <mesh>
        <planeGeometry args={[4.05, 7.5]} />
        <meshBasicMaterial
          ref={materialRef}
          map={textures[0]}
          alphaTest={0.5}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function PhoneCarousel({ screenshots, transformFrames }: { screenshots: string[]; transformFrames?: string[] }) {
  const groupRef = useRef<THREE.Group>(null);
  const tiltRef = useRef<THREE.Group>(null);
  const count = screenshots.length;
  const radius = 4.5;

  // Drag state
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const rotationOffset = useRef(0);
  const autoRotationBase = useRef(0);
  const dragDelta = useRef(0);
  const clockAtRelease = useRef(0);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      dragDelta.current = (e.clientX - dragStartX.current) * 0.01;
    };

    const onPointerUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      // Bake final rotation so auto-resume is seamless:
      // new offset = (where we ended) - (where clock will put us)
      const finalRotation = autoRotationBase.current + dragDelta.current;
      rotationOffset.current = finalRotation;
      clockAtRelease.current = performance.now() / 1000;
      dragDelta.current = 0;
      document.body.style.cursor = '';
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const handlePointerDown = (e: any) => {
    isDragging.current = true;
    dragStartX.current = (e.nativeEvent || e).clientX;
    // Snapshot current total rotation so we can add drag delta to it
    if (groupRef.current) {
      autoRotationBase.current = groupRef.current.rotation.y;
    }
    dragDelta.current = 0;
    document.body.style.cursor = 'grabbing';
  };

  useFrame(({ pointer }) => {
    if (groupRef.current) {
      if (isDragging.current) {
        // While dragging: frozen auto-rotation + live drag delta
        groupRef.current.rotation.y = autoRotationBase.current + dragDelta.current;
      } else {
        // Auto-rotate from where the last drag ended
        const elapsed = performance.now() / 1000 - clockAtRelease.current;
        groupRef.current.rotation.y = rotationOffset.current + elapsed * 0.15;
      }
    }
    // Subtle mouse tilt on the whole thing
    if (tiltRef.current) {
      tiltRef.current.rotation.y = THREE.MathUtils.lerp(
        tiltRef.current.rotation.y,
        pointer.x * 0.1,
        0.03
      );
      tiltRef.current.rotation.x = THREE.MathUtils.lerp(
        tiltRef.current.rotation.x,
        -pointer.y * 0.08,
        0.03
      );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={tiltRef}>
        {/* Center showcase — frame sequence animation, fixed at origin, does not rotate */}
        {transformFrames && transformFrames.length > 0 && (
          <CenterShowcase frames={transformFrames} />
        )}
        <group ref={groupRef} onPointerDown={handlePointerDown}>
          {screenshots.map((url, i) => {
            const angle = (i / count) * Math.PI * 2;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius;
            return (
              <group
                key={i}
                position={[x, 0, z]}
                rotation={[0, angle, 0]}
              >
                <PhoneCard screenshotUrl={url} />
              </group>
            );
          })}
        </group>
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

function StaticCarouselFallback({ screenshots, transformPoster }: { screenshots: string[]; transformPoster?: string }) {
  const display = screenshots.slice(0, 3);
  return (
    <div className="w-full h-full flex items-center justify-center gap-4" aria-hidden="true">
      {display.map((src, i) => (
        <div
          key={i}
          className="relative rounded-[24px] glass overflow-hidden"
          style={{
            width: i === 1 ? 160 : 120,
            height: i === 1 ? 320 : 260,
            transform: `perspective(800px) rotateY(${i === 0 ? 15 : i === 2 ? -15 : 0}deg)`,
            opacity: i === 1 ? 1 : 0.6,
            zIndex: i === 1 ? 2 : 1,
          }}
        >
          <img
            src={src}
            alt=""
            className="absolute inset-[6px] rounded-[18px] object-cover"
            loading="lazy"
          />
        </div>
      ))}
      {transformPoster && (
        <img
          src={transformPoster}
          alt=""
          className="absolute"
          style={{
            width: 200,
            height: 'auto',
            zIndex: 3,
            filter: 'drop-shadow(0 0 20px rgba(201, 168, 124, 0.3))',
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}

export default function Hero3DPhone({ screenshots, transformFrames, transformPoster }: Props) {
  const { mounted, reducedMotion } = useReducedMotion();

  if (!mounted) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[650px]">
        <PhonePlaceholder />
      </div>
    );
  }

  if (reducedMotion) {
    return (
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[650px]">
        <StaticCarouselFallback screenshots={screenshots} transformPoster={transformPoster} />
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<div className="w-full h-[400px] sm:h-[500px] lg:h-[650px]"><PhonePlaceholder /></div>}>
      <div className="w-full h-[400px] sm:h-[500px] lg:h-[650px]" style={{ cursor: 'grab' }}>
        <Suspense fallback={<PhonePlaceholder />}>
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0.8, 10.5], fov: 42 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} />
            <PhoneCarousel screenshots={screenshots} transformFrames={transformFrames} />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
