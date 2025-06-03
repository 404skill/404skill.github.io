
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tasks: Task[];
  technologies: string[];
  templateUrl: string;
  progress?: UserProgress;
}

export interface UserProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  type: string;
  estimatedDurationMinutes: number;
  accessTier: string;
  repoUrl: string;
  assignedAt: string;
  completedAt?: string | null;
  status: 'in_progress' | 'completed';
  tasks: Task[];
  technologies: string[];
  templateUrl: string;
  progress?: UserProgress;
  passed?: number;
  total?: number;
}

export interface ProfileTest {
  id: string;
  createdAt: string;
  profileId: string;
  testId: string;
  passed: boolean;
  lastRun: string | null;
  lastPass: string | null;
  testName: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface Test {
  id: string;
  name: string;
  description: string;
}

export interface TestResult {
  taskId: string;
  projectId: string;
  status: 'passed' | 'failed' | 'not-attempted';
  timestamp: string;
  errorMessage?: string;
  name: string;
}

export interface HelpRequest {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  type: 'help' | 'code-review';
  description: string;
  codeSnippet?: string;
  status: 'pending' | 'in-progress' | 'resolved';
  timestamp: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  project_id: string;
  completed_tasks: string[];
  started_at: string;
  last_updated_at: string;
  is_completed: boolean;
}

export interface ProjectCompletion {
  passed: number;
  total: number;
}
