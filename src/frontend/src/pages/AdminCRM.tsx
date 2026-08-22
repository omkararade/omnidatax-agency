import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BarChart2,
  ContactRound,
  Inbox,
  LogOut,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  service_interest: string;
  project_description: string;
  created_at: string;
}

function Wordmark() {
  return (
    <span className="font-display font-bold text-2xl tracking-tight select-none">
      <span className="text-foreground">Omni</span>
      <span className="text-muted-foreground">Data</span>
      <span className="text-primary">X</span>
    </span>
  );
}

function formatTimestamp(ts: string): string {
  return new Date(ts).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getLeadStatus(createdAt: string): "New" | "Follow Up" | "Active" {
  const ageMs = Date.now() - new Date(createdAt).getTime();
  const ageDays = ageMs / (1000 * 60 * 60 * 24);

  if (ageDays <= 2) return "New";
  if (ageDays <= 7) return "Follow Up";
  return "Active";
}

export function AdminCRMPage() {
  const [authState, setAuthState] = useState<"loading" | "authorized" | "out">(
    "loading",
  );
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load CRM leads");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setAuthState("out");
        return;
      }

      setAuthState("authorized");
      await loadLeads();
    }

    checkSession();
  }, [loadLeads]);

  const stats = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const recent = leads.filter(
      (lead) => new Date(lead.created_at).getTime() >= sevenDaysAgo,
    ).length;
    const crmLeads = leads.filter((lead) =>
      lead.service_interest.toLowerCase().includes("crm"),
    ).length;
    const serviceCounts = leads.reduce<Record<string, number>>((acc, lead) => {
      const service = lead.service_interest || "Other";
      acc[service] = (acc[service] || 0) + 1;
      return acc;
    }, {});
    const topService =
      Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "No leads yet";

    return { recent, crmLeads, topService };
  }, [leads]);

  async function handleLogout() {
    await supabase.auth.signOut();
    window.location.href = "/admin-login";
  }

  if (authState === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <span className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (authState === "out") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center">
          <Wordmark />
          <h1 className="font-display text-2xl font-bold text-foreground mt-6 mb-2">
            CRM Access
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Please sign in before viewing contact leads.
          </p>
          <Button asChild className="bg-primary text-primary-foreground">
            <Link to="/admin-login">Go to Admin Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-card border-b border-border sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Wordmark />
            <span className="text-sm text-muted-foreground font-mono hidden sm:inline">
              Admin CRM
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/admin/case-studies">
                <BarChart2 className="w-4 h-4 mr-2" />
                Case Studies
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              CRM Pipeline
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track every contact form lead, service interest, and reply action.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={loadLeads}
            disabled={loading}
            className="border-border w-fit"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Leads", value: leads.length, icon: Inbox },
            { label: "Last 7 Days", value: stats.recent, icon: ArrowUpRight },
            { label: "CRM Requests", value: stats.crmLeads, icon: ContactRound },
            { label: "Top Service", value: stats.topService, icon: BarChart2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="bg-card border border-border rounded-2xl p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </span>
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="font-display text-2xl font-bold text-foreground truncate">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Lead Tracker
            </h2>
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              {leads.length} records
            </Badge>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="p-12 text-center">
              <Inbox className="w-10 h-10 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No CRM Leads Yet
              </h3>
              <p className="text-sm text-muted-foreground">
                New contact form submissions will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Lead
                    </th>
                    <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Service
                    </th>
                    <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Submitted
                    </th>
                    <th className="px-5 py-3 text-right font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => {
                    const status = getLeadStatus(lead.created_at);
                    const mailSubject = encodeURIComponent(
                      `Re: OmniDataX ${lead.service_interest || "project"} request`,
                    );

                    return (
                      <tr
                        key={lead.id}
                        className="border-b border-border/50 last:border-0 align-top"
                      >
                        <td className="px-5 py-4 min-w-[260px]">
                          <div className="font-medium text-foreground">
                            {lead.name}
                          </div>
                          <a
                            href={`mailto:${lead.email}?subject=${mailSubject}`}
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1 mt-1"
                          >
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </a>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-3 max-w-xl">
                            {lead.project_description || "No description provided."}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            variant="outline"
                            className="border-primary/30 text-primary bg-primary/10"
                          >
                            {lead.service_interest || "Other"}
                          </Badge>
                        </td>
                        <td className="px-5 py-4">
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            {status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted-foreground font-mono">
                          {formatTimestamp(lead.created_at)}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button asChild variant="outline" size="sm">
                            <a href={`mailto:${lead.email}?subject=${mailSubject}`}>
                              Reply
                            </a>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
