# SEO + GEO Audit IA — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Renforcer le SEO organique et le GEO de radianz.tech autour du pilier « Agence IA » et de la page service P0 `/services/audit-ia`, avec schema FAQ/Service, maillage, article aligné et baseline de citations.

**Architecture:** Registre services + page locale Next.js (pattern `/industries`), helpers JSON-LD dans `lib/seo.ts`, copy i18n dans `messages/{fr,en}.json`, article markdown dans `content/articles/`, sitemap étendu. Pas d’Ads en sprint 1.

**Tech Stack:** Next.js 15 App Router, next-intl, TypeScript, Schema.org JSON-LD, Markdown articles (`lib/parse-article`)

**Design:** @docs/plans/2026-08-07-seo-geo-audit-ia-design.md  
**Skills:** @seo-audit, @humanizer (contenu), @verification-before-completion

---

### Task 1: Registre services + helpers schema SEO

**Files:**
- Create: `solarview-site/lib/services.ts`
- Modify: `solarview-site/lib/seo.ts`

**Step 1: Créer le registre services**

```ts
// solarview-site/lib/services.ts
import type { Locale } from "@/i18n/config";

export const SERVICE_IDS = ["audit-ia"] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const SERVICES: Record<
  ServiceId,
  {
    pathByLocale: Record<Locale, string>;
    primaryKeywordFr: string;
    primaryKeywordEn: string;
  }
> = {
  "audit-ia": {
    pathByLocale: {
      fr: "/services/audit-ia",
      en: "/services/ai-audit",
    },
    primaryKeywordFr: "audit IA",
    primaryKeywordEn: "AI audit",
  },
};

export function servicePath(locale: Locale, id: ServiceId): string {
  return SERVICES[id].pathByLocale[locale];
}
```

**Step 2: Ajouter builders JSON-LD dans `lib/seo.ts`**

Ajouter (sans casser les exports existants) :

```ts
export type FaqItem = { question: string; answer: string };

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  url: string;
  providerName: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: input.url,
    provider: {
      "@type": "Organization",
      name: input.providerName,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: input.areaServed ?? "France",
    },
  };
}
```

**Step 3: Vérifier TypeScript**

Run: `cd solarview-site && npx tsc --noEmit -p tsconfig.json 2>&1 | head -40`  
Expected: pas d’erreurs liées à `services.ts` / `seo.ts`

**Step 4: Commit** (si l’utilisateur a demandé un commit)

```bash
git add solarview-site/lib/services.ts solarview-site/lib/seo.ts
git commit -m "$(cat <<'EOF'
feat(seo): add services registry and FAQ/Service JSON-LD helpers

EOF
)"
```

---

### Task 2: Copy i18n page Audit IA (FR + EN)

**Files:**
- Modify: `solarview-site/messages/fr.json`
- Modify: `solarview-site/messages/en.json`

**Step 1: Ajouter namespace `servicesPages.audit` dans `fr.json`**

Inclure au minimum :
- `metaTitle`, `metaDescription`
- `badge`, `heading`, `description` (hero)
- `forWhoTitle` + 3–4 bullets
- `processTitle` + 4 étapes (titre + texte 1–2 phrases)
- `deliverablesTitle` + liste livrables (alignée pricing existant)
- `proofTitle` + lien vers cas clients
- `faq` : tableau de 5 Q/R (réponses 40–60 mots, ton RADIANZ)
- `ctaTitle`, `ctaDescription`, `ctaButton`
- Questions types GEO : « Qu’est-ce qu’un audit IA ? », « Combien de temps ? », « Pour qui ? », « Que livre-t-on ? », « Différence vs consulting classique ? »

**Step 2: Miroir EN dans `en.json`** (`servicesPages.audit`)

**Step 3: Humanizer** — relire FR pour supprimer tournures IA génériques (skill humanizer)

**Step 4: Commit** (si demandé)

```bash
git add solarview-site/messages/fr.json solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
content: add Audit IA service page copy (FR/EN)

EOF
)"
```

---

### Task 3: Composant page + route `/services/audit-ia`

**Files:**
- Create: `solarview-site/components/service-audit-page.tsx`
- Create: `solarview-site/app/[locale]/services/audit-ia/page.tsx`
- Optional EN alias: middleware / dual path via `lib/services.ts` — **simplifier sprint 1** : une seule route slug `audit-ia` pour FR et EN (comme `/industries`), path EN copy « AI audit » dans meta. Éviter deux slugs sauf si middleware i18n le gère déjà facilement.

**Décision d’implémentation (YAGNI) :**  
Route unique : `app/[locale]/services/audit-ia/page.tsx` pour `fr` et `en` (comme industries). Mettre à jour `lib/services.ts` en conséquence (`pathByLocale` → même path `/services/audit-ia`).

