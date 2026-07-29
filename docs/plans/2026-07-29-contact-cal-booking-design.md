# Contact Cal.com Booking — Design

**Date:** 2026-07-29  
**Status:** Approved for implementation (user chose V1 options)

## Problem

The contact page uses a 2-step email form (Resend). We want an Impulse Lab–style discovery-call booking experience: book a slot on the page, not send a free-form message.

## Decisions

| Choice | Decision |
|--------|----------|
| Provider | Cal.com Cloud |
| Integration | Styled React embed (`@calcom/embed-react`) |
| Page flow | Replace the entire contact form with the calendar |
| Account | Env-driven link (`NEXT_PUBLIC_CAL_LINK`) — account created later |
| Surfaces | Same component on `/contact` and homepage `LetsTalkSection` |
| Message path | Not in V1 (booking only) |
| Self-host | Out of scope for V1 |

## UX

- Keep the existing black two-column shell (headline left, booking right).
- Right column: Cal.com inline embed, dark theme, brand lime (`#eff9ba`).
- Headline copy shifts from “we reply in 24h” to discovery-call framing.
- If `NEXT_PUBLIC_CAL_LINK` is missing: show a clear empty state (no broken iframe).
- Remove step indicator, fields, and Resend submit from this UI.

## Technical

- Package: `@calcom/embed-react`
- Env: `NEXT_PUBLIC_CAL_LINK` = `username/event-slug` (e.g. `radianz/discovery`)
- Theme via `getCalApi` → `cal("ui", { theme: "dark", cssVarsPerTheme, hideEventTypeDetails })`
- Keep `/api/contact` unused for now (no delete in V1)
- i18n FR + EN under `contact.*`

## Out of scope

- Custom booking UI / Cal.com API / Atoms Platform
- Self-hosted Cal.com
- Dual “send message” path
- Prefill from a prior form step
