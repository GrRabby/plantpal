import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const RatingStars = ({
  rating,
  size = 14,
  showValue = true,
}: {
  rating: number;
  size?: number;
  showValue?: boolean;
}) => {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i <= rounded ? "fill-clay text-clay" : "fill-transparent text-ink/20"
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="font-mono text-xs text-ink/60">{rating > 0 ? rating.toFixed(1) : "New"}</span>
      )}
    </div>
  );
};
