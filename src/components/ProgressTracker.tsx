import React from "react";
import { Project, TestResult } from "@/lib/types";
import TaskRow from "./TaskRow";

interface ProgressTrackerProps {
  project: Project;
  results: TestResult[];
  onRequestHelp: (taskId: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
                                                           project,
                                                           results,
                                                           onRequestHelp,
                                                         }) => {
  return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium font-mono text-slate-800">Project Tasks</h3>
        <div className="space-y-3">
          {project.tasks.map((task, index) => (
              <TaskRow
                  key={task.id}
                  projectId={project.id}
                  task={task}
                  index={index}
                  results={results}
                  onRequestHelp={onRequestHelp}
              />
          ))}
        </div>
      </div>
  );
};

export default ProgressTracker;
