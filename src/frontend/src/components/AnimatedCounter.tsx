import { useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  /** The final numeric value to animate to */
  value: number;
  /** Optional prefix (e.g. "$") */
  prefix?: string;
  /** Optional suffix (e.g. "M+", "%", "x") */
  suffix?: string;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Label shown below the number */
  label: string;
  /** Optional sub-label / description */
  description?: string;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - 2 ** (-10 * t);
}

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1800,
  label,
  description,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    startTimeRef.current = null;

    const step = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setCurrent(Math.round(value * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setCurrent(value);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-1 tabular-nums">
        {prefix}
        {current.toLocaleString()}
        {suffix}
      </div>
      <div className="text-sm font-semibold text-foreground mb-1">{label}</div>
      {description && (
        <div className="text-xs text-muted-foreground">{description}</div>
      )}
    </div>
  );
}
