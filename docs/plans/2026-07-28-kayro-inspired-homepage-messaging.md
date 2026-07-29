# Kayro-inspired Homepage Messaging Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Réécrire le messaging homepage Radianz (FR+EN) dans l’esprit Kayro (urgence + builders), afficher la sous-ligne hero, garder les slots média vides.

**Architecture:** Copy via `next-intl` dans `messages/fr.json` et `messages/en.json`. `AgencyHero` reçoit `description` et l’affiche sous le H1. Collages existants restent sans `src`. Structure de page inchangée.

**Tech Stack:** Next.js App Router, next-intl, React/TSX, Tailwind.

## Global Constraints

- Ne pas cloner Kayro mot pour mot ; garder la voix Radianz (web & IA, sprints).
- Conserver les chiffres existants : `50+`, `+40%`, `2 sem.` / `2 wks`, montants pain, prix offres.
- Ne pas ajouter de `src` aux slots hero ; placeholders uniquement.
- Mettre à jour FR et EN en parallèle (mêmes clés).
- Travailler dans le workspace courant (WIP homepage déjà présent) — pas de worktree.
- Commits fréquents par tâche ; ne pas push.
- Vérifier avec `npx tsc --noEmit` dans `solarview-site/` (pas de suite de tests i18n dédiée).

---

### Task 1: Afficher la description hero + garder slots vides

**Files:**
- Modify: `solarview-site/components/agency-hero.tsx`
- Modify: `solarview-site/app/[locale]/page.tsx`
- Verify: slots dans `agency-hero.tsx` / `hero-media-collage.tsx` n’ont pas de `src`

**Step 1: Ajouter `description` à `AgencyHero`**

Dans `agency-hero.tsx` :
- Ajouter `description?: string` aux props
- Sous le `<h1>`, si `description` est fourni, rendre :

```tsx
<p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
  {description}
</p>
```

- Ordre : heading → description → boutons
- Ne pas modifier `DEFAULT_SLOTS` (déjà sans `src`)

**Step 2: Brancher depuis la homepage**

Dans `page.tsx`, passer :

```tsx
<AgencyHero
  heading={tAgency("hero.heading")}
  description={tAgency("hero.description")}
  buttonPrimary={{ text: tAgency("hero.ctaPrimary"), href: "/contact" }}
  buttonSecondary={{ text: tAgency("hero.ctaSecondary"), href: "/#services" }}
/>
```

**Step 3: Vérifier**

Run: `cd solarview-site && npx tsc --noEmit`  
Expected: exit 0

**Step 4: Commit**

```bash
git add solarview-site/components/agency-hero.tsx solarview-site/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
feat(hero): show supporting description under headline

EOF
)"
```

---

### Task 2: Réécrire le copy FR (`agency` + `site` tagline/meta)

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/lib/constants.ts` (aligner `SITE.tagline` / `vision` / `badge` si présents)

**Step 1: Remplacer les valeurs suivantes (clés exactes)**

`site`:
- `tagline`: `De la stratégie IA à la production, à la vitesse d'une startup.`
- `vision`: `Une équipe de builders qui tranche, construit et met en production — comme si on était associés.`
- `footerTagline`: `De l'audit à la production. On livre le résultat, pas du temps.`
- `metaTitle`: `Agence IA & Web | De la stratégie à la production | RADIANZ`
- `metaDescription`: `Radianz, partenaire web & IA : audit, agents, plateformes. De la stratégie à la production, à la vitesse d'une startup.`
- `schemaDescription`: `Agence IA & Web : de la stratégie à la production — automatisation, agents, plateformes sur mesure.`

`agency.hero`:
- `badge`: `Agence IA & Web`
- `heading`: `Prenez de l'avance. Disruptez votre marché avant d'être disrupté.`
- `description`: `Votre partenaire web & IA, de l'audit à la production, à la vitesse d'une startup. On décide, on construit, on industrialise.`
- `ctaPrimary`: `Rendez-vous avec un expert`
- `ctaSecondary`: `Découvrir nos offres`
- garder `stat1Value`…`stat3Label` inchangés

