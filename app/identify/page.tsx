import { PlantIdentifier } from "@/components/ai/PlantIdentifier";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Sparkles } from "lucide-react";

export const metadata = { title: "Identify a Plant — PlantPal" };

export default function IdentifyPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="nursery-tag inline-flex items-center gap-1.5 rounded-full bg-moss/10 px-3 py-1 text-moss">
            <Sparkles size={12} /> AI Image Understanding
          </span>
          <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            What plant is this?
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-ink/60">
            Upload a clear photo and PlantPal will identify the species, estimate how confident it is,
            and give you tailored care tips.
          </p>
        </div>

        <PlantIdentifier />
      </div>
    </ProtectedRoute>
  );
}
