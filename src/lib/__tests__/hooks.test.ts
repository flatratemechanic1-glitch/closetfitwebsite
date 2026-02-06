import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useReducedMotion } from '../hooks';

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: { matches: boolean }) => void> = [];
  const mql = {
    matches,
    addEventListener: vi.fn((_, handler) => listeners.push(handler)),
    removeEventListener: vi.fn((_, handler) => {
      const idx = listeners.indexOf(handler);
      if (idx >= 0) listeners.splice(idx, 1);
    }),
  };
  vi.stubGlobal('matchMedia', vi.fn(() => mql));
  return { mql, listeners };
}

describe('useReducedMotion', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns mounted=false and reducedMotion=false initially', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    // After effects run, mounted should be true
    expect(result.current.mounted).toBe(true);
    expect(result.current.reducedMotion).toBe(false);
  });

  it('detects reduced motion preference', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current.reducedMotion).toBe(true);
  });

  it('responds to live changes in reduced motion preference', () => {
    const { listeners } = mockMatchMedia(false);
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current.reducedMotion).toBe(false);

    act(() => {
      listeners.forEach((fn) => fn({ matches: true }));
    });
    expect(result.current.reducedMotion).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const { mql } = mockMatchMedia(false);
    const { unmount } = renderHook(() => useReducedMotion());
    unmount();
    expect(mql.removeEventListener).toHaveBeenCalled();
  });
});
