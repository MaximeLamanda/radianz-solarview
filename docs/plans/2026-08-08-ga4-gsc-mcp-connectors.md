# GA4 + Search Console MCP Connectors Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Install the GA4 measurement tag on the RADIANZ Next.js site and wire Cursor to read-only Google Analytics 4 + Search Console MCP servers so the agent can query traffic, SEO queries, and URL indexing.

**Architecture:** Collect events with `gtag` via `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the root layout (keep Vercel Analytics). Read data through two local stdio MCP servers in `~/.cursor/mcp.json`: official `analytics-mcp` (GA4) and a community Search Console MCP (`@vmandic/searchconsole-mcp`). Authenticate both with one Google Cloud service account JSON stored outside the git repo.

**Tech Stack:** Next.js 15 App Router, `@next/third-parties` or Script gtag, Google Analytics MCP (`analytics-mcp` via pipx), `@vmandic/searchconsole-mcp` (npx), Google Cloud service account, Cursor MCP.

**Design:** `docs/plans/2026-08-08-ga4-gsc-mcp-connectors-design.md`

---

### Task 1: Document env var and add GA measurement helper

**Files:**
- Modify: `solarview-site/.env.example`
- Create: `solarview-site/lib/ga.ts`
- Create: `solarview-site/lib/ga.test.ts`

**Step 1: Write the failing test**

```ts
// solarview-site/lib/ga.test.ts
import { afterEach, describe, expect, it } from "vitest";
import { getGaMeasurementId } from "./ga";

const original = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

afterEach(() => {
  if (original === undefined) delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  else process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = original;
});

