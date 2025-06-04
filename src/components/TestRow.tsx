// src/components/TestRow.tsx
import React from 'react';
import type { FC } from 'react';
import type { TestResult } from '@/lib/types';
import { CheckCircle, CircleAlert, CircleHelp, Clock, LucideIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDistanceToNow } from 'date-fns';

interface TestRowProps {
  result: TestResult;
  testName: string;
}

const TestStatusIcon = ({ status }: { status: TestResult['status'] }) => {
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

/**
 * Now each TestRow has a white background, so it stands out
 * against its parent’s colored container.
 */
const TestRow: FC<TestRowProps> = ({ result, testName }) => {
  const { status, timestamp } = result;

  return (
    <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm">
      {/* Left side: Icon + Test Name */}
      <div className="flex items-center gap-2">
        <TestStatusIcon status={status} />
        <span className="font-mono text-sm text-slate-800">{testName}</span>
      </div>

      {/* Right side: Status text + optional Time */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-400 font-mono">
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
        <span
          className={`font-mono text-xs font-semibold ${
            status === 'passed'
              ? 'text-green-600'
              : status === 'failed'
                ? 'text-red-600'
                : 'text-slate-500'
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TestRow;
