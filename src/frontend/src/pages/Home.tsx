import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Hero3D } from "@/components/Hero3D";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS, SERVICES, USE_CASES } from "@/lib/constants";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Database,
  Eye,
  GitBranch,
  Layers,
  Play,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

type IconComponent = React.ComponentType<{ className?: string }>;

const serviceIcons: Record<string, IconComponent> = {
  Database,
  GitBranch,
  TrendingUp,
};

const useCaseIcons: Record<string, IconComponent> = {
  ShoppingCart,
  Eye,
  BarChart2,
  Layers,
};

const METRICS_DATA = [
  {
    value: 10,
    suffix: "M+",
    label: "Records Scraped",
    description: "Structured data delivered to clients",
  },
  {
    value: 500,
    suffix: "+",
    label: "Automations Built",
    description: "End-to-end pipelines deployed",
  },
  {
    value: 99,
    suffix: ".9%",
    label: "Uptime SLA",
    description: "Across all production pipelines",
  },
  {
    value: 50,
    suffix: "+",
    label: "Projects Delivered",
    description: "Across 12 industries",
  },
  {
    value: 3,
    suffix: "x",
    label: "Average ROI",
    description: "Measured across client portfolios",
  },
];

export function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <MetricsBannerSection />
      <ServicesSection />
      <UseCasesSection />
      <TestimonialsSection />
      <BlogSection />
      <CtaSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      data-ocid="hero.section"
    >
      {/* Background image layer */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-data-network.dim_1600x800.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Red glow orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/6 blur-[140px] z-0 pointer-events-none" />

      {/* Two-column layout: text left, 3D right */}
      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center max-w-7xl">
        {/* Left: headline + CTAs */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <Badge
              variant="outline"
              className="mb-6 border-primary/40 text-primary bg-primary/10 px-3 py-1 text-xs font-mono tracking-wider"
            >
              AUTOMATION-FIRST DATA AGENCY
            </Badge>
          </motion.div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-[3.6rem] xl:text-[4rem] font-bold leading-[1.07] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            <span className="gradient-headline">Automated Data</span>
            <br />
            <span className="gradient-headline">Extraction</span>
            <span className="text-foreground"> &amp; AI</span>
            <br />
            <span className="text-foreground">Analytics for</span>
            <br />
            <span className="text-primary">Smarter Decisions</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            We build custom web scraping pipelines, ETL infrastructure, and
            AI-powered analytics dashboards that give e-commerce brands, SaaS
            companies, and research firms the data edge they need to win.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.26 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-8 shadow-elevated group"
              data-ocid="hero.get_sample_data.primary_button"
            >
              <Link to="/contact">
                Get Sample Data{" "}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border text-foreground hover:bg-muted/50 font-semibold text-base px-8"
              data-ocid="hero.book_call.secondary_button"
            >
              <Link to="/contact">
                <Play className="w-4 h-4 mr-2 fill-current" /> Book a Call
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.42 }}
          >
            {[
              "No long-term contracts",
              "Delivery in 1–2 weeks",
              "Free data sample",
            ].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Globe */}
        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          {/* Subtle background glow behind 3D canvas */}
          <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
          <div
            className="relative w-full"
            style={{ height: "520px" }}
            aria-hidden="true"
          >
            <Hero3D />
          </div>

          {/* Floating data-snippet cards for depth */}
          <motion.div
            className="absolute top-12 -left-6 bg-card/90 backdrop-blur border border-border rounded-xl p-3 shadow-elevated text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <span className="text-primary">scraped</span>{" "}
            <span className="text-foreground font-semibold">10M+</span> records
            <br />
            <span className="text-muted-foreground/60 text-[10px]">
              last pipeline run · 2s ago
            </span>
          </motion.div>

          <motion.div
            className="absolute bottom-16 -right-4 bg-card/90 backdrop-blur border border-border rounded-xl p-3 shadow-elevated text-xs font-mono text-muted-foreground"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <span className="text-primary">accuracy</span>{" "}
            <span className="text-foreground font-semibold">98.7%</span>
            <br />
            <span className="text-muted-foreground/60 text-[10px]">
              model validation · live
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricsBannerSection() {
  return (
    <section
      className="bg-card border-y border-border py-20"
      data-ocid="metrics.section"
    >
      <div className="container mx-auto px-6">
        <motion.p
          className="text-center text-xs font-mono tracking-widest text-muted-foreground mb-12 uppercase"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Proven results across 60+ data projects
        </motion.p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {METRICS_DATA.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              data-ocid={`metrics.item.${i + 1}`}
            >
              <AnimatedCounter
                value={m.value}
                suffix={m.suffix}
                label={m.label}
                description={m.description}
                duration={1600}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-28 bg-background" data-ocid="services.section">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/8 mb-4 text-xs font-mono tracking-wider"
          >
            WHAT WE BUILD
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Three Core Services
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From raw data collection to business-ready intelligence — we own the
            full stack.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon: IconComponent = serviceIcons[service.icon] ?? Database;
            return (
              <motion.div
                key={service.id}
                className="relative bg-card border border-border rounded-2xl p-8 hover:border-primary/30 hover:shadow-elevated transition-smooth group overflow-hidden"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-primary/4 blur-3xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />

                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-smooth">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                      Deliverables
                    </p>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      Outcomes
                    </p>
                    <ul className="space-y-1.5">
                      {service.outcomes.map((o) => (
                        <li
                          key={o}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary/40 hover:bg-primary/5"
            data-ocid="services.view_all.button"
          >
            <Link to="/services">
              View All Services <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section
      className="py-28 bg-muted/20 border-y border-border"
      data-ocid="use_cases.section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="border-primary/30 text-primary bg-primary/8 mb-4 text-xs font-mono tracking-wider"
          >
            USE CASES
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Built for Your Industry
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real applications across the verticals that rely on data to compete.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {USE_CASES.map((uc, i) => {
            const Icon: IconComponent = useCaseIcons[uc.icon] ?? BarChart2;
            return (
              <motion.div
                key={uc.id}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-elevated transition-smooth group"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`use_cases.item.${i + 1}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <Badge className="mb-3 bg-primary/10 text-primary border-0 text-xs">
                  {uc.industry}
                </Badge>
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {uc.description}
                </p>
                <ul className="space-y-1.5">
                  {uc.metrics.map((m) => (
                    <li
                      key={m}
                      className="text-xs text-muted-foreground flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary/40 hover:bg-primary/5"
            data-ocid="use_cases.view_all.button"
          >
            <Link to="/use-cases">
              Explore All Use Cases <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function BlogSection() {
  return (
    <section
      className="py-28 bg-muted/20 border-y border-border"
      data-ocid="blog.section"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/8 mb-4 text-xs font-mono tracking-wider"
            >
              INSIGHTS
            </Badge>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Latest from the Blog
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary/40 w-fit"
            data-ocid="blog.view_all.button"
          >
            <Link to="/">
              View All Posts <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={post.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 hover:shadow-elevated transition-smooth group"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              data-ocid={`blog.item.${i + 1}`}
            >
              <div className="p-6 flex flex-col gap-4 h-full">
                <Badge className="bg-primary/10 text-primary border-0 text-xs w-fit">
                  {post.category}
                </Badge>
                <h3 className="font-display text-base font-bold text-foreground leading-snug group-hover:text-primary transition-smooth">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="py-28 relative overflow-hidden" data-ocid="cta.section">
      {/* Red gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/8 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="border-primary/40 text-primary bg-primary/10 mb-6 text-xs font-mono tracking-wider"
          >
            GET STARTED TODAY
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Ready to Automate Your
            <br />
            <span className="text-primary">Data Workflow?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            Get a free sample dataset from your target market or book a
            30-minute strategy call. No pressure, no long pitches — just data.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base px-10 shadow-elevated group"
              data-ocid="cta.start_project.primary_button"
            >
              <Link to="/contact">
                Start Your Project{" "}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border hover:border-primary/40 text-foreground font-semibold text-base px-10"
              data-ocid="cta.book_call.secondary_button"
            >
              <Link to="/contact">Book a Call</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
