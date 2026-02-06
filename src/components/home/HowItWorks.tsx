import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Step {
  title: string;
  description: string;
  image: string;
  label: string;
}

interface Props {
  steps: Step[];
}

function ReducedMotionFallback({ steps }: Props) {
  return (
    <section className="py-16 sm:py-24 px-4" aria-labelledby="how-heading-fallback">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.3em] mb-6"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#C9A87C',
            }}
          >
            How It Works
          </span>
          <h2
            id="how-heading-fallback"
            className="text-3xl sm:text-5xl font-bold"
            style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif", color: '#F5F0EB' }}
          >
            Three steps to your{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(to right, #C9A87C, #A78BFA)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              perfect outfit
            </span>
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 scroll-reveal"
            >
              <div className="w-full lg:w-1/2 flex justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-[300px] sm:h-[400px] rounded-2xl object-contain"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  loading="lazy"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div
                  className="text-sm uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#C9A87C' }}
                >
                  {step.label}
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-4"
                  style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif", color: '#F5F0EB' }}
                >
                  {step.title}
                </h3>
                <p className="text-lg" style={{ color: '#A09B93' }}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
  const { mounted, reducedMotion } = useReducedMotion();

  useEffect(() => {
    if (!mounted || reducedMotion || !containerRef.current) return;

    // Prevent double-initialization in StrictMode
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

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
          .to(`.how-step-${i - 1}`, { opacity: 0, x: -100, duration: 0.5 })
          .fromTo(
            `.how-step-${i}`,
            { opacity: 0, x: 100 },
            { opacity: 1, x: 0, duration: 0.5 },
            '<0.2'
          );
      });
    }, containerRef);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
  }, [mounted, reducedMotion, steps]);

  if (!mounted) return null;
  if (reducedMotion) return <ReducedMotionFallback steps={steps} />;

  return (
    <ErrorBoundary fallback={<ReducedMotionFallback steps={steps} />}>
    <section ref={sectionRef} className="relative" aria-labelledby="how-heading">
      {/* Section header — above pinned area */}
      <div className="text-center py-16 sm:py-24 px-4">
        <span
          className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.3em] mb-6"
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#C9A87C',
          }}
        >
          How It Works
        </span>
        <h2
          id="how-heading"
          className="text-3xl sm:text-5xl font-bold"
          style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif", color: '#F5F0EB' }}
        >
          Three steps to your{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(to right, #C9A87C, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            perfect outfit
          </span>
        </h2>
      </div>

      {/* Pinned scroll container */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`how-step-${i} absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 sm:px-8 ${
              i > 0 ? 'opacity-0' : ''
            }`}
          >
            {/* Screenshot */}
            <div className="flex-shrink-0 flex items-center justify-center">
              <img
                src={step.image}
                alt={step.title}
                className="h-[300px] sm:h-[450px] lg:h-[550px] rounded-2xl object-contain"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className="max-w-md text-center lg:text-left">
              <div
                className="text-sm uppercase tracking-wider mb-2"
                style={{ fontFamily: "'SF Mono', 'Fira Code', monospace", color: '#C9A87C' }}
              >
                {step.label}
              </div>
              <h3
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Clash Display', 'Inter', system-ui, sans-serif", color: '#F5F0EB' }}
              >
                {step.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#A09B93' }}>
                {step.description}
              </p>
            </div>
          </div>
        ))}

        {/* Progress dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === 0 ? 'bg-champagne' : 'bg-[rgba(255,255,255,0.2)]'
              }`}
              style={i === 0 ? { backgroundColor: '#C9A87C' } : { backgroundColor: 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </div>
      </div>
    </section>
    </ErrorBoundary>
  );
}
