/** Abas do “Closet Virtual” — valores alinhados às categorias do schema de projeto. */
export const CLOSET_FILTER_TABS = [
  { id: "all", label: "Todos", categoryKey: null as string | null },
  { id: "coleção", label: "Coleções", categoryKey: "coleção" },
  { id: "ilustração", label: "Ilustrações", categoryKey: "ilustração" },
  { id: "styling", label: "Styling", categoryKey: "styling" },
  { id: "collage", label: "Collages", categoryKey: "collage" },
] as const;

export type ClosetFilterId = (typeof CLOSET_FILTER_TABS)[number]["id"];

export function projectMatchesClosetFilter(
  categories: string[] | undefined,
  categoryKey: string | null
): boolean {
  if (!categoryKey) return true;
  if (!categories?.length) return false;
  return categories.some((c) => c.toLowerCase() === categoryKey.toLowerCase());
}
