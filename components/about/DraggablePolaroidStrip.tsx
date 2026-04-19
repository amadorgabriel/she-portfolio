"use client";

import { useMemo, useState } from "react";
import { Reorder, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { Top8Item } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/image-blur";
import { cn } from "@/lib/utils";

type PolaroidItem = { id: string; src: string; alt: string; caption?: string };

function fromTop8(items: Top8Item[]): PolaroidItem[] {
  return items.map((t, i) => ({
    id: `${t.name}-${i}`,
    src: t.image ? imageUrlFromSanity(t.image, { width: 400, height: 500 }) : "/placeholder-y2k.svg",
    alt: t.image?.alt ?? t.name,
    caption: t.name,
  }));
}

const FALLBACK: PolaroidItem[] = [
  { id: "f1", src: "/placeholder-y2k.svg", alt: "Polaroid decorativa", caption: "Mood board" },
  { id: "f2", src: "/placeholder-y2k.svg", alt: "Polaroid decorativa", caption: "Backstage" },
  { id: "f3", src: "/placeholder-y2k.svg", alt: "Polaroid decorativa", caption: "Sketch" },
];

type Props = {
  top8?: Top8Item[] | null;
  className?: string;
};

export function DraggablePolaroidStrip({ top8, className }: Props) {
  const reduce = useReducedMotion();
  const initial = useMemo(() => {
    if (top8?.length) return fromTop8(top8.slice(0, 6));
    return FALLBACK;
  }, [top8]);

  const [order, setOrder] = useState<PolaroidItem[]>(initial);

  if (reduce) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-4", className)}>
        {order.map((item) => (
          <MiniPolaroid key={item.id} item={item} drag={false} />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <p className="mb-3 text-center font-[family-name:var(--font-vt323)] text-sm text-night-purple/80">
        Arrasta as polaroids para reorganizar ✨
      </p>
      <Reorder.Group
        axis="x"
        values={order}
        onReorder={setOrder}
        className="flex max-w-full flex-nowrap justify-start gap-4 overflow-x-auto pb-3 pt-1 md:justify-center"
      >
        {order.map((item) => (
          <Reorder.Item key={item.id} value={item} dragListener className="shrink-0 cursor-grab active:cursor-grabbing">
            <MiniPolaroid item={item} drag />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

function MiniPolaroid({ item, drag }: { item: PolaroidItem; drag: boolean }) {
  const isRemote = item.src.startsWith("http");
  return (
    <div
      className={cn(
        "w-36 shrink-0 rounded-sm bg-polaroid-offwhite p-2 pb-6 shadow-md ring-1 ring-night-purple/10",
        drag && "touch-none"
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="144px"
          loading="lazy"
          placeholder={isRemote ? "blur" : "empty"}
          blurDataURL={isRemote ? IMAGE_BLUR_DATA_URL : undefined}
          className="object-cover"
          draggable={false}
          data-cursor-image="true"
        />
      </div>
      {item.caption && (
        <p className="mt-1 truncate text-center font-[family-name:var(--font-caveat)] text-sm text-night-purple">
          {item.caption}
        </p>
      )}
    </div>
  );
}
