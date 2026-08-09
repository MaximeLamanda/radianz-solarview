import type { JSX } from "react";
import Image from "next/image";
import { Lightbulb } from "lucide-react";

import { AgentUrlAnalyzerIllustration } from "@/components/agent-url-analyzer-illustration";
import { SolarCvDetectionIllustration } from "@/components/solar-cv-detection-illustration";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import type {
  CaseStudy,
  CaseStudyIllustration,
} from "@/lib/case-studies";
import { cn } from "@/lib/utils";

type CaseStudyDetailLabels = {
  home: string;
  caseStudies: string;
  overview: string;
  sector: string;
  solution: string;
  learnMore: string;
  contactCta: string;
  visitSite?: string;
  agentPanelLabel?: string;
  agentUrlDone?: string;
  agentUrlPending?: string;
  solarDetectionLabel?: string;
  solarConfidenceLabel?: string;
};

interface CaseStudyDetailProps {
  study: CaseStudy;
  labels: CaseStudyDetailLabels;
  className?: string;
}

function CaseStudyMedia({
  illustration,
  labels,
  size = "cover",
}: {
  illustration: CaseStudyIllustration;
  labels: CaseStudyDetailLabels;
  size?: "cover" | "inline";
}): JSX.Element {
  if (illustration.type === "image") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border bg-muted",
          size === "cover" ? "aspect-video w-full" : "aspect-[16/10] w-full",
        )}
      >
        <Image
          src={illustration.src}
          alt={illustration.alt}
          width={illustration.width}
          height={illustration.height}
          quality={100}
          className="size-full object-cover object-top"
          sizes="(min-width: 1024px) 692px, 100vw"
          priority={size === "cover"}
        />
      </div>
    );
  }

  if (illustration.type === "agent") {
    return (
      <div
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted",
          size === "cover" ? "aspect-video w-full" : "aspect-[16/10] w-full",
        )}
      >
        <AgentUrlAnalyzerIllustration
          className="w-[min(68%,22rem)] group-hover:scale-100 group-focus-within:scale-100"
          panelLabel={labels.agentPanelLabel}
          urls={[
            {
              url: "articles/loi-aper-2026",
              status: "done",
              statusLabel: labels.agentUrlDone ?? "Analysé",
            },
            {
              url: "articles/audit-ia-entreprise-2026",
              status: "done",
              statusLabel: labels.agentUrlDone ?? "Analysé",
            },
            {
              url: "articles/autoconsommation-pme",
              status: "pending",
              statusLabel: labels.agentUrlPending ?? "En cours",
            },
          ]}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center overflow-hidden rounded-lg border border-border bg-muted",
        size === "cover" ? "aspect-video w-full" : "aspect-[16/10] w-full",
      )}
    >
      <SolarCvDetectionIllustration
        className="w-[min(78%,26rem)] group-hover:scale-100 group-focus-within:scale-100"
        detectionLabel={labels.solarDetectionLabel}
        confidenceLabel={labels.solarConfidenceLabel}
      />
    </div>
  );
}

export function CaseStudyDetail({
  study,
  labels,
  className,
}: CaseStudyDetailProps): JSX.Element {
  return (
    <section className={cn("py-12 md:py-20", className)}>
      <div className="container">
        <div className="mx-auto max-w-7xl">
          <Breadcrumb className="mb-6 lg:mb-10">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{labels.home}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/#case-studies">{labels.caseStudies}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{study.client}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="relative flex-col gap-10 lg:flex lg:flex-row lg:justify-between">
            <div className="lg:max-w-[692px]">
              <h1 className="text-3xl font-extrabold text-pretty md:text-4xl">
                {study.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">{study.excerpt}</p>

              <div className="my-8">
                <CaseStudyMedia
                  illustration={study.cover}
                  labels={labels}
                  size="cover"
                />
              </div>

              <div className="mb-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="flex flex-col gap-2">
                    <p className="text-3xl font-semibold sm:text-4xl md:text-5xl">
                      {metric.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8 max-w-prose space-y-10">
                {study.sections.map((section) => (
                  <section
                    id={section.id}
                    key={section.id}
                    className="scroll-mt-24"
                  >
                    <h2 className="text-2xl font-semibold tracking-tight">
                      {section.heading}
                    </h2>
                    <div className="mt-3 space-y-4 text-sm leading-7 text-muted-foreground">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {section.illustration ? (
                      <div className="my-6">
                        <CaseStudyMedia
                          illustration={section.illustration}
                          labels={labels}
                          size="inline"
                        />
                      </div>
                    ) : null}

                    {section.bullets ? (
                      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-muted-foreground">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}

                    {section.callout ? (
                      <Alert className="mt-6">
                        <Lightbulb className="size-4" />
                        <AlertTitle>{section.callout.title}</AlertTitle>
                        <AlertDescription>
                          {section.callout.description}
                        </AlertDescription>
                      </Alert>
                    ) : null}
                  </section>
                ))}
              </div>
            </div>

            <aside className="h-fit lg:sticky lg:top-24 lg:max-w-80">
              <p className="mb-1.5 text-sm font-semibold">{labels.overview}</p>
              <p className="mb-5 text-sm text-muted-foreground">
                {study.overview}
              </p>

              <p className="mb-1.5 text-sm font-semibold">{labels.sector}</p>
              <p className="mb-5 text-sm text-muted-foreground">{study.sector}</p>

              <p className="mb-1.5 text-sm font-semibold">{labels.solution}</p>
              <p className="inline-flex h-8 items-center rounded-lg border border-border bg-card px-3.5 font-mono text-[11px] font-medium uppercase tracking-wide text-foreground">
                {study.solution}
              </p>

              {study.externalUrl ? (
                <>
                  <Separator className="my-5" />
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={study.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {labels.visitSite ?? study.externalUrl}
                    </a>
                  </Button>
                </>
              ) : null}

              <Separator className="my-5" />
              <p className="mb-3 text-sm font-semibold">{labels.learnMore}</p>
              <Button size="sm" asChild>
                <Link href="/contact">{labels.contactCta}</Link>
              </Button>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

export type { CaseStudyDetailLabels };
