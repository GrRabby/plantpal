import { cn } from "@/lib/utils";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-sand/70", className)} />
);

export const PlantCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-card border border-sand bg-white shadow-card">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="flex flex-1 flex-col gap-2 p-4">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="mt-auto flex items-center justify-between pt-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  </div>
);
