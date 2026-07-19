"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Search, Camera } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";

export const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(query ? `/plants?search=${encodeURIComponent(query)}` : "/plants");
  };

  return (
    <section className="relative overflow-hidden bg-canopy text-paper">
      <div className="absolute inset-0 opacity-25">
        <Image
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=70&auto=format"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canopy via-canopy/80 to-canopy/40" />

      <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <span className="nursery-tag rounded-full border border-paper/30 px-3 py-1 text-paper/80">
          Grown by plant people, guided by AI
        </span>
        <h1 className="mt-6 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
          Find, Grow, and Understand Your Plants
        </h1>
        <p className="mt-5 max-w-lg text-balance text-paper/75">
          Browse plants from local sellers, snap a photo to identify any species, and get an
          AI-written care guide before you bring it home.
        </p>

        <form onSubmit={handleSearch} className="mt-8 flex w-full max-w-lg gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search “monstera”, “low light”, “pet-safe”…"
              className="border-none bg-paper pl-10 text-ink shadow-pop"
            />
          </div>
          <Button type="submit" size="md">
            Search
          </Button>
        </form>

        <button
          onClick={() => router.push("/identify")}
          className="mt-4 flex items-center gap-1.5 text-sm text-paper/70 underline-offset-4 hover:text-paper hover:underline"
        >
          <Camera size={15} /> Or identify a plant from a photo instead
        </button>
      </div>
    </section>
  );
};
