// src/hooks/useGetTestsByTaskForProject.ts

import { useQuery } from '@tanstack/react-query';
import { fetchTestsByTaskForProject, fetchGenericTestsByTaskForProject } from '@/lib/api';
import type { TestsByTaskDTO, GenericTestsByTaskDTO } from '@/lib/types';

/**
 * Fetch all tests grouped by task for this project.
 * If owned, fetches tests with status. If not owned, fetches generic tests.
 * Returns { testsByTask, isLoading, error, refetch }.
 */
export function useGetTestsByTaskForProject(projectId: string, isOwned: boolean = true) {
  const {
    data: testsByTask,
    isLoading,
    error,
    refetch,
  } = useQuery<TestsByTaskDTO[] | GenericTestsByTaskDTO[], Error>({
    queryKey: ['testsByTask', projectId, isOwned],
    queryFn: () =>
      isOwned
        ? fetchTestsByTaskForProject(projectId)
        : fetchGenericTestsByTaskForProject(projectId),
    enabled: Boolean(projectId),
    retry: false,
  });

  return { testsByTask, isLoading, error, refetch };
}
