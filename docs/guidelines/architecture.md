# Architecture: Systemic Boundaries & Invariants

## Tech Stack & Componentes
- **Frontend PWA:** Next.js 15 (App Router, Server Components + Client Components com Framer Motion)
- **Backend Runtime:** Next.js Server Actions & Edge API Routes (Node.js runtime)
- **Database & Storage:** Supabase (PostgreSQL relacional + extensão `pgvector` para busca vetorial semântica + Bucket criptografado para mídias/fotos)
- **AI / LLM Layer:** Vercel AI SDK integrado a Claude 3.5 Sonnet ou Gemini 1.5 Pro com embeddings `text-embedding-3-large`

## Arquitetura de Dados & RAG do Grimório

```
[Backups WhatsApp .txt]  ──┐
                           ├──> [Session Parser] ──> [Vector Embedding Engine] ──> [pgvector / Supabase]
[Diários .md com Front] ──┘                                                                │
                                                                                           ▼
[Usuário / Namorada] <──> [Next.js PWA] <──> [A Guardiã Engine (System Prompt + RAG Context)]
```

### 1. Ingestion Pipeline
- **WhatsApp Parser:** Agrupamento de mensagens por *Sessões Conversacionais* (janela temporal de inatividade > 30 min) com extração de metadados: data, participantes, contagem de mensagens, sentimentos predominantes e mídias transcritas.
- **Markdown Diário Parser:** Ingestão de arquivos `.md` estruturados com frontmatter (`data`, `titulo`, `local`, `tags`, `sentimento`). Ponderação semântica superior às mensagens de chat comuns.

### 2. A Guardiã (Cognitive Persona & Oráculo)
- **Memória de Longo Prazo:** Tabela de entidades do casal (`primeiro_beijo`, `lugares_marcantes`, `piadas_internas`, `datas_criticas`).
- **Inference Pipeline:** Streaming de respostas em pergaminhos com tom poético, devoto, protetor e respeitoso em PT-BR.

## Invariantes Sistêmicos (Do Not Break)
- **Privacidade Absoluta:** Nenhuma rota de memória ou chat exposta sem autenticação ativa de um dos dois parceiros.
- **PT-BR Estrito:** Todas as mensagens do sistema, oráculo, botões e respostas da Guardiã devem ser estritamente em Português do Brasil.
- **Stateful Onboarding Invariant:** O "Ritual do Pedido de Namoro" só pode ser exibido no primeiro acesso da namorada. Uma vez aceito e gravado no banco com timestamp do pacto, o app desbloqueia o modo casal e nunca mais regride para a tela de pedido.
