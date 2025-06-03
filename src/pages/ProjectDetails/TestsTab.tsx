// src/components/TestsTab.tsx
import React, { useState } from "react";
import type { FC } from "react";
import type { Project, TestResult } from "@/lib/types";
import {
    CheckCircle,
    CircleAlert,
    CircleHelp,
    Clock,
    ChevronDown,
    ChevronUp,
    LucideIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import TestRow from "@/components/TestRow";

interface TestsTabProps {
    project: Project;
    results: TestResult[];
}

const SuiteStatusIcon = ({ status }: { status: TestResult["status"] | undefined }) => {
    let Icon: LucideIcon;
    let color: string;
    let label: string;

    switch (status) {
        case "passed":
            Icon = CheckCircle;
            color = "text-green-500";
            label = "Passed";
            break;
        case "failed":
            Icon = CircleAlert;
            color = "text-red-500";
            label = "Failed";
            break;
        case "not-attempted":
            Icon = Clock;
            color = "text-slate-400";
            label = "Not Attempted";
            break;
        default:
            Icon = CircleHelp;
            color = "text-slate-400";
            label = "Unknown";
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

const TestsTab: FC<TestsTabProps> = ({ project, results }) => {
    // Track open/closed state per task ID
    const [openSuites, setOpenSuites] = useState<Record<string, boolean>>({});

    const toggleSuite = (taskId: string) => {
        setOpenSuites((prev) => ({
            ...prev,
            [taskId]: !prev[taskId],
        }));
    };

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-medium font-mono text-slate-800 mb-4">
                Project Tests
            </h3>

            {project.tasks.map((task, taskIndex) => {
                const taskResults = results.filter((r) => r.taskId === task.id);
                if (taskResults.length === 0) {
                    return null;
                }

                const hasFailure = taskResults.some((r) => r.status === "failed");
                const allPassed = taskResults.every((r) => r.status === "passed");
                const suiteStatus: TestResult["status"] = hasFailure
                    ? "failed"
                    : allPassed
                        ? "passed"
                        : "not-attempted";

                // Latest timestamp among this suite’s results
                const latestTimestamp = taskResults.reduce((latest, r) =>
                    new Date(r.timestamp) > new Date(latest.timestamp) ? r : latest
                ).timestamp;

                // Count passed vs total
                const passedCount = taskResults.filter((r) => r.status === "passed").length;
                const totalCount = taskResults.length;
                const percent = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

                const suiteBg =
                    suiteStatus === "passed" ? "bg-green-50" :
                        suiteStatus === "failed" ? "bg-red-50" :
                            "bg-slate-100";
                const bulletColor =
                    suiteStatus === "passed" ? "text-green-500" :
                        suiteStatus === "failed" ? "text-red-500" :
                            "text-slate-500";

                const isOpen = openSuites[task.id] || false;
                const suiteNumber = taskIndex + 1;

                return (
                    <React.Fragment key={task.id}>
                        <Collapsible
                            open={isOpen}
                            onOpenChange={() => toggleSuite(task.id)}
                            className={`rounded-lg border ${
                                suiteStatus === "passed"
                                    ? "border-green-500/40"
                                    : suiteStatus === "failed"
                                        ? "border-red-500/40"
                                        : "border-slate-200"
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
                            {suiteNumber}. {task.name}
                          </span>
                                                    {isOpen ? (
                                                        <ChevronUp className="h-4 w-4 text-slate-400" />
                                                    ) : (
                                                        <ChevronDown className="h-4 w-4 text-slate-400" />
                                                    )}
                                                </button>
                                            </CollapsibleTrigger>

                                            <div className="flex items-center gap-12">
                                                {latestTimestamp && (
                                                    <span className="text-xs text-slate-500 font-mono">
                            {formatDistanceToNow(new Date(latestTimestamp), { addSuffix: true })}
                          </span>
                                                )}
                                                <span className="text-xs text-slate-500 font-mono">
                          {percent}% complete ({passedCount}/{totalCount})
                        </span>
                                            </div>
                                        </div>

                                        <CollapsibleContent>
                                            <div className="mt-3 space-y-2">
                                                {taskResults.map((r, idx) => (
                                                    <TestRow key={idx} result={r} testName={`${idx + 1}. ${r.name}`} />
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
