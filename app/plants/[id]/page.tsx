"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Droplets, Sun, ShieldAlert, MapPin, Loader2, Sparkles } from "lucide-react";
import { usePlant } from "@/hooks/usePlants";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/ui/RatingStars";
import { PlantGrid } from "@/components/plants/PlantGrid";
import { ReviewsSection } from "@/components/plants/ReviewsSection";
import { formatPrice, cn } from "@/lib/utils";

export default function PlantDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = usePlant(id);
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-canopy" size={28} />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Plant not found</h1>
        <p className="mt-2 text-ink/60">This listing may have been removed.</p>
        <Link href="/plants" className="mt-4 inline-block text-canopy underline">
          Back to Explore
        </Link>
      </div>
    );
  }

  const { plant, related } = data;
  const images = plant.images.length > 0 ? plant.images : ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=900&q=80"];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        {/* Media */}
        <div>
          <div className="relative h-96 w-full overflow-hidden rounded-card bg-sand">
            <Image src={images[activeImage]} alt={plant.title} fill className="object-cover" priority />
          </div>
          {images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-16 w-16 overflow-hidden rounded-tag border-2",
                    i === activeImage ? "border-canopy" : "border-transparent"
                  )}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="canopy">{plant.category}</Badge>
            {plant.status === "Sold" && <Badge tone="sand">Sold</Badge>}
            {plant.aiGenerated && (
              <Badge tone="outline">
                <Sparkles size={11} /> AI care guide
              </Badge>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">{plant.title}</h1>

          <div className="mt-2 flex items-center gap-3">
            <RatingStars rating={plant.rating} />
            <span className="text-sm text-ink/40">({plant.reviewCount} reviews)</span>
          </div>

          <p className="mt-4 font-display text-3xl font-semibold text-clay">{formatPrice(plant.price)}</p>

          <p className="mt-4 text-ink/70">{plant.shortDescription}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-tag bg-sand/60 px-3 py-2">
              <Sun size={15} className="text-clay" /> {plant.lightRequirement} light
            </div>
            <div className="flex items-center gap-2 rounded-tag bg-sand/60 px-3 py-2">
              <Droplets size={15} className="text-canopy" /> {plant.waterFrequency}
            </div>
            <div className="flex items-center gap-2 rounded-tag bg-sand/60 px-3 py-2">
              <ShieldAlert size={15} className="text-moss" /> {plant.toxicity}
            </div>
            <div className="flex items-center gap-2 rounded-tag bg-sand/60 px-3 py-2">
              <MapPin size={15} className="text-ink/50" /> {plant.location}
            </div>
          </div>

          <p className="mt-6 text-sm text-ink/50">
            Listed by <span className="font-medium text-ink/80">{plant.sellerName}</span>
          </p>
        </div>
      </div>

      {/* Overview / Specs */}
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <h2 className="font-display text-2xl font-semibold text-ink">Overview</h2>
          <p className="mt-3 whitespace-pre-line text-ink/70">{plant.fullDescription}</p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">Specifications</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between border-b border-sand py-2">
              <dt className="text-ink/50">Care difficulty</dt>
              <dd className="font-medium text-ink">{plant.careDifficulty}</dd>
            </div>
            <div className="flex justify-between border-b border-sand py-2">
              <dt className="text-ink/50">Light</dt>
              <dd className="font-medium text-ink">{plant.lightRequirement}</dd>
            </div>
            <div className="flex justify-between border-b border-sand py-2">
              <dt className="text-ink/50">Watering</dt>
              <dd className="font-medium text-ink">{plant.waterFrequency}</dd>
            </div>
            <div className="flex justify-between border-b border-sand py-2">
              <dt className="text-ink/50">Toxicity</dt>
              <dd className="font-medium text-ink">{plant.toxicity}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-14">
        <ReviewsSection plantId={plant._id} />
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-ink">Related plants</h2>
          <div className="mt-4">
            <PlantGrid plants={related} />
          </div>
        </div>
      )}
    </div>
  );
}
