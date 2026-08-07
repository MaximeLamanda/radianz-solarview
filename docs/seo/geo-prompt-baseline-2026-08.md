# Baseline GEO — prompts Agence IA / Audit IA

**Date baseline :** 2026-08-07  
**Site :** https://radianz.tech  
**Méthode :** grille de prompts FR ; colonnes moteurs = citation de radianz.tech (oui / non / —).  
**Légende :** `—` = non mesuré encore (pas de passe manuelle ChatGPT / Perplexity / Gemini / Google AI Overviews). Ne pas inventer de citations.

**Routine :** rejouer cette grille **chaque semaine** (même prompts, mêmes moteurs). Mettre à jour le tableau + la date. Conserver l’historique en dupliquant le fichier ou en ajoutant une section « Semaine N ».

**Note web (Exa, 2026-08-07) — pas équivalent aux citations LLM :**
- Requête `meilleure agence IA France` : top web = concurrents (SHUNPO, IA Agency, L’Agence IA, Axion-IA, IAMHuman) ; **radianz.tech absent** du top 5.
- Requête `Radianz` seule : collision de marque (quartz, BT Radianz finance) ; **radianz.tech absent** du top 5.
- Requête `Radianz radianz.tech agence IA France` : **radianz.tech/fr apparaît en #1** (visibilité brand+domaine, pas preuve de citation GEO).

---

## Grille de prompts

| Prompt | ChatGPT | Perplexity | Gemini | Google AIO | Notes |
|--------|---------|------------|--------|------------|-------|
| meilleure agence IA France | — | — | — | — | Web Exa 2026-08-07 : pas de radianz.tech en top 5 ; concurrents SEO forts |
| agence IA | — | — | — | — | Non mesuré moteurs IA ; à rejouer weekly |
| audit IA entreprise | — | — | — | — | Page P0 `/fr/services/audit-ia` + article FR déployés en code |
| qu’est-ce qu’un audit IA | — | — | — | — | FAQ schema sur page Audit IA (code) |
| agence intelligence artificielle automatisation | — | — | — | — | Non mesuré |
| Radianz | — | — | — | — | Web Exa : collision marque sans « radianz.tech » ; avec domaine → #1 |
| comment choisir une agence IA | — | — | — | — | Backlog post–sprint 1 (guide GEO) |
| audit IA vs consulting IA | — | — | — | — | Aligné FAQ page service |
| créer un agent IA entreprise France | — | — | — | — | Non mesuré ; page agent-ia en backlog |
| agence IA industrie | — | — | — | — | Hub `/industries` existant ; non mesuré GEO |

---

## Checklist vérification sprint 1

Vérifiée le **2026-08-07** dans le worktree `feature/seo-geo-audit-ia` (`cd solarview-site && npm run build`).

- [x] `npm run build` OK  
  **Preuve :** exit code `0` ; Next.js 15.1.9 ; `✓ Compiled successfully` ; `✓ Generating static pages (40/40)`.

- [x] `/fr/services/audit-ia` rend H1 + FAQ + CTA  
  **Preuve build :** route `● /[locale]/services/audit-ia` → `/fr/services/audit-ia` et `/en/services/audit-ia`.  
  **Preuve code :** `components/service-audit-page.tsx` — `<h1 id="audit-ia-heading">`, `FaqSection`, section CTA `audit-cta` + liens `/contact`.

- [x] FAQ + Service JSON-LD présents (code ; Rich Results Test Google non exécuté)  
  **Preuve :** `app/[locale]/services/audit-ia/page.tsx` injecte `buildServiceJsonLd` + `buildFaqPageJsonLd` via deux `<script type="application/ld+json">`. Helpers dans `lib/seo.ts`.

- [x] Sitemap contient audit-ia + articles + case-studies  
  **Preuve :** `app/sitemap.ts` — route fixe `"/services/audit-ia"` ; boucle `CASE_STUDY_SLUGS` ; boucle `getAllArticlePaths()`. Build génère `/sitemap.xml`.  
  Article Audit IA listé au build : `/fr/articles/audit-ia-entreprise-2026` (+ EN `ai-audit-for-business-2026` dans le groupe articles).

- [x] Liens nav/footer OK  
  **Preuve :** `components/navbar1.tsx` — menu item `Audit IA` → `/services/audit-ia` ; `lib/footer-menu.ts` — `{ text: tFooter("audit"), url: "/services/audit-ia" }`.

- [x] Article Audit IA visible sur `/fr/articles`  
  **Preuve :** fichiers `content/articles/fr/audit-ia-entreprise-2026.md` et `content/articles/en/ai-audit-for-business-2026.md` présents ; build SSG inclut `/fr/articles/audit-ia-entreprise-2026`.

- [x] Baseline GEO fichier créé  
  **Preuve :** ce fichier `docs/seo/geo-prompt-baseline-2026-08.md`.

---

## Prochaine mesure GEO (manuel)

1. Ouvrir ChatGPT, Perplexity, Gemini, Google (AI Overview si présent).  
2. Pour chaque prompt du tableau : noter si **radianz.tech** (ou marque RADIANZ agence) est cité ; URL exacte ; 1–2 concurrents cités.  
3. Remplacer `—` par `oui` / `non` + détail en Notes.  
4. Datestamp + commit docs.
