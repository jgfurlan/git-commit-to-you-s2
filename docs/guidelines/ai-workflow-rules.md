# AI Workflow Rules: Execution Governance & Tiered Precision

## Core Mandates
Todos os agentes e colaboradores operam sob os **4 Princípios de Engenharia de Andrej Karpathy**:
1. **Pense antes de codar:** requisitos claros, sem suposições ocultas.
2. **Simplicidade primeiro:** mínimo código necessário, sem abstração prematura.
3. **Mudanças cirúrgicas:** toque apenas no que precisa ser alterado, sem desvios ortogonais.
4. **Execução orientada a metas (TDD Invariante):** RED -> GREEN -> REFACTOR.

---

## 1. Modelo de Governança em Três Tiers

| Tier | Escopo & Tipo de Tarefa | Planejamento & Spec Necessária | Cerimônia de Verificação |
| :--- | :--- | :--- | :--- |
| **Tier 1 (Trivial)** | Correções de texto em PT-BR, ajustes de tokens CSS/Tailwind, <20 LOC. | Sem spec formal. Definir objetivo diretamente no commit/prompt. | Verificação visual rápida + linter quiet (`tsc --noEmit`). |
| **Tier 2 (Standard)** | Componentes de UI (ex: Selo de Cera 3D, Card de Pergaminho), endpoints de diário. | Spec leve aprovada antes da implementação. | Testes unitários de componente/função + verificação determinística. |
| **Tier 3 (Arquitetural)** | Pipeline de ingestão WhatsApp, RAG/Vector Store, Auth/Passkeys, Ritual do Pedido de Namoro. | Two-File Spec formal em `docs/specs/<id>-<nome>/` (`product.md` + `tech.md`). | TDD completo + testes de integração + verificação de segurança/privacidade. |

---

## 2. TDD Invariante (Goal-Driven Execution)
1. **RED:** Escreva o teste que valida o invariante antes de criar ou modificar o código de produção.
2. **GREEN:** Escreva o código estritamente necessário para fazer o teste passar.
3. **REFACTOR:** Simplifique e remova duplicações mantendo o teste verde.

---

## 3. Protocolo de Sessão & Higiene de Contexto
- **1 Tarefa = 1 Sessão Limpa:** Mantenha conversas com menos de 25 turnos para evitar degradação de contexto.
- **State Anchor:** Sempre registre o progresso em `docs/guidelines/progress-tracker.md` antes de alternar de tarefa.
- **Quiet Execution:** Execute comandos com flags silenciosas (`npm test -- --silent`, `tsc --noEmit`).
