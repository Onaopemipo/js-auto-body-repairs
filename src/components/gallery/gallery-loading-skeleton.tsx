interface GalleryLoadingSkeletonProps {
  variant?: "index" | "detail";
}

function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-white/[0.065] ${className}`}
    />
  );
}

function GalleryIndexSkeleton() {
  return (
    <>
      <section
        aria-label="Loading gallery"
        aria-busy="true"
        className="border-b border-white/10 pb-16 pt-14 sm:pb-20 sm:pt-20"
      >
        <div className="site-container">
          <SkeletonBlock className="h-3 w-28 rounded-full" />

          <SkeletonBlock className="mt-6 h-14 max-w-3xl rounded-lg sm:h-16" />

          <div className="mt-7 max-w-2xl space-y-3">
            <SkeletonBlock className="h-4 w-full rounded-full" />
            <SkeletonBlock className="h-4 w-5/6 rounded-full" />
          </div>
        </div>
      </section>

      <section aria-hidden="true" className="section-spacing">
        <div className="site-container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <article
                key={index}
                className="overflow-hidden border border-white/10 bg-white/[0.025]"
              >
                <SkeletonBlock className="aspect-[4/3] w-full" />

                <div className="space-y-4 p-6">
                  <SkeletonBlock className="h-3 w-24 rounded-full" />
                  <SkeletonBlock className="h-7 w-4/5 rounded-md" />
                  <SkeletonBlock className="h-4 w-full rounded-full" />
                  <SkeletonBlock className="h-4 w-2/3 rounded-full" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryDetailSkeleton() {
  return (
    <main
      aria-label="Loading repair project"
      aria-busy="true"
      className="page-main"
    >
      <section className="border-b border-white/10 pb-16 pt-12 sm:pb-20 sm:pt-16">
        <div className="site-container">
          <SkeletonBlock className="h-4 w-32 rounded-full" />

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <SkeletonBlock className="h-3 w-28 rounded-full" />

              <SkeletonBlock className="mt-6 h-14 w-full rounded-lg sm:h-16" />

              <div className="mt-7 space-y-3">
                <SkeletonBlock className="h-4 w-full rounded-full" />
                <SkeletonBlock className="h-4 w-5/6 rounded-full" />
                <SkeletonBlock className="h-4 w-3/4 rounded-full" />
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <SkeletonBlock className="h-20 rounded-lg" />
                <SkeletonBlock className="h-20 rounded-lg" />
              </div>
            </div>

            <SkeletonBlock className="aspect-[4/3] w-full rounded-sm" />
          </div>
        </div>
      </section>

      <section aria-hidden="true" className="section-spacing">
        <div className="site-container">
          <div className="grid gap-6 sm:grid-cols-2">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock key={index} className="aspect-[4/3] w-full" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function GalleryLoadingSkeleton({
  variant = "index",
}: GalleryLoadingSkeletonProps) {
  if (variant === "detail") {
    return <GalleryDetailSkeleton />;
  }

  return <GalleryIndexSkeleton />;
}
