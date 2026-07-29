# Homepage Magic Text Statement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ajouter après le carousel use-cases une section statement à révélation mot à mot au scroll (Magic Text sticky), copy FR/EN voix Radianz.

**Architecture:** Primitif client `MagicText` (framer-motion scroll progress → opacity par mot) + wrapper section sticky claire + clés `agency.statement` + branche homepage.

**Tech Stack:** Next.js App Router, next-intl, framer-motion (déjà en dep), Tailwind, tokens `--canvas` / `--ink` / muted.

## Global Constraints

- Placement: après `UseCasesCarousel` dans `solarview-site/app/[locale]/page.tsx`
- Fond clair (`bg-canvas`), pas de bande sombre
- Animation: sticky + reveal mot à mot au scroll (pas fade-once, pas texte statique)
- Copy exacte FR/EN ci-dessous (clés `agency.statement.text`)
- Pas de CTA, cards, stats, images dans cette section
- `framer-motion` déjà dans `package.json` — ne pas ajouter de nouvelle dep
- Commits par task; workspace in-place (WIP homepage)
- Vérif: `npx tsc --noEmit` dans `solarview-site/` (pas de suite unit test dédiée)

**Copy FR (verbatim):**  
`L'IA évolue sans cesse. Catalyseurs du changement, on accélère l'innovation et l'adoption. On guide nos clients pour prendre l'avance sur leur marché. Très rapidement.`

**Copy EN (verbatim):**  
`AI never stands still. As catalysts for change, we accelerate innovation and adoption. We guide our clients to get ahead of their market. Very fast.`

---

### Task 1: Copy i18n `agency.statement`

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

**Step 1:** Sous `agency`, après `useCases` (ou avant `pain`), ajouter:

```json
"statement": {
  "text": "…"
}
```

FR et EN = copy verbatim des Global Constraints.

**Step 2:** Commit

```bash
git add solarview-site/messages/fr.json solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
feat: add homepage statement copy (FR/EN)

EOF
)"
```

---

### Task 2: Primitif `MagicText` + section sticky

**Files:**
- Create: `solarview-site/components/ui/magic-text.tsx`
- Create: `solarview-site/components/magic-text-section.tsx`

**Step 1:** Créer `magic-text.tsx` (`"use client"`):

- Prop `text: string`, optional `className`
- `useRef` + `useScroll({ target, offset: ["start 0.9", "start 0.25"] })` (ajuster si sticky parent)
- Split `text.split(" ")` ; chaque mot a une span muted absolute + `motion.span` opacity via `useTransform(progress, [start, end], [0, 1])`
- `start = i / words.length`, `end = start + 1 / words.length`
- Typo: large (`text-2xl md:text-3xl lg:text-4xl`), `leading-relaxed`, `tracking-[-0.03em]`, `text-ink`, flex-wrap, gap raisonnable entre mots
- Conserver ponctuation attachée au mot (split espaces uniquement)

**Step 2:** Créer `magic-text-section.tsx` (`"use client"` ok, ou server wrapper + client MagicText):

```tsx
<section
  id="statement"
  aria-label={…} // ou aria-labelledby si heading; sinon aria-label from prop optional
  className="relative bg-canvas"
>
  <div className="h-[160vh] md:h-[180vh]">
    <div className="sticky top-0 flex min-h-[100svh] items-center">
      <div className="container mx-auto max-w-3xl px-6 py-24">
        <MagicText text={text} />
      </div>
    </div>
  </div>
</section>
```

Props: `{ text: string; className?: string }`.

Pour le scroll progress avec sticky: le `useScroll` target doit être le conteneur tall (`h-[160vh]`), pas le sticky inner — passer un ref depuis la section ou documenter que MagicText reçoit `containerRef` / wrappe lui-même le tall container.

**Pattern recommandé (tout dans MagicTextSection):**

```tsx
"use client";
// section owns tall ref; MagicText receives scrollYProgress OR owns internal structure
```

Implémentation acceptable: MagicText inclut le paragraphe sticky-friendly ; section fournit hauteur + sticky. Si opacity ne scrub correctement, cibler le tall wrapper avec `useScroll`.

**Step 3:** `npx tsc --noEmit` dans `solarview-site/` — Expected: PASS

**Step 4:** Commit

```bash
git add solarview-site/components/ui/magic-text.tsx solarview-site/components/magic-text-section.tsx
git commit -m "$(cat <<'EOF'
feat: add MagicText sticky statement section

EOF
)"
```

---

### Task 3: Brancher sur la homepage

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`

**Step 1:** Import `MagicTextSection`. Après `<UseCasesCarousel … />`, ajouter:

```tsx
<MagicTextSection text={tAgency("statement.text")} />
```

**Step 2:** `npx tsc --noEmit` — Expected: PASS

**Step 3:** Smoke manuel: homepage FR, scroll après use-cases → mots se révèlent ; switch EN → copy EN.

**Step 4:** Commit

```bash
git add solarview-site/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
feat: wire statement MagicText after use-cases carousel

EOF
)"
```
