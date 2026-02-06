# Web Animation Patterns — ClosetFitApp.com

## Purpose
Animation standards for the ClosetFitApp marketing site. Every animation must be purposeful, performant (60fps), and accessible. This skill defines the 4-layer animation system and implementation patterns for each technology.

---

## Animation Tech Layering

**Rule: Start at Layer 1. Only escalate when a lower layer can't achieve the desired effect.**

| Layer | Technology | Bundle Size | Use For |
|-------|-----------|-------------|---------|
| **Layer 1: Zero-JS** | CSS Scroll-Driven Animations + View Transitions | 0kb | Scroll reveals, parallax, progress bars, page transitions |
| **Layer 2: Lightweight** | Motion library | ~3.8kb | Hover effects, viewport triggers, staggered reveals |
| **Layer 3: Complex** | GSAP + ScrollTrigger | ~30kb (lazy) | Timeline sequences, scrub animations, pinning, morphing |
| **Layer 4: Premium** | React Three Fiber (Astro Island) | ~50kb (lazy) | 3D phone mockup in hero section |

---

## Layer 1: CSS Scroll-Driven Animations (Zero JS)

### Scroll Progress Bar

```css
/* Top-of-page reading progress indicator */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: #2962FF;
  transform-origin: left;
  animation: grow-progress linear;
  animation-timeline: scroll(root);
  z-index: 9999;
}

@keyframes grow-progress {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
```

### Scroll-Triggered Fade-In

```css
/* Elements fade in as they enter the viewport */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Parallax Scroll Effect

```css
.parallax-slow {
  animation: parallax-shift linear;
  animation-timeline: scroll();
}

@keyframes parallax-shift {
  from { transform: translateY(0); }
  to { transform: translateY(-50px); }
}
```

### CSS-Only Auto-Scrolling Screenshot Marquee

```css
.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

```astro
<!-- Duplicate the track for seamless infinite loop -->
<div class="overflow-hidden">
  <div class="marquee-track">
    {screenshots.map(s => <img src={s} alt="..." class="h-[500px] rounded-xl border border-[#2962FF]/30" />)}
    {screenshots.map(s => <img src={s} alt="..." class="h-[500px] rounded-xl border border-[#2962FF]/30" aria-hidden="true" />)}
  </div>
</div>
```

### CSS Crossfade Rotating Showcase

```css
.crossfade-showcase {
  position: relative;
}

.crossfade-showcase img {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: crossfade 40s infinite;
}

/* Stagger each image: total-duration / number-of-images */
.crossfade-showcase img:nth-child(1) { animation-delay: 0s; }
.crossfade-showcase img:nth-child(2) { animation-delay: 5s; }
.crossfade-showcase img:nth-child(3) { animation-delay: 10s; }
.crossfade-showcase img:nth-child(4) { animation-delay: 15s; }
.crossfade-showcase img:nth-child(5) { animation-delay: 20s; }
.crossfade-showcase img:nth-child(6) { animation-delay: 25s; }
.crossfade-showcase img:nth-child(7) { animation-delay: 30s; }
.crossfade-showcase img:nth-child(8) { animation-delay: 35s; }

@keyframes crossfade {
  0%, 10% { opacity: 1; }
  12.5%, 100% { opacity: 0; }
}
```

---

## Layer 2: Motion Library (~3.8kb)

Import only what you need. Motion is tree-shakeable.

### Viewport-Triggered Reveal (Staggered)

```tsx
// FeatureCards.tsx — React Island
import { motion } from 'motion/react';

interface Props {
  features: { title: string; description: string; icon: string }[];
}

export default function FeatureCards({ features }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
          className="bg-[#1E1E1E] rounded-2xl p-6 border border-white/10 hover:border-[#2962FF]/50 transition-colors"
        >
          <span className="text-3xl">{feature.icon}</span>
          <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
          <p className="text-gray-400 mt-2">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
```

### Magnetic Button Effect

```tsx
// MagneticButton.tsx — React Island
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function MagneticButton({ children, className, href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? 'a' : 'button';

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      <Tag href={href} className={className}>
        {children}
      </Tag>
    </motion.div>
  );
}
```

### Animated Counter

```tsx
// AnimatedCounter.tsx — React Island
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef } from 'react';

interface Props {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration * 1000 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) motionValue.set(target);
  }, [isInView, target, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return unsubscribe;
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
```

---

## Layer 3: GSAP + ScrollTrigger (~30kb lazy)

**Always lazy-load GSAP via `client:visible` Astro Island.**

### How It Works — Scroll-Pinned Timeline

