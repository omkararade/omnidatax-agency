import { Badge } from "@/components/ui/badge";
import { TESTIMONIALS } from "@/lib/constants";
import type { Testimonial } from "@/lib/types";
import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const AVATAR_COLORS = [
  "bg-red-900/40 border-red-700/40 text-red-400",
  "bg-red-950/60 border-red-800/30 text-red-300",
  "bg-zinc-800/60 border-zinc-600/40 text-zinc-300",
  "bg-red-900/30 border-red-700/30 text-red-300",
];

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length];

  return (
    <motion.div
      className="relative bg-card border border-border rounded-2xl p-7 flex flex-col gap-5 hover:border-primary/30 hover:shadow-elevated transition-smooth group overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      data-ocid={`testimonials.item.${index + 1}`}
    >
      {/* Subtle red glow in top-right on hover */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none" />

      {/* Stars */}
      <div className="flex gap-0.5">
        {(["one", "two", "three", "four", "five"] as const).map((n) => (
          <Star key={n} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="w-6 h-6 text-primary/25 -mt-2 shrink-0" />

      {/* Quote text */}
      <p className="text-sm text-foreground leading-relaxed italic flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        <div
          className={`w-9 h-9 rounded-full border flex items-center justify-center font-display font-bold text-sm shrink-0 ${colorClass}`}
        >
          {testimonial.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {testimonial.role}
            {testimonial.company ? (
              <>
                , <span className="text-primary/70">{testimonial.company}</span>
              </>
            ) : null}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-background" data-ocid="testimonials.section">
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
            CLIENT RESULTS
          </Badge>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Data-Driven Teams
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From stock intelligence to data pipelines — here's what our clients
            have to say.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
