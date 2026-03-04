This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Solar View — One-page

Site one-page marketing construit avec les blocs shadcn (Navbar1, Hero45, Feature166, Footer2). Thème neutre, accent vert, polices Geist et Geist Mono pour les badges.

### Remplacer les images

Les visuels (hero, sections avantages) sont configurables via `lib/constants.ts`. Par défaut, un placeholder est utilisé. Pour afficher vos propres photos type énergie :

1. Déposez vos fichiers dans `public/images/` (voir `public/images/README.md` pour les noms et dimensions conseillées).
2. Dans `app/page.tsx`, remplacez `IMAGES.placeholder` par `IMAGES.hero`, `IMAGES.feature1`, etc. pour les sections concernées.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
