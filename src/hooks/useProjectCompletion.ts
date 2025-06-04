// src/hooks/useProjectCompletion.ts
import { useEffect, useState } from 'react';
import { fetchProjectCompletion } from '@/lib/api'; // your helper

interface Completion {
  passed: number;
  total: number;
}

export function useProjectCompletion(projectId: string | null) {
  const [completion, setCompletion] = useState<Completion>({ passed: 0, total: 0 });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!projectId) return;
    let isActive = true;
    setLoading(true);

    fetchProjectCompletion(projectId)
      .then((data: Completion) => {
        if (isActive) {
          setCompletion({ passed: data.passed, total: data.total });
        }
      })
      .catch(err => {
        console.error('Failed to fetch completion for', projectId, err);
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [projectId]);

  return { completion, loading };
}
