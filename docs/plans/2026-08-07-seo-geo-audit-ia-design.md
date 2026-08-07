# Design — SEO + GEO RADIANZ (Sprint 1 : Audit IA)

**Date:** 2026-08-07  
**Status:** Approved  
**Canvas:** `.cursor/projects/.../canvases/radianz-agence-ia-seo-geo-plan.canvas.tsx`

## Intent

Améliorer à fond le SEO organique et le GEO (citabilité dans ChatGPT, Perplexity, Gemini, AI Overviews) pour générer des leads « Agence IA », en commençant par le service **Audit IA**.

## Decisions

| Sujet | Choix |
|-------|--------|
| Priorité 30j | B) SEO fondations + D) GEO |
| Angle | Pages **service** d’abord (pas secteurs) |
| Service P0 | **Audit IA** |
| Ads / SEA | Reportés (réévaluation J60–90) |
| Route service | `/services/audit-ia` (+ EN `/services/ai-audit`) |
| Pilier | Homepage renforcée comme pilier « Agence IA » |
| Contenu blog | Nouvel article aligné Audit IA ; articles solaires dépriorisés (noindex ou refresh plus tard) |
| Mesure GEO | Log manuel hebdo de 8–10 prompts (pas d’outil payant requis sprint 1) |

## Architecture

```
/ (pilier Agence IA + FAQPage schema)
/services/audit-ia          ← page service P0
/articles/<slug-audit-ia>   ← asset content + GEO
/contact                    ← conversion
/case-studies/*             ← preuves E-E-A-T (sitemap + maillage)
```

- `lib/services.ts` — registre des services (slug, keywords, schema)
- `messages/{fr,en}.json` — namespace `servicesPages.audit`
- `components/service-audit-page.tsx` — sections page (hero, process, livrables, FAQ, CTA)
- `app/[locale]/services/audit-ia/page.tsx` — shell SEO + JSON-LD
- Helpers schema réutilisables dans `lib/seo.ts` (FAQPage, Service)
- Sitemap : `/services/audit-ia` + case-studies manquants
- Nav / footer : liens Audit → nouvelle URL (plus seulement `/#offre-audit`)

## GEO principles (toutes pages sprint 1)

1. Passages autonomes 40–60 mots (définitions, pour qui, durée, livrables)
2. FAQ avec `FAQPage` JSON-LD
3. Tableaux / listes structurées (process, livrables)
4. Preuves nommées (cas clients existants) + CTA contact
5. Cohérence marque RADIANZ / Agence IA & Web

## Out of scope (sprint 1)

- Google Ads / Meta Ads
- Pages Agent IA, Automatisation, Plateforme (P1)
- Pages secteurs dédiées au-delà de `/industries`
- Programmatic SEO à l’échelle
- Outreach backlinks massif
- Guide « comment choisir une agence IA » (J30–60)

## Success criteria (30 jours)

- Page `/services/audit-ia` indexable, maillée, avec Service + FAQ schema
- Pilier homepage : FAQ schema + signaux E-E-A-T renforcés
- ≥1 article FR (et EN) ciblant « audit IA » / intention associée
- Sitemap complet (services + case studies)
- Baseline GEO : grille de prompts + 1ère mesure documentée
- Aucune régression build / i18n FR-EN
