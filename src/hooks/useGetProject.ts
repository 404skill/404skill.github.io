// src/hooks/useGetProject.ts

import { useQuery } from '@tanstack/react-query';
import { fetchProject } from '@/lib/api';
import type { ProjectDTO } from '@/lib/types';

/**
 * Fetch a single project by ID.
 * Returns { project, isLoading, error, refetch }.
 */
export function useGetProject(projectId: string) {
    const { data: project, isLoading, error, refetch } = useQuery<ProjectDTO, Error>({
        queryKey: ['project', projectId],
        queryFn: () => fetchProject(projectId),
        enabled: Boolean(projectId),
        retry: false, // optional
    });

    return { project, isLoading, error, refetch };
}
