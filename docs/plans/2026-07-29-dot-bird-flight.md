# Dot Bird Flight Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Composant React Canvas qui rejoue fidèlement l’animation oiseau en points (fond transparent).

**Architecture:** Extraire les frames vidéo en grilles de cellules colorées compactes ; lire et animer via `requestAnimationFrame` sur un canvas transparent.

**Tech Stack:** Python/OpenCV (extraction), Next.js React client component, Canvas 2D, JSON data.

---

### Task 1: Script d’extraction

**Files:**
- Create: `scripts/extract-dot-bird.py`
- Create: `solarview-site/lib/dot-bird-frames.json` (généré)

**Steps:** Extraire ~24–30 fps downsamplé depuis la .mov, détecter carrés oiseau (blanc + accents), stocker coords/couleurs par frame, crop centré oiseau.

### Task 2: Composant Canvas

**Files:**
- Create: `solarview-site/components/dot-bird-flight.tsx`

**Steps:** Client component, charge JSON, dessine squares, loop, props className/size/paused, aria-hidden, fond transparent.

### Task 3: Preview locale

**Files:**
- Modify: page de preview ou intégration temporaire visible pour valider

**Steps:** Rendre le composant quelque part visible en dev pour vérifier le loop.
