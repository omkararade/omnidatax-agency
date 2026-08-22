import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Database,
  FileText,
  HelpCircle,
} from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

const resourceSections = [
  {
    id: "sample-data",
    icon: <Database className="w-5 h-5" />,
    title: "Sample Data",
    description:
      "Request a small sample export before starting a larger extraction, CRM, or automation project.",
    action: "Request Sample",
    href: "/contact#form",
  },
  {
    id: "documentation",
    icon: <FileText className="w-5 h-5" />,
    title: "Documentation",
    description:
      "Review how we scope sources, structure delivery files, and keep data workflows maintainable.",
    action: "Start With Services",
    href: "/services",
  },
  {
    id: "faq",
    icon: <HelpCircle className="w-5 h-5" />,
    title: "FAQ",
    description:
      "Have questions about timelines, legal data collection, CRM setup, or integrations? Send them over.",
    action: "Ask a Question",
    href: "/contact#form",
  },
];

export function ResourcesPage() {
  return (
    <>
      <SEO
        title="Resources | OmniDataX"
        description="Sample data, documentation, FAQs, and practical guides for OmniDataX automation and data projects."
      />

      <div className="pt-16">
        <section className="py-20 bg-card border-b border-border">
          <div className="container mx-auto px-6 max-w-3xl text-center">
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/10 mb-5 text-xs font-mono tracking-wider"
            >
              RESOURCES
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
              Helpful Project Resources
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Quick entry points for sample data, documentation, FAQs, and
              practical guides before you start a project.
            </p>
          </div>
        </section>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {resourceSections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="bg-card border border-border rounded-2xl p-6 scroll-mt-24"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center mb-5">
                  {section.icon}
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-2">
                  {section.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {section.description}
                </p>
                <Button asChild variant="outline" className="border-border">
                  <a href={section.href}>
                    {section.action}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </section>

        <section id="blog" className="py-16 bg-muted/20 border-t border-border scroll-mt-24">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Blog
                </h2>
                <p className="text-sm text-muted-foreground">
                  Practical thinking from the OmniDataX playbook.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.id}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <Badge
                    variant="secondary"
                    className="bg-muted text-muted-foreground font-mono text-xs mb-4"
                  >
                    {post.category}
                  </Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="text-xs text-muted-foreground font-mono">
                    {post.date} / {post.readTime}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/contact">
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
