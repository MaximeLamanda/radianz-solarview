import { defaultLocale, type Locale } from "@/i18n/config";

export type CaseStudyIllustration =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "agent" }
  | { type: "solar" };

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudySection = {
  id: string;
  heading: string;
  paragraphs: string[];
  callout?: { title: string; description: string };
  bullets?: string[];
  illustration?: CaseStudyIllustration;
};

export type CaseStudy = {
  slug: string;
  locale: Locale;
  client: string;
  category: string;
  sector: string;
  solution: string;
  title: string;
  excerpt: string;
  overview: string;
  cover: CaseStudyIllustration;
  metrics: CaseStudyMetric[];
  sections: CaseStudySection[];
  externalUrl?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  // —— Progenes FR ——
  {
    slug: "progenes",
    locale: "fr",
    client: "Progenes",
    category: "Plateforme web",
    sector: "Agri-tech · Génétique bovine",
    solution: "Commerce & stock",
    title: "Catalogue, commandes et stock en temps réel pour Progenes",
    excerpt:
      "Site e-commerce sur mesure pour un distributeur de génétique bovine : catalogue de taureaux, panier, génération de bons de commande et affichage du stock disponible.",
    overview:
      "Progenes (progenes.fr) commercialise des semences d’insémination artificielle bovine auprès d’éleveurs partout en France. Nous avons conçu la plateforme web qui porte le catalogue, les commandes et la visibilité du stock.",
    cover: {
      type: "image",
      src: "/case-studies/progenes.png",
      alt: "Aperçu de la plateforme Progenes",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "250+", label: "références taureaux en catalogue" },
      { value: "Stock", label: "affiché en temps réel sur chaque dose" },
      { value: "BDC", label: "bon de commande généré depuis le panier" },
      { value: "FR", label: "livraison centre IA ou ferme" },
    ],
    externalUrl: "https://progenes.fr/",
    sections: [
      {
        id: "contexte",
        heading: "Le contexte",
        paragraphs: [
          "Progenes est un distributeur de génétique bovine fondé en 2008, leader en génétique pâturante néo-zélandaise et présent aussi sur Holstein, Jersey, Rouge Suédoise, Brune et races à viande. Plus de 170 fermes partenaires s’appuient sur un catalogue dense et un service de proximité.",
          "Le besoin : un site qui ne se contente pas de présenter l’offre, mais qui industrialise la prise de commande et la lecture du stock — sans friction pour l’éleveur ni pour l’équipe commerciale.",
        ],
      },
      {
        id: "catalogue",
        heading: "Catalogue métier, pas une vitrine générique",
        paragraphs: [
          "Chaque race et chaque taureau portent des index métier (lait, fertilité, cellules, morphologie, BW…). La recherche et la navigation par race permettent de filtrer une offre de 250+ références sans perdre le langage des éleveurs.",
          "Sur la fiche produit, le type de semence, le prix à la dose et le stock restant sont visibles avant l’ajout au panier — exactement ce qu’exige un commerce de doses biologiques à disponibilité limitée.",
        ],
        illustration: {
          type: "image",
          src: "/case-studies/progenes.png",
          alt: "Catalogue et fiches taureaux Progenes",
          width: 1440,
          height: 900,
        },
        bullets: [
          "Navigation par races et génétique pâturante",
          "Fiches taureaux avec index et prix à la dose",
          "Indicateur de stock par type de semence",
          "Recherche rapide dans le catalogue",
        ],
      },
      {
        id: "commandes",
        heading: "Gestion de commande de bout en bout",
        paragraphs: [
          "Le panier agrège les doses, calcule le sous-total et permet de générer un bon de commande — le flux réel des éleveurs qui commandent pour une campagne de reproduction, pas un checkout e-commerce classique.",
          "Livraison France vers centre d’insémination ou ferme, FAQ dédiée au processus de commande et aux délais : la plateforme épouse le parcours métier Progenes.",
        ],
        callout: {
          title: "Stock + commande = confiance",
          description:
            "Afficher le stock sur la fiche et produire un BDC depuis le panier réduit les allers-retours et les ruptures surprises en pleine campagne.",
        },
      },
      {
        id: "resultat",
        heading: "Ce que ça change",
        paragraphs: [
          "Une vitrine devient un outil opérationnel : le catalogue vit avec le stock, les commandes sont structurées, et l’équipe Progenes gagne du temps sur la prise de commande tout en offrant aux éleveurs une expérience claire et métier.",
        ],
      },
    ],
  },
  // —— Progenes EN ——
  {
    slug: "progenes",
    locale: "en",
    client: "Progenes",
    category: "Web platform",
    sector: "Agri-tech · Bovine genetics",
    solution: "Commerce & stock",
    title: "Catalog, orders and live stock for Progenes",
    excerpt:
      "Custom e-commerce for a bovine genetics distributor: bull catalog, cart, purchase-order generation, and live stock display.",
    overview:
      "Progenes (progenes.fr) sells artificial-insemination bovine semen to farms across France. We built the web platform that carries the catalog, orders, and stock visibility.",
    cover: {
      type: "image",
      src: "/case-studies/progenes.png",
      alt: "Progenes platform overview",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "250+", label: "bull references in catalog" },
      { value: "Stock", label: "shown live on every dose" },
      { value: "PO", label: "purchase order generated from cart" },
      { value: "FR", label: "delivery to AI center or farm" },
    ],
    externalUrl: "https://progenes.fr/",
    sections: [
      {
        id: "context",
        heading: "Context",
        paragraphs: [
          "Progenes is a bovine genetics distributor founded in 2008, a leader in New Zealand pasture genetics and also active on Holstein, Jersey, Swedish Red, Brown Swiss and beef breeds. 170+ partner farms rely on a dense catalog and proximity service.",
          "The need: a site that does more than showcase the offer — it had to industrialize ordering and stock visibility, with no friction for farmers or the sales team.",
        ],
      },
      {
        id: "catalog",
        heading: "A domain catalog, not a generic storefront",
        paragraphs: [
          "Every breed and bull carries domain indexes (milk, fertility, somatic cells, morphology, BW…). Breed navigation and search keep 250+ references usable without diluting farmer language.",
          "On the product page, semen type, per-dose price and remaining stock are visible before add-to-cart — exactly what limited biological inventory requires.",
        ],
        illustration: {
          type: "image",
          src: "/case-studies/progenes.png",
          alt: "Progenes bull catalog and product pages",
          width: 1440,
          height: 900,
        },
        bullets: [
          "Navigation by breed and pasture genetics",
          "Bull sheets with indexes and per-dose pricing",
          "Stock indicator per semen type",
          "Fast catalog search",
        ],
      },
      {
        id: "orders",
        heading: "End-to-end order management",
        paragraphs: [
          "The cart aggregates doses, computes the subtotal and generates a purchase order — the real farmer flow for a breeding campaign, not a generic checkout.",
          "France-wide delivery to AI centers or farms, plus FAQ on ordering and lead times: the platform mirrors Progenes’ operating model.",
        ],
        callout: {
          title: "Stock + order = trust",
          description:
            "Showing stock on the product page and producing a PO from the cart cuts back-and-forth and surprise stockouts mid-campaign.",
        },
      },
      {
        id: "outcome",
        heading: "What changed",
        paragraphs: [
          "A storefront becomes an operations tool: the catalog stays in sync with stock, orders are structured, and Progenes’ team spends less time on intake while farmers get a clear, domain-native experience.",
        ],
      },
    ],
  },
  // —— Haven Energy FR ——
  {
    slug: "haven-energy",
    locale: "fr",
    client: "Haven Energy",
    category: "Site web",
    sector: "Énergie · Stockage résidentiel",
    solution: "Site vitrine",
    title: "Site vitrine pour Haven Energy, backup batterie à domicile",
    excerpt:
      "Site web pour une startup californienne qui propose du backup batterie résidentiel en abonnement : devis instantané, parcours client clair et présentation du modèle « battery backup as a service ».",
    overview:
      "Haven Energy (havenenergy.com) rend le stockage domestique accessible via un abonnement mensuel fixe sur dix ans — design, installation et exploitation inclus. Nous avons conçu le site qui porte cette promesse commerciale.",
    cover: {
      type: "image",
      src: "/case-studies/haven-energy.png",
      alt: "Aperçu du site Haven Energy",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "Site", label: "vitrine orientée conversion" },
      { value: "US", label: "marché résidentiel californien" },
      { value: "10 ans", label: "tarif fixe sans escalator" },
      { value: "Backup", label: "batterie à domicile" },
    ],
    externalUrl: "https://havenenergy.com/",
    sections: [
      {
        id: "contexte",
        heading: "Le contexte",
        paragraphs: [
          "Haven Energy propose du backup batterie pour les foyers américains : un prix mensuel simple, fixé dix ans, sans frais cachés. La startup gère le design, les permis, l’installation et l’exploitation — le client obtient une couverture complète, pas seulement du matériel.",
          "Le site devait traduire ce modèle « as a service » en une expérience claire : expliquer la valeur, rassurer sur le parcours, et amener le visiteur vers un devis instantané.",
        ],
      },
      {
        id: "approche",
        heading: "Notre approche",
        paragraphs: [
          "Structure en trois temps : comment Haven fonctionne, les étapes concrètes (questions → devis → réservation), puis preuves sociales et FAQ pour lever les objections sur le contrat, les incitations fiscales et le contrôle de la batterie.",
          "Le ton reste direct et rassurant — aligné sur une offre grand public où la simplicité du prix et la sérénité face aux coupures sont les arguments principaux.",
        ],
        bullets: [
          "Parcours devis en quelques questions",
          "Mise en avant du modèle sans escalator sur 10 ans",
          "Témoignages clients et couverture presse",
          "FAQ sur installation, maintenance et fin de contrat",
        ],
      },
      {
        id: "resultat",
        heading: "Ce que ça change",
        paragraphs: [
          "Un site vitrine qui ne se contente pas de présenter le produit : il incarne la promesse Haven — simplicité tarifaire, service clé en main, backup fiable — et guide le prospect jusqu’à la réservation du système.",
        ],
      },
    ],
  },
  // —— Haven Energy EN ——
  {
    slug: "haven-energy",
    locale: "en",
    client: "Haven Energy",
    category: "Website",
    sector: "Energy · Residential storage",
    solution: "Showcase site",
    title: "Showcase website for Haven Energy home battery backup",
    excerpt:
      "Website for a California startup offering residential battery backup as a subscription: instant quote, clear customer journey, and presentation of the battery-backup-as-a-service model.",
    overview:
      "Haven Energy (havenenergy.com) makes home storage accessible through a fixed monthly price over ten years — design, installation, and operations included. We built the site that carries this commercial promise.",
    cover: {
      type: "image",
      src: "/case-studies/haven-energy.png",
      alt: "Haven Energy website overview",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "Site", label: "conversion-focused showcase" },
      { value: "US", label: "California residential market" },
      { value: "10 yr", label: "fixed rate, no escalator" },
      { value: "Backup", label: "home battery storage" },
    ],
    externalUrl: "https://havenenergy.com/",
    sections: [
      {
        id: "context",
        heading: "Context",
        paragraphs: [
          "Haven Energy offers home battery backup for American households: one simple monthly price, fixed for ten years, with no hidden fees. The startup handles design, permits, installation, and ongoing operation — customers get full coverage, not just hardware.",
          "The site had to translate this as-a-service model into a clear experience: explain the value, reassure on the journey, and drive visitors toward an instant quote.",
        ],
      },
      {
        id: "approach",
        heading: "Our approach",
        paragraphs: [
          "A three-part structure: how Haven works, concrete steps (questions → quote → reservation), then social proof and FAQ to address contract, tax incentives, and battery-control questions.",
          "The tone stays direct and reassuring — aligned with a consumer offer where pricing simplicity and outage peace of mind are the main selling points.",
        ],
        bullets: [
          "Quote flow in a few questions",
          "Highlight of the 10-year no-escalator model",
          "Customer testimonials and press coverage",
          "FAQ on installation, maintenance, and end of plan",
        ],
      },
      {
        id: "outcome",
        heading: "What changed",
        paragraphs: [
          "A showcase site that does more than present the product: it embodies Haven’s promise — simple pricing, turnkey service, reliable backup — and guides prospects through to system reservation.",
        ],
      },
    ],
  },
  // —— T1 Energy FR ——
  {
    slug: "t1-energy",
    locale: "fr",
    client: "T1 Energy",
    category: "Site web",
    sector: "Énergie · Fabrication solaire",
    solution: "Site vitrine",
    title: "Site vitrine pour T1 Energy, fabrication solaire américaine",
    excerpt:
      "Site web pour un fabricant texan de cellules et modules solaires : mission industrielle, chaîne d’approvisionnement domestique et présentation de la technologie PV de dernière génération.",
    overview:
      "T1 Energy (t1energy.com) construit des chaînes d’approvisionnement solaire et batterie aux États-Unis. Nous avons conçu le site qui porte cette ambition manufacturière et la crédibilité industrielle du groupe.",
    cover: {
      type: "image",
      src: "/case-studies/t1-energy.png",
      alt: "Aperçu du site T1 Energy",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "Site", label: "vitrine corporate" },
      { value: "US", label: "fabrication domestique" },
      { value: "PV", label: "cellules et modules solaires" },
      { value: "Supply", label: "chaîne d’approvisionnement" },
    ],
    externalUrl: "https://t1energy.com/",
    sections: [
      {
        id: "contexte",
        heading: "Le contexte",
        paragraphs: [
          "T1 Energy est un fabricant basé à Austin qui développe une capacité de production solaire et batterie aux États-Unis. Sa mission : des chaînes d’approvisionnement domestiques pour rendre l’énergie scalable, fiable et compétitive.",
          "Le site devait parler à des audiences B2B et investisseurs : prouver la profondeur technologique, la montée en cadence industrielle et l’actualité du groupe — sans noyer le message dans le jargon.",
        ],
      },
      {
        id: "approche",
        heading: "Notre approche",
        paragraphs: [
          "Architecture en blocs distincts : mission, manufacturing (cellule → module), supply chain, technologie PV détaillée couche par couche, chiffres clés et fil d’actualités.",
          "Le design met en avant la crédibilité industrielle — matériaux abondants, cellules N-type, efficacité et durabilité — tout en gardant une navigation fluide entre les sections corporate et produit.",
        ],
        bullets: [
          "Présentation de la chaîne de valeur cellule → module",
          "Schéma technologique de la stack PV",
          "Indicateurs de production et de performance",
          "Fil d’actualités et communiqués récents",
        ],
      },
      {
        id: "resultat",
        heading: "Ce que ça change",
        paragraphs: [
          "Un site vitrine qui positionne T1 Energy comme acteur manufacturier crédible — pas seulement un producteur de panneaux, mais un bâtisseur de supply chain énergétique américaine, avec une narration claire entre technologie, production et actualité.",
        ],
      },
    ],
  },
  // —— T1 Energy EN ——
  {
    slug: "t1-energy",
    locale: "en",
    client: "T1 Energy",
    category: "Website",
    sector: "Energy · Solar manufacturing",
    solution: "Showcase site",
    title: "Showcase website for T1 Energy American solar manufacturing",
    excerpt:
      "Website for a Texas-based solar cell and module manufacturer: industrial mission, domestic supply chain, and presentation of next-generation PV technology.",
    overview:
      "T1 Energy (t1energy.com) is building domestic solar and battery supply chains in the United States. We designed the site that carries this manufacturing ambition and the group’s industrial credibility.",
    cover: {
      type: "image",
      src: "/case-studies/t1-energy.png",
      alt: "T1 Energy website overview",
      width: 1440,
      height: 900,
    },
    metrics: [
      { value: "Site", label: "corporate showcase" },
      { value: "US", label: "domestic manufacturing" },
      { value: "PV", label: "solar cells & modules" },
      { value: "Supply", label: "chain localization" },
    ],
    externalUrl: "https://t1energy.com/",
    sections: [
      {
        id: "context",
        heading: "Context",
        paragraphs: [
          "T1 Energy is an Austin-based manufacturer building solar and battery production capacity in the United States. Its mission: domestic supply chains to make energy scalable, reliable, and cost-competitive.",
          "The site had to speak to B2B audiences and investors: prove technological depth, industrial ramp-up, and company news — without drowning the message in jargon.",
        ],
      },
      {
        id: "approach",
        heading: "Our approach",
        paragraphs: [
          "A block-based architecture: mission, manufacturing (cell → module), supply chain, layer-by-layer PV technology detail, key figures, and a news feed.",
          "The design highlights industrial credibility — abundant materials, N-type cells, efficiency and durability — while keeping smooth navigation between corporate and product sections.",
        ],
        bullets: [
          "Cell-to-module value chain presentation",
          "PV stack technology breakdown",
          "Production and performance indicators",
          "News feed and recent announcements",
        ],
      },
      {
        id: "outcome",
        heading: "What changed",
        paragraphs: [
          "A showcase site that positions T1 Energy as a credible manufacturing player — not just a panel producer, but a builder of American energy supply chains, with a clear narrative linking technology, production, and news.",
        ],
      },
    ],
  },
  // —— Articles agent FR ——
  {
    slug: "articles-agent",
    locale: "fr",
    client: "Agent articles",
    category: "Agent IA",
    sector: "Énergie solaire · Lead gen",
    solution: "Agent d’extraction",
    title: "Agent d’analyse d’articles pour la lead generation solaire",
    excerpt:
      "Un agent qui surveille les articles sortis sur un sujet précis, en extrait les signaux utiles et remplit une base pour que les acteurs du solaire soient les premiers informés — avec les contacts.",
    overview:
      "Dans le solaire, l’avantage concurrentiel se joue souvent à la vitesse d’accès à l’information. Nous avons construit un agent qui lit le flux d’articles, structure les données et alimente une base de leads actionnable.",
    cover: { type: "agent" },
    metrics: [
      { value: "24/7", label: "veille sur un sujet ciblé" },
      { value: "DB", label: "fiches leads structurées" },
      { value: "1er", label: "accès à l’info + contacts" },
      { value: "CRM", label: "prêt à brancher" },
    ],
    sections: [
      {
        id: "probleme",
        heading: "Le problème",
        paragraphs: [
          "Les annonces, appels d’offres, projets et mouvements de marché sortent en continu dans la presse spécialisée et générale. Les équipes commerciales n’ont pas le temps de tout lire, encore moins d’en extraire les contacts utiles.",
          "Résultat : l’information arrive trop tard, mal structurée, ou sans les coordonnées qui permettent d’agir.",
        ],
      },
      {
        id: "agent",
        heading: "Ce que fait l’agent",
        paragraphs: [
          "Sur un sujet précis (par ex. projets solaires, réglementation, acteurs B2B), l’agent collecte les URLs d’articles, les analyse une à une, et en extrait les entités pertinentes : entreprises, projets, localisations, dates, signaux d’intention.",
          "Chaque extraction remplit une base de données normalisée — prête pour la qualification et la prise de contact, pas un simple résumé.",
        ],
        illustration: { type: "agent" },
        bullets: [
          "Ingestion continue d’articles sur un thème",
          "Extraction d’entités et de signaux d’intention",
          "Enrichissement des contacts quand disponibles",
          "Base structurée pour la prospection",
        ],
      },
      {
        id: "valeur",
        heading: "Lead generation pour acteurs du solaire",
        paragraphs: [
          "L’objectif n’est pas « plus de contenu » : c’est d’être le premier à disposer de l’information et des coordonnées pour engager le bon interlocuteur.",
          "L’agent transforme la veille presse en pipeline : chaque article pertinent devient une opportunité traçable, scorée et partageable dans l’équipe commerciale.",
        ],
        callout: {
          title: "De l’article au lead",
          description:
            "Analyse → extraction → base de données → contact. Le commercial démarre avec le contexte, pas avec une URL brute.",
        },
      },
      {
        id: "resultat",
        heading: "Résultat",
        paragraphs: [
          "Une machine de veille qui ne s’arrête pas, une base qui se remplit toute seule, et une avance informationnelle mesurable pour les équipes qui doivent toucher le marché solaire avant les autres.",
        ],
      },
    ],
  },
  // —— Articles agent EN ——
  {
    slug: "articles-agent",
    locale: "en",
    client: "Articles agent",
    category: "AI agent",
    sector: "Solar energy · Lead gen",
    solution: "Extraction agent",
    title: "Article-analysis agent for solar lead generation",
    excerpt:
      "An agent that monitors articles on a focused topic, extracts useful signals, and fills a database so solar players get the news first — with contact details.",
    overview:
      "In solar, competitive edge often comes down to how fast you get information. We built an agent that reads the article stream, structures the data, and feeds an actionable lead database.",
    cover: { type: "agent" },
    metrics: [
      { value: "24/7", label: "monitoring on a focused topic" },
      { value: "DB", label: "structured lead records" },
      { value: "1st", label: "info access + contacts" },
      { value: "CRM", label: "ready to wire" },
    ],
    sections: [
      {
        id: "problem",
        heading: "The problem",
        paragraphs: [
          "Announcements, tenders, projects and market moves land continuously in trade and general press. Sales teams cannot read everything, let alone extract useful contacts.",
          "Result: information arrives late, poorly structured, or without the details needed to act.",
        ],
      },
      {
        id: "agent",
        heading: "What the agent does",
        paragraphs: [
          "On a precise topic (e.g. solar projects, regulation, B2B players), the agent collects article URLs, analyzes them one by one, and extracts relevant entities: companies, projects, locations, dates, intent signals.",
          "Each extraction fills a normalized database — ready for qualification and outreach, not just a summary.",
        ],
        illustration: { type: "agent" },
        bullets: [
          "Continuous article ingestion on a theme",
          "Entity and intent-signal extraction",
          "Contact enrichment when available",
          "Structured database for prospecting",
        ],
      },
      {
        id: "value",
        heading: "Lead generation for solar players",
        paragraphs: [
          "The goal is not “more content”: it is being first with the information and the contact details to engage the right person.",
          "The agent turns press monitoring into a pipeline: every relevant article becomes a traceable, scored opportunity the sales team can share.",
        ],
        callout: {
          title: "From article to lead",
          description:
            "Analyze → extract → database → contact. Sales starts with context, not a raw URL.",
        },
      },
      {
        id: "outcome",
        heading: "Outcome",
        paragraphs: [
          "A monitoring machine that does not stop, a database that fills itself, and a measurable information edge for teams that need to reach the solar market first.",
        ],
      },
    ],
  },
  // —— Solar detection FR ——
  {
    slug: "solar-detection",
    locale: "fr",
    client: "Détection solaire",
    category: "Computer vision",
    sector: "Énergie solaire · Prospection",
    solution: "Vision + contacts",
    title: "Détection de bâtiments et panneaux solaires, avec contacts",
    excerpt:
      "Projet de computer vision pour détecter bâtiments et panneaux solaires sur une plage de dates, puis récupérer les informations de contact du propriétaire.",
    overview:
      "Repérer où sont les toitures et les installations solaires ne suffit pas : il faut aussi joindre la bonne personne. Nous avons combiné détection visuelle et enrichissement contact sur une fenêtre temporelle choisie.",
    cover: { type: "solar" },
    metrics: [
      { value: "CV", label: "bâtiments & panneaux détectés" },
      { value: "Dates", label: "fenêtre temporelle paramétrable" },
      { value: "Contact", label: "coordonnées du propriétaire" },
      { value: "Lead", label: "cible prête à engager" },
    ],
    sections: [
      {
        id: "objectif",
        heading: "L’objectif",
        paragraphs: [
          "Sur une zone et une plage de dates données, identifier les bâtiments et les panneaux solaires visibles, puis rattacher chaque détection aux informations de contact de la personne qui possède le bâtiment.",
          "Le livrable n’est pas une carte jolie : c’est une liste de cibles actionnables pour la prospection ou le suivi de déploiement.",
        ],
      },
      {
        id: "detection",
        heading: "Détection visuelle",
        paragraphs: [
          "Un modèle de computer vision localise bâtiments et panneaux sur l’imagerie disponible dans la fenêtre temporelle. Chaque détection porte une confiance et une géolocalisation.",
          "La contrainte de dates permet de cibler les nouvelles installations, les évolutions de toiture, ou une campagne bornée dans le temps — plutôt qu’un inventaire figé.",
        ],
        illustration: { type: "solar" },
        bullets: [
          "Détection de bâtiments et de panneaux",
          "Filtrage par plage de dates",
          "Score de confiance par détection",
          "Géolocalisation des cibles",
        ],
      },
      {
        id: "contacts",
        heading: "De la détection au contact",
        paragraphs: [
          "Une fois le bâtiment identifié, le pipeline enrichit la fiche avec les informations de contact du propriétaire — pour qu’une équipe commerciale ou partenariats puisse engager sans recherche manuelle.",
          "Vision + données propriétaire = un lead solaire complet, pas seulement une pastille sur une photo satellite.",
        ],
        callout: {
          title: "Détecter, puis joindre",
          description:
            "La valeur est dans la boucle complète : voir l’installation (ou le potentiel), dater le signal, récupérer le contact, passer à l’action.",
        },
      },
      {
        id: "resultat",
        heading: "Résultat",
        paragraphs: [
          "Un outil de prospection territoriale qui combine computer vision et enrichissement contact, borné dans le temps, pour prioriser les bons bâtiments — et les bonnes personnes.",
        ],
      },
    ],
  },
  // —— Solar detection EN ——
  {
    slug: "solar-detection",
    locale: "en",
    client: "Solar detection",
    category: "Computer vision",
    sector: "Solar energy · Prospecting",
    solution: "Vision + contacts",
    title: "Building and solar-panel detection, with contacts",
    excerpt:
      "Computer-vision project to detect buildings and solar panels within a date range, then retrieve the building owner’s contact details.",
    overview:
      "Finding roofs and solar installs is not enough — you also need to reach the right person. We combined visual detection with contact enrichment inside a chosen time window.",
    cover: { type: "solar" },
    metrics: [
      { value: "CV", label: "buildings & panels detected" },
      { value: "Dates", label: "configurable time window" },
      { value: "Contact", label: "owner details recovered" },
      { value: "Lead", label: "ready-to-engage target" },
    ],
    sections: [
      {
        id: "goal",
        heading: "The goal",
        paragraphs: [
          "For a given area and date range, identify visible buildings and solar panels, then attach each detection to the contact details of the person who owns the building.",
          "The deliverable is not a pretty map: it is a list of actionable targets for prospecting or rollout tracking.",
        ],
      },
      {
        id: "detection",
        heading: "Visual detection",
        paragraphs: [
          "A computer-vision model locates buildings and panels on imagery available in the time window. Each detection carries confidence and geolocation.",
          "The date constraint targets new installs, roof changes, or a time-bounded campaign — not a frozen inventory.",
        ],
        illustration: { type: "solar" },
        bullets: [
          "Building and panel detection",
          "Filtering by date range",
          "Confidence score per detection",
          "Target geolocation",
        ],
      },
      {
        id: "contacts",
        heading: "From detection to contact",
        paragraphs: [
          "Once the building is identified, the pipeline enriches the record with the owner’s contact details — so sales or partnerships can engage without manual research.",
          "Vision + owner data = a complete solar lead, not just a pin on a satellite photo.",
        ],
        callout: {
          title: "Detect, then reach",
          description:
            "Value is in the full loop: see the install (or potential), date the signal, recover the contact, take action.",
        },
      },
      {
        id: "outcome",
        heading: "Outcome",
        paragraphs: [
          "A territorial prospecting tool that combines computer vision and contact enrichment, time-bounded, to prioritize the right buildings — and the right people.",
        ],
      },
    ],
  },
];

