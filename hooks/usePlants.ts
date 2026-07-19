"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import type { Plant, PlantListResponse } from "@/lib/types";

export interface PlantFilters {
  search?: string;
  category?: string;
  careDifficulty?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  page?: number;
  limit?: number;
}

export const usePlants = (filters: PlantFilters) => {
  return useQuery({
    queryKey: ["plants", filters],
    queryFn: () => apiRequest<PlantListResponse>("/api/plants", { query: { ...filters } }),
  });
};

export const usePlant = (id: string) => {
  return useQuery({
    queryKey: ["plant", id],
    queryFn: () => apiRequest<{ plant: Plant; related: Plant[] }>(`/api/plants/${id}`),
    enabled: Boolean(id),
  });
};

export const useMyPlants = () => {
  return useQuery({
    queryKey: ["plants", "mine"],
    queryFn: () => apiRequest<Plant[]>("/api/plants/mine"),
  });
};

export type CreatePlantInput = Omit<
  Plant,
  "_id" | "sellerId" | "sellerName" | "status" | "rating" | "reviewCount" | "createdAt" | "updatedAt"
>;

export const useCreatePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<CreatePlantInput>) =>
      apiRequest<Plant>("/api/plants", { method: "POST", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};

export const useUpdatePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: Partial<Plant> }) =>
      apiRequest<Plant>(`/api/plants/${id}`, { method: "PATCH", body: input }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
      queryClient.invalidateQueries({ queryKey: ["plant", variables.id] });
    },
  });
};

export const useDeletePlant = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRequest<{ id: string }>(`/api/plants/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
};
