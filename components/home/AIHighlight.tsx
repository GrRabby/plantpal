import Link from "next/link";
import Image from "next/image";
import { Camera, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const AIHighlight = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 overflow-hidden rounded-card bg-canopy-dark md:grid-cols-2">
        <div className="p-8 text-paper sm:p-12">
          <span className="nursery-tag inline-flex items-center gap-1.5 rounded-full border border-paper/30 px-3 py-1 text-paper/80">
            <Sparkles size={12} /> AI-powered
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold sm:text-4xl">
            Snap a photo, know your plant instantly
          </h2>
          <p className="mt-4 text-paper/70">
            Not sure what&apos;s growing in your kitchen? Upload a photo and PlantPal&apos;s AI identifies
            the species, tells you how confident it is, and gives you a personalized care plan —
            watering schedule, light needs, and whether it&apos;s safe around pets.
          </p>
          <Link href="/identify">
            <Button variant="secondary" className="mt-6">
              <Camera size={16} /> Try the identifier <ArrowRight size={15} />
            </Button>
          </Link>
        </div>

        <div className="relative h-64 md:h-full">
          <Image
            src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=900&q=75&auto=format"
            alt="Person examining a houseplant leaf"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};
