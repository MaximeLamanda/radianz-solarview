# Business Use Cases Carousel Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Ajouter une section homepage carousel (shadcn) montrant 6 cas d’usage métier via des cartes gradient + formes géométriques.

**Architecture:** Installer le primitive shadcn `carousel` (Embla). Créer un composant client `UseCasesCarousel` qui rend un titre de section + un carousel multi-items (basis 100% / 50% / 33%). Chaque slide = zone visuelle CSS (gradient + forme géométrique centrée) + titre sous la zone. Copy i18n FR/EN sous `agency.useCases`. Brancher sous le hero/logos sur la homepage.

**Tech Stack:** Next.js App Router, next-intl, shadcn/ui Carousel (Embla), React/TSX, Tailwind, Lucide (flèches carousel uniquement).

## Global Constraints

- Carousel = composant shadcn `carousel` (pas de lib carousel custom, pas de block shadcnblocks).
- Cartes = CSS only : gradient + forme géométrique au centre ; **pas** de photos réelles ; **pas** d’icônes Lucide dans les formes.
- Titre du cas d’usage **sous** la zone visuelle (pas overlay).
- Basis : `basis-full` mobile, `md:basis-1/2`, `lg:basis-1/3` ; flèches prev/next ; **pas** d’autoplay.
- Placement temporaire : sous le bloc logos dans `page.tsx` (après `AgencyHero`).
- Mettre à jour FR et EN en parallèle (mêmes clés).
- Travailler dans le workspace courant (WIP homepage) — pas de worktree.
- Commits fréquents par tâche ; ne pas push.
- Vérifier avec `npx tsc --noEmit` dans `solarview-site/` (pas de suite de tests dédiée).
- Respecter le look Radianz existant (tokens CSS, lime, typo) ; éviter violet générique / glassmorphism excessif.

---

### Task 1: Installer shadcn carousel

**Files:**
- Create: `solarview-site/components/ui/carousel.tsx` (via CLI)
- Possibly update: `solarview-site/package.json` (embla-carousel-react)

**Step 1: Installer le composant**

```bash
cd solarview-site && npx shadcn@latest add carousel -y
```

Expected: `components/ui/carousel.tsx` créé ; dépendance Embla ajoutée.

**Step 2: Vérifier**

```bash
cd solarview-site && test -f components/ui/carousel.tsx && npx tsc --noEmit
```

Expected: fichier présent, exit 0.

**Step 3: Commit**

```bash
git add solarview-site/components/ui/carousel.tsx solarview-site/package.json solarview-site/package-lock.json
git commit -m "$(cat <<'EOF'
chore: add shadcn carousel primitive

EOF
)"
```

---

### Task 2: Copy i18n FR + EN (`agency.useCases`)

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

**Step 1: Ajouter le bloc FR**

Dans `agency`, après `trust` (ou avant `pain`), ajouter :

```json
"useCases": {
  "heading": "Ce que l'IA change dans vos métiers",
  "description": "Des automatisations concrètes, adaptées à vos process — pas des démos hors sol.",
  "item1": "Rechercher des informations dans un grand volume de documents",
  "item2": "Réconcilier paiements et factures avec précision pour éviter les écarts",
  "item3": "Identifier des prospects et les contacter automatiquement",
  "item4": "Automatiser la réponse aux appels d'offres",
  "item5": "Vérifier les contrats et documents juridiques",
  "item6": "Automatiser le support client avec un chatbot",
  "previous": "Précédent",
  "next": "Suivant"
}
```

**Step 2: Ajouter le bloc EN**

Mêmes clés :

```json
"useCases": {
  "heading": "What AI changes in your business",
  "description": "Concrete automations fitted to your processes — not demos that ignore your stack.",
  "item1": "Search information across large document volumes",
  "item2": "Reconcile payments and invoices precisely to avoid discrepancies",
  "item3": "Identify prospects and reach out automatically",
  "item4": "Automate responses to tenders and RFPs",
  "item5": "Review contracts and legal documents",
  "item6": "Automate customer support with a chatbot",
  "previous": "Previous",
  "next": "Next"
}
```

**Step 3: Vérifier JSON valide**

```bash
cd solarview-site && node -e "JSON.parse(require('fs').readFileSync('messages/fr.json','utf8')); JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('ok')"
```

Expected: `ok`

**Step 4: Commit**

```bash
git add solarview-site/messages/fr.json solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
content: add use-cases carousel copy (FR+EN)

EOF
)"
```

---

### Task 3: Créer `UseCasesCarousel` (cartes géométriques + shadcn carousel)

**Files:**
- Create: `solarview-site/components/use-cases-carousel.tsx`

**Step 1: Implémenter le composant**

Créer un client component avec cette structure (adapter les imports au projet) :

```tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export type UseCaseShape =
  | "circle"
  | "hexagon"
  | "diamond"
  | "rounded-square"
  | "triangle"
  | "ring";

export interface UseCaseItem {
  title: string;
  gradient: string; // Tailwind classes e.g. "from-... via-... to-..."
  shape: UseCaseShape;
}

interface UseCasesCarouselProps {
  heading: string;
  description: string;
  items: UseCaseItem[];
  previousLabel: string;
  nextLabel: string;
  className?: string;
}

function GeometricShape({ shape }: { shape: UseCaseShape }) {
  const base = "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
  switch (shape) {
    case "circle":
      return (
        <div
          className={cn(base, "size-24 rounded-full bg-white/35 shadow-sm md:size-28")}
          aria-hidden
        />
      );
    case "hexagon":
      return (
        <div
          className={cn(base, "size-24 bg-white/35 md:size-28")}
          style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          aria-hidden
        />
      );
    case "diamond":
      return (
        <div
          className={cn(base, "size-20 rotate-45 rounded-md bg-white/35 md:size-24")}
          aria-hidden
        />
      );
    case "rounded-square":
      return (
        <div
          className={cn(base, "size-24 rounded-2xl bg-white/35 md:size-28")}
          aria-hidden
        />
      );
    case "triangle":
      return (
        <div
          className={cn(base, "size-24 bg-white/35 md:size-28")}
          style={{ clipPath: "polygon(50% 8%, 100% 92%, 0% 92%)" }}
          aria-hidden
        />
      );
    case "ring":
      return (
        <div
          className={cn(
            base,
            "size-24 rounded-full border-[14px] border-white/40 bg-transparent md:size-28",
          )}
          aria-hidden
        />
      );
  }
}

export function UseCasesCarousel({
  heading,
  description,
  items,
  previousLabel,
  nextLabel,
  className,
}: UseCasesCarouselProps) {
  return (
    <section
      id="use-cases"
      className={cn("relative py-16 md:py-24", className)}
      aria-labelledby="use-cases-heading"
    >
      <div className="container">
        <div className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <h2
            id="use-cases-heading"
            className="text-2xl font-normal tracking-[-0.03em] text-balance md:text-4xl"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
            {description}
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: false }}
          className="mx-auto w-full max-w-6xl"
        >
          <CarouselContent className="-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={`${item.shape}-${index}`}
                className="basis-full pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <article className="flex h-full flex-col gap-4">
                  <div
                    className={cn(
                      "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br",
                      item.gradient,
                    )}
                  >
                    <GeometricShape shape={item.shape} />
                  </div>
                  <p className="text-sm leading-snug text-foreground md:text-base">
                    {item.title}
                  </p>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:inline-flex" aria-label={previousLabel} />
          <CarouselNext className="hidden sm:inline-flex" aria-label={nextLabel} />
        </Carousel>
      </div>
    </section>
  );
}
```

**Step 2: Vérifier types**

```bash
cd solarview-site && npx tsc --noEmit
```

Expected: exit 0

**Step 3: Commit**

```bash
git add solarview-site/components/use-cases-carousel.tsx
git commit -m "$(cat <<'EOF'
feat: add use-cases carousel with geometric cards

EOF
)"
```

---

### Task 4: Brancher la section sur la homepage

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`

**Step 1: Importer et rendre**

Importer `UseCasesCarousel`. Après `<AgencyHero ... />` (qui contient déjà `logos`), ajouter la section dans `<main>` :

```tsx
import { UseCasesCarousel } from "@/components/use-cases-carousel";

// dans le return, après AgencyHero :
<UseCasesCarousel
  heading={tAgency("useCases.heading")}
  description={tAgency("useCases.description")}
  previousLabel={tAgency("useCases.previous")}
  nextLabel={tAgency("useCases.next")}
  items={[
    {
      title: tAgency("useCases.item1"),
      shape: "circle",
      gradient: "from-lime/80 via-[#d4e8c2] to-[#a8c5b0]",
    },
    {
      title: tAgency("useCases.item2"),
      shape: "hexagon",
      gradient: "from-[#c5d4e8] via-[#e8eef5] to-[#9bb0c9]",
    },
    {
      title: tAgency("useCases.item3"),
      shape: "diamond",
      gradient: "from-[#e8d5c5] via-[#f5ebe3] to-[#c9a892]",
    },
    {
      title: tAgency("useCases.item4"),
      shape: "rounded-square",
      gradient: "from-[#d5e8e0] via-[#eef5f2] to-[#8fb5a5]",
    },
    {
      title: tAgency("useCases.item5"),
      shape: "triangle",
      gradient: "from-[#e8e0d5] via-[#f5f0e8] to-[#b5a48f]",
    },
    {
      title: tAgency("useCases.item6"),
      shape: "ring",
      gradient: "from-[#d5dde8] via-[#eef1f5] to-[#8f9bb5]",
    },
  ]}
/>
```

Structure attendue de `<main>` :

```tsx
<main id="hero">
  <AgencyHero ... logos={<Logos18 />} />
  <UseCasesCarousel ... />
</main>
```

**Step 2: Vérifier**

```bash
cd solarview-site && npx tsc --noEmit
```

Expected: exit 0

**Step 3: Commit**

```bash
git add solarview-site/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
feat(home): mount use-cases carousel under hero logos

EOF
)"
```

---
