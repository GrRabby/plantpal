"use client";

import { useState } from "react";
import { Sparkles, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { useGenerateCareGuide } from "@/hooks/useAI";

interface Props {
  title: string;
  category: string;
  careDifficulty: string;
  lightRequirement?: string;
  onGenerated: (text: string) => void;
}

export const CareGuideGenerator = ({ title, category, careDifficulty, lightRequirement, onGenerated }: Props) => {
  const [length, setLength] = useState<"short" | "detailed">("detailed");
  const generate = useGenerateCareGuide();

  const canGenerate = Boolean(title && category && careDifficulty);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    const result = await generate.mutateAsync({ title, category, careDifficulty, lightRequirement, length });
    onGenerated(result.careGuide);
  };

  return (
    <div className="rounded-card border border-moss/30 bg-moss/5 p-4">
      <div className="flex items-center gap-2 text-moss">
        <Sparkles size={16} />
        <p className="text-sm font-semibold text-canopy">AI Care Guide Generator</p>
      </div>
      <p className="mt-1 text-xs text-ink/60">
        Fill in the plant name, category, and care difficulty above, then generate a full care
        description automatically.
      </p>

      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <Select value={length} onChange={(e) => setLength(e.target.value as "short" | "detailed")} className="sm:w-40">
          <option value="short">Short</option>
          <option value="detailed">Detailed</option>
        </Select>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={!canGenerate}
          loading={generate.isPending}
          onClick={handleGenerate}
          className="sm:flex-1"
        >
          {generate.isSuccess ? <RefreshCcw size={15} /> : <Sparkles size={15} />}
          {generate.isSuccess ? "Regenerate" : "Generate care guide"}
        </Button>
      </div>

      {!canGenerate && (
        <p className="mt-2 text-xs text-clay">Add a title, category, and care difficulty first.</p>
      )}
      {generate.isError && (
        <p className="mt-2 text-xs text-clay">Couldn&apos;t generate a guide — try again.</p>
      )}
    </div>
  );
};
