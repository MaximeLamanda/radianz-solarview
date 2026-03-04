"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Link2, Eye, Mail, Phone, Share2 } from "lucide-react";

interface ProspectPortalSectionProps {
  className?: string;
}

const ProspectPortalSection = ({ className }: ProspectPortalSectionProps) => {
  return (
    <section className={cn("py-24", className)}>
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Right: Browser mockup */}
          <div className="order-2 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900 lg:order-2">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-red-400" />
                <span className="size-2.5 rounded-full bg-amber-400" />
                <span className="size-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="ml-4 flex-1 rounded-md bg-white px-3 py-1.5 font-mono text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                app.radianz.io/p/prospect-001
              </div>
              <button
                type="button"
                className="ml-2 flex size-8 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
                aria-label="Partager"
              >
                <Share2 className="size-4 text-zinc-600 dark:text-zinc-400" />
              </button>
            </div>

            {/* Page content - max height + overflow for cut-off effect */}
            <div className="max-h-[420px] space-y-6 overflow-hidden p-6">
              {/* Prospect header */}
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Amazon Distribution Center #4</h3>
                  <p className="text-sm text-zinc-500">Inland Empire Region • CA</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-2xl font-semibold" style={{ color: "#171717" }}>
                    $2.4M
                  </span>
                </div>
              </div>

              {/* Bento grid + fake content below */}
              <div className="space-y-2">
              <div className="grid min-h-[280px] grid-cols-3 grid-rows-2 gap-2">
                {/* Photo - spans 2 rows */}
                <div className="relative row-span-2 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <img
                    src="/top-photo.png"
                    alt="Solar installation"
                    className="size-full object-cover"
                  />
                  <span
                    className="absolute left-2 top-2 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium"
                    style={{ backgroundColor: "#E4FE55", color: "#171717" }}
                  >
                    LIDAR
                  </span>
                </div>
                {/* Metrics */}
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Est. energy bill
                  </p>
                  <p className="text-lg font-semibold">$8.2K/yr</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Solar potential
                  </p>
                  <p className="text-lg font-semibold">847 kWp</p>
                </div>
                <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Saving
                  </p>
                  <p className="text-lg font-semibold">$120K</p>
                </div>
                <div className="flex min-h-[120px] flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-800/50">
                  <p className="shrink-0 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
                    Contact référent
                  </p>
                  <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/contact-referent.png"
                        alt="Référent"
                        width={36}
                        height={36}
                        className="size-9 shrink-0 rounded-full object-cover object-center"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-medium">Marie Dubois</p>
                        <p className="truncate text-[10px] text-zinc-500">Lyon • m.dubois@radianz.io</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <a
                        href="tel:+33123456789"
                        className="flex flex-1 items-center justify-center gap-1 rounded bg-zinc-200 py-1 text-[10px] font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                        aria-label="Appeler"
                      >
                        <Phone className="size-3" />
                        Call
                      </a>
                      <a
                        href="mailto:m.dubois@radianz.io"
                        className="flex flex-1 items-center justify-center gap-1 rounded bg-zinc-200 py-1 text-[10px] font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                        aria-label="Contacter"
                      >
                        <Mail className="size-3" />
                        Mail
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fake content below - partially visible, suggests more info */}
              <div className="space-y-2">
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-14 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50"
                    />
                  ))}
                </div>
                <div className="h-20 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                <div className="flex gap-2">
                  <div className="h-12 flex-1 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                  <div className="h-12 flex-1 animate-pulse rounded-lg border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800/50" />
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Left: Text content */}
          <div className="order-1 flex flex-col gap-8 lg:order-1">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                The Ultimate Shareable Prospect Portal
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Instantly transform raw technical data into a stunning, interactive proposal page.
                Your prospects don&apos;t just see numbers; they see their future energy savings in high
                definition.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Link2 className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Instant Share Link</h3>
                  <p className="text-xs text-muted-foreground">No downloads required</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/50">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: "#E4FE55" }}
                >
                  <Eye className="size-4" style={{ color: "#171717" }} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Live View Tracking</h3>
                  <p className="text-xs text-muted-foreground">Know exactly when they open it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProspectPortalSection };
