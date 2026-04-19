"use client";

import { useMemo, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Y2KBreadcrumbs } from "@/components/ui/NavigationDock";
import { GlitterText } from "@/components/ui/GlitterText";
import { ManequinCard } from "@/components/ui/ManequinCard";
import type { Project } from "@/types/sanity";
import { CATEGORY_LABELS, type ProjectCategory } from "@/types/sanity";
import { imageUrlFromSanity } from "@/lib/sanity-image";
import { CLOSET_FILTER_TABS, projectMatchesClosetFilter, type ClosetFilterId } from "@/lib/closet-filters";
import { cn } from "@/lib/utils";

function categoryLabel(cats: string[]): string {
  const first = cats[0] as ProjectCategory | undefined;
  if (first && first in CATEGORY_LABELS) return CATEGORY_LABELS[first as ProjectCategory];
  return cats[0] ?? "Projeto";
}

type Props = {
  projects: Project[];
};

export function ProjetosClosetClient({ projects }: Props) {
  const [filter, setFilter] = useState<ClosetFilterId>("all");

  const activeCategoryKey = useMemo(() => {
    const tab = CLOSET_FILTER_TABS.find((t) => t.id === filter);
    return tab?.categoryKey ?? null;
  }, [filter]);

  const filtered = useMemo(() => {
    return projects.filter((p) => projectMatchesClosetFilter(p.category, activeCategoryKey));
  }, [projects, activeCategoryKey]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Y2KBreadcrumbs
        className="mb-6"
        items={[
          { label: "Sala", href: "/" },
          { label: "Closet Virtual" },
        ]}
      />

      <header className="mb-8 text-center md:text-left">
        <GlitterText as="h1" size="lg" variant="purple" className="mb-2 block">
          Closet Virtual
        </GlitterText>
        <p className="font-[family-name:var(--font-vt323)] text-lg text-night-purple/90">
          Arraste o cabide — filtre por vibe (categoria).
        </p>
      </header>

      <LayoutGroup id="closet-filters">
        <div className="mb-10 flex flex-wrap justify-center gap-2 md:justify-start">
          {CLOSET_FILTER_TABS.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                layout
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "relative overflow-hidden rounded-xl border-2 px-4 py-2 font-[family-name:var(--font-vt323)] text-base uppercase tracking-wide transition-shadow",
                  isActive
                    ? "border-pink-2000 bg-gradient-to-b from-pink-2000/25 to-glitter-pink/20 text-night-purple shadow-[0_0_24px_rgba(255,105,180,0.65),inset_0_-4px_0_rgba(255,20,147,0.35)]"
                    : "border-night-purple/20 bg-white/70 text-night-purple/70 hover:border-pink-2000/40 hover:text-night-purple"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="closetTabGlow"
                    className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/25 to-transparent"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        <motion.div layout className="grid grid-cols-2 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-4 md:gap-8">
          {filtered.map((p, index) => (
            <motion.div key={p._id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
              <ManequinCard
                id={p._id}
                title={p.title}
                year={p.year}
                category={categoryLabel(p.category)}
                thumbnail={imageUrlFromSanity(p.thumbnail, { width: 640, height: 853 })}
                href={`/projetos/${p.slug?.current ?? ""}`}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <p className="mt-10 text-center font-[family-name:var(--font-vt323)] text-night-purple/80">
          Nenhum look nesta gaveta ainda.
        </p>
      )}
    </div>
  );
}
