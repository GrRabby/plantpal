"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { usePlants, type PlantFilters } from "@/hooks/usePlants";
import { PlantFiltersBar } from "@/components/plants/PlantFiltersBar";
import { PlantGrid } from "@/components/plants/PlantGrid";
import { Pagination } from "@/components/plants/Pagination";

function ExploreContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<PlantFilters>({
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    sort: "newest",
    page: 1,
    limit: 12,
  });

  const { data, isLoading } = usePlants(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <p className="nursery-tag text-moss">Explore</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">
          Find your next plant
        </h1>
        <p className="mt-2 text-ink/60">
          {data ? `${data.pagination.total} plants available` : "Loading listings…"}
        </p>
      </div>

      <div className="mb-8">
        <PlantFiltersBar filters={filters} onChange={setFilters} />
      </div>

      <PlantGrid plants={data?.plants} loading={isLoading} />

      {data && (
        <Pagination
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          onChange={(page) => setFilters((f) => ({ ...f, page }))}
        />
      )}
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreContent />
    </Suspense>
  );
}
