import React, { useState } from 'react';
import type { FC } from 'react';

import {
    CheckCircle,
    CircleAlert,
    CircleHelp,
    Clock,
    ChevronDown,
    ChevronUp,
    type LucideIcon,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';

import type { TestsByTaskDTO } from '@/lib/types';
import TestRow from '@/components/TestRow';
import TestsTabSkeleton from "@/components/skeletons/TestsTabSkeleton.tsx";

interface TestsTabProps {
    projectId: string;
    testsByTask: TestsByTaskDTO[];
    testsLoading: boolean;
    testsError: Error | null;
    refetchTests: () => void;
}

const SuiteStatusIcon = ({ status }: { status: 'passed' | 'failed' | 'not-attempted' }) => {
    let Icon: LucideIcon;
    let color: string;
    let label: string;

    switch (status) {
        case 'passed':
            Icon = CheckCircle;
            color = 'text-green-500';
            label = 'Passed';
            break;
        case 'failed':
            Icon = CircleAlert;
            color = 'text-red-500';
            label = 'Failed';
            break;
        case 'not-attempted':
            Icon = Clock;
            color = 'text-slate-400';
            label = 'Not Attempted';
            break;
        default:
            Icon = CircleHelp;
            color = 'text-slate-400';
            label = 'Unknown';
    }

    return (
        <TooltipProvider delayDuration={300}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={color}>
                        <Icon className="h-5 w-5" />
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-slate-800 border-slate-200">
                    <p className="font-mono text-xs">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

const TestsTab: FC<TestsTabProps> = ({
                                         projectId,
                                         testsByTask,
                                         testsLoading,
                                         testsError,
                                         refetchTests,
                                     }) => {
    // 1) Local state for open/closed collapse
    const [openSuites, setOpenSuites] = useState<Record<string, boolean>>({});

    const toggleSuite = (taskId: string) => {
        setOpenSuites((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    // 2) Loading / error states
    if (testsLoading) {
        return <TestsTabSkeleton />;
    }
    if (testsError) {
        return (
            <div className="py-12 text-center font-mono text-red-500 space-y-2">
                <div>Error loading tests</div>
                <Button onClick={() => refetchTests()} className="font-mono text-sm">
                    Retry fetching tests
                </Button>
            </div>
        );
    }
    if (!testsByTask || testsByTask.length === 0) {
        return (
            <div className="py-12 text-center font-mono">
                No tests found for this project.
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-medium font-mono text-slate-800 mb-4">
                Project Tests
            </h3>

            {testsByTask.map((group: TestsByTaskDTO, taskIndex: number) => {
                // 1) Grab the array of tests under this task
                const allTests = group.tests;

                // 2) Determine suite status
                const hasFailure = allTests.some((t) => t.status === 'failed');
                const allPassed = allTests.every((t) => t.status === 'passed');
                const hasAnyRun = allTests.some((t) => t.status !== null);

                const suiteStatus: 'passed' | 'failed' | 'not-attempted' = hasFailure
                    ? 'failed'
                    : allPassed && hasAnyRun
                        ? 'passed'
                        : 'not-attempted';

                // 3) Compute percent (passed count / total count)
                const passedCount = allTests.filter((t) => t.status === 'passed').length;
                const totalCount = allTests.length;
                const percent = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

                // 4) CSS classes for status background
                const suiteBg =
                    suiteStatus === 'passed'
                        ? 'bg-green-50'
                        : suiteStatus === 'failed'
                            ? 'bg-red-50'
                            : 'bg-slate-100';

                const isOpen = openSuites[group.taskId] || false;
                const suiteNumber = taskIndex + 1;

                return (
                    <React.Fragment key={group.taskId}>
                        <Collapsible
                            open={isOpen}
                            onOpenChange={() => toggleSuite(group.taskId)}
                            className={`rounded-lg border ${
                                suiteStatus === 'passed'
                                    ? 'border-green-500/40'
                                    : suiteStatus === 'failed'
                                        ? 'border-red-500/40'
                                        : 'border-slate-200'
                            } ${suiteBg}`}
                        >
                            <div className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <SuiteStatusIcon status={suiteStatus} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-center">
                                            <CollapsibleTrigger asChild>
                                                <button className="flex items-center gap-2 text-left font-medium font-mono text-slate-800 focus:outline-none">
                          <span>
                            {suiteNumber}. {group.taskName}
                          </span>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-4 w-4 text-slate-400" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                                    )}
                                                </button>
                                            </CollapsibleTrigger>

                                            <div className="flex items-center gap-12">
                        <span className="text-xs text-slate-500 font-mono">
                          {percent}% complete ({passedCount}/{totalCount})
                        </span>
                                            </div>
                                        </div>

                                        <CollapsibleContent>
                                            <div className="mt-3 space-y-2">
                                                {allTests.map((t) => (
                                                    <TestRow
                                                        key={t.testId}
                                                        result={{
                                                            taskId: group.taskId,
                                                            projectId,
                                                            status: t.status!,
                                                            timestamp: t.lastRun,
                                                            errorMessage: '',
                                                            name: t.testName,
                                                            testId: t.testId,
                                                        }}
                                                        testName={t.testName}
                                                    />
                                                ))}
                                            </div>
                                        </CollapsibleContent>
                                    </div>
                                </div>
                            </div>
                        </Collapsible>
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default TestsTab;
