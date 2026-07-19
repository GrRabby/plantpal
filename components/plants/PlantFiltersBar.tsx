"use client";

import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui/Field";
import { categories, careDifficulties } from "@/lib/utils";
import type { PlantFilters } from "@/hooks/usePlants";

export const PlantFiltersBar = ({
  filters,
  onChange,
}: {
  filters: PlantFilters;
  onChange: (next: PlantFilters) => void;
}) => {
  const set = (patch: Partial<PlantFilters>) => onChange({ ...filters, ...patch, page: 1 });

  return (
    <div className="rounded-card border border-sand bg-white p-4 shadow-card">
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" size={18} />
        <Input
          placeholder="Search plants by name…"
          className="pl-10"
          defaultValue={filters.search}
          onChange={(e) => set({ search: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Select value={filters.category || ""} onChange={(e) => set({ category: e.target.value || undefined })}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>

        <Select
          value={filters.careDifficulty || ""}
          onChange={(e) => set({ careDifficulty: e.target.value || undefined })}
        >
          <option value="">Any difficulty</option>
          {careDifficulties.map((d) => (
            <option key={d} value={d}>
              {d} care
            </option>
          ))}
        </Select>

        <Input
          type="number"
          placeholder="Min price"
          min={0}
          defaultValue={filters.minPrice}
          onChange={(e) => set({ minPrice: e.target.value ? Number(e.target.value) : undefined })}
        />

        <Input
          type="number"
          placeholder="Max price"
          min={0}
          defaultValue={filters.maxPrice}
          onChange={(e) => set({ maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        />

        <Select value={filters.sort || "newest"} onChange={(e) => set({ sort: e.target.value })}>
          <option value="newest">Newest first</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top rated</option>
        </Select>
      </div>
    </div>
  );
};
