// src/hooks/useUserProjects.ts
import { useState, useEffect, useCallback } from 'react';
import { ProjectDTO } from '@/lib/types';
import { fetchUserProjects } from '@/lib/api';

export function useUserProjects() {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadUserProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchUserProjects();
            setProjects(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUserProjects();
    }, [loadUserProjects]);

    return {
        userProjects: projects,
        myProjectsLoading: isLoading,
        myProjectsError: error,
        refetchUserProjects: loadUserProjects,
    };
}
