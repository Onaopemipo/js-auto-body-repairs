"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { BeforeAfterSlider } from "@/components/gallery/before-after-slider";
import type { GalleryProject } from "@/types/gallery";

interface GalleryLightboxProps {
  project: GalleryProject | null;
  hasPrevious: boolean;
  hasNext: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  project,
  hasPrevious,
  hasNext,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    if (!project) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft" && hasPrevious) {
        onPrevious();
      }

      if (event.key === "ArrowRight" && hasNext) {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasNext, hasPrevious, onNext, onPrevious, project]);

  function handlePointerDown(event: React.PointerEvent) {
    pointerStart.current = event.clientX;
  }

  function handlePointerUp(event: React.PointerEvent) {
    const start = pointerStart.current;

    pointerStart.current = null;

    if (start === null) {
      return;
    }

    const difference = event.clientX - start;

    if (difference > 70 && hasPrevious) {
      onPrevious();
    }

    if (difference < -70 && hasNext) {
      onNext();
    }
  }

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      className="relative z-[160]"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/90 backdrop-blur-md data-closed:opacity-0" />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 sm:p-6">
          {project ? (
            <DialogPanel
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              className="relative w-full max-w-7xl overflow-hidden border border-white/10 bg-[#09090a] shadow-2xl"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close gallery"
                className="absolute right-4 top-4 z-30 grid size-11 place-items-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur-md transition hover:border-white/40"
              >
                <X aria-hidden="true" className="size-5" />
              </button>

              <div className="grid lg:grid-cols-[1.45fr_0.55fr]">
                <div className="relative min-h-[24rem] bg-black lg:min-h-[44rem]">
                  {project.beforeImage && project.afterImage ? (
                    <BeforeAfterSlider
                      before={project.beforeImage}
                      after={project.afterImage}
                      priority
                    />
                  ) : (
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      preload
                      sizes="(max-width: 1024px) 100vw, 70vw"
                      placeholder={project.image.blurDataUrl ? "blur" : "empty"}
                      blurDataURL={project.image.blurDataUrl}
                      className="object-contain"
                    />
                  )}

                  {hasPrevious ? (
                    <button
                      type="button"
                      onClick={onPrevious}
                      aria-label="Previous project"
                      className="absolute left-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 backdrop-blur-md transition hover:border-white/40"
                    >
                      <ChevronLeft aria-hidden="true" className="size-5" />
                    </button>
                  ) : null}

                  {hasNext ? (
                    <button
                      type="button"
                      onClick={onNext}
                      aria-label="Next project"
                      className="absolute right-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 backdrop-blur-md transition hover:border-white/40"
                    >
                      <ChevronRight aria-hidden="true" className="size-5" />
                    </button>
                  ) : null}
                </div>

                <div className="p-7 sm:p-9">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--brand-primary-hover)]">
                    {project.categoryLabel}
                  </p>

                  <DialogTitle className="mt-4 text-3xl font-semibold">
                    {project.title}
                  </DialogTitle>

                  <p className="mt-3 font-medium text-white/55">
                    {project.vehicle}
                  </p>

                  <p className="body-copy mt-6 leading-7">{project.summary}</p>

                  <div className="mt-8 border-t border-white/10 pt-7">
                    <h3 className="text-sm font-bold uppercase tracking-[0.1em]">
                      Work completed
                    </h3>

                    <ul className="mt-4 space-y-3">
                      {project.workCompleted.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm text-white/65"
                        >
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </DialogPanel>
          ) : null}
        </div>
      </div>
    </Dialog>
  );
}
