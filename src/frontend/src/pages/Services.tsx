import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  GitBranch,
  MessageSquare,
  Package,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ── Types ────────────────────────────────────────────────────────────────────
interface ServiceCategory {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  features: string[];
  deliverables: { label: string; icon: React.ReactNode }[];
  outcomes: { value: string; label: string }[];
  borderClass: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TechItem {
  name: string;
  category: string;
  icon: string;
}

// ── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "data-extraction",
    icon: <Database className="w-8 h-8" />,
    badge: "Foundation Layer",
    title: "Data Extraction",
    description:
      "Large-scale web scraping, API integrations, and structured data collection from any source on the web — at any scale, without disruption.",
    features: [
      "Custom web crawlers built for your targets",
      "Multi-source API aggregation & normalization",
      "Anti-bot bypass with proxy rotation",
      "Scheduled & real-time crawl pipelines",
    ],
    deliverables: [
      { label: "CSV / JSON Exports", icon: <Package className="w-4 h-4" /> },
      { label: "Real-time API Feeds", icon: <Zap className="w-4 h-4" /> },
      { label: "Scheduled Pipelines", icon: <GitBranch className="w-4 h-4" /> },
    ],
    outcomes: [
      { value: "10x", label: "Faster Research" },
      { value: "50K+", label: "SKUs/day" },
      { value: "0h", label: "Manual Work" },
    ],
    borderClass: "border-primary/40 hover:border-primary/80",
  },
  {
    id: "data-engineering",
    icon: <GitBranch className="w-8 h-8" />,
    badge: "Processing Layer",
    title: "Data Engineering",
    description:
      "End-to-end ETL pipelines, automated data cleaning, transformation logic, and warehouse-ready delivery that scales to billions of rows.",
    features: [
      "ETL / ELT pipeline design & implementation",
      "Data deduplication, normalization & enrichment",
      "Cloud warehouse integration (BigQuery, Snowflake)",
      "Data quality monitoring & alerting",
    ],
    deliverables: [
      {
        label: "Clean Structured Data",
        icon: <Database className="w-4 h-4" />,
      },
      { label: "Automated ETL Jobs", icon: <Zap className="w-4 h-4" /> },
      { label: "Quality Reports", icon: <BarChart2 className="w-4 h-4" /> },
    ],
    outcomes: [
      { value: "90%", label: "Less Prep Time" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "Bn+", label: "Rows Handled" },
    ],
    borderClass: "border-border hover:border-primary/60",
  },
  {
    id: "ai-analytics",
    icon: <TrendingUp className="w-8 h-8" />,
    badge: "Intelligence Layer",
    title: "AI Automations & Agents",
    description:
      "End-to-end AI automation workflows, autonomous agents, and LLM-powered pipelines — turning raw data into real-time decisions and automated actions that run without human intervention.",
    features: [
      "AI Automation Workflows (end-to-end, no-touch)",
      "AI Agents for data collection, analysis & decisions",
      "LLM-powered pipelines (GPT-4, Claude, custom fine-tunes)",
      "Interactive dashboards & demand forecasting models",
    ],
    deliverables: [
      {
        label: "AI Agent Deployments",
        icon: <Cpu className="w-4 h-4" />,
      },
      { label: "LLM Pipelines", icon: <TrendingUp className="w-4 h-4" /> },
      {
        label: "Automated Dashboards",
        icon: <BarChart2 className="w-4 h-4" />,
      },
    ],
    outcomes: [
      { value: "100%", label: "Automated Decisions" },
      { value: "93%", label: "Agent Accuracy" },
      { value: "24/7", label: "AI Runtime" },
    ],
    borderClass: "border-border hover:border-primary/60",
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Define Scope",
    description:
      "We audit your data needs, map sources, and produce a project spec with timelines and deliverable formats.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    step: "02",
    title: "Extract Data",
    description:
      "Custom crawlers and API integrations collect structured data from every required source at scale.",
    icon: <Database className="w-6 h-6" />,
  },
  {
    step: "03",
    title: "Process & Clean",
    description:
      "Raw data flows through automated ETL pipelines — deduplicated, normalized, enriched, and validated.",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    step: "04",
    title: "Deliver Insights",
    description:
      "Clean datasets, dashboards, and AI-driven reports delivered to your team — on schedule, every time.",
    icon: <BarChart2 className="w-6 h-6" />,
  },
];

