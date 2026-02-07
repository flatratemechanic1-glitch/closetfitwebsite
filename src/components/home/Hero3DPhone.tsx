import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, RoundedBox } from '@react-three/drei';
import { useRef, Suspense, useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import * as THREE from 'three';

interface Props {
  screenshots: string[];
  transformVideoSrc?: string;
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

function CenterShowcase({ videoSrc }: { videoSrc: string }) {
  const [canvasTexture, setCanvasTexture] = useState<THREE.CanvasTexture | null>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    // Create hidden video element — must be in DOM for reliable loading
    const video = document.createElement('video');
    video.src = videoSrc;
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.style.position = 'fixed';
    video.style.top = '-9999px';
    video.style.left = '-9999px';
    video.style.width = '1px';
    video.style.height = '1px';
    video.style.opacity = '0';
    video.style.pointerEvents = 'none';
    document.body.appendChild(video);
    videoRef.current = video;

    // Create canvas for alpha-preserving frame extraction.
    // drawImage(video) on a 2D canvas preserves VP9 alpha;
    // THREE.VideoTexture does NOT (WebGL texImage2D drops alpha from video elements).
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    ctxRef.current = ctx;

    const onLoaded = () => {
      // Draw first frame so texture isn't blank
      if (ctx) ctx.drawImage(video, 0, 0, 1280, 720);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.colorSpace = THREE.SRGBColorSpace;
      textureRef.current = tex;
      setCanvasTexture(tex);

      video.play().catch((err) => {
        console.warn('Video autoplay blocked:', err);
        const playOnClick = () => video.play().catch(() => {});
        document.addEventListener('click', playOnClick, { once: true });
      });
    };

    video.addEventListener('loadeddata', onLoaded, { once: true });
    video.addEventListener('error', () => {
      console.warn('Failed to load transform video:', videoSrc);
    }, { once: true });
    video.load();

    return () => {
      video.pause();
      video.src = '';
      if (video.parentNode) video.parentNode.removeChild(video);
      if (textureRef.current) textureRef.current.dispose();
      videoRef.current = null;
      canvasRef.current = null;
      ctxRef.current = null;
      textureRef.current = null;
    };
  }, [videoSrc]);

  // Each frame: draw video → canvas (preserves alpha), then flag texture for GPU upload
  useFrame(({ clock }) => {
    if (ctxRef.current && videoRef.current && textureRef.current) {
      if (!videoRef.current.paused && videoRef.current.readyState >= 2) {
        ctxRef.current.drawImage(videoRef.current, 0, 0, 1280, 720);
        textureRef.current.needsUpdate = true;
      }
    }
    if (glowRef.current) {
      const pulse = Math.sin(clock.elapsedTime * 2) * 0.03 + 0.07;
      glowRef.current.opacity = pulse;
    }
  });

  // 16:9 aspect ratio scaled for perspective (1.8x compensation)
  // Width: 5.0, Height: 2.8 (16:9 ratio at ~1.8x scale)
  return (
    <group position={[0, 0, 0]}>
      {/* Subtle glow behind the figure */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[5.5, 3.5]} />
        <meshBasicMaterial
          ref={glowRef}
          color="#C9A87C"
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Transparent video plane — canvas intermediary preserves VP9 alpha */}
      <mesh>
        <planeGeometry args={[5.0, 2.8]} />
        {canvasTexture ? (
          <meshBasicMaterial
            map={canvasTexture}
            transparent
            alphaTest={0.1}
            depthWrite={false}
          />
        ) : (
          <meshBasicMaterial transparent opacity={0} />
        )}
      </mesh>
    </group>
  );
}

function PhoneCarousel({ screenshots, transformVideoSrc }: { screenshots: string[]; transformVideoSrc?: string }) {
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
        {/* Center showcase — transparent video, fixed at origin, does not rotate */}
        {transformVideoSrc && (
          <CenterShowcase videoSrc={transformVideoSrc} />
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

export default function Hero3DPhone({ screenshots, transformVideoSrc, transformPoster }: Props) {
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
            <PhoneCarousel screenshots={screenshots} transformVideoSrc={transformVideoSrc} />
            <Environment preset="city" />
          </Canvas>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}
