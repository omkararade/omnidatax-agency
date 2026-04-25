import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { METRICS } from "@/lib/constants";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CheckCircle,
  DollarSign,
  ShieldCheck,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const teamValues = [
  {
    icon: Zap,
    label: "Speed",
    description:
      "First deliverable in 5–7 days. No slow-rolling discovery phases.",
  },
  {
    icon: Target,
    label: "Precision",
    description:
      "99.9% data accuracy. Every pipeline ships with a quality report.",
  },
  {
    icon: TrendingUp,
    label: "Scale",
    description:
      "From 10K records to 10 billion — architecture that grows with you.",
  },
  {
    icon: DollarSign,
    label: "ROI-Focus",
    description:
      "Every pipeline exists to drive a business decision, not just store data.",
  },
];

const pillars = [
  {
    icon: Bot,
    title: "Automation First",
    description:
      "We automate before we ever touch anything manually. If a human is doing repetitive data work, that's a pipeline we haven't built yet. Our default is always: can a machine do this?",
    stat: "100%",
    statLabel: "of pipelines are fully automated",
  },
  {
    icon: ShieldCheck,
    title: "Data Quality",
    description:
      "We don't ship messy data. Every deliverable includes schema validation, deduplication, and a quality report with accuracy metrics. Our clients make board-level decisions from our outputs.",
    stat: "99.9%",
    statLabel: "accuracy guarantee across all pipelines",
  },
  {
    icon: CheckCircle,
    title: "Business Focus",
    description:
      "We don't measure success in records scraped or pipelines deployed. We measure it in decisions enabled. Every project starts with one question: what business outcome does this data need to drive?",
    stat: "3.4×",
    statLabel: "average ROI reported by clients in year 1",
  },
];

const team = [
  {
    name: "Omkar Arade",
    role: "Founder & Lead Data Scientist",
    bio: "6+ years of experience in data science, AI automation, and end-to-end data pipeline architecture. Passionate about turning raw data into actionable business intelligence.",
    image: "/assets/images/omkar.jpeg",
  },
  {
    name: "Bommidi Nagaveni",
    role: "Chief Operating Officer",
    bio: "6+ years driving operational excellence and client success. Ensures every project is delivered on time, on budget, and beyond expectations.",
    image: "/assets/images/nagaveni.jpg",
  },
  {
    name: "Sivakumar Santosh Bhogi",
    role: "Head of AI and Analytics",
    bio: "6+ years building cutting-edge AI systems, machine learning models, and analytics platforms that power data-driven decisions.",
    image: "/assets/images/sivakumar.png",
  },
];

export function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section
        className="py-20 bg-card border-b border-border"
        data-ocid="about.header.section"
      >
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/10 mb-5 text-xs font-mono tracking-wider"
            >
              ABOUT OMNIDATAX
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Automation-First.
              <br />
              <span className="text-primary">Data That Drives Decisions.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              OmniDataX is a specialized data company with one mission: replace
              manual, error-prone data work with automated pipelines that
              deliver clean, structured intelligence — fast enough to compete,
              accurate enough to trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section
        className="py-14 bg-background border-b border-border"
        data-ocid="about.metrics.section"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`about.metrics.item.${i + 1}`}
              >
                <div className="font-display text-3xl font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-0.5">
                  {metric.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section
        className="py-20 bg-muted/20 border-b border-border"
        data-ocid="about.story.section"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              We Founded OmniDataX to Solve Data Chaos
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Too many smart teams were spending most of their time collecting
                and cleaning data instead of acting on it. A growth team was
                manually checking competitor prices. A research firm was
                copy-pasting from 40 websites into spreadsheets. A SaaS product
                team had no system for listening to users at scale.
              </p>
              <p>
                We started solving these problems one by one — and something
                became obvious fast: the same patterns kept repeating. The
                problems were different, but the fix was always the same. Better
                pipelines, cleaner data, faster delivery.
              </p>
              <p>
                So we built OmniDataX as a focused practice. One team, deeply
                specialized in data collection, transformation, and analytics.
                We don't try to be a full-service consultancy or BI firm. We're
                the team you call when you need data infrastructure that
                actually works — and delivers business results you can measure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Three Value Pillars */}
      <section
        className="py-20 bg-background border-b border-border"
        data-ocid="about.pillars.section"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              What We Stand For
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three principles that define every project we take on.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  className="bg-card border border-border rounded-xl p-7 flex flex-col hover:border-primary/30 transition-smooth"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  data-ocid={`about.pillars.item.${i + 1}`}
                >
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
                    {pillar.description}
                  </p>
                  <div className="border-t border-border pt-5">
                    <div className="font-display text-2xl font-bold text-primary">
                      {pillar.stat}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {pillar.statLabel}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section
        className="py-20 bg-muted/20 border-b border-border"
        data-ocid="about.values.section"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              How We Work
            </h2>
            <p className="text-muted-foreground">
              The principles we don't negotiate on.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {teamValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.label}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-smooth"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  data-ocid={`about.values.item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-display text-base font-bold text-foreground mb-2">
                    {v.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="py-20 bg-background border-b border-border"
        data-ocid="about.team.section"
      >
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              The Team
            </h2>
            <p className="text-muted-foreground">
              Specialists, not generalists.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="bg-card border border-border rounded-xl p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-ocid={`about.team.item.${i + 1}`}
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover ring-2 ring-primary/30 border-2 border-white/10"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div
                    className="w-24 h-24 rounded-full bg-primary/20 border border-primary/30 items-center justify-center font-display font-bold text-primary text-2xl"
                    style={{ display: "none" }}
                  >
                    {member.name.charAt(0)}
                  </div>
                </div>
                <h3 className="font-display text-base font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="text-xs text-primary mb-2">{member.role}</p>
                <span className="inline-block text-[10px] font-mono font-semibold tracking-wider text-primary/80 bg-primary/10 border border-primary/20 rounded px-2 py-0.5 mb-3">
                  6+ Years Experience
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card" data-ocid="about.cta.section">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tell us about your data challenge. We'll respond within 24 hours
              with a clear plan and honest assessment of what's possible.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              data-ocid="about.cta.primary_button"
            >
              <Link to="/contact">
                Work With Us <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
