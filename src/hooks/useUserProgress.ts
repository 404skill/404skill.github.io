import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Project, UserProgress } from '@/lib/types';
import { toast } from 'sonner';

export const useUserProgress = (userId: string | null) => {
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProgress = async () => {
    if (!userId) {
      setLoading(false);
      setUserProjects([]);
      return;
    }

    try {
      setLoading(true);

      // Fetch user progress from Supabase
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (progressError) {
        throw progressError;
      }

      // Fetch all projects
      import('@/lib/data').then(({ projects }) => {
        // If no progress data, show all projects with zero progress
        if (!progressData || progressData.length === 0) {
          const projectsWithZeroProgress = projects.map(project => ({
            ...project,
            progress: {
              id: '',
              user_id: userId,
              project_id: project.id,
              completed_tasks: [],
              started_at: null,
              last_updated_at: null,
              is_completed: false,
            } as UserProgress,
          }));

          setUserProjects(projectsWithZeroProgress);
          setLoading(false);
          return;
        }

        // If we have progress data, enhance projects with it
        const enhancedProjects = projects.map(project => {
          const progress = progressData.find(p => p.project_id === project.id);

          if (progress) {
            return {
              ...project,
              progress: progress as UserProgress,
            };
          }

          // For projects without progress data, add zero progress
          return {
            ...project,
            progress: {
              id: '',
              user_id: userId,
              project_id: project.id,
              completed_tasks: [],
              started_at: null,
              last_updated_at: null,
              is_completed: false,
            } as UserProgress,
          };
        });

        setUserProjects(enhancedProjects);
        setLoading(false);
      });
    } catch (err) {
      console.error('Error fetching user progress:', err);
      setError('Failed to load your projects');
      setLoading(false);
      toast.error('Failed to load your projects');
    }
  };

  const updateProjectProgress = async (
    projectId: string,
    taskId: string,
    status: 'passed' | 'failed' | 'not-attempted',
  ) => {
    if (!userId) return;

    try {
      // First, check if a progress record exists
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('project_id', projectId)
        .single();

      let completed_tasks = existingProgress?.completed_tasks || [];

      // Update completed tasks based on status
      if (status === 'passed' && !completed_tasks.includes(taskId)) {
        completed_tasks = [...completed_tasks, taskId];
      } else if (status !== 'passed' && completed_tasks.includes(taskId)) {
        completed_tasks = completed_tasks.filter(id => id !== taskId);
      }

      if (existingProgress) {
        // Update existing progress
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed_tasks,
            last_updated_at: new Date().toISOString(),
            // Calculate if project is completed
            is_completed: false, // We would need project tasks length to properly determine this
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Insert new progress
        const { error } = await supabase.from('user_progress').insert({
          user_id: userId,
          project_id: projectId,
          completed_tasks,
          started_at: new Date().toISOString(),
          last_updated_at: new Date().toISOString(),
          is_completed: false,
        });

        if (error) throw error;
      }

      // Refresh user progress
      fetchUserProgress();

      // Track analytics for task completion
      if (status === 'passed') {
        try {
          await supabase.from('user_events').insert([
            {
              event_type: 'task_completed',
              user_id: userId,
              component: 'ProgressTracker',
              page_path: window.location.pathname,
              event_data: { projectId, taskId },
            },
          ]);
        } catch (analyticsError) {
          console.error('Error tracking task completion:', analyticsError);
        }
      }
    } catch (err) {
      console.error('Error updating project progress:', err);
      toast.error('Failed to update project progress');
    }
  };

  const calculateCompletion = (projectId: string, tasks: { id: string }[]) => {
    const project = userProjects.find(p => p.id === projectId);
    if (!project || !project.progress) return 0;

    const { completed_tasks } = project.progress;
    return tasks.length > 0 ? (completed_tasks.length / tasks.length) * 100 : 0;
  };

  useEffect(() => {
    fetchUserProgress();
  }, [userId]);

  return {
    userProjects,
    loading,
    error,
    updateProjectProgress,
    calculateCompletion,
    refetch: fetchUserProgress,
  };
};
