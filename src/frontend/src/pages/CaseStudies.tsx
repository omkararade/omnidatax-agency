import { type CaseStudy, createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Database,
  type LucideIcon,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const iconMap: Record<string, LucideIcon> = {
  trending: TrendingUp,
  zap: Zap,
  bar: BarChart2,
  cart: ShoppingCart,
  database: Database,
};

function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? BarChart2;
}

function CaseStudyCard({
  study,
  index,
}: {
  study: CaseStudy;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const Icon = getIcon(study.iconName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      data-ocid={`case_studies.item.${index + 1}`}
    >
      <Card
        className={`relative overflow-hidden border-border bg-card transition-smooth group ${
          expanded
            ? "shadow-elevated border-primary/30"
            : "hover:shadow-elevated hover:border-primary/30"
        }`}
      >
        {/* Accent glow line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

        <div className="p-6">
          {/* Header: badges + metric */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge
                  variant="secondary"
                  className="text-xs font-mono bg-muted text-muted-foreground border-0"
                >
                  {study.industry}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-border/60 text-muted-foreground"
                >
                  {study.clientType}
                </Badge>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <h3 className="text-base font-display font-semibold text-foreground leading-snug">
                  {study.title}
                </h3>
              </div>
            </div>

            {/* Key metric */}
            <div className="shrink-0 text-right bg-primary/5 border border-primary/20 rounded-xl px-4 py-2.5">
              <div className="text-2xl font-display font-bold text-primary leading-none">
                {study.keyMetric}
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
                {study.keyMetricLabel}
              </div>
            </div>
          </div>

          {/* Problem teaser */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {study.problem}
          </p>

          {/* Tool chips (collapsed only) */}
          {!expanded && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {study.tools.slice(0, 3).map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono border border-border"
                >
                  {tool}
                </span>
              ))}
              {study.tools.length > 3 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono border border-border">
                  +{study.tools.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/70 transition-smooth"
            data-ocid={`case_studies.toggle.${index + 1}`}
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Read Full Case Study
              </>
            )}
          </button>
        </div>

        {/* Expanded detail view */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
              data-ocid={`case_studies.detail.${index + 1}`}
            >
              <div className="px-6 pb-6 border-t border-border/50 pt-5 space-y-5">
                {/* Problem */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    <span className="w-1 h-3 rounded-full bg-destructive/70 inline-block" />
                    The Problem
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                    <span className="w-1 h-3 rounded-full bg-primary/70 inline-block" />
                    Our Approach
                  </h4>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {study.approach}
                  </p>
                </div>

                {/* Tools */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2.5">
                    <span className="w-1 h-3 rounded-full bg-muted-foreground/50 inline-block" />
                    Tools Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {study.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="text-xs font-mono border-primary/30 text-primary bg-primary/5"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h4 className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-3">
                    <span className="w-1 h-3 rounded-full bg-primary inline-block" />
                    Results
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {study.results.map((result, ri) => (
                      <div
                        key={`${result.metric}-${ri}`}
                        className="bg-muted/60 border border-border rounded-lg p-3 text-center"
                        data-ocid={`case_studies.result.${index + 1}.${ri + 1}`}
                      >
                        <div className="text-lg font-display font-bold text-primary leading-none mb-1">
                          {result.metric}
                        </div>
                        <div className="text-[10px] text-muted-foreground leading-snug">
                          {result.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function CaseStudySkeletonCard() {
  return (
    <Card className="border-border bg-card p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-md" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
        <Skeleton className="h-14 w-20 rounded-xl shrink-0" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-5 w-32" />
    </Card>
  );
}

export function CaseStudiesPage() {
  const { actor, isFetching } = useActor(createActor);

  const { data: studies = [], isLoading } = useQuery<CaseStudy[]>({
    queryKey: ["caseStudies"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCaseStudies();
    },
    enabled: !!actor && !isFetching,
  });

  const studyCount = isLoading ? "—" : studies.length.toString();

  return (
    <div className="pt-16 bg-background min-h-screen">
      {/* Hero header */}
      <section
        className="relative bg-card border-b border-border overflow-hidden"
        data-ocid="case_studies.header.section"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] rounded-full bg-primary/6 blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block font-mono text-xs uppercase tracking-widest text-primary mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/5">
              Case Studies
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold gradient-headline mb-4 leading-tight">
              Real Results for Real Businesses
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From Shopify sellers to enterprise research firms — see how we've
              turned raw data challenges into measurable, documented business
              outcomes.
            </p>
          </motion.div>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { value: studyCount, label: "Case Studies" },
              { value: "23–80%", label: "Avg. Improvement" },
              { value: "4+", label: "Industries Served" },
              { value: "100%", label: "Client Retention" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-muted/40 border border-border rounded-xl p-4"
              >
                <div className="text-2xl font-display font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case study grid */}
      <section
        className="max-w-5xl mx-auto px-6 py-16 md:py-20"
        data-ocid="case_studies.list.section"
      >
        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            data-ocid="case_studies.loading_state"
          >
            {[1, 2, 3, 4].map((n) => (
              <CaseStudySkeletonCard key={n} />
            ))}
          </div>
        ) : studies.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center py-24 space-y-4"
            data-ocid="case_studies.empty_state"
          >
            <div className="relative mx-auto w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
              <div className="relative w-16 h-16 rounded-full bg-card border border-primary/20 flex items-center justify-center">
                <BarChart2 className="w-7 h-7 text-primary/60" />
              </div>
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              Case studies coming soon
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto text-sm leading-relaxed">
              We're documenting our client outcomes. Check back soon or get in
              touch to discuss your project.
            </p>
            <Button
              asChild
              className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              <Link to="/contact">Start a Conversation</Link>
            </Button>
          </motion.div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
            data-ocid="case_studies.list"
          >
            {studies.map((study, index) => (
              <CaseStudyCard
                key={study.id.toString()}
                study={study}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section
        className="bg-muted/30 border-t border-border"
        data-ocid="case_studies.cta.section"
      >
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mx-auto w-14 h-14 mb-6">
              <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl" />
              <div className="relative w-14 h-14 rounded-full bg-card border border-primary/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold gradient-headline mb-3">
              Get Similar Results for Your Business
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Every case study above started with a single conversation. Tell us
              your data challenge and we'll show you exactly how we'd solve it —
              with a clear plan, timeline, and expected ROI.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2 px-8 rounded-full shadow-elevated"
                data-ocid="case_studies.cta_primary_button"
              >
                <Link to="/contact">
                  Start Your Data Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:border-primary/40 gap-2 px-8 rounded-full"
                data-ocid="case_studies.cta_secondary_button"
              >
                <Link to="/services">View Our Services</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
