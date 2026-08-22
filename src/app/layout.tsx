import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { HudBackdrop } from "@/components/layout/HudBackdrop";
import { PointerDepth } from "@/components/layout/PointerDepth";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SystemNav } from "@/components/nav/SystemNav";
import { site } from "@/content/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-tech",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#edf1f7",
  colorScheme: "light",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  /** slot delle finestre di sezione (route intercettate in `@modal/`) */
  modal: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${jetbrains.variable}`}
      // Lo script inline qui sotto aggiunge la classe `js` a <html> prima
      // dell'idratazione: la differenza con l'HTML del server è voluta.
      suppressHydrationWarning
    >
      <head>
        {/*
         * Marca il documento come "con JavaScript" prima del primo paint.
         * Le animazioni di ingresso sono vincolate a `.js`: senza script il
         * contenuto resta visibile invece di restare a opacità zero.
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-hud-accent focus:px-4 focus:py-2 focus:text-sm focus:text-hud-on-accent"
        >
          Salta al contenuto
        </a>

        <PointerDepth />
        <HudBackdrop />
        <SystemNav />

        <main id="contenuto" className="relative z-10">
          {children}
        </main>

        <SiteFooter />

        {modal}
      </body>
    </html>
  );
}
