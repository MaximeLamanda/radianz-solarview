# Agency Hero Invisible-Style Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refondre `AgencyHero` au style Invisible Tech (collage flottant + blocs template), avec un carrousel mobile 1 bloc / 3s.

**Architecture:** Extraire un sous-composant client `HeroMediaCollage` pour la rotation mobile et le collage desktop. `AgencyHero` garde le texte/CTA ; les slots sont un tableau de placeholders avec `src` optionnel. Retirer stats + mockup du hero.

**Tech Stack:** Next.js App Router, React client components, Tailwind, `next/image` (quand `src` fourni), i18n existant (`agency.hero`).

**Design doc:** `docs/plans/2026-07-22-agency-hero-invisible-design.md`

---

### Task 1: Définir les types et slots placeholder

**Files:**
- Modify: `solarview-site/components/agency-hero.tsx`

**Step 1: Remplacer l’interface props**

Retirer `stats`. Ajouter le type slot et une constante par défaut de 6 placeholders :

```tsx
export type HeroMediaSlot = {
  id: string;
  label: string;
  src?: string;
  alt?: string;
  /** Classes de position/taille desktop (absolute) */
  desktopClassName: string;
};

const DEFAULT_SLOTS: HeroMediaSlot[] = [
  {
    id: "1",
    label: "Image 1",
    desktopClassName:
      "hidden lg:block absolute left-[-2%] top-[8%] h-28 w-36 -rotate-6 xl:h-32 xl:w-40",
  },
  {
    id: "2",
    label: "Image 2",
    desktopClassName:
      "hidden lg:block absolute right-[-1%] top-[4%] h-36 w-28 rotate-3 xl:h-40 xl:w-32",
  },
  {
    id: "3",
    label: "Image 3",
    desktopClassName:
      "hidden md:block absolute left-[2%] bottom-[12%] h-24 w-40 rotate-2 lg:bottom-[18%]",
  },
  {
    id: "4",
    label: "Image 4",
    desktopClassName:
      "hidden md:block absolute right-[4%] bottom-[10%] h-32 w-32 -rotate-3 lg:bottom-[16%]",
  },
  {
    id: "5",
    label: "Image 5",
    desktopClassName:
      "hidden lg:block absolute left-[18%] top-[-2%] h-20 w-28 rotate-6",
  },
  {
    id: "6",
    label: "Image 6",
    desktopClassName:
      "hidden lg:block absolute right-[16%] bottom-[-4%] h-24 w-36 -rotate-2",
  },
];
```

Ajuster les classes au rendu visuel ; l’important est : `hidden` sous breakpoints + `absolute` + tailles variées.

**Step 2: Commit**

```bash
git add solarview-site/components/agency-hero.tsx
git commit -m "refactor(hero): define media slot types and default placeholders"
```

---

### Task 2: Créer `HeroMediaCollage` (client)

**Files:**
- Create: `solarview-site/components/hero-media-collage.tsx`

**Step 1: Implémenter le composant client**

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { HeroMediaSlot } from "@/components/agency-hero";

function MediaSlotFace({
  slot,
  className,
}: {
  slot: HeroMediaSlot;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-muted/60",
        className,
      )}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt ?? slot.label}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 160px"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-xs text-muted-foreground">
            {slot.label}
          </span>
        </div>
      )}
    </div>
  );
}

