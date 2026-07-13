import type { Project } from "@/types/sanity";
import { ProjectGallery } from "@/components/ProjectGallery";
import { RichText } from "@/components/RichText";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const categoryTitles = project.categories?.map((c) => c.title).filter(Boolean) ?? [];
  const gallery = project.gallery?.length
    ? project.gallery
    : project.thumbnail
      ? [project.thumbnail]
      : [];

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-8 md:px-10 animate-fade-in">
      <header className="mb-10 md:mb-14">
        <h1 className="font-display text-4xl tracking-tight md:text-6xl">{project.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-muted)]">
          <span className="tabular-nums">{project.year}</span>
          {categoryTitles.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <span>{categoryTitles.join(", ")}</span>
            </>
          )}
          {project.client && (
            <>
              <span aria-hidden>·</span>
              <span>{project.client}</span>
            </>
          )}
        </div>
      </header>

      {gallery.length > 0 && (
        <ProjectGallery images={gallery} projectTitle={project.title} className="mb-12" />
      )}

      {project.description?.length > 0 && (
        <div className="mx-auto max-w-2xl">
          <RichText value={project.description} />
        </div>
      )}
    </article>
  );
}
