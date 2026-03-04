# Images du site Solar View

Ce dossier est destiné aux visuels de la one-page (hero et sections avantages).

## Fichiers attendus

| Fichier | Usage | Dimensions conseillées |
|---------|--------|-------------------------|
| `hero-bg.jpg` | Image principale de la section Hero | 1200×600 px ou 16:9 |
| `feature-1.jpg` | Cartographie / vue satellite | 800×500 px |
| `feature-2.jpg` | Scoring / données | 800×500 px |
| `feature-3.jpg` | Données officielles | 800×500 px |
| `feature-4.jpg` | Estimation financière | 800×500 px |

## Comment utiliser vos images

1. Déposez vos fichiers (JPG, PNG ou WebP) dans ce dossier avec les noms ci-dessus.
2. Dans `lib/constants.ts`, remplacez l’usage de `IMAGES.placeholder` par les chemins locaux dans `app/page.tsx` :
   - Hero : `images={[{ src: IMAGES.hero, alt: "..." }]}`
   - Feature166 : utilisez `IMAGES.feature1`, `IMAGES.feature2`, etc. pour les quatre `feature*.image`.

Si les fichiers ne sont pas présents, le site affiche par défaut une image de repli (placeholder).
