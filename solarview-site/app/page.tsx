import { Clock, MapPin, Target } from "lucide-react";

import { Navbar1 } from "@/components/navbar1";
import { Hero45 } from "@/components/hero45";
import { Feature166 } from "@/components/feature166";
import { PipelineSection } from "@/components/pipeline-section";
import { ProspectPortalSection } from "@/components/prospect-portal-section";
import { Footer2 } from "@/components/footer2";

import {
  SITE,
  STAT_BADGES,
  NAV_LINKS,
  HERO_FEATURES,
  FEATURE_SECTION,
  FEATURES_166,
  FOOTER,
  IMAGES,
} from "@/lib/constants";

const heroFeaturesWithIcons = [
  { ...HERO_FEATURES[0], icon: Clock },
  { ...HERO_FEATURES[1], icon: Target },
  { ...HERO_FEATURES[2], icon: MapPin },
];

export default function Home() {
  return (
    <>
      <Navbar1
        logo={{
          url: "#hero",
          src: "/radianz-logo.png",
          alt: "RADIANZ",
          title: SITE.name,
        }}
        menu={NAV_LINKS.map((item) => ({
          title: item.title,
          url: item.url,
        }))}
        auth={{
          login: { title: "Log in", url: "#contact" },
          signup: { title: "Request a demo", url: "#contact" },
        }}
      />
      <main id="hero">
        <section id="benefices">
          <Hero45
          badge={SITE.badge}
          heading={SITE.tagline}
          description={SITE.vision}
          statBadges={[...STAT_BADGES]}
          images={[
            {
              src: "/hero-top.png",
              alt: "Solar prospecting and roof mapping",
            },
          ]}
          features={heroFeaturesWithIcons}
        />
        </section>
      </main>
      <section id="avantages">
        <Feature166
          badge={FEATURE_SECTION.badge}
          description={FEATURE_SECTION.description}
          feature1={{
            title: FEATURES_166[0].title,
            description: FEATURES_166[0].description,
            image: "/feature-carto.jpg",
          }}
          feature2={{
            title: FEATURES_166[1].title,
            description: FEATURES_166[1].description,
            image: IMAGES.placeholder,
            kpi: FEATURES_166[1].kpi,
            progress: FEATURES_166[1].progress
              ? FEATURES_166[1].progress.map((p) => ({
                  label: p.label,
                  value: p.value,
                  percentage: p.percentage,
                }))
              : undefined,
          }}
          feature3={{
            title: FEATURES_166[2].title,
            description: FEATURES_166[2].description,
            image: IMAGES.placeholder,
            illustration: "data-sources",
          }}
          feature4={{
            title: FEATURES_166[3].title,
            description: FEATURES_166[3].description,
            image: "/feature-map.png",
            clusters: FEATURES_166[3].clusters
              ? FEATURES_166[3].clusters.map((c) => ({ value: c.value, x: c.x, y: c.y }))
              : undefined,
          }}
        />
      </section>
      <PipelineSection />
      <ProspectPortalSection />
      <footer id="contact">
        <Footer2
          logo={{
            url: "#hero",
            src: "/radianz-logo.png",
            alt: "RADIANZ",
            title: SITE.name,
          }}
          tagline={FOOTER.tagline}
          menuItems={FOOTER.menuItems.map((item) => ({
            title: item.title,
            links: [...item.links],
          }))}
          copyright={FOOTER.copyright}
          bottomLinks={[...FOOTER.bottomLinks]}
        />
      </footer>
    </>
  );
}
