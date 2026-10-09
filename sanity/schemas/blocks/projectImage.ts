import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

export const projectImage = defineType({
  name: "projectImage",
  title: "Imagem",
  type: "object",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
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
  ],
  preview: {
    select: {
      title: "alt",
      caption: "caption",
      media: "image",
    },
    prepare({ title, caption, media }) {
      return {
        title: title || "Imagem sem texto alternativo",
        subtitle: caption || "Imagem",
        media: media ?? ImageIcon,
      };
    },
  },
});
