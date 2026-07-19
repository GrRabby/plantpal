import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const AIHighlight = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="group grid items-center gap-10 overflow-hidden rounded-[24px] bg-canopy-dark md:grid-cols-2 shadow-card transition-shadow hover:shadow-pop">
        <div className="p-8 text-paper sm:p-12 relative z-10">
          <span className="nursery-tag inline-flex items-center gap-1.5 rounded-full border border-paper/30 bg-white/5 px-3 py-1 text-paper/90 backdrop-blur-sm">
            <Sparkles size={12} className="text-paper" /> AI-powered
          </span>
          <h2 className="mt-5 text-balance font-display text-3xl font-semibold sm:text-4xl leading-tight">
            Snap a photo, know your plant instantly
          </h2>
          <p className="mt-5 text-paper/75 leading-relaxed">
            Not sure what&apos;s growing in your kitchen? Upload a photo and PlantPal&apos;s AI identifies
            the species, tells you how confident it is, and gives you a personalized care plan —
            watering schedule, light needs, and whether it&apos;s safe around pets.
          </p>
          <Link href="/identify" className="inline-block mt-8">
            <Button variant="secondary" className="group/btn transition-transform hover:scale-105 active:scale-95">
              <Camera size={16} /> Try the identifier <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="relative h-64 md:h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=900&q=75&auto=format"
            alt="Person examining a houseplant leaf"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-canopy-dark to-transparent opacity-80 md:hidden" />
        </div>
      </div>
    </section>
  );
};
