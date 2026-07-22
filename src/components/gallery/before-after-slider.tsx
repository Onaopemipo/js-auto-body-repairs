"use client";

import { ArrowLeftRight } from "lucide-react";
import Image from "next/image";
import { useState, type ChangeEvent } from "react";

import type { GalleryImage } from "@/types/gallery";

interface BeforeAfterSliderProps {
  before: GalleryImage;
  after: GalleryImage;
  priority?: boolean;
}

export function BeforeAfterSlider({
  before,
  after,
  priority = false,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setPosition(Number(event.target.value));
  }

  return (
    <div className="relative isolate aspect-[4/3] overflow-hidden bg-black">
      <Image
        src={after.src}
        alt={after.alt}
        fill
        preload={priority}
        sizes="(max-width: 768px) 100vw, 70vw"
        placeholder={after.blurDataUrl ? "blur" : "empty"}
        blurDataURL={after.blurDataUrl}
        className="object-cover"
      />

      <div
        className="absolute inset-y-0 left-0 overflow-hidden"
        style={{
          width: `${position}%`,
        }}
      >
        <div className="absolute inset-y-0 left-0 w-[100vw] max-w-none">
          <Image
            src={before.src}
            alt={before.alt}
            fill
            preload={priority}
            sizes="(max-width: 768px) 100vw, 70vw"
            placeholder={before.blurDataUrl ? "blur" : "empty"}
            blurDataURL={before.blurDataUrl}
            className="object-cover"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_18px_rgba(0,0,0,0.65)]"
        style={{
          left: `${position}%`,
        }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/75 backdrop-blur-md">
          <ArrowLeftRight className="size-4" />
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={handleChange}
        aria-label="Move the before and after comparison"
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />

      <span className="absolute left-4 top-4 z-10 bg-black/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        Before
      </span>

      <span className="absolute right-4 top-4 z-10 bg-black/70 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        After
      </span>
    </div>
  );
}
