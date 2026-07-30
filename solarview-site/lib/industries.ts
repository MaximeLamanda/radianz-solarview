export const INDUSTRY_IDS = [
  "industrie",
  "finance",
  "saas",
  "energie",
  "immobilier",
  "retail",
] as const;

export type IndustryId = (typeof INDUSTRY_IDS)[number];

export const INDUSTRY_FILTER_ALL = "all" as const;
export type IndustryFilterId = typeof INDUSTRY_FILTER_ALL | IndustryId;

/** Les 6 cas du carousel homepage, dans le même ordre. */
export const HOMEPAGE_USE_CASE_IDS = [
  "document-search",
  "payment-reconciliation",
  "prospect-outreach",
  "rfp-automation",
  "contract-check",
  "support-chatbot",
] as const;

export type IndustryUseCase = {
  id: string;
  industryIds: readonly IndustryId[];
  imageSrc: string;
  galleryShapeId: number;
  stack: readonly string[];
};

/** Cas d’usage tagués (1..n industries). Les 6 premiers alignés sur le carousel homepage. */
export const INDUSTRY_USE_CASES: readonly IndustryUseCase[] = [
  {
    id: "document-search",
    industryIds: ["industrie", "immobilier", "finance"],
    imageSrc: "/use-cases/mesh-peach.png",
    galleryShapeId: 8,
    stack: ["RAG", "Embeddings", "Claude", "Postgres", "SharePoint"],
  },
  {
    id: "payment-reconciliation",
    industryIds: ["finance"],
    imageSrc: "/use-cases/mesh-cyan.png",
    galleryShapeId: 22,
    stack: ["OCR", "Matching rules", "ERP API", "Postgres", "n8n"],
  },
  {
    id: "prospect-outreach",
    industryIds: ["saas", "retail", "energie"],
    imageSrc: "/use-cases/mesh-ember.png",
    galleryShapeId: 1,
    stack: ["CRM", "LLM", "Enrichment API", "Email", "Sequences"],
  },
  {
    id: "rfp-automation",
    industryIds: ["industrie", "saas"],
    imageSrc: "/use-cases/mesh-teal.png",
    galleryShapeId: 14,
    stack: ["Document AI", "RAG", "Templates", "SharePoint", "Claude"],
  },
  {
    id: "contract-check",
    industryIds: ["immobilier", "finance"],
    imageSrc: "/use-cases/mesh-lime.png",
    galleryShapeId: 35,
    stack: ["NLP", "Clause rules", "Claude", "PDF pipeline", "Audit log"],
  },
  {
    id: "support-chatbot",
    industryIds: ["retail", "saas"],
    imageSrc: "/use-cases/mesh-indigo.png",
    galleryShapeId: 70,
    stack: ["RAG", "Chat UI", "Zendesk", "Claude", "Analytics"],
  },
  {
    id: "solar-cv",
    industryIds: ["energie"],
    imageSrc: "/use-cases/mesh-roi.png",
    galleryShapeId: 10,
    stack: ["Computer Vision", "GeoTIFF", "Python", "Mapbox", "Postgres"],
  },
  {
    id: "technical-docs",
    industryIds: ["industrie"],
    imageSrc: "/use-cases/mesh-teal.png",
    galleryShapeId: 27,
    stack: ["RAG", "Claude", "Notion", "Git", "Templates"],
  },
  {
    id: "returns-automation",
    industryIds: ["retail"],
    imageSrc: "/use-cases/mesh-ember.png",
    galleryShapeId: 40,
    stack: ["Shopify", "OMS", "Rules engine", "n8n", "Email"],
  },
  {
    id: "lease-extraction",
    industryIds: ["immobilier"],
    imageSrc: "/use-cases/mesh-peach.png",
    galleryShapeId: 55,
    stack: ["OCR", "Document AI", "Claude", "Postgres", "Validation UI"],
  },
  {
    id: "lead-scoring",
    industryIds: ["saas", "energie"],
    imageSrc: "/use-cases/mesh-cyan.png",
    galleryShapeId: 63,
    stack: ["CRM", "Scoring model", "Webhooks", "Dashboards", "Claude"],
  },
] as const;

export function isIndustryId(value: string | null | undefined): value is IndustryId {
  return (
    typeof value === "string" &&
    (INDUSTRY_IDS as readonly string[]).includes(value)
  );
}

export function isIndustryFilterId(
  value: string | null | undefined,
): value is IndustryFilterId {
  return value === INDUSTRY_FILTER_ALL || isIndustryId(value);
}

export function parseIndustryParam(
  value: string | null | undefined,
): IndustryFilterId {
  return isIndustryFilterId(value) ? value : INDUSTRY_FILTER_ALL;
}

export function getUseCasesForIndustry(
  industryId: IndustryId,
): IndustryUseCase[] {
  return INDUSTRY_USE_CASES.filter((item) =>
    item.industryIds.includes(industryId),
  );
}

export function getUseCasesForFilter(
  filterId: IndustryFilterId,
): IndustryUseCase[] {
  if (filterId === INDUSTRY_FILTER_ALL) {
    return [...INDUSTRY_USE_CASES];
  }
  return getUseCasesForIndustry(filterId);
}

export function getUseCaseById(id: string): IndustryUseCase | undefined {
  return INDUSTRY_USE_CASES.find((item) => item.id === id);
}
