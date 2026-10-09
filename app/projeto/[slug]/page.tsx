import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getSiteConfig,
  DEFAULT_SITE_CONFIG,
} from "@/lib/cms";
import { SiteChrome } from "@/components/site/SiteChrome";
import { CategoryBackground } from "@/components/site/CategoryBackground";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { BackToTop } from "@/components/ui/BackToTop";
import { brandArtUrl, imageUrlFromSanity } from "@/lib/sanity-image";
import { resolveProjectContent } from "@/lib/resolve-project-content";
import { extractPlainFromProjectContent } from "@/lib/project-content-plain";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Projeto" };

  const description =
    extractPlainFromProjectContent(resolveProjectContent(project), 160) ||
    `${project.title} (${project.year})`;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      ...(project.thumbnail
        ? {
            images: [
              {
                url: imageUrlFromSanity(project.thumbnail, {
                  width: 1200,
                  height: 630,
                }),
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, config] = await Promise.all([
    getProjectBySlug(slug),
    getSiteConfig(),
  ]);

  if (!project) notFound();

  const site = config ?? DEFAULT_SITE_CONFIG;
  const logoUrl = site.splashLogo?.asset
    ? brandArtUrl(site.splashLogo, { width: 240 })
    : undefined;
  // Only first category — no fallback to later categories (DEC-003-03)
  const backgroundImage = project.categories?.[0]?.backgroundImage;

  return (
    <>
      <CategoryBackground image={backgroundImage} />
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <SiteChrome brandName={site.brandName || "Karina Reis"} logoUrl={logoUrl} />
        <ProjectDetail project={project} />
        <BackToTop />
      </div>
    </>
  );
}
