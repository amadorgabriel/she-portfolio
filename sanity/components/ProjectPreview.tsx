import { useEffect, useState } from "react";
import { useClient, type PreviewProps } from "sanity";

type ProjectPreviewProps = PreviewProps & {
  docId?: string;
  year?: number;
};

function publishedId(id: string) {
  return id.replace(/^drafts\./, "");
}

/** A lista ordenável não resolve `categories.0->title`, então o nome vem daqui. */
export function ProjectPreview(props: ProjectPreviewProps) {
  const client = useClient({ apiVersion: "2024-01-01" });
  const docId = props.docId;
  const [titles, setTitles] = useState<string[] | null>(null);

  useEffect(() => {
    if (!docId) return;
    let cancelled = false;
    const published = publishedId(docId);
    client
      .fetch<string[] | null>(
        `coalesce(
          *[_id == $draft][0].categories[]->title,
          *[_id == $published][0].categories[]->title
        )`,
        { draft: `drafts.${published}`, published },
      )
      .then((result) => {
        if (!cancelled) setTitles(result?.filter(Boolean) ?? []);
      })
      .catch(() => {
        if (!cancelled) setTitles([]);
      });
    return () => {
      cancelled = true;
    };
  }, [client, docId]);

  const categoryLabel =
    titles === null ? undefined : titles.length > 0 ? titles.join(", ") : "Sem categoria";
  const subtitle = [categoryLabel, props.year].filter((part) => part !== undefined && part !== "").join(" · ");

  return props.renderDefault({
    ...props,
    subtitle: subtitle || props.subtitle,
  });
}
