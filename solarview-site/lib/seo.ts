import type { Metadata } from "next";

import { locales } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://radianz.tech";

/**
 * Assets SEO — remplacez les fichiers dans public/ pour changer l’icône ou l’image de partage.
 *
 * - favicon : SVG affiché dans l’onglet du navigateur (fond lime, logo noir)
 * - ogImage : image de partage — par défaut générée par app/opengraph-image.tsx
 * - appleTouchIcon : PNG 180×180 pour l’écran d’accueil iOS (optionnel)
 */
export const SEO_ASSETS = {
  favicon: "/radianz-icon.svg",
  ogImage: "/opengraph-image",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "RADIANZ",
  appleTouchIcon: "/apple-touch-icon.png",
} as const;

export function localePath(locale: string, path = ""): string {
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function hreflangAlternates(path = ""): Record<string, string> {
  return Object.fromEntries(locales.map((loc) => [loc, localePath(loc, path)]));
}

export function siteIcons(): NonNullable<Metadata["icons"]> {
  return {
    icon: SEO_ASSETS.favicon,
    shortcut: SEO_ASSETS.favicon,
    apple: SEO_ASSETS.appleTouchIcon,
  };
}

export function socialShareImages(): NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> {
  return [
    {
      url: SEO_ASSETS.ogImage,
      width: SEO_ASSETS.ogImageWidth,
      height: SEO_ASSETS.ogImageHeight,
      alt: SEO_ASSETS.ogImageAlt,
    },
  ];
}

export function socialTwitterImages(): string[] {
  return [SEO_ASSETS.ogImage];
}

export function withSocialMetadata(metadata: Metadata): Metadata {
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: metadata.openGraph?.images ?? socialShareImages(),
    },
    twitter: {
      card: "summary_large_image",
      ...metadata.twitter,
      images: metadata.twitter?.images ?? socialTwitterImages(),
    },
  };
}
