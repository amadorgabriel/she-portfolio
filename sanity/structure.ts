import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const HIDDEN_FROM_DESK = new Set(["category", "project", "siteConfig", "mux.videoAsset"]);

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Conteúdo")
    .items([
      S.listItem()
        .title("Configurações do Site")
        .icon(CogIcon)
        .id("siteConfig")
        .child(
          S.document()
            .schemaType("siteConfig")
            .documentId("siteConfig")
            .title("Configurações do Site"),
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categorias",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "project",
        title: "Projetos",
        id: "orderable-projects",
        S,
        context,
      }),
      ...S.documentTypeListItems().filter((item) => !HIDDEN_FROM_DESK.has(item.getId() ?? "")),
    ]);
