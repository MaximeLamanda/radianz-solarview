import { Link } from "@/i18n/navigation";

type ArticleParagraphProps = {
  text: string;
};

type InlinePart =
  | { type: "text"; value: string }
  | { type: "bold"; value: string }
  | { type: "link"; value: string; href: string };

const INLINE_PATTERN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

function isInternalArticlePath(href: string): boolean {
  return href.startsWith("/articles/") || href.startsWith("/fr/articles/") || href.startsWith("/en/articles/");
}

function normalizeInternalHref(href: string): string {
  if (href.startsWith("/fr/articles/") || href.startsWith("/en/articles/")) {
    return href.replace(/^\/(fr|en)/, "");
  }
  return href;
}

function parseInlineParts(text: string): InlinePart[] {
  const parts: InlinePart[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, match.index) });
    }

    if (match[1] !== undefined && match[2] !== undefined) {
      parts.push({ type: "link", value: match[1], href: match[2] });
    } else if (match[3] !== undefined) {
      parts.push({ type: "bold", value: match[3] });
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  return parts;
}

function renderInlinePart(part: InlinePart, index: number) {
  if (part.type === "text") {
    return <span key={index}>{part.value}</span>;
  }

  if (part.type === "bold") {
    return (
      <strong key={index} className="font-medium text-foreground">
        {part.value}
      </strong>
    );
  }

  if (isInternalArticlePath(part.href)) {
    return (
      <Link key={index} href={normalizeInternalHref(part.href)} className="underline underline-offset-4">
        {part.value}
      </Link>
    );
  }

  return (
    <a key={index} href={part.href} className="underline underline-offset-4" rel="noopener noreferrer">
      {part.value}
    </a>
  );
}

export function ArticleParagraph({ text }: ArticleParagraphProps) {
  const parts = parseInlineParts(text);

  if (parts.length === 0) {
    return <p>{text}</p>;
  }

  return <p>{parts.map(renderInlinePart)}</p>;
}
