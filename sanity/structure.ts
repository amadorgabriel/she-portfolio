import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Conteúdo")
    .items([
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categorias",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter((item) => item.getId() !== "category"),
    ]);
