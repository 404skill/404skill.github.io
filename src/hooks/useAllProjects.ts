// src/hooks/useAllProjects.ts
import { useState, useEffect, useCallback } from 'react';
import { fetchAllProjects } from '@/lib/api';
import { ProjectDTO } from '@/lib/types';

export function useAllProjects() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchAllProjects();
      setProjects(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    allProjects: projects,
    allLoading: isLoading,
    allError: error,
    refetchAllProjects: loadProjects,
  };
}
