import { useEffect, useState } from 'react';

/**
 * Shared hook for detecting prefers-reduced-motion and tracking client hydration.
 * Responds to live changes if the user toggles reduced motion in OS settings.
 */
export function useReducedMotion() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return { mounted, reducedMotion };
}
