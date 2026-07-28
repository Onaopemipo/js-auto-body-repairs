import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GalleryProjectDetail } from "@/components/gallery/gallery-project-detail";
import { siteConfig } from "@/config/site";
import {
  getGalleryProjectBySlug,
  getGalleryProjects,
} from "@/lib/gallery/gallery-content";

interface GalleryProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const result = await getGalleryProjects();

  return result.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: GalleryProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = await getGalleryProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = project.seoTitle || project.title;

  const description = project.seoDescription || project.summary;

  return {
    title,
    description,
    alternates: {
      canonical: `/gallery/${project.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/gallery/${project.slug}`,
      type: "article",
      images: [
        {
          url: project.coverImage.url,
          alt: project.coverImage.alt,
          width: project.coverImage.width ?? 1600,
          height: project.coverImage.height ?? 1000,
        },
      ],
    },
  };
}

export default async function GalleryProjectPage({
  params,
}: GalleryProjectPageProps) {
  const { slug } = await params;

  const project = await getGalleryProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <GalleryProjectDetail project={project} />;
}