describe("getGaMeasurementId", () => {
  it("returns trimmed ID when set", () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = " G-ABC123 ";
    expect(getGaMeasurementId()).toBe("G-ABC123");
  });

  it("returns null when missing or empty", () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    expect(getGaMeasurementId()).toBeNull();
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = "   ";
    expect(getGaMeasurementId()).toBeNull();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `cd solarview-site && npx vitest run lib/ga.test.ts`

Expected: FAIL (module `./ga` not found or `getGaMeasurementId` undefined)

**Step 3: Write minimal implementation**

```ts
// solarview-site/lib/ga.ts
export function getGaMeasurementId(): string | null {
  const raw = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
  return raw.length > 0 ? raw : null;
}
```

Update `solarview-site/.env.example`:

```env
# Cal.com event link: username/event-slug (from cal.com share / embed)
NEXT_PUBLIC_CAL_LINK=maxime-lamanda-mcwuyw/30min

# Google Analytics 4 measurement ID (Admin → Data streams → Web)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Step 4: Run test to verify it passes**

Run: `cd solarview-site && npx vitest run lib/ga.test.ts`

Expected: PASS

**Step 5: Commit**

```bash
git add solarview-site/lib/ga.ts solarview-site/lib/ga.test.ts solarview-site/.env.example
git commit -m "feat: add GA4 measurement ID helper and env example"
```

---

### Task 2: Mount GA4 in the root layout

**Files:**
- Create: `solarview-site/components/google-analytics.tsx`
- Modify: `solarview-site/app/layout.tsx`
- Modify: `solarview-site/.env.local` (local only — do not commit)

**Step 1: Add GoogleAnalytics component**

Prefer `@next/third-parties/google` if already available; otherwise use `next/script`.

```tsx
// solarview-site/components/google-analytics.tsx
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { getGaMeasurementId } from "@/lib/ga";

export function GoogleAnalytics() {
  const id = getGaMeasurementId();
  if (!id) return null;
  return <NextGoogleAnalytics gaId={id} />;
}
```

If `@next/third-parties` is not installed:

```bash
cd solarview-site && npm install @next/third-parties
```

**Step 2: Wire into layout**

In `solarview-site/app/layout.tsx`, import and render next to `<Analytics />`:

```tsx
import { GoogleAnalytics } from "@/components/google-analytics";
// ...
<Analytics />
<GoogleAnalytics />
```

**Step 3: Set local env (user provides ID)**

Ask the user for the measurement ID (`G-...`). Write only to `solarview-site/.env.local` (already gitignored):

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Also set the same var in Vercel project env (Production + Preview) before deploy — via Vercel dashboard or MCP `env` tools if available.

**Step 4: Smoke check locally**

Run: `cd solarview-site && npm run build`

Expected: build succeeds; no secret leaked in committed files.

**Step 5: Commit (code only)**

```bash
git add solarview-site/components/google-analytics.tsx solarview-site/app/layout.tsx solarview-site/package.json solarview-site/package-lock.json
git commit -m "feat: load GA4 gtag from measurement ID in root layout"
```

Do **not** commit `.env.local`.

---

### Task 3: Google Cloud + service account checklist (manual)

**Files:**
- Create: `docs/plans/2026-08-08-ga4-gsc-mcp-setup-checklist.md`

**Step 1: Write checklist doc** covering:

1. Create or select a GCP project.
2. Enable APIs:
   - Google Analytics Admin API
   - Google Analytics Data API
   - Search Console API
3. Create a service account → download JSON key to a path **outside** the repo, e.g. `~/.config/radianz/gcp-sa.json`.
4. GA4 → Admin → Property access management → add SA email as **Viewer**.
5. Search Console → Settings → Users and permissions → add SA email (Full or Restricted with Read).
6. Note Property ID GA4 (`properties/XXXXXXXX`) and GSC site URL (`https://radianz.tech/` or `sc-domain:radianz.tech`).

**Step 2: Commit checklist**

```bash
git add docs/plans/2026-08-08-ga4-gsc-mcp-setup-checklist.md
git commit -m "docs: add GCP service account checklist for GA4 and GSC MCP"
```

**Step 3: Pause for user**

User completes GCP + GA4 Viewer + GSC user steps and confirms the absolute path to the JSON key.

---

### Task 4: Install GA4 MCP (`analytics-mcp`) in Cursor

**Files:**
- Modify (user machine, not repo): `~/.cursor/mcp.json`

**Step 1: Ensure tooling**

```bash
python3 --version   # need 3.10+
which pipx || brew install pipx && pipx ensurepath
pipx run analytics-mcp --help || true
```

**Step 2: Merge MCP entry** into existing `~/.cursor/mcp.json` (keep `supabase` and `exa`):

```json
{
  "mcpServers": {
    "supabase": { "...": "unchanged" },
    "exa": { "...": "unchanged" },
    "analytics-mcp": {
      "command": "pipx",
      "args": ["run", "analytics-mcp"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/Users/maximelamanda/.config/radianz/gcp-sa.json",
        "GOOGLE_PROJECT_ID": "YOUR_GCP_PROJECT_ID",
        "GOOGLE_CLOUD_PROJECT": "YOUR_GCP_PROJECT_ID"
      }
    }
  }
}
```

Use absolute paths. Replace `YOUR_GCP_PROJECT_ID` and the credentials path with the user’s values.

**Step 3: Restart Cursor MCP / reload window**

**Step 4: Smoke test**

In chat, use tools: list account summaries / run a simple report.

Expected: properties listed; no 403. If empty → SA missing GA4 Viewer.

---

### Task 5: Install Search Console MCP in Cursor

**Files:**
- Modify (user machine): `~/.cursor/mcp.json`

**Step 1: Add GSC MCP entry**

Preferred package (read-only + URL inspection): `@vmandic/searchconsole-mcp`.

```json
"searchconsole": {
  "command": "npx",
  "args": ["-y", "@vmandic/searchconsole-mcp"],
  "env": {
    "GOOGLE_APPLICATION_CREDENTIALS": "/Users/maximelamanda/.config/radianz/gcp-sa.json"
  }
}
```

Same JSON key as Task 4.

**Step 2: Restart Cursor MCP**

**Step 3: Smoke tests**

- List sites → expect RADIANZ property.
- Search analytics last 28 days (queries or pages).
- Inspect one URL (e.g. homepage or `/services/audit-ia`) for index status.

Expected: data returned; inspect shows coverage state. If 403 → SA not added in GSC users.

---

### Task 6: Operator doc + final verification

**Files:**
- Create: `docs/plans/2026-08-08-ga4-gsc-mcp-connectors.md` (short operator guide linking design + checklist)
- Or append a “Verification” section to the checklist from Task 3

**Step 1: Document prompts the agent can answer**

Examples:
- Top landing pages GA4 (7 / 28 days)
- Top queries & pages GSC (28 days)
- Is `/services/audit-ia` indexed?
- Realtime active users

**Step 2: End-to-end verification after deploy**

1. Deploy site with `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel.
2. Open site → GA4 Realtime shows hit.
3. Both MCP servers green in Cursor Settings → MCP.
4. One GA4 + one GSC query succeed in chat.

**Step 3: Commit docs**

```bash
git add docs/plans/2026-08-08-ga4-gsc-mcp-connectors.md
git commit -m "docs: add operator guide for GA4 and GSC MCP usage"
```

---

## Notes for implementer

- Never commit service account JSON or `.env.local`.
- Keep Vercel Analytics; GA4 is additive.
- Stream ID is optional for tagging; **measurement ID** (`G-...`) is what the site needs.
- GSC indexing data can lag; URL Inspection is the live check.
- If `pipx` is not on Cursor’s PATH, use the full path from `which pipx` (e.g. `/Users/maximelamanda/.local/bin/pipx`).

## Execution handoff

After this plan is saved, choose:

1. **Subagent-Driven (this session)** — fresh subagent per task, review between tasks  
2. **Parallel Session** — new session with executing-plans
