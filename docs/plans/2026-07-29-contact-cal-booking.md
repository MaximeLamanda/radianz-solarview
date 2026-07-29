# Contact Cal.com Booking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le formulaire de contact email par un embed Cal.com stylé (dark + lime) sur la page contact et la homepage.

**Architecture:** `LetsTalkSection` conserve le shell noir deux colonnes ; la colonne droite charge `@calcom/embed-react` avec `NEXT_PUBLIC_CAL_LINK`. Helper `lib/cal.ts` expose le lien. Copy i18n mise à jour pour le framing « appel découverte ».

**Tech Stack:** Next.js 15 App Router, React 19, next-intl, `@calcom/embed-react`, Tailwind, CSS vars Cal.com.

## Global Constraints

- Workspace: in-place sur `main` (WIP homepage — ne pas créer de worktree).
- Ne pas supprimer `/api/contact` ni la dépendance `resend` en V1.
- Ne pas ajouter de chemin « Envoyer un message ».
- `NEXT_PUBLIC_CAL_LINK` format exact: `username/event-slug` (ex. `radianz/discovery`).
- Theme embed: `theme: "dark"` ; brand color `#eff9ba` (lime site) ; fond aligné noir.
- Si le lien env est absent/vide: empty state i18n, pas d’embed cassé.
- Langue code: anglais pour fichiers/composants ; copy FR+EN dans `messages/`.
- Commits atomiques par tâche ; messages en anglais, focus why.
- Vérifier avec `cd solarview-site && npx tsc --noEmit` avant chaque commit de code TS/TSX.
- Work from repo root `/Users/maximelamanda/Website-solarview` ; app code under `solarview-site/`.

## File structure

| File | Responsibility |
|------|----------------|
| `solarview-site/lib/cal.ts` | Read + validate `NEXT_PUBLIC_CAL_LINK` |
| `solarview-site/.env.example` | Document env var |
| `solarview-site/components/cal-embed.tsx` | Client Cal.com embed + dark UI config |
| `solarview-site/components/lets-talk-section.tsx` | Shell + embed / empty state (no form) |
| `solarview-site/messages/fr.json` | Copy booking FR |
| `solarview-site/messages/en.json` | Copy booking EN |
| `solarview-site/app/[locale]/contact/page.tsx` | Drop success/error form props |

---

### Task 1: Cal link helper + dependency + env example

**Files:**
- Create: `solarview-site/lib/cal.ts`
- Create: `solarview-site/.env.example`
- Modify: `solarview-site/package.json` (via npm install)
- Modify: `solarview-site/package-lock.json` (via npm install)
- Test: `solarview-site/lib/cal.test.ts` (Node assert script style — see steps; if no test runner, use a tiny node script under `scripts/` OR colocate and run with `npx tsx`)

**Interfaces:**
- Produces:
  - `export function getCalLink(): string | null` — returns trimmed `NEXT_PUBLIC_CAL_LINK` if it matches `/^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/`, else `null`
  - Env documented: `NEXT_PUBLIC_CAL_LINK=username/event-slug`

- [ ] **Step 1: Write failing test for `getCalLink`**

Create `solarview-site/lib/cal.test.ts`:

```ts
import assert from "node:assert/strict";
import { getCalLink } from "./cal";

const original = process.env.NEXT_PUBLIC_CAL_LINK;

function withEnv(value: string | undefined, fn: () => void) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK;
  else process.env.NEXT_PUBLIC_CAL_LINK = value;
  try {
    fn();
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_CAL_LINK;
    else process.env.NEXT_PUBLIC_CAL_LINK = original;
  }
}

withEnv(undefined, () => assert.equal(getCalLink(), null));
withEnv("", () => assert.equal(getCalLink(), null));
withEnv("  ", () => assert.equal(getCalLink(), null));
withEnv("not-a-link", () => assert.equal(getCalLink(), null));
withEnv("radianz/discovery", () => assert.equal(getCalLink(), "radianz/discovery"));
withEnv("  radianz/discovery  ", () => assert.equal(getCalLink(), "radianz/discovery"));

console.log("cal.test.ts: ok");
```

- [ ] **Step 2: Run test — expect FAIL (module missing)**

Run: `cd solarview-site && npx --yes tsx lib/cal.test.ts`  
Expected: FAIL — cannot find module `./cal`

- [ ] **Step 3: Implement `lib/cal.ts`**

```ts
const CAL_LINK_PATTERN = /^[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+$/;

export function getCalLink(): string | null {
  const raw = process.env.NEXT_PUBLIC_CAL_LINK?.trim() ?? "";
  if (!raw) return null;
  if (!CAL_LINK_PATTERN.test(raw)) return null;
  return raw;
}
```

- [ ] **Step 4: Create `.env.example`**

