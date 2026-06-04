import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Variant = "data-nodes" | "pipeline" | "stream" | "default";

interface ScrollSectionRevealProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

// ── Data-Nodes: fade in with pulsing red dot indicators ──────────────────────
function DataNodesReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Pulsing dot top-left */}
      {inView && (
        <span
          className="data-pulse-dot absolute -top-3 -left-3"
          aria-hidden="true"
        />
      )}
      {/* Pulsing dot top-right */}
      {inView && (
        <span
          className="data-pulse-dot absolute -top-3 -right-3"
          style={{ animationDelay: "0.15s" }}
          aria-hidden="true"
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Pipeline: horizontal line draws across, then children animate in ─────────
function PipelineReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {/* Pipeline connector line */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-[2px] bg-primary rounded-full"
        style={{ boxShadow: "0 0 8px oklch(0.72 0.18 30 / 0.7)" }}
        initial={{ width: 0, opacity: 0 }}
        animate={inView ? { width: "100%", opacity: 1 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
      />
      {/* Node dot at end of line */}
      <motion.span
        aria-hidden="true"
        className="absolute top-0 right-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-primary"
        style={{ boxShadow: "0 0 10px oklch(0.72 0.18 30 / 0.9)" }}
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pt-4"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Stream: content slides in preceded by red data-stream trace ───────────────
function StreamReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {/* Fast horizontal red trace line */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5 bg-primary pointer-events-none"
        initial={{ scaleY: 0, opacity: 1 }}
        animate={inView ? { scaleY: 1, opacity: 0 } : {}}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          transformOrigin: "top",
          boxShadow:
            "0 0 12px oklch(0.72 0.18 30 / 0.8), 0 0 4px oklch(0.72 0.18 30)",
        }}
      />
      <motion.div
        initial={{ opacity: 0, x: -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ── Default: standard fade-up ─────────────────────────────────────────────────
function DefaultReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.3"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function ScrollSectionReveal({
  children,
  variant = "default",
  className,
}: ScrollSectionRevealProps) {
  switch (variant) {
    case "data-nodes":
      return (
        <DataNodesReveal className={className}>{children}</DataNodesReveal>
      );
    case "pipeline":
      return <PipelineReveal className={className}>{children}</PipelineReveal>;
    case "stream":
      return <StreamReveal className={className}>{children}</StreamReveal>;
    default:
      return <DefaultReveal className={className}>{children}</DefaultReveal>;
  }
}
