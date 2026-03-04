import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RADIANZ — Solar potential at your fingertips",
  description:
    "Solar prospecting platform to identify, evaluate and convert high-potential buildings into qualified leads.",
  icons: {
    icon: "/radianz-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full w-full font-sans antialiased`}
      >
        <div className="min-h-full w-full">{children}</div>
      </body>
    </html>
  );
}
