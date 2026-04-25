import {
  type CaseStudy,
  type CaseStudyResult,
  type ContactSubmission,
  type CreateCaseStudyInput,
  ServiceInterest,
  type UpdateCaseStudyInput,
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
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  BarChart2,
  Inbox,
  LogOut,
  type LucideProps,
  Mail,
  Plus,
  ShoppingCart,
  Trash2,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useReducer, useState } from "react";
import { toast } from "sonner";

// ─── types ────────────────────────────────────────────────────────────────────

type AdminTab = "case-studies" | "leads";
type IconName = "trending" | "zap" | "bar" | "cart";

interface FormState {
  title: string;
  clientType: string;
  industry: string;
  keyMetric: string;
  keyMetricLabel: string;
  iconName: IconName;
  problem: string;
  approach: string;
  tools: string;
  results: CaseStudyResult[];
}

const EMPTY_FORM: FormState = {
  title: "",
  clientType: "",
  industry: "",
  keyMetric: "",
  keyMetricLabel: "",
  iconName: "trending",
  problem: "",
  approach: "",
  tools: "",
  results: [{ metric: "", description: "" }],
};

type LucideIcon = React.ForwardRefExoticComponent<
  LucideProps & React.RefAttributes<SVGSVGElement>
>;

const ICON_OPTIONS: { value: IconName; label: string; Icon: LucideIcon }[] = [
  { value: "trending", label: "Trending Up", Icon: TrendingUp },
  { value: "zap", label: "Zap / Lightning", Icon: Zap },
  { value: "bar", label: "Bar Chart", Icon: BarChart2 },
  { value: "cart", label: "Shopping Cart", Icon: ShoppingCart },
];

