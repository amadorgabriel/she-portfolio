import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";
import { galleryItemMembers } from "../shared/galleryItemMembers";

export const projectGallery = defineType({
  name: "projectGallery",
  title: "Galeria",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "items",
      title: "Itens",
      description:
        "Arraste várias imagens de uma vez para criar vários itens. O Texto Alternativo pode ser preenchido depois do upload, mas é obrigatório para publicar. Para vídeos, adicione um item do tipo Vídeo (Mux).",
      type: "array",
      of: galleryItemMembers,
    }),
  ],
  preview: {
    select: {
      items: "items",
    },
    prepare({ items }) {
      const count = items?.length ?? 0;
      return {
        title: count === 1 ? "1 item" : `${count} itens`,
        subtitle: "Galeria",
        media: ImagesIcon,
      };
    },
  },
});
