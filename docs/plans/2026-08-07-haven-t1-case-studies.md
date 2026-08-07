# Haven + T1 Case Studies Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add Haven Energy and T1 Energy as website case studies with homepage screenshots, keep Progenes screens unchanged, and fill a 2×3 case-studies grid (6 cards including a contact CTA).

**Architecture:** Extend `lib/case-studies.ts` like Progenes (FR/EN entries + slug registry). Capture real homepage screenshots into `public/case-studies/`. Wire homepage `CaseStudiesSection` to six items in a 3-column grid (already `md:grid-cols-3`). Update i18n keys.

**Tech Stack:** Next.js App Router, next-intl messages, Playwright/Chromium for screenshots, existing case-study page route.

**Global Constraints:**
- Do NOT add extra illustration screens to Progenes (keep single `progenes.png` cover/section image as today).
- Screenshots MUST be real captures of https://havenenergy.com/ and https://t1energy.com/ (desktop viewport ~1440×900 or similar), saved as PNG under `solarview-site/public/case-studies/`.
- Grid order exactly: Progenes, Haven, T1, Agent articles, Solar detection, CTA contact.
- Slugs: `haven-energy`, `t1-energy`.
- Category FR: `Site web` / EN: `Website`.
- Follow existing CaseStudy type and page patterns; YAGNI — light sections only (no multi-screen galleries).
- Commit after each task.
- Work on a feature branch (not bare main commits without branch).

---

### Task 1: Capture homepage screenshots

**Files:**
- Create: `solarview-site/public/case-studies/haven-energy.png`
- Create: `solarview-site/public/case-studies/t1-energy.png`

**Step 1:** Use Playwright (or Puppeteer) Chromium to open each URL at desktop width (≥1280px), wait for network idle / hero visible, screenshot full viewport (or above-the-fold hero) to the paths above.

**Step 2:** Verify files exist and are non-trivial size (>50KB). Open/read them if needed to confirm they look like the live sites.

**Step 3:** Commit: `Add Haven Energy and T1 Energy homepage screenshots.`

---

### Task 2: Add case study data FR/EN for Haven + T1

**Files:**
- Modify: `solarview-site/lib/case-studies.ts`
- Modify: `solarview-site/lib/case-studies.ts` `CASE_STUDY_SLUGS` array

**Step 1:** Add FR + EN `CaseStudy` objects for:
- slug `haven-energy`, client `Haven Energy`, externalUrl `https://havenenergy.com/`
- slug `t1-energy`, client `T1 Energy`, externalUrl `https://t1energy.com/`
- cover type image pointing to `/case-studies/haven-energy.png` and `/case-studies/t1-energy.png` (width/height matching screenshot or 1440×900)
- Light sections: context, approach, outcome (FR + EN). No extra gallery images.
- Reasonable metrics (3–4) grounded in public site messaging (battery backup / solar manufacturing) without inventing false client claims as “ROI numbers” — prefer qualitative labels if unsure (e.g. “Site vitrine”, “US”, “Energy”).

**Step 2:** Append `"haven-energy"` and `"t1-energy"` to `CASE_STUDY_SLUGS`.

**Step 3:** Do not modify Progenes illustration fields.

**Step 4:** Commit: `Add Haven Energy and T1 Energy case study content.`

---

### Task 3: i18n homepage case-study cards + description

**Files:**
- Modify: `solarview-site/messages/fr.json` (`agency.caseStudies`)
- Modify: `solarview-site/messages/en.json` (`agency.caseStudies`)

**Step 1:** Update `description` to reflect six projects / mix web + IA (not “Trois projets”).

**Step 2:** Add keys:
- `item4` Haven (client, category Site web / Website)
- `item5` T1 (client, category Site web / Website)
- `item6` CTA (client e.g. « Votre projet ? » / « Your project? », category e.g. « Nous contacter » / « Contact us »)

Keep item1–item3 keys used by Agent/Solar illustrations.

**Step 3:** Commit: `Add i18n for Haven, T1, and case-studies CTA card.`

---

### Task 4: Wire homepage 2×3 grid (6 items)

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx` (CaseStudiesSection items)
- Optionally tweak: `solarview-site/components/case-studies-section.tsx` only if needed to ensure stable 3-col / 2-row layout (already `md:grid-cols-3`; may add `grid-cols-1 sm:grid-cols-2 md:grid-cols-3` confirmation — avoid visual redesign)

**Step 1:** Set `items` order:
1. Progenes (existing image + href)
2. Haven (`/case-studies/haven-energy`, image haven-energy.png)
3. T1 (`/case-studies/t1-energy`, image t1-energy.png)
4. Agent articles (existing illustration)
5. Solar detection (existing illustration)
6. CTA → href `/contact` (no image required, or subtle muted empty card — if illustration/image missing, ensure section still looks OK; prefer a simple text-only card or reuse a soft mesh if needed without inventing fake client work)

**Step 2:** Use new i18n keys for clients/categories.

**Step 3:** Smoke-check that `CaseStudiesSection` doesn’t break without image on CTA (if it does, add a minimal placeholder background via optional prop or a simple centered label only — keep YAGNI).

**Step 4:** Commit: `Show six case-study cards in a 2×3 homepage grid.`

---

### Task 5: Verify routes and types

**Files:** none expected (verification only)

**Step 1:** Run TypeScript check in `solarview-site` (`npx tsc --noEmit` or project script).

**Step 2:** Confirm `getCaseStudy("haven-energy")` / `t1-energy` resolve if helpers exist; ensure slug page `generateStaticParams` picks up new slugs via `CASE_STUDY_SLUGS`.

**Step 3:** If anything fails, fix and commit: `Fix Haven/T1 case study typing or slug registry.`

**Step 4:** If all green with no code changes, note in report — no empty commit.

---

## Done when

- [ ] Two PNG screenshots in public/case-studies
- [ ] FR/EN case studies for haven-energy and t1-energy
- [ ] Homepage shows 6 cards in 3 columns (2 rows on desktop)
- [ ] Progenes still has only its existing screenshot usage
- [ ] Detail pages reachable at `/fr/case-studies/haven-energy` and `/fr/case-studies/t1-energy`
