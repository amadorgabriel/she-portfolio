import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@/types/sanity";
import { brandArtUrl } from "@/lib/sanity-image";

interface SplashViewProps {
  config?: SiteConfig | null;
}

function isGifUrl(url: string): boolean {
  return /\.gif(\?|$)/i.test(url);
}

export function SplashView({ config }: SplashViewProps) {
  const brandName = config?.brandName || config?.siteTitle || "Karina Reis";
  const ctaLabel = config?.ctaLabel || "ABRIR";
  const social = config?.socialLinks;
  const artUrl = config?.splashLogo?.asset
    ? brandArtUrl(config.splashLogo, { width: 960 })
    : undefined;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16 animate-fade-in">
      <div className="flex max-w-3xl flex-col items-center text-center">
        <h1 className="font-display text-5xl leading-none tracking-tight sm:text-7xl md:text-8xl">
          {artUrl ? (
            <Image
              src={artUrl}
              alt={brandName}
              width={480}
              height={160}
              className="mx-auto h-auto max-h-24 w-auto max-w-[min(90vw,28rem)] object-contain sm:max-h-32 md:max-h-40"
              priority
              unoptimized={isGifUrl(artUrl)}
            />
          ) : (
            brandName
          )}
        </h1>

        <Link
          href="/menu"
          className="mt-12 font-body text-sm uppercase tracking-[0.35em] no-underline border-b border-current pb-1 transition-opacity hover:opacity-60"
        >
          {ctaLabel}
        </Link>

        {(social?.linkedin || social?.instagram || social?.email) && (
          <nav
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--color-muted)]"
            aria-label="Redes sociais"
          >
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline uppercase tracking-wider hover:text-[var(--color-ink)]"
              >
                LinkedIn
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline uppercase tracking-wider hover:text-[var(--color-ink)]"
              >
                Instagram
              </a>
            )}
            {social.email && (
              <a
                href={`mailto:${social.email}`}
                className="no-underline uppercase tracking-wider hover:text-[var(--color-ink)]"
              >
                E-mail
              </a>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
