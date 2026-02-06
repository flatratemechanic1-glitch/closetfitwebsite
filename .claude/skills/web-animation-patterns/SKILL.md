# Web Animation Patterns — ClosetFitApp.com

## Purpose
Animation standards for the ClosetFitApp "Noir Luxe" marketing site. Every animation must be purposeful, performant (60fps), and accessible. This skill defines the 4-layer animation system and implementation patterns for each technology.

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
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #C9A87C, #A78BFA);
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

### CSS-Only Auto-Scrolling Screenshot Marquee

```css
.marquee-track {
  display: flex;
  gap: 1.5rem;
  width: max-content;
  animation: marquee-scroll 40s linear infinite;
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
    {screenshots.map(s => <img src={s} alt="..." class="h-[500px] rounded-[32px] glass" />)}
    {screenshots.map(s => <img src={s} alt="..." class="h-[500px] rounded-[32px] glass" aria-hidden="true" />)}
  </div>
</div>
```

### Aurora Gradient Mesh Background

```css
.aurora-mesh {
  background:
    radial-gradient(ellipse 800px 800px at 20% 30%, #4E2A6B 0%, transparent 70%),
    radial-gradient(ellipse 700px 700px at 75% 60%, #2E2E78 0%, transparent 70%),
    radial-gradient(ellipse 600px 600px at 50% 80%, rgba(201, 168, 124, 0.30) 0%, transparent 70%),
    #09090B;
  background-size: 200% 200%;
  animation: aurora-drift 20s ease-in-out infinite;
}

@keyframes aurora-drift {
  0%, 100% { background-position: 0% 50%, 100% 50%, 50% 100%; }
  50% { background-position: 60% 60%, 40% 30%, 70% 40%; }
}
```

---

## Layer 2: Motion Library (~3.8kb)

### Viewport-Triggered Reveal (Staggered)

```tsx
// FeatureCards.tsx — React Island
import { motion } from 'motion/react';

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
          className="glass rounded-2xl p-6 hover:border-[rgba(201,168,124,0.3)] transition-colors"
        >
          <span className="text-3xl">{feature.icon}</span>
          <h3 className="text-xl font-semibold mt-4 font-['Clash_Display']">{feature.title}</h3>
          <p className="text-[#A09B93] mt-2">{feature.description}</p>
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

export default function MagneticButton({ children, className, href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  return (
    <motion.div ref={ref} style={{ x: springX, y: springY }} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}>
      {href ? <a href={href} className={className}>{children}</a> : <button className={className}>{children}</button>}
    </motion.div>
  );
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

export default function HowItWorks({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${steps.length * 100}%`,
          pin: true, scrub: 1,
          snap: 1 / (steps.length - 1),
        },
      });

      steps.forEach((_, i) => {
        if (i === 0) return;
        timeline
          .to(`.step-${i - 1}`, { opacity: 0, x: -100, duration: 0.5 })
          .fromTo(`.step-${i}`, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 0.5 }, '<0.2');
      });
    }, containerRef);

    return () => ctx.revert();
  }, [steps]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {steps.map((step, i) => (
        <div key={i} className={`step-${i} absolute inset-0 flex items-center justify-center gap-12 px-8 ${i > 0 ? 'opacity-0' : ''}`}>
          <img src={step.image} alt={step.title} className="h-[600px] rounded-2xl" />
          <div className="max-w-md">
            <div className="text-sm font-mono text-[#C9A87C] mb-2">Step {i + 1}</div>
            <h3 className="text-3xl font-bold mb-4 font-['Clash_Display']">{step.title}</h3>
            <p className="text-[#A09B93] text-lg">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### GSAP Cleanup on View Transitions

**Critical**: Kill all ScrollTrigger instances before Astro page swaps.

```astro
<script>
  document.addEventListener('astro:before-swap', () => {
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
import { Float, Environment } from '@react-three/drei';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';

function PhoneMockup({ screenshotUrl }: { screenshotUrl: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = new THREE.TextureLoader().load(screenshotUrl);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.3, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -mouse.y * 0.15, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <roundedBoxGeometry args={[2.2, 4.5, 0.15, 4, 0.15]} />
        <meshStandardMaterial color="#131316" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[2, 4.2]} />
        <meshBasicMaterial map={texture} />
      </mesh>
    </Float>
  );
}
```

**Note**: Evaluate whether CSS 3D transforms achieve acceptable results before adding this ~50kb dependency.

---

## Performance Guardrails

### Only Animate GPU-Accelerated Properties
```css
/* GOOD */ transform: translateY(0); opacity: 1;
/* BAD */ width: 100%; height: auto; margin-top: 0;
```

### Lazy Loading Heavy Components
```astro
<Hero3DPhone client:visible screenshotUrl="/screenshots/01.png" />
<HowItWorks client:visible steps={steps} />
```

---

## Accessibility: prefers-reduced-motion

**Every animation MUST respect this preference.**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// In JS
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.set('.animated-element', { opacity: 1, y: 0, x: 0 });
}
```

---

## Micro-Interactions (CSS Only)

### Button Hover Lift
```css
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(201, 168, 124, 0.3);
}
```

### Card Hover Glow
```css
.card:hover {
  border-color: rgba(201, 168, 124, 0.3);
  box-shadow: 0 0 20px rgba(201, 168, 124, 0.15);
  transform: translateY(-4px);
}
```

### Link Underline Slide-In
```css
.link::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: #C9A87C;
  transition: width 0.3s ease;
}
.link:hover::after { width: 100%; }
```

### Coral CTA Glow Pulse
```css
.btn-cta {
  background: #FF6B8A;
  color: #09090B;
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 107, 138, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 107, 138, 0.5); }
}
```

---

## Quick Check

- [ ] Layer 1 (CSS) used before escalating to JS solutions
- [ ] All animations only use `transform` and `opacity`
- [ ] `prefers-reduced-motion` respected for ALL animations
- [ ] GSAP loaded lazily via `client:visible` only
- [ ] GSAP ScrollTrigger cleaned up on `astro:before-swap`
- [ ] 60fps verified on mobile (4x CPU throttle in DevTools)
- [ ] Marquee has duplicated track for seamless loop
- [ ] No animation delays LCP
- [ ] All animated elements have `aria-hidden` if decorative
- [ ] Colors match Noir Luxe palette: champagne `#C9A87C`, lavender `#A78BFA`, coral `#FF6B8A`
