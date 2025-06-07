// src/hooks/useGetTasksByProject.ts

import { useQuery } from '@tanstack/react-query';
import { fetchProjectTasks } from '@/lib/api';
import type { TaskWithMetricsDTO } from '@/lib/types';

/**
 * Fetch all tasks (with metrics) for this project + user.
 * Returns { tasks, isLoading, error, refetch }.
 */
export function useGetTasksByProject(projectId: string) {
    const { data: tasks, isLoading, error, refetch } = useQuery<TaskWithMetricsDTO[], Error>({
        queryKey: ['tasksWithMetrics', projectId],
        queryFn: () => fetchProjectTasks(projectId),
        enabled: Boolean(projectId),
        retry: false,
    });

    return { tasks, isLoading, error, refetch };
}