```tsx
// HowItWorks.tsx — React Island (client:visible)
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  image: string;
  title: string;
  description: string;
}

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${steps.length * 100}%`,
          pin: true,
          scrub: 1,
          snap: 1 / (steps.length - 1),
        },
      });

      steps.forEach((_, i) => {
        if (i === 0) return;
        timeline
          .to(`.step-${i - 1}`, { opacity: 0, x: -100, duration: 0.5 })
          .fromTo(
            `.step-${i}`,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.5 },
            '<0.2'
          );
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, [steps]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {steps.map((step, i) => (
        <div
          key={i}
          className={`step-${i} absolute inset-0 flex items-center justify-center gap-12 px-8 ${i > 0 ? 'opacity-0' : ''}`}
        >
          <img src={step.image} alt={step.title} className="h-[600px] rounded-2xl" />
          <div className="max-w-md">
            <div className="text-sm font-mono text-[#2962FF] mb-2">Step {i + 1}</div>
            <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
            <p className="text-gray-400 text-lg">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### GSAP Hero Headline — Staggered Letter Reveal

```tsx
// HeroHeadline.tsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroHeadline({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const chars = containerRef.current?.querySelectorAll('.char');
    if (!chars) return;

    gsap.fromTo(
      chars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, []);

  return (
    <h1 ref={containerRef} className="text-5xl sm:text-7xl font-bold tracking-tight">
      {text.split('').map((char, i) => (
        <span key={i} className="char inline-block" style={{ opacity: 0 }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </h1>
  );
}
```

### GSAP Cleanup on View Transitions

**Critical**: Kill all ScrollTrigger instances before Astro page swaps to prevent memory leaks.

```astro
<!-- Include in BaseLayout.astro -->
<script>
  document.addEventListener('astro:before-swap', () => {
    // @ts-ignore — GSAP may not be loaded on every page
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  });
</script>
```

---

## Layer 4: React Three Fiber (~50kb lazy)

### 3D Floating Phone Mockup

```tsx
// Hero3DPhone.tsx — React Island (client:visible)
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function PhoneMockup({ screenshotUrl }: { screenshotUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(screenshotUrl);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      mouse.x * 0.3,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -mouse.y * 0.15,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        {/* Phone body */}
        <roundedBoxGeometry args={[2.2, 4.5, 0.15, 4, 0.15]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Screen with screenshot texture */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2, 4.2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </Float>
  );
}

export default function Hero3DPhone({ screenshotUrl }: { screenshotUrl: string }) {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <PhoneMockup screenshotUrl={screenshotUrl} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
```

**Note**: Evaluate during Phase 2 whether a CSS 3D transform on a flat phone frame achieves acceptable results. If so, drop this dependency to save ~50kb.

---

## Performance Guardrails

### Only Animate GPU-Accelerated Properties
```css
/* GOOD — GPU-accelerated */
.animate-me {
  transform: translateY(0);
  opacity: 1;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* BAD — triggers layout recalculation */
.dont-animate {
  width: 100%;      /* NO */
  height: auto;     /* NO */
  margin-top: 0;    /* NO */
  padding: 20px;    /* NO */
}
```

### will-change Usage
```css
/* Add before animation starts, remove after */
.about-to-animate {
  will-change: transform, opacity;
}

.animation-done {
  will-change: auto; /* Release GPU memory */
}
```

### Lazy Loading Heavy Components
```astro
<!-- Three.js: only loads when hero section is visible -->
<Hero3DPhone client:visible screenshotUrl="/screenshots/01.png" />

<!-- GSAP timeline: only loads when section scrolls into view -->
<HowItWorks client:visible steps={steps} />
```

---

## Accessibility: prefers-reduced-motion

**Every animation MUST respect this preference.**

### CSS
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .marquee-track {
    animation: none;
  }

  .scroll-reveal {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
```

### JavaScript (GSAP / Motion)
```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip all GSAP animations, show final state immediately
  gsap.set('.animated-element', { opacity: 1, y: 0, x: 0 });
} else {
  // Run normal animation timeline
  gsap.fromTo('.animated-element', { opacity: 0, y: 30 }, { opacity: 1, y: 0 });
}
```

---

## Micro-Interactions (CSS Only)

### Button Hover Lift
```css
.btn-primary {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(41, 98, 255, 0.3);
}
```

### Card Hover Glow
```css
.card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover {
  border-color: rgba(41, 98, 255, 0.5);
  box-shadow: 0 0 20px rgba(41, 98, 255, 0.15);
  transform: translateY(-4px);
}
```

### Link Underline Slide-In
```css
.link {
  position: relative;
}
.link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #2962FF;
  transition: width 0.3s ease;
}
.link:hover::after {
  width: 100%;
}
```

### Neon Lime CTA Glow Pulse
```css
.btn-ai-cta {
  background: #CCFF00;
  color: #121212;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(204, 255, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(204, 255, 0, 0.5); }
}
```

---

## Quick Check

- [ ] Layer 1 (CSS) used before escalating to JS solutions
- [ ] All animations only use `transform` and `opacity`
- [ ] `will-change` applied before animation, removed after
- [ ] `prefers-reduced-motion` respected for ALL animations
- [ ] GSAP loaded lazily via `client:visible` only
- [ ] React Three Fiber loaded lazily via `client:visible` only
- [ ] GSAP ScrollTrigger cleaned up on `astro:before-swap`
- [ ] 60fps verified on mobile (4x CPU throttle in DevTools)
- [ ] Marquee has duplicated track for seamless loop
- [ ] No animation delays LCP — hero text renders immediately
- [ ] All animated elements have `aria-hidden` if decorative
