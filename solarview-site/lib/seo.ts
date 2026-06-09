import type { Metadata } from "next";

import { defaultLocale, locales } from "@/i18n/config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://radianz.tech";

/**
 * Assets SEO — remplacez les fichiers dans public/ pour changer l’icône ou l’image de partage.
 *
 * - favicon : PNG dans public/ + app/icon.png + app/favicon.ico
 * - ogImage : image de partage — par défaut générée par app/opengraph-image.tsx
 * - appleTouchIcon : PNG dans public/ + app/apple-icon.png
 */
export const SEO_ASSETS = {
  favicon: "/favicon-32.png",
  faviconPng: "/favicon-32.png",
  ogImage: "/opengraph-image",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "RADIANZ",
  appleTouchIcon: "/apple-touch-icon.png",
} as const;

export function localePath(locale: string, path = ""): string {
  const suffix = path.replace(/^\/+/, "");
  return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}

export function hreflangAlternates(path = ""): Record<string, string> {
  const languages = Object.fromEntries(
    locales.map((loc) => [loc, localePath(loc, path)]),
  );
  languages["x-default"] = localePath(defaultLocale, path);
  return languages;
}

export function siteIcons(): NonNullable<Metadata["icons"]> {
  return {
    icon: [
      { url: SEO_ASSETS.faviconPng, type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: SEO_ASSETS.faviconPng,
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
