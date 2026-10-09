import { defineType, defineField } from "sanity";
import { BlockContentIcon } from "@sanity/icons/BlockContent";

export const projectText = defineType({
  name: "projectText",
  title: "Texto",
  type: "object",
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    select: {
      blocks: "body",
    },
    prepare({ blocks }) {
      const block = (blocks || []).find(
        (item: { _type?: string }) => item._type === "block",
      );
      const text =
        block?.children
          ?.filter((child: { _type?: string }) => child._type === "span")
          .map((span: { text?: string }) => span.text)
          .join("") || "Texto vazio";

      return {
        title: text,
        subtitle: "Texto",
        media: BlockContentIcon,
      };
    },
  },
});
