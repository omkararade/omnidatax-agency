import { Button } from "@/components/ui/button";
import { COMPANY_NAME, NAV_LINKS } from "@/lib/constants";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md border-b border-border shadow-elevated"
          : "bg-transparent"
      }`}
      data-ocid="nav.panel"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label={COMPANY_NAME}
          data-ocid="nav.logo.link"
        >
          <span className="font-display font-extrabold text-xl tracking-tight leading-none select-none transition-smooth group-hover:brightness-110">
            <span className="text-foreground">Omni</span>
            <span className="text-muted-foreground/70">Data</span>
            <span className="text-primary">X</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden lg:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-smooth ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:text-foreground hover:bg-muted/50"
            data-ocid="nav.sample_data.button"
          >
            <Link to="/contact">Get Sample Data</Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-subtle"
            data-ocid="nav.book_call.primary_button"
          >
            <Link to="/contact">Book a Call</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          data-ocid="nav.mobile_menu.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden bg-card/98 backdrop-blur-md border-b border-border"
          data-ocid="nav.mobile_menu.panel"
        >
          <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
                  location.pathname === link.href
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                data-ocid={`nav.mobile.${link.label.toLowerCase().replace(" ", "-")}.link`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
              <Button
                asChild
                variant="outline"
                className="w-full border-border"
                data-ocid="nav.mobile.sample_data.button"
              >
                <Link to="/contact">Get Sample Data</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="nav.mobile.book_call.primary_button"
              >
                <Link to="/contact">Book a Call</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