const SERVICE_LABELS: Record<ServiceInterest, string> = {
  [ServiceInterest.dataExtraction]: "Data Extraction",
  [ServiceInterest.dataEngineering]: "Data Engineering",
  [ServiceInterest.aiAnalytics]: "AI Automations & Agents",
  [ServiceInterest.other]: "Other",
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function parseTools(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function studyToForm(s: CaseStudy): FormState {
  return {
    title: s.title,
    clientType: s.clientType,
    industry: s.industry,
    keyMetric: s.keyMetric,
    keyMetricLabel: s.keyMetricLabel,
    iconName: (s.iconName as IconName) || "trending",
    problem: s.problem,
    approach: s.approach,
    tools: s.tools.join(", "),
    results: s.results.length ? s.results : [{ metric: "", description: "" }],
  };
}

function formatTimestamp(ts: bigint): string {
  // Backend timestamps are in nanoseconds
  const ms = Number(ts / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── sub-components ───────────────────────────────────────────────────────────

function Wordmark() {
  return (
    <span className="font-display font-bold text-2xl tracking-tight select-none">
      <span className="text-foreground">Omni</span>
      <span className="text-muted-foreground">Data</span>
      <span className="text-primary">X</span>
    </span>
  );
}

function LoginCard({
  onLogin,
  isLoggingIn,
}: { onLogin: () => void; isLoggingIn: boolean }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="admin.login.page"
    >
      <div className="mb-8">
        <Wordmark />
      </div>
      <div
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8 shadow-elevated text-center"
        data-ocid="admin.login.card"
      >
        <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground mb-2">
          Admin Access
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with Internet Identity to manage case studies and view leads.
        </p>
        <Button
          onClick={onLogin}
          disabled={isLoggingIn}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          data-ocid="admin.login.submit_button"
        >
          {isLoggingIn ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Connecting…
            </span>
          ) : (
            "Login with Internet Identity"
          )}
        </Button>
      </div>
    </div>
  );
}

function AccessDenied({ onLogout }: { onLogout: () => void }) {
  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center px-4"
      data-ocid="admin.access_denied.page"
    >
      <div className="mb-8">
        <Wordmark />
      </div>
      <div
        className="w-full max-w-sm bg-card border border-destructive/30 rounded-2xl p-8 text-center"
        data-ocid="admin.access_denied.card"
      >
        <div className="w-12 h-12 rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-5 h-5 text-destructive" />
        </div>
        <h1 className="font-display text-xl font-bold text-foreground mb-2">
          Access Restricted
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your account does not have admin privileges. Contact the site owner to
          request access.
        </p>
        <Button
          variant="outline"
          onClick={onLogout}
          className="w-full border-border hover:border-primary/40 gap-2"
          data-ocid="admin.access_denied.logout_button"
        >
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}

// ─── delete confirm dialog ─────────────────────────────────────────────────────

function DeleteDialog({
  title,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      data-ocid="admin.delete.dialog"
    >
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-elevated">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Trash2 className="w-4 h-4 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Delete Case Study
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-medium">"{title}"</span>?
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
            data-ocid="admin.delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            data-ocid="admin.delete.confirm_button"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-destructive-foreground/30 border-t-destructive-foreground rounded-full animate-spin" />
                Deleting…
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── case study form ──────────────────────────────────────────────────────────

type FormAction =
  | {
      type: "set_field";
      field: keyof Omit<FormState, "results">;
      value: string;
    }
  | { type: "set_results"; results: CaseStudyResult[] }
  | { type: "add_result" }
  | {
      type: "update_result";
      index: number;
      key: keyof CaseStudyResult;
      value: string;
    }
  | { type: "remove_result"; index: number }
  | { type: "reset"; form: FormState };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "set_field":
      return { ...state, [action.field]: action.value };
    case "set_results":
      return { ...state, results: action.results };
    case "add_result":
      return {
        ...state,
        results: [...state.results, { metric: "", description: "" }],
      };
    case "update_result": {
      const updated = state.results.map((r, i) =>
        i === action.index ? { ...r, [action.key]: action.value } : r,
      );
      return { ...state, results: updated };
    }
    case "remove_result":
      return {
        ...state,
        results: state.results.filter((_, i) => i !== action.index),
      };
    case "reset":
      return action.form;
    default:
      return state;
  }
}

function CaseStudyForm({
  form,
  dispatch,
  isSubmitting,
  onSubmit,
  onClose,
  mode,
}: {
  form: FormState;
  dispatch: React.Dispatch<FormAction>;
  isSubmitting: boolean;
  onSubmit: () => void;
  onClose: () => void;
  mode: "create" | "edit";
}) {
  return (
    <div className="flex flex-col h-full">
      <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
        <SheetTitle className="font-display text-lg">
          {mode === "create" ? "Add New Case Study" : "Edit Case Study"}
        </SheetTitle>
        <SheetDescription className="text-sm text-muted-foreground">
          {mode === "create"
            ? "Fill in the details to create a new case study."
            : "Update the case study details below."}
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Title */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Title <span className="text-primary">*</span>
          </Label>
          <Input
            value={form.title}
            onChange={(e) =>
              dispatch({
                type: "set_field",
                field: "title",
                value: e.target.value,
              })
            }
            placeholder="E.g. Stock Market Intelligence Platform"
            className="bg-background border-border"
            data-ocid="admin.form.title.input"
          />
        </div>

        {/* Client + Industry */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Client Type <span className="text-primary">*</span>
            </Label>
            <Input
              value={form.clientType}
              onChange={(e) =>
                dispatch({
                  type: "set_field",
                  field: "clientType",
                  value: e.target.value,
                })
              }
              placeholder="E.g. Shopify Seller"
              className="bg-background border-border"
              data-ocid="admin.form.client_type.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Industry <span className="text-primary">*</span>
            </Label>
            <Input
              value={form.industry}
              onChange={(e) =>
                dispatch({
                  type: "set_field",
                  field: "industry",
                  value: e.target.value,
                })
              }
              placeholder="E.g. E-Commerce"
              className="bg-background border-border"
              data-ocid="admin.form.industry.input"
            />
          </div>
        </div>

        {/* Key Metric + Label */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Key Metric <span className="text-primary">*</span>
            </Label>
            <Input
              value={form.keyMetric}
              onChange={(e) =>
                dispatch({
                  type: "set_field",
                  field: "keyMetric",
                  value: e.target.value,
                })
              }
              placeholder="E.g. 10K+"
              className="bg-background border-border"
              data-ocid="admin.form.key_metric.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-foreground">
              Metric Label <span className="text-primary">*</span>
            </Label>
            <Input
              value={form.keyMetricLabel}
              onChange={(e) =>
                dispatch({
                  type: "set_field",
                  field: "keyMetricLabel",
                  value: e.target.value,
                })
              }
              placeholder="E.g. Ticker Rows"
              className="bg-background border-border"
              data-ocid="admin.form.key_metric_label.input"
            />
          </div>
        </div>

        {/* Icon */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Icon <span className="text-primary">*</span>
          </Label>
          <Select
            value={form.iconName}
            onValueChange={(v) =>
              dispatch({ type: "set_field", field: "iconName", value: v })
            }
          >
            <SelectTrigger
              className="bg-background border-border"
              data-ocid="admin.form.icon.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ICON_OPTIONS.map(({ value, label, Icon }) => (
                <SelectItem key={value} value={value}>
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    {label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Problem */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            The Problem <span className="text-primary">*</span>
          </Label>
          <Textarea
            value={form.problem}
            onChange={(e) =>
              dispatch({
                type: "set_field",
                field: "problem",
                value: e.target.value,
              })
            }
            placeholder="Describe the client's challenge..."
            rows={3}
            className="bg-background border-border resize-none"
            data-ocid="admin.form.problem.textarea"
          />
        </div>

        {/* Approach */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Our Approach <span className="text-primary">*</span>
          </Label>
          <Textarea
            value={form.approach}
            onChange={(e) =>
              dispatch({
                type: "set_field",
                field: "approach",
                value: e.target.value,
              })
            }
            placeholder="Describe how you solved it..."
            rows={3}
            className="bg-background border-border resize-none"
            data-ocid="admin.form.approach.textarea"
          />
        </div>

        {/* Tools */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-foreground">
            Tools Used <span className="text-primary">*</span>
          </Label>
          <Input
            value={form.tools}
            onChange={(e) =>
              dispatch({
                type: "set_field",
                field: "tools",
                value: e.target.value,
              })
            }
            placeholder="Python, Pandas, PostgreSQL, Airflow"
            className="bg-background border-border"
            data-ocid="admin.form.tools.input"
          />
          <p className="text-xs text-muted-foreground">
            Comma-separated list of tools
          </p>
          {form.tools.trim() && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {parseTools(form.tools).map((tool) => (
                <Badge
                  key={tool}
                  variant="outline"
                  className="text-xs font-mono border-primary/30 text-primary bg-primary/5"
                >
                  {tool}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">
              Results <span className="text-primary">*</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch({ type: "add_result" })}
              className="border-primary/30 text-primary hover:bg-primary/5 text-xs gap-1.5"
              data-ocid="admin.form.add_result_button"
            >
              <Plus className="w-3 h-3" />
              Add Result
            </Button>
          </div>
          <div className="space-y-3">
            {form.results.map((result, idx) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: result list has no stable IDs
                key={idx}
                className="bg-muted/30 border border-border rounded-xl p-3 space-y-2"
                data-ocid={`admin.form.result.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">
                    Result #{idx + 1}
                  </span>
                  {form.results.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "remove_result", index: idx })
                      }
                      className="text-muted-foreground hover:text-destructive transition-smooth"
                      aria-label="Remove result"
                      data-ocid={`admin.form.result.remove_button.${idx + 1}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Metric
                    </Label>
                    <Input
                      value={result.metric}
                      onChange={(e) =>
                        dispatch({
                          type: "update_result",
                          index: idx,
                          key: "metric",
                          value: e.target.value,
                        })
                      }
                      placeholder="10K+"
                      className="bg-background border-border h-8 text-sm"
                      data-ocid={`admin.form.result.metric.input.${idx + 1}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Description
                    </Label>
                    <Input
                      value={result.description}
                      onChange={(e) =>
                        dispatch({
                          type: "update_result",
                          index: idx,
                          key: "description",
                          value: e.target.value,
                        })
                      }
                      placeholder="Ticker rows covered"
                      className="bg-background border-border h-8 text-sm"
                      data-ocid={`admin.form.result.description.input.${idx + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-4 flex gap-3 justify-end bg-card">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isSubmitting}
          data-ocid="admin.form.cancel_button"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
          data-ocid="admin.form.save_button"
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving…
            </>
          ) : mode === "create" ? (
            "Create Case Study"
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── leads section ─────────────────────────────────────────────────────────────

function LeadsSection({
  actor,
}: {
  actor: { getContactSubmissions: () => Promise<ContactSubmission[]> } | null;
}) {
  const [leads, setLeads] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedLead, setExpandedLead] = useState<bigint | null>(null);

  const loadLeads = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    try {
      const data = await actor.getContactSubmissions();
      // Sort newest first
      const sorted = [...data].sort((a, b) =>
        b.submittedAt > a.submittedAt ? 1 : -1,
      );
      setLeads(sorted);
    } catch {
      toast.error("Failed to load leads");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    loadLeads();
  }, [loadLeads]);

  const serviceColor: Record<ServiceInterest, string> = {
    [ServiceInterest.dataExtraction]:
      "border-blue-500/30 text-blue-400 bg-blue-500/10",
    [ServiceInterest.dataEngineering]:
      "border-violet-500/30 text-violet-400 bg-violet-500/10",
    [ServiceInterest.aiAnalytics]:
      "border-primary/30 text-primary bg-primary/10",
    [ServiceInterest.other]: "border-border text-muted-foreground bg-muted/40",
  };

  if (loading) {
    return (
      <div className="space-y-3" data-ocid="admin.leads.loading_state">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
          >
            <Skeleton className="w-9 h-9 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-6 w-28" />
          </div>
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div
        className="bg-card border border-border rounded-2xl p-12 text-center"
        data-ocid="admin.leads.empty_state"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
          <Inbox className="w-6 h-6 text-primary" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">
          No Leads Yet
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Contact form submissions will appear here once visitors reach out.
        </p>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-ocid="admin.leads.table"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Name
            </th>
            <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
              Email
            </th>
            <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">
              Service
            </th>
            <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
              Submitted
            </th>
            <th className="px-5 py-3 text-right font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx) => (
            <>
              <tr
                key={String(lead.id)}
                className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-smooth cursor-pointer"
                data-ocid={`admin.leads.row.item.${idx + 1}`}
                onClick={() =>
                  setExpandedLead(expandedLead === lead.id ? null : lead.id)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setExpandedLead(expandedLead === lead.id ? null : lead.id);
                }}
                tabIndex={0}
              >
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary uppercase">
                        {lead.name.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-foreground truncate">
                      {lead.name}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <a
                    href={`mailto:${lead.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 w-fit"
                    onClick={(e) => e.stopPropagation()}
                    data-ocid={`admin.leads.email.${idx + 1}`}
                  >
                    <Mail className="w-3 h-3 shrink-0" />
                    <span className="truncate max-w-[180px]">{lead.email}</span>
                  </a>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  <Badge
                    variant="outline"
                    className={`text-xs font-medium ${serviceColor[lead.serviceInterest]}`}
                  >
                    {SERVICE_LABELS[lead.serviceInterest]}
                  </Badge>
                </td>
                <td className="px-5 py-3.5 hidden lg:table-cell">
                  <span className="text-xs text-muted-foreground font-mono">
                    {formatTimestamp(lead.submittedAt)}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors font-mono underline underline-offset-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedLead(
                        expandedLead === lead.id ? null : lead.id,
                      );
                    }}
                    data-ocid={`admin.leads.expand_button.${idx + 1}`}
                  >
                    {expandedLead === lead.id ? "collapse" : "expand"}
                  </button>
                </td>
              </tr>
              {expandedLead === lead.id && (
                <tr
                  key={`${String(lead.id)}-expanded`}
                  className="border-b border-border/50 bg-muted/10"
                  data-ocid={`admin.leads.expanded.item.${idx + 1}`}
                >
                  <td colSpan={5} className="px-5 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 sm:hidden">
                          <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-sm text-primary hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 md:hidden">
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium ${serviceColor[lead.serviceInterest]}`}
                          >
                            {SERVICE_LABELS[lead.serviceInterest]}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground lg:hidden font-mono">
                          {formatTimestamp(lead.submittedAt)}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5">
                          Project Description
                        </p>
                        <p className="text-sm text-foreground leading-relaxed bg-background/60 rounded-lg p-3 border border-border/50">
                          {lead.projectDescription || (
                            <span className="italic text-muted-foreground">
                              No description provided.
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── main admin page ───────────────────────────────────────────────────────────

export function AdminCaseStudiesPage() {
  const { login, clear, isAuthenticated, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<AdminTab>("case-studies");

  const [authState, setAuthState] = useState<
    "loading" | "unauthenticated" | "denied" | "authorized"
  >("loading");
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [studiesLoading, setStudiesLoading] = useState(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<CaseStudy | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<CaseStudy | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, dispatch] = useReducer(formReducer, EMPTY_FORM);

  // Determine auth state
  useEffect(() => {
    if (isInitializing) {
      setAuthState("loading");
      return;
    }
    if (!isAuthenticated) {
      setAuthState("unauthenticated");
      return;
    }
    if (!actor || isFetching) return;

    actor
      .isCallerAdmin()
      .then((isAdmin) => {
        setAuthState(isAdmin ? "authorized" : "denied");
      })
      .catch(() => setAuthState("denied"));
  }, [isAuthenticated, isInitializing, actor, isFetching]);

  // Load studies when authorized
  const loadStudies = useCallback(async () => {
    if (!actor || authState !== "authorized") return;
    setStudiesLoading(true);
    try {
      const data = await actor.getAllCaseStudies();
      setStudies(data);
    } catch {
      toast.error("Failed to load case studies");
    } finally {
      setStudiesLoading(false);
    }
  }, [actor, authState]);

  useEffect(() => {
    loadStudies();
  }, [loadStudies]);

  function openCreate() {
    setEditTarget(null);
    dispatch({ type: "reset", form: EMPTY_FORM });
    setSheetOpen(true);
  }

  function openEdit(study: CaseStudy) {
    setEditTarget(study);
    dispatch({ type: "reset", form: studyToForm(study) });
    setSheetOpen(true);
  }

  function closeSheet() {
    setSheetOpen(false);
    setEditTarget(null);
  }

  async function handleSubmit() {
    if (!actor) return;

    const tools = parseTools(form.tools);
    const validResults = form.results.filter(
      (r) => r.metric.trim() && r.description.trim(),
    );

    if (
      !form.title.trim() ||
      !form.clientType.trim() ||
      !form.industry.trim() ||
      !form.keyMetric.trim() ||
      !form.keyMetricLabel.trim() ||
      !form.problem.trim() ||
      !form.approach.trim() ||
      tools.length === 0 ||
      validResults.length === 0
    ) {
      toast.error("All fields are required", {
        description:
          "Please fill in every field, add at least one tool and one result.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (editTarget) {
        const input: UpdateCaseStudyInput = {
          title: form.title.trim(),
          clientType: form.clientType.trim(),
          industry: form.industry.trim(),
          keyMetric: form.keyMetric.trim(),
          keyMetricLabel: form.keyMetricLabel.trim(),
          iconName: form.iconName,
          problem: form.problem.trim(),
          approach: form.approach.trim(),
          tools,
          results: validResults,
        };
        const result = await actor.updateCaseStudy(editTarget.id, input);
        if (result.__kind__ === "ok") {
          toast.success("Case study updated successfully");
          queryClient.invalidateQueries({ queryKey: ["caseStudies"] });
          await loadStudies();
          closeSheet();
        } else {
          toast.error("Update failed", { description: result.err });
        }
      } else {
        const input: CreateCaseStudyInput = {
          title: form.title.trim(),
          clientType: form.clientType.trim(),
          industry: form.industry.trim(),
          keyMetric: form.keyMetric.trim(),
          keyMetricLabel: form.keyMetricLabel.trim(),
          iconName: form.iconName,
          problem: form.problem.trim(),
          approach: form.approach.trim(),
          tools,
          results: validResults,
        };
        const result = await actor.createCaseStudy(input);
        if (result.__kind__ === "ok") {
          toast.success("Case study created successfully");
          queryClient.invalidateQueries({ queryKey: ["caseStudies"] });
          await loadStudies();
          closeSheet();
        } else {
          toast.error("Create failed", { description: result.err });
        }
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!actor || !deleteTarget) return;
    setIsDeleting(true);
    try {
      const ok = await actor.deleteCaseStudy(deleteTarget.id);
      if (ok) {
        toast.success("Case study deleted");
        queryClient.invalidateQueries({ queryKey: ["caseStudies"] });
        await loadStudies();
      } else {
        toast.error("Delete failed", {
          description: "The case study could not be deleted.",
        });
      }
    } catch {
      toast.error("An error occurred during deletion.");
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  }

  // ── render ──────────────────────────────────────────────────────────────────

  if (authState === "loading") {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">
            Checking authentication…
          </p>
        </div>
      </div>
    );
  }

  if (authState === "unauthenticated") {
    return <LoginCard onLogin={login} isLoggingIn={isLoggingIn} />;
  }

  if (authState === "denied") {
    return <AccessDenied onLogout={clear} />;
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      data-ocid="admin.dashboard.page"
    >
      {/* Top bar */}
      <header
        className="bg-card border-b border-border sticky top-0 z-30"
        data-ocid="admin.dashboard.header"
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Wordmark />
            <Separator orientation="vertical" className="h-5 bg-border" />
            <span className="text-sm text-muted-foreground font-mono hidden sm:inline">
              Admin Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            {activeTab === "case-studies" && (
              <Button
                onClick={openCreate}
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                data-ocid="admin.dashboard.add_button"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add New</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="text-muted-foreground hover:text-foreground gap-2"
              data-ocid="admin.dashboard.logout_button"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tab navigation */}
      <div className="bg-card border-b border-border" data-ocid="admin.tabs">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex gap-0" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "case-studies"}
              onClick={() => setActiveTab("case-studies")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "case-studies"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin.tabs.case-studies.tab"
            >
              <BarChart2 className="w-4 h-4" />
              Case Studies
              <Badge
                variant="secondary"
                className="ml-1 text-xs bg-muted text-muted-foreground font-mono px-1.5 py-0"
              >
                {studies.length}
              </Badge>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "leads"}
              onClick={() => setActiveTab("leads")}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "leads"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin.tabs.leads.tab"
            >
              <Inbox className="w-4 h-4" />
              Contact Leads
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Case Studies Tab ── */}
        {activeTab === "case-studies" && (
          <div data-ocid="admin.case-studies.section">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Case Studies
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {studiesLoading
                    ? "Loading…"
                    : `${studies.length} case ${studies.length === 1 ? "study" : "studies"}`}
                </p>
              </div>
            </div>

            {studiesLoading ? (
              <div
                className="space-y-3"
                data-ocid="admin.dashboard.loading_state"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                  >
                    <Skeleton className="w-9 h-9 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                ))}
              </div>
            ) : studies.length === 0 ? (
              <div
                className="bg-card border border-border rounded-2xl p-12 text-center"
                data-ocid="admin.dashboard.empty_state"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  No Case Studies Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Add your first case study to showcase your work on the public
                  site.
                </p>
                <Button
                  onClick={openCreate}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-2"
                  data-ocid="admin.empty.add_button"
                >
                  <Plus className="w-4 h-4" />
                  Add First Case Study
                </Button>
              </div>
            ) : (
              <div
                className="bg-card border border-border rounded-2xl overflow-hidden"
                data-ocid="admin.dashboard.table"
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Title
                      </th>
                      <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden md:table-cell">
                        Industry
                      </th>
                      <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden sm:table-cell">
                        Metric
                      </th>
                      <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground hidden lg:table-cell">
                        Icon
                      </th>
                      <th className="px-5 py-3 text-right font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {studies.map((study, idx) => {
                      const IconComp =
                        ICON_OPTIONS.find((o) => o.value === study.iconName)
                          ?.Icon ?? TrendingUp;
                      return (
                        <tr
                          key={String(study.id)}
                          className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-smooth"
                          data-ocid={`admin.dashboard.row.item.${idx + 1}`}
                        >
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                <IconComp className="w-3.5 h-3.5 text-primary" />
                              </div>
                              <span className="font-medium text-foreground truncate">
                                {study.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-3.5 hidden md:table-cell">
                            <Badge
                              variant="secondary"
                              className="text-xs font-mono bg-muted text-muted-foreground"
                            >
                              {study.industry}
                            </Badge>
                          </td>
                          <td className="px-5 py-3.5 hidden sm:table-cell">
                            <span className="font-display font-bold text-primary">
                              {study.keyMetric}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">
                              {study.keyMetricLabel}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 hidden lg:table-cell">
                            <span className="text-xs font-mono text-muted-foreground">
                              {study.iconName}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEdit(study)}
                                className="border-border hover:border-primary/40 text-xs h-7 px-3"
                                data-ocid={`admin.dashboard.edit_button.${idx + 1}`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setDeleteTarget(study)}
                                className="border-destructive/30 text-destructive hover:bg-destructive/5 text-xs h-7 px-3"
                                data-ocid={`admin.dashboard.delete_button.${idx + 1}`}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Leads Tab ── */}
        {activeTab === "leads" && (
          <div data-ocid="admin.leads.section">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold text-foreground">
                  Contact Leads
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  All contact form submissions from visitors
                </p>
              </div>
            </div>
            <LeadsSection actor={actor} />
          </div>
        )}
      </main>

      {/* Edit/Create sheet */}
      <Sheet
        open={sheetOpen}
        onOpenChange={(open) => {
          if (!open) closeSheet();
        }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-xl p-0 bg-card border-border flex flex-col"
          data-ocid="admin.form.sheet"
        >
          <CaseStudyForm
            form={form}
            dispatch={dispatch}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onClose={closeSheet}
            mode={editTarget ? "edit" : "create"}
          />
        </SheetContent>
      </Sheet>

      {/* Delete dialog */}
      {deleteTarget && (
        <DeleteDialog
          title={deleteTarget.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}
