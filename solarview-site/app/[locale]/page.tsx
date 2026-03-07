import { Clock, MapPin, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Navbar1 } from "@/components/navbar1";
import { Hero45 } from "@/components/hero45";
import { Feature166 } from "@/components/feature166";
import { PipelineSection } from "@/components/pipeline-section";
import { ProspectPortalSection } from "@/components/prospect-portal-section";
import { SearchSection } from "@/components/search-section";
import { LetsTalkSection } from "@/components/lets-talk-section";
import { Footer2 } from "@/components/footer2";

import { STAT_BADGES, HERO_FEATURES, FEATURES_166, IMAGES } from "@/lib/constants";

export default async function Home() {
  const tSite = await getTranslations("site");
  const tNav = await getTranslations("nav");
  const tFeature = await getTranslations("feature");
  const tPipeline = await getTranslations("pipeline");
  const tContact = await getTranslations("contact");
  const tFooter = await getTranslations("footer");
  const tHero = await getTranslations("hero");

  const heroFeaturesWithIcons = [
    { ...HERO_FEATURES[0], icon: Clock, title: tHero("buildingsScanned"), description: tHero("buildingsScannedDesc") },
    { ...HERO_FEATURES[1], icon: Target, title: tHero("higherCloseRate"), description: tHero("higherCloseRateDesc") },
    { ...HERO_FEATURES[2], icon: MapPin, title: tHero("capacityAnalyzed"), description: tHero("capacityAnalyzedDesc") },
  ];

  return (
    <>
      <Navbar1
        logo={{
          url: "#hero",
          src: "/radianz-logo.png",
          alt: tSite("name"),
          title: tSite("name"),
        }}
        menu={[
          { title: tFeature("about"), url: "/#avantages" },
          { title: tPipeline("badge"), url: "/#features" },
          { title: tContact("badge"), url: "/contact" },
        ]}
        auth={{
          login: { title: tNav("logIn"), url: "/contact" },
          signup: { title: tNav("requestDemo"), url: "/contact" },
        }}
      />
      <main id="hero">
        <section id="benefices">
          <Hero45
            badge={tSite("badge")}
            heading={tSite("tagline")}
            description={tSite("vision")}
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
          badge={tFeature("about")}
          description={tFeature("description")}
          feature1={{
            title: tFeature("commercialRoof"),
            description: tFeature("commercialRoofDesc"),
            image: "/feature-carto.jpg",
          }}
          feature2={{
            title: tFeature("fasterQualification"),
            description: tFeature("fasterQualificationDesc"),
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
            title: tFeature("officialData"),
            description: tFeature("officialDataDesc"),
            image: IMAGES.placeholder,
            illustration: "data-sources",
          }}
          feature4={{
            title: tFeature("smartMatching"),
            description: tFeature("smartMatchingDesc"),
            image: "/feature-map.png",
            clusters: FEATURES_166[3].clusters
              ? FEATURES_166[3].clusters.map((c) => ({ value: c.value, x: c.x, y: c.y }))
              : undefined,
          }}
        />
      </section>
      <section id="features">
        <SearchSection />
        <PipelineSection />
        <ProspectPortalSection />
      </section>
      <section id="contact-form">
        <LetsTalkSection />
      </section>
      <footer id="contact">
        <Footer2
          logo={{
            url: "#hero",
            src: "/radianz-logo.png",
            alt: tSite("name"),
            title: tSite("name"),
          }}
          tagline={tSite("footerTagline")}
          menuItems={[
            {
              title: tFooter("product"),
              links: [
                { text: tFooter("features"), url: "#avantages" },
                { text: tFooter("pricing"), url: "/contact" },
                { text: tFooter("requestDemo"), url: "/contact" },
              ],
            },
            {
              title: tFooter("company"),
              links: [
                { text: tFooter("about"), url: "#hero" },
                { text: tFooter("contact"), url: "/contact" },
              ],
            },
            {
              title: tFooter("resources"),
              links: [
                { text: tFooter("legalNotice"), url: "#" },
                { text: tFooter("privacy"), url: "#" },
              ],
            },
          ]}
          copyright={tSite("copyright")}
          bottomLinks={[
            { text: tFooter("legalNotice"), url: "#" },
            { text: tFooter("privacyPolicy"), url: "#" },
          ]}
        />
      </footer>
    </>
  );
}
