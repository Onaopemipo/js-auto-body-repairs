#!/usr/bin/env zsh
set -Eeuo pipefail

PROJECT_ROOT="${PROJECT_ROOT:-$HOME/Workspace/js-auto-body-repairs}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_ROOT="$HOME/.js-auto-body-external-backups"
BACKUP_DIR="$BACKUP_ROOT/phase-5a-content-pages-$TIMESTAMP"

trap 'code=$?; echo; echo "PHASE 5A FAILED"; echo "Exit code: $code"; echo "Line: $LINENO"; exit $code' ERR

cd "$PROJECT_ROOT"

test -f package.json || { echo "ERROR: package.json not found."; exit 1; }
test -f src/app/page.tsx || { echo "ERROR: Homepage not found."; exit 1; }

echo "=== Baseline validation ==="
npm run validate

mkdir -p "$BACKUP_DIR"
rsync -a --exclude=node_modules --exclude=.next --exclude=.git --exclude=.implementation-backups "$PROJECT_ROOT/" "$BACKUP_DIR/"
echo "Backup: $BACKUP_DIR"

mkdir -p src/content src/components/pages src/app/about src/app/services src/app/gallery src/app/testimonials src/app/contact src/app/request-estimate docs/content scripts

cat > src/content/site-content.ts <<'TS'
export const siteContent = {
  business: {
    name: "JS Auto Body Repairs",
    location: "Redland Bay, Queensland",
    address: "816 German Church Road, Redland Bay QLD 4165",
    phoneDisplay: "0410 466 916",
    phoneHref: "tel:0410466916",
    hours: {
      weekdays: "Monday – Friday: 8:30am – 4:30pm",
    },
  },
  home: {
    hero: {
      headline: "Panel Beating & Auto Refinishing, Done Right the First Time",
      subheadline:
        "Redland Bay's trusted collision repair and paint specialists — restoring vehicles to factory standard, every time.",
      primaryCta: "Get a Free Quote",
      secondaryCta: "View Our Work",
    },
    intro: {
      title: "Local expertise. Factory-standard results.",
      body:
        "JS Auto Body Repairs is a locally owned panel beating and auto refinishing shop based in Redland Bay, Queensland. We specialise in collision repairs, paint refinishing, and dent removal — restoring vehicles to factory standard with the kind of care and attention you would want for your own car. From minor dents to major collision damage, our team brings the experience, precision, and honesty this community has come to rely on.",
    },
    whyChooseUs: [
      "Locally owned and operated in Redland Bay",
      "Factory-standard repairs and finishes",
      "Honest communication and fast turnaround",
      "Trusted by the local community for years",
    ],
    featuredReview: {
      quote:
        "Great workmanship, good communication, prompt and professional. Highly recommend.",
      author: "Jill Greenway — Google Review",
    },
  },
  about: {
    heroTitle: "Craftsmanship, honesty and local service.",
    heroDescription:
      "A dedicated Redland Bay workshop focused on repairing vehicles properly, communicating clearly and delivering work to a high standard.",
    storyTitle: "Our story",
    story:
      "JS Auto Body Repairs is a dedicated panel beating and auto refinishing shop located in Redland Bay, Queensland. We specialise in collision repairs, paint refinishing, and dent removal, with every job carried out to factory standard. Led by Sam, our workshop has built its reputation the old-fashioned way — through careful craftsmanship, honest communication, and treating every vehicle like it is our own. Whether it is a straightforward repair or a more complex restoration, our customers keep coming back because they know the job will be done properly, on time, and at a fair price.",
    approachTitle: "Our approach",
    approach:
      "We believe quality auto body repair comes down to three things: expertise, efficiency, and genuine care for the customer. From your first phone call to the moment you drive away, our focus is on making the process simple and stress-free — and making sure your vehicle looks and performs exactly as it should.",
    differentiators: [
      { title: "Local expertise", description: "Proudly serving Redland Bay and the surrounding area." },
      { title: "Attention to detail", description: "Every panel and every finish is inspected before handover." },
      { title: "Fast turnaround", description: "We understand that you need your vehicle back on the road." },
      { title: "Honest, friendly service", description: "No jargon, no surprises — just clear communication." },
    ],
  },
  services: [
    {
      slug: "collision-repairs",
      title: "Collision Repairs",
      summary: "Full structural and panel repairs for vehicles of any make or model.",
      description:
        "Our technicians assess the damage thoroughly and restore your vehicle's structural integrity and appearance to factory standard.",
    },
    {
      slug: "paint-refinishing",
      title: "Paint Refinishing",
      summary: "Precise colour matching and factory-standard spray painting.",
      description:
        "Whether it is a single panel or a full respray, we take the time to achieve a seamless match with your vehicle's original finish.",
    },
    {
      slug: "dent-removal",
      title: "Dent Removal",
      summary: "Precision hail and dent repair techniques.",
      description:
        "We restore damaged panels while preserving the original finish wherever possible, helping save time and avoid unnecessary repainting.",
    },
    {
      slug: "performance-upgrades",
      title: "Performance Upgrades",
      summary: "Performance and cosmetic upgrades tailored to your vehicle.",
      description:
        "Looking to upgrade your vehicle? We can accommodate a range of performance and cosmetic improvements to suit your needs.",
    },
    {
      slug: "routine-maintenance",
      title: "Routine Maintenance",
      summary: "Regular maintenance and vehicle check-ups.",
      description:
        "Keep your vehicle in top condition with routine maintenance, because prevention is always easier than repair.",
    },
    {
      slug: "complex-repairs",
      title: "Complex Repairs",
      summary: "Practical solutions for difficult or unusual repair work.",
      description:
        "Every case is different. Whatever the challenge, our experienced technicians will find the right solution to get your vehicle back to its best.",
    },
    {
      slug: "car-ac-regas",
      title: "Car AC Regas",
      summary: "Air conditioning leak checks and refrigerant regas.",
      description:
        "Stay cool on the road with a full air conditioning regas. We check the system for leaks, top up refrigerant and get your AC blowing cold again.",
    },
  ],
  gallery: {
    title: "Our work",
    description:
      "Every vehicle that comes through our workshop receives the same level of care — from panel repairs and dent removal to full paint refinishing. This gallery will showcase recent repairs and the standard of craftsmanship customers can expect.",
    categories: ["Collision Repairs", "Paint Refinishing", "Dent Removal"],
  },
  testimonials: [
    {
      quote:
        "My car has never run better. The service was fast, efficient, and affordable — I'd recommend them to anyone.",
      author: "Patrick",
    },
    {
      quote:
        "After weeks of trouble with my car, JS Auto Body Repairs was the only shop that could get it right. True experts in everything automotive.",
      author: "Carol Jennings",
    },
    {
      quote:
        "I've been a customer for years, and the quality has never dropped. Five-star service from day one.",
      author: "Abass",
    },
    {
      quote:
        "Sam did a fantastic job renovating my jet-ski trailer — a thorough clean followed by a Raptor coating that's left it durable and easy to maintain. Very happy, and I'll be back.",
      author: "Nico Van Der Merwe — Local Guide, Google Review",
    },
    {
      quote:
        "I've had two cars repaired here, both completed with excellent workmanship. Sam ensures the job is done right and to a high standard, and the turnaround time was impressive.",
      author: "Aaron Pipkorn — Google Review",
    },
    {
      quote:
        "Sam went above and beyond to fix my car — exceptional service, expert knowledge, attention to detail, and a friendly attitude that made the whole experience stress-free.",
      author: "Precious Okoye — Google Review",
    },
    {
      quote:
        "Great craftsmanship! Gave me the shortest time frame to repair my car and did a perfect job. An expert in his field.",
      author: "Patrick Ekpemilo — Google Review",
    },
    {
      quote: "Sam did an amazing job — my old Land Cruiser looks brand new.",
      author: "Mitchell Blewitt — Google Review",
    },
    {
      quote: "So helpful, with a speedy turnaround after my accident. Thank you, Sam!",
      author: "Chelsea Love — Google Review",
    },
    {
      quote:
        "Great workmanship, good communication, prompt and professional. Highly recommend.",
      author: "Jill Greenway — Google Review",
    },
  ],
  contact: {
    title: "Get in touch",
    description: "Have a question or need a quote? Reach out to our team — we are happy to help.",
  },
  quote: {
    title: "Request a free quote",
    description:
      "Tell us about your vehicle and the work required. We will review the details and contact you about the next step.",
  },
} as const;
TS

