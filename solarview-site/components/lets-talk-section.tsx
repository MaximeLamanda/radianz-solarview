"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type LetsTalkError = "config" | "send";

interface LetsTalkSectionProps {
  className?: string;
  success?: boolean;
  error?: LetsTalkError;
  imageSrc?: string;
  locale?: string;
  asPageTitle?: boolean;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const DEFAULT_IMAGE = "/88c623f1371fe04eb47b0e9ffbc98d60.jpg";

const LEADS_OPTIONS = ["50", "100", "250", "500", "1000", "2000+"];

function TeamContactCard({ className }: { className?: string }) {
  const t = useTranslations("contact");

  return (
    <div
      className={cn(
        "flex w-fit flex-col gap-1 rounded-md bg-black/80 p-4 backdrop-blur-sm",
        className,
      )}
    >
      <p className="font-medium text-white">{t("contactRepName")}</p>
      <p className="text-sm text-white/60">{t("contactRep")}</p>
    </div>
  );
}

export function LetsTalkSection({
  className,
  success,
  error,
  imageSrc = DEFAULT_IMAGE,
  locale: localeProp,
  asPageTitle = false,
}: LetsTalkSectionProps) {
  const t = useTranslations("contact");
  const locale = useLocale();
  const currentLocale = localeProp ?? locale;

  const [step, setStep] = React.useState<1 | 2>(1);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [leadsPerMonth, setLeadsPerMonth] = React.useState<string>("");
  const [company, setCompany] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [attemptedNext, setAttemptedNext] = React.useState(false);

  const fullName = React.useMemo(() => {
    return `${firstName} ${lastName}`.trim().replace(/\s+/g, " ");
  }, [firstName, lastName]);

  const step1Valid = firstName.trim().length > 0 && lastName.trim().length > 0 && isValidEmail(email);

  function goNext() {
    setAttemptedNext(true);
    if (!step1Valid) return;
    setStep(2);
  }

  function goBack() {
    setStep(1);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (step === 1) {
      e.preventDefault();
      goNext();
    }
  }

  const fieldBase =
    "w-full rounded-md border-0 bg-white/10 px-4 py-3 text-base text-white placeholder:text-white/40 outline-none transition focus:bg-white/[0.14] focus:ring-2 focus:ring-accent/30";

  const HeadlineTag = asPageTitle ? "h1" : "p";

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="shrink-0 font-mono text-xs uppercase tracking-wider">
            {t("badge")}
          </Badge>
        </div>
        <div className="mx-auto w-full overflow-hidden rounded-lg border-0 bg-transparent shadow-none">
          <div
            className="relative grid min-h-[560px] bg-foreground bg-cover bg-center lg:grid-cols-[1.4fr_1fr]"
            style={{ backgroundImage: `url(${imageSrc})` }}
          >
            <div className="absolute inset-0 bg-foreground/80" />
            <div className="relative z-10 hidden min-h-[320px] flex-col justify-between p-8 md:p-10 lg:flex lg:min-h-[560px]">
              <HeadlineTag className="text-2xl font-light leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                {t("headline1")}
                <br />
                {t("headline2")}
              </HeadlineTag>
              <TeamContactCard className="mt-8 lg:mt-0" />
            </div>

            <div className="relative z-10 flex min-h-[320px] w-full flex-col p-0 lg:min-h-[560px] lg:w-auto lg:p-5">
              <div className="flex min-h-full flex-1 flex-col rounded-none bg-black p-6 font-sans md:p-8 lg:rounded-lg">
                {asPageTitle ? (
                  <HeadlineTag className="mb-6 text-2xl font-light leading-[1.2] tracking-tight text-white md:text-3xl lg:hidden">
                    {t("headline1")}
                    <br />
                    {t("headline2")}
                  </HeadlineTag>
                ) : null}
                <TeamContactCard className="mb-6 lg:hidden" />
                <div className="mb-8 flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={cn(
                      "pointer-events-auto transition-colors",
                      step === 1 ? "text-accent" : "hover:text-white/80",
                    )}
                  >
                    {t("step1")}
                  </button>
                  <div className="h-px flex-1 bg-white/15" />
                  <button
                    type="button"
                    onClick={() => step1Valid && setStep(2)}
                    className={cn(
                      "pointer-events-auto transition-colors",
                      step === 2 ? "text-accent" : "hover:text-white/80",
                      !step1Valid && "cursor-not-allowed opacity-60 hover:text-white/50",
                    )}
                    aria-disabled={!step1Valid}
                  >
                    {t("step2")}
                  </button>
                </div>

                {success && (
                  <div className="mb-6 rounded-xl border border-emerald-900/40 bg-emerald-950/30 px-4 py-3 text-sm font-medium text-emerald-200">
                    {t("successMessage")}
                  </div>
                )}

                {error && (
                  <div className="mb-6 rounded-xl border border-red-900/40 bg-red-950/30 px-4 py-3 text-sm font-medium text-red-200">
                    {error === "config" ? t("configError") : t("sendError")}
                  </div>
                )}

                <form action="/api/contact" method="POST" className="flex flex-1 flex-col" onSubmit={onSubmit}>
                  <input type="hidden" name="name" value={fullName} />
                  <input type="hidden" name="locale" value={currentLocale} />

                  <div className={cn("flex flex-1 flex-col", step !== 1 && "hidden")}>
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-firstName" className="radianz-label mb-2 block text-white/70">{t("firstName")}</label>
                          <input
                            id="contact-firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            name="firstName"
                            autoComplete="given-name"
                            placeholder={t("placeholderFirstName")}
                            className={cn(
                              fieldBase,
                              attemptedNext && firstName.trim().length === 0 && "ring-2 ring-red-900/60 focus:ring-red-800/50",
                            )}
                          />
                        </div>
                        <div>
                          <label htmlFor="contact-lastName" className="radianz-label mb-2 block text-white/70">{t("lastName")}</label>
                          <input
                            id="contact-lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            name="lastName"
                            autoComplete="family-name"
                            placeholder={t("placeholderLastName")}
                            className={cn(
                              fieldBase,
                              attemptedNext && lastName.trim().length === 0 && "ring-2 ring-red-900/60 focus:ring-red-800/50",
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="radianz-label mb-2 block text-white/70">{t("email")}</label>
                        <input
                          id="contact-email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder={t("placeholderEmail")}
                          className={cn(
                            fieldBase,
                            attemptedNext && !isValidEmail(email) && "ring-2 ring-red-900/60 focus:ring-red-800/50",
                          )}
                        />
                      </div>
                      <div>
                        <span id="contact-leads-label" className="radianz-label mb-3 block text-white/70">
                          {t("leadsPerMonth")}
                        </span>
                        <div className="flex flex-wrap gap-2" role="group" aria-labelledby="contact-leads-label">
                          {LEADS_OPTIONS.map((value) => (
                            <button
                              key={value}
                              type="button"
                              aria-pressed={leadsPerMonth === value}
                              onClick={() => setLeadsPerMonth(value)}
                              className={cn(
                                "rounded-md border-0 px-3 py-1.5 font-mono text-sm font-normal tracking-wide transition",
                                leadsPerMonth === value
                                  ? "bg-accent text-accent-foreground"
                                  : "bg-white/10 text-white/70 hover:bg-white/15",
                              )}
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" name="leadsPerMonth" value={leadsPerMonth} />
                      </div>
                    </div>
                    <div className="mt-auto pt-6">
                      <Button
                        type="button"
                        variant="lime"
                        size="lg"
                        onClick={goNext}
                        disabled={!step1Valid}
                        className="w-full"
                      >
                        {t("next")}
                        <span aria-hidden="true">›</span>
                      </Button>
                    </div>
                  </div>

                  <div className={cn("flex flex-1 flex-col", step !== 2 && "hidden")}>
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="contact-company" className="radianz-label mb-2 block text-white/70">{t("company")}</label>
                        <input
                          id="contact-company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          type="text"
                          name="company"
                          autoComplete="organization"
                          placeholder={t("placeholderCompany")}
                          className={fieldBase}
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-message" className="radianz-label mb-2 block text-white/70">{t("message")}</label>
                        <textarea
                          id="contact-message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          name="message"
                          rows={4}
                          placeholder={t("placeholderMessage")}
                          className={cn(fieldBase, "resize-y")}
                        />
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={goBack}
                        className="w-full border-0 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                      >
                        {t("back")}
                      </Button>
                      <Button type="submit" variant="lime" size="lg" className="w-full flex-1">
                        {t("send")}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
