import { Camera, Sparkles, ShoppingBag } from "lucide-react";
import { VineDivider } from "@/components/ui/VineDivider";

const steps = [
  {
    icon: Camera,
    title: "Upload a photo",
    desc: "Snap the plant you're curious about, or the one you're about to list for sale.",
  },
  {
    icon: Sparkles,
    title: "Get AI insight",
    desc: "PlantPal identifies the species and writes a care guide tailored to it in seconds.",
  },
  {
    icon: ShoppingBag,
    title: "Buy or list it",
    desc: "Browse sellers near you, or publish your own listing with the care guide attached.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="nursery-tag text-moss">The process</p>
          <h2 className="mt-1 font-display text-3xl font-semibold text-ink">How PlantPal works</h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-canopy text-paper">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 max-w-xs text-sm text-ink/60">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-canopy">
          <VineDivider />
        </div>
      </div>
    </section>
  );
};
