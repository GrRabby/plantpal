"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Field";
import { CareGuideGenerator } from "@/components/ai/CareGuideGenerator";
import { useCreatePlant } from "@/hooks/usePlants";
import { categories, careDifficulties, lightRequirements } from "@/lib/utils";

function AddPlantForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createPlant = useCreatePlant();

  const [form, setForm] = useState({
    title: searchParams.get("title") || "",
    shortDescription: "",
    fullDescription: searchParams.get("description") || "",
    price: "",
    category: "Indoor",
    careDifficulty: "Easy",
    lightRequirement: "Medium",
    waterFrequency: "Weekly",
    toxicity: searchParams.get("toxicity") || "Unknown",
    imageUrl: "",
    location: "",
  });
  const [error, setError] = useState("");

  const update = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.shortDescription || !form.fullDescription || !form.price || !form.location) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const plant = await createPlant.mutateAsync({
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        price: Number(form.price),
        category: form.category as never,
        careDifficulty: form.careDifficulty as never,
        lightRequirement: form.lightRequirement as never,
        waterFrequency: form.waterFrequency,
        toxicity: form.toxicity as never,
        images: form.imageUrl ? [form.imageUrl] : [],
        location: form.location,
        aiGenerated: false,
      });
      router.push(`/plants/${plant._id}`);
    } catch {
      setError("Something went wrong while creating your listing. Please try again.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="nursery-tag text-moss">Sell on PlantPal</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-ink">List a plant</h1>
        <p className="mt-2 text-ink/60">
          Add the details below, or generate a care guide automatically with AI once you&apos;ve filled in
          the basics.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" value={form.title} onChange={(e) => update({ title: e.target.value })} placeholder="e.g. Monstera Deliciosa" />
          </div>
          <div>
            <Label htmlFor="price">Price (USD) *</Label>
            <Input id="price" type="number" min={0} value={form.price} onChange={(e) => update({ price: e.target.value })} placeholder="35" />
          </div>
        </div>

        <div>
          <Label htmlFor="shortDescription">Short description *</Label>
          <Input
            id="shortDescription"
            value={form.shortDescription}
            onChange={(e) => update({ shortDescription: e.target.value })}
            placeholder="One line that sums it up — shown on the plant card"
            maxLength={200}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select id="category" value={form.category} onChange={(e) => update({ category: e.target.value })}>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="careDifficulty">Care difficulty *</Label>
            <Select id="careDifficulty" value={form.careDifficulty} onChange={(e) => update({ careDifficulty: e.target.value })}>
              {careDifficulties.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="lightRequirement">Light requirement</Label>
            <Select id="lightRequirement" value={form.lightRequirement} onChange={(e) => update({ lightRequirement: e.target.value })}>
              {lightRequirements.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Label htmlFor="waterFrequency">Water frequency</Label>
            <Input id="waterFrequency" value={form.waterFrequency} onChange={(e) => update({ waterFrequency: e.target.value })} placeholder="Weekly" />
          </div>
          <div>
            <Label htmlFor="toxicity">Pet toxicity</Label>
            <Select id="toxicity" value={form.toxicity} onChange={(e) => update({ toxicity: e.target.value })}>
              <option value="Unknown">Unknown</option>
              <option value="Pet-Safe">Pet-Safe</option>
              <option value="Toxic to Pets">Toxic to Pets</option>
            </Select>
          </div>
          <div>
            <Label htmlFor="location">Location *</Label>
            <Input id="location" value={form.location} onChange={(e) => update({ location: e.target.value })} placeholder="Portland, OR" />
          </div>
        </div>

        <div>
          <Label htmlFor="imageUrl">Image URL (optional)</Label>
          <Input id="imageUrl" value={form.imageUrl} onChange={(e) => update({ imageUrl: e.target.value })} placeholder="https://…" />
        </div>

        <CareGuideGenerator
          title={form.title}
          category={form.category}
          careDifficulty={form.careDifficulty}
          lightRequirement={form.lightRequirement}
          onGenerated={(text) => update({ fullDescription: text })}
        />

        <div>
          <Label htmlFor="fullDescription">Full description *</Label>
          <Textarea
            id="fullDescription"
            value={form.fullDescription}
            onChange={(e) => update({ fullDescription: e.target.value })}
            placeholder="Care instructions, growth habits, anything a buyer should know…"
            className="min-h-[160px]"
          />
        </div>

        {error && <p className="text-sm text-clay">{error}</p>}

        <div className="flex justify-end">
          <Button type="submit" loading={createPlant.isPending}>
            <PlusCircle size={16} /> Submit listing
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function AddPlantPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={null}>
        <AddPlantForm />
      </Suspense>
    </ProtectedRoute>
  );
}
