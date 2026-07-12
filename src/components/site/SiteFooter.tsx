import { Link } from "@tanstack/react-router";
import { Facebook, Twitter, Mail } from "lucide-react";
import logoAsset from "@/assets/brave_logo_cropped.png";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-white/85">
      <div className="container-x py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logoAsset}
                alt="Braventi Holdings"
                className="h-11 w-auto"
              />
              <div className="leading-none">
                <div className="font-display text-xl text-white">Braventi</div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                  Holdings
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-white/60 max-w-xs">
              A diversified investment and operating company building enduring
              businesses across trade, technology, infrastructure and
              sustainable industries.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.24em] text-gold font-sans font-semibold">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["/about", "About"],
                ["/businesses", "Our Businesses"],
                ["/#leadership", "Leadership"],
                ["/careers", "Careers"],
                ["/contact", "Contact"],
              ].map(([to, label]) => (
                <li key={to}>
                  <a
                    href={to}
                    className="text-white/75 hover:text-gold transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.24em] text-gold font-sans font-semibold">
              Businesses
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["/businesses/exim", "Braventi EXIM"],
                ["/businesses/techworks", "Braventi Techworks"],
                ["/businesses/structures", "Braventi Structures"],
                ["/businesses/energies", "Braventi Energies"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-white/75 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="text-white/40">Braventi Minerals — Coming soon</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] uppercase tracking-[0.24em] text-gold font-sans font-semibold">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-white/75">
              <li>Corporate Headquarters</li>
              <li>Abuja, Nigeria</li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <a href="mailto:braventitechnologies@gmail.com" className="hover:text-gold">
                  braventitechnologies@gmail.com
                </a>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1CmsJs2rJv/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold transition"
              >
                <Facebook size={15} />
              </a>
              <a
                href="https://x.com/Braventi_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:border-gold hover:text-gold transition"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div>© 2026 Braventi Holdings. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
