
import { Project, TestResult, UserProgress } from './types';

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'RESTful API with Express',
    description: 'Build a RESTful API for a blog platform using Express.js and MongoDB.',
    difficulty: 'easy',
    tasks: [
      { id: 't1', name: 'Set up Express server', description: 'Create a basic Express server with proper error handling.' },
      { id: 't2', name: 'Connect to MongoDB', description: 'Establish a connection to MongoDB using Mongoose.' },
      { id: 't3', name: 'Create post model', description: 'Define schema and model for blog posts.' },
      { id: 't4', name: 'Implement CRUD operations', description: 'Create endpoints for all CRUD operations on posts.' },
      { id: 't5', name: 'Add authentication', description: 'Implement user authentication using JWT.' },
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'JWT'],
    templateUrl: '/templates/express-rest-api.zip',
  },
  {
    id: 'p2',
    title: 'GraphQL API with Apollo',
    description: 'Develop a GraphQL API for a book library using Apollo Server and PostgreSQL.',
    difficulty: 'medium',
    tasks: [
      { id: 't1', name: 'Setup Apollo Server', description: 'Initialize Apollo Server with TypeScript.' },
      { id: 't2', name: 'Connect to PostgreSQL', description: 'Set up a connection to PostgreSQL database.' },
      { id: 't3', name: 'Define schema', description: 'Create GraphQL schema for books and authors.' },
      { id: 't4', name: 'Implement resolvers', description: 'Write resolvers for all queries and mutations.' },
      { id: 't5', name: 'Add data validation', description: 'Implement input validation for all mutations.' },
      { id: 't6', name: 'Add authentication', description: 'Add user authentication and authorization.' },
    ],
    technologies: ['Node.js', 'TypeScript', 'Apollo', 'GraphQL', 'PostgreSQL'],
    templateUrl: '/templates/apollo-graphql-api.zip',
  },
  {
    id: 'p3',
    title: 'Microservices with Node.js',
    description: 'Build a microservices architecture for an e-commerce platform using Node.js and Docker.',
    difficulty: 'hard',
    tasks: [
      { id: 't1', name: 'Set up service structure', description: 'Create the basic structure for multiple microservices.' },
      { id: 't2', name: 'Implement product service', description: 'Build a service for managing products.' },
      { id: 't3', name: 'Implement order service', description: 'Build a service for managing orders.' },
      { id: 't4', name: 'Set up API gateway', description: 'Create an API gateway to route requests to appropriate services.' },
      { id: 't5', name: 'Implement message broker', description: 'Set up RabbitMQ for inter-service communication.' },
      { id: 't6', name: 'Add authentication service', description: 'Implement a dedicated service for authentication.' },
      { id: 't7', name: 'Containerize services', description: 'Dockerize all services and set up docker-compose.' },
    ],
    technologies: ['Node.js', 'Express', 'Docker', 'RabbitMQ', 'MongoDB', 'Redis'],
    templateUrl: '/templates/node-microservices.zip',
  },
  {
    id: 'p4',
    title: 'Real-time Chat API with Socket.io',
    description: 'Create a real-time chat API using Socket.io and Express.',
    difficulty: 'medium',
    tasks: [
      { id: 't1', name: 'Setup Express server', description: 'Initialize an Express server with Socket.io.' },
      { id: 't2', name: 'Implement user authentication', description: 'Add JWT authentication for users.' },
      { id: 't3', name: 'Create chat rooms', description: 'Implement functionality for creating and joining chat rooms.' },
      { id: 't4', name: 'Add messaging features', description: 'Enable real-time messaging between users.' },
      { id: 't5', name: 'Implement typing indicators', description: 'Add real-time typing indicators.' },
      { id: 't6', name: 'Store chat history', description: 'Save chat messages to MongoDB for persistence.' },
    ],
    technologies: ['Node.js', 'Express', 'Socket.io', 'MongoDB', 'JWT'],
    templateUrl: '/templates/socketio-chat-api.zip',
  },
];

export const mockTestResults: TestResult[] = [
  {
    taskId: 't1',
    projectId: 'p1',
    userId: 'user123',
    status: 'passed',
    timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
  {
    taskId: 't2',
    projectId: 'p1',
    userId: 'user123',
    status: 'passed',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    taskId: 't3',
    projectId: 'p1',
    userId: 'user123',
    status: 'failed',
    timestamp: new Date().toISOString(),
    errorMessage: 'Schema validation failed: "title" field is required',
  },
  {
    taskId: 't1',
    projectId: 'p2',
    userId: 'user123',
    status: 'passed',
    timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
  },
];

export const mockUserProgress: UserProgress[] = [
  {
    id: 'progress1',
    user_id: 'user123',
    project_id: 'p1',
    completed_tasks: ['t1', 't2'],
    started_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    last_updated_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    is_completed: false,
  },
  {
    id: 'progress2',
    user_id: 'user123',
    project_id: 'p2',
    completed_tasks: ['t1'],
    started_at: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    last_updated_at: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
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
