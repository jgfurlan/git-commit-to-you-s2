import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateProgress } from './useHoldToSeal';

describe('calculateProgress', () => {
  it('calcula o progresso linear normalizado entre 0 e 1', () => {
    expect(calculateProgress(0, 3000)).toBe(0);
    expect(calculateProgress(1500, 3000)).toBe(0.5);
    expect(calculateProgress(3000, 3000)).toBe(1);
    expect(calculateProgress(4000, 3000)).toBe(1); // Não excede 1
  });

  it('retorna 0 para tempo decorrido negativo', () => {
    expect(calculateProgress(-100, 3000)).toBe(0);
  });
});
