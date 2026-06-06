import type { StaticImageData } from "next/image";
import type { ElementType } from "react";

export interface Feature {
  title: string;
  description: string;
  icon: ElementType<{ className?: string }>;
  /** KPI affiché en grand (ex: "70%", "3x") - si fourni, remplace l'icône et le titre */
  kpi?: string;
  color?: string;
  href?: string;
}

export interface Image {
  src: string | StaticImageData;
  alt: string;
}

export interface StatBadge {
  label: string;
  /** Score ou indicateur optionnel affiché à côté du label */
  value?: string;
  /** 2–3 data items sous le tag (ex: année construction, etc.) */
  data?: string[];
  /** Contact avec avatar initiales et nom à la place des lignes de données */
  contact?: {
    firstName: string;
    lastName: string;
  };
  /** Affiche un point vert devant la ligne de statut */
  live?: boolean;
}

export interface HeroFeatureIconsProps {
  heading: string;
  description?: string;
  badge?: string;
  bullets?: string[];
  statBadges?: StatBadge[];
  buttonPrimary?: {
    text: string;
    href: string;
  };
  buttonSecondary?: {
    text: string;
    href: string;
  };
  features?: Feature[];
  /** Array of images (at least 1 required). Multiple images enable carousel behavior. */
  images: [Image, ...Image[]];
  className?: string;
}
