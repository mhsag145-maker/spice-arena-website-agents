import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Clock, Phone } from "lucide-react";
import { BUSINESS } from "@/data/menu";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <img src={BUSINESS.logo} alt="Spice Arena" className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Lahore&apos;s premium lakeside destination restaurant — desi BBQ, live karahis and multi-cuisine
            flavours in a family-friendly setting.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="rounded-full border border-border p-2.5 text-brass transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-primary-foreground"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-border p-2.5 text-brass transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:bg-brass hover:text-primary-foreground"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow">Visit Us</p>
          <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-brass" />
              {BUSINESS.address}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 flex-none text-brass" />
              Daily {BUSINESS.hours}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 flex-none text-brass" />
              <a href={`tel:${BUSINESS.phoneTel}`} className="transition-colors hover:text-brass">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/menu" className="text-muted-foreground transition-colors hover:text-brass">
                Menu &amp; Number Ordering
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-muted-foreground transition-colors hover:text-brass">
                Decor &amp; Food Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground transition-colors hover:text-brass">
                Table Reservation
              </Link>
            </li>
            <li>
              <Link to="/kitchen" className="text-muted-foreground transition-colors hover:text-brass">
                Staff Order Screen
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 px-5 py-6 text-center text-xs tracking-widest text-muted-foreground uppercase">
        © {new Date().getFullYear()} {BUSINESS.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
