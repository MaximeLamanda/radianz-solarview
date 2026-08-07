# Design — Case studies Haven Energy + T1 Energy

**Date:** 2026-08-07  
**Status:** Approved (approche B + grille 2×3)

## Goal

Ajouter deux réalisations **création de site web** ([Haven Energy](https://havenenergy.com/), [T1 Energy](https://t1energy.com/)) dans la section Cas clients, sur le même modèle que Progenes (carte homepage + page détail FR/EN).

## Layout

Grille **2 lignes × 3 colonnes** (6 cellules) :

| 1 | 2 | 3 |
|---|---|---|
| Progenes | Haven Energy | T1 Energy |
| Agent articles | Détection solaire | CTA « Votre projet ? » → `/contact` |

- Progenes : **aucun** écran supplémentaire (cover existante seule).
- Haven / T1 : **une** cover screenshot chacune (hero / homepage).
- Agent + Solar : inchangés (illustrations existantes).

## Contenu détail

Pages `/case-studies/haven-energy` et `/case-studies/t1-energy` (FR + EN) :
- category « Site web » / « Website »
- cover image screenshot
- sections légères (contexte, choix design, résultat) — pas de galerie multi-écrans
- `externalUrl` vers le site live
- Progenes sections : ne pas ajouter d’illustrations

## Assets

- `public/case-studies/haven-energy.png` — screenshot homepage Haven
- `public/case-studies/t1-energy.png` — screenshot homepage T1

## Copy homepage

Mettre à jour `agency.caseStudies.description` (plus « Trois projets »).
Ajouter `item4` / `item5` / `item6` (ou keys haven / t1 / cta) en FR/EN.
