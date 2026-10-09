import type { ProjectContentBlock } from "@/types/sanity";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RichText } from "@/components/RichText";
import { ProjectBodyImage } from "@/components/project/ProjectBodyImage";
import { ProjectBodyVideo } from "@/components/project/ProjectBodyVideo";
import { cn } from "@/lib/utils";

interface ProjectContentBuilderProps {
  blocks: ProjectContentBlock[];
  projectTitle: string;
  className?: string;
}

export function ProjectContentBuilder({
  blocks,
  projectTitle,
  className,
}: ProjectContentBuilderProps) {
  if (!blocks.length) return null;

  return (
    <div className={cn("space-y-0", className)}>
      {blocks.map((block) => {
        switch (block._type) {
          case "projectText":
            return (
              <div key={block._key} className="mx-auto mb-12 max-w-2xl">
                <RichText value={block.body} />
              </div>
            );
          case "projectImage":
            return (
              <ProjectBodyImage
                key={block._key}
                image={block.image}
                alt={block.alt}
                caption={block.caption}
              />
            );
          case "projectVideo":
            return (
              <ProjectBodyVideo
                key={block._key}
                video={block.video}
                alt={block.alt}
                caption={block.caption}
                poster={block.poster}
                title={block.alt || projectTitle}
              />
            );
          case "projectGallery":
            return (
              <ProjectGallery
                key={block._key}
                items={block.items}
                projectTitle={projectTitle}
                className="mb-12"
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
