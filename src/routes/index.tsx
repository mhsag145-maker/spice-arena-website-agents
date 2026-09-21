import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, Phone, ChevronRight } from "lucide-react";
import { menu, BUSINESS, CDN } from "@/data/menu";
import { waLink } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Spice Arena — Best Restaurant in Lahore" },
      {
        name: "description",
        content:
          "Lakeside dining in Lahore: desi BBQ, live karahis, Chinese, continental and desserts. Order by dish number or reserve a table.",
      },
      { property: "og:title", content: "Spice Arena — Best Restaurant in Lahore" },
      {
        property: "og:description",
        content:
          "Lakeside dining in Lahore: desi BBQ, live karahis, Chinese, continental and desserts. Order by dish number or reserve a table.",
      },
      { property: "og:image", content: `${CDN}/2026/06/chinese-03-s.jpg` },
      { name: "twitter:image", content: `${CDN}/2026/06/chinese-03-s.jpg` },
    ],
  }),
  component: Home,
});

const slides = [
  {
    eyebrow: "Traditions & Culture",
    title: "Comfort. Taste. Gatherings.",
    text: "Enjoy your favourite meals in a sophisticated, family-friendly setting designed for memorable evenings and corporate events.",
    image: `${CDN}/2021/04/spicearena-hero-03.jpg`,
  },
  {
    eyebrow: "Serving Since 2021",
    title: "Escape. Dine. Unwind.",
    text: "Experience Lahore's premium lakeside destination restaurant, offering serenity and exceptional taste.",
    image: `${CDN}/2026/06/ambience-12-s.jpg`,
  },
  {
    eyebrow: "Culinary Artistry",
    title: "Sizzle. Spice. Savor.",
    text: "Authentic desi BBQ, live karahis and diverse multi-cuisine flavours crafted daily by our expert chefs.",
    image: `${CDN}/2026/06/desi-05-s.jpg`,
  },
];

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={slides[0].image}
          alt="Spice Arena dining"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/80" />
        <div className="relative mx-auto max-w-4xl px-5 py-32 text-center md:py-44">
          <p className="eyebrow">{slides[0].eyebrow}</p>
          <h1 className="mt-6 text-5xl leading-tight font-light md:text-7xl">{slides[0].title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {slides[0].text}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="btn-brass">
              Order by Number
            </Link>
            <a
              href={waLink("Hello Spice Arena! I want to reserve a table.")}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-brass"
            >
              Reserve on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="border-y border-border bg-deep">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm md:grid-cols-3">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 flex-none text-brass" />
            <span className="text-muted-foreground">{BUSINESS.address}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 flex-none text-brass" />
            <span className="text-muted-foreground">Daily {BUSINESS.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 flex-none text-brass" />
            <a href={`tel:${BUSINESS.phoneTel}`} className="transition-colors hover:text-brass">
              Booking: {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Story slides */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {slides.map((s) => (
            <article key={s.title} className="tile bg-card">
              <div className="h-60 w-full overflow-hidden">
                <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <p className="eyebrow">{s.eyebrow}</p>
                <h3 className="mt-3 text-2xl font-light">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Menu categories */}
      <section className="border-t border-border bg-deep py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="text-center">
            <p className="eyebrow">Explore Our Delicious Selections</p>
            <h2 className="mt-4 text-4xl font-light md:text-5xl">The Menu</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Every dish carries a number. Tap the numbers on the menu page to build your order in seconds.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menu.map((c) => (
              <Link key={c.slug} to="/menu" className="tile group block bg-card">
                <div className="h-52 w-full overflow-hidden">
                  <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="text-xl font-light">{c.title}</h3>
                    <p className="mt-1 text-xs tracking-wider text-muted-foreground">
                      #{c.items[0].no} – #{c.items[c.items.length - 1].no}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-brass transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="text-center">
          <p className="eyebrow">For Unforgettable Family Moments</p>
          <h2 className="mt-4 text-4xl font-light md:text-5xl">The Best Ambience in Lahore</h2>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            `${CDN}/2026/06/ambience-07-s.jpg`,
            `${CDN}/2026/06/ambience-10-s.jpg`,
            `${CDN}/2026/06/ambience-02-s.jpg`,
            `${CDN}/2026/06/ambience-11-s.jpg`,
          ].map((src) => (
            <div key={src} className="tile h-64">
              <img src={src} alt="Spice Arena ambience" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="btn-outline-brass">
            View Full Gallery
          </Link>
        </div>
      </section>

      {/* Reservation CTA */}
      <section className="relative isolate overflow-hidden border-t border-border">
        <img
          src={`${CDN}/2021/05/dinner-table-2.png`}
          alt="Reserved table"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/85" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <p className="eyebrow">Celebrate Life</p>
          <h2 className="mt-4 text-4xl font-light md:text-5xl">Reserve Your Table Tonight</h2>
          <p className="mt-5 text-sm text-muted-foreground">
            Family halls, lakeside seating and private corporate gatherings.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-brass">
              Table Reservation
            </Link>
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn-outline-brass">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
