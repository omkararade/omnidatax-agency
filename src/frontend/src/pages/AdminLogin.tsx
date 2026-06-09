import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { signIn } from "@/lib/auth";
import { toast } from "sonner";

export function AdminLoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        throw error;
      }

      toast.success("Login successful");

      navigate({
        to: "/admin/case-studies",
      });
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border rounded-xl p-8 bg-card">
        <h1 className="text-2xl font-bold mb-2">
          OmniDataX Admin
        </h1>

        <p className="text-muted-foreground mb-6">
          Sign in to manage case studies and leads.
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-md border border-border bg-background px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}