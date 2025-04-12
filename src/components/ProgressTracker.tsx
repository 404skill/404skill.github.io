
import { Project, TestResult } from "@/lib/types";
import { 
  CheckCircle, 
  CircleAlert, 
  CircleHelp, 
  Clock, 
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";

interface ProgressTrackerProps {
  project: Project;
  results: TestResult[];
  onRequestHelp: (taskId: string) => void;
}

const TaskStatusIcon = ({ status }: { status: TestResult['status'] | 'not-started' }) => {
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
      color = 'text-yellow-500';
      label = 'In Progress';
      break;
    default:
      Icon = CircleHelp;
      color = 'text-gray-400';
      label = 'Not Started';
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${color}`}>
            <Icon className="h-5 w-5" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ProgressTracker = ({ project, results, onRequestHelp }: ProgressTrackerProps) => {
  const getTaskStatus = (taskId: string): TestResult['status'] | 'not-started' => {
    const result = results.find(r => r.taskId === taskId);
    return result ? result.status : 'not-started';
  };

  const getTaskTimestamp = (taskId: string): string | null => {
    const result = results.find(r => r.taskId === taskId);
    return result ? result.timestamp : null;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Tasks</h3>
      <div className="space-y-3">
        {project.tasks.map((task, index) => {
          const status = getTaskStatus(task.id);
          const timestamp = getTaskTimestamp(task.id);
          
          return (
            <div 
              key={task.id} 
              className={`p-4 rounded-lg border ${
                status === 'passed' 
                  ? 'border-green-500/20 bg-green-500/10' 
                  : status === 'failed'
                  ? 'border-red-500/20 bg-red-500/10'
                  : 'border-border'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <TaskStatusIcon status={status} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">
                      {index + 1}. {task.name}
                    </h4>
                    {timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                  
                  {status === 'failed' && (
                    <div className="mt-2 p-2 bg-card rounded text-xs font-mono text-red-400">
                      {results.find(r => r.taskId === task.id)?.errorMessage || 'Test failed'}
                    </div>
                  )}
                  
                  {(status === 'failed' || status === 'not-attempted') && (
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onRequestHelp(task.id)}
                      >
                        Request Help
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