const TECH_STACK: TechItem[] = [
  { name: "Python", category: "Core", icon: "🐍" },
  { name: "Scrapy", category: "Extraction", icon: "🕷️" },
  { name: "Selenium", category: "Extraction", icon: "🌐" },
  { name: "Pandas", category: "Processing", icon: "🐼" },
  { name: "Apache Airflow", category: "Orchestration", icon: "🌬️" },
  { name: "BigQuery", category: "Warehouse", icon: "📊" },
  { name: "TensorFlow", category: "AI/ML", icon: "🤖" },
  { name: "dbt", category: "Transform", icon: "🔧" },
];

const SECONDARY_TECH = [
  "OpenAI GPT-4",
  "HuggingFace",
  "PostgreSQL",
  "MongoDB",
  "Snowflake",
  "FastAPI",
  "Airtable",
  "Slack API",
];

const WHY_US = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Built for Your Data",
    body: "Every pipeline is custom-engineered for your specific sources, formats, and downstream systems — not a template.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Speed Without Sacrifice",
    body: "We ship production-ready pipelines in 2–4 weeks. Fast delivery without cutting corners on data quality.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Business Context First",
    body: "We speak your language, not just code. Every deliverable is mapped to a measurable business outcome.",
  },
];

// ── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

// ── ServiceCard ──────────────────────────────────────────────────────────────
function ServiceCard({ svc, index }: { svc: ServiceCategory; index: number }) {
  return (
    <motion.div
      data-ocid={`services.${svc.id}.card`}
      className={`relative rounded-2xl border bg-card p-8 flex flex-col gap-6 transition-smooth overflow-hidden group ${svc.borderClass}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      {/* Hover glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
          {svc.icon}
        </div>
        <Badge
          variant="secondary"
          className="text-xs font-mono tracking-wide shrink-0 bg-muted text-muted-foreground"
        >
          {svc.badge}
        </Badge>
      </div>

      {/* Title & Description */}
      <div>
        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
          {svc.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {svc.description}
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5">
        {svc.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-sm text-foreground/80"
          >
            <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border" />

      {/* Deliverables */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 font-mono">
          Deliverables
        </p>
        <div className="flex flex-wrap gap-2">
          {svc.deliverables.map((d) => (
            <span
              key={d.label}
              className="flex items-center gap-1.5 text-xs bg-muted text-foreground/80 border border-border rounded-full px-3 py-1.5"
            >
              {d.icon}
              {d.label}
            </span>
          ))}
        </div>
      </div>

      {/* Outcomes */}
      <div className="grid grid-cols-3 gap-3">
        {svc.outcomes.map((o) => (
          <div
            key={o.label}
            className="text-center py-3 rounded-lg bg-muted/50 border border-border"
          >
            <p className="text-lg font-display font-bold text-primary">
              {o.value}
            </p>
            <p className="text-xs text-muted-foreground leading-tight mt-0.5">
              {o.label}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <Button
        data-ocid={`services.${svc.id}.cta_button`}
        asChild
        className="mt-auto w-full group/btn"
        variant="outline"
      >
        <Link to="/contact">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-smooth" />
        </Link>
      </Button>
    </motion.div>
  );
}

// ── ProcessStepCard ──────────────────────────────────────────────────────────
function ProcessStepCard({
  step,
  index,
}: { step: ProcessStep; index: number }) {
  return (
    <motion.div
      data-ocid={`services.process.item.${index + 1}`}
      className="relative flex flex-col items-center text-center gap-4"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index}
    >
      {/* Connector line (desktop) */}
      {index < PROCESS_STEPS.length - 1 && (
        <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-gradient-to-r from-border via-border/40 to-transparent z-0" />
      )}

      {/* Icon container */}
      <div className="relative z-10 w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center group hover:border-primary/50 hover:bg-primary/5 transition-smooth">
        <div className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold font-mono shadow-md">
          {step.step.slice(-1)}
        </div>
        <div className="text-primary">{step.icon}</div>
      </div>

      <div>
        <h4 className="font-display font-semibold text-foreground mb-1.5">
          {step.title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-[180px] mx-auto">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export function ServicesPage() {
  return (
    <div className="flex flex-col" data-ocid="services.page">
      {/* ── Hero ── */}
      <section className="relative bg-card border-b border-border overflow-hidden py-24 px-4 pt-32">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Badge
              variant="outline"
              className="mb-6 font-mono tracking-wider text-xs border-primary/30 text-primary bg-primary/8"
            >
              What We Build
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Data Infrastructure
            <br />
            <span className="gradient-headline">From Source to Insight</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Three interconnected service layers — extraction, engineering, and
            intelligence — that work together to turn the web's raw data into
            your competitive advantage.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Button
              data-ocid="services.hero.primary_button"
              asChild
              size="lg"
              className="font-semibold"
            >
              <Link to="/contact">
                Start a Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button
              data-ocid="services.hero.secondary_button"
              asChild
              size="lg"
              variant="outline"
            >
              <Link to="/case-studies">View Case Studies</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── Service Cards ── */}
      <section
        className="bg-background py-24 px-4"
        data-ocid="services.categories.section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 font-mono">
              Service Categories
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Three Layers of Data Mastery
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        className="bg-muted/30 border-y border-border py-24 px-4"
        data-ocid="services.process.section"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 font-mono">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Our 4-Step Delivery Process
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              From initial scoping call to deployed pipelines — a repeatable
              process that delivers clean, trusted data on time.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
            {PROCESS_STEPS.map((step, i) => (
              <ProcessStepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section
        className="bg-background py-24 px-4"
        data-ocid="services.techstack.section"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 font-mono">
              Technology Stack
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Battle-Tested Tools
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              We use the industry-standard, production-proven stack — not
              experiments.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TECH_STACK.map((tech, i) => (
              <motion.div
                key={tech.name}
                data-ocid={`services.tech.item.${i + 1}`}
                className="flex flex-col items-center gap-3 p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-default"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover={{ y: -2, transition: { duration: 0.15 } }}
              >
                <span className="text-3xl" role="img" aria-label={tech.name}>
                  {tech.icon}
                </span>
                <div className="text-center">
                  <p className="font-display font-semibold text-sm text-foreground">
                    {tech.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {tech.category}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={8}
          >
            {SECONDARY_TECH.map((t) => (
              <span
                key={t}
                className="text-xs font-mono text-muted-foreground border border-border rounded-full px-3 py-1.5 bg-muted/50"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why OmniDataX ── */}
      <section
        className="bg-muted/30 border-y border-border py-24 px-4"
        data-ocid="services.whyus.section"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3 font-mono">
              Why OmniDataX
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Not a Freelancer. Not a Black-Box SaaS.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {WHY_US.map((item, i) => (
              <motion.div
                key={item.title}
                data-ocid={`services.whyus.item.${i + 1}`}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-smooth"
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit mb-4 border border-primary/20">
                  {item.icon}
                </div>
                <h4 className="font-display font-semibold text-foreground mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="relative bg-card border-b border-border py-24 px-4 overflow-hidden"
        data-ocid="services.cta.section"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 right-0 w-[500px] h-[350px] bg-primary/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Badge
              variant="outline"
              className="mb-6 font-mono text-xs border-primary/30 text-primary"
            >
              Let's Build Together
            </Badge>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            Not sure which service
            <br />
            <span className="gradient-headline">you need? Let's talk.</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground mb-10 text-lg max-w-xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            Describe your data challenge in plain English — we'll scope the
            right solution, estimate timelines, and send you a sample dataset
            before you commit.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
          >
            <Button
              data-ocid="services.cta.primary_button"
              asChild
              size="lg"
              className="font-semibold text-base px-8 group"
            >
              <Link to="/contact">
                Start Your Data Project
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
            <Button
              data-ocid="services.cta.secondary_button"
              asChild
              size="lg"
              variant="outline"
              className="font-semibold text-base px-8"
            >
              <Link to="/contact">Get a Free Sample Dataset</Link>
            </Button>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            {[
              "No commitment required",
              "Sample data in 48h",
              "Fixed-price scoping",
            ].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                {t}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
