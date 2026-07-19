import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const posts = [
  {
    title: "The overwatering trap: how to tell if your plant is drowning",
    excerpt:
      "Yellow leaves aren't always a thirst signal. Here's how to check soil moisture properly before you reach for the watering can again.",
    category: "Care Basics",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=700&q=75&auto=format",
  },
  {
    title: "Low-light apartments: 7 plants that don't need a sunny window",
    excerpt:
      "North-facing room? No problem. These species tolerate low light without stretching thin or dropping leaves.",
    category: "Plant Picks",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?w=700&q=75&auto=format",
  },
  {
    title: "Reading root rot before it's too late",
    excerpt:
      "By the time leaves show it, roots have usually been struggling for weeks. Here's the early warning checklist.",
    category: "Troubleshooting",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?w=700&q=75&auto=format",
  },
  {
    title: "Pet-safe plants that still look like a jungle",
    excerpt:
      "You don't have to choose between a cat and a Monstera collection — you just have to know which Monstera.",
    category: "Pet Safety",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=75&auto=format",
  },
  {
    title: "Why your new plant looks worse before it looks better",
    excerpt:
      "Transplant shock is real and temporary. Here's what's normal in the first two weeks after a move.",
    category: "Care Basics",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=700&q=75&auto=format",
  },
  {
    title: "Succulents are not drought-proof — they're drought-patient",
    excerpt:
      "The most common succulent death isn't neglect, it's kindness. A realistic watering rhythm that actually works.",
    category: "Plant Picks",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=700&q=75&auto=format",
  },
];

export const metadata = { title: "Blog — PlantPal" };

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="nursery-tag text-moss">Plant care tips</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink sm:text-4xl">The PlantPal Blog</h1>
        <p className="mx-auto mt-2 max-w-lg text-ink/60">
          Practical, no-nonsense care advice — written for people who&apos;ve killed a plant before.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.title}
            className="flex flex-col overflow-hidden rounded-card border border-sand bg-white shadow-card"
          >
            <div className="relative h-44 w-full">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-2 flex items-center gap-2">
                <Badge tone="canopy">{post.category}</Badge>
                <span className="flex items-center gap-1 text-xs text-ink/40">
                  <Clock size={11} /> {post.readTime} read
                </span>
              </div>
              <h2 className="font-display text-lg font-semibold leading-snug text-ink">{post.title}</h2>
              <p className="mt-2 flex-1 text-sm text-ink/60">{post.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
