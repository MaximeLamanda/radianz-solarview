# Homepage Case Studies + Footer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Afficher 3 case studies mockés avant le formulaire contact sur la homepage, et brancher le footer shadcn `Footer2` en bas de page.

**Architecture:** Nouveau `CaseStudiesSection` (grille 3 articles, style ProcessSection). Copy via `next-intl` sous `agency.caseStudies`. Footer via `Footer2` + helpers `lib/footer-menu.ts`, même wiring que `contact/page.tsx`.

**Tech Stack:** Next.js App Router, next-intl, shadcn Badge/Button (existants), Tailwind, Footer2 existant.

## Global Constraints

- Workspace: in-place sur `main` (WIP homepage déjà présent — ne pas créer de worktree).
- Langue UI code : anglais pour noms de fichiers/composants ; copy FR+EN dans `messages/`.
- Réutiliser `Footer2` — ne pas créer un second footer.
- Pas de dépendance `Card` shadcn — utiliser `article` + classes comme `ProcessSection`.
- Ne pas modifier / supprimer `UseCasesCarousel`.
- Section case studies **immédiatement avant** `LetsTalkSection` (après `MagicTextSection`).
- Mock data uniquement via i18n keys (pas de fetch).
- Commits atomiques par tâche ; message en anglais, focus why.
- Vérifier avec `cd solarview-site && npx tsc --noEmit` avant commit de wiring.

## File structure

| File | Responsibility |
|------|----------------|
| `solarview-site/messages/fr.json` | Copy FR `agency.caseStudies` |
| `solarview-site/messages/en.json` | Copy EN `agency.caseStudies` |
| `solarview-site/components/case-studies-section.tsx` | UI section 3 cases |
| `solarview-site/app/[locale]/page.tsx` | Wire section + footer |

---

### Task 1: Copy FR + EN (`agency.caseStudies`)

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

**Interfaces:**
- Produces: namespace keys `agency.caseStudies.heading`, `description`, `item1`…`item3` each with `client`, `sector`, `challenge`, `result`, `metric`

- [ ] **Step 1:** Sous `agency` (après `statement` ou avant `pain`), ajouter :

```json
"caseStudies": {
  "heading": "Résultats livrés",
  "description": "Trois projets récents. Données représentatives.",
  "item1": {
    "client": "Nova Industrie",
    "sector": "Industrie",
    "challenge": "Réponses aux appels d'offres trop lentes et manuelles.",
    "result": "Pipeline AO automatisé : extraction, rédaction assistée, validation humaine.",
    "metric": "−65 % temps"
  },
  "item2": {
    "client": "Cabinet Meridian",
    "sector": "Finance",
    "challenge": "Réconciliation paiements / factures sujette aux écarts.",
    "result": "Matching IA branché au SI comptable, exceptions traitées par l'équipe.",
    "metric": "99,2 % précision"
  },
  "item3": {
    "client": "Orbit SaaS",
    "sector": "B2B SaaS",
    "challenge": "Qualification leads coûteuse et inconsistante.",
    "result": "Agent d'outreach + scoring branché au CRM.",
    "metric": "×3 pipeline qualifié"
  }
}
```

EN équivalent :
- heading: `Outcomes delivered`
- description: `Three recent projects. Representative data.`
- item1: Nova Industry / Manufacturing / slow manual RFP responses / automated RFP pipeline… / −65% time
- item2: Meridian Partners / Finance / payment–invoice reconciliation gaps / AI matching wired to accounting stack / 99.2% accuracy
- item3: Orbit SaaS / B2B SaaS / costly inconsistent lead qualification / outreach agent + scoring in CRM / 3× qualified pipeline

- [ ] **Step 2:** Valider JSON (`node -e "JSON.parse(require('fs').readFileSync('…'))"` sur fr et en).

- [ ] **Step 3:** Commit `Add case studies copy for homepage section`

---

### Task 2: Créer `CaseStudiesSection`

**Files:**
- Create: `solarview-site/components/case-studies-section.tsx`

**Interfaces:**
- Consumes: props passées depuis la page (pas de `useTranslations` obligatoire — pattern ProcessSection : props string)
- Produces:

```tsx
export interface CaseStudyItem {
  client: string;
  sector: string;
  challenge: string;
  result: string;
  metric: string;
}

export interface CaseStudiesSectionProps {
  heading: string;
  description?: string;
  items: CaseStudyItem[]; // length 3 expected
  className?: string;
}

export function CaseStudiesSection(props: CaseStudiesSectionProps): JSX.Element
```

- [ ] **Step 1:** Créer le composant :
  - `section` avec `id="case-studies"`, `aria-labelledby="case-studies-heading"`
  - Fond `bg-background` ou `border-y border-border bg-card` (contraster avec `LetsTalkSection` blanc)
  - Header : `h2` + description optionnelle
  - Grille `grid gap-4 md:grid-cols-3`
  - Chaque item : `article` `rounded-2xl bg-muted p-6 md:p-8`
  - Badge secteur (`Badge variant="outline"`), métrique en mono uppercase
  - Titre client (`h3`), challenge + result en `text-muted-foreground`
  - Import `Badge` depuis `@/components/ui/badge`, `cn` depuis `@/lib/utils`

- [ ] **Step 2:** `cd solarview-site && npx tsc --noEmit` — doit passer (ou erreurs hors scope notées).

- [ ] **Step 3:** Commit `Add CaseStudiesSection for homepage proof points`

---

### Task 3: Brancher homepage (section + footer)

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`

**Interfaces:**
- Consumes: `CaseStudiesSection`, `Footer2`, `buildFooterMenuItems`, `buildFooterBottomLinks`, translations `agency.caseStudies.*`, `footer`, `site.footerTagline`, `site.copyright`

- [ ] **Step 1:** Imports : `CaseStudiesSection`, `Footer2`, `buildFooter*`, `BRAND` (déjà), `getTranslations` footer.

- [ ] **Step 2:** Après `MagicTextSection`, avant `LetsTalkSection` :

```tsx
<CaseStudiesSection
  heading={tAgency("caseStudies.heading")}
  description={tAgency("caseStudies.description")}
  items={[1, 2, 3].map((n) => ({
    client: tAgency(`caseStudies.item${n}.client`),
    sector: tAgency(`caseStudies.item${n}.sector`),
    challenge: tAgency(`caseStudies.item${n}.challenge`),
    result: tAgency(`caseStudies.item${n}.result`),
    metric: tAgency(`caseStudies.item${n}.metric`),
  }))}
/>
```

(Ou 3 objets explicites — les deux sont OK.)

- [ ] **Step 3:** Après `</main>`, ajouter footer identique à contact :

```tsx
<footer>
  <Footer2
    logo={{ url: "/", src: BRAND.logoSrc, alt: tSite("name"), title: tSite("name") }}
    tagline={tSite("footerTagline")}
    menuItems={buildFooterMenuItems(tFooter)}
    copyright={tSite("copyright")}
    bottomLinks={buildFooterBottomLinks(tFooter)}
  />
</footer>
```

avec `const tFooter = await getTranslations({ locale: typedLocale, namespace: "footer" });`

- [ ] **Step 4:** `cd solarview-site && npx tsc --noEmit`

- [ ] **Step 5:** Smoke : homepage charge ; section `#case-studies` avant formulaire ; footer visible en bas.

- [ ] **Step 6:** Commit `Wire case studies and Footer2 on homepage`
