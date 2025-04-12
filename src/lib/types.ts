
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tasks: Task[];
  technologies: string[];
  templateUrl: string;
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
  userId: string;
  projectId: string;
  completedTasks: string[];
  startedAt: string;
  lastUpdatedAt: string;
  isCompleted: boolean;
}
