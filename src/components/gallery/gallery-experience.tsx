"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { GalleryEmpty } from "@/components/gallery/gallery-empty";
import { GalleryFilter } from "@/components/gallery/gallery-filter";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { GalleryLightbox } from "@/components/gallery/gallery-lightbox";
import { galleryCategories, galleryProjects } from "@/content/gallery";
import type { GalleryCategory, GalleryProject } from "@/types/gallery";

export function GalleryExperience() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");

  const selectedSlug = searchParams.get("project");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "all") {
      return galleryProjects;
    }

    return galleryProjects.filter(
      (project) => project.category === activeCategory,
    );
  }, [activeCategory]);

  const selectedIndex = galleryProjects.findIndex(
    (project) => project.slug === selectedSlug,
  );

  const selectedProject =
    selectedIndex >= 0 ? galleryProjects[selectedIndex] : null;

  const counts = useMemo(() => {
    const initial = {
      all: galleryProjects.length,
      "collision-repairs": 0,
      "paint-refinishing": 0,
      "dent-removal": 0,
      "performance-upgrades": 0,
      "complex-repairs": 0,
    } satisfies Record<GalleryCategory, number>;

    for (const project of galleryProjects) {
      initial[project.category] += 1;
    }

    return initial;
  }, []);

  const setProjectInUrl = useCallback(
    (project: GalleryProject | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (project) {
        params.set("project", project.slug);
      } else {
        params.delete("project");
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const openPrevious = useCallback(() => {
    if (selectedIndex > 0) {
      setProjectInUrl(galleryProjects[selectedIndex - 1]);
    }
  }, [selectedIndex, setProjectInUrl]);

  const openNext = useCallback(() => {
    if (selectedIndex >= 0 && selectedIndex < galleryProjects.length - 1) {
      setProjectInUrl(galleryProjects[selectedIndex + 1]);
    }
  }, [selectedIndex, setProjectInUrl]);

  return (
    <>
      <div className="mb-10">
        <GalleryFilter
          categories={galleryCategories}
          activeCategory={activeCategory}
          counts={counts}
          onChange={setActiveCategory}
        />
      </div>

      {filteredProjects.length > 0 ? (
        <GalleryGrid projects={filteredProjects} onOpen={setProjectInUrl} />
      ) : (
        <GalleryEmpty />
      )}

      <GalleryLightbox
        project={selectedProject}
        hasPrevious={selectedIndex > 0}
        hasNext={
          selectedIndex >= 0 && selectedIndex < galleryProjects.length - 1
        }
        onClose={() => setProjectInUrl(null)}
        onPrevious={openPrevious}
        onNext={openNext}
      />
    </>
  );
}
