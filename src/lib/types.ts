export interface User {
  id: string;
  name: string;
  email: string;
}

export interface TestResult {
  taskId: string;
  projectId: string;
  status: 'passed' | 'failed' | 'not-attempted';
  timestamp: string;
  errorMessage?: string;
  name: string;
  testId: string;
}

export interface ProjectDTO {
  projectId: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;
  repoUrl: string | null;
  type: string;
  estimatedDurationMinutes: number;
  accessTier: string;
  createdAt: string;
  updatedAt: string;
  technologies: string;
  lastRan: string;
  isOwned?: boolean;
  shortDescription: string;
}

export type Variant = ProjectDTO & { techs: string[] };

export interface GroupedProject {
  key: string;
  variants: Variant[];
  selected: Variant;
}

export interface ProjectMetricsDTO {
  projectId: string;
  projectName: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  notRunTests: number;
  hasAccess?: boolean;
}

export interface TaskWithMetricsDTO {
  taskId: string;
  taskName: string;
  description: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  notRunTests: number;
  position?: number;
}

export interface TestStatusDTO {
  testId: string;
  testName: string;
  description: string | null;
  status: 'passed' | 'failed' | null;
  lastRun: string | null;
}

export interface TestsByTaskDTO {
  taskId: string;
  taskName: string;
  tests: TestStatusDTO[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  notRunTests: number;
}

export interface GenericTaskDTO {
  taskId: string;
  taskName: string;
  description: string;
  position: number;
  totalTests: number;
}

export interface GenericTestDTO {
  testId: string;
  testName: string;
  description: string | null;
}

export interface GenericTestsByTaskDTO {
  taskId: string;
  taskName: string;
  tests: GenericTestDTO[];
  totalTests: number;
  position: number;
}
