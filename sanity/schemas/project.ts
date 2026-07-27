import { defineType, defineField } from "sanity";
import { slugifyFromTitle, validateSlugField } from "../lib/slug";

export const project = defineType({
  name: "project",
  title: "Projetos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
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
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Legenda",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Galeria de Imagens",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "caption",
              title: "Legenda",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Ano",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2030),
    }),
    defineField({
      name: "client",
      title: "Cliente/Marca",
      type: "string",
    }),
    defineField({
      name: "materials",
      title: "Materiais",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "team",
      title: "Equipe",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tools",
      title: "Ferramentas/Softwares",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      year: "year",
      category0: "categories.0->title",
    },
    prepare({ title, media, year, category0 }) {
      return {
        title,
        subtitle: `${category0 || "Sem categoria"} • ${year || "Sem ano"}`,
        media,
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
      title: "Ano (Mais recente)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
    {
      title: "Data de Publicação",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
