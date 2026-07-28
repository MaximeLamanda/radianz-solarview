# Design — Carousel cas d’usage business (homepage)

**Date:** 2026-07-28  
**Status:** Approved (user: approche 1, carte A, carousel B, placement B)

## Intent

Ajouter une section homepage qui montre ce que l’IA peut faire dans les métiers, sous forme de « photos » abstraites (gradient + forme géométrique), dans un carousel shadcn multi-cartes.

## Decisions

| Sujet | Choix |
|-------|--------|
| Visuel carte | Gradient CSS + forme géométrique au centre ; titre sous la zone visuelle |
| Interaction | Carousel shadcn (Embla) : 1 carte mobile, 2 tablet, 3 desktop ; flèches ; pas d’autoplay |
| Placement | Sous les logos pour l’instant (déplaçable plus tard après services/pain) |
| Approche | Carousel shadcn natif + cartes CSS custom (pas de block shadcnblocks, pas d’icônes Lucide dans les formes) |

## Content (6 slides)

1. Rechercher des informations dans un grand volume de documents  
2. Réconcilier paiements et factures avec précision pour éviter les écarts  
3. Identifier des prospects et les contacter automatiquement  
4. Automatiser la réponse aux appels d’offres  
5. Vérifier les contrats et documents juridiques  
6. Automatiser le support client avec un chatbot  

FR + EN via `agency.useCases.*` (heading, description, item1–6).

## Visual system

- Chaque slide a un gradient distinct (palette soft, pas de violet générique ; accents compatibles lime Radianz).
- Formes distinctes par slide : cercle, hexagone, losange, carré arrondi, triangle, anneau.
- Zone visuelle type « photo » (ratio ~4:5), forme centrée, titre en dessous en `text-sm` / `text-base`.
- Section : un H2 + une courte description ; flèches prev/next alignées au pattern shadcn Carousel.

## Architecture

- `npx shadcn@latest add carousel` → `components/ui/carousel.tsx`
- Nouveau composant section client : `components/use-cases-carousel.tsx`
- Branchement dans `app/[locale]/page.tsx` après `AgencyHero` / logos
- Copy dans `messages/fr.json` + `messages/en.json`

## Out of scope

- Vraies photos / assets image
- Autoplay
- Icônes Lucide dans les formes
- Repositionnement après services/pain (plus tard)
