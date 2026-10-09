import type { Project, ProjectContentBlock } from "@/types/sanity";

/** Conteúdo editorial do projeto (`content[]` do page builder). */
export function resolveProjectContent(project: Project): ProjectContentBlock[] {
  return project.content ?? [];
}
