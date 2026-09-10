# Code Standards: Agent-Legibility & Quality

## Legibilidade para IA (Mandatório)
O agente de IA é o leitor e mantenedor deste código. Priorize determinismo e rastreabilidade:
1. **TypeScript Estrito:** Uso de `any` é terminantemente proibido. Sempre declare interfaces e types explícitos com Zod para validação em runtime.
2. **Nomenclatura Unívoca:** Prefixar funções e hooks com o domínio correspondente (ex: `memory_ingest_whatsapp_session`, `grimoire_get_sealed_letters`).
3. **Erros Explícitos:** Proibido uso de `catch` genérico vazio. Trate erros e retorne mensagens tipadas.
4. **Localização PT-BR:** Todo texto voltado ao usuário deve estar centralizado em constantes/dicionário ou diretamente em português formal poético, sem strings soltas em inglês na UI.

## Padrões de Componentes (React 19 / Next.js 15)
- Server Components por padrão para fetching de dados e renderização inicial rápida.
- Client Components (`'use client'`) apenas para interatividade (Framer Motion, Canvas de vela, interações de toque do selo de cera, áudio).
- Atomicidade de Estilização: Utilizar classes utilitárias do Tailwind CSS v4 combinadas com variáveis CSS de tokens góticos.
