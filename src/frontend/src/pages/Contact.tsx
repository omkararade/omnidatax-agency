import {
  ServiceInterest,
  type SubmitContactInput,
  createActor,
} from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { COMPANY_EMAIL } from "@/lib/constants";
import { useActor } from "@caffeineai/core-infrastructure";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Lock,
  Mail,
  Star,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

interface FormState {
  name: string;
  email: string;
  serviceInterest: ServiceInterest | "";
  projectDescription: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  serviceInterest?: string;
  projectDescription?: string;
}

const serviceOptions: { value: ServiceInterest; label: string }[] = [
  { value: ServiceInterest.dataExtraction, label: "Data Extraction" },
  { value: ServiceInterest.dataEngineering, label: "Data Engineering" },
  { value: ServiceInterest.aiAnalytics, label: "AI & Analytics" },
  { value: ServiceInterest.other, label: "Not Sure Yet" },
];

const trustBadges = [
  { icon: Lock, label: "SSL Secured", sublabel: "End-to-end encrypted" },
  { icon: Users, label: "100+ Clients", sublabel: "Across 12 industries" },
  { icon: Star, label: "5-Star Rated", sublabel: "Verified client reviews" },
];

export function ContactPage() {
  const { actor, isFetching } = useActor(createActor);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    serviceInterest: "",
    projectDescription: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.projectDescription.trim()) {
      newErrors.projectDescription = "Project description is required";
    } else if (form.projectDescription.trim().length < 20) {
      newErrors.projectDescription =
        "Please describe your project in at least 20 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!actor || isFetching) {
      toast.error("Connection not ready", {
        description: "Please wait a moment and try again.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const input: SubmitContactInput = {
        name: form.name.trim(),
        email: form.email.trim(),
        projectDescription: form.projectDescription.trim(),
        serviceInterest:
          form.serviceInterest !== ""
            ? form.serviceInterest
            : ServiceInterest.other,
      };
      const result = await actor.submitContactForm(input);
      if (result.__kind__ === "ok") {
        setSubmitted(true);
        toast.success("Message sent!", {
          description:
            "We'll review your project and reach out within 24 hours.",
        });
      } else {
        toast.error("Submission failed", {
          description:
            result.err || "An unexpected error occurred. Please try again.",
        });
      }
    } catch (_err) {
      toast.error("Network error", {
        description: "Failed to submit your request. Please try again shortly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <section
        className="py-20 bg-card border-b border-border"
        data-ocid="contact.header.section"
      >
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/10 mb-5 text-xs font-mono tracking-wider"
            >
              CONTACT
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
              Start Your
              <br />
              <span className="text-primary">Data Project</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Tell us about your data challenge. We'll scope a solution and
              respond within{" "}
              <span className="text-foreground font-medium">24 hours</span> with
              a clear plan — before you spend a dollar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges + Email */}
      <section
        className="py-10 bg-background border-b border-border"
        data-ocid="contact.trust.section"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 max-w-3xl mx-auto">
            {trustBadges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-ocid={`contact.trust.item.${i + 1}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground leading-tight">
                      {badge.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {badge.sublabel}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              data-ocid="contact.trust.email"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email us at</div>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-smooth"
                  data-ocid="contact.direct_email.link"
                >
                  {COMPANY_EMAIL}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section
        id="form"
        className="py-20 bg-muted/20"
        data-ocid="contact.form.section"
      >
        <div className="container mx-auto px-6 max-w-xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground mb-6">
              <Clock className="w-4 h-4 text-primary" />
              We respond within{" "}
              <span className="text-foreground font-semibold">24 hours</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-2">
              Tell Us About Your Project
            </h2>
            <p className="text-muted-foreground text-sm">
              No jargon required. Just describe what you're trying to solve.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              className="bg-card border border-primary/30 rounded-2xl p-10 text-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              data-ocid="contact.form.success_state"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                Thank you!
              </h3>
              <p className="text-muted-foreground mb-2 leading-relaxed">
                We'll review your project and reach out within{" "}
                <span className="text-foreground font-medium">24 hours</span>.
              </p>
              <p className="text-sm text-muted-foreground">
                In the meantime, feel free to email{" "}
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {COMPANY_EMAIL}
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              data-ocid="contact.form.panel"
              noValidate
            >
              {/* Name */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name <span className="text-primary">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  className={`bg-background border-border ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  data-ocid="contact.form.name.input"
                />
                {errors.name && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="contact.form.name.field_error"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className={`bg-background border-border ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  data-ocid="contact.form.email.input"
                />
                {errors.email && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="contact.form.email.field_error"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Service Interest */}
              <div className="space-y-2">
                <Label
                  htmlFor="serviceInterest"
                  className="text-sm font-medium text-foreground"
                >
                  Service Interest
                </Label>
                <Select
                  value={form.serviceInterest}
                  onValueChange={(val) => setField("serviceInterest", val)}
                >
                  <SelectTrigger
                    className="bg-background border-border w-full"
                    data-ocid="contact.form.service_interest.select"
                  >
                    <SelectValue placeholder="Select a service…" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="projectDescription"
                  className="text-sm font-medium text-foreground"
                >
                  Project Description <span className="text-primary">*</span>
                </Label>
                <Textarea
                  id="projectDescription"
                  placeholder="Tell us about your data challenge — what you're trying to track, collect, or analyze. The more detail, the better."
                  value={form.projectDescription}
                  onChange={(e) =>
                    setField("projectDescription", e.target.value)
                  }
                  rows={5}
                  className={`bg-background border-border resize-none ${errors.projectDescription ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  data-ocid="contact.form.description.textarea"
                />
                <div className="flex items-start justify-between gap-2">
                  {errors.projectDescription ? (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="contact.form.description.field_error"
                    >
                      {errors.projectDescription}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span
                    className={`text-xs ml-auto flex-shrink-0 ${form.projectDescription.length < 20 && form.projectDescription.length > 0 ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {form.projectDescription.length} / 20 min
                  </span>
                </div>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                disabled={submitting || isFetching}
                data-ocid="contact.form.submit_button"
              >
                {submitting ? (
                  <span
                    className="flex items-center gap-2"
                    data-ocid="contact.form.loading_state"
                  >
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Start Your Data Project <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                No spam. No hard sells. We'll reply with a clear plan and honest
                assessment — within 24 hours, guaranteed.
              </p>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
}
