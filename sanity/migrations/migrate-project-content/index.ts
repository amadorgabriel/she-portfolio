import { createHash } from "node:crypto";
import { at, defineMigration, setIfMissing } from "sanity/migrate";

type GalleryItem = Record<string, unknown> & { _key?: string; _type?: string };
type PortableTextItem = Record<string, unknown> & { _key?: string; _type?: string };

interface ProjectDoc {
  _id: string;
  gallery?: GalleryItem[];
  description?: PortableTextItem[];
}

function migrationKey(docId: string, suffix: string): string {
  return createHash("md5").update(`${docId}:${suffix}`).digest("hex").slice(0, 12);
}

function copyGalleryItems(items: GalleryItem[]): GalleryItem[] {
  return items.map((item) => ({ ...item }));
}

function copyPortableText(blocks: PortableTextItem[]): PortableTextItem[] {
  return blocks.map((block) => ({ ...block }));
}

export default defineMigration({
  title: "Migrate project gallery/description to content[]",
  documentTypes: ["project"],
  filter: "!defined(content) && (count(gallery) > 0 || count(description) > 0)",
  migrate: {
    document(doc) {
      const project = doc as ProjectDoc;
      const blocks: Record<string, unknown>[] = [];

      if (Array.isArray(project.gallery) && project.gallery.length > 0) {
        blocks.push({
          _type: "projectGallery",
          _key: migrationKey(project._id, "gallery"),
          items: copyGalleryItems(project.gallery),
        });
      }

      if (Array.isArray(project.description) && project.description.length > 0) {
        blocks.push({
          _type: "projectText",
          _key: migrationKey(project._id, "description"),
          body: copyPortableText(project.description),
        });
      }

      if (blocks.length === 0) return;

      return at("content", setIfMissing(blocks));
    },
  },
});