cat > src/components/pages/page-hero.tsx <<'TSX'
import { Container } from "@/components/ui/container";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(145deg,#111113_0%,#080809_70%)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_30%,rgba(231,7,11,0.16),transparent_28%)]"
      />
      <Container className="relative py-20 sm:py-24 lg:py-32">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-heading mt-6 max-w-5xl text-5xl leading-[1] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="body-copy mt-7 max-w-3xl text-base sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
TSX

cat > src/components/pages/page-cta.tsx <<'TSX'
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

export function PageCta({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="border-t border-white/10 bg-[var(--brand-primary)]">
      <Container className="grid gap-8 py-14 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
        <div>
          <h2 className="display-heading text-4xl leading-[1.05] text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-white/75">{description}</p>
        </div>
        <ButtonLink
          href="/request-estimate"
          variant="secondary"
          size="large"
          className="group border-white/40 bg-black/15"
        >
          Get a free quote
          <ArrowUpRight
            aria-hidden="true"
            className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </ButtonLink>
      </Container>
    </section>
  );
}
TSX

cat > src/app/about/page.tsx <<'TSX'
import type { Metadata } from "next";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about JS Auto Body Repairs, a locally owned Redland Bay panel beating and auto refinishing workshop.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About JS Auto Body Repairs"
        title={siteContent.about.heroTitle}
        description={siteContent.about.heroDescription}
      />
      <section className="section-spacing">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <article>
            <p className="eyebrow">{siteContent.about.storyTitle}</p>
            <p className="body-copy mt-6 text-base leading-8">
              {siteContent.about.story}
            </p>
          </article>
          <article>
            <p className="eyebrow">{siteContent.about.approachTitle}</p>
            <p className="body-copy mt-6 text-base leading-8">
              {siteContent.about.approach}
            </p>
          </article>
        </Container>
      </section>
      <section className="section-spacing border-y border-white/10 bg-white/[0.025]">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
            {siteContent.about.differentiators.map((item) => (
              <article
                key={item.title}
                className="bg-[var(--page-background-elevated)] p-8"
              >
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="body-copy mt-4 text-sm">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Need your vehicle repaired properly?"
        description="Start with a clear assessment and straightforward advice from the team."
      />
    </>
  );
}
TSX

cat > src/app/services/page.tsx <<'TSX'
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Collision repairs, paint refinishing, dent removal, maintenance, complex repairs, performance upgrades and AC regas in Redland Bay.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Complete repair and refinishing support for your vehicle."
        description="From collision damage and dent removal to paint refinishing, maintenance and complex repairs, our workshop provides practical solutions completed with care."
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {siteContent.services.map((service, index) => (
              <article
                key={service.slug}
                id={service.slug}
                className="group bg-[var(--page-background-elevated)] p-8 sm:p-10"
              >
                <div className="flex items-start justify-between gap-5">
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-primary-hover)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 text-white/25 transition group-hover:text-white"
                  />
                </div>
                <h2 className="mt-10 text-3xl font-semibold">{service.title}</h2>
                <p className="mt-4 font-medium text-white/72">{service.summary}</p>
                <p className="body-copy mt-5 text-sm leading-7">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Not sure which service you need?"
        description="Get in touch and we will help you understand the most appropriate next step."
      />
    </>
  );
}
TSX

cat > src/app/gallery/page.tsx <<'TSX'
import type { Metadata } from "next";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View collision repair, paint refinishing and dent removal work completed by JS Auto Body Repairs.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={siteContent.gallery.title}
        description={siteContent.gallery.description}
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {siteContent.gallery.categories.map((category, index) => (
              <article
                key={category}
                className="relative min-h-[28rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#222226_0%,#09090a_52%,#a50303_100%)]"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:32px_32px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-7 pt-28">
                  <span className="text-xs font-bold tracking-[0.16em] text-[var(--brand-primary-hover)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-2xl font-semibold">{category}</h2>
                  <p className="body-copy mt-3 text-sm">
                    Project photography will be added here as completed repair images are supplied.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Want your vehicle restored to the same standard?"
        description="Send us the details and photos of the damage to begin your quote."
      />
    </>
  );
}
TSX

cat > src/app/testimonials/page.tsx <<'TSX'
import type { Metadata } from "next";
import { Quote } from "lucide-react";

import { PageCta } from "@/components/pages/page-cta";
import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Customer Reviews",
  description:
    "Read customer experiences and Google reviews for JS Auto Body Repairs in Redland Bay.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Customer reviews"
        title="What our customers say"
        description="Our reputation has been built through workmanship, communication and repair results that customers are happy to recommend."
      />
      <section className="section-spacing">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {siteContent.testimonials.map((review) => (
              <figure
                key={`${review.author}-${review.quote}`}
                className="border border-white/10 bg-[var(--page-background-elevated)] p-8"
              >
                <Quote
                  aria-hidden="true"
                  className="size-6 text-[var(--brand-primary-hover)]"
                />
                <blockquote className="mt-7 text-lg leading-8 text-white/82">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-8 border-t border-white/10 pt-5 text-sm font-semibold">
                  {review.author}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
      <PageCta
        title="Ready to discuss your repair?"
        description="Contact JS Auto Body Repairs for honest advice and a free quote."
      />
    </>
  );
}
TSX

cat > src/app/contact/page.tsx <<'TSX'
import type { Metadata } from "next";
import { Clock3, MapPin, Phone } from "lucide-react";

import { PageHero } from "@/components/pages/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact JS Auto Body Repairs at 816 German Church Road, Redland Bay QLD 4165.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={siteContent.contact.title}
        description={siteContent.contact.description}
      />
      <section className="section-spacing">
        <Container className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <div className="space-y-5">
              <div className="flex gap-4 border-b border-white/10 pb-5">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="body-copy mt-2 text-sm">{siteContent.business.address}</p>
                </div>
              </div>
              <div className="flex gap-4 border-b border-white/10 pb-5">
                <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <a href={siteContent.business.phoneHref} className="body-copy mt-2 block text-sm hover:text-white">
                    {siteContent.business.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock3 aria-hidden="true" className="mt-1 size-5 shrink-0 text-[var(--brand-primary-hover)]" />
                <div>
                  <p className="font-semibold">Opening hours</p>
                  <p className="body-copy mt-2 text-sm">{siteContent.business.hours.weekdays}</p>
                </div>
              </div>
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/request-estimate">Request a free quote</ButtonLink>
              <a
                href={siteContent.business.phoneHref}
                className="inline-flex min-h-12 items-center justify-center border border-white/20 px-5 text-xs font-bold uppercase tracking-[0.075em] transition hover:border-white/40"
              >
                Call now
              </a>
            </div>
          </div>
          <div className="relative min-h-[30rem] overflow-hidden border border-white/10 bg-[linear-gradient(145deg,#202024,#0b0b0c)]">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px]"
            />
            <div className="absolute inset-x-6 bottom-6 border border-white/10 bg-black/65 p-6 backdrop-blur-xl">
              <p className="eyebrow">Google Maps</p>
              <p className="body-copy mt-3 text-sm">
                Live map and directions integration will be added in the next contact phase.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
TSX

cat > src/app/request-estimate/page.tsx <<'TSX'
import type { Metadata } from "next";

import { PageHero } from "@/components/pages/page-hero";
import { Container } from "@/components/ui/container";
import { siteContent } from "@/content/site-content";

export const metadata: Metadata = {
  title: "Request a Free Quote",
  description:
    "Request a free vehicle repair quote from JS Auto Body Repairs in Redland Bay.",
};

export default function RequestEstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Free quote"
        title={siteContent.quote.title}
        description={siteContent.quote.description}
      />
      <section className="section-spacing">
        <Container>
          <div className="mx-auto max-w-3xl border border-white/10 bg-[var(--page-background-elevated)] p-8 sm:p-10">
            <p className="eyebrow">Quote form coming next</p>
            <h2 className="mt-5 text-3xl font-semibold">Tell us about your vehicle.</h2>
            <p className="body-copy mt-5">
              The next phase will add the complete quote form, including contact details, vehicle information, repair description and photo uploads.
            </p>
            <a
              href={siteContent.business.phoneHref}
              className="mt-8 inline-flex min-h-12 items-center justify-center bg-[var(--brand-primary)] px-5 text-xs font-bold uppercase tracking-[0.075em] text-white"
            >
              Call {siteContent.business.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
TSX

cat > docs/content/phase-5a-content-and-pages.md <<'EOF'
# Phase 5A — Canonical Content and Core Pages

The user-supplied content is now the source of truth for business details, services, reviews, contact information and page messaging.

Created routes:

- `/about`
- `/services`
- `/gallery`
- `/testimonials`
- `/contact`
- `/request-estimate`

No unverified claims were added.
EOF

cat > scripts/validateContentPages.mjs <<'EOF'
import fs from "node:fs";

const files = [
  "src/content/site-content.ts",
  "src/components/pages/page-hero.tsx",
  "src/components/pages/page-cta.tsx",
  "src/app/about/page.tsx",
  "src/app/services/page.tsx",
  "src/app/gallery/page.tsx",
  "src/app/testimonials/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/request-estimate/page.tsx",
  "docs/content/phase-5a-content-and-pages.md",
];

const failures = files.filter((file) => !fs.existsSync(file));
const content = fs.readFileSync("src/content/site-content.ts", "utf8");

for (const value of [
  "816 German Church Road",
  "0410 466 916",
  "Monday – Friday: 8:30am – 4:30pm",
  "Panel Beating & Auto Refinishing",
  "Jill Greenway",
]) {
  if (!content.includes(value)) failures.push(`Missing canonical content: ${value}`);
}

if (failures.length) {
  console.error("Content page validation failed.\n");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Content page validation passed: ${files.length} files.`);
EOF

node <<'EOF'
const fs = require("node:fs");
const file = "package.json";
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));

pkg.scripts = {
  ...pkg.scripts,
  "validate:content-pages": "node scripts/validateContentPages.mjs",
  validate:
    "npm run validate:foundation && npm run validate:brand-core && npm run validate:navigation && npm run validate:homepage && npm run validate:motion && npm run validate:three && npm run validate:hero-media && npm run validate:content-pages && npm run typecheck && npm run lint && npm run build",
};

fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`);
EOF

npx prettier --write \
  "src/content/**/*.ts" \
  "src/components/pages/**/*.{ts,tsx}" \
  "src/app/about/page.tsx" \
  "src/app/services/page.tsx" \
  "src/app/gallery/page.tsx" \
  "src/app/testimonials/page.tsx" \
  "src/app/contact/page.tsx" \
  "src/app/request-estimate/page.tsx" \
  "scripts/validateContentPages.mjs" \
  "docs/content/phase-5a-content-and-pages.md" \
  "package.json"

npm run validate:content-pages
npm run typecheck
npm run lint
rm -rf .next
npm run build
npm run validate

git add \
  package.json \
  src/content \
  src/components/pages \
  src/app/about \
  src/app/services \
  src/app/gallery \
  src/app/testimonials \
  src/app/contact \
  src/app/request-estimate \
  scripts/validateContentPages.mjs \
  docs/content/phase-5a-content-and-pages.md

if git diff --cached --quiet; then
  echo "No staged Phase 5A changes."
else
  git commit -m "feat: add canonical content and core pages"
fi

echo
echo "PHASE 5A COMPLETE"
echo "Project: $PROJECT_ROOT"
echo "Backup: $BACKUP_DIR"
