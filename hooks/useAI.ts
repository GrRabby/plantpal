"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import type { IdentificationResult } from "@/lib/types";

interface CareGuideInput {
  title: string;
  category: string;
  careDifficulty: string;
  lightRequirement?: string;
  length: "short" | "detailed";
}

export const useGenerateCareGuide = () => {
  return useMutation({
    mutationFn: (input: CareGuideInput) =>
      apiRequest<{ careGuide: string }>("/api/ai/care-guide", { method: "POST", body: input }),
  });
};

export const useIdentifyPlant = () => {
  return useMutation({
    mutationFn: (input: { imageBase64: string; mediaType: string }) =>
      apiRequest<IdentificationResult>("/api/ai/identify", { method: "POST", body: input }),
  });
};

export const useIdentificationHistory = (enabled: boolean) => {
  return useQuery({
    queryKey: ["identify", "history"],
    queryFn: () => apiRequest<IdentificationResult[]>("/api/ai/identify/history"),
    enabled,
  });
};
