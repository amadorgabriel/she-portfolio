import Link from "next/link";
import Image from "next/image";

interface SiteChromeProps {
  brandName: string;
  logoUrl?: string;
}

export function SiteChrome({ brandName, logoUrl }: SiteChromeProps) {
  return (
    <header className="w-full px-6 py-6 md:px-10 md:py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-3 no-underline hover:opacity-70 transition-opacity"
        aria-label={`${brandName} — início`}
      >
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={brandName}
            width={120}
            height={40}
            className="h-8 w-auto object-contain md:h-10"
            priority
          />
        ) : (
          <span className="font-display text-xl tracking-tight md:text-2xl">{brandName}</span>
        )}
      </Link>
    </header>
  );
}
