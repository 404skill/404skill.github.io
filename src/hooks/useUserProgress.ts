
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Project, UserProgress } from "@/lib/types";
import { toast } from "sonner";

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

      // If no progress found, return empty array
      if (!progressData || progressData.length === 0) {
        setUserProjects([]);
        setLoading(false);
        return;
      }

      // Map progress data to projects
      const projectIds = progressData.map(progress => progress.project_id);
      
      // If no projects found, set empty array
      if (projectIds.length === 0) {
        setUserProjects([]);
        setLoading(false);
        return;
      }

      // In a real app, we'd fetch projects from Supabase
      // For now, we'll use the mock data and filter
      import("@/lib/data").then(({ projects }) => {
        const userProjectsData = projects.filter(project => 
          projectIds.includes(project.id)
        );
        
        // Enhance projects with progress data
        const enhancedProjects = userProjectsData.map(project => {
          const progress = progressData.find(p => p.project_id === project.id);
          return {
            ...project,
            progress: progress as UserProgress
          };
        });

        setUserProjects(enhancedProjects);
        setLoading(false);
      });
    } catch (err) {
      console.error("Error fetching user progress:", err);
      setError("Failed to load your projects");
      setLoading(false);
      toast.error("Failed to load your projects");
    }
  };

  const updateProjectProgress = async (
    projectId: string, 
    taskId: string, 
    status: 'passed' | 'failed' | 'not-attempted'
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
            // Set is_completed if all tasks are completed
            is_completed: false // Would need project tasks length to determine
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        // Insert new progress
        const { error } = await supabase
          .from('user_progress')
          .insert({
            user_id: userId,
            project_id: projectId,
            completed_tasks,
            started_at: new Date().toISOString(),
            last_updated_at: new Date().toISOString(),
            is_completed: false
          });

        if (error) throw error;
      }

      // Refresh user progress
      fetchUserProgress();
    } catch (err) {
      console.error("Error updating project progress:", err);
      toast.error("Failed to update project progress");
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
    refetch: fetchUserProgress
  };
};
