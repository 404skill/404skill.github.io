import axios from 'axios';
import { Project, TestResult, Task, Test, ProfileTest, ProjectCompletion } from './types';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use(config => {
  const token = JSON.parse(
    localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token') || '{}',
  )?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchAllProjects = async (): Promise<Project[]> => {
  const res = await api.get('/projects');
  return res.data;
};

export const fetchProject = async (id: string): Promise<Project> => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const fetchUserProjects = async (id: string): Promise<Project[]> => {
  const res = await api.get(`/profile-projects/with-projects`);
  return res.data;
};

export const fetchProjectTasks = async (projectId: string): Promise<Task[]> => {
  const res = await api.get(`/projects/${projectId}/tasks`);
  return res.data;
};

export const fetchProjectTests = async (projectId: string): Promise<Test[]> => {
  const res = await api.get(`/projects/${projectId}/tests`);
  return res.data;
};

export const fetchTaskTests = async (taskId: string): Promise<Test[]> => {
  const res = await api.get(`/tasks/${taskId}/tests`);
  return res.data;
};

export const fetchProjectTestResults = async (projectId: string): Promise<ProfileTest[]> => {
  const res = await api.get(`/projects/${projectId}/profile-tests`);
  return res.data;
};

export const fetchProjectCompletion = async (projectId: string): Promise<ProjectCompletion> => {
  const res = await api.get(`/projects/${projectId}/completion`);
  return res.data;
};
