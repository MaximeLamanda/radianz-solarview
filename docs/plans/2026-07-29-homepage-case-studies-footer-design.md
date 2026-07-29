# Design — Case studies + Footer homepage

**Date:** 2026-07-29  
**Status:** Approved by default (grille A ; exécution SDD demandée)

## Intent

1. Ajouter le footer shadcn (`Footer2`) manquant sur la homepage.
2. Ajouter une section **présentation de 3 case studies** mockés **juste avant** le formulaire (`LetsTalkSection`).

## Approach

- **Footer :** réutiliser `Footer2` + `buildFooterMenuItems` / `buildFooterBottomLinks` (même pattern que contact / articles / privacy).
- **Case studies :** nouveau composant `CaseStudiesSection` — grille 3 colonnes desktop, stack mobile. Style aligné `ProcessSection` (`article` + `bg-muted`, Badge secteur/métrique). Pas de Card shadcn.
- Distinct du carrousel `UseCasesCarousel` (thèmes métier vs preuves client mockées).

## Contenu mock (FR)

| # | Client | Secteur | Challenge | Résultat | Métrique |
|---|--------|---------|-----------|----------|----------|
| 1 | Nova Industrie | Industrie | Réponses AO manuelles | Pipeline AO automatisé | −65 % temps |
| 2 | Cabinet Meridian | Finance | Réconciliation paiements | Matching IA factures/paiements | 99,2 % précision |
| 3 | Orbit SaaS | B2B SaaS | Qualification leads | Agent outreach + scoring | ×3 pipeline qualifié |

## Hors scope

Nouveau composant Card shadcn ; pages case détail ; CMS ; remplacer `UseCasesCarousel`.