```bash
# Cal.com event link: username/event-slug (from cal.com share / embed)
NEXT_PUBLIC_CAL_LINK=radianz/discovery
```

- [ ] **Step 5: Install dependency**

Run: `cd solarview-site && npm install @calcom/embed-react`  
Expected: package added to dependencies.

- [ ] **Step 6: Run test — expect PASS**

Run: `cd solarview-site && npx --yes tsx lib/cal.test.ts`  
Expected: `cal.test.ts: ok`

- [ ] **Step 7: Typecheck**

Run: `cd solarview-site && npx tsc --noEmit`  
Expected: exit 0

- [ ] **Step 8: Commit**

```bash
git add solarview-site/lib/cal.ts solarview-site/lib/cal.test.ts solarview-site/.env.example solarview-site/package.json solarview-site/package-lock.json
git commit -m "$(cat <<'EOF'
feat: add Cal.com link helper and embed dependency

Env-validated calLink so the contact UI can swap the email form for booking.
EOF
)"
```

---

### Task 2: Cal embed component + rewrite `LetsTalkSection`

**Files:**
- Create: `solarview-site/components/cal-embed.tsx`
- Modify: `solarview-site/components/lets-talk-section.tsx` (full rewrite of form area)

**Interfaces:**
- Consumes: `getCalLink` from `@/lib/cal`
- Produces:
  - `CalEmbed({ calLink: string; className?: string })` — client component
  - `LetsTalkSection` props simplified: drop `success` / `error` (or keep optional unused — prefer remove). Keep `className`, `locale?`, `asPageTitle?`, `imageSrc?` if still used.

**UI behavior:**
- Left column: badge outside (existing), headline `headline1` + muted `headline2`, decorative panel kept.
- Right column: if `getCalLink()` → `<CalEmbed calLink={...} />`; else empty state with `t("bookingUnavailable")`.
- Remove all form fields, steps, Resend POST.
- Cal embed config (in `useEffect` via `getCalApi`):

```ts
cal("ui", {
  theme: "dark",
  hideEventTypeDetails: false,
  cssVarsPerTheme: {
    dark: {
      "cal-brand": "#eff9ba",
      "cal-brand-emphasis": "#e5f09e",
      "cal-brand-text": "#0a0a0a",
      "cal-brand-accent": "#0a0a0a",
      "cal-bg": "#000000",
      "cal-bg-emphasis": "#171717",
      "cal-bg-subtle": "#0a0a0a",
      "cal-bg-muted": "#0a0a0a",
      "cal-text": "#fafafa",
      "cal-text-emphasis": "#ffffff",
      "cal-text-subtle": "rgba(255,255,255,0.64)",
      "cal-text-muted": "rgba(255,255,255,0.45)",
      "cal-border": "rgba(255,255,255,0.10)",
      "cal-border-booker": "rgba(255,255,255,0.10)",
      radius: "0.75rem",
    },
  },
});
```

- [ ] **Step 1: Create `cal-embed.tsx`**

```tsx
"use client";

import * as React from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { cn } from "@/lib/utils";

interface CalEmbedProps {
  calLink: string;
  className?: string;
}

export function CalEmbed({ calLink, className }: CalEmbedProps) {
  React.useEffect(() => {
    void (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#eff9ba",
            "cal-brand-emphasis": "#e5f09e",
            "cal-brand-text": "#0a0a0a",
            "cal-brand-accent": "#0a0a0a",
            "cal-bg": "#000000",
            "cal-bg-emphasis": "#171717",
            "cal-bg-subtle": "#0a0a0a",
            "cal-bg-muted": "#0a0a0a",
            "cal-text": "#fafafa",
            "cal-text-emphasis": "#ffffff",
            "cal-text-subtle": "rgba(255,255,255,0.64)",
            "cal-text-muted": "rgba(255,255,255,0.45)",
            "cal-border": "rgba(255,255,255,0.10)",
            "cal-border-booker": "rgba(255,255,255,0.10)",
            radius: "0.75rem",
          },
        },
      });
    })();
  }, []);

  return (
    <div className={cn("min-h-[560px] w-full overflow-hidden", className)}>
      <Cal
        calLink={calLink}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `lets-talk-section.tsx`**

Replace form with:

```tsx
"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CalEmbed } from "@/components/cal-embed";
import { getCalLink } from "@/lib/cal";

interface LetsTalkSectionProps {
  className?: string;
  asPageTitle?: boolean;
}

