import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { BUSINESS, CDN } from "@/data/menu";
import { waLink } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Table Reservation — Spice Arena Lahore" },
      {
        name: "description",
        content: `Reserve a table at Spice Arena, Palm City, 28 KM Ferozpur Road Lahore. Open daily ${BUSINESS.hours}.`,
      },
      { property: "og:title", content: "Table Reservation — Spice Arena Lahore" },
      {
        property: "og:description",
        content: `Reserve a table at Spice Arena, Palm City, 28 KM Ferozpur Road Lahore. Open daily ${BUSINESS.hours}.`,
      },
      { property: "og:image", content: `${CDN}/2026/06/ambience-07-s.jpg` },
      { name: "twitter:image", content: `${CDN}/2026/06/ambience-07-s.jpg` },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");

  const message = `*Table reservation — Spice Arena*\nName: ${name || "-"}\nGuests: ${guests}\nDate: ${
    date || "-"
  }\nTime: ${time || "-"}${note ? `\nNote: ${note}` : ""}`;

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={`${CDN}/2026/06/ambience-07-s.jpg`}
          alt="Spice Arena interior"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/85" />
        <div className="relative px-5 py-20 text-center">
          <p className="eyebrow">Reservation</p>
          <h1 className="mt-4 text-4xl font-light md:text-6xl">Reserve Your Table</h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="eyebrow">Booking Details</p>
          <div className="mt-5 space-y-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
            />
            <div className="grid grid-cols-3 gap-3">
              <input
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                inputMode="numeric"
                placeholder="Guests"
                className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
              />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
              />
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Birthday setup, lakeside seating…"
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-brass"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={waLink(message)} target="_blank" rel="noreferrer" className="btn-brass">
              Book on WhatsApp
            </a>
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn-outline-brass">
              Call to Book
            </a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Your details open in WhatsApp so our team can confirm instantly.
          </p>
        </div>

        <div>
          <p className="eyebrow">Visit Us</p>
          <ul className="mt-5 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 flex-none text-brass" />
              <span className="text-muted-foreground">{BUSINESS.address}</span>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-5 w-5 flex-none text-brass" />
              <span className="text-muted-foreground">Daily {BUSINESS.hours}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-5 w-5 flex-none text-brass" />
              <a href={`tel:${BUSINESS.phoneTel}`} className="transition-colors hover:text-brass">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="tile mt-8 h-72">
            <iframe
              title="Spice Arena location"
              src="https://www.google.com/maps?q=Spice%20Arena%20Palm%20City%20Ferozpur%20Road%20Lahore&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
