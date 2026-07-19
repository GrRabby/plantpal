const stats = [
  { value: "2,400+", label: "Plants listed" },
  { value: "9,800+", label: "AI identifications made" },
  { value: "180+", label: "Cities represented" },
  { value: "4.8/5", label: "Average seller rating" },
];

export const Stats = () => {
  return (
    <section className="bg-canopy py-14 text-paper">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-3xl font-semibold sm:text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-paper/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
