// src/hooks/useGetTestsByTaskForProject.ts

import { useQuery } from '@tanstack/react-query';
import { fetchTestsByTaskForProject } from '@/lib/api';
import type { TestsByTaskDTO } from '@/lib/types';

/**
 * Fetch all tests grouped by task for this project + user.
 * Returns { testsByTask, isLoading, error, refetch }.
 */
export function useGetTestsByTaskForProject(projectId: string) {
    const { data: testsByTask, isLoading, error, refetch } = useQuery<TestsByTaskDTO[], Error>({
        queryKey: ['testsByTask', projectId],
        queryFn: () => fetchTestsByTaskForProject(projectId),
        enabled: Boolean(projectId),
        retry: false,
    });

    return { testsByTask, isLoading, error, refetch };
}
