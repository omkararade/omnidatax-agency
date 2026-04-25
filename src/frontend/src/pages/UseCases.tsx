import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Clock,
  Eye,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Use Case Data ──────────────────────────────────────────────────────────

const USE_CASES_DETAIL = [
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce Analytics",
    industry: "Shopify & Amazon Sellers",
    badge: "E-Commerce",
    gradientClass: "from-red-900/50 to-orange-950/20",
    borderAccent: "border-red-700/40",
    iconBg: "bg-red-500/10",
    problem:
      "You're losing margin to competitors who reprice 4× a day while your team manually checks 200 SKUs twice a week.",
    solution:
      "Automated price monitoring across unlimited SKUs, competitors, and marketplaces — delivered as live dashboards, alerts, and structured datasets.",
    audience: [
      "Shopify brands",
      "Amazon FBA sellers",
      "Multi-channel retailers",
    ],
    outcomes: [
      "Track 50K+ SKUs in real time",
      "15–20% average margin improvement",
      "Eliminate 12+ hours of manual research weekly",
      "Repricing decisions made in under 1 hour",
    ],
  },
  {
    id: "competitor-intel",
    icon: Eye,
    title: "Competitor Intelligence",
    industry: "SaaS & Tech Companies",
    badge: "Competitive Intel",
    gradientClass: "from-slate-800/70 to-card/80",
    borderAccent: "border-border",
    iconBg: "bg-primary/10",
    problem:
      "Your analysts spend 80% of their time collecting data instead of generating insights. Competitor moves go undetected for weeks.",
    solution:
      "Aggregate competitor content, pricing changes, job postings, and product launches across 100+ sources into a single daily intelligence feed.",
    audience: ["SaaS product teams", "GTM & strategy teams", "Market analysts"],
    outcomes: [
      "Monitor 100+ competitor sources automatically",
      "Daily digests delivered to Slack or email",
      "Detect product launches & pricing changes in <24h",
      "Free analysts for high-value strategic work",
    ],
  },
  {
    id: "market-research",
    icon: BarChart2,
    title: "Market Research Automation",
    industry: "Research Firms & Startups",
    badge: "Market Research",
    gradientClass: "from-red-950/40 to-background",
    borderAccent: "border-red-800/30",
    iconBg: "bg-red-500/10",
    problem:
      "Manual data collection takes weeks and introduces human error. Your research budget gets consumed before insights are even surfaced.",
    solution:
      "Custom automated pipelines that collect, clean, and structure market datasets on demand — across any geography, segment, or data source.",
    audience: [
      "Market research firms",
      "Startups validating ideas",
      "Investment analysts",
    ],
    outcomes: [
      "10× faster research cycle vs. manual collection",
      "95%+ data accuracy with automated QA",
      "Custom segment breakdowns & taxonomies",
      "Repeatable pipelines — run monthly on-demand",
    ],
  },
];

// ─── Industry Stats ──────────────────────────────────────────────────────────

const INDUSTRY_STATS = [
  {
    icon: TrendingUp,
    value: "73%",
    label: "of businesses cite data gaps as their #1 competitive disadvantage",
    source: "McKinsey Global Survey, 2024",
  },
  {
    icon: Clock,
    value: "30+ hrs",
    label: "per week lost to manual data collection per analyst on average",
    source: "Forrester Data Ops Report",
  },
  {
    icon: Zap,
    value: "8–12×",
    label: "ROI on automated data infrastructure within the first 6 months",
    source: "DataIQ Industry Benchmark",
  },
];

// ─── Use Case Card ─────────────────────────────────────────────────────────

