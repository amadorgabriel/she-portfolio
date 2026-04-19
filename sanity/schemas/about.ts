import { defineType, defineField } from "sanity";

export const about = defineType({
  name: "about",
  title: "Sobre (Perfil MySpace)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome Completo",
      type: "string",
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: "nickname",
      title: "Apelido/Display Name",
      type: "string",
      description: "Nome que aparece no estilo MySpace",
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "profileImage",
      title: "Foto de Perfil",
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
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Habilidades",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Design de Moda", value: "design-de-moda" },
          { title: "Styling", value: "styling" },
          { title: "Ilustração", value: "ilustração" },
          { title: "Modelagem 3D", value: "modelagem-3d" },
          { title: "Produção", value: "produção" },
          { title: "Consultoria", value: "consultoria" },
        ],
      },
    }),
    defineField({
      name: "interests",
      title: "Interesses (estilo MySpace)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Categoria",
              type: "string",
            }),
            defineField({
              name: "items",
              title: "Itens",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Links Sociais",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Plataforma",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Behance", value: "behance" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Email", value: "email" },
                  { title: "Website", value: "website" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label Personalizado",
              type: "string",
              description: "Opcional - deixe em branco para usar o nome da plataforma",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "top8",
      title: "Top 8 Amigos/Marcas (estilo MySpace)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nome",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Imagem",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "url",
              title: "Link",
              type: "url",
            }),
            defineField({
              name: "description",
              title: "Descrição",
              type: "string",
              description: "Breve descrição da colaboração",
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "resumeFile",
      title: "Arquivo de Currículo (PDF)",
      type: "file",
      options: {
        accept: ".pdf",
      },
    }),
    defineField({
      name: "playlistUrl",
      title: "URL da Playlist (Spotify/Soundcloud)",
      type: "url",
      description: "Embed de playlist para a página About",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "nickname",
      media: "profileImage",
    },
  },
});
