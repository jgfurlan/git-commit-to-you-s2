import { z } from 'zod';

export const RelicEnum = z.enum([
  'VERVAIN_LOCKET',
  'GEMINI_ASCENDANT',
  'SALVATORE_DIARY',
  'DAYLIGHT_SEAL',
]);

export type RelicType = z.infer<typeof RelicEnum>;

export const CovenantPactSchema = z.object({
  isSealed: z.boolean().default(false),
  sealedAt: z.string().datetime().nullable(),
  partnerName: z.string().min(1, 'O nome da parceira é obrigatório'),
  creatorName: z.string().min(1, 'O nome do criador é obrigatório'),
  firstMetDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data deve ser AAAA-MM-DD'),
  proposalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de data deve ser AAAA-MM-DD'),
  vowText: z.string().min(10, 'A declaração deve ter ao menos 10 caracteres'),
  relicsUnlocked: z.array(RelicEnum).default([]),
});

export type CovenantPact = z.infer<typeof CovenantPactSchema>;

export type RitualAct = 
  | 'ACT_1_FOG_AND_RAVEN'
  | 'ACT_2_VERVAIN_LOCKET'
  | 'ACT_3_GEMINI_ASCENDANT'
  | 'ACT_4_SALVATORE_LETTER'
  | 'ACT_5_DAYLIGHT_SEAL'
  | 'RITUAL_CONSECRATED';
