import {
  COMPANY_EMAIL,
  COMPANY_GITHUB,
  COMPANY_LINKEDIN,
  COMPANY_NAME,
  COMPANY_TWITTER,
  FOOTER_SECTIONS,
} from "@/lib/constants";
import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const caffeineSrc = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-card border-t border-border" data-ocid="footer.panel">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 group w-fit"
              aria-label={COMPANY_NAME}
              data-ocid="footer.logo.link"
            >
              <span className="font-display font-extrabold text-2xl tracking-tight leading-none select-none transition-smooth group-hover:brightness-110">
                <span className="text-foreground">Omni</span>
                <span className="text-muted-foreground/70">Data</span>
                <span className="text-primary">X</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Automated data extraction and AI analytics that help e-commerce
              brands, SaaS companies, and research firms make smarter decisions
              faster.
            </p>
            <div className="flex items-center gap-2 mt-1">
              <a
                href={`mailto:${COMPANY_EMAIL}`}
                className="text-sm text-muted-foreground hover:text-primary transition-smooth flex items-center gap-1.5"
                data-ocid="footer.email.link"
              >
                <Mail className="w-3.5 h-3.5" />
                {COMPANY_EMAIL}
              </a>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href={COMPANY_TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border flex items-center justify-center text-muted-foreground transition-smooth"
                aria-label="Twitter"
                data-ocid="footer.twitter.link"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border flex items-center justify-center text-muted-foreground transition-smooth"
                aria-label="LinkedIn"
                data-ocid="footer.linkedin.link"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href={COMPANY_GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-md bg-muted/50 hover:bg-primary/20 hover:text-primary border border-border flex items-center justify-center text-muted-foreground transition-smooth"
                aria-label="GitHub"
                data-ocid="footer.github.link"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-widest">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with love using{" "}
            <a
              href={caffeineSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
