import {
  useMotionValue,
  useSpring,
  useInView,
  useTransform,
  motion,
} from 'motion/react';
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

interface Props {
  end: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  className = '',
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { reducedMotion } = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.5,
  });
  const display = useTransform(springValue, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      if (reducedMotion) {
        motionValue.set(end);
      } else {
        motionValue.set(end);
      }
    }
  }, [isInView, end, motionValue, reducedMotion]);

  if (reducedMotion) {
    return (
      <span ref={ref} className={className}>
        {prefix}{end.toLocaleString()}{suffix}
      </span>
    );
  }

  return (
    <ErrorBoundary fallback={<span className={className}>{prefix}{end.toLocaleString()}{suffix}</span>}>
      <motion.span ref={ref} className={className}>{display}</motion.span>
    </ErrorBoundary>
  );
}
