import { getAbout, getContact, getSiteConfig } from "@/lib/cms";
import { getSiteBaseUrl } from "@/lib/site-url";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export async function PersonJsonLd() {
  const [about, contact, site] = await Promise.all([getAbout(), getContact(), getSiteConfig()]);
  if (!about) return null;

  const base = getSiteBaseUrl();
  const image = imageUrlFromSanity(about.profileImage, { width: 800, height: 800 });
  const sameAs: string[] = [];
  if (contact?.instagram) {
    const ig = contact.instagram.trim();
    sameAs.push(ig.startsWith("http") ? ig : `https://instagram.com/${ig.replace(/^@/, "")}`);
  }
  if (contact?.linkedin) sameAs.push(contact.linkedin);
  if (contact?.behance) sameAs.push(contact.behance);
  if (contact?.pinterest) sameAs.push(contact.pinterest);

  const imageUrl = image.startsWith("http") ? image : base ? `${base}${image}` : image;

  const schema = Object.fromEntries(
    Object.entries({
      "@context": "https://schema.org",
      "@type": "Person",
      name: about.name,
      alternateName: about.nickname,
      description: site?.metaDescription ?? site?.tagline,
      image: imageUrl,
      url: base || undefined,
      email: contact?.email,
      sameAs: sameAs.length ? sameAs : undefined,
      jobTitle: "Fashion Designer",
    }).filter(
      ([, v]) => v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0)
    )
  );

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
