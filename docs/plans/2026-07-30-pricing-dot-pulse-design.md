# Design: Dot Globe on Pricing Card

**Date:** 2026-07-30  
**Status:** Implemented

## Goal

Replace the highlighted offer label (`Plateforme web & IA`) with a minimal pixel globe that rotates on itself, matching the DotBirdFlight language.

## Decisions

- Motif: lat/lon wireframe globe (dots), rotating around Y.
- Globe alone — no visible label text; `offer.name` kept as `aria-label`.
- Same pixel cell size as hero bird (~6px CSS, `fillRatio` 0.62).
- Only on the highlighted pricing card; Audit keeps `radianz-label`.
- Procedural projection in `DotGlobeSpin` (replaces earlier pulse ring).

## Out of scope

- Globe on the Audit card
- Shared abstraction refactor of DotBirdFlight paint loop
- Lab page for the globe
