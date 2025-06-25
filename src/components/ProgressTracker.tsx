import React from 'react';
import type { TaskWithMetricsDTO, TestResult } from '@/lib/types';
import TaskRow from './TaskRow';

interface ProgressTrackerProps {
    project: {
        projectId: string;
        tasks: TaskWithMetricsDTO[];
    };
    results: TestResult[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ project, results }) => {
  const sortedTasks = [...project.tasks].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium font-mono text-slate-800">Project Tasks</h3>
      <div className="space-y-3">
        {sortedTasks.map((task, index) => (
          <TaskRow
            key={task.taskId}
            projectId={project.projectId}
            task={task}
            index={index}
            results={results}
          />
        ))}
      </div>
    </div>
  );
};


export default ProgressTracker;