export const CASE_STUDY_SLUGS = [
  "progenes",
  "haven-energy",
  "t1-energy",
  "articles-agent",
  "solar-detection",
] as const;
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export function getCaseStudiesByLocale(locale: Locale): CaseStudy[] {
  return CASE_STUDIES.filter((study) => study.locale === locale);
}

export function getCaseStudyBySlug(
  locale: Locale,
  slug: string,
): CaseStudy | undefined {
  return CASE_STUDIES.find(
    (study) => study.locale === locale && study.slug === slug,
  );
}

export function getAllCaseStudyPaths(): Array<{ locale: Locale; slug: string }> {
  return CASE_STUDIES.map((study) => ({
    locale: study.locale,
    slug: study.slug,
  }));
}

export function caseStudyHreflangAlternates(
  study: CaseStudy,
): Record<string, string> {
  const translations = CASE_STUDIES.filter(
    (candidate) => candidate.slug === study.slug,
  );

  const languages = Object.fromEntries(
    translations.map((translation) => [
      translation.locale,
      `/${translation.locale}/case-studies/${translation.slug}`,
    ]),
  );

  const defaultTranslation =
    translations.find((translation) => translation.locale === defaultLocale) ??
    translations[0];

  languages["x-default"] =
    `/${defaultTranslation.locale}/case-studies/${defaultTranslation.slug}`;

  return languages;
}
