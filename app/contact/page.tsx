"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Field";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="nursery-tag text-moss">We&apos;re here to help</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">Contact & Support</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="space-y-5 rounded-card border border-sand bg-white p-6 shadow-card">
            <div className="flex items-start gap-3">
              <Mail size={18} className="mt-0.5 text-clay" />
              <div>
                <p className="text-sm font-medium text-ink">Email</p>
                <p className="text-sm text-ink/60">hello@plantpal.app</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 text-clay" />
              <div>
                <p className="text-sm font-medium text-ink">Office</p>
                <p className="text-sm text-ink/60">Portland, OR</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MessageCircle size={18} className="mt-0.5 text-clay" />
              <div>
                <p className="text-sm font-medium text-ink">Response time</p>
                <p className="text-sm text-ink/60">Usually within one business day</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center rounded-card border border-sand bg-white p-10 text-center shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-canopy/10 text-canopy">
                <Check size={20} />
              </span>
              <h2 className="mt-4 font-display text-xl font-semibold text-ink">Message sent</h2>
              <p className="mt-1 text-sm text-ink/60">We&apos;ll get back to you at {form.email}.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 rounded-card border border-sand bg-white p-6 shadow-card">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" />
              </div>
              <Button type="submit" className="w-full sm:w-auto">Send message</Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
