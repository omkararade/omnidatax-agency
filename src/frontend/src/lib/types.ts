export interface NavLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: NavLink[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  outcomes: string[];
}

export interface UseCase {
  id: string;
  industry: string;
  title: string;
  description: string;
  metrics: string[];
  icon: string;
}

export interface CaseStudyResult {
  metric: string;
  description: string;
}

export interface CaseStudy {
  id: bigint;
  title: string;
  clientType: string;
  industry: string;
  keyMetric: string;
  keyMetricLabel: string;
  problem: string;
  approach: string;
  tools: string[];
  results: CaseStudyResult[];
  iconName: string;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
}

export interface Metric {
  value: string;
  label: string;
  description: string;
}
