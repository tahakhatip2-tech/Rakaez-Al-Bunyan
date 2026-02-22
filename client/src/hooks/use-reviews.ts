import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type ReviewInput } from "@shared/routes";

export function useReviews() {
  return useQuery({
    queryKey: [api.reviews.list.path],
    queryFn: async () => {
      const res = await fetch(api.reviews.list.path);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return api.reviews.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: ReviewInput) => {
      const res = await fetch(api.reviews.create.path, {
        method: api.reviews.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create review");
      return api.reviews.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.reviews.list.path] }),
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.reviews.delete.path, { id });
      const res = await fetch(url, { method: api.reviews.delete.method });
      if (!res.ok) throw new Error("Failed to delete review");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.reviews.list.path] }),
  });
}
