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
      title: "Galeria",
      description:
        "Arraste várias imagens de uma vez para criar vários itens na Galeria. O Texto Alternativo pode ser preenchido depois do upload, mas é obrigatório para publicar. Para vídeos, adicione um item do tipo Vídeo (Mux).",
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
        {
          type: "object",
          name: "galleryVideo",
          title: "Vídeo",
          fields: [
            defineField({
              name: "video",
              title: "Vídeo (Mux)",
              type: "mux.video",
              options: {
                acceptedMimeTypes: ["video/*"],
              },
              validation: (Rule) => Rule.required(),
            }),
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
            defineField({
              name: "poster",
              title: "Poster (opcional)",
              type: "image",
              description:
                "Override opcional da imagem de capa. Se vazio, usa a thumbnail automática gerada pelo Mux.",
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: "alt",
              caption: "caption",
              media: "poster",
            },
            prepare({ title, caption, media }) {
              return {
                title: title || "Vídeo sem texto alternativo",
                subtitle: caption || "Vídeo",
                media,
              };
            },
          },
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
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
      initialValue: 0,
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
  ],
});
