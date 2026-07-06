import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/brave_logo_cropped.png.asset.json";

type NavItem = {
  to: string;
  label: string;
  hash?: string;
};

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/businesses", label: "Our Businesses" },
  { to: "/", hash: "leadership", label: "Leadership" },
  { to: "/story", label: "Our Story" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderNavLink = (n: NavItem, onClick?: () => void, className?: string) => {
    if (n.hash) {
      return (
        <a
          key={`${n.to}#${n.hash}`}
          href={`${n.to === "/" ? "" : n.to}#${n.hash}`}
          onClick={(e) => {
            if (typeof window !== "undefined" && window.location.pathname === n.to) {
              e.preventDefault();
              const el = document.getElementById(n.hash!);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            onClick?.();
          }}
          className={className}
        >
          {n.label}
        </a>
      );
    }
    return (
      <Link
        key={n.to}
        to={n.to}
        activeOptions={{ exact: n.to === "/" }}
        onClick={onClick}
        className={className}
        activeProps={{ className: `${className ?? ""} text-primary` }}
      >
        {n.label}
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={logoAsset.url}
            alt="Braventi Holdings"
            className="h-12 w-auto md:h-14"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-base md:text-xl font-bold tracking-wide text-foreground">
              BRAVENTI
            </span>
            <span className="text-[9px] md:text-xs font-semibold tracking-[0.28em] text-primary">
              HOLDINGS
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) =>
            renderNavLink(
              n,
              undefined,
              "text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
            ),
          )}
        </nav>

        <div className="hidden lg:flex items-center">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-sm border border-primary px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-charcoal"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-x py-6 flex flex-col gap-1">
            {nav.map((n) =>
              renderNavLink(
                n,
                () => setOpen(false),
                "rounded-sm px-2 py-3 text-base font-medium text-foreground hover:bg-secondary",
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
