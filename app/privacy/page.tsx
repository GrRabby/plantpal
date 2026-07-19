export const metadata = { title: "Privacy Policy — PlantPal" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-semibold text-canopy">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink/50">Last updated July 2026</p>
      <div className="mt-8 space-y-6 text-ink/80">
        <p>
          PlantPal collects the information you provide when creating an account, listing a plant, or
          uploading a photo for identification — your name, email, listing details, and images you
          choose to submit.
        </p>
        <p>
          Photos submitted to the AI Plant Identifier are sent to our AI provider for analysis and a
          record of the result is stored on your account so you can revisit past identifications. We
          don&apos;t sell your data to third parties.
        </p>
        <p>
          You can request deletion of your account and associated listings at any time from your
          dashboard, or by contacting us at hello@plantpal.app.
        </p>
      </div>
    </div>
  );
}
