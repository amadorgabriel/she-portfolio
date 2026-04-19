import type { Metadata } from "next";
import { getContactPageData } from "@/lib/cms";
import { ContactLetterForm } from "@/components/pages/ContactLetterForm";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { getSiteBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getContactPageData();
  const title = "Contato";
  const description =
    siteConfig?.metaDescription?.trim() ||
    "Cartinha digital — nome, email, assunto e mensagem. Vamos conversar sobre moda e projetos.";
  const base = getSiteBaseUrl();
  const og = siteConfig?.ogImage
    ? imageUrlFromSanity(siteConfig.ogImage, { width: 1200, height: 630 })
    : undefined;

  return {
    title,
    description,
    alternates: base ? { canonical: `${base}/contato` } : undefined,
    openGraph: {
      title: `${title} | ${siteConfig?.siteTitle ?? "Portfólio"}`,
      description,
      images: og ? [{ url: og, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ContatoPage() {
  const { contact, siteConfig } = await getContactPageData();
  const polaroidSrc = siteConfig?.ogImage
    ? imageUrlFromSanity(siteConfig.ogImage, { width: 480, height: 600 })
    : null;

  return (
    <ContactLetterForm
      contact={contact}
      polaroidSrc={polaroidSrc}
      polaroidAlt={siteConfig?.siteTitle ?? "Contato"}
    />
  );
}
