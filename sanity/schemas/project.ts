import { defineType, defineField } from "sanity";

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
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "array",
      of: [
        {
          type: "string",
          options: {
            list: [
              { title: "Coleção", value: "coleção" },
              { title: "Ilustração", value: "ilustração" },
              { title: "Styling", value: "styling" },
              { title: "Collage", value: "collage" },
              { title: "Making Of", value: "making of" },
            ],
          },
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
          title: "Legenda (estilo Polaroid)",
          type: "string",
          description: "Texto que aparece abaixo da imagem estilo Polaroid",
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
      options: {
        list: [
          { title: "Photoshop", value: "photoshop" },
          { title: "Illustrator", value: "illustrator" },
          { title: "Figma", value: "figma" },
          { title: "Clo3D", value: "clo3d" },
          { title: "Marvelous Designer", value: "marvelous-designer" },
          { title: "InDesign", value: "indesign" },
          { title: "Procreate", value: "procreate" },
        ],
      },
    }),
    defineField({
      name: "isFeatured",
      title: "Destaque (Mostrar no Manequim Central)",
      type: "boolean",
      initialValue: false,
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
      category: "category",
      year: "year",
    },
    prepare({ title, media, category, year }) {
      return {
        title,
        subtitle: `${category?.[0] || "Sem categoria"} • ${year || "Sem ano"}`,
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
