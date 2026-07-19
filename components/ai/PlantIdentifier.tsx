"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Loader2, Sparkles, UploadCloud, AlertTriangle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useIdentifyPlant } from "@/hooks/useAI";
import { Badge } from "@/components/ui/Badge";

const fileToBase64 = (file: File): Promise<{ base64: string; mediaType: string }> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [meta, base64] = result.split(",");
      const mediaType = meta.match(/data:(.*);base64/)?.[1] || file.type;
      resolve({ base64, mediaType });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const PlantIdentifier = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const identify = useIdentifyPlant();

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    identify.reset();

    const { base64, mediaType } = await fileToBase64(file);
    identify.mutate({ imageBase64: base64, mediaType });
  };

  const handleListThisPlant = () => {
    if (!identify.data) return;
    const params = new URLSearchParams({
      title: identify.data.species.split("(")[0].trim(),
      toxicity: identify.data.toxicity,
      description: identify.data.summary,
    });
    router.push(`/plants/add?${params.toString()}`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div
        className="flex min-h-[280px] flex-col items-center justify-center rounded-card border-2 border-dashed border-moss/50 bg-moss/5 p-6 text-center transition-colors hover:border-moss"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
      >
        {preview ? (
          <div className="relative h-56 w-full overflow-hidden rounded-card">
            <Image src={preview} alt="Uploaded plant" fill className="object-contain" unoptimized />
          </div>
        ) : (
          <>
            <UploadCloud className="mb-3 text-moss" size={36} />
            <p className="font-medium text-ink">Drag & drop a plant photo</p>
            <p className="mt-1 text-sm text-ink/50">or choose a file below (JPEG, PNG, WEBP — max 5MB)</p>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />

        <div className="mt-4 flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={() => inputRef.current?.click()}>
            <Camera size={15} /> {preview ? "Choose another photo" : "Upload photo"}
          </Button>
        </div>
      </div>

      <div className="rounded-card border border-sand bg-white p-5">
        {identify.isPending && (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-ink/60">
            <Loader2 className="animate-spin text-canopy" size={26} />
            <p className="text-sm">Analyzing your photo…</p>
          </div>
        )}

        {identify.isError && (
          <div className="flex flex-col items-center justify-center gap-2 py-10 text-center text-clay">
            <AlertTriangle size={26} />
            <p className="text-sm">Couldn&apos;t identify that photo. Try a clearer, well-lit shot.</p>
          </div>
        )}

        {!identify.isPending && !identify.isError && !identify.data && (
          <div className="flex h-full flex-col items-center justify-center gap-2 py-10 text-center text-ink/40">
            <Sparkles size={26} />
            <p className="text-sm">Your plant&apos;s identification and care tips will appear here.</p>
          </div>
        )}

        {identify.data && (
          <div>
            <div className="flex items-center justify-between">
              <Badge tone={identify.data.confidence === "High" ? "canopy" : "clay"}>
                {identify.data.confidence} confidence
              </Badge>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-ink">{identify.data.species}</h3>
            <p className="mt-2 text-sm text-ink/70">{identify.data.summary}</p>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink/50">Care tips</p>
            <ul className="mt-2 space-y-1.5">
              {identify.data.careTips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink/70">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-moss" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2 text-xs text-ink/50">
              <span className="font-semibold text-ink/70">Toxicity:</span> {identify.data.toxicity}
            </div>

            <Button size="sm" className="mt-5 w-full" onClick={handleListThisPlant}>
              <PlusCircle size={15} /> List this plant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
