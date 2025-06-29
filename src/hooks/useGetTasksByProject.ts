// src/hooks/useGetTasksByProject.ts

import { useQuery } from '@tanstack/react-query';
import { fetchProjectTasks, fetchGenericProjectTasks } from '@/lib/api';
import type { TaskWithMetricsDTO, GenericTaskDTO } from '@/lib/types';

/**
 * Fetch all tasks for this project.
 * If owned, fetches tasks with metrics. If not owned, fetches generic tasks.
 * Returns { tasks, isLoading, error, refetch }.
 */
export function useGetTasksByProject(projectId: string, isOwned: boolean = true) {
  const {
    data: tasks,
    isLoading,
    error,
    refetch,
  } = useQuery<TaskWithMetricsDTO[] | GenericTaskDTO[], Error>({
    queryKey: ['tasks', projectId, isOwned],
    queryFn: () => (isOwned ? fetchProjectTasks(projectId) : fetchGenericProjectTasks(projectId)),
    enabled: Boolean(projectId),
    retry: false,
  });

  return { tasks, isLoading, error, refetch };
}