`agency.trust.title`: `Ils nous font confiance`

`agency.pain`:
- `heading`: `Vous optimisez des process. D'autres réécrivent les règles du jeu.`
- `subheading`: `Trop d'outils, trop peu d'IA utile. On scanne vos opportunités, on construit ce qui compte, on ignore le reste.`
- `point1Title`: `Vous courez après des gains marginaux`
- `point1Solution`: `On vise les leviers qui changent vos marges et votre façon de livrer.`
- `point2Title`: `Vos outils ne forment pas un système`
- `point2Solution`: `On les connecte et on automatise le flux réel — pas une démo hors SI.`
- `point3Title`: `Vos projets digitaux s'éternisent`
- `point3Solution`: `On code, on déploie, on industrialise. Premiers résultats en sprints courts.`
- `cta`: `Passer à l'offensive`
- garder les `point*Amount`

`agency.services`:
- `badge`: `Nos expertises`
- `heading`: `De la stratégie à la production. Sans détour.`
- `description`: `Décider quoi lancer. Construire le chemin le plus simple. Industrialiser dans votre SI.`
- `service1Title`: `Audit IA`
- `service1Desc`: `On scanne vos opportunités et vos données, on chiffre le ROI, on recommande quoi lancer — et surtout quoi ignorer.`
- `service2Title`: `Plateforme web & IA`
- `service2Desc`: `Du sur-mesure au bon outil : agents, workflows, plateformes. Jamais plus de complexité que nécessaire.`
- `service3Title`: `Accompagnement IA`
- `service3Desc`: `On branche à votre SI, on forme vos équipes, on rend autonome. On part quand vous n'avez plus besoin de nous.`
- `cta`: `Réserver un appel découverte`

`agency.stats`:
- `heading`: `Des résultats livrés, pas du temps facturé.`
- `description`: `De la startup au grand groupe, on transforme l'IA en avantage concurrentiel — équipe senior, sprints courts.`
- garder values/labels/sublabels chiffres
- `stat1Sublabel`: `Conçues et livrées par une équipe senior, en sprints courts.`
- `stat2Sublabel`: `Premiers résultats visibles sous deux semaines.`
- `quote`: `Sur un marché saturé de gourous IA, Radianz tranche et livre. Propositions concrètes, équipe senior, zéro blabla.`
- author/role/company inchangés

`agency.comparison`:
- `heading`: `Radianz vs prestataires traditionnels`
- `description`: `L'exigence d'associés. La vitesse d'une startup. Le risque de livraison de notre côté.`
- `row1Radianz`: `Onboarding 48h, sprint immédiat.`
- `row2Radianz`: `Sprints cadrés, flexibilité totale.`
- `row3Radianz`: `IA de pointe, code prêt pour la prod.`
- `row4Radianz`: `Accès direct aux fondateurs.`
- `row5Radianz`: `Résultats dès le premier sprint.`
- `row6Radianz`: `Partenaire produit long terme.`
- garder colonnes traditional + labels
- `highlight1Title`: `Senior dès le premier jour`
- `highlight1Desc`: `Pas de recrutement ni de montée en charge : des experts opérationnels dès le premier sprint.`
- `highlight2Title`: `La vélocité change l'équation`
- `highlight2Desc`: `On livre en un sprint ce que d'autres mettent des mois à produire.`
- `highlight3Title`: `Une collab d'associés`
- `highlight3Desc`: `On challenge vos choix comme si on était dans la boîte — pas comme un prestataire distant.`

`agency.pricing`:
- `heading`: `Vous payez le résultat livré, pas le temps passé.`
- `description`: `Deux portes d'entrée. Un même standard : des livrables utilisables, vite.`
- garder noms/prix/features/CTAs des offres

