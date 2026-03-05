/**
 * Contenu marketing et chemins d'images Solar View.
 * Pour utiliser vos propres images : déposez hero-bg.jpg, feature-1.jpg, etc.
 * dans public/images/ et remplacez les URLs ci-dessous par "/images/hero-bg.jpg", etc.
 */

const PLACEHOLDER =
  "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg";

export const IMAGES = {
  hero: "/images/hero-bg.jpg",
  feature1: "/images/feature-1.jpg",
  feature2: "/images/feature-2.jpg",
  feature3: "/images/feature-3.jpg",
  feature4: "/images/feature-4.jpg",
  /** URLs de repli si les fichiers locaux n'existent pas encore */
  placeholder: PLACEHOLDER,
} as const;

export const SITE = {
  name: "RADIANZ",
  tagline: "Spot Potential from the Sky. Close Deals on the Ground.",
  vision:
    "The ultimate B2B lead generation tool. Identify commercial rooftops via satellite, analyze solar potential instantly, and send interactive proposals that convert.",
  badge: "Solar prospecting platform",
} as const;

export const STAT_BADGES = [
  { label: "Solar", value: "92%" },
  { label: "Building", value: "85%" },
  { label: "Contact", value: "78%" },
  { label: "Credit", value: "95%" },
] as const;

export const NAV_LINKS = [
  { title: "Home", url: "#hero" },
  { title: "Benefits", url: "#benefices" },
  { title: "Features", url: "#avantages" },
  { title: "Contact", url: "#contact" },
] as const;

export const HERO_FEATURES = [
  {
    title: "Buildings Scanned",
    description: "Buildings scanned for solar potential analysis",
    icon: "Clock" as const,
    kpi: "500K+",
  },
  {
    title: "Higher Close Rate",
    description: "More deals closed with qualified prospects",
    icon: "Target" as const,
    kpi: "32%",
  },
  {
    title: "Capacity Analyzed",
    description: "Total solar capacity across our portfolio",
    icon: "MapPin" as const,
    kpi: "2.4GW",
  },
] as const;

export const FEATURE_SECTION = {
  badge: "About",
  description:
    "At Radianz, we don't just provide maps — we provide vision. Since 2025, our platform has empowered commercial solar teams to identify hidden value in rooftops, transforming cold prospecting into warm, data-backed conversations instantly.",
} as const;

export const FEATURES_166 = [
  {
    title: "Commercial Roof Intelligence",
    description:
      "Advanced algorithms analyze roof pitch, shading, and usable area instantly. Filter by square footage and business type to find your perfect customer profile.",
    imageKey: "feature1" as const,
  },
  {
    title: "Faster Lead Qualification",
    description:
      "Rank prospects by potential and quality to prioritize your actions.",
    imageKey: "feature2" as const,
    kpi: "10x",
    progress: [
      { label: "Accuracy", value: 10, percentage: 98 },
      { label: "Speed", value: 10, percentage: 95 },
      { label: "Conversion", value: 8, percentage: 82 },
    ],
  },
  {
    title: "Official data",
    description:
      "Solar production and public business databases for reliable estimates.",
    imageKey: "feature3" as const,
  },
  {
    title: "Smart lead matching",
    description:
      "Highlight the most qualified leads ranked by your criteria — existing rooftops or future sites.",
    imageKey: "feature4" as const,
    clusters: [
      { value: "55", x: 35, y: 30 },
      { value: "23", x: 55, y: 50 },
      { value: "10", x: 75, y: 25 },
    ],
  },
] as const;

export const FOOTER = {
  tagline: "Solar potential at your fingertips.",
  copyright: "© RADIANZ. All rights reserved.",
  menuItems: [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#avantages" },
        { text: "Pricing", url: "#contact" },
        { text: "Request a demo", url: "#contact" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About", url: "#hero" },
        { text: "Contact", url: "#contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { text: "Legal notice", url: "#" },
        { text: "Privacy", url: "#" },
      ],
    },
  ],
  bottomLinks: [
    { text: "Legal notice", url: "#" },
    { text: "Privacy policy", url: "#" },
  ],
} as const;
