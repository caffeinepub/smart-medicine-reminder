import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useActor } from "./useActor";

export interface UserProfile {
  name: string;
  age: bigint;
  gender: string;
  locality: string;
  photoUrl: string;
  lastUpdated: bigint;
}

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | undefined>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return undefined;
      try {
        return (await (actor as any).getProfile()) as UserProfile | undefined;
      } catch {
        return undefined;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await (actor as any).updateProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
    },
    onError: () => toast.error("Failed to update profile"),
  });
}
