import { defineType, defineField } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { slugifyFromTitle, validateSlugField } from "../lib/slug";

export const category = defineType({
  name: "category",
  title: "Categorias",
  type: "document",
  fields: [
    orderRankField({ type: "category" }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) => slugifyFromTitle(input, 96),
      },
      validation: (Rule) => Rule.required().custom(validateSlugField),
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      hidden: true,
      readOnly: true,
      initialValue: 0,
      description: "Substituído pela ordem arrastável da lista de categorias.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Imagem de Fundo",
      type: "image",
      options: {
        hotspot: true,
      },
      description:
        "Arte de fundo full-bleed na página da categoria e nos projetos associados (primeira categoria).",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return { title };
    },
  },
  orderings: [
    orderRankOrdering,
    {
      title: "Ordem de Exibição",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Título",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
