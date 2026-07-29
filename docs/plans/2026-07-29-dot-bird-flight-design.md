# Design — Animation oiseau en points (dot bird flight)

**Date:** 2026-07-29  
**Status:** Implemented (approche 1 — playback masques grille Canvas)

## Intent

Reproduire l’animation de vol d’oiseau en carrés blancs (réf. capture écran), uniquement les dots, fond transparent, en composant React Canvas.

## Architecture

1. Script one-shot d’extraction vidéo → frames grille JSON
2. `components/dot-bird-flight.tsx` — client, canvas transparent, loop rAF
3. Pas d’intégration homepage pour l’instant (composant isolé + preview)

## Visuel

- Carrés blancs + accents R/V rares
- Fond transparent, sans grille UI ni texte

## Hors scope

Texte « grow wings and fly », fond bleu, Lottie/vidéo, placement homepage.