export function LetsTalkSection({ className, asPageTitle = false }: LetsTalkSectionProps) {
  const t = useTranslations("contact");
  const calLink = getCalLink();
  const HeadlineTag = asPageTitle ? "h1" : "p";

  return (
    <section className={cn("bg-white py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="shrink-0 font-mono text-xs uppercase tracking-wider">
            {t("badge")}
          </Badge>
        </div>

        <div className="flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-black text-white">
          <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-stretch">
            <div className="flex flex-col justify-between gap-8 border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-8 2xl:p-10">
              <HeadlineTag className="text-3xl font-light leading-[1.04] tracking-[-0.04em] md:text-4xl 2xl:text-[2.75rem]">
                {t("headline1")}
                <br />
                <span className="text-white/62">{t("headline2")}</span>
              </HeadlineTag>
              <p className="max-w-md text-sm leading-relaxed text-white/55">{t("introText")}</p>
              <div
                aria-hidden="true"
                className="min-h-48 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] md:min-h-64"
              />
            </div>

            <div className="flex flex-col p-4 md:p-6 2xl:p-8">
              {calLink ? (
                <CalEmbed calLink={calLink} />
              ) : (
                <div className="flex min-h-[320px] flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 text-center text-sm text-white/60">
                  {t("bookingUnavailable")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

Note: `getCalLink()` reads `process.env.NEXT_PUBLIC_*` — OK in client bundles if set at build time. Call it inside the client component.

- [ ] **Step 3: Typecheck**

Run: `cd solarview-site && npx tsc --noEmit`  
Expected: exit 0

- [ ] **Step 4: Commit**

```bash
git add solarview-site/components/cal-embed.tsx solarview-site/components/lets-talk-section.tsx
git commit -m "$(cat <<'EOF'
feat: replace contact form with styled Cal.com embed

Discovery-call booking matches the dark contact shell without Resend steps.
EOF
)"
```

---

### Task 3: i18n copy + contact page wiring

**Files:**
- Modify: `solarview-site/messages/fr.json` (`contact` namespace)
- Modify: `solarview-site/messages/en.json` (`contact` namespace)
- Modify: `solarview-site/app/[locale]/contact/page.tsx`

**Interfaces:**
- Produces keys (keep unused old keys OR prune form-only keys — prune form-only to avoid dead copy):
  - Keep: `badge`, `metaTitle`, `metaDescription`, `contactRep`, `contactRepName` if referenced elsewhere
  - Update: `headline1`, `headline2`, `introText`, `metaDescription`
  - Add: `bookingUnavailable`
  - Remove from JSON if unused after Task 2: step/form field keys (`firstName`, `lastName`, `email`, `company`, `message`, `next`, `back`, `send`, `step1`, `step2`, placeholders, `successMessage`, `configError`, `sendError`, `projectType`, response labels) — only if grepped unused

**FR copy:**
- `headline1`: `Réservez un appel découverte.`
- `headline2`: `On cadre votre besoin en 30 min.`
- `introText`: `Choisissez un créneau. On discute audit IA, automatisation, agent ou plateforme — et on repart avec une prochaine étape claire.`
- `bookingUnavailable`: `La prise de rendez-vous n'est pas encore configurée. Revenez bientôt ou écrivez-nous.`
- `metaDescription`: `Réservez un appel découverte avec Radianz pour un audit IA, une plateforme sur mesure ou un accompagnement.`

**EN copy:**
- `headline1`: `Book a discovery call.`
- `headline2`: `We frame your need in 30 minutes.`
- `introText`: `Pick a slot. We discuss AI audit, automation, agents, or platforms — and leave with a clear next step.`
- `bookingUnavailable`: `Booking is not configured yet. Check back soon or email us.`
- `metaDescription`: `Book a discovery call with Radianz for an AI audit, custom platform, or guidance.`

- [ ] **Step 1: Update FR + EN contact strings** (as above). Prune unused form keys after `rg` confirms no references.

- [ ] **Step 2: Simplify `contact/page.tsx`**

Remove `searchParams` success/error handling. Render:

```tsx
<main id="contact-form" className="min-h-[70vh]">
  <LetsTalkSection asPageTitle />
  ...
</main>
```

Drop unused `searchParams` prop from the page signature if no longer needed.

- [ ] **Step 3: Validate JSON**

```bash
node -e "JSON.parse(require('fs').readFileSync('solarview-site/messages/fr.json','utf8'))"
node -e "JSON.parse(require('fs').readFileSync('solarview-site/messages/en.json','utf8'))"
```

- [ ] **Step 4: Typecheck**

Run: `cd solarview-site && npx tsc --noEmit`  
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add solarview-site/messages/fr.json solarview-site/messages/en.json solarview-site/app/[locale]/contact/page.tsx
git commit -m "$(cat <<'EOF'
content: update contact copy for Cal.com booking

Align FR/EN messaging with discovery-call booking and drop form props.
EOF
)"
```

---

## Self-review checklist

1. Spec coverage: replace form ✓, Cal.com styled embed ✓, env link ✓, empty state ✓, homepage+contact ✓, no message path ✓, keep API ✓
2. No placeholders / TBD
3. Types: `getCalLink(): string | null`, `CalEmbed({ calLink: string })` consistent across tasks
