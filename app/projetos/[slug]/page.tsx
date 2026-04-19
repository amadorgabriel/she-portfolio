import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug, getProjectsNavList } from "@/lib/cms";
import { ProjectFittingRoom } from "@/components/pages/ProjectFittingRoom";
import { portableTextToPlain } from "@/lib/portable-plain";
import { imageUrlFromSanity } from "@/lib/sanity-image";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: "Projeto" };
  }
  const description =
    portableTextToPlain(project.description).trim() || `${project.title} — lookbook Y2K`;
  const og = imageUrlFromSanity(project.thumbnail, { width: 1200, height: 630 });

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: [{ url: og, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description,
      images: [og],
    },
  };
}

export default async function ProjetoDetalhePage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project?.slug?.current) notFound();

  const nav = await getProjectsNavList();
  const idx = nav.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? nav[idx - 1]! : null;
  const next = idx >= 0 && idx < nav.length - 1 ? nav[idx + 1]! : null;

  return (
    <ProjectFittingRoom
      title={project.title}
      description={project.description}
      gallery={project.gallery}
      thumbnail={project.thumbnail}
      year={project.year}
      tools={project.tools}
      category={project.category}
      slug={project.slug.current}
      prev={prev}
      next={next}
    />
  );
}
