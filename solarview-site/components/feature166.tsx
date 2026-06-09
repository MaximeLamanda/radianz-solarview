import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { ProductionConsumptionChart } from "@/components/production-consumption-chart";
import { Building2, Link2, Map, MousePointer2 } from "lucide-react";

function DiscoverSiteCard({
  logo,
  name,
  parcelSurface,
  buildingSurface,
  parcelLabel,
  buildingLabel,
  selected = false,
}: {
  logo: string;
  name: string;
  parcelSurface: string;
  buildingSurface: string;
  parcelLabel: string;
  buildingLabel: string;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex min-w-[168px] shrink-0 items-center gap-2.5 rounded-md border border-border px-2.5 py-2 shadow-sm backdrop-blur-sm sm:min-w-[188px] sm:gap-3 sm:px-3 sm:py-2.5",
        selected ? "cursor-default bg-muted/95 ring-1 ring-foreground/20" : "bg-card/95",
      )}
    >
      <img
        src={logo}
        alt={name}
        width={36}
        height={36}
        loading="lazy"
        className="size-8 shrink-0 rounded-sm object-cover sm:size-9"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold">{name}</p>
        <div className="mt-1 flex items-center gap-2.5 sm:gap-3">
          <div className="flex min-w-0 items-center gap-1">
            <Map className="size-3 shrink-0 text-muted-foreground" aria-label={parcelLabel} />
            <span className="truncate font-mono text-[10px] font-medium">{parcelSurface}</span>
          </div>
          <div className="flex min-w-0 items-center gap-1">
            <Building2 className="size-3 shrink-0 text-muted-foreground" aria-label={buildingLabel} />
            <span className="truncate font-mono text-[10px] font-medium">{buildingSurface}</span>
          </div>
        </div>
      </div>
      {selected ? (
        <MousePointer2
          className="pointer-events-none absolute top-1.5 right-2 size-4 fill-foreground text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}

function DiscoverMapIllustration({
  image,
  alt,
  sites,
  parcelLabel,
  buildingLabel,
  className,
}: {
  image: string;
  alt: string;
  sites?: {
    logo: string;
    name: string;
    parcelSurface: string;
    buildingSurface: string;
    selected?: boolean;
  }[];
  parcelLabel: string;
  buildingLabel: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border md:aspect-auto md:h-[220px]">
        <img
          src={image}
          alt={alt}
          width={1200}
          height={700}
          loading="lazy"
          className="absolute inset-0 size-full min-w-full object-cover object-[center_80%]"
        />
        {sites && sites.length > 0 ? (
          <div className="absolute right-0 bottom-3 left-3 flex gap-2 overflow-hidden sm:bottom-4 sm:left-4">
            {sites.map((site) => (
              <DiscoverSiteCard
                key={site.name}
                {...site}
                parcelLabel={parcelLabel}
                buildingLabel={buildingLabel}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SimulationEquipmentCard({
  label,
  reference,
  image,
}: {
  label: string;
  reference: string;
  image?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2.5 rounded-md border border-border bg-card px-2.5 py-2">
      {image ? (
        <img src={image} alt={reference} className="size-8 shrink-0 rounded-sm object-cover" />
      ) : (
        <div className="size-8 shrink-0 rounded-sm bg-muted" aria-hidden />
      )}
      <div className="min-w-0">
        <p className="font-mono text-[9px] font-medium tracking-[0.12em] text-muted-foreground">
          {label}
        </p>
        <p className="truncate font-mono text-[10px] font-medium">{reference}</p>
      </div>
    </div>
  );
}

function SimulationIllustration({
  siteName,
  siteAddress,
  cards,
  className,
}: {
  siteName: string;
  siteAddress: string;
  cards: { label: string; reference: string; image?: string }[];
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-x-4 bottom-0 translate-y-[30%] md:inset-x-4 md:translate-y-[20%] lg:inset-x-5 lg:translate-y-[16%]">
        <div className="rounded-lg border border-border/80 bg-card/95 px-3 py-2 shadow-lg backdrop-blur-sm sm:px-3.5 sm:py-2.5">
          <div className="mb-2 min-w-0">
            <p className="truncate text-xs font-semibold">{siteName}</p>
            <p className="truncate text-[10px] text-muted-foreground">{siteAddress}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cards.map((card) => (
              <SimulationEquipmentCard key={card.label} {...card} />
            ))}
          </div>
          <ProductionConsumptionChart className="mt-2 min-h-[170px] md:min-h-[200px] [&_svg]:min-h-[120px] md:[&_svg]:min-h-[148px]" />
        </div>
      </div>
    </div>
  );
}

function ConvinceEmailIllustration({
  className,
  ...emailProps
}: {
  className?: string;
  windowLabel: string;
  to: string;
  subject: string;
  greeting: string;
  bodyBeforeLink: string;
  link: string;
  bodyAfterLink: string;
  closing: string;
  sender: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="absolute right-4 bottom-0 w-[92%] max-w-md translate-x-[12%] translate-y-[38%] md:right-5 md:w-[88%] md:translate-x-[14%] md:translate-y-[26%] lg:right-2 lg:w-full lg:max-w-xl lg:translate-x-[14%] lg:translate-y-[28%]">
        <FollowUpEmailIllustration {...emailProps} />
      </div>
    </div>
  );
}

function FollowUpEmailIllustration({
  windowLabel,
  to,
  subject,
  greeting,
  bodyBeforeLink,
  link,
  bodyAfterLink,
  closing,
  sender,
  className,
}: {
  windowLabel: string;
  to: string;
  subject: string;
  greeting: string;
  bodyBeforeLink: string;
  link: string;
  bodyAfterLink: string;
  closing: string;
  sender: string;
  className?: string;
}) {
  return (
    <div className={cn("radianz-mockup w-full", className)}>
      <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-4 min-w-0 flex-1 truncate rounded-md bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground">
          {windowLabel}
        </div>
      </div>

      <div className="bg-card p-4">
        <div className="space-y-2.5 rounded-md border border-border bg-muted/30 p-3 text-xs leading-relaxed">
          <div className="space-y-0.5 border-b border-border pb-2.5">
            <p className="text-[10px] text-muted-foreground">{to}</p>
            <p className="font-medium text-foreground">{subject}</p>
          </div>
          <p className="font-medium text-foreground">{greeting}</p>
          <p className="text-muted-foreground">{bodyBeforeLink}</p>
          <div className="relative w-fit max-w-full">
            <p className="flex items-center gap-1.5 truncate rounded-md border border-accent/50 bg-accent/30 py-1.5 pr-2.5 pl-2 font-mono text-[11px] font-medium text-foreground">
              <Link2 className="size-3 shrink-0 text-foreground/80" aria-hidden />
              <span className="truncate">{link}</span>
            </p>
            <MousePointer2
              className="pointer-events-none absolute top-[calc(100%-2px)] left-[62%] size-4 fill-foreground text-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
              aria-hidden
            />
          </div>
          <p className="text-muted-foreground">{bodyAfterLink}</p>
          <p className="text-muted-foreground">
            {closing}
            <br />
            {sender}
          </p>
        </div>
      </div>
    </div>
  );
}

interface Feature {
  title: string;
  description: string;
  descriptionShort?: string;
  kpi?: string;
  kpiSuffix?: string;
  kpiLabel?: string;
  qualificationTags?: string[];
  illustration?: "map" | "production-chart" | "follow-up-email" | "empty";
  image?: string;
  imageAlt?: string;
  mapSites?: {
    logo: string;
    name: string;
    parcelSurface: string;
    buildingSurface: string;
    selected?: boolean;
  }[];
  mapParcelLabel?: string;
  mapBuildingLabel?: string;
  simulationSiteName?: string;
  simulationSiteAddress?: string;
  simulationCards?: { label: string; reference: string; image?: string }[];
  convinceEmail?: {
    windowLabel: string;
    to: string;
    subject: string;
    greeting: string;
    bodyBeforeLink: string;
    link: string;
    bodyAfterLink: string;
    closing: string;
    sender: string;
  };
}

interface Feature166Props {
  title?: string;
  description: string;
  badge?: string;
  feature1: Feature;
  feature2: Feature;
  feature3: Feature;
  feature4: Feature;
  className?: string;
}

const Feature166 = ({
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  badge,
  feature1 = {
    title: "UI/UX Design",
    description:
      "Creating intuitive user experiences with modern interface design principles and user-centered methodologies.",
  },
  feature2 = {
    title: "Responsive Development",
    description:
      "Building websites that look and function perfectly across all devices and screen sizes.",
    kpi: "15",
    kpiSuffix: "faster",
    kpiLabel: "than manual qualification",
  },
  feature3 = {
    title: "Brand Integration",
    description:
      "Seamlessly incorporating your brand identity into every aspect of your website's design.",
    illustration: "production-chart",
  },
  feature4 = {
    title: "Performance Optimization",
    description:
      "Ensuring fast loading times and smooth performance through optimized code and assets.",
    illustration: "empty",
  },
  className,
}: Feature166Props) => {
  const bentoDescriptionClass =
    "text-sm leading-snug text-muted-foreground md:text-base md:leading-normal";
  const bentoDescriptionAccentClass =
    "text-sm leading-snug text-foreground/70 md:text-base md:leading-normal";

  return (
    <section className={cn("pt-12 pb-16 md:pt-16 md:pb-24 lg:pb-32", className)}>
      <div className="container">
        <div className="mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-start md:gap-12">
          {badge && (
            <Badge
              variant="outline"
              className="shrink-0 font-mono text-xs uppercase tracking-wider"
            >
              {badge}
            </Badge>
          )}
          <p className="min-w-0 max-w-4xl flex-1 text-2xl font-light leading-snug tracking-tight lg:text-3xl">
            {description}
          </p>
        </div>
        <div className="relative flex w-full justify-center">
          <div className="relative flex w-full flex-col gap-4">
            <div className="relative flex flex-col gap-4 md:flex-row md:gap-4">
              <div className="flex flex-col rounded-xl border border-border bg-card p-4 md:w-3/5 md:p-4 lg:p-5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-normal lg:text-3xl">{feature1.title}</h2>
                  <p className={bentoDescriptionClass}>{feature1.description}</p>
                </div>
                {feature1.illustration === "map" && feature1.image && (
                  <DiscoverMapIllustration
                    image={feature1.image}
                    alt={feature1.imageAlt ?? feature1.title}
                    sites={feature1.mapSites}
                    parcelLabel={feature1.mapParcelLabel ?? "Parcelle"}
                    buildingLabel={feature1.mapBuildingLabel ?? "Bâtiment"}
                    className="mt-3 w-full"
                  />
                )}
              </div>
              <div className="radianz-accent-card flex min-h-[260px] flex-col rounded-xl p-4 md:min-h-0 md:w-2/5 md:p-4 lg:p-5">
                <div className="relative z-10">
                  <h2 className="text-2xl font-medium lg:text-3xl">{feature2.title}</h2>
                </div>
                <div className="relative z-10 mt-auto space-y-3">
                  {feature2.kpi && (
                    <div>
                      <p className="font-mono tracking-tight">
                        <span className="text-6xl font-normal leading-none lg:text-7xl">×{feature2.kpi}</span>
                      </p>
                      {(feature2.kpiSuffix || feature2.kpiLabel) && (
                        <span className={cn("mt-1 block", bentoDescriptionAccentClass)}>
                          {[feature2.kpiSuffix, feature2.kpiLabel].filter(Boolean).join(" ")}
                        </span>
                      )}
                    </div>
                  )}
                  {feature2.kpi &&
                    feature2.qualificationTags &&
                    feature2.qualificationTags.length > 0 && (
                      <div className="border-t border-foreground/10" aria-hidden />
                    )}
                  {feature2.qualificationTags && feature2.qualificationTags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {feature2.qualificationTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-foreground px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-background"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className={bentoDescriptionAccentClass}>{feature2.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="relative flex flex-col gap-4 md:flex-row md:gap-4">
              <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card md:min-h-[440px] md:w-2/5">
                <div className="relative z-10 shrink-0 px-4 pt-4 md:px-4 md:pt-4 lg:px-5 lg:pt-5">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-normal lg:text-3xl">{feature3.title}</h2>
                    <p className={bentoDescriptionClass}>{feature3.description}</p>
                  </div>
                </div>
                {feature3.illustration === "production-chart" &&
                  feature3.simulationCards &&
                  feature3.simulationSiteName &&
                  feature3.simulationSiteAddress && (
                  <SimulationIllustration
                    siteName={feature3.simulationSiteName}
                    siteAddress={feature3.simulationSiteAddress}
                    cards={feature3.simulationCards}
                    className="mt-3 min-h-0 flex-1"
                  />
                )}
              </div>
              <div className="relative flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-border bg-card md:min-h-[440px] md:w-3/5">
                <div className="relative z-10 shrink-0 px-4 pt-4 md:px-4 md:pt-4 lg:px-5 lg:pt-5">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-normal lg:text-3xl">{feature4.title}</h2>
                    <p className={bentoDescriptionClass}>{feature4.description}</p>
                  </div>
                </div>
                {feature4.illustration === "follow-up-email" && feature4.convinceEmail && (
                  <ConvinceEmailIllustration className="mt-3 min-h-0 flex-1" {...feature4.convinceEmail} />
                )}
                {feature4.illustration === "empty" && (
                  <div
                    className="mx-4 mt-8 aspect-[1.5] w-auto rounded-lg bg-muted md:mx-5 lg:mx-6 lg:aspect-[2.4]"
                    aria-hidden
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature166 };
