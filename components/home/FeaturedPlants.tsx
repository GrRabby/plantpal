"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePlants } from "@/hooks/usePlants";
import { PlantGrid } from "@/components/plants/PlantGrid";

export const FeaturedPlants = () => {
  const { data, isLoading } = usePlants({ sort: "rating", limit: 4, page: 1 });

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between border-b border-sand pb-4">
          <div>
            <p className="nursery-tag text-moss font-medium tracking-wide uppercase text-xs">Fresh from the greenhouse</p>
            <h2 className="mt-2 font-display text-4xl font-semibold text-ink tracking-tight">Featured plants</h2>
          </div>
          <Link href="/plants" className="group flex items-center gap-1.5 text-sm font-medium text-canopy hover:text-canopy/80 transition-colors">
            View all collection <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <PlantGrid plants={data?.plants} loading={isLoading} />
      </div>
    </section>
  );
};
