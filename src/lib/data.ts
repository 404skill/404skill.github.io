import { Project, TestResult, UserProgress } from './types';

export const projects: Project[] = [
  {
    id: 'library_management',
    title: 'Library Management System',
    description: 'Build a backend system that manages a library\'s collection and handles user memberships, borrowing, and a promotion system.',
    difficulty: 'medium',
    tasks: [
      { 
        id: 't1', 
        name: 'Storing Users', 
        description: 'Create a data model and endpoints for storing user information with different membership levels.' 
      },
      { 
        id: 't2', 
        name: 'Creating Items', 
        description: 'Define and manage library items (books, magazines, DVDs) with proper data models and endpoints.' 
      },
      { 
        id: 't3', 
        name: 'Borrowing & Returning', 
        description: 'Implement the core library functionality for borrowing and returning items with membership limits.' 
      },
      { 
        id: 't4', 
        name: 'Adding Music CDs', 
        description: 'Extend your catalog by introducing music CDs as a new item type with appropriate borrowing rules.' 
      },
      { 
        id: 't5', 
        name: 'Promotion System', 
        description: 'Add a promotion feature that rewards avid readers by doubling their book borrowing limit.' 
      },
    ],
    technologies: [],
    templateUrl: '/templates/library-management.zip',
  },
];

export const mockTestResults: TestResult[] = [
  {
    taskId: 't1',
    projectId: 'library_management',
    userId: 'user123',
    status: 'not-attempted',
    timestamp: new Date().toISOString(),
  },
  {
    taskId: 't2',
    projectId: 'library_management',
    userId: 'user123',
    status: 'not-attempted',
    timestamp: new Date().toISOString(),
  },
  {
    taskId: 't3',
    projectId: 'library_management',
    userId: 'user123',
    status: 'not-attempted',
    timestamp: new Date().toISOString(),
  },
  {
    taskId: 't4',
    projectId: 'library_management',
    userId: 'user123',
    status: 'not-attempted',
    timestamp: new Date().toISOString(),
  },
  {
    taskId: 't5',
    projectId: 'library_management',
    userId: 'user123',
    status: 'not-attempted',
    timestamp: new Date().toISOString(),
  },
];

export const mockUserProgress: UserProgress[] = [
  {
    id: 'progress1',
    user_id: 'user123',
    project_id: 'library_management',
    completed_tasks: [],
    started_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
    is_completed: false,
  },
];

export const getProject = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

export const getUserProjects = (userId: string): Project[] => {
  // Get project IDs from user progress
  const projectIds = mockUserProgress
    .filter(progress => progress.user_id === userId)
    .map(progress => progress.project_id);
  
  // Return only projects that the user has started
  return projects.filter(project => projectIds.includes(project.id));
};

export const getProjectProgress = (userId: string, projectId: string): UserProgress | undefined => {
  return mockUserProgress.find(
    progress => progress.user_id === userId && progress.project_id === projectId
  );
};

export const getTaskResults = (userId: string, projectId: string): TestResult[] => {
  return mockTestResults.filter(
    result => result.userId === userId && result.projectId === projectId
  );
};

export const calculateProjectCompletion = (userId: string, projectId: string): number => {
  const project = getProject(projectId);
  if (!project) return 0;
  
  const progress = getProjectProgress(userId, projectId);
  if (!progress) return 0;
  
  return (progress.completed_tasks.length / project.tasks.length) * 100;
};
