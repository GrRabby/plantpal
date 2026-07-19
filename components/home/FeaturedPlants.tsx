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
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="nursery-tag text-moss">Fresh from the greenhouse</p>
            <h2 className="mt-1 font-display text-3xl font-semibold text-ink">Featured plants</h2>
          </div>
          <Link href="/plants" className="flex items-center gap-1 text-sm font-medium text-canopy hover:underline">
            View all <ArrowRight size={15} />
          </Link>
        </div>

        <PlantGrid plants={data?.plants} loading={isLoading} />
      </div>
    </section>
  );
};