`agency.process`:
- `heading`: `Décider. Construire. Industrialiser.`
- `description`: `Vous gardez la vision. On tranche, on code, on branche. Chaque semaine, quelque chose de tangible.`
- `step1Title`: `On cadre l'opportunité`
- `step1Desc`: `Appel découverte : on scanne process et données, et on dit clairement quoi lancer — et quoi ignorer.`
- `step2Title`: `On construit le chemin le plus simple`
- `step2Desc`: `Du sur-mesure au bon outil : zéro complexité inutile. Vous suivez l'avancement en continu.`
- `step3Title`: `On met en production et on vous laisse autonomes`
- `step3Desc`: `Intégration SI, formation, documentation. On part quand vous n'avez plus besoin de nous.`
- garder `step1`/`step2`/`step3` labels

`agency.faq`:
- `heading`: `Les questions qu'on nous pose vraiment`
- `q1`: `Qu'est-ce qui distingue Radianz des autres agences IA ?`
- `a1`: `On construit comme des fondateurs : sprints courts, livraisons hebdo, accès direct. Pas d'intermédiaires, pas de slides sans suite.`
- `q2`: `Comment livrez-vous plus vite ?`
- `a2`: `Démarrage en 48h, itérations d'une semaine, stack IA moderne — sans sacrifier la qualité production.`
- `q3`: `Suis-je impliqué dans le process ?`
- `a3`: `Oui. Chaque sprint est co-construit. Vous validez la direction ; on porte l'exécution.`
- `q4`: `Quels gains attendre de l'IA ?`
- `a4`: `En moyenne +40% de productivité sur les process automatisés, avec un ROI visible dès les premières semaines — quand on vise les bons leviers.`
- `q5`: `Je ne suis pas expert IA. Vous m'aidez à y voir clair ?`
- `a5`: `C'est le rôle de l'audit : opportunités concrètes, sans jargon, roadmap priorisée (et ce qu'il faut ignorer).`

`agency.cta`:
- `heading`: `L'avance se prend maintenant.`
- `description`: `Disruptez votre marché avant d'être disrupté. 15 minutes avec un expert pour cadrer le prochain move.`
- `cta`: `Commencer votre projet`

Aligner `lib/constants.ts` `SITE.tagline` / `vision` avec `site.tagline` / `site.vision` FR.

**Step 2: Valider JSON**

Run: `cd solarview-site && node -e "JSON.parse(require('fs').readFileSync('messages/fr.json','utf8')); console.log('fr ok')"`  
Expected: `fr ok`

**Step 3: Commit**

```bash
git add solarview-site/messages/fr.json solarview-site/lib/constants.ts
git commit -m "$(cat <<'EOF'
content(fr): rewrite homepage copy with Kayro-inspired urgency

EOF
)"
```

---

### Task 3: Réécrire le copy EN (miroir Task 2)

**Files:**
- Modify: `solarview-site/messages/en.json`

**Step 1: Remplacer les valeurs EN**

`site`:
- `tagline`: `From AI strategy to production, at startup speed.`
- `vision`: `A team of builders who decide, ship, and put AI in production — as if we were co-founders.`
- `footerTagline`: `From audit to production. You pay for delivered outcomes, not hours.`
- `metaTitle`: `AI & Web Agency | From strategy to production | RADIANZ`
- `metaDescription`: `Radianz, your web & AI partner: audit, agents, platforms. From strategy to production, at startup speed.`
- `schemaDescription`: `AI & Web agency: from strategy to production — automation, agents, custom platforms.`

`agency.hero`:
- `heading`: `Get ahead. Disrupt your market before it disrupts you.`
- `description`: `Your web & AI partner, from audit to production, at startup speed. We decide, we build, we industrialize.`
- `ctaPrimary`: `Book a call with an expert`
- `ctaSecondary`: `Explore our offers`

`agency.pain`:
- `heading`: `You're optimizing processes. Others are rewriting the rules.`
- `subheading`: `Too many tools, too little useful AI. We scan opportunities, build what matters, and ignore the rest.`
- `point1Title`: `You're chasing marginal gains`
- `point1Solution`: `We target the levers that change your margins and how you deliver.`
- `point2Title`: `Your tools aren't a system`
- `point2Solution`: `We connect them and automate the real flow — not a demo outside your stack.`
- `point3Title`: `Your digital projects drag on`
- `point3Solution`: `We code, deploy, industrialize. First results in short sprints.`
- `cta`: `Go on the offensive`

