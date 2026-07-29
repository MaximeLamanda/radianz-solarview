# Homepage Process Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Afficher une section process 3 étapes (Décider / Construire / Industrialiser) avant les exemples sur la homepage.

**Architecture:** Enrichir `ProcessSection` avec preuves (`Badge`) et tags d’intégration. Copy via `next-intl` (FR+EN). Brancher dans `page.tsx` entre hero et `UseCasesCarousel`.

**Tech Stack:** Next.js App Router, next-intl, shadcn Badge/Separator, Tailwind.

---

### Task 1: Copy FR + EN (`agency.process`)

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

Mettre à jour les clés process (heading, steps, proof, integrations). Pas de FDE / Kayro.

### Task 2: Enrichir `ProcessSection`

**Files:**
- Modify: `solarview-site/components/process-section.tsx`

Props: steps avec `title`, `description`, `proof?`, `tags?`. Rendu Badge shadcn. Optionnel Separator.

### Task 3: Brancher sur la homepage

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`

Insérer `ProcessSection` avant `UseCasesCarousel`. Vérifier `npx tsc --noEmit`.
