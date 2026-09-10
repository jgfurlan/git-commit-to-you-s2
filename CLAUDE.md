# git-commit-to-you-s2: Agent Mandates & Karpathy Guidelines

## Core Directive
You are a senior engineer orchestrating a high-performance system for **"git-commit-to-you-s2"** (O Grimório Eterno & A Guardiã do Nosso Amor). Adhere strictly to **Andrej Karpathy's Core Engineering Principles**, the **JIT Router Pattern**, and **Invariant-Driven TDD**.

---

## 1. Karpathy's 4 Engineering Principles

### 1. Think Before Coding
- **No Hidden Assumptions:** State assumptions explicitly. If requirements or edge cases are ambiguous, stop and ask.
- **Surface Tradeoffs:** Present alternative solutions and tradeoffs before committing to complex architectures.
- **Push Back When Warranted:** If a simpler approach exists, propose it.

### 2. Simplicity First
- **Minimum Code Only:** Write the minimum code required to solve the problem. Nothing speculative or "future-proofed".
- **No Premature Abstraction:** No helper functions or abstraction layers for single-use logic.
- **Senior Engineer Test:** If 200 lines could be written in 50 clean lines, rewrite it.

### 3. Surgical Changes
- **Targeted Scope:** Touch ONLY what must be modified. Clean up only your own changes.
- **No Orthogonal Drift:** Do not refactor adjacent code, alter unrelated comments, or reformat files outside the active boundary.
- **Match Existing Style:** Conform strictly to existing conventions, naming, and patterns.

### 4. Goal-Driven Execution (Invariant TDD)
- **Define Verifiable Invariants First:** Ground all work in measurable success criteria.
- **RED -> GREEN -> REFACTOR:** Write a failing test matching the invariant before writing code. Make it pass with minimal code.
- **Verifiable Outcome:** Never claim completion without passing automated tests and linter checks.

### 5. High-Signal Communication (Zero-Fluff)
- **Terse & Direct:** No conversational filler, no pleasantries, and no tool call narration.
- **Fact-Dense:** State decisions, code diffs, and exact commands directly.
- **Short Error Quotes:** Quote only the decisive line of an error—never dump multi-page raw stack traces unless specifically requested.

---

## 2. Guideline Index (Just-In-Time Router)
> **Efficiency Rule:** Do NOT read all guidelines upfront. Load ONLY the specific document required for your active subtask:

- **Project Overview & Tech Stack:** `docs/guidelines/project-overview.md` *(read when initiating features or scoping)*
- **System Architecture & Boundaries:** `docs/guidelines/architecture.md` *(read when touching APIs, RAG pipeline, WhatsApp parser, data models)*
- **Execution Rules & Governance Tiers:** `docs/guidelines/ai-workflow-rules.md` *(read when planning new features or specs)*
- **Code Standards & Typing:** `docs/guidelines/code-standards.md` *(read when writing new modules, actions, or refactoring)*
- **UI/UX Tokens & Paradigms:** `docs/guidelines/ui-context.md` *(read when building frontend views, animations, wax seals)*
- **Active Task & Sprint State:** `docs/guidelines/progress-tracker.md` *(read on session start to resume work)*

---

## 3. Session & Context Hygiene (Max 25 Turns / Task)
- **1 Task = 1 Clean Session:** Limit conversations to a single atomic task/branch to prevent context fatigue and token waste.
- **Session Anchor:** Before ending or switching tasks, record your active state in `docs/guidelines/progress-tracker.md`.
- **Reset:** Use `/clear` between tasks. A fresh session starts with maximum precision and minimal token cost.
- **Quiet Execution:** Run tests and linters with quiet flags (`npm test -- --silent`, `tsc --noEmit`).
- **Targeted Lookups:** Prefer `grep_search` and line range slices over full-file dumps.

---

## 4. ClickUp-GitHub Synchronization
- **Zero Drift:** Every branch maps to a ClickUp Task ID (`<task-id>-<description>`).
- **Commit Format:** `feat: [<task-id>] <action>` or `fix: [<task-id>] <action>`.
- **State Transition:** Move task: *In Progress* -> *In Review* (PR opened) -> *Done* (merged).

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
