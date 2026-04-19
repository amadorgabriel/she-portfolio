/** Labels amigáveis para valores de `about.skills` (Sanity). */
export const SKILL_SLUG_LABELS: Record<string, string> = {
  "design-de-moda": "Design de Moda",
  styling: "Styling",
  ilustração: "Ilustração",
  "modelagem-3d": "Modelagem 3D",
  produção: "Produção",
  consultoria: "Consultoria",
};

export function skillLabel(slug: string): string {
  return SKILL_SLUG_LABELS[slug] ?? slug.replace(/-/g, " ");
}

/** Porcentagem “estilo RPG” determinística a partir do slug. */
export function skillStatPercent(slug: string, index: number): number {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 997;
  const base = 58 + (h % 35);
  const bump = (index * 3) % 8;
  return Math.min(99, base + bump);
}
