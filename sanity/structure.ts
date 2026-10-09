import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const HIDDEN_FROM_DESK = new Set(["category", "project", "siteConfig", "mux.videoAsset"]);

type CategoryListItem = {
  _id: string;
  title: string;
};

export const structure: StructureResolver = async (S, context) => {
  const client = context.getClient({ apiVersion: "2024-01-01" });
  const categories = await client.fetch<CategoryListItem[]>(
    `*[_type == "category" && !(_id in path("drafts.**"))] | order(select(defined(orderRank) => 0, 1) asc, orderRank asc, order asc, title asc) {
      _id,
      title
    }`,
  );

  const projectLists = categories.map((category) =>
    orderableDocumentListDeskItem({
      type: "project",
      title: category.title.trim() || "Categoria",
      id: `projects-${category._id}`,
      filter: "references($categoryId)",
      params: { categoryId: category._id },
      S,
      context,
    }),
  );

  return S.list()
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
      S.listItem()
        .title("Projetos")
        .id("projects-by-category")
        .child(S.list().title("Projetos").items(projectLists)),
      ...S.documentTypeListItems().filter((item) => !HIDDEN_FROM_DESK.has(item.getId() ?? "")),
    ]);
};
