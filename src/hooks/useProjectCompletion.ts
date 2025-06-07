// src/hooks/useProjectCompletion.ts

import { useQuery } from '@tanstack/react-query';
import { fetchProjectCompletion } from '@/lib/api';
import type { ProjectMetricsDTO } from '@/lib/types';

/**
 * Fetch completion summary for a project.
 * Returns { metrics, isLoading, error, refetch }.
 */
export function useProjectCompletion(projectId: string) {
  const { data: metrics, isLoading, error, refetch } = useQuery<ProjectMetricsDTO, Error>({
    queryKey: ['projectCompletion', projectId],
    queryFn: () => fetchProjectCompletion(projectId),
    enabled: Boolean(projectId),
    retry: false,
  });

  return { metrics, isLoading, error, refetch };
}
