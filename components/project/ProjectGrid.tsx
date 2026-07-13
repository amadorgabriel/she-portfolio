import type { ProjectCardData } from "@/types/sanity";
import { ProjectCardEditorial } from "./ProjectCardEditorial";
import { EmptyState } from "@/components/ui/EmptyState";

interface ProjectGridProps {
  projects: ProjectCardData[];
  emptyTitle?: string;
  emptyMessage?: string;
}

export function ProjectGrid({
  projects,
  emptyTitle = "Sem projetos",
  emptyMessage = "Esta categoria ainda não tem projetos publicados.",
}: ProjectGridProps) {
  if (!projects.length) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {projects.map((project) => (
        <ProjectCardEditorial key={project._id} project={project} />
      ))}
    </div>
  );
}
