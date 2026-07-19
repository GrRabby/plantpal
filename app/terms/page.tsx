export const metadata = { title: "Terms of Service — PlantPal" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-canopy">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated July 2026</p>
      <div className="mt-8 space-y-6 text-ink/80">
        <p>
          By creating a PlantPal account, you agree to list plants honestly and accurately, and to
          only upload photos you have the right to share.
        </p>
        <p>
          AI-generated care guides and species identifications are provided for general guidance only
          and may not always be accurate — always cross-check care instructions for a plant you&apos;re
          unfamiliar with, especially around pet or child safety.
        </p>
        <p>
          PlantPal is a listings platform; transactions between buyers and sellers are arranged
          directly between users. We reserve the right to remove listings that violate these terms.
        </p>
      </div>
    </div>
  );
}
