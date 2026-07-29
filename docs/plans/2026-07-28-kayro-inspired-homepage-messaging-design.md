# Design — Homepage messaging inspiré Kayro (Radianz)

**Date:** 2026-07-28  
**Status:** Approved (user: scope B, angle A+B, slots A, implement via SDD)

## Intent

Réécrire le message de la homepage Radianz avec l’énergie de [Kayro](https://www.kayro.ai/) (urgence / disruption + partenaire builders), sans cloner le site. Structure de sections inchangée. Images retirées / slots collage vides pour un second temps.

## Scope

- Copy `agency.*` + `site` tagline/meta (FR + EN)
- Hero : afficher `description` sous le H1 ; collages = placeholders sans `src`
- Hors scope : nouvelles sections, vraies photos, refonte CSS globale

## Approach

Énergie Kayro, voix Radianz (web & IA, sprints, livrables). Preuves numériques actuelles conservées (50+, +40%, 2 sem.).

## Hero copy (FR)

- **heading:** Prenez de l'avance. Disruptez votre marché avant d'être disrupté.
- **description:** Votre partenaire web & IA, de l'audit à la production, à la vitesse d'une startup. On décide, on construit, on industrialise.
- **ctaPrimary:** Rendez-vous avec un expert
- **ctaSecondary:** Découvrir nos offres

## Hero copy (EN)

- **heading:** Get ahead. Disrupt your market before it disrupts you.
- **description:** Your web & AI partner, from audit to production, at startup speed. We decide, we build, we industrialize.
- **ctaPrimary:** Book a call with an expert
- **ctaSecondary:** Explore our offers

## Body narrative (FR — clés)

- **pain.heading:** Vous optimisez des process. D'autres réécrivent les règles du jeu.
- **services.heading:** De la stratégie à la production. Sans détour.
- **stats.heading:** Des résultats livrés, pas du temps facturé.
- **pricing.heading:** Vous payez le résultat livré, pas le temps passé.
- **process.heading:** Décider. Construire. Industrialiser.
- **cta.heading:** L'avance se prend maintenant.

Textes complets : plan d’implémentation.

## Media slots

Conserver `HeroMediaCollage*` et `DEFAULT_SLOTS` sans `src` (placeholders label). Aucune image réelle dans ce chantier.
