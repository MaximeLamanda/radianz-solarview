import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";

import { defaultLocale, locales, type Locale } from "./i18n/config";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);
  const segment = request.nextUrl.pathname.split("/")[1];
  const locale = locales.includes(segment as Locale) ? segment : defaultLocale;
  response.headers.set("x-site-locale", locale);
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|opengraph-image|robots\\.txt|sitemap\\.xml|favicon\\.ico|icon|apple-icon|.*\\..*).*)",
  ],
};
