import { RatingStars } from "@/components/ui/RatingStars";

const testimonials = [
  {
    name: "Priya Nair",
    role: "First-time plant parent",
    quote:
      "I had no idea what was wrong with my pothos until I used the identifier. Turned out I was overwatering it — the care guide fixed it in a week.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Sold 12 plants on PlantPal",
    quote:
      "Listing takes five minutes because the AI writes the care guide for me. Buyers message me knowing exactly what they're getting.",
    rating: 5,
  },
  {
    name: "Dana Ortiz",
    role: "Apartment gardener",
    quote:
      "The pet-safety notes saved me from bringing home something toxic to my cat. Small detail, huge relief.",
    rating: 4,
  },
];

export const Testimonials = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="nursery-tag text-moss">From the community</p>
        <h2 className="mt-1 font-display text-3xl font-semibold text-ink">What growers are saying</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.name} className="flex flex-col rounded-card border border-sand bg-white p-6 shadow-card">
            <RatingStars rating={t.rating} showValue={false} size={16} />
            <p className="mt-3 flex-1 text-sm text-ink/70">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 border-t border-sand pt-3">
              <p className="text-sm font-semibold text-ink">{t.name}</p>
              <p className="text-xs text-ink/50">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
