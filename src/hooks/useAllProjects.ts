// src/hooks/useAllProjects.ts
import { useState, useEffect } from 'react';
import { fetchAllProjects } from '@/lib/api';
import { ProjectDTO } from '@/lib/types';

export function useAllProjects() {
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetchAllProjects()
        .then((data) => setProjects(data))
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
  }, []);

  return { allProjects: projects, allLoading: isLoading, allError: error };
}
