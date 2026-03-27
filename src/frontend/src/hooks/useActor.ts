import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import type { backendInterface } from "../backend";
import { createActorWithConfig } from "../config";
import { getSecretParameter } from "../utils/urlParams";
import { useAuth } from "./AuthContext";
import { useInternetIdentity } from "./useInternetIdentity";

const ACTOR_QUERY_KEY = "actor";
export function useActor() {
  const { identity: iiIdentity } = useInternetIdentity();
  const { passwordIdentity } = useAuth();
  const queryClient = useQueryClient();

  // Use II identity if available, otherwise fall back to password identity
  const activeIdentity = iiIdentity ?? passwordIdentity ?? null;

  const actorQuery = useQuery<backendInterface>({
    queryKey: [
      ACTOR_QUERY_KEY,
      activeIdentity?.getPrincipal().toString() ?? "anonymous",
    ],
    queryFn: async () => {
      if (!activeIdentity) {
        return await createActorWithConfig();
      }

      const actorOptions = {
        agentOptions: {
          identity: activeIdentity,
        },
      };

      const actor = await createActorWithConfig(actorOptions);
      const adminToken = getSecretParameter("caffeineAdminToken") || "";
      await actor._initializeAccessControlWithSecret(adminToken);
      return actor;
    },
    staleTime: Number.POSITIVE_INFINITY,
    enabled: true,
  });

  useEffect(() => {
    if (actorQuery.data) {
      queryClient.invalidateQueries({
        predicate: (query) => !query.queryKey.includes(ACTOR_QUERY_KEY),
      });
      queryClient.refetchQueries({
        predicate: (query) => !query.queryKey.includes(ACTOR_QUERY_KEY),
      });
    }
  }, [actorQuery.data, queryClient]);

  return {
    actor: actorQuery.data || null,
    isFetching: actorQuery.isFetching,
  };
}
