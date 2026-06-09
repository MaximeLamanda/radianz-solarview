import { Link } from "@/i18n/navigation";

type ArticleParagraphProps = {
  text: string;
};

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function isInternalArticlePath(href: string): boolean {
  return href.startsWith("/articles/") || href.startsWith("/fr/articles/") || href.startsWith("/en/articles/");
}

function normalizeInternalHref(href: string): string {
  if (href.startsWith("/fr/articles/") || href.startsWith("/en/articles/")) {
    return href.replace(/^\/(fr|en)/, "");
  }
  return href;
}

export function ArticleParagraph({ text }: ArticleParagraphProps) {
  const parts: Array<{ type: "text" | "link"; value: string; href?: string }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    parts.push({ type: "link", value: match[1], href: match[2] });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return <p>{text}</p>;
  }

  return (
    <p>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={index}>{part.value}</span>;
        }

        const href = part.href ?? "#";

        if (isInternalArticlePath(href)) {
          return (
            <Link key={index} href={normalizeInternalHref(href)} className="underline underline-offset-4">
              {part.value}
            </Link>
          );
        }

        return (
          <a key={index} href={href} className="underline underline-offset-4" rel="noopener noreferrer">
            {part.value}
          </a>
        );
      })}
    </p>
  );
}
