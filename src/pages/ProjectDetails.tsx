import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Download,
  FileCode,
  FileText,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import { Project, TestResult, User } from "@/lib/types";
import { getProject } from "@/lib/data";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import HelpRequestForm from "@/components/HelpRequestForm";
import { Link } from "react-router-dom";
import { projects } from "@/lib/data";
import { useUserProgress } from "@/hooks/useUserProgress";
import { supabase } from "@/integrations/supabase/client";
import ProjectMarkdownContent from "@/components/ProjectMarkdownContent";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast: uiToast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [completion, setCompletion] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  const { updateProjectProgress, calculateCompletion } = useUserProgress(user?.id || null);
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(userStr) as User;
    setUser(userData);
    
    if (id) {
      const projectData = getProject(id);
      if (projectData) {
        setProject(projectData);
        
        trackEvent({
          eventType: AnalyticsEvent.READ_PROJECT_DETAILS,
          component: "ProjectDetails",
          eventData: { projectId: id }
        });
        
        fetchTaskResults(userData.id, id);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, navigate]);
  
  const fetchTaskResults = async (userId: string, projectId: string) => {
    try {
      import("@/lib/data").then(async ({ projects }) => {
        const currentProject = projects.find(p => p.id === projectId);
        
        if (!currentProject) {
          toast.error("Project not found");
          return;
        }
        
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', userId)
          .eq('project_id', projectId)
          .single();
        
        if (progressData) {
          if (project) {
            const completionPercentage = 
              (progressData.completed_tasks.length / project.tasks.length) * 100;
            setCompletion(completionPercentage);
          }
          
          const updatedResults: TestResult[] = currentProject.tasks.map(task => {
            return {
              taskId: task.id,
              projectId: projectId,
              userId: userId,
              status: progressData.completed_tasks.includes(task.id) ? 'passed' as const : 'not-attempted' as const,
              timestamp: progressData.last_updated_at || new Date().toISOString()
            };
          });
          
          setTestResults(updatedResults);
        } else {
          if (currentProject) {
            const emptyResults: TestResult[] = currentProject.tasks.map(task => ({
              taskId: task.id,
              projectId: projectId,
              userId: userId,
              status: 'not-attempted' as const,
              timestamp: new Date().toISOString()
            }));
            
            setTestResults(emptyResults);
            setCompletion(0);
          }
        }
      });
    } catch (error) {
      console.error("Error fetching task results:", error);
      toast.error("Failed to load project progress");
    }
  };
  
  const handleDownloadTemplate = () => {
    if (!project) return;
    
    uiToast({
      title: "Template downloaded",
      description: `You have downloaded the starter template for ${project.title}.`,
    });
  };
  
  const handleRequestHelp = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsHelpDialogOpen(true);
    
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_REQUEST_HELP,
      component: "HelpRequestButton",
      eventData: { 
        projectId: project?.id,
        taskId 
      }
    });
  };
  
  const handleTaskTabClick = () => {
    if (project) {
      trackEvent({
        eventType: AnalyticsEvent.OPENED_PROJECT_TASKS,
        component: "ProjectTasks",
        eventData: { projectId: project.id }
      });
    }
  };
  
  const handleTaskStatusChange = async (taskId: string, status: 'passed' | 'failed' | 'not-attempted') => {
    if (!project || !user || !id) return;
    
    const updatedResults = testResults.map(result => 
      result.taskId === taskId 
        ? { ...result, status, timestamp: new Date().toISOString() } 
        : result
    );
    
    if (!updatedResults.some(r => r.taskId === taskId)) {
      updatedResults.push({
        taskId,
        projectId: id,
        userId: user.id,
        status,
        timestamp: new Date().toISOString()
      });
    }
    
    setTestResults(updatedResults);
    
    await updateProjectProgress(id, taskId, status);
    
    if (project) {
      const completedTasks = updatedResults.filter(r => r.status === 'passed');
      setCompletion((completedTasks.length / project.tasks.length) * 100);
    }
    
    toast.success(`Task marked as ${status}`);
  };
  
  if (!project || !user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4 font-mono text-slate-600 hover:text-slate-800"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold font-mono text-slate-800">{project.title}</h1>
                  <Badge 
                    variant="outline" 
                    className={`
                      font-mono text-xs
                      ${project.difficulty === 'easy' ? 'border-green-500/30 bg-green-100 text-green-700' : ''}
                      ${project.difficulty === 'medium' ? 'border-yellow-500/30 bg-yellow-100 text-yellow-700' : ''}
                      ${project.difficulty === 'hard' ? 'border-red-500/30 bg-red-100 text-red-700' : ''}
                    `}
                  >
                    {project.difficulty}
                  </Badge>
                </div>
                <p className="text-slate-600 font-mono">{project.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadTemplate} className="border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 font-mono">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Get Help
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg bg-white border-slate-200">
                    <HelpRequestForm 
                      projectId={project.id} 
                      taskId={selectedTaskId}
                      projects={projects}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-500">Progress</span>
                <span className="text-slate-700">{Math.round(completion)}% complete</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>
          
          <Separator className="my-6 bg-slate-200" />
          
          <Tabs defaultValue="tasks" className="mt-6">
            <TabsList className="bg-slate-100 border border-slate-200 p-1">
              <TabsTrigger 
                value="tasks" 
                className="font-mono data-[state=active]:bg-white data-[state=active]:text-slate-800"
                onClick={handleTaskTabClick}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="details" className="font-mono data-[state=active]:bg-white data-[state=active]:text-slate-800">
                <FileText className="h-4 w-4 mr-2" />
                Details
              </TabsTrigger>
              <TabsTrigger value="container-api" className="font-mono data-[state=active]:bg-white data-[state=active]:text-slate-800">
                <FileCode className="h-4 w-4 mr-2" />
                Container API
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-6">
              <ProgressTracker 
                project={project}
                results={testResults}
                onRequestHelp={handleRequestHelp}
                onStatusChange={handleTaskStatusChange}
              />
            </TabsContent>
            
            <TabsContent value="details" className="mt-6 space-y-6">
              {project.id === 'library_management' ? (
                <div className="bg-white p-6 rounded-lg border border-slate-200 overflow-hidden">
                  <div className="prose prose-slate max-w-none
                     prose-headings:font-mono prose-headings:text-slate-800 
                     prose-p:text-slate-600 prose-p:leading-relaxed
                     prose-code:bg-slate-100 prose-code:p-0.5 prose-code:rounded
                     prose-li:marker:text-slate-400
                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                    <ProjectMarkdownContent filePath="library_management/0_overview.md" />
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">Project Overview</h3>
                  <p className="text-slate-600 font-mono">
                    {project.description} This project uses containerization to allow you to implement a solution 
                    in any programming language of your choice.
                  </p>
                  <div>
                <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">Learning Objectives</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1 font-mono">
                  <li>Building containerized applications with proper isolation</li>
                  <li>Creating solutions that can be tested through a standardized CLI API</li>
                  <li>Working with cross-container communication patterns</li>
                  <li>Implementing efficient and clean solutions to real-world problems</li>
                  <li>Writing portable code that works consistently across environments</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">Prerequisites</h3>
                <ul className="list-disc pl-5 text-slate-600 space-y-1 font-mono">
                  <li>Basic understanding of containerization (Docker or similar)</li>
                  <li>Familiarity with your chosen programming language</li>
                  <li>Understanding of CLI interfaces and APIs</li>
                  <li>Git for version control</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">Getting Started</h3>
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="font-mono text-slate-800">Step 1: Download the template</CardTitle>
                    <CardDescription className="text-slate-500 font-mono">
                      Get started with our container template and test suite
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 font-mono">
                      The template includes a starter container configuration and documentation
                      on how to interact with the test container through the standard API.
                    </p>
                    <Button onClick={handleDownloadTemplate} className="font-mono bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="container-api" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium font-mono text-slate-800 mb-2">Container API Reference</h3>
                  <p className="text-slate-600 mb-4 font-mono">
                    Your container must implement these standard CLI commands that the test container will use
                    to interact with your solution.
                  </p>
                </div>
                
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-base font-mono text-slate-800">
                      health-check
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-2 font-mono">
                      Verifies that your container is running and ready to receive commands.
                    </p>
                    <p className="text-sm font-semibold mb-1 text-slate-700 font-mono">Command:</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`$ container health-check`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1 text-slate-700 font-mono">Expected Output (success):</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`{
  "status": "healthy",
  "version": "1.0.0"
}`}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-base font-mono text-slate-800">
                      run-tests
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-2 font-mono">
                      Execute tests against your implementation for a specific task.
                    </p>
                    <p className="text-sm font-semibold mb-1 text-slate-700 font-mono">Command:</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`$ container run-tests <task-id>`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1 text-slate-700 font-mono">Expected Output (success):</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`{
  "task": "<task-id>",
  "passed": true,
  "tests": {
    "total": 5,
    "passed": 5,
    "failed": 0
  },
  "details": []
}`}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card className="bg-white border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-base font-mono text-slate-800">
                      get-results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-2 font-mono">
                      Retrieve detailed results from the most recent test run.
                    </p>
                    <p className="text-sm font-semibold mb-1 text-slate-700 font-mono">Command:</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`$ container get-results`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1 text-slate-700 font-mono">Expected Output:</p>
                    <pre className="bg-slate-50 p-3 rounded-md text-slate-700 font-mono text-xs border border-slate-200">
{`{
  "task": "<task-id>",
  "timestamp": "2025-04-14T10:30:00Z",
  "tests": [
    {
      "name": "Functionality Test",
      "passed": true,
      "duration_ms": 45
    },
    {
      "name": "Performance Test",
      "passed": true,
      "duration_ms": 120
    }
  ],
  "logs": [
    "Test started at 2025-04-14T10:30:00Z",
    "All tests passed successfully"
  ]
}`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;
