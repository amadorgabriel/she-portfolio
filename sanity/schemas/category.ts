import { defineType, defineField } from "sanity";
import { slugifyFromTitle, validateSlugField } from "../lib/slug";

export const category = defineType({
  name: "category",
  title: "Categorias",
  type: "document",
  fields: [
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
      initialValue: 0,
      validation: (Rule) => Rule.required().integer().min(0),
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
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
    },
    prepare({ title, order }) {
      return {
        title,
        subtitle: `Ordem: ${order ?? 0}`,
      };
    },
  },
  orderings: [
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
