import React, { useState } from 'react';
import type { FC } from 'react';
import type { TaskWithMetricsDTO, TestResult } from '@/lib/types';
import {
  CheckCircle,
  CircleAlert,
  CircleHelp,
  Clock,
  ChevronDown,
  ChevronUp,
  type LucideIcon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MarkdownRenderer from '@/components/markdown-renderer/MarkdownRenderer.tsx';

interface TaskRowProps {
  task: TaskWithMetricsDTO;
  projectId: string;
  index: number;
  results: TestResult[];
}

const TaskStatusIcon = ({ status }: { status: TestResult['status'] | undefined }) => {
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
      label = 'Not Started';
      break;
    default:
      Icon = CircleHelp;
      color = 'text-slate-400';
      label = 'Not Started';
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

const TaskRow: FC<TaskRowProps> = ({ task, index, results, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 1) All results for this task (including "not-attempted"):
  const taskResults = results.filter((r) => r.taskId === task.taskId);

  // 2) Of those, count how many have “passed”:
  const passedCount = taskResults.filter((r) => r.status === 'passed').length;

  // 3) “realTotal” = total number of tests attached to this task (from DTO)
  const realTotal = task.totalTests;

  // 4) Count only “ran” tests (status === 'passed' OR 'failed')
  const runCount = taskResults.filter((r) => r.status === 'passed' || r.status === 'failed').length;

  // 5) Determine whether any failure exists
  const hasFailure = taskResults.some((r) => r.status === 'failed');

  // 6) Decide overall “status” based on these rules:
  //    - If runCount === 0 → “not-attempted” (grey)
  //    - Else if hasFailure OR runCount < realTotal → “failed” (red)
  //    - Else (runCount === realTotal and no failures) → “passed” (green)
  let status: TestResult['status'];
  if (runCount < realTotal) {
    status = 'not-attempted';
  } else if (hasFailure) {
    status = 'failed';
  } else {
    status = 'passed';
  }

  // 7) Find most recent timestamp (if any)
  const latest = taskResults.length
      ? taskResults.reduce((best, r) =>
          new Date(r.timestamp) > new Date(best.timestamp) ? r : best
      )
      : null;
  const timestamp = latest?.timestamp ?? null;

  const taskNumber = index + 1;

  // 8) Percentage for UI
  const percent = realTotal > 0 ? Math.round((passedCount / realTotal) * 100) : 0;

  return (
      <Collapsible
          open={isOpen}
          onOpenChange={() => setIsOpen((o) => !o)}
          className={`rounded-lg border ${
              status === 'passed'
                  ? 'border-green-500/40 bg-green-50'
                  : status === 'failed'
                      ? 'border-red-500/40 bg-red-50'
                      : 'border-slate-200 bg-slate-100'
          }`}
      >
        <div className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <TaskStatusIcon status={status} />
            </div>
            <div className="flex-1">
              <CollapsibleTrigger asChild>
              <div className="flex justify-between items-center cursor-pointer">

                  <button className="flex items-center gap-2 text-left font-medium font-mono text-slate-800 focus:outline-none">
                  <span>
                    {taskNumber}. {task.taskName}
                  </span>
                    {isOpen ? (
                        <ChevronUp className="h-4 w-4 text-slate-400" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </button>


                <div className="flex items-center gap-12">
                  {timestamp ? (
                      <span className="text-xs text-slate-500 font-mono">
                    {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                  </span>
                  ) : (
                    <span className="text-xs text-slate-500 font-mono">Not attempted</span>
                  )}
                  <span className="text-xs text-slate-500 font-mono">
                  {percent}% complete ({passedCount}/{realTotal})
                </span>
                </div>
              </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="mt-3 text-sm text-slate-600">
                  <div className="bg-white p-4 rounded-md mb-3 space-y-3 border border-slate-200">
                    <MarkdownRenderer content={task.description} />
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </div>
        </div>
      </Collapsible>
  );
};

export default TaskRow;
