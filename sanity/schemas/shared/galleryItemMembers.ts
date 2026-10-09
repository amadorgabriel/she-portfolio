import { defineArrayMember, defineField } from "sanity";

export const galleryItemMembers = [
  defineArrayMember({
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
  }),
  defineArrayMember({
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
  }),
];
