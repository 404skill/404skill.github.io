export interface User {
  id: string;
  name: string;
  email: string;
}
//
// export interface Project {
//   id: string;
//   title: string;
//   description: string;
//   difficulty: 'easy' | 'medium' | 'hard';
//   tasks: Task[];
//   technologies: string[];
//   templateUrl: string;
//   progress?: UserProgress;
// }
//
// export interface UserProject {
//   id: string;
//   title: string;
//   description: string;
//   difficulty: 'easy' | 'medium' | 'hard';
//   language: string;
//   type: string;
//   estimatedDurationMinutes: number;
//   accessTier: string;
//   repoUrl: string;
//   assignedAt: string;
//   completedAt?: string | null;
//   status: 'in_progress' | 'completed';
//   tasks: Task[];
//   technologies: string[];
//   templateUrl: string;
//   progress?: UserProgress;
//   passed?: number;
//   total?: number;
// }
//
// export interface ProfileTest {
//   id: string;
//   createdAt: string;
//   profileId: string;
//   testId: string;
//   passed: boolean;
//   lastRun: string | null;
//   lastPass: string | null;
//   testName: string;
// }
//
// export interface Task {
//   id: string;
//   name: string;
//   description: string;
//   tests: Test[];
// }
//
// export interface Test {
//   id: string;
//   name: string;
//   description: string;
// }
//
export interface TestResult {
  taskId: string;
  projectId: string;
  status: 'passed' | 'failed' | 'not-attempted';
  timestamp: string;
  errorMessage?: string;
  name: string;
  testId: string;
}
//
// export interface HelpRequest {
//   id: string;
//   userId: string;
//   projectId: string;
//   taskId?: string;
//   type: 'help' | 'code-review';
//   description: string;
//   codeSnippet?: string;
//   status: 'pending' | 'in-progress' | 'resolved';
//   timestamp: string;
// }
//
// export interface UserProgress {
//   id: string;
//   user_id: string;
//   project_id: string;
//   completed_tasks: string[];
//   started_at: string;
//   last_updated_at: string;
//   is_completed: boolean;
// }
//
export interface ProjectCompletion {
  passed: number;
  total: number;
}

// src/types.ts

//
// 1. Project-level DTO returned by GET /projects and GET /me/projects
//
export interface ProjectDTO {
  projectId: string;                  // UUID
  name: string;                       // project name
  description: string;                // project description (Markdown or HTML)
  difficulty: 'easy' | 'medium' | 'hard';
  language: string;                   // e.g. "java", "javascript"
  repoUrl: string | null;             // repo_url field
  type: string;                       // e.g. "backend", "frontend", "fullstack"
  estimatedDurationMinutes: number;   // estimated_duration_minutes
  accessTier: string;                 // access_tier field
  createdAt: string;                  // ISO timestamp
  updatedAt: string;                  // ISO timestamp
}

//
// 2. ProjectCompletion summary returned by
//    GET /me/projects/completion  (array of these)
//    GET /me/projects/{projectId}/completion  (single object)
//
export interface ProjectMetricsDTO {
  projectId: string;         // UUID
  projectName: string;       // name of the project
  totalTests: number;        // total tests in this project
  passedTests: number;       // how many tests the user passed
  failedTests: number;       // how many tests the user failed
  notRunTests: number;       // totalTests - passedTests - failedTests
  hasAccess?: boolean;
}

//
// 3. TaskWithMetricsDTO returned by GET /projects/{projectId}/tasks
//
export interface TaskWithMetricsDTO {
  taskId: string;            // UUID
  taskName: string;          // name of the task
  description: string;       // description of the task
  totalTests: number;        // total number of tests under this task
  passedTests: number;       // how many the user passed under this task
  failedTests: number;       // how many the user failed under this task
  notRunTests: number;       // totalTests - passedTests - failedTests
}

//
// 4. TestStatusDTO returned as part of TestsByTaskDTO
//
export interface TestStatusDTO {
  testId: string;       // UUID
  testName: string;     // name of the test
  description: string | null; // description of the test
  // status can be "passed", "failed", or null if not run
  status: 'passed' | 'failed' | null;
  lastRun: string | null;
}

//
// 5. TestsByTaskDTO returned by GET /projects/{projectId}/tests
//    This groups tests under their parent task, and also includes aggregate counts per task.
//
export interface TestsByTaskDTO {
  taskId: string;                // UUID of the task
  taskName: string;              // name of the task
  tests: TestStatusDTO[];        // array of all tests under that task
  totalTests: number;            // count of tests.length
  passedTests: number;           // how many the user passed under that task
  failedTests: number;           // how many the user failed under that task
  notRunTests: number;           // totalTests - passedTests - failedTests
}
