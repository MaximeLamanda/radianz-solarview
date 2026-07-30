# Industries Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Créer `/industries` avec tab bar secteurs et cards cas d’usage filtrées par tags multi-industries, deep-link `?secteur=`.

**Architecture:** Source de vérité `lib/industries.ts` + copy i18n. Composant client `IndustriesHub` synchronise l’onglet avec l’URL et filtre la grille. Page App Router locale avec Navbar/Footer existants. Nav Secteurs pointe vers les deep links.

**Tech Stack:** Next.js 15 App Router, next-intl, React 19, Tailwind, assets mesh existants `/use-cases/*`.

---

### Task 1: Data `lib/industries.ts`

**Files:**
- Create: `solarview-site/lib/industries.ts`

**Step 1:** Exporter `INDUSTRY_IDS`, type `IndustryId`, liste `INDUSTRY_USE_CASES` (id + industryIds + imageSrc + galleryShapeId), helpers `isIndustryId`, `getUseCasesForIndustry`, `parseIndustryParam`.

**Step 2:** Inclure les 6 cas homepage + ~4–6 cas additionnels avec tags multi.

---

### Task 2: Copy i18n FR + EN

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

**Step 1:** Ajouter namespace `industries` : metaTitle, metaDescription, heading, description, empty, cases.<id>.title/description.

---

### Task 3: `IndustriesHub` UI

**Files:**
- Create: `solarview-site/components/industries-hub.tsx`

**Step 1:** Client component — tabs industries, sync `useSearchParams` / `router.replace`, grille cards mesh + titre + description, Link `/contact`.

---

### Task 4: Page `/industries` + sitemap + nav

**Files:**
- Create: `solarview-site/app/[locale]/industries/page.tsx`
- Modify: `solarview-site/app/sitemap.ts`
- Modify: `solarview-site/components/navbar1.tsx`

**Step 1:** Page shell metadata + hub.
**Step 2:** Sitemap `/industries`.
**Step 3:** Sectors URLs → `/industries?secteur=…`.

---

### Task 5: Smoke

**Step 1:** `npx tsc --noEmit` dans `solarview-site`.
**Step 2:** Vérifier `/fr/industries?secteur=energie` filtre correctement.
