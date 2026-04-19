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

// Componentes customizados para o Portable Text
const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => (
      <p className="font-[family-name:var(--font-inter)] text-dark-text leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="font-[family-name:var(--font-fredoka)] text-4xl md:text-5xl text-pink-2000 mb-6 mt-8">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-[family-name:var(--font-fredoka)] text-3xl md:text-4xl text-night-purple mb-4 mt-6 flex items-center gap-2">
        <span className="text-glitter-pink">✦</span>
        {children}
        <span className="text-glitter-pink">✦</span>
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-[family-name:var(--font-fredoka)] text-2xl text-plaid-blue mb-3 mt-5">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-[family-name:var(--font-vt323)] text-xl text-leopard-brown mb-2 mt-4 uppercase tracking-wide">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="font-[family-name:var(--font-caveat)] text-2xl text-night-purple border-l-4 border-pink-2000 pl-6 py-2 my-6 bg-polaroid-offwhite/50 rounded-r-lg">
        <span className="text-4xl text-glitter-pink">"</span>
        {children}
        <span className="text-4xl text-glitter-pink">"</span>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-none space-y-2 my-4 pl-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 my-4 pl-6 marker:text-pink-2000 marker:font-[family-name:var(--font-vt323)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="text-glitter-pink mt-1">⭐</span>
        <span className="font-[family-name:var(--font-inter)] text-dark-text">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="font-[family-name:var(--font-inter)] text-dark-text pl-2">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-pink-2000">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-night-purple">
        {children}
      </em>
    ),
    underline: ({ children }) => (
      <span className="underline decoration-glitter-pink decoration-2 underline-offset-4">
        {children}
      </span>
    ),
    code: ({ children }) => (
      <code className="font-[family-name:var(--font-vt323)] text-sm bg-polaroid-offwhite px-2 py-1 rounded text-night-purple border border-glitter-pink/30">
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
          className="text-pink-2000 underline decoration-glitter-pink decoration-2 underline-offset-4 hover:text-cyber-pink hover:decoration-pink-2000 transition-colors"
        >
          {children}
        </Link>
      );
    },
    // Marca personalizada para highlight
    highlight: ({ children }) => (
      <span className="bg-flash-photo/30 px-1 rounded">
        {children}
      </span>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="my-8">
          <div
            className={cn(
              "relative overflow-hidden rounded-lg",
              "border-4 border-polaroid-offwhite",
              "shadow-[4px_4px_0px_0px_rgba(255,105,180,0.3)]"
            )}
          >
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
            <figcaption className="font-[family-name:var(--font-caveat)] text-lg text-center text-night-purple mt-3">
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
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className={cn("prose-y2k", className)}>
      <PortableText value={value} components={components} />
    </div>
  );
}

// Componente simplificado para textos pequenos (captions, etc)
export function RichTextSimple({ value, className }: RichTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  const simpleComponents: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <span className="font-[family-name:var(--font-inter)] text-dark-text">
          {children}
        </span>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-pink-2000">{children}</strong>,
      em: ({ children }) => <em className="italic text-night-purple">{children}</em>,
      link: ({ value, children }) => (
        <Link
          href={value?.href || "#"}
          className="text-pink-2000 underline hover:text-cyber-pink transition-colors"
        >
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

// Componente para texto estilo terminal/VT323
export function RichTextTerminal({ value, className }: RichTextProps) {
  if (!value || value.length === 0) {
    return null;
  }

  const terminalComponents: Partial<PortableTextReactComponents> = {
    block: {
      normal: ({ children }) => (
        <p className="font-[family-name:var(--font-vt323)] text-lg text-night-purple leading-relaxed mb-2">
          &gt; {children}
        </p>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="text-pink-2000 uppercase">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="text-glitter-pink">{children}</em>
      ),
    },
  };

  return (
    <div className={cn("bg-polaroid-offwhite/50 p-4 rounded border border-glitter-pink/30", className)}>
      <PortableText value={value} components={terminalComponents} />
    </div>
  );
}
