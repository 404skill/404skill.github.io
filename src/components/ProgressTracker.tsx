
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
import TaskMarkdownContent from "./TaskMarkdownContent";

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
          <div className={`${color}`}>
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
      <h3 className="text-lg font-medium font-mono text-slate-800">Project Tasks</h3>
      <div className="space-y-3">
        {project.tasks.map((task, index) => {
          const status = getTaskStatus(task.id);
          const timestamp = getTaskTimestamp(task.id);
          const isOpen = openTasks[task.id] || false;
          const taskNumber = index + 1;
          
          return (
            <Collapsible 
              key={task.id} 
              open={isOpen}
              onOpenChange={() => toggleTask(task.id)}
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
                          <span>{taskNumber}. {task.name}</span>
                          {isOpen ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </button>
                      </CollapsibleTrigger>
                      {timestamp && (
                        <span className="text-xs text-slate-500 font-mono">
                          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    
                    <CollapsibleContent>
                      <div className="mt-3 text-sm text-slate-600">
                        {project.id === 'library_management' ? (
                          <div className="bg-white p-4 rounded-md mb-3 border border-slate-200 overflow-hidden">
                            <TaskMarkdownContent 
                              projectId={project.id} 
                              taskNumber={taskNumber} 
                              className="prose-sm" 
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="mb-4 font-mono">{task.description}</p>
                            <div className="bg-white p-4 rounded-md mb-3 space-y-3 border border-slate-200">
                              <h4 className="font-medium text-sm text-slate-700 font-mono">Requirements</h4>
                              <p className="font-mono text-slate-600">Complete this task using your preferred programming language and tools.</p>
                              
                              <div className="p-3 bg-slate-50 text-slate-700 rounded-md font-mono text-xs border border-slate-200">
                                <pre>{`# Your solution will be tested through the container API
# Example test command:
$ container run-tests ${task.name.toLowerCase().replace(/\s+/g, '-')}`}</pre>
                              </div>
                              
                              <h4 className="font-medium text-sm mt-4 text-slate-700 font-mono">Testing Your Implementation</h4>
                              <p className="font-mono text-slate-600">The test container will validate your implementation against the requirements:</p>
                              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600 font-mono">
                                <li>Your container must implement the standard CLI API</li>
                                <li>All requirements must be satisfied</li>
                                <li>Edge cases should be properly handled</li>
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {status === 'failed' && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-300 rounded text-xs font-mono text-red-600">
                          {results.find(r => r.taskId === task.id)?.errorMessage || 'Test failed'}
                        </div>
                      )}
                      
                      <div className="mt-3 flex gap-2">
                        {onStatusChange && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm" className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-mono">
                                Update Status
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white border-slate-200">
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'passed')} className="text-slate-700 focus:bg-slate-50 font-mono">
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                <span>Mark as Passed</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'failed')} className="text-slate-700 focus:bg-slate-50 font-mono">
                                <CircleAlert className="mr-2 h-4 w-4 text-red-500" />
                                <span>Mark as Failed</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'not-attempted')} className="text-slate-700 focus:bg-slate-50 font-mono">
                                <Clock className="mr-2 h-4 w-4 text-slate-400" />
                                <span>Mark as Not Started</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onRequestHelp(task.id)}
                          className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-mono"
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
