import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type PartnerInput } from "@shared/routes";

export function usePartners() {
  return useQuery({
    queryKey: [api.partners.list.path],
    queryFn: async () => {
      const res = await fetch(api.partners.list.path);
      if (!res.ok) throw new Error("Failed to fetch partners");
      return api.partners.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: PartnerInput) => {
      const res = await fetch(api.partners.create.path, {
        method: api.partners.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create partner");
      return api.partners.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.partners.list.path] }),
  });
}

export function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.partners.delete.path, { id });
      const res = await fetch(url, { method: api.partners.delete.method });
      if (!res.ok) throw new Error("Failed to delete partner");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.partners.list.path] }),
  });
}
