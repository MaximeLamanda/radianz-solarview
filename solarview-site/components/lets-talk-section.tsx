"use client";

import * as React from "react";
import { useTranslations, useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type LetsTalkError = "config" | "send";

interface LetsTalkSectionProps {
  className?: string;
  success?: boolean;
  error?: LetsTalkError;
  imageSrc?: string;
  locale?: string;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const DEFAULT_IMAGE = "/88c623f1371fe04eb47b0e9ffbc98d60.jpg";

const LEADS_OPTIONS = ["50", "100", "250", "500", "1000", "2000+"];

export function LetsTalkSection({
  className,
  success,
  error,
  imageSrc = DEFAULT_IMAGE,
  locale: localeProp,
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
    "w-full rounded-lg border border-zinc-700 bg-zinc-900/50 px-4 py-3 text-base text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-zinc-600 focus:ring-2 focus:ring-[#E4FE55]/20";

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container">
        <div className="mb-8 flex justify-center">
          <Badge variant="outline" className="shrink-0 font-mono text-xs uppercase tracking-wider">
            {t("badge")}
          </Badge>
        </div>
        <div className="mx-auto w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div
            className="relative grid min-h-[560px] bg-zinc-950 bg-cover bg-center lg:grid-cols-[1.4fr_1fr]"
            style={{ backgroundImage: `url(${imageSrc})` }}
          >
            <div className="absolute inset-0 bg-zinc-950/80" />
            {/* Left: copy - hidden on mobile */}
            <div className="relative z-10 hidden min-h-[320px] flex-col justify-between p-8 md:p-10 lg:flex lg:min-h-[560px]">
              <p className="font-sans text-2xl font-normal leading-[1.2] tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                {t("headline1")}
                <br />
                {t("headline2")}
              </p>
              <div className="mt-8 flex w-fit items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm lg:mt-0">
                <img
                  src="/alexislej.jpeg"
                  alt={t("contactRepName")}
                  className="size-14 rounded-full object-cover lg:size-16"
                />
                <div>
                  <p className="font-medium text-white">{t("contactRepName")}</p>
                  <p className="text-sm text-zinc-400">{t("contactRep")}</p>
                </div>
              </div>
            </div>

            {/* Right: form - full width on mobile */}
            <div className="relative z-10 flex min-h-[320px] w-full flex-col p-0 lg:min-h-[560px] lg:w-auto lg:p-5">
              <div className="flex min-h-full flex-1 flex-col rounded-none bg-black p-6 font-sans md:p-8 lg:rounded-2xl">
                <div className="mb-8 flex items-center gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={cn(
                      "pointer-events-auto transition-colors",
                      step === 1 ? "text-[#E4FE55]" : "text-zinc-500 hover:text-zinc-300"
                    )}
                  >
                    {t("step1")}
                  </button>
                  <div className="h-px flex-1 bg-zinc-800" />
                  <button
                    type="button"
                    onClick={() => step1Valid && setStep(2)}
                    className={cn(
                      "pointer-events-auto transition-colors",
                      step === 2 ? "text-[#E4FE55]" : "text-zinc-500 hover:text-zinc-300",
                      !step1Valid && "cursor-not-allowed opacity-60 hover:text-zinc-500"
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

                  {/* Step 1 */}
                  <div className={cn("flex flex-1 flex-col", step !== 1 && "hidden")}>
                    <div className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium tracking-wide text-zinc-300">{t("firstName")}</label>
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            autoComplete="given-name"
                            placeholder={t("placeholderFirstName")}
                            className={cn(
                              fieldBase,
                              attemptedNext && firstName.trim().length === 0 && "border-red-900/60 focus:border-red-800"
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium tracking-wide text-zinc-300">{t("lastName")}</label>
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            type="text"
                            autoComplete="family-name"
                            placeholder={t("placeholderLastName")}
                            className={cn(
                              fieldBase,
                              attemptedNext && lastName.trim().length === 0 && "border-red-900/60 focus:border-red-800"
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium tracking-wide text-zinc-300">{t("email")}</label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          name="email"
                          autoComplete="email"
                          placeholder={t("placeholderEmail")}
                          className={cn(
                            fieldBase,
                            attemptedNext && !isValidEmail(email) && "border-red-900/60 focus:border-red-800"
                          )}
                        />
                      </div>
                      <div>
                        <label className="mb-3 block text-sm font-medium tracking-wide text-zinc-300">
                          {t("leadsPerMonth")}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {LEADS_OPTIONS.map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setLeadsPerMonth(value)}
                              className={cn(
                                "rounded-lg border-0 px-3 py-1.5 font-mono text-sm font-normal tracking-wide transition",
                                leadsPerMonth === value
                                  ? "bg-[#E4FE55] text-[#171717]"
                                  : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600/80"
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
                      <button
                        type="button"
                        onClick={goNext}
                        className={cn(
                          "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold tracking-wide transition",
                          step1Valid
                            ? "bg-[#E4FE55] text-[#171717] hover:bg-[#d7f24f]"
                            : "cursor-not-allowed bg-zinc-800 text-zinc-400"
                        )}
                        aria-disabled={!step1Valid}
                      >
                        {t("next")}
                        <span aria-hidden="true">›</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={cn("flex flex-1 flex-col", step !== 2 && "hidden")}>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-sm font-medium tracking-wide text-zinc-300">{t("company")}</label>
                        <input
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
                        <label className="mb-2 block text-sm font-medium tracking-wide text-zinc-300">{t("message")}</label>
                        <textarea
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
                      <button
                        type="button"
                        onClick={goBack}
                        className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-800 bg-transparent px-5 py-3 text-sm font-semibold tracking-wide text-zinc-200 transition hover:border-zinc-700 hover:bg-zinc-900 sm:w-auto"
                      >
                        {t("back")}
                      </button>
                      <button
                        type="submit"
                        className="inline-flex w-full flex-1 items-center justify-center rounded-xl bg-[#E4FE55] px-5 py-3 text-sm font-semibold tracking-wide text-[#171717] transition hover:bg-[#d7f24f]"
                      >
                        {t("send")}
                      </button>
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

