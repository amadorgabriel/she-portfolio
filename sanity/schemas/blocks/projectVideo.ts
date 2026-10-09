import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";

export const projectVideo = defineType({
  name: "projectVideo",
  title: "Vídeo",
  type: "object",
  icon: PlayIcon,
  description:
    "Bloco de vídeo desta página. O ficheiro fica na biblioteca, mas só aparece no site dentro deste projeto.",
  fields: [
    defineField({
      name: "video",
      title: "Ficheiro de vídeo",
      description:
        "Envie o vídeo que deve tocar neste bloco. A aba Biblioteca de vídeos só lista ficheiros já enviados; não publica o vídeo sozinha.",
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
        media: media ?? PlayIcon,
      };
    },
  },
});
