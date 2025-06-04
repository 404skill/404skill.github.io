// src/components/ProgressTracker/TaskRow.tsx
import React, { useState } from 'react';
import type { Project, TestResult } from '@/lib/types';
import {
  CheckCircle,
  CircleAlert,
  CircleHelp,
  Clock,
  ChevronDown,
  ChevronUp,
  LucideIcon,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import MarkdownRenderer from '@/components/MarkdownRenderer';

interface TaskRowProps {
  task: Project['tasks'][number];
  projectId: string;
  index: number;
  results: TestResult[];
  onRequestHelp: (taskId: string) => void;
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

const TaskRow: React.FC<TaskRowProps> = ({ task, index, results, onRequestHelp, projectId }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 1) All results for this task (only tests the user has run):
  const taskResults = results.filter(r => r.taskId === task.id);

  // 2) Count how many of those have “passed”:
  const passedCount = taskResults.filter(r => r.status === 'passed').length;

  // 3) “realTotal” = total number of tests attached to this task (even if user never ran them)
  const realTotal = task.tests.length;

  // 4) Display percent = passedCount / realTotal
  const percent = realTotal > 0 ? Math.round((passedCount / realTotal) * 100) : 0;

  // 5) Determine overall “status” icon:
  //    - If any result failed => failed
  //    - Else if some results exist and all passed => passed
  //    - Else => not-attempted
  let status: TestResult['status'];
  if (taskResults.some(r => r.status === 'failed')) {
    status = 'failed';
  } else if (taskResults.length > 0 && passedCount === taskResults.length) {
    status = 'passed';
  } else {
    status = 'not-attempted';
  }

  // 6) Find the most recent timestamp if any:
  const latest = taskResults.length
    ? taskResults.reduce((best, r) => (new Date(r.timestamp) > new Date(best.timestamp) ? r : best))
    : null;
  const timestamp = latest?.timestamp ?? null;

  const taskNumber = index + 1;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => setIsOpen(o => !o)}
      className={`rounded-lg border ${
        status === 'passed'
          ? 'border-green-500/40 bg-green-50'
          : status === 'failed'
            ? 'border-red-500/40 bg-red-50'
            : 'border-slate-200 bg-white'
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <TaskStatusIcon status={status} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <CollapsibleTrigger asChild>
                <button className="flex items-center gap-2 text-left font-medium font-mono text-slate-800 focus:outline-none">
                  <span>
                    {taskNumber}. {task.name}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </button>
              </CollapsibleTrigger>

              <div className="flex items-center gap-12">
                {timestamp && (
                  <span className="text-xs text-slate-500 font-mono">
                    {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                  </span>
                )}
                <span className="text-xs text-slate-500 font-mono">
                  {/* Show realTotal instead of taskResults.length */}
                  {percent}% complete ({passedCount}/{realTotal})
                </span>
              </div>
            </div>

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
