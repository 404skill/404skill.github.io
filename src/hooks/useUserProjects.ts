import { useState, useEffect } from 'react';
import { ProjectDTO } from '@/lib/types';
import { fetchUserProjects } from '@/lib/api';

export function useUserProjects() {
    const [projects, setProjects] = useState<ProjectDTO[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setIsLoading(true);
        fetchUserProjects()
            .then((data) => setProjects(data))
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
    }, []);

    return { userProjects: projects, myProjectsLoading: isLoading, myProjectsError: error };
}
