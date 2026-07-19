"use client";

import { FormEvent, useState } from "react";
import { Mail, Check } from "lucide-react";
import { Input } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center rounded-card border border-sand bg-white px-6 py-12 text-center shadow-card">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-clay/10 text-clay">
          <Mail size={20} />
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold text-ink sm:text-3xl">
          Get care tips in your inbox
        </h2>
        <p className="mt-2 max-w-md text-sm text-ink/60">
          One email a month: seasonal care reminders, new listings near you, and the occasional
          identification fail we can all laugh about.
        </p>

        {submitted ? (
          <p className="mt-5 flex items-center gap-2 text-sm font-medium text-canopy">
            <Check size={16} /> You&apos;re on the list — welcome aboard.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 flex w-full max-w-sm gap-2">
            <Input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
};
