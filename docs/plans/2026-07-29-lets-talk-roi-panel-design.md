# LetsTalk ROI Panel — Design

**Date:** 2026-07-29  
**Status:** Approved (Approach A + figure ROI 3,7×)

## Problem

In `LetsTalkSection`, the left column ends with an empty decorative `div` (`aria-hidden`). It should convert booking intent using a strong ROI proof next to the Cal embed.

## Decision

Replace the empty panel with a **giant figure + short caption** on a lime→black gradient (Approach A).

| Element | Content |
|---------|---------|
| Figure | **3,7×** (FR) / **3.7×** (EN) |
| Caption | ROI moyen GenAI · pour 1 € investi |
| Source | IDC 2024 (Business Opportunity of AI / Microsoft) |
| Visual | Gradient brand lime (`#eff9ba`) → noir, coins arrondis inchangés |

## Rationale

- IDC: average GenAI ROI **3.7×** per $1 invested (2024 study sponsored by Microsoft).
- Punchier than a modest % CA uplift; pairs well with “book a call”.
- Keeps one job for the panel: motivate the calendrier à droite.

## Out of scope

- No new dependencies.
- No change to Cal embed / booking logic.
- No extra bullets or secondary stats in the panel.
