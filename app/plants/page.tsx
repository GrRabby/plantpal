"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { usePlants, type PlantFilters } from "@/hooks/usePlants";
import { PlantFiltersBar } from "@/components/plants/PlantFiltersBar";
import { PlantGrid } from "@/components/plants/PlantGrid";
import { Pagination } from "@/components/plants/Pagination";

function ExploreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<PlantFilters>({
    search: searchParams.get("search") || undefined,
    category: searchParams.get("category") || undefined,
    careDifficulty: searchParams.get("careDifficulty") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
    sort: searchParams.get("sort") || "newest",
    page: Number(searchParams.get("page")) || 1,
    limit: 12,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.careDifficulty) params.set("careDifficulty", filters.careDifficulty);
    if (filters.minPrice !== undefined) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.sort && filters.sort !== "newest") params.set("sort", filters.sort);
    if (filters.page && filters.page > 1) params.set("page", filters.page.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, router]);

  const { data, isLoading } = usePlants(filters);

  return (-
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
