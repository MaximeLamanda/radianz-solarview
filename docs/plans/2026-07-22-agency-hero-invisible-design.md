# Agency Hero (Invisible Tech style) — Design

Date: 2026-07-22  
Status: Approved  
Reference: https://invisibletech.ai/

## Goal

Refondre le hero de la homepage Radianz pour reprendre la **forme** du hero Invisible Technologies : titre expressif, CTA, illustrations flottantes autour du texte — avec des **blocs template** à la place des images (remplaçables plus tard).

## Decisions

| Décision | Choix |
|---|---|
| Approche | A — Collage flottant (6 blocs asymétriques) |
| Mobile | 1 seul bloc **au-dessus** du titre, rotation toutes les **3s** |
| Stats / mockup dashboard | Retirés du hero |
| Logos partenaires | Restent dans `TrustLogosSection` (inchangé) |
| Contenu texte | Conservé via i18n (`agency.hero.*`) ; badge optionnel |

## Layout

### Desktop (≥1024px)

- Fond léger type grille de points (CSS, pas d’image)
- Contenu texte centré (ou légèrement centré) : badge optionnel, H1, description, CTA primaire (+ secondaire si on le garde)
- 6 blocs placeholder en `absolute` autour du texte, tailles/ratios variés, légèrement hors du container
- Blocs = fond neutre + bordure + label `Image N` ; props `src`/`alt` optionnelles pour swap futur

### Tablet (768–1023px)

- Même structure, 4–6 blocs avec positions resserrées pour ne pas écraser le texte

### Mobile (<768px)

- **Pas** de position absolute / collage
- Un seul bloc **au-dessus** du titre
- Cycle automatique sur les 6 slots toutes les 3s (crossfade)
- Respect `prefers-reduced-motion` : pas d’auto-rotation (afficher le premier slot)

## Composants

- `AgencyHero` refactoré (client pour la rotation mobile, ou sous-composant client `HeroMediaCollage`)
- Slots data : tableau `{ id, label, src?, alt?, className? }[]`
- Page d’accueil : retirer le passage de `stats` au hero

## Hors scope

- Nouvelles images réelles
- Animation de mot rotatif dans le titre (Invisible)
- Refonte de la navbar / trust logos
- Changement du copy marketing (sauf ajustements mineurs de layout)

## Success criteria

- Desktop : collage lisible, texte non masqué
- Mobile : 1 bloc top, change toutes les 3s, pas d’overflow horizontal
- Remplacer un slot par une image = changer une prop / entrée du tableau, sans refonte CSS
