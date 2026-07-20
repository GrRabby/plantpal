"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Search, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=75&auto=format",
    alt: "Close-up of vibrant green monstera leaves",
    tag: "Monstera season is here",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDvZM74u5EscB2l8vtnhkcIIzJWrDFZwiHSlrvqNhIqq_KDPABt4ZtiiN&s=10",
    alt: "Indoor plant shop with rows of potted plants on wooden shelving",
    tag: "Sourced from local growers",
  },
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt4O0CT_kP7Q6MzIrBj2LH06D1zEhtiaOBxzsfGhPcHwBVBvcsRK8TDdo&s=10",
    alt: "Rows of small succulents in terracotta pots",
    tag: "Low-water picks for beginners",
  }
] as const;

const AUTOPLAY_MS = 2000;

export const Hero = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay — restarts its countdown on every slide change (manual or
  // automatic) so a user click always gets a full AUTOPLAY_MS before the
  // next auto-advance, rather than cutting it short.
  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, paused]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    router.push(query ? `/plants?search=${encodeURIComponent(query)}` : "/plants");
  };

  return (
    <section
      className="group relative overflow-hidden bg-canopy text-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slideshow layer */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.image}
            aria-hidden={index !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1400ms] ease-in-out",
              index === active ? "opacity-25" : "opacity-0"
            )}
          >
            <div
              className="hero-kenburns h-full w-full"
              style={{ animationDuration: `${AUTOPLAY_MS * 4}ms` }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canopy via-canopy/80 to-canopy/40" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <span
          key={SLIDES[active].tag}
          className="hero-fade-up nursery-tag rounded-full border border-paper/30 px-3 py-1 text-paper/80"
        >
          {SLIDES[active].tag}
        </span>

        <h1
          className="hero-fade-up mt-6 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          Find, Grow, and Understand Your Plants
        </h1>

        <p
          className="hero-fade-up mt-5 max-w-lg text-balance text-paper/75"
          style={{ animationDelay: "160ms" }}
        >
          Browse plants from local sellers, snap a photo to identify any species, and get an
          AI-written care guide before you bring it home.
        </p>

        <form
          onSubmit={handleSearch}
          className="hero-fade-up mt-8 flex w-full max-w-lg gap-2"
          style={{ animationDelay: "240ms" }}
        >
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
          className="hero-fade-up mt-4 flex items-center gap-1.5 text-sm text-paper/70 underline-offset-4 hover:text-paper hover:underline"
          style={{ animationDelay: "320ms" }}
        >
          <Camera size={15} /> Or identify a plant from a photo instead
        </button>

        {/* Slide controls */}
        <div className="mt-10 flex items-center gap-4">
          <button
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper/70 opacity-0 transition-opacity duration-200 hover:border-paper/60 hover:text-paper group-hover:opacity-100"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.image}
                onClick={() => goTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active}
                className="group/dot relative h-2 w-2"
              >
                <span
                  className={cn(
                    "block h-2 w-2 rounded-full border border-paper/60 transition-all duration-300",
                    index === active ? "w-2 bg-paper" : "bg-transparent group-hover/dot:bg-paper/40"
                  )}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-paper/70 opacity-0 transition-opacity duration-200 hover:border-paper/60 hover:text-paper group-hover:opacity-100"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-kenburns {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          100% {
            transform: scale(1.12) translate3d(-1%, -1%, 0);
          }
        }
        .hero-kenburns {
          animation-name: hero-kenburns;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        @keyframes hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .hero-fade-up {
          opacity: 0;
          animation: hero-fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes hero-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .hero-progress {
          width: 0%;
          border-radius: 9999px;
          animation-name: hero-progress;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns,
          .hero-fade-up,
          .hero-progress {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};