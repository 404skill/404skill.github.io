// src/api.ts

import axios from 'axios';
import {
  ProjectDTO,
  ProjectMetricsDTO,
  TaskWithMetricsDTO,
  TestsByTaskDTO,
} from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

api.interceptors.request.use((config) => {
  const token = JSON.parse(
      localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token') || '{}'
  )?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Fetch all available projects (public)
export const fetchAllProjects = async (): Promise<ProjectDTO[]> => {
  const res = await api.get<ProjectDTO[]>('/projects');
  return res.data;
};

export const fetchProject = async (projectId: string): Promise<ProjectDTO> => {
  const res = await api.get<ProjectDTO>(`/projects/${projectId}`);
  return res.data;
};

// 2. Fetch “my” (authenticated user’s) projects
export const fetchUserProjects = async (): Promise<ProjectDTO[]> => {
  const res = await api.get<ProjectDTO[]>('/me/projects');
  return res.data;
};

// 3. Fetch completion summary for all my projects
export const fetchAllProjectsCompletion = async (): Promise<ProjectMetricsDTO[]> => {
  const res = await api.get<ProjectMetricsDTO[]>('/me/projects/completion');
  return res.data;
};

// 4. Fetch completion summary for one specific project
export const fetchProjectCompletion = async (
    projectId: string
): Promise<ProjectMetricsDTO> => {
  const res = await api.get<ProjectMetricsDTO>(`/me/projects/${projectId}/completion`);
  return res.data;
};

// 5. Fetch all tasks (with per-task metrics) under one project
export const fetchProjectTasks = async (
    projectId: string
): Promise<TaskWithMetricsDTO[]> => {
  const res = await api.get<TaskWithMetricsDTO[]>(`/projects/${projectId}/tasks`);
  return res.data;
};

// 6. Fetch all tests in a project, grouped by task (with per-test status & per-task aggregates)
export const fetchTestsByTaskForProject = async (
    projectId: string
): Promise<TestsByTaskDTO[]> => {
  const res = await api.get<TestsByTaskDTO[]>(`/projects/${projectId}/tests`);
  return res.data;
};

export const fetchProjectVariants = async (projectId: string): Promise<any> => {
  const res = await api.get<any>(`/projects/${projectId}/variants`);
  return res.data;
};