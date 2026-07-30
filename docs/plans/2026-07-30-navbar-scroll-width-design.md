# Navbar scroll width — Design

**Date:** 2026-07-30  
**Status:** Approved

## Goal

Réduire légèrement la largeur de la barre de navigation au scroll vers le bas, et la redéployer au scroll vers le haut, avec une animation fluide.

## Behavior

- **Expanded (default):** `max-width: var(--site-max-width)` (72rem)
- **Compact:** `max-width: 48rem` (~768px)
- **Trigger:** direction du scroll — down → compact, up → expanded
- **Threshold:** ~24px from top before compact can activate; small hysteresis to avoid flicker
- **Animation:** CSS `transition` on `max-width` (~300ms, ease-out)
- **Scope:** width only — no height, padding, or content changes
- **Mobile:** same behavior if useful; content already fits so visual change is modest

## Approach

Binary state + CSS transition inside `Navbar1` (scroll listener with `requestAnimationFrame` / passive listener). No Framer Motion.

## Out of scope

- Hiding nav items
- Height / logo / CTA size changes
- Scroll-linked continuous interpolation