function UseCaseCard({
  useCase,
  index,
}: {
  useCase: (typeof USE_CASES_DETAIL)[0];
  index: number;
}) {
  const Icon = useCase.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.12,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`use-cases.card.${index + 1}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-smooth hover:-translate-y-2 hover:shadow-elevated"
    >
      {/* Gradient header */}
      <div
        className={`relative h-40 bg-gradient-to-br ${useCase.gradientClass} flex items-end p-6 border-b ${useCase.borderAccent}`}
      >
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 20px,currentColor 20px,currentColor 21px),repeating-linear-gradient(90deg,transparent,transparent 20px,currentColor 20px,currentColor 21px)",
          }}
        />
        <div className="relative flex items-end gap-4 w-full">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-xl ${useCase.iconBg} border border-primary/20 shadow-elevated`}
          >
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-[10px] font-semibold uppercase tracking-widest mb-1"
            >
              {useCase.badge}
            </Badge>
            <p className="text-xs text-muted-foreground truncate">
              {useCase.industry}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        <h3 className="font-display text-2xl font-bold text-foreground leading-tight">
          {useCase.title}
        </h3>

        {/* Audience */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Who it's for
          </p>
          <div className="flex flex-wrap gap-1.5">
            {useCase.audience.map((a) => (
              <span
                key={a}
                className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
              >
                {a}
              </span>
            ))}
          </div>
        </div>

        {/* Problem */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
            The Problem
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {useCase.problem}
          </p>
        </div>

        {/* Solution */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
            Our Approach
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {useCase.solution}
          </p>
        </div>

        {/* Outcomes */}
        <div className="flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            Business Outcomes
          </p>
          <ul className="space-y-1.5">
            {useCase.outcomes.map((o) => (
              <li
                key={o}
                className="flex items-start gap-2 text-sm text-foreground/80"
              >
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <Link
          to="/case-studies"
          data-ocid={`use-cases.case-study-link.${index + 1}`}
        >
          <Button
            variant="outline"
            className="w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth group/btn mt-1"
          >
            See Case Study
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  stat,
  index,
}: {
  stat: (typeof INDUSTRY_STATS)[0];
  index: number;
}) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      data-ocid={`use-cases.stat.${index + 1}`}
      className="flex flex-col gap-3 p-7 rounded-xl border border-border bg-card/60 backdrop-blur-sm"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="font-display text-4xl font-black text-primary leading-none">
        {stat.value}
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{stat.label}</p>
      <p className="text-[11px] text-muted-foreground">{stat.source}</p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function UseCasesPage() {
  return (
    <div data-ocid="use-cases.page" className="bg-background text-foreground">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        data-ocid="use-cases.hero.section"
        className="relative overflow-hidden border-b border-border bg-card"
      >
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-gradient-to-tl from-red-900/10 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs font-semibold uppercase tracking-widest mb-6"
            >
              Real-World Applications
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="font-display text-4xl md:text-6xl font-black leading-[1.05] tracking-tight mb-5"
          >
            <span className="gradient-headline">Use Cases That</span>
            <br />
            <span className="text-foreground">Drive Real Revenue</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Every pipeline we build solves a specific business problem. Explore
            how companies in e-commerce, SaaS, and research use data automation
            to outpace the competition.
          </motion.p>
        </div>
      </section>

      {/* ── Use Case Cards ────────────────────────────────────────────────── */}
      <section
        data-ocid="use-cases.cards.section"
        className="max-w-7xl mx-auto px-6 py-20 md:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Three Industries. One Platform.
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Specialized pipelines built for the data challenges your industry
            actually faces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {USE_CASES_DETAIL.map((uc, i) => (
            <UseCaseCard key={uc.id} useCase={uc} index={i} />
          ))}
        </div>
      </section>

      {/* ── Industry Stats ─────────────────────────────────────────────────── */}
      <section
        data-ocid="use-cases.stats.section"
        className="bg-muted/30 border-y border-border"
      >
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              The Cost of Manual Data Work
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Industry research confirms what our clients already knew —
              automation isn't optional, it's a competitive moat.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {INDUSTRY_STATS.map((stat, i) => (
              <StatCard key={stat.value} stat={stat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section
        data-ocid="use-cases.cta.section"
        className="relative overflow-hidden bg-card border-b border-border"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-80 h-52 bg-gradient-to-tr from-red-900/10 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-5">
              Your Industry is Next
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-black leading-[1.1] text-foreground mb-5">
              Let's Build Your Custom
              <br />
              <span className="gradient-headline">Data Pipeline</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Whether you're tracking 10 competitors or ingesting 10 million
              records a day, we architect pipelines that scale with your
              ambition.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" data-ocid="use-cases.cta.primary_button">
                <Button
                  size="lg"
                  className="button-primary h-12 px-8 font-semibold text-base gap-2"
                >
                  Start Your Data Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link
                to="/case-studies"
                data-ocid="use-cases.cta.secondary_button"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 font-semibold text-base border-border text-foreground hover:bg-muted transition-smooth"
                >
                  View Case Studies
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
