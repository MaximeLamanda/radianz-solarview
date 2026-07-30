# Design — Page Industries

**Date:** 2026-07-30  
**Status:** Approved (approche 1 ; user: implemente)

## Intent

Page dédiée `/industries` avec tab bar secteurs + grille de cas d’usage (cards gradient). Chaque cas d’usage a des tags industries (1..n) qui contrôlent sa visibilité.

## Decisions

| Sujet | Choix |
|-------|--------|
| Route | `/industries` |
| Deep link | `?secteur=<id>` pré-sélectionne l’onglet ; nav Secteurs pointe dessus |
| Industries | Les 6 existantes : industrie, finance, saas, energie, immobilier, retail |
| Onglet « Tous » | Non |
| Contenu | 6 cas homepage + cas additionnels ; multi-tags |
| Card | Mesh/gradient + titre + courte description ; clic → `/contact` |
| Filtre | Client-side sur source de vérité unique |

## Architecture

- `lib/industries.ts` — `INDUSTRY_IDS` + métadonnées cas (id, industries[], image, shape…)
- `messages/{fr,en}.json` — namespace `industries.*` (meta, heading, cases)
- `components/industries-hub.tsx` — tab bar + grille filtrée (client)
- `app/[locale]/industries/page.tsx` — page shell (nav, footer, SEO)
- Navbar : `url: /industries?secteur=${key}`
- Sitemap : ajouter `/industries`

## Out of scope

- Routes `/industries/[slug]`
- CMS / markdown
- Modifier le carousel homepage (reste indépendant en copy, partage les assets mesh)
