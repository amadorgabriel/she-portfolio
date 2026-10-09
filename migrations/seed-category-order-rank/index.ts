import { LexoRank } from "lexorank";
import { at, defineMigration, setIfMissing } from "sanity/migrate";

/**
 * Copia a ordem numérica atual para `orderRank` (lexorank),
 * para a lista arrastável abrir na mesma sequência do menu.
 */
function rankFromOrder(order: unknown): string {
  const n =
    typeof order === "number" && Number.isFinite(order) ? Math.max(0, Math.floor(order)) : 0;
  let rank = LexoRank.min();
  for (let i = 0; i <= n; i += 1) {
    rank = rank.genNext().genNext();
  }
  return rank.toString();
}

export default defineMigration({
  title: "Seed category orderRank from numeric order",
  documentTypes: ["category"],
  filter: "!defined(orderRank)",
  migrate: {
    document(doc) {
      const order = (doc as { order?: number }).order;
      return [at("orderRank", setIfMissing(rankFromOrder(order)))];
    },
  },
});
