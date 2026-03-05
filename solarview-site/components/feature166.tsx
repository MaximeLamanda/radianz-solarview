import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";

interface Feature {
  title: string;
  description: string;
  image: string;
  kpi?: string;
  progress?: { label: string; value: number; percentage?: number }[];
  clusters?: { value: string; x?: number; y?: number }[];
  illustration?: "data-sources";
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
  title,
  description = "Finely crafted components built with React, Tailwind and Shadcn UI. Developers can copy and paste these blocks directly into their project.",
  badge,
  feature1 = {
    title: "UI/UX Design",
    description:
      "Creating intuitive user experiences with modern interface design principles and user-centered methodologies.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  feature2 = {
    title: "Responsive Development",
    description:
      "Building websites that look and function perfectly across all devices and screen sizes.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  feature3 = {
    title: "Brand Integration",
    description:
      "Seamlessly incorporating your brand identity into every aspect of your website's design.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  feature4 = {
    title: "Performance Optimization",
    description:
      "Ensuring fast loading times and smooth performance through optimized code and assets.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
  className,
}: Feature166Props) => {
  return (
    <section className={cn("pb-16 pt-0 md:pb-24 lg:pb-32", className)}>
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
          <p className="min-w-0 max-w-4xl flex-1 text-2xl font-medium leading-snug lg:text-3xl">
            {description}
          </p>
        </div>
        <div className="relative flex justify-center">
          <div className="relative flex w-full flex-col gap-4 md:w-1/2 lg:w-full">
            <div className="relative flex flex-col gap-4 lg:flex-row lg:gap-4">
              <div
                className="relative flex min-h-[394px] flex-col justify-between overflow-hidden rounded-xl bg-cover bg-center p-5 md:p-6 lg:w-3/5 lg:p-10"
                style={{ backgroundImage: `url(${feature1.image})` }}
              >
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10">
                  <h2 className="text-2xl font-semibold text-white lg:text-3xl">{feature1.title}</h2>
                  <p className="max-w-md text-white/90">{feature1.description}</p>
                </div>
                {/* Box histogramme + consommation annuelle */}
                <div className="relative z-10 flex w-full max-w-[280px] flex-col gap-2 self-start rounded-lg border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md">
                  <span className="font-mono text-sm font-semibold tabular-nums text-white">
                    1.24 MWh/year
                  </span>
                  <svg viewBox="0 0 200 40" className="h-24 w-full" preserveAspectRatio="none" aria-hidden>
                      {[22, 18, 24, 20, 28, 32, 30, 34, 26, 22, 20, 24].map((h, i) => (
                        <rect
                          key={i}
                          x={4 + i * 16}
                          y={38 - h}
                          width={12}
                          height={h}
                          rx={2}
                          fill="rgba(255, 255, 255, 0.5)"
                        />
                      ))}
                    </svg>
                </div>
              </div>
              <div
                className="flex min-h-[300px] flex-col justify-between rounded-xl p-5 md:min-h-0 md:p-6 lg:w-2/5 lg:p-10"
                style={{ backgroundColor: "#E4FE55" }}
              >
                <div>
                  {feature2.kpi && (
                    <span
                      className="mb-2 block font-mono text-4xl font-semibold lg:text-5xl"
                      style={{ color: "#171717" }}
                    >
                      {feature2.kpi}
                    </span>
                  )}
                  <h2
                    className="text-2xl font-semibold lg:text-3xl"
                    style={{ color: "#171717" }}
                  >
                    {feature2.title}
                  </h2>
                </div>
                {feature2.progress ? (
                  <div className="mt-6 flex flex-col gap-3">
                    {feature2.progress.map((item) => (
                      <div key={item.label} className="flex items-center justify-between gap-3">
                        <span
                          className="text-sm font-medium"
                          style={{ color: "#171717" }}
                        >
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 10 }).map((_, i) => (
                              <span
                                key={i}
                                className={cn(
                                  "h-2 w-2 rounded-full",
                                  i < item.value ? "" : "opacity-30"
                                )}
                                style={{
                                  backgroundColor: i < item.value ? "#171717" : "#171717",
                                }}
                              />
                            ))}
                          </div>
                          {item.percentage != null && (
                            <span
                              className="w-10 text-right font-mono text-sm tabular-nums"
                              style={{ color: "#171717" }}
                            >
                              {item.percentage}%
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">{feature2.description}</p>
                )}
              </div>
            </div>
            <div className="relative flex flex-col gap-4 lg:flex-row lg:gap-4">
              <div className="flex flex-col justify-between rounded-xl border border-zinc-200 p-5 dark:border-zinc-700 md:p-6 lg:w-2/5 lg:p-10">
                <div>
                  <h2 className="text-2xl font-semibold lg:text-3xl">{feature3.title}</h2>
                  <p className="text-muted-foreground">{feature3.description}</p>
                </div>
                {feature3.illustration === "data-sources" ? (
                  <div className="mt-6 flex min-h-0 flex-1 flex-col items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
                    <img
                      src="/graphdata.svg"
                      alt="Data sources to Unified Prospect Profile"
                      className="h-full w-full max-h-[180px] max-w-[520px] object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={feature3.image}
                    alt={feature3.title}
                    className="mt-8 aspect-[1.45] h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col justify-between rounded-xl border border-zinc-200 p-5 dark:border-zinc-700 md:p-6 lg:w-3/5 lg:p-10">
                <div>
                  <h2 className="text-2xl font-semibold lg:text-3xl">{feature4.title}</h2>
                  <p className="text-muted-foreground">{feature4.description}</p>
                </div>
                <div className="relative mt-8 overflow-hidden rounded-lg">
                  <img
                    src={feature4.image}
                    alt={feature4.title}
                    className="aspect-[1.5] w-full object-cover lg:aspect-[2.4]"
                  />
                  {feature4.clusters && feature4.clusters.length > 0 && (
                    <>
                      {feature4.clusters.map((cluster, i) => (
                        <div
                          key={i}
                          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                          style={{
                            left: `${cluster.x ?? 25}%`,
                            top: `${cluster.y ?? 30}%`,
                          }}
                        >
                          {/* Cercle extérieur avec opacité réduite */}
                          <div
                            className="absolute size-12 rounded-full"
                            style={{
                              backgroundColor: "#E4FE55",
                              opacity: 0.35,
                            }}
                          />
                          {/* Cercle principal */}
                          <div
                            className="relative flex size-9 items-center justify-center rounded-full font-mono text-xs font-semibold"
                            style={{
                              backgroundColor: "#E4FE55",
                              color: "#171717",
                            }}
                          >
                            {cluster.value}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature166 };
