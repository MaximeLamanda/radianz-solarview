# Design — Section process homepage (3 étapes)

**Date:** 2026-07-28  
**Status:** Approved (approche A, sans Kayro, sans FDE)

## Intent

Insérer une explication du process en 3 étapes **avant** le carrousel d’exemples (`UseCasesCarousel`), avec wording builders pour organisations complexes.

## Approach

Grille 3 colonnes enrichissant `ProcessSection` : titre + 3 étapes (Décider / Construire / Industrialiser). Preuve par étape via `Badge` shadcn. Intégrations SI en badges outline sous l’étape 3.

## Copy FR

- **heading:** Construit par des builders pour des organisations complexes
- **Décider:** Disrupter son marché avant d'être disrupté. Nous scannons vos opportunités et vos données, chiffrons le ROI, et recommandons quoi lancer — et surtout quoi ignorer. · proof: +40 stratégies IA conçues pour les leaders de leur marché.
- **Construire:** Le chemin technique le plus simple pour un objectif donné. De l'outil sur étagère au sur-mesure, nos experts ne déploient jamais plus de complexité que nécessaire. · proof: +120 projets IA réussis en 3 ans.
- **Industrialiser:** On met en production, on branche à votre SI, et on rend vos équipes autonomes. On part quand vous n'avez plus besoin de nous. · intégrations: CRM, ERP, PIM, SharePoint, GDrive, E-mail, Databases…

## Hors scope

Mention FDE / Kayro ; nouvelles deps Card ; refonte CSS globale.
