import { Plant } from "@/lib/types";
import { PlantCard } from "./PlantCard";
import { PlantCardSkeleton } from "@/components/ui/Skeleton";
import { Sprout } from "lucide-react";

export const PlantGrid = ({
  plants,
  loading,
  emptyMessage = "No plants found. Try adjusting your filters.",
}: {
  plants?: Plant[];
  loading?: boolean;
  emptyMessage?: string;
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <PlantCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!plants || plants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-sand bg-white/50 py-20 text-center">
        <Sprout className="mb-3 text-moss" size={32} />
        <p className="text-ink/60">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {plants.map((plant) => (
        <PlantCard key={plant._id} plant={plant} />
      ))}
    </div>
  );
};
