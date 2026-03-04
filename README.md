# RADIANZ — Solarview

> **Solar potential at your fingertips**

Plateforme de prospection solaire pour identifier, évaluer et convertir les bâtiments à fort potentiel en leads qualifiés.

## 🚀 Description

RADIANZ est un site one-page marketing qui présente la plateforme de génération de leads B2B pour le secteur solaire. Identification de toits commerciaux via satellite, analyse instantanée du potentiel solaire, et envoi de propositions interactives pour maximiser les conversions.

## 📦 Structure du projet

```
Website-solarview/
├── solarview-site/     # Application Next.js
│   ├── app/            # Pages et layout
│   ├── components/     # Composants React (Navbar, Hero, Features, Footer)
│   ├── lib/            # Constantes et utilitaires
│   └── public/         # Assets statiques (images, logos)
└── README.md
```

## 🛠 Installation

```bash
cd solarview-site
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📜 Scripts

| Commande        | Description                    |
|-----------------|--------------------------------|
| `npm run dev`   | Lance le serveur de développement |
| `npm run build` | Compile l'application pour la production |
| `npm run start` | Lance le serveur en mode production |
| `npm run lint`  | Exécute le linter ESLint       |

## 🛣 Déploiement

Le site est prêt pour un déploiement sur [Vercel](https://vercel.com) :

1. Connectez le dépôt GitHub à Vercel
2. Configurez le **Root Directory** : `solarview-site`
3. Les commandes de build seront détectées automatiquement

## 🔗 Liens

- **Dépôt** : [github.com/MaximeLamanda/radianz-solarview](https://github.com/MaximeLamanda/radianz-solarview)
- **Technologies** : Next.js 16, React 19, Tailwind CSS, shadcn/ui
