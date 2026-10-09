import { defineType, defineField, defineArrayMember } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { slugifyFromTitle, validateSlugField } from "../lib/slug";
import { ProjectPreview } from "../components/ProjectPreview";

export const project = defineType({
  name: "project",
  title: "Projetos",
  type: "document",
  fields: [
    orderRankField({ type: "project" }),
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
      description:
        "O projeto entra na lista de cada categoria marcada. A primeira define o fundo da página.",
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
      name: "content",
      title: "Conteúdo",
      description:
        "Monte a página do projeto com blocos de texto, imagem, vídeo e galeria.",
      type: "array",
      of: [
        defineArrayMember({ type: "projectText" }),
        defineArrayMember({ type: "projectImage" }),
        defineArrayMember({ type: "projectVideo" }),
        defineArrayMember({ type: "projectGallery" }),
      ],
      validation: (Rule) => Rule.required().min(1),
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
      hidden: true,
      readOnly: true,
      initialValue: 0,
      description: "Substituído pela ordem arrastável da lista de projetos.",
    }),
  ],
  components: {
    preview: ProjectPreview,
  },
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      year: "year",
      docId: "_id",
    },
    prepare({ title, media, year, docId }) {
      return {
        title,
        media,
        year,
        docId,
        subtitle: year ? String(year) : "",
      };
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
      title: "Ano (Mais recente)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
});
