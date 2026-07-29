# LetsTalk ROI Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le panneau vide de `LetsTalkSection` par un bloc gradient lime→noir avec le chiffre ROI **3,7×** (IDC 2024) pour pousser à la prise de RDV.

**Architecture:** Copy i18n sous `contact.roiPanel.*` ; le placeholder `div` devient un panneau sémantique (pas `aria-hidden`) avec figure, légende et source. Pas de nouveau composant fichier sauf si le JSX dépasse ~40 lignes — sinon inline dans `lets-talk-section.tsx`.

**Tech Stack:** Next.js App Router, next-intl, Tailwind, CSS vars `--lime` / noir existants.

## Global Constraints

- Workspace: in-place sur `main` (WIP homepage — ne pas créer de worktree).
- Chiffre exact: **3,7×** (FR) / **3.7×** (EN) — source IDC 2024.
- Gradient: lime marque `#eff9ba` / `var(--lime)` vers noir / transparent noir ; rester dans le panel arrondi existant (`rounded-2xl`, `min-h-48` / `md:min-h-64`).
- Un seul job: chiffre + courte légende + source discrète. Pas de bullets, pas de CTA texte supplémentaire.
- Retirer `aria-hidden` du panneau (contenu informatif).
- Langue code: anglais pour fichiers/composants ; copy FR+EN dans `messages/`.
- Commits atomiques par tâche ; messages en anglais, focus why.
- Vérifier avec `cd solarview-site && npx tsc --noEmit` avant chaque commit de code TS/TSX.
- Work from repo root `/Users/maximelamanda/Website-solarview` ; app code under `solarview-site/`.
- Ne pas toucher Cal embed, `lib/cal.ts`, ni d’autres sections hors scope.

## File structure

| File | Responsibility |
|------|----------------|
| `solarview-site/messages/fr.json` | Keys `contact.roiPanel.*` FR |
| `solarview-site/messages/en.json` | Keys `contact.roiPanel.*` EN |
| `solarview-site/components/lets-talk-section.tsx` | Remplacer le panneau vide par le bloc ROI |

---

### Task 1: i18n copy for ROI panel

**Files:**
- Modify: `solarview-site/messages/fr.json` (`contact` object)
- Modify: `solarview-site/messages/en.json` (`contact` object)

**Keys to add under `contact`:**

FR:
```json
"roiPanel": {
  "figure": "3,7×",
  "label": "ROI moyen GenAI",
  "supporting": "Pour 1 € investi en IA générative.",
  "source": "Source : IDC, Business Opportunity of AI, 2024"
}
```

EN:
```json
"roiPanel": {
  "figure": "3.7×",
  "label": "Average GenAI ROI",
  "supporting": "For every $1 invested in generative AI.",
  "source": "Source: IDC, Business Opportunity of AI, 2024"
}
```

- [ ] **Step 1:** Insert `roiPanel` object into `contact` in both JSON files (valid JSON, trailing commas OK only if file already uses them — match existing style; these files are strict JSON).

- [ ] **Step 2:** Validate JSON parses:

```bash
cd solarview-site && node -e "JSON.parse(require('fs').readFileSync('messages/fr.json','utf8')); JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('ok')"
```

Expected: `ok`

- [ ] **Step 3: Commit**

```bash
git add solarview-site/messages/fr.json solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
feat(contact): add ROI panel i18n copy

Surface the IDC 3.7x GenAI ROI proof next to booking.
EOF
)"
```

---

### Task 2: Render ROI gradient panel in LetsTalkSection

**Files:**
- Modify: `solarview-site/components/lets-talk-section.tsx`

**Replace** the empty decorative block:

```tsx
<div
  aria-hidden="true"
  className="min-h-48 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] md:min-h-64"
/>
```

**With** a panel that:

1. Keeps `min-h-48 flex-1 rounded-2xl … md:min-h-64` and border `border-white/10`.
2. Uses relative overflow-hidden + CSS gradient background (lime → black), e.g.:

```tsx
className={cn(
  "relative min-h-48 flex-1 overflow-hidden rounded-2xl border border-white/10 md:min-h-64",
  "bg-[radial-gradient(120%_90%_at_10%_0%,var(--lime)_0%,transparent_55%),linear-gradient(160deg,#1a1a1a_0%,#0a0a0a_100%)]",
)}
```

(Adjust stops if needed for readability; figure must remain high-contrast white or near-white on the dark area.)

3. Inner layout: flex column, justify center (or end), padding `p-6 md:p-8`, gap small.
4. Content via `t("roiPanel.figure")` etc.:
   - Figure: large display type (`text-6xl md:text-7xl 2xl:text-8xl font-light tracking-tight leading-none text-white` or similar; lime accent allowed on × if tasteful).
   - Label: `text-sm md:text-base text-white/80`
   - Supporting: `text-sm text-white/55`
   - Source: `mt-auto` or bottom `text-[11px] text-white/35`

5. No `aria-hidden`. Prefer a single wrapper; figure can be `<p>` or `<span className="block">` with label as sibling text (not a fake heading that steals page outline — page already has headline above).

6. Do not extract a separate file unless JSX for the panel alone exceeds ~40 lines.

- [ ] **Step 1:** Implement the replacement in `lets-talk-section.tsx`.

- [ ] **Step 2:** Typecheck

```bash
cd solarview-site && npx tsc --noEmit
```

Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add solarview-site/components/lets-talk-section.tsx
git commit -m "$(cat <<'EOF'
feat(contact): show GenAI ROI gradient panel

Replace empty LetsTalk placeholder with IDC 3.7x proof.
EOF
)"
```

---

### Task 3: Smoke-check translations keys resolve

**Files:** none new (verification only; fix if broken)

- [ ] **Step 1:** Confirm keys exist and component references match:

```bash
cd solarview-site && node -e "
const fr=require('./messages/fr.json');
const en=require('./messages/en.json');
for (const k of ['figure','label','supporting','source']) {
  if (!fr.contact.roiPanel?.[k]) throw new Error('fr missing '+k);
  if (!en.contact.roiPanel?.[k]) throw new Error('en missing '+k);
}
console.log('roiPanel keys ok', fr.contact.roiPanel.figure, en.contact.roiPanel.figure);
"
```

Expected: `roiPanel keys ok 3,7× 3.7×`

- [ ] **Step 2:** Grep component for `roiPanel` usage:

```bash
rg "roiPanel" solarview-site/components/lets-talk-section.tsx
```

Expected: references to figure, label, supporting, source.

- [ ] **Step 3:** If anything missing, fix and amend only if this verification task produced no prior commit; otherwise new fix commit. If already correct, **no commit** — report DONE with no new SHA.

---

## Done when

- Empty placeholder gone; ROI panel visible left of Cal embed.
- FR/EN copy correct; source credited.
- `tsc --noEmit` clean after Task 2.
