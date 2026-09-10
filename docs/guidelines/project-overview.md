# Project Overview: git-commit-to-you-s2

## Missão
Construir um santuário digital privativo e imortal para o casal, concebido como um **Grimório Vivo** protegido pela inteligência artificial **"A Guardiã do Nosso Amor"**. O aplicativo eterniza a história do casal por meio da ingestão contínua de backups do WhatsApp e diários em Markdown (`.md`), oferecendo uma experiência imersiva inspirada na elegância sombria de *The Vampire Diaries* e no romantismo gótico de *Edgar Allan Poe*.

O clímax inaugural do produto é o **Ritual do Pedido de Namoro no Primeiro Acesso**, onde a namorada vivencia uma experiência cinematográfica que culmina no selamento do pacto eterno via selo de cera carmesim interativo.

## Critérios de Sucesso
- **Atmosfera & UX Imersiva:** 100% em Português do Brasil (PT-BR), alta costura gótica vitoriana, sem clichês de RPG ou estética infantil.
- **RAG Semântico & Intimidade:** A Guardiã recupera memórias exatas e responde com tom poético, reverente e profundamente fiel à história do casal.
- **Ritual Inesquecível:** Onboarding de primeiro login com a declaração do namorado e mecanismo de aceite com selo de cera háptico 3D.
- **Suporte Multi-dispositivo:** Mobile-first PWA fluido (iOS/Android) com expansão para tela de mesa vitoriana em desktop.
- **Segurança Militar & Privacidade:** Criptografia ponta a ponta dos dados íntimos, biometria (FaceID/TouchID) e zero-data retention de IA.

## Tech Stack
- **Frontend:** Next.js 15 (App Router) + React 19 + TypeScript
- **Estilização & Motion:** Tailwind CSS v4 + Framer Motion (iluminação por velas, transições de pergaminho, selo de cera 3D)
- **PWA & Haptics:** `@serwist/next` (offline-first, installable, push notifications, Navigator.vibrate)
- **Backend & API:** Next.js Server Actions + Route Handlers
- **Banco de Dados & Vector Store:** Supabase (PostgreSQL + `pgvector` + Auth por Magic Link / Passkeys + Storage Criptografado)
- **Engine de IA (A Guardiã):** Claude 3.5 Sonnet / Gemini 1.5 Pro via Vercel AI SDK com embeddings OpenAI / Gemini
