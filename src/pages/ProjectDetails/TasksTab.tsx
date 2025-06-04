import type { FC } from 'react';
import type { Project, TestResult } from '@/lib/types';
import ProgressTracker from '@/components/ProgressTracker';

interface TasksTabProps {
  project: Project;
  results: TestResult[];
  onRequestHelp: (taskId: string) => void;
}

export const TasksTab: FC<TasksTabProps> = ({ project, results, onRequestHelp }) => (
  <ProgressTracker project={project} results={results} onRequestHelp={onRequestHelp} />
);
