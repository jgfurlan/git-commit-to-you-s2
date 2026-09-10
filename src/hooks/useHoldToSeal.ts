import { useState, useRef, useCallback, useEffect } from 'react';

export function calculateProgress(elapsedMs: number, totalMs: number): number {
  if (elapsedMs <= 0) return 0;
  if (elapsedMs >= totalMs) return 1;
  return Number((elapsedMs / totalMs).toFixed(4));
}

interface UseHoldToSealOptions {
  holdDurationMs?: number;
  onComplete?: () => void;
  hapticsEnabled?: boolean;
}

export function useHoldToSeal({
  holdDurationMs = 3000,
  onComplete,
  hapticsEnabled = true,
}: UseHoldToSealOptions = {}) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isSealed, setIsSealed] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hapticIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerHaptic = useCallback((pattern: number | number[]) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate && hapticsEnabled) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignora navegadores sem permissão de vibração
      }
    }
  }, [hapticsEnabled]);

  const cancelHolding = useCallback(() => {
    if (isSealed) return;

    setIsHolding(false);
    startTimeRef.current = null;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (hapticIntervalRef.current) {
      clearInterval(hapticIntervalRef.current);
      hapticIntervalRef.current = null;
    }

    // Retorno suave a zero
    setProgress(0);
  }, [isSealed]);

  const updateProgress = useCallback(() => {
    if (!startTimeRef.current || isSealed) return;

    const elapsed = Date.now() - startTimeRef.current;
    const currentProgress = calculateProgress(elapsed, holdDurationMs);
    setProgress(currentProgress);

    if (currentProgress >= 1) {
      setIsHolding(false);
      setIsSealed(true);
      startTimeRef.current = null;
      
      if (hapticIntervalRef.current) {
        clearInterval(hapticIntervalRef.current);
        hapticIntervalRef.current = null;
      }

      // Vibração final de consagração
      triggerHaptic([100, 50, 200]);
      onComplete?.();
    } else {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [holdDurationMs, isSealed, onComplete, triggerHaptic]);

  const startHolding = useCallback(() => {
    if (isSealed) return;

    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    // Primeiro toque suave
    triggerHaptic(40);

    // Pulsações de batimento cardíaco enquanto segura
    if (hapticsEnabled) {
      hapticIntervalRef.current = setInterval(() => {
        triggerHaptic(50);
      }, 400);
    }

    animationFrameRef.current = requestAnimationFrame(updateProgress);
  }, [isSealed, triggerHaptic, hapticsEnabled, updateProgress]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (hapticIntervalRef.current) clearInterval(hapticIntervalRef.current);
    };
  }, []);

  return {
    progress,
    isHolding,
    isSealed,
    startHolding,
    cancelHolding,
    reset: () => {
      cancelHolding();
      setIsSealed(false);
      setProgress(0);
    },
  };
}
