
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

export interface Task {
  id: string;
  name: string;
  description: string;
}

export interface TestResult {
  taskId: string;
  projectId: string;
  userId: string;
  status: 'passed' | 'failed' | 'not-attempted';
  timestamp: string;
  errorMessage?: string;
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
