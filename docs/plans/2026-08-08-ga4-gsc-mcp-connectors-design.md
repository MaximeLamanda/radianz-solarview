# Design — Connecteurs GA4 + Search Console (MCP Cursor)

**Date:** 2026-08-08  
**Status:** Approved  
**Approche:** MCP locaux (GA4 officiel + GSC communautaire) + tag GA4 sur le site

## Intent

Permettre à l’agent Cursor de lire les performances du site RADIANZ via **Google Analytics 4** et **Google Search Console** (trafic, conversions, requêtes SEO, pages indexées / inspection d’URL), en complément de Vercel Analytics déjà en place.

## Decisions

| Sujet | Choix |
|-------|--------|
| Sources | C) GA4 + Search Console |
| État GA4 | Propriété créée ; tag pas encore sur le site ; ID de mesure / flux fournis par l’utilisateur |
| État GSC | Propriété créée et vérifiée (en partie) ; objectif : pages indexées, perf SEO |
| Connexion Cursor | Approche 1 — MCP locaux |
| Auth | Compte de service Google Cloud (JSON hors repo) |
| Collecte site | Tag GA4 (`G-XXXX`) dans le layout Next.js ; garder `@vercel/analytics` |

## Architecture

```
[Site Next.js] --gtag--> [GA4 property]
[Google Search Console] (déjà vérifiée)
        |                        |
   Analytics Data/Admin API   Search Console API
        |                        |
   analytics-mcp (officiel)   MCP GSC (communautaire)
        \                        /
         \____ .cursor/mcp.json ____/
                      |
                 Cursor Agent
```

1. **Collecte** — script / composant GA4 dans `solarview-site` (layout racine), measurement ID via env `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
2. **Lecture** — deux serveurs MCP stdio configurés dans `.cursor/mcp.json` (ou MCP user global) :
   - `analytics-mcp` (Google) — reports, realtime, propriétés
   - MCP Search Console (ex. `@vmandic/searchconsole-mcp` ou `mcp-server-gsc`) — search analytics, sitemaps, URL inspection
3. **GCP** — un projet Cloud, APIs activées (GA Admin, GA Data, Search Console), un service account JSON stocké hors git ; email du SA ajouté Viewer (GA4) + utilisateur propriété (GSC).

## Components

| Élément | Rôle |
|---------|------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de mesure GA4 (ex. `G-XXXX`) |
| Composant / script GA dans layout | Charge gtag sans casser Vercel Analytics |
| `.cursor/mcp.json` (merge) | Déclare les deux MCP + chemins credentials |
| Credentials JSON | Auth locale MCP uniquement — jamais commitée |
| Doc courte setup | Checklist utilisateur (GCP, accès GA4/GSC, restart Cursor) |

## Data flow

- **Write path (site → Google)** : page view / events → gtag → GA4. GSC reçoit le crawl Google (pas de tag site requis).
- **Read path (agent)** : prompt utilisateur → outil MCP → API Google (readonly) → réponse structurée dans le chat.
- Scopes : lecture seule (`analytics.readonly`, équivalent GSC readonly / accès propriété).

## Error handling

- MCP absent / rouge dans Settings → MCP : vérifier JSON, PATH (`pipx`/`npx`), restart Cursor.
- Listes vides / 403 : SA sans accès Viewer GA4 ou sans accès propriété GSC (cause la plus fréquente).
- Tag sans données : attendre 24–48 h après déploiement ; vérifier Realtime GA4.
- Credentials manquants : ne pas inventer de mock ; indiquer l’étape checklist.

## Testing / validation

1. Déployer le tag → événement Realtime visible dans GA4.
2. Cursor Settings → MCP : les deux serveurs « Connected ».
3. Prompts de smoke :
   - « Liste mes propriétés GA4 »
   - « Top pages / requêtes GSC 28 jours »
   - « Cette URL est-elle indexée ? » (URL inspection)

## Out of scope

- Remplacer Vercel Analytics
- SEA / Google Ads linking avancé
- Connecteur cloud tiers (AnythingMCP)
- Écriture / modification de config GA ou GSC via l’agent
