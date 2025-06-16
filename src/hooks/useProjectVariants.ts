import {useQuery} from "@tanstack/react-query";
import {fetchProjectVariants} from "@/lib/api.ts";

export function useProjectVariants(projectId: string) {
    const { data: projectVariants, isLoading, error, refetch } = useQuery<any[]>({
        queryKey: ['projectVariants', projectId],
        queryFn: () => fetchProjectVariants(projectId),
        enabled: Boolean(projectId),
        retry: false,
    });

    return { projectVariants, isLoading, error, refetch };
}
