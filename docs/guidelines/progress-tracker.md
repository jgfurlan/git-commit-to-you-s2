# Progress Tracker: Dynamic State Anchor

## Fase Atual do Projeto
**Fase 1: Fundação, Design System & Ritual do Pedido de Namoro**

## Status Ativo
- **Tarefa Atual:** Scaffolding concluído e componentes essenciais do Ritual de Pedido de Namoro implementados.
- **Status:** Build 100% verde no Next.js 15, suíte de testes Vitest passando (5/5), tokens de Dark Romanticism e componentes interativos criados.

## Marcos Concluídos
- ✅ Scaffolding completo do projeto Next.js 15 + React 19 + TypeScript + Tailwind CSS v4.
- ✅ Configuração do Vitest e suíte inicial de testes invariantes (TDD).
- ✅ Design System Gótico configurado no `globals.css` com fontes Google Fonts (`Cinzel`, `EB Garamond`, `Pinyon Script`) e tokens de cores (*Abyssal Obsidian*, *Crypt Velvet*, *Vampiric Crimson*, *Antique Gold*).
- ✅ Hook tátil `useHoldToSeal` com cálculo normalizado de tempo e disparo háptico `navigator.vibrate`.
- ✅ Criação dos componentes interativos de TVD:
  - `CandleFlame.tsx`: Chama bruxuleante com halo âmbar.
  - `VervainLocket.tsx`: Medalhão de verbena com dobradiça 3D e voto secreto.
  - `GeminiAscendant.tsx`: Anéis astrológicos concêntricos de alinhamento de datas.
  - `SalvatoreParchment.tsx`: Carta do namorado com pergaminho antigo e caligrafia.
  - `DaylightWaxSeal.tsx`: Selo de cera carmesim 3D com Lápis-Lazúli e preenchimento radial.
  - `RitualOrchestrator.tsx`: Orquestração dos 5 atos cinematográficos do pedido.
  - `SanctuaryHome.tsx`: Santuário Principal do Grimório em PT-BR pós-selamento.
- ✅ Rota principal (`src/app/page.tsx`) com persistência de estado do pacto no `localStorage`.

## Fila de Implementação Imediata (Próximos Passos)
1. Iniciar servidor de desenvolvimento local (`npm run dev`) para validação no navegador/mobile.
2. Ingestão e Parser de WhatsApp (`.txt` com agrupamento em sessões conversacionais).
3. Ingestão de Dias de Qualidade em Markdown (`.md` com frontmatter estruturado).
4. Configuração do Vector Store RAG (Supabase / pgvector / SQLite-vec) e System Prompt da Guardiã.
