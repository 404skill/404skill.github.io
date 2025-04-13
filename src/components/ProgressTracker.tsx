
import { Project, TestResult } from "@/lib/types";
import { 
  CheckCircle, 
  CircleAlert, 
  CircleHelp, 
  Clock, 
  ChevronDown,
  ChevronUp,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatDistanceToNow } from "date-fns";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ProgressTrackerProps {
  project: Project;
  results: TestResult[];
  onRequestHelp: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: TestResult['status']) => void;
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

const ProgressTracker = ({ project, results, onRequestHelp, onStatusChange }: ProgressTrackerProps) => {
  const [openTasks, setOpenTasks] = useState<{ [key: string]: boolean }>({});

  const getTaskStatus = (taskId: string): TestResult['status'] | undefined => {
    const result = results.find(r => r.taskId === taskId);
    return result ? result.status : undefined;
  };

  const getTaskTimestamp = (taskId: string): string | null => {
    const result = results.find(r => r.taskId === taskId);
    return result ? result.timestamp : null;
  };

  const handleStatusChange = (taskId: string, status: TestResult['status']) => {
    if (onStatusChange) {
      onStatusChange(taskId, status);
    }
  };

  const toggleTask = (taskId: string) => {
    setOpenTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Tasks</h3>
      <div className="space-y-3">
        {project.tasks.map((task, index) => {
          const status = getTaskStatus(task.id);
          const timestamp = getTaskTimestamp(task.id);
          const isOpen = openTasks[task.id] || false;
          
          return (
            <Collapsible 
              key={task.id} 
              open={isOpen}
              onOpenChange={() => toggleTask(task.id)}
              className={`rounded-lg border ${
                status === 'passed' 
                  ? 'border-green-500/20 bg-green-500/10' 
                  : status === 'failed'
                  ? 'border-red-500/20 bg-red-500/10'
                  : 'border-border'
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
                        <button className="flex items-center gap-2 text-left font-medium focus:outline-none">
                          <span>{index + 1}. {task.name}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </CollapsibleTrigger>
                      {timestamp && (
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    
                    <CollapsibleContent>
                      <div className="mt-3 text-sm text-muted-foreground">
                        <p className="mb-4">{task.description}</p>
                        
                        <div className="bg-card p-4 rounded-md mb-3 space-y-3">
                          <h4 className="font-medium text-sm">Detailed Instructions</h4>
                          <p>Implement the {task.name} following best practices for {project.technologies.join(', ')}.</p>
                          
                          <div className="p-3 bg-slate-900 text-white rounded-md font-mono text-xs">
                            <pre>{`// Example code for ${task.name}
function implementation() {
  // Your code goes here
  console.log("Implement ${task.name}");
}`}</pre>
                          </div>
                          
                          <h4 className="font-medium text-sm mt-4">Testing Your Implementation</h4>
                          <p>Run the provided test suite to verify your implementation meets the requirements:</p>
                          <ul className="list-disc pl-5 space-y-1 text-xs">
                            <li>All function signatures match the expected types</li>
                            <li>Edge cases are properly handled</li>
                            <li>Response formats match the API specification</li>
                          </ul>
                        </div>
                      </div>
                      
                      {status === 'failed' && (
                        <div className="mt-2 p-2 bg-card rounded text-xs font-mono text-red-400">
                          {results.find(r => r.taskId === task.id)?.errorMessage || 'Test failed'}
                        </div>
                      )}
                      
                      <div className="mt-3 flex gap-2">
                        {onStatusChange && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'passed')}>
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span>Mark as Passed</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'failed')}>
                                <CircleAlert className="mr-2 h-4 w-4 text-red-500" />
                                <span>Mark as Failed</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'not-attempted')}>
                                <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                                <span>Mark as In Progress</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onRequestHelp(task.id)}
                        >
                          Request Help
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </div>
                </div>
              </div>
            </Collapsible>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
