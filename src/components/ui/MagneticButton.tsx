import { motion, useMotionValue, useSpring } from 'motion/react';
import { useRef, type ReactNode } from 'react';
import { useReducedMotion } from '@/lib/hooks';
import ErrorBoundary from '@/components/ui/ErrorBoundary';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
}

export default function MagneticButton({ children, className = '', href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.3);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Reduced motion: render static element
  if (reducedMotion) {
    return href ? (
      <a href={href} className={className}>{children}</a>
    ) : (
      <button className={className}>{children}</button>
    );
  }

  return (
    <ErrorBoundary fallback={href ? <a href={href} className={className}>{children}</a> : <button className={className}>{children}</button>}>
      <motion.div
        ref={ref}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {href ? (
          <a href={href} className={className}>{children}</a>
        ) : (
          <button className={className}>{children}</button>
        )}
      </motion.div>
    </ErrorBoundary>
  );
}
