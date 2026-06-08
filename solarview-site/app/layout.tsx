import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LocaleHtmlUpdater } from "@/components/locale-html";
import { siteIcons, socialShareImages, socialTwitterImages, SITE_URL } from "@/lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: siteIcons(),
  title: {
    default: "RADIANZ — C&I solar prospecting platform",
    template: "%s",
  },
  description:
    "Qualify commercial and industrial rooftops, score solar leads, and share data-backed proposals.",
  openGraph: {
    type: "website",
    siteName: "RADIANZ",
    images: socialShareImages(),
  },
  twitter: {
    card: "summary_large_image",
    images: socialTwitterImages(),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full w-full" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-full w-full font-sans antialiased`}
      >
        <LocaleHtmlUpdater />
        <div className="min-h-full w-full">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
