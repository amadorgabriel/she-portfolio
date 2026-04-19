import type { Metadata, Viewport } from "next";
import { Fredoka, VT323, Caveat, Inter } from "next/font/google";
import { SiteShell } from "@/components/site/SiteShell";
import { PersonJsonLd } from "@/components/seo/PersonJsonLd";
import { defaultMetadataBase } from "@/lib/metadata-shared";
import "./globals.css";

// Display font for titles - Y2K Glam style
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Terminal-style font for pop-ups and technical text
const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Handwriting font for captions and scrapbook elements
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body text font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF69B4",
};

export const metadata: Metadata = {
  metadataBase: defaultMetadataBase(),
  title: {
    default: "Portfólio Y2K | Fashion Designer",
    template: "%s | Portfólio Y2K",
  },
  description:
    "Portfólio de designer de moda com estética Y2K. Lookbook, styling, ilustrações e coleções em uma experiência interativa de dress-up game.",
  keywords: [
    "designer de moda",
    "portfólio",
    "Y2K",
    "fashion",
    "lookbook",
    "styling",
    "moda",
    "coleções",
  ],
  authors: [{ name: "Fashion Designer" }],
  creator: "Fashion Designer",
  publisher: "Fashion Designer",
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
    siteName: "Portfólio Y2K Fashion Designer",
    title: "Portfólio Y2K | Fashion Designer",
    description:
      "Portfólio de designer de moda com estética Y2K. Lookbook, styling, ilustrações e coleções.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfólio Y2K | Fashion Designer",
    description:
      "Portfólio de designer de moda com estética Y2K. Lookbook, styling, ilustrações e coleções.",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${fredoka.variable} ${vt323.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning: extensões (ex. cz-shortcut-listen no body) alteram o DOM antes da hidratação */}
      <body
        suppressHydrationWarning
        className="y2k-cursors flex min-h-full flex-1 flex-col bg-stars bg-leopard"
      >
        <a href="#conteudo-principal" className="skip-to-content">
          Saltar para o conteúdo
        </a>
        <PersonJsonLd />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