`agency.services`:
- `heading`: `From strategy to production. No detours.`
- `description`: `Decide what to launch. Build the simplest path. Industrialize into your systems.`
- `service1Desc`: `We scan opportunities and data, size the ROI, and recommend what to launch — and what to ignore.`
- `service2Desc`: `From custom build to the right tool: agents, workflows, platforms. Never more complexity than needed.`
- `service3Desc`: `We plug into your stack, train your teams, and make you autonomous. We leave when you no longer need us.`

`agency.stats`:
- `heading`: `You pay for outcomes delivered, not time spent.`
- `description`: `From startup to enterprise, we turn AI into competitive advantage — senior team, short sprints.`
- `stat1Sublabel`: `Designed and shipped by a senior team, in short sprints.`
- `stat2Sublabel`: `First results visible within two weeks.`
- `quote`: `In a market full of AI gurus, Radianz cuts through and ships. Concrete proposals, senior team, zero fluff.`

`agency.comparison`:
- `description`: `Co-founder rigor. Startup speed. Delivery risk on our side.`
- `highlight3Title`: `Partnership, not vendor mode`
- `highlight3Desc`: `We challenge your choices as if we were in the company — not a distant vendor.`

`agency.pricing`:
- `heading`: `You pay for the outcome delivered, not the hours.`
- `description`: `Two entry points. One standard: usable deliverables, fast.`

`agency.process`:
- `heading`: `Decide. Build. Industrialize.`
- `description`: `You keep the vision. We decide, code, and plug in. Every week, something tangible.`
- `step1Title`: `We frame the opportunity`
- `step1Desc`: `Discovery call: we scan processes and data, and say clearly what to launch — and what to ignore.`
- `step2Title`: `We build the simplest path`
- `step2Desc`: `Custom or right tool: zero unnecessary complexity. You track progress continuously.`
- `step3Title`: `We ship to production and leave you autonomous`
- `step3Desc`: `Stack integration, training, docs. We leave when you no longer need us.`

`agency.faq`:
- `heading`: `The questions people actually ask`
- `q1`: `What sets Radianz apart from other AI agencies?`
- `a1`: `We build like founders: short sprints, weekly delivery, direct access. No middlemen, no slides without follow-through.`
- `q2`: `How do you deliver faster?`
- `a2`: `Start in 48h, one-week iterations, modern AI stack — without sacrificing production quality.`
- `q3`: `Am I involved throughout?`
- `a3`: `Yes. Every sprint is co-built. You own the direction; we own execution.`
- `q4`: `What gains should I expect from AI?`
- `a4`: `On average +40% productivity on automated processes, with ROI visible in the first weeks — when we hit the right levers.`
- `q5`: `I'm not an AI expert. Can you help me see clearly?`
- `a5`: `That's what the audit is for: concrete opportunities, no jargon, prioritized roadmap (and what to ignore).`

`agency.cta`:
- `heading`: `The lead starts now.`
- `description`: `Disrupt your market before it disrupts you. 15 minutes with an expert to frame the next move.`
- `cta`: `Start your project`

Aligner aussi les autres clés touchées en FR (badge services, titles Audit/Platform/Guidance, comparison rows Radianz side, etc.) pour rester miroir.

**Step 2: Valider JSON + types**

Run:
```bash
cd solarview-site && node -e "JSON.parse(require('fs').readFileSync('messages/en.json','utf8')); console.log('en ok')" && npx tsc --noEmit
```
Expected: `en ok` + exit 0

**Step 3: Commit**

```bash
git add solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
content(en): mirror Kayro-inspired homepage messaging

EOF
)"
```

---

## Progress ledger

Créer/mettre à jour `.superpowers/sdd/progress.md` après chaque tâche approuvée.
