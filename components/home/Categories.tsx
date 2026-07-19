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
            className="group flex flex-col items-start gap-3 rounded-[16px] border border-sand bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-pop hover:border-canopy/20"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-moss/10 text-canopy transition-all duration-300 group-hover:bg-canopy group-hover:text-paper group-hover:scale-110 group-hover:shadow-md">
              <Icon size={20} className="transition-transform duration-300" />
            </span>
            <div>
              <p className="font-semibold text-ink group-hover:text-canopy transition-colors">{label}</p>
              <p className="mt-0.5 text-xs text-ink/60">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
