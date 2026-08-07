import { ArrowUpRight } from "lucide-react";

import { FaqSection } from "@/components/faq-section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { FaqItem } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type ServiceAuditProcessStep = {
  title: string;
  text: string;
};

export type ServiceAuditPageProps = {
  badge: string;
  heading: string;
  description: string;
  ctaPrimary: string;
  forWhoTitle: string;
  forWho: string[];
  processTitle: string;
  process: ServiceAuditProcessStep[];
  deliverablesTitle: string;
  deliverables: string[];
  proofTitle: string;
  proofDescription: string;
  proofCta: string;
  faqTitle: string;
  faq: FaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  className?: string;
};

export function ServiceAuditPage({
  badge,
  heading,
  description,
  ctaPrimary,
  forWhoTitle,
  forWho,
  processTitle,
  process,
  deliverablesTitle,
  deliverables,
  proofTitle,
  proofDescription,
  proofCta,
  faqTitle,
  faq,
  ctaTitle,
  ctaDescription,
  ctaButton,
  className,
}: ServiceAuditPageProps) {
  return (
    <div className={cn("bg-white", className)}>
      <section
        className="hero-dot-grid relative overflow-x-clip py-16 md:py-24"
        aria-labelledby="audit-ia-heading"
      >
        <div className="container relative z-10">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 md:items-center md:text-center">
            <span className="radianz-label">{badge}</span>
            <h1
              id="audit-ia-heading"
              className="text-3xl leading-[1.12] font-normal tracking-[-0.03em] text-balance md:text-5xl md:leading-tight"
            >
              {heading}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-balance md:text-lg">
              {description}
            </p>
            <Button
              asChild
              variant="lime"
              size="lg"
              className="h-12 gap-1.5 rounded-md px-6 text-base font-mono font-medium normal-case tracking-normal"
            >
              <Link href="/contact" className="inline-flex items-center gap-1.5">
                {ctaPrimary}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 md:py-28" aria-labelledby="audit-for-who">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 id="audit-for-who" className="text-section">
              {forWhoTitle}
            </h2>
            <ul className="mt-10 space-y-4">
              {forWho.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink"
                    aria-hidden
                  />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-card py-20 md:py-28"
        aria-labelledby="audit-process"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 id="audit-process" className="text-section">
              {processTitle}
            </h2>
            <ol className="mt-12 space-y-10">
              {process.map((step, index) => (
                <li key={step.title} className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-6">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28" aria-labelledby="audit-deliverables">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 id="audit-deliverables" className="text-section">
              {deliverablesTitle}
            </h2>
            <ul className="mt-10 space-y-3">
              {deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-border py-3 text-base last:border-b-0"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        className="border-y border-border bg-muted/40 py-20 md:py-28"
        aria-labelledby="audit-proof"
      >
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 id="audit-proof" className="text-section">
              {proofTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {proofDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="outline" size="lg">
                <Link
                  href="/case-studies/progenes"
                  className="inline-flex items-center gap-1.5"
                >
                  {proofCta}
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="default" size="lg">
                <Link href="/contact">{ctaPrimary}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FaqSection heading={faqTitle} items={faq} />

      <section
        className="border-t border-border bg-ink py-20 text-white md:py-28"
        aria-labelledby="audit-cta"
      >
        <div className="container">
          <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 md:items-center md:text-center">
            <h2 id="audit-cta" className="text-section text-white">
              {ctaTitle}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {ctaDescription}
            </p>
            <Button
              asChild
              variant="lime"
              size="lg"
              className="h-12 gap-1.5 rounded-md px-6 text-base font-mono font-medium normal-case tracking-normal"
            >
              <Link href="/contact" className="inline-flex items-center gap-1.5">
                {ctaButton}
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
