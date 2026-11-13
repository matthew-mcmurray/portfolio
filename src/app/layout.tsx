import type { Metadata, Viewport } from "next";

import "@fontsource-variable/inter";
import "@fontsource-variable/anybody/standard.css"; // weight + width axes
import "@fontsource-variable/bricolage-grotesque";
import "@fontsource/silkscreen/400.css";

import "./globals.css";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `${site.statementLead} ${site.statementRest}`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.statementLead,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f1ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Marks JS as available before paint, so reveal styles never hide content without JS. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
