import Image from "next/image";
import { Leaf, Sparkles, Users } from "lucide-react";

export const metadata = { title: "About — PlantPal" };

const values = [
  {
    icon: Leaf,
    title: "Plants first",
    desc: "Every feature we build starts with one question: does this help a plant survive its first month home?",
  },
  {
    icon: Sparkles,
    title: "AI as a second opinion",
    desc: "Our AI care guides and identifier are a starting point, not a substitute for the seller's own knowledge.",
  },
  {
    icon: Users,
    title: "A real marketplace",
    desc: "PlantPal connects local growers and buyers directly — no warehouses, no drop-shipping.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1524598171353-e0d21b93e1e6?w=1600&q=75&auto=format"
            alt="Rows of potted plants"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-canopy/60" />
        </div>
        <div className="mx-auto -mt-20 max-w-3xl px-4 pb-4 text-center sm:px-6">
          <div className="rounded-card bg-white p-8 shadow-pop">
            <p className="nursery-tag text-moss">Our story</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Built by people who kept killing their plants
            </h1>
            <p className="mt-4 text-ink/70">
              PlantPal started as a shared spreadsheet between three friends trying to keep their
              apartments green. We kept buying plants with no idea how to care for them, and kept
              losing them within weeks. We built the tool we wished existed: a marketplace where every
              plant comes with an honest care guide, and a camera that can tell you what you&apos;re
              actually looking at.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-card border border-sand bg-white p-6 shadow-card">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-canopy text-paper">
                <Icon size={18} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm text-ink/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
