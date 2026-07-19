"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";
import type { Review } from "@/lib/types";

export const useReviews = (plantId: string) => {
  return useQuery({
    queryKey: ["reviews", plantId],
    queryFn: () => apiRequest<Review[]>(`/api/plants/${plantId}/reviews`),
    enabled: Boolean(plantId),
  });
};

export const useCreateReview = (plantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { rating: number; comment: string }) =>
      apiRequest<Review>(`/api/plants/${plantId}/reviews`, { method: "POST", body: input }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", plantId] });
      queryClient.invalidateQueries({ queryKey: ["plant", plantId] });
    },
  });
};

export const useDeleteReview = (plantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) =>
      apiRequest<{ id: string }>(`/api/plants/${plantId}/reviews/${reviewId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", plantId] });
      queryClient.invalidateQueries({ queryKey: ["plant", plantId] });
    },
  });
};
