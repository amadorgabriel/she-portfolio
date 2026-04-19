"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { DesktopWindow } from "@/components/ui/DesktopWindow";
import { GlossyButton } from "@/components/ui/GlossyButton";
import { RichText } from "@/components/RichText";
import { StarDivider } from "@/components/ui/StarDivider";
import { Y2KBreadcrumbs } from "@/components/ui/NavigationDock";
import type { About } from "@/types/sanity";
import type { SiteConfig } from "@/types/sanity";
import { SOCIAL_ICONS, type SocialLink } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";
import { skillLabel, skillStatPercent } from "@/lib/skill-labels";
import { DraggablePolaroidStrip } from "@/components/about/DraggablePolaroidStrip";
import { RevealOnScroll } from "@/components/interactive/RevealOnScroll";

type TimelineItem = { year: number; title: string; slug: string };

type Props = {
  about: About;
  timeline: TimelineItem[];
  siteConfig: SiteConfig | null;
};

function socialHref(link: SocialLink): string {
  if (link.platform === "email") {
    const raw = link.url.replace(/^mailto:/i, "");
    return `mailto:${raw}`;
  }
  return link.url;
}

export function AboutRetroClient({ about, timeline, siteConfig }: Props) {
  const profileSrc = imageUrlFromSanity(about.profileImage, { width: 560, height: 560 });
  const displayName = about.nickname || about.name;
  const skills = about.skills ?? [];
  const resumeHref = about.resumeUrl ?? null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <Y2KBreadcrumbs
        className="mb-6"
        items={[
          { label: "Sala", href: "/" },
          { label: "Perfil Retrô" },
        ]}
      />

      <header className="mb-8 text-center">
        <h1 className="font-[family-name:var(--font-fredoka)] text-4xl text-pink-2000 md:text-5xl">~ {displayName} ~</h1>
        <p className="mt-2 font-[family-name:var(--font-vt323)] text-night-purple/80">Perfil estilo MySpace / Hi5 ✦</p>
      </header>

      {/* Layout duas colunas estilo rede social antiga */}
      <div className="grid gap-8 lg:grid-cols-[minmax(260px,320px)_1fr]">
        <aside className="space-y-4">
          <motion.div
            initial={{ rotate: -2, opacity: 0 }}
            animate={{ rotate: -1, opacity: 1 }}
            className="relative overflow-hidden rounded-2xl border-4 border-pink-2000 bg-white p-2 shadow-[8px_8px_0_rgba(75,0,130,0.15)]"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gradient-to-b from-pink-100 to-white">
              <Image
                src={profileSrc}
                alt={about.profileImage.alt ?? about.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
                priority
                placeholder={profileSrc.startsWith("http") ? "blur" : "empty"}
                blurDataURL={profileSrc.startsWith("http") ? IMAGE_BLUR_DATA_URL : undefined}
                data-cursor-image="true"
              />
            </div>
            <p className="mt-2 text-center font-[family-name:var(--font-vt323)] text-sm text-night-purple">
              {about.name}
            </p>
          </motion.div>

          {about.socialLinks && about.socialLinks.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="font-[family-name:var(--font-vt323)] text-xs uppercase tracking-widest text-night-purple/60">
                Add to friends
              </p>
              <div className="flex flex-wrap gap-2">
                {about.socialLinks.map((link) => (
                  <GlossyButton
                    key={`${link.platform}-${link.url}`}
                    href={socialHref(link)}
                    size="sm"
                    variant="outline"
                    className="rounded-xl"
                  >
                    {link.label || SOCIAL_ICONS[link.platform]}
                  </GlossyButton>
                ))}
              </div>
            </div>
          )}

          {resumeHref ? (
            <GlossyButton href={resumeHref} size="sm" variant="leopard">
              Baixar CV (PDF)
            </GlossyButton>
          ) : null}
        </aside>

        <div className="space-y-8">
          <DesktopWindow title="bio.html" variant="purple" className="min-h-[200px]">
            <div className="p-4">
              <RichText value={about.bio} />
            </div>
          </DesktopWindow>

          {skills.length > 0 && (
            <section>
              <h2 className="mb-4 font-[family-name:var(--font-fredoka)] text-xl text-night-purple">Stats de jogo</h2>
              <ul className="space-y-4">
                {skills.map((slug, i) => {
                  const pct = skillStatPercent(slug, i);
                  return (
                    <li key={`${slug}-${i}`}>
                      <div className="mb-1 flex justify-between font-[family-name:var(--font-vt323)] text-sm text-night-purple">
                        <span>{skillLabel(slug)}</span>
                        <span>{pct}%</span>
                      </div>
                      <div
                        className="h-4 overflow-hidden rounded border-2 border-night-purple/20 bg-gray-200"
                        style={{
                          boxShadow: "inset 2px 2px 4px rgba(0,0,0,0.12)",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="h-full rounded-sm bg-gradient-to-r from-pink-2000 via-glitter-pink to-flash-photo"
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {about.interests && about.interests.length > 0 && (
            <section>
              <h2 className="mb-3 font-[family-name:var(--font-fredoka)] text-xl text-plaid-blue">Interesses</h2>
              <ul className="space-y-2 font-[family-name:var(--font-inter)] text-sm text-dark-text">
                {about.interests.map((int) => (
                  <li key={int.category}>
                    <strong className="text-pink-2000">{int.category}:</strong> {int.items?.join(", ")}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <RevealOnScroll as="section" className="my-14">
        <h2 className="mb-2 text-center font-[family-name:var(--font-fredoka)] text-2xl text-night-purple">
          Mesa de polaroids
        </h2>
        <p className="mb-6 text-center font-[family-name:var(--font-vt323)] text-sm text-night-purple/75">
          Arrasta para reorganizar — vibe quarto Y2K ✂️
        </p>
        <DraggablePolaroidStrip top8={about.top8} />
      </RevealOnScroll>

      <div className="my-12 flex flex-col items-center gap-3">
        <h2 className="font-[family-name:var(--font-fredoka)] text-2xl text-pink-2000">Currículo · timeline</h2>
        <StarDivider color="gold" className="max-w-lg" />
      </div>

      <section>
        <ol className="relative border-l-2 border-dashed border-pink-2000/40 pl-8">
          {timeline.length === 0 ? (
            <li className="font-[family-name:var(--font-vt323)] text-night-purple/70">Publique projetos no Sanity para montar a timeline.</li>
          ) : (
            timeline.map((item, idx) => (
              <li key={`${item.slug}-${idx}`} className="mb-10 last:mb-0">
                <span className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full bg-flash-photo text-sm shadow">
                  ⭐
                </span>
                <p className="font-[family-name:var(--font-vt323)] text-pink-2000">{item.year}</p>
                <Link href={`/projetos/${item.slug}`} className="font-[family-name:var(--font-fredoka)] text-lg text-night-purple hover:underline">
                  {item.title}
                </Link>
              </li>
            ))
          )}
        </ol>
      </section>

      <p className="mt-10 text-center font-[family-name:var(--font-caveat)] text-lg text-night-purple/70">
        {siteConfig?.footerText ?? "Obrigada por visitar meu perfil ✨"}
      </p>
    </div>
  );
}
