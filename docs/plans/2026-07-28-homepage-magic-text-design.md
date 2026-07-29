# Design — Section phrase espacée (Magic Text) homepage

**Date:** 2026-07-28  
**Status:** Approved (copy B, animation A, fond A, approche sticky MagicText, SDD)

## Intent

Après « Ce que l'IA change dans vos métiers », ajouter une section statement : grande typo aérée, révélation mot à mot au scroll (réf. [Magic Text 21st](https://21st.dev/@preetsuthar17/components/magic-text)).

## Placement

`UseCasesCarousel` → **MagicTextSection** (fin de `<main>` pour l’instant).

## Visual

- Fond clair (`bg-canvas` ou `bg-white`), aligné homepage
- Texte large, centré, line-height généreux, max-width ~40–48rem
- Mots : couche muted + couche ink dont l’opacité suit le scroll
- Conteneur haut (~150–200vh) + texte `sticky` centré verticalement

## Copy (voix Radianz)

**FR (`agency.statement.text`):**  
L'IA évolue sans cesse. Catalyseurs du changement, on accélère l'innovation et l'adoption. On guide nos clients pour prendre l'avance sur leur marché. Très rapidement.

**EN:**  
AI never stands still. As catalysts for change, we accelerate innovation and adoption. We guide our clients to get ahead of their market. Very fast.

## Architecture

1. `components/ui/magic-text.tsx` — primitif client (framer-motion `useScroll` / `useTransform`)
2. `components/magic-text-section.tsx` — section sticky + i18n text prop
3. Clés `agency.statement` dans `fr.json` / `en.json`
4. Branche dans `app/[locale]/page.tsx`

## Hors scope

CTA, dark band, stats, images, refactor d’autres sections.
