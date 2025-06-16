import React, { useMemo } from 'react';
import type { FC } from 'react';

import ProgressTracker from '@/components/ProgressTracker';
import { Button } from '@/components/ui/button';
import type { TaskWithMetricsDTO, TestsByTaskDTO, TestStatusDTO } from '@/lib/types';
import TasksTabSkeleton from "@/components/skeletons/TasksTabSkeleton.tsx";

interface TasksTabProps {
    projectId: string;

    // ↓ tasks‐with‐metrics props (plus refetch)
    tasksWithMetrics: TaskWithMetricsDTO[];
    tasksLoading: boolean;
    tasksError: Error | null;
    refetchTasks: () => void;

    // ↓ tests‐by‐task props (plus refetch)
    testsByTask: TestsByTaskDTO[];
    testsLoading: boolean;
    testsError: Error | null;
    refetchTests: () => void;
}

export const TasksTab: FC<TasksTabProps> = ({
                                                projectId,
                                                tasksWithMetrics,
                                                tasksLoading,
                                                tasksError,
                                                refetchTasks,
                                                testsByTask,
                                                testsLoading,
                                                testsError,
                                                refetchTests,
                                            }) => {
    // 1) Build a “project-like” shape for ProgressTracker
    const pseudoProject = useMemo(() => {
        return {
            projectId,
            tasks: tasksWithMetrics,
        };
    }, [projectId, tasksWithMetrics]);

    // 2) Flatten testsByTask → TestResult[]
    const flattenedResults = useMemo(() => {
        type TestResult = {
            taskId: string;
            projectId: string;
            status: 'passed' | 'failed' | 'not-attempted';
            timestamp: string;
            errorMessage: string;
            name: string;
            testId: string;
        };

        const results: TestResult[] = [];
        testsByTask.forEach((grp: TestsByTaskDTO) => {
            grp.tests.forEach((test: TestStatusDTO) => {
                results.push({
                    taskId: grp.taskId,
                    projectId,
                    status: test.status === null ? 'not-attempted' : test.status,
                    timestamp: test.lastRun ?? '',
                    errorMessage: '',
                    name: test.testName,
                    testId: test.testId,
                });
            });
        });
        return results;
    }, [projectId, testsByTask]);

    // 3) Loading / error states
    if (tasksLoading || testsLoading) {
        return <TasksTabSkeleton />;
    }

    if (tasksError) {
        return (
            <div className="py-12 text-center font-mono text-red-500 space-y-2">
                <div>Error loading tasks</div>
                <Button onClick={() => refetchTasks()} className="font-mono text-sm">
                    Retry fetching tasks
                </Button>
            </div>
        );
    }

    if (testsError) {
        return (
            <div className="py-12 text-center font-mono text-red-500 space-y-2">
                <div>Error loading test results</div>
                <Button onClick={() => refetchTests()} className="font-mono text-sm">
                    Retry fetching test results
                </Button>
            </div>
        );
    }

    return (
        <ProgressTracker
            project={pseudoProject}
            results={flattenedResults}
        />
    );
};
