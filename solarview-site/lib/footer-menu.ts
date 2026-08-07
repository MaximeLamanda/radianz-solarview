type FooterTranslator = {
  (
    key:
      | "services"
      | "expertises"
      | "resources"
      | "audit"
      | "platform"
      | "accompaniment"
      | "bookCall"
      | "articles"
      | "contact"
      | "privacyPolicy",
  ): string;
};

export function buildFooterMenuItems(tFooter: FooterTranslator) {
  return [
    {
      title: tFooter("services"),
      links: [
        { text: tFooter("audit"), url: "/services/audit-ia" },
        { text: tFooter("platform"), url: "/#offre-plateforme" },
        { text: tFooter("accompaniment"), url: "/#services" },
        { text: tFooter("bookCall"), url: "/contact" },
      ],
    },
    {
      title: tFooter("resources"),
      links: [
        { text: tFooter("articles"), url: "/articles" },
        { text: tFooter("contact"), url: "/contact" },
      ],
    },
  ];
}

export function buildFooterBottomLinks(tFooter: FooterTranslator) {
  return [{ text: tFooter("privacyPolicy"), url: "/privacy" }];
}
