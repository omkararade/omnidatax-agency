import SEO from "@/components/SEO";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  Database,
  ExternalLink,
  FileText,
  ImageIcon,
  Play,
  type LucideIcon,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import ScrollSectionReveal from "../components/ScrollSectionReveal";

type CaseStudy = {
  id: string;
  title: string;
  clientType: string;
  industry: string;
  keyMetric: string;
  keyMetricLabel: string;
  problem: string;
  approach: string;
  tools: string[];
  results: {
    metric: string;
    description: string;
  }[];
  iconName: string;
  thumbnailUrl?: string;
  thumbnailType?: "image" | "video" | "document" | null;
  externalUrl?: string;
  externalLinkLabel?: string;
};

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

function getSafeExternalUrl(url?: string): string | undefined {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : undefined;
  } catch {
    return undefined;
  }
}

function parseArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== "string") return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function StudyMediaPreview({
  study,
  interactive = false,
}: {
  study: CaseStudy;
  interactive?: boolean;
}) {
  const type = study.thumbnailType;
  const url = getSafeExternalUrl(study.thumbnailUrl);
  const className = "absolute inset-0 h-full w-full";

  if (type === "image" && url) {
    return (
      <img
        src={url}
        alt={`${study.title} thumbnail`}
        className={`${className} object-cover transition-transform duration-500 ${
          interactive ? "group-hover:scale-105" : ""
        }`}
      />
    );
  }

  if (type === "video" && url) {
    return (
      <video
        src={url}
        className={`${className} object-cover ${
          interactive ? "group-hover:scale-105" : ""
        } transition-transform duration-500`}
        muted
        playsInline
        preload="metadata"
      />
    );
  }

  if (type === "document") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/20 via-card to-muted p-4 text-center">
        <FileText className="h-8 w-8 text-primary" />
        <span className="line-clamp-2 text-xs font-mono text-muted-foreground">
          Document preview
        </span>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/15 via-card to-muted">
      <ImageIcon className="h-8 w-8 text-primary/70" />
    </div>
  );
}

