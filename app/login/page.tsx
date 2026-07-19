"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Leaf, Mail, Lock } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Field";
import { DemoLoginButton, DEMO_CREDENTIALS } from "@/components/auth/DemoLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: signInError } = await signIn.email({ email, password });

    setLoading(false);
    if (signInError) {
      setError(signInError.message || "Invalid email or password.");
      return;
    }
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogle = async () => {
    await signIn.social({ provider: "google", callbackURL: "/dashboard" });
  };

  return (
    <div className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-canopy text-paper">
          <Leaf size={20} />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Welcome back</h1>
        <p className="mt-1 text-ink/60">Log in to manage your listings and get AI care tips.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-sand bg-white p-6 shadow-card">
        <div>
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
            <Input id="email" type="email" required className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" size={16} />
            <Input id="password" type="password" required className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
        </div>

        {error && <p className="text-sm text-clay">{error}</p>}

        <Button type="submit" className="w-full" loading={loading}>
          Log in
        </Button>

        <DemoLoginButton onFill={(creds) => { setEmail(creds.email); setPassword(creds.password); }} />

        <div className="relative py-1 text-center text-xs text-ink/40">
          <span className="relative bg-white px-2">or continue with</span>
          <div className="absolute left-0 top-1/2 -z-10 h-px w-full bg-sand" />
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.48a5.54 5.54 0 0 1-2.4 3.63v3h3.87c2.27-2.09 3.57-5.17 3.57-8.82Z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.79-2.11-6.74-4.96H1.27v3.1A12 12 0 0 0 12 24Z"/><path fill="#FBBC05" d="M5.26 14.28A7.2 7.2 0 0 1 4.88 12c0-.79.14-1.56.38-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l3.99-3.1Z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.69 1.27 6.62l3.99 3.1C6.21 6.86 8.87 4.75 12 4.75Z"/></svg>
          Continue with Google
        </Button>

        <p className="pt-2 text-center text-sm text-ink/60">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-canopy hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