**Step 1: Créer `service-audit-page.tsx`**

Sections (une composition, pas un dashboard de cards) :
1. Hero : badge + H1 (keyword Audit IA) + 1 phrase + CTA → `/contact`
2. Pour qui (liste)
3. Process (étapes numérotées)
4. Livrables
5. Preuve / lien cas clients
6. FAQ visible (mêmes items que schema)
7. CTA final

Réutiliser patterns typographiques homepage (`text-section`, `container`, etc.).

**Step 2: Créer la page**

Pattern metadata = `industries/page.tsx` :
- `generateMetadata` namespace `servicesPages.audit`
- JSON-LD : `buildServiceJsonLd` + `buildFaqPageJsonLd` (+ BreadcrumbList optionnel)
- Navbar / Footer identiques aux autres pages
- `canonical`: `/${locale}/services/audit-ia`

**Step 3: Build check**

Run: `cd solarview-site && npm run build 2>&1 | tail -50`  
Expected: route `/fr/services/audit-ia` et `/en/services/audit-ia` générées sans erreur

**Step 4: Commit** (si demandé)

```bash
git add solarview-site/components/service-audit-page.tsx \
  solarview-site/app/[locale]/services/audit-ia/page.tsx \
  solarview-site/lib/services.ts
git commit -m "$(cat <<'EOF'
feat: add Audit IA service page with Service and FAQ schema

EOF
)"
```

---

### Task 4: Sitemap, nav, footer — maillage P0

**Files:**
- Modify: `solarview-site/app/sitemap.ts`
- Modify: `solarview-site/lib/footer-menu.ts`
- Modify: `solarview-site/components/navbar1.tsx`
- Modify: `solarview-site/lib/case-studies.ts` (export slugs déjà présent)
- Modify: `solarview-site/app/[locale]/page.tsx` (lien services → page audit si pertinent)

**Step 1: Sitemap**

Ajouter aux `routes` : `"/services/audit-ia"`.  
Ajouter les case studies :

```ts
import { CASE_STUDY_SLUGS } from "@/lib/case-studies";
// pour chaque locale + slug → `${SITE_URL}/${locale}/case-studies/${slug}`
```

**Step 2: Footer** — `audit` url : `/services/audit-ia` (plus `/#offre-audit`)

**Step 3: Navbar** — dans le sous-menu Services (`navbar1.tsx`), pointer Audit vers `/services/audit-ia`

**Step 4: Homepage** — dans la section pricing / services, CTA secondaire ou lien « En savoir plus » vers `/services/audit-ia` (sans casser le design existant)

**Step 5: Build + smoke**

Run: `cd solarview-site && npm run build 2>&1 | tail -30`  
Vérifier sitemap contient audit-ia + case-studies

**Step 6: Commit** (si demandé)

```bash
git add solarview-site/app/sitemap.ts solarview-site/lib/footer-menu.ts \
  solarview-site/components/navbar1.tsx solarview-site/app/[locale]/page.tsx
git commit -m "$(cat <<'EOF'
seo: wire Audit IA into sitemap, nav, and footer

EOF
)"
```

---

### Task 5: Renforcer pilier homepage (GEO)

**Files:**
- Modify: `solarview-site/app/[locale]/page.tsx`
- Modify: `solarview-site/messages/fr.json` (namespace `agency` ou nouveau `homeFaq`)
- Modify: `solarview-site/messages/en.json`
- Create (si besoin): `solarview-site/components/home-faq-section.tsx`

**Step 1: Ajouter 4–5 FAQ homepage** ciblant « agence IA », audit, agents, délais, pour qui — réponses citables 40–60 mots

**Step 2: Section FAQ avant footer / avant LetsTalk** (discrète, alignée design existant — pas une grille de cards marketing)

**Step 3: Étendre `homeJsonLd` `@graph`** avec `FAQPage` via `buildFaqPageJsonLd`

**Step 4: Optionnel** — enrichir `ProfessionalService` avec `hasOfferCatalog` pointant vers Audit IA URL

**Step 5: Build**

Run: `cd solarview-site && npm run build 2>&1 | tail -30`

**Step 6: Commit** (si demandé)

```bash
git add solarview-site/app/[locale]/page.tsx \
  solarview-site/components/home-faq-section.tsx \
  solarview-site/messages/fr.json solarview-site/messages/en.json
git commit -m "$(cat <<'EOF'
seo: add homepage FAQ schema for Agence IA pillar

EOF
)"
```

---

### Task 6: Article « Audit IA » (FR + EN) + humanizer

**Files:**
- Create: `solarview-site/content/articles/fr/audit-ia-entreprise-2026.md`
- Create: `solarview-site/content/articles/en/ai-audit-for-business-2026.md`
- Modify: éventuellement covers dans `public/` (réutiliser image existante si pas d’asset dédié)

