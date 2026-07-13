import Link from "next/link";
import type { SiteConfig } from "@/types/sanity";

interface SplashViewProps {
  config?: SiteConfig | null;
}

export function SplashView({ config }: SplashViewProps) {
  const brandName = config?.brandName || config?.siteTitle || "Karina Reis";
  const ctaLabel = config?.ctaLabel || "ABRIR";
  const social = config?.socialLinks;

  return (
    <section className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6 py-16 animate-fade-in">
      <div className="flex max-w-3xl flex-col items-center text-center">
        <h1 className="font-display text-5xl leading-none tracking-tight sm:text-7xl md:text-8xl">
          {brandName}
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
