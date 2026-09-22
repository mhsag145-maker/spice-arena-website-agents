import { createFileRoute } from "@tanstack/react-router";
import { CDN } from "@/data/menu";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Decor & Food Gallery — Spice Arena Lahore" },
      {
        name: "description",
        content: "Photos of Spice Arena: lakeside decor, family halls, live BBQ counters and signature plates.",
      },
      { property: "og:title", content: "Decor & Food Gallery — Spice Arena Lahore" },
      {
        property: "og:description",
        content: "Photos of Spice Arena: lakeside decor, family halls, live BBQ counters and signature plates.",
      },
      { property: "og:image", content: `${CDN}/2026/06/ambience-12-s.jpg` },
      { name: "twitter:image", content: `${CDN}/2026/06/ambience-12-s.jpg` },
    ],
  }),
  component: GalleryPage,
});

const decor = [
  "2026/06/decor-01-s.jpg",
  "2026/06/decor-02-s.jpg",
  "2026/06/decor-04-s.jpg",
  "2026/06/decor-07-s.jpg",
  "2026/06/decor-08-s.jpg",
  "2026/06/decor-09-s.jpg",
  "2026/06/decor-11-s.jpg",
  "2026/06/decor-12-s.jpg",
];

const ambience = [
  "2026/06/ambience-21-s.jpg",
  "2026/06/ambience-26-s.jpg",
  "2026/06/ambience-27-s.jpg",
  "2026/06/ambience-28-s.jpg",
  "2026/06/ambience-29-s.jpg",
  "2026/06/ambience-36-s.jpg",
  "2026/06/ambience-37-s.jpg",
  "2026/06/ambience-38-s.jpg",
];

const food = [
  "2026/06/DSC06058-s.webp",
  "2026/06/DSC06068-s.webp",
  "2026/06/DSC06091-s.webp",
  "2026/06/DSC06099-s.webp",
  "2025/10/Spice-Arena-11.jpg",
  "2025/10/Spice-Arena-25.jpg",
  "2025/10/Spice-Arena-41.jpg",
  "2026/06/Spice-Arena-06-1.jpg",
];

const interactiveViews = new Set(decor.slice(0, 3));

function InteractivePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="tile interactive-view h-60" aria-label={`${alt}, automatic 360 view`}>
      <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
    </div>
  );
}

function Grid({ label, title, paths }: { label: string; title: string; paths: string[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      <div className="text-center">
        <p className="eyebrow">{label}</p>
        <h2 className="mt-4 text-4xl font-light">{title}</h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {paths.map((p) =>
          interactiveViews.has(p) ? (
            <InteractivePhoto key={p} src={`${CDN}/${p}`} alt={title} />
          ) : (
            <div key={p} className="tile h-60">
              <img src={`${CDN}/${p}`} alt={title} loading="lazy" className="h-full w-full object-cover" />
            </div>
          ),
        )}
      </div>
    </section>
  );
}

function GalleryPage() {
  return (
    <div>
      <section className="border-b border-border bg-deep py-16 text-center">
        <p className="eyebrow">Celebrate Life</p>
        <h1 className="mt-4 text-4xl font-light md:text-6xl">Gallery</h1>
      </section>
      <Grid label="Celebrate Life" title="Decor & Vibe" paths={decor} />
      <div className="border-t border-border bg-deep">
        <Grid label="The Best Ambience in Lahore" title="Ambience" paths={ambience} />
      </div>
      <Grid label="Culinary Artistry" title="Food Gallery" paths={food} />
    </div>
  );
}
