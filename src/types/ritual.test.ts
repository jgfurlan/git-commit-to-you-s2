import { describe, it, expect } from 'vitest';
import { CovenantPactSchema } from './ritual';

describe('CovenantPactSchema (Invariantes do Pacto)', () => {
  it('valida com sucesso um pacto recém-criado em estado inicial', () => {
    const initialPact = {
      isSealed: false,
      sealedAt: null,
      partnerName: 'Minha Amada',
      creatorName: 'jgfurlan',
      firstMetDate: '2024-05-18',
      proposalDate: '2026-09-10',
      vowText: 'Eu soube no instante em que te vi que a eternidade só faria sentido com você.',
      relicsUnlocked: [],
    };

    const parsed = CovenantPactSchema.safeParse(initialPact);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.isSealed).toBe(false);
      expect(parsed.data.relicsUnlocked).toHaveLength(0);
    }
  });

  it('rejeita formato de data inválido para firstMetDate', () => {
    const invalidPact = {
      isSealed: false,
      sealedAt: null,
      partnerName: 'Minha Amada',
      creatorName: 'jgfurlan',
      firstMetDate: '18/05/2024', // Formato não AAAA-MM-DD
      proposalDate: '2026-09-10',
      vowText: 'Declaração válida com mais de dez caracteres.',
    };

    const parsed = CovenantPactSchema.safeParse(invalidPact);
    expect(parsed.success).toBe(false);
  });

  it('valida um pacto consagrado com data ISO e relíquias desbloqueadas', () => {
    const consecratedPact = {
      isSealed: true,
      sealedAt: '2026-09-10T15:00:00.000Z',
      partnerName: 'Minha Amada',
      creatorName: 'jgfurlan',
      firstMetDate: '2024-05-18',
      proposalDate: '2026-09-10',
      vowText: 'Eu escolho você em cada vida, em cada segundo, por toda a eternidade.',
      relicsUnlocked: ['VERVAIN_LOCKET', 'GEMINI_ASCENDANT', 'SALVATORE_DIARY', 'DAYLIGHT_SEAL'],
    };

    const parsed = CovenantPactSchema.safeParse(consecratedPact);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.isSealed).toBe(true);
      expect(parsed.data.relicsUnlocked).toContain('DAYLIGHT_SEAL');
    }
  });
});