function CaseStudyCard({
  study,
  index,
  onOpen,
}: {
  study: CaseStudy;
  index: number;
  onOpen: (study: CaseStudy) => void;
}) {
  const Icon = getIcon(study.iconName);
  const hasMedia = Boolean(study.thumbnailType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
      data-ocid={`case_studies.item.${index + 1}`}
    >
      <Card className="relative flex h-full flex-col overflow-hidden border-border bg-card transition-smooth group hover:border-primary/30 hover:shadow-elevated">
        {/* Accent glow line on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />

        {hasMedia && (
          <button
            type="button"
            onClick={() => onOpen(study)}
            className="group/media relative block aspect-[16/7] w-full overflow-hidden border-b border-border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            aria-label={`Open ${study.title}`}
          >
            <StudyMediaPreview study={study} interactive />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
              {study.thumbnailType === "video" ? (
                <Play className="h-3 w-3 fill-primary text-primary" />
              ) : study.thumbnailType === "document" && mediaUrl ? (
                <FileText className="h-3 w-3 text-primary" />
              ) : (
                <ImageIcon className="h-3 w-3 text-primary" />
              )}
              Preview
            </span>
          </button>
        )}

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
            {/* Left Side */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
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

              {/* Icon + Title */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Icon className="w-4 h-4 text-primary" />
                </div>

                <h3 className="min-w-0 line-clamp-3 text-xl font-display font-semibold leading-tight text-foreground">
                  {study.title}
                </h3>
              </div>
            </div>

            {/* Right Side Metric Card */}
            <div
              className="
                w-full
                sm:w-auto
                sm:min-w-[110px]
                sm:max-w-[150px]
                text-center
                rounded-2xl
                border
                border-primary/20
                bg-primary/5
                px-4
                py-3
                backdrop-blur-sm
              "
            >
              <div className="text-3xl font-display font-bold text-primary leading-none">
                {study.keyMetric}
              </div>

              <div
                className="
                  text-xs
                  text-muted-foreground
                  mt-2
                  leading-tight
                  line-clamp-2
                "
              >
                {study.keyMetricLabel}
              </div>
            </div>
          </div>

          {/* Problem teaser */}
          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {study.problem}
          </p>

          {/* Tool chips */}
          <div className="mb-5 flex min-h-[26px] flex-wrap gap-1.5">
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

          <button
            type="button"
            onClick={() => onOpen(study)}
            className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary transition-smooth hover:text-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            data-ocid={`case_studies.toggle.${index + 1}`}
          >
            <ArrowRight className="h-4 w-4" />
            Open Case Study
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

function CaseStudyDialog({
  study,
  open,
  onOpenChange,
}: {
  study: CaseStudy | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!study) return null;

  const Icon = getIcon(study.iconName);
  const externalUrl = getSafeExternalUrl(study.externalUrl);
  const mediaUrl = getSafeExternalUrl(study.thumbnailUrl);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto border-border bg-card p-0">
        <DialogHeader className="border-b border-border px-6 py-5 pr-12">
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-muted font-mono text-xs text-muted-foreground">
              {study.industry}
            </Badge>
            <Badge variant="outline" className="border-border/60 text-xs text-muted-foreground">
              {study.clientType}
            </Badge>
          </div>
          <DialogTitle className="font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {study.title}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Full details for {study.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 px-6 py-6">
          {study.thumbnailType && (
            <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-muted">
              {study.thumbnailType === "video" && mediaUrl ? (
                <video
                  src={mediaUrl}
                  className="h-full w-full object-contain bg-black"
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : study.thumbnailType === "document" ? (
                <a
                  href={mediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/15 via-card to-muted text-center transition-colors hover:bg-primary/10"
                >
                  <FileText className="h-12 w-12 text-primary" />
                  <span className="text-sm font-semibold text-foreground">Open document preview</span>
                  <span className="text-xs text-muted-foreground">Opens in a new tab</span>
                </a>
              ) : (
                <StudyMediaPreview study={study} />
              )}
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
            <div className="space-y-5">
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="inline-block h-3 w-1 rounded-full bg-destructive/70" />
                  The Problem
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">{study.problem}</p>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="inline-block h-3 w-1 rounded-full bg-primary/70" />
                  Our Approach
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">{study.approach}</p>
              </div>
            </div>

            <div className="min-w-[150px] rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-center">
              <Icon className="mx-auto mb-2 h-4 w-4 text-primary" />
              <div className="font-display text-3xl font-bold leading-none text-primary">{study.keyMetric}</div>
              <div className="mt-2 text-xs leading-tight text-muted-foreground">{study.keyMetricLabel}</div>
            </div>
          </div>

          <div>
            <h4 className="mb-2.5 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="inline-block h-3 w-1 rounded-full bg-muted-foreground/50" />
              Tools Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.tools.map((tool) => (
                <Badge key={tool} variant="outline" className="border-primary/30 bg-primary/5 font-mono text-xs text-primary">
                  {tool}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="inline-block h-3 w-1 rounded-full bg-primary" />
              Results
            </h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {study.results.map((result, index) => (
                <div key={`${result.metric}-${index}`} className="rounded-lg border border-border bg-muted/60 p-3 text-center">
                  <div className="mb-1 font-display text-lg font-bold leading-none text-primary">{result.metric}</div>
                  <div className="text-[10px] leading-snug text-muted-foreground">{result.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {externalUrl && (
          <DialogFooter className="border-t border-border px-6 py-4 sm:justify-end">
            <Button asChild className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={externalUrl} target="_blank" rel="noreferrer">
                {study.externalLinkLabel?.trim() || "Read more"}
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
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
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const { data: studies = [], isLoading } = useQuery({
    queryKey: ["caseStudies"],
    queryFn: async (): Promise<CaseStudy[]> => {
      const { data, error } = await supabase
        .from("case_studie")
        .select("*")
        .order("created_at", { ascending: false });
  
      if (error) {
        throw error;
      }
  
      return (data || []).map((item: any) => ({
        id: item.id?.toString() || "",
        title: item.title || "",
        clientType: item.client_type || "",
        industry: item.industry || "",
        keyMetric: item.key_metric || "",
        keyMetricLabel: item.key_metric_label || "",
        problem: item.problem || "",
        approach: item.approach || "",
        tools: parseArray<string>(item.tools),
        results: parseArray<CaseStudy["results"][number]>(item.results),
        iconName: item.icon_name || "bar",
        thumbnailUrl: item.thumbnail_url || "",
        thumbnailType: ["image", "video", "document"].includes(
          item.thumbnail_type,
        )
          ? item.thumbnail_type
          : null,
        externalUrl: item.external_url || "",
        externalLinkLabel: item.external_link_label || "",
      }));
    },
  });

  const studyCount = isLoading ? "—" : studies.length.toString();

  return (
    <>
      <SEO
        title="Case Studies | OmniDataX"
        description="See how OmniDataX has delivered AI automation and data engineering solutions for businesses across multiple industries."
      />
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
      <ScrollSectionReveal variant="pipeline">
        <section
          className="max-w-5xl mx-auto px-6 py-16 md:py-20"
          data-ocid="case_studies.list.section"
        >
          {isLoading ? (
            <div
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
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
              <h3 className="text-lg sm:text-xl font-display font-semibold leading-tight break-words w-full">
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
              className="grid auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2"
              data-ocid="case_studies.list"
            >
              {studies.map((study, index) => (
                <CaseStudyCard
                  key={study.id.toString()}
                  study={study}
                  index={index}
                  onOpen={setSelectedStudy}
                />
              ))}
            </div>
          )}
        </section>
      </ScrollSectionReveal>

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
      <CaseStudyDialog
        study={selectedStudy}
        open={Boolean(selectedStudy)}
        onOpenChange={(open) => {
          if (!open) setSelectedStudy(null);
        }}
      />
    </div>
  </>
);
}
