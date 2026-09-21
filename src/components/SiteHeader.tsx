import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu as MenuIcon, X, Phone } from "lucide-react";
import { BUSINESS } from "@/data/menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu & Order" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Reservation" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-deep/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={BUSINESS.logo} alt="Spice Arena" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="nav-link" activeProps={{ className: "nav-link text-brass" }}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={`tel:${BUSINESS.phoneTel}`} className="btn-outline-brass hidden lg:inline-flex">
            <Phone className="h-3.5 w-3.5" />
            {BUSINESS.phoneDisplay}
          </a>
          <Link to="/menu" className="btn-brass hidden sm:inline-flex">
            Order Now
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 text-brass transition-colors hover:border-brass hover:bg-secondary md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/70 bg-deep px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="nav-link" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <a href={`tel:${BUSINESS.phoneTel}`} className="nav-link">
              Call {BUSINESS.phoneDisplay}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
