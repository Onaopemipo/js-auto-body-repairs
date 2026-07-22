import { GalleryCard } from "@/components/gallery/gallery-card";
import type { GalleryProject } from "@/types/gallery";

interface GalleryGridProps {
  projects: GalleryProject[];
  onOpen: (project: GalleryProject) => void;
}

export function GalleryGrid({ projects, onOpen }: GalleryGridProps) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
      {projects.map((project, index) => (
        <GalleryCard
          key={project.id}
          project={project}
          priority={index < 2}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
