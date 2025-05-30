// src/components/TasksTab.tsx
import type { FC } from "react";
import type { Project, TestResult } from "@/lib/types";
import ProgressTracker from "@/components/ProgressTracker";

interface TasksTabProps {
    project: Project;
    results: TestResult[];
    onRequestHelp: (taskId: string) => void;
    // onStatusChange: (taskId: string, status: "passed" | "failed" | "not-attempted") => void;
}

export const TasksTab: FC<TasksTabProps> = ({
                                                project,
                                                results,
                                                onRequestHelp,
                                                // onStatusChange,
                                            }) => (
    <ProgressTracker
        project={project}
        results={results}
        onRequestHelp={onRequestHelp}
        // onStatusChange={onStatusChange}
    />
);
