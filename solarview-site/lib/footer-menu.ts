type FooterTranslator = {
  (key: "product" | "resources" | "features" | "requestDemo" | "articles" | "contact" | "privacyPolicy"): string;
};

export function buildFooterMenuItems(tFooter: FooterTranslator) {
  return [
    {
      title: tFooter("product"),
      links: [
        { text: tFooter("features"), url: "/#avantages" },
        { text: tFooter("requestDemo"), url: "/contact" },
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