**Step 1: Frontmatter FR**

```yaml
slug: audit-ia-entreprise-2026
title: "Audit IA en entreprise : méthode, livrables et ROI"
excerpt: "..."
primaryKeyword: audit IA entreprise
translationKey: ai-audit-2026
status: published
author: Equipe Radianz
```

**Step 2: Corps** — 1200–1800 mots, H2/H3 clairs, listes, définition citables, lien interne vers `/fr/services/audit-ia` et `/fr/contact`. Pas de fluff. Passer au skill humanizer.

**Step 3: Version EN** miroir avec `translationKey: ai-audit-2026`

**Step 4: Vérifier parsing**

Run: `cd solarview-site && node -e "const {getAllArticles}=require('./lib/parse-article.ts')"`  
Ou build Next — articles doivent apparaître dans `/articles` et sitemap

**Step 5: Commit** (si demandé)

```bash
git add solarview-site/content/articles/fr/audit-ia-entreprise-2026.md \
  solarview-site/content/articles/en/ai-audit-for-business-2026.md
git commit -m "$(cat <<'EOF'
content: publish Audit IA article (FR/EN) for SEO and GEO

EOF
)"
```

---

### Task 7: Déprioriser articles solaires hors positionnement

**Files:**
- Modify: `solarview-site/content/articles/fr/prospection-solaire-b2b-2026.md`
- Modify: `solarview-site/content/articles/fr/loi-aper-solarisation-batiments-parkings-2026.md`
- Modify: équivalents EN s’ils existent
- Modify: `solarview-site/lib/parse-article.ts` et/ou page article si `status` / `noindex` supporté

**Step 1: Inspecter** si le frontmatter `status` gère déjà le filtrage listing

**Step 2: Options (choisir la moins destructive) :**
- **A (recommandé sprint 1) :** garder publiés mais retirer du listing homepage featured ; ajouter en tête un encart « Contexte historique plateforme solaire » + liens vers Audit IA
- **B :** `robots: noindex` dans metadata article si champ supporté
- **C :** `status: archived` + exclure du sitemap

Implémenter **A** sauf si `status` archived est déjà branché → alors **C**.

**Step 3: Commit** (si demandé)

---

### Task 8: Baseline GEO + checklist vérification

**Files:**
- Create: `docs/seo/geo-prompt-baseline-2026-08.md`
- Modify: canvas plan (todos → completed pour design)

**Step 1: Créer la grille de prompts** (FR) :

1. meilleure agence IA France  
2. agence IA  
3. audit IA entreprise  
4. qu’est-ce qu’un audit IA  
5. agence intelligence artificielle automatisation  
6. Radianz  
7. comment choisir une agence IA  
8. audit IA vs consulting IA  
9. créer un agent IA entreprise France  
10. agence IA industrie

Pour chaque : noter moteur (ChatGPT / Perplexity / Gemini / Google AIO), cité oui/non, concurrent cité, URL éventuelle.

**Step 2: Première passe manuelle** (utilisateur ou agent avec accès web) — remplir le tableau initial

**Step 3: Verification skill** — avant de déclarer sprint 1 done :

- [ ] `npm run build` OK  
- [ ] `/fr/services/audit-ia` rend H1 + FAQ + CTA  
- [ ] View-source / Rich Results : FAQ + Service présents  
- [ ] Sitemap contient audit-ia + articles + case-studies  
- [ ] Liens nav/footer OK  
- [ ] Article Audit IA visible sur `/fr/articles`  
- [ ] Baseline GEO fichier créé  

**Step 4: Commit docs** (si demandé)

```bash
git add docs/seo/geo-prompt-baseline-2026-08.md \
  docs/plans/2026-08-07-seo-geo-audit-ia-design.md \
  docs/plans/2026-08-07-seo-geo-audit-ia.md
git commit -m "$(cat <<'EOF'
docs: add SEO/GEO Audit IA design and implementation plan

EOF
)"
```

---

## Post–sprint 1 (backlog, ne pas implémenter maintenant)

1. Pages `/services/agent-ia`, `/services/automatisation`
2. Guide GEO « Comment choisir une agence IA »
3. Enrichir cas clients (métriques, auteurs)
4. Activer SEA sur landings SEO
5. Installer skill `ai-seo` si disponible
6. Programmatic niches secteurs

---

## Execution handoff

Plan enregistré dans `docs/plans/2026-08-07-seo-geo-audit-ia.md`.

**Deux options d’exécution :**

1. **Subagent-Driven (cette session)** — un sous-agent par tâche, review entre chaque, itération rapide  
2. **Session parallèle** — nouvelle session avec `executing-plans`, exécution par lots avec checkpoints  

**Quelle approche ?**
