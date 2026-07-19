import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Plant } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { formatPrice } from "@/lib/utils";

const difficultyTone: Record<string, "canopy" | "clay" | "sand"> = {
  Easy: "canopy",
  Medium: "clay",
  Hard: "sand",
};

export const PlantCard = ({ plant }: { plant: Plant }) => {
  const image = plant.images[0] || "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=600&q=80";

  return (
    <Link
      href={`/plants/${plant._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-sand bg-white shadow-card transition-shadow hover:shadow-pop"
    >
      <div className="relative h-48 w-full overflow-hidden bg-sand">
        <Image
          src={image}
          alt={plant.title}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge tone="canopy">{plant.category}</Badge>
        </div>
        {plant.status === "Sold" && (
          <div className="absolute right-3 top-3">
            <Badge tone="sand">Sold</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink line-clamp-1">
          {plant.title}
        </h3>
        <p className="text-sm text-ink/60 line-clamp-2">{plant.shortDescription}</p>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <Badge tone={difficultyTone[plant.careDifficulty] || "sand"}>{plant.careDifficulty} care</Badge>
          {plant.location && (
            <span className="flex items-center gap-1 text-xs text-ink/50">
              <MapPin size={12} /> {plant.location}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg font-semibold text-clay">{formatPrice(plant.price)}</span>
          <RatingStars rating={plant.rating} />
        </div>
      </div>
    </Link>
  );
};
