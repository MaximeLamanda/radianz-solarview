import type { Locale } from "@/i18n/config";

export type ArticleSection = {
  id: string;
  heading: string;
  content: string[];
};

export type Article = {
  slug: string;
  locale: Locale;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTimeMinutes: number;
  sections: ArticleSection[];
};

const ARTICLES: Article[] = [
  {
    slug: "prospection-solaire-b2b-2026",
    locale: "fr",
    title: "Prospection solaire B2B en 2026 : méthode terrain + data",
    excerpt:
      "Une méthode opérationnelle pour qualifier plus vite les toitures commerciales et prioriser les opportunités à fort potentiel.",
    coverImage: "/feature-map.png",
    publishedAt: "2026-03-02",
    updatedAt: "2026-03-11",
    author: "Equipe Radianz",
    readingTimeMinutes: 6,
    sections: [
      {
        id: "enjeux",
        heading: "Les enjeux de la prospection solaire B2B",
        content: [
          "Les équipes commerciales ont souvent trop de leads et pas assez de temps pour qualifier correctement chaque toiture.",
          "La performance vient d'une priorisation claire : surface utile, contraintes d'ombrage, et viabilite economique.",
        ],
      },
      {
        id: "qualification",
        heading: "Une qualification rapide mais fiable",
        content: [
          "Commencez par des criteres simples et communs a toute l'equipe commerciale pour garder une execution homogene.",
          "Ensuite, enrichissez avec des donnees techniques pour valider les hypotheses avant prise de contact.",
        ],
      },
      {
        id: "activation",
        heading: "Passer de la donnee a l'activation commerciale",
        content: [
          "Un lead qualifie doit etre active rapidement avec un message personnalise et des hypotheses de gains concretes.",
          "Plus le delai entre qualification et contact est court, plus le taux de conversion est eleve.",
        ],
      },
    ],
  },
  {
    slug: "how-commercial-roof-scoring-works",
    locale: "en",
    title: "How Commercial Roof Scoring Improves Solar Win Rate",
    excerpt:
      "A practical framework to score rooftop opportunities and focus sales effort on the deals most likely to close.",
    coverImage: "/feature-carto.jpg",
    publishedAt: "2026-03-02",
    updatedAt: "2026-03-11",
    author: "Radianz Team",
    readingTimeMinutes: 6,
    sections: [
      {
        id: "why-scoring",
        heading: "Why scoring matters",
        content: [
          "Most teams lose time on opportunities that look good but fail during technical review.",
          "A shared scoring model creates alignment between marketing, sales, and engineering.",
        ],
      },
      {
        id: "score-signals",
        heading: "Signals to include in your score",
        content: [
          "Use a blend of roof geometry, local irradiance context, and business fit criteria.",
          "Keep the model explainable so account executives can justify prioritization decisions.",
        ],
      },
      {
        id: "execution-loop",
        heading: "Building a repeatable execution loop",
        content: [
          "Turn scoring output into daily actions: shortlist, outreach, follow-up, and status tracking.",
          "Review conversion by score bracket each month to improve your model over time.",
        ],
      },
    ],
  },
];

export function getArticlesByLocale(locale: Locale): Article[] {
  return ARTICLES.filter((article) => article.locale === locale).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getArticleBySlug(locale: Locale, slug: string): Article | undefined {
  return ARTICLES.find((article) => article.locale === locale && article.slug === slug);
}

export function getAllArticlePaths(): Array<{ locale: Locale; slug: string }> {
  return ARTICLES.map((article) => ({ locale: article.locale, slug: article.slug }));
}
