# Pipeline articles Radianz

Règles pour la rédaction et la publication d'articles sur radianz.com (solaire C&I B2B, France).

## Contexte produit

- **Radianz** : plateforme SaaS de prospection solaire C&I (commercial & industriel)
- **Cible** : installateurs solaires, développeurs C&I, équipes commerciales B2B
- **Positionnement SEO** : océan bleu — aucun concurrent francophone dominant sur la prospection solaire C&I
- **À éviter** : contenu résidentiel (particuliers, devis maison, panneaux pour particuliers)

## Fichiers et structure

```
solarview-site/content/articles/
├── fr/{slug}.md          # Article français
├── en/{slug}.md          # Article anglais (slug peut différer)
└── topics-queue.json     # File d'attente SEO — mettre à jour le status
```

### Frontmatter obligatoire

```yaml
---
slug: mon-article-slug
title: "Titre SEO (60 car. max)"
excerpt: "Meta description (155 car. max)"
coverImage: /nom-image.png
publishedAt: "YYYY-MM-DD"
author: Equipe Radianz
readingTimeMinutes: 6
primaryKeyword: mot-clé principal
status: published
---
```

### Corps de l'article

- Sections avec `## Titre de section` (génère l'ancre TOC automatiquement)
- Paragraphes séparés par une ligne vide
- Liens internes en markdown : `[texte](/articles/slug-existant)`
- Minimum **3 sections**, **800 mots** par article
- **2 à 3 liens internes** vers des articles déjà publiés

## SEO (basé sur radianz-seo-analysis.html)

### Clusters prioritaires (P1)

1. **Lead & prospection B2B** : lead solaire commercial, prospection solaire professionnel, lead photovoltaïque entreprise
2. **Solaire C&I France** : solaire C&I France, photovoltaïque commercial industriel, solaire tertiaire
3. **Outils & logiciels** : logiciel prospection solaire, plateforme lead solaire, SaaS solaire installateur

### Clusters secondaires (P2)

- Retail & secteurs : supermarchés, entrepôts logistiques, zones commerciales
- Réglementation : obligation solarisation tertiaire
- Comparatifs : Planno alternative France

### Règles SEO par article

- Mot-clé principal dans : titre, premier paragraphe, 1 sous-titre H2, meta excerpt
- Slug URL : kebab-case, inclure le mot-clé si naturel
- Ton : expert opérationnel, pas marketing creux
- CTA discret en fin d'article : lien vers `/contact` ou mention de Radianz
- Ne pas cannibaliser : vérifier `topics-queue.json` et les articles existants avant de choisir un sujet

## Workflow automation

1. Lire `content/articles/topics-queue.json` — prendre le premier topic `status: pending` par priorité
2. Lire tous les `.md` dans `content/articles/fr/` et `en/` — lister sujets déjà couverts
3. Rechercher tendances récentes (7 derniers jours) sur le cluster choisi
4. Rédiger FR + EN, créer les fichiers `.md`
5. Ajouter 2-3 liens internes ; si pertinent, mettre à jour un ancien article avec un lien vers le nouveau
6. Marquer le topic `status: published` dans `topics-queue.json`
7. Ouvrir une PR — **ne pas merger**

## Ton et style

- Français : vouvoiement implicite, phrases courtes, vocabulaire métier (C&I, tertiaire, toiture, qualification)
- Anglais : direct, B2B SaaS tone
- Pas de listes à puces excessives — privilégier le prose structuré en sections
- Chiffres et sources quand disponibles (réglementation, volumes marché)
- Pas de contenu généré générique sans valeur terrain

## Images

- Utiliser des images existantes dans `solarview-site/public/` quand possible
- Sinon : `/feature-map.png` ou `/feature-carto.jpg` en placeholder
- Nommer clairement si nouvelle image ajoutée

## Checklist avant PR

- [ ] FR + EN créés
- [ ] Frontmatter complet
- [ ] 3+ sections, ~800 mots
- [ ] 2-3 liens internes
- [ ] primaryKeyword renseigné
- [ ] topics-queue.json mis à jour
- [ ] `npm run build` passe dans `solarview-site/`
