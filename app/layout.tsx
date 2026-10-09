import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { getSiteConfig } from "@/lib/cms";
import { defaultMetadataBase } from "@/lib/metadata-shared";
import { resolveSiteIcons } from "@/lib/site-icons";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1a1a1a",
};

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const brand = config?.brandName || config?.siteTitle || "Karina Reis";
  const description =
    config?.metaDescription ||
    `Portfólio de ${brand} — design, estilo e direção criativa.`;

  return {
    metadataBase: defaultMetadataBase(),
    title: {
      default: brand,
      template: `%s | ${brand}`,
    },
    description,
    keywords: [
      "Karina Reis",
      "portfólio",
      "design",
      "estilo",
      "estamparia",
      "direção criativa",
      "moda",
    ],
    authors: [{ name: brand }],
    creator: brand,
    publisher: brand,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: brand,
      title: brand,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: brand,
      description,
    },
    icons: resolveSiteIcons(config?.favicon),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-1 flex-col bg-[var(--color-bg)] text-[var(--color-ink)]"
      >
        <a href="#conteudo-principal" className="skip-to-content">
          Saltar para o conteúdo
        </a>
        <SiteJsonLd />
        <main id="conteudo-principal" className="flex min-h-full flex-1 flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
