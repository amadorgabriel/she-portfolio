"use client";

import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "@/sanity/client";
import { cn } from "@/lib/utils";

interface RichTextProps {
  value: PortableTextBlock[];
  className?: string;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="font-body text-[var(--color-ink)] leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-3xl md:text-4xl tracking-tight mb-4 mt-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-2xl tracking-tight mb-3 mt-5">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-body text-lg font-medium uppercase tracking-wide mb-2 mt-4 text-[var(--color-muted)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-[var(--color-line)] pl-6 py-1 my-6 text-[var(--color-muted)] italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 my-4 pl-6 marker:text-[var(--color-muted)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 my-4 pl-6 marker:text-[var(--color-muted)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="font-body text-[var(--color-ink)] pl-1">{children}</li>
    ),
    number: ({ children }) => (
      <li className="font-body text-[var(--color-ink)] pl-1">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => (
      <span className="underline underline-offset-4">{children}</span>
    ),
    code: ({ children }) => (
      <code className="font-mono text-sm bg-[var(--color-line)]/40 px-1.5 py-0.5 rounded">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <Link
          href={value?.href || "#"}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="underline underline-offset-4"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      return (
        <figure className="my-8">
          <div className="relative overflow-hidden">
            <Image
              src={urlFor(value).width(800).format("webp").url()}
              alt={value.alt || "Imagem do projeto"}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-[var(--color-muted)]">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  hardBreak: () => <br />,
};

export function RichText({ value, className }: RichTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className={cn("max-w-none", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}

export function RichTextSimple({ value, className }: RichTextProps) {
  if (!value || value.length === 0) return null;

  const simpleComponents: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <span className="font-body text-[var(--color-ink)]">{children}</span>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => (
        <Link href={value?.href || "#"} className="underline underline-offset-4">
          {children}
        </Link>
      ),
    },
  };

  return (
    <span className={className}>
      <PortableText value={value} components={simpleComponents} />
    </span>
  );
}
