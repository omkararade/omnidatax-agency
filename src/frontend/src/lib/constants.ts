import type {
  BlogPost,
  FooterSection,
  Metric,
  NavLink,
  Service,
  Testimonial,
  UseCase,
} from "./types";

export const COMPANY_NAME = "OmniDataX";
export const COMPANY_TAGLINE = "Automated Data Extraction & AI Analytics";
export const COMPANY_EMAIL = "admin@omnidatax.com";
export const COMPANY_LINKEDIN = "https://linkedin.com";
export const COMPANY_TWITTER = "https://twitter.com";
export const COMPANY_GITHUB = "https://github.com";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Services",
    links: [
      { label: "Web Scraping", href: "/services" },
      { label: "Data Engineering", href: "/services" },
      { label: "AI Analytics", href: "/services" },
      { label: "ETL Pipelines", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Use Cases", href: "/use-cases" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Sample Data", href: "/contact" },
      { label: "Blog", href: "/" },
      { label: "Documentation", href: "/" },
      { label: "FAQ", href: "/contact" },
    ],
  },
];

export const SERVICES: Service[] = [
  {
    id: "data-extraction",
    title: "Data Extraction",
    description:
      "Large-scale web scraping, API integrations, and structured data collection from any source.",
    icon: "Database",
    deliverables: [
      "CSV / JSON exports",
      "Real-time API feeds",
      "Scheduled crawl pipelines",
    ],
    outcomes: [
      "10x faster research cycles",
      "Always-fresh competitive data",
      "Zero manual copy-paste",
    ],
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    description:
      "End-to-end ETL pipelines, data cleaning, transformation, and warehouse-ready delivery.",
    icon: "GitBranch",
    deliverables: [
      "Clean structured datasets",
      "Automated ETL workflows",
      "Data quality reports",
    ],
    outcomes: [
      "90% reduction in data prep time",
      "Reliable, audit-ready data",
      "Scales to billions of rows",
    ],
  },
  {
    id: "ai-analytics",
    title: "AI Automations & Agents",
    description:
      "End-to-end AI automation workflows, autonomous agents, and LLM-powered pipelines that run without human intervention.",
    icon: "TrendingUp",
    deliverables: [
      "AI Automation Workflows",
      "AI Agent deployments",
      "LLM-powered pipelines",
    ],
    outcomes: [
      "Fully automated decision-making",
      "AI-driven insights at scale",
      "24/7 agent runtime, zero manual work",
    ],
  },
];

export const USE_CASES: UseCase[] = [
  {
    id: "ecommerce",
    industry: "E-Commerce",
    title: "E-Commerce Analytics",
    description:
      "Track competitor pricing, monitor product availability, and analyze Shopify & Amazon marketplace dynamics in real time.",
    metrics: [
      "50K+ SKUs monitored daily",
      "15% average margin improvement",
      "Real-time price alerts",
    ],
    icon: "ShoppingCart",
  },
  {
    id: "competitor-intel",
    industry: "Competitive Intel",
    title: "Competitor Intelligence",
    description:
      "Aggregate competitor content, pricing strategies, job postings, and product launches into a unified intelligence feed.",
    metrics: [
      "100+ competitor sources",
      "Daily automated digests",
      "Trend detection in <24h",
    ],
    icon: "Eye",
  },
  {
    id: "market-research",
    industry: "Market Research",
    title: "Market Research Automation",
    description:
      "Replace weeks of manual data collection with automated pipelines that deliver structured market datasets on demand.",
    metrics: [
      "10x faster research cycles",
      "95% data accuracy rate",
      "Custom segment breakdowns",
    ],
    icon: "BarChart2",
  },
  {
    id: "saas",
    industry: "SaaS",
    title: "SaaS Product Intelligence",
    description:
      "Scrape review platforms, forums, and social channels to understand user sentiment and feature demand across your category.",
    metrics: [
      "G2 + Capterra + Reddit",
      "Sentiment scoring",
      "Feature gap analysis",
    ],
    icon: "Layers",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr Arthur Krebbers",
    role: "Client",
    company: "",
    quote:
      "I just wanted to say thank you again for your work on the project. I really appreciated your persistence, professionalism, and the way you handled the technical details — it made a clear difference to the final result. It's also very helpful to understand the broader range of your skills and experience. I may well be in touch again as things develop on my side and new needs come up.",
  },
  {
    id: "t2",
    name: "Mariano Atares",
    role: "Client",
    company: "",
    quote:
      "OmniDataX delivered an impressive solution in a short time. They created a high-speed data pipeline pulling from 15+ websites and built an AI agent capable of generating stock buy/sell insights within 3 weeks. Highly efficient and technically strong.",
  },
  {
    id: "t3",
    name: "Alex Williams",
    role: "Client",
    company: "",
    quote:
      "Brilliant work and very thorough. Omkar is also a good person to deal with, and I would thoroughly recommend him.",
  },
  {
    id: "t4",
    name: "Schajan Abbas",
    role: "Client",
    company: "",
    quote:
      "Omkar is very engaging and working pro-actively on solutions - very good and smooth communication around the project with a can-do attitude.",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "bp1",
    title: "How to Build a Real-Time Price Tracker for E-Commerce in 2025",
    excerpt:
      "A practical guide to scraping, normalizing, and alerting on competitor pricing changes across major retail platforms.",
    date: "Apr 18, 2025",
    readTime: "8 min read",
    category: "Web Scraping",
    slug: "real-time-price-tracker-2025",
  },
  {
    id: "bp2",
    title:
      "ETL vs ELT: Which Pipeline Architecture is Right for Your Data Team?",
    excerpt:
      "We compare traditional ETL vs modern ELT approaches for growing data teams, with real-world performance benchmarks.",
    date: "Apr 10, 2025",
    readTime: "6 min read",
    category: "Data Engineering",
    slug: "etl-vs-elt-pipeline-architecture",
  },
  {
    id: "bp3",
    title: "Using GPT-4 for Competitive Intelligence: What Works, What Doesn't",
    excerpt:
      "After deploying LLMs across 20+ data projects, here's our honest breakdown of where AI accelerates research vs. where it hallucinates.",
    date: "Apr 3, 2025",
    readTime: "10 min read",
    category: "AI & Analytics",
    slug: "gpt4-competitive-intelligence",
  },
];

export const METRICS: Metric[] = [
  {
    value: "2.4B+",
    label: "Records Scraped",
    description: "Structured data delivered to clients",
  },
  {
    value: "98.7%",
    label: "Data Accuracy",
    description: "Across all pipeline outputs",
  },
  {
    value: "10x",
    label: "Faster Research",
    description: "vs. manual data collection",
  },
  {
    value: "60+",
    label: "Projects Delivered",
    description: "Across 12 industries",
  },
];
