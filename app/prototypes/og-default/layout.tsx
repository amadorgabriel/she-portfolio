import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protótipo · OG padrão",
  robots: { index: false, follow: false },
};

export default function OgPrototypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