export function HeroMediaCollage({ slots }: { slots: HeroMediaSlot[] }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || slots.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slots.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [reduceMotion, slots.length]);

  const active = slots[index] ?? slots[0];

  return (
    <>
      {/* Mobile: un bloc au-dessus (le parent le place) */}
      <div className="relative mx-auto aspect-[4/3] w-full max-w-sm md:hidden">
        {active ? (
          <MediaSlotFace
            key={active.id}
            slot={active}
            className="absolute inset-0 animate-in fade-in duration-500"
          />
        ) : null}
      </div>

      {/* Desktop / tablet: collage absolute — rendu dans un wrapper relative du parent */}
      {slots.map((slot) => (
        <MediaSlotFace
          key={slot.id}
          slot={slot}
          className={cn("relative", slot.desktopClassName)}
        />
      ))}
    </>
  );
}
```

Notes d’implémentation :
- Si `animate-in` / `fade-in` n’existent pas dans le projet, utiliser `transition-opacity` + état local.
- Le collage desktop doit être enfant d’un wrapper `relative` du hero ; les classes `desktopClassName` portent le `absolute` + positions.
- Séparer clairement : mobile block vs desktop faces pour éviter que le carrousel mobile apparaisse aussi en absolute.

Version plus propre recommandée : deux zones explicites dans le JSX du parent (voir Task 3).

**Step 2: Commit**

```bash
git add solarview-site/components/hero-media-collage.tsx
git commit -m "feat(hero): add client media collage with 3s mobile rotation"
```

---

### Task 3: Refondre `AgencyHero` layout

**Files:**
- Modify: `solarview-site/components/agency-hero.tsx`

**Step 1: Nouveau markup**

Structure cible :

```tsx
<section className={cn("relative overflow-x-clip pt-10 pb-16 md:pt-16 md:pb-24", className)}>
  {/* fond grille de points optionnelle via CSS utilitaire */}
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(...)] opacity-40" />

  <div className="container relative">
    {/* Mobile carousel ABOVE title */}
    <div className="mb-8 md:hidden">
      <HeroMediaCollageMobile slots={slots} />
    </div>

    <div className="relative mx-auto max-w-3xl text-center">
      {/* Desktop floating slots — sibling absolute layer */}
      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden>
        <HeroMediaCollageDesktop slots={slots} />
      </div>

      {badge ? ... : null}
      <h1>...</h1>
      <p>...</p>
      <div className="... CTAs ...">...</div>
    </div>
  </div>
</section>
```

Retirer entièrement : grille de stats + mockup `radianz-mockup` / livrables.

Garder : badge, heading, description, CTAs (primaire + secondaire existants pour ne pas casser i18n).

Props finales :

```tsx
interface AgencyHeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttonPrimary: { text: string; href: string };
  buttonSecondary?: { text: string; href: string };
  slots?: HeroMediaSlot[];
  className?: string;
}
```

**Step 2: Vérifier visuellement**

Run: `npm run dev` (déjà actif dans `solarview-site`)  
Ouvrir `/fr` :
- Desktop : 4–6 blocs autour du titre, pas d’overflow horizontal
- Mobile (<768) : 1 bloc au-dessus, change toutes les 3s

**Step 3: Commit**

```bash
git add solarview-site/components/agency-hero.tsx solarview-site/components/hero-media-collage.tsx
git commit -m "feat(hero): Invisible-style floating collage layout"
```

---

### Task 4: Brancher la page d’accueil

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`

**Step 1: Retirer `stats` du call site**

```tsx
<AgencyHero
  badge={tAgency("hero.badge")}
  heading={tAgency("hero.heading")}
  description={tAgency("hero.description")}
  buttonPrimary={{ text: tAgency("hero.ctaPrimary"), href: "/contact" }}
  buttonSecondary={{ text: tAgency("hero.ctaSecondary"), href: "/#services" }}
/>
```

Les clés `hero.stat*` peuvent rester dans les JSON (YAGNI : pas de cleanup i18n obligatoire).

**Step 2: Commit**

```bash
git add solarview-site/app/[locale]/page.tsx
git commit -m "chore(home): drop hero stats props after collage refactor"
```

---

### Task 5: Polish mobile + reduced motion + smoke check

**Files:**
- Modify: `solarview-site/components/hero-media-collage.tsx` (si besoin)
- Modify: `solarview-site/components/agency-hero.tsx` (spacing)

**Step 1: Checklist manuelle**

- [ ] Mobile : bloc top, rotation 3s, crossfade doux
- [ ] `prefers-reduced-motion: reduce` → pas d’interval
- [ ] Desktop : texte lisible, blocs ne couvrent pas H1/CTA
- [ ] Pas de scroll horizontal
- [ ] Remplacer `src` sur un slot → image affichée (test manuel optionnel)

**Step 2: Commit final si ajustements**

```bash
git add solarview-site/components/agency-hero.tsx solarview-site/components/hero-media-collage.tsx
git commit -m "fix(hero): polish mobile carousel and desktop overlap"
```

---

## Notes for implementer

- Ne pas copier le wording / branding Invisible — uniquement la **forme**.
- Préserver tokens Radianz (`border-border`, `bg-muted`, boutons `lime` / `outline`).
- Pas de nouvelles deps.
- Commits fréquents par task.
