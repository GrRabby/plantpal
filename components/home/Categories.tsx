import Link from "next/link";
import { Home, TreePine, Flower2, Wind, Leaf as LeafIcon, Sprout } from "lucide-react";

const items = [
  { label: "Indoor", icon: Home, desc: "Easygoing housemates" },
  { label: "Outdoor", icon: TreePine, desc: "Garden & patio ready" },
  { label: "Succulent", icon: Sprout, desc: "Low-water, low-fuss" },
  { label: "Flowering", icon: Flower2, desc: "Color that blooms" },
  { label: "Air-Purifying", icon: Wind, desc: "Cleaner air, naturally" },
  { label: "Herb", icon: LeafIcon, desc: "For the kitchen sill" },
];

export const Categories = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="nursery-tag text-moss">Browse by category</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink">What are you growing?</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map(({ label, icon: Icon, desc }) => (
          <Link
            key={label}
            href={`/plants?category=${encodeURIComponent(label)}`}
            className="group flex flex-col items-start gap-3 rounded-card border border-sand bg-white p-4 shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-pop"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-moss/15 text-canopy transition-colors group-hover:bg-canopy group-hover:text-paper">
              <Icon size={18} />
            </span>
            <div>
              <p className="font-medium text-ink">{label}</p>
              <p className="text-xs text-ink/50">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
