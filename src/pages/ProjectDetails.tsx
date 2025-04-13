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
          
          const updatedResults = currentProject.tasks.map(task => {
            return {
              taskId: task.id,
              projectId: projectId,
              userId: userId,
              status: progressData.completed_tasks.includes(task.id) ? 'passed' as const : 'not-started' as const,
              timestamp: progressData.last_updated_at || new Date().toISOString()
            };
          });
          
          setTestResults(updatedResults);
        } else {
          if (currentProject) {
            const emptyResults = currentProject.tasks.map(task => ({
              taskId: task.id,
              projectId: projectId,
              userId: userId,
              status: 'not-started' as const,
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold">{project.title}</h1>
                  <Badge 
                    variant="outline" 
                    className={`
                      ${project.difficulty === 'easy' ? 'pill-easy' : ''}
                      ${project.difficulty === 'medium' ? 'pill-medium' : ''}
                      ${project.difficulty === 'hard' ? 'pill-hard' : ''}
                    `}
                  >
                    {project.difficulty}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Template
                </Button>
                <Dialog open={isHelpDialogOpen} onOpenChange={setIsHelpDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Get Help
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <HelpRequestForm 
                      projectId={project.id} 
                      taskId={selectedTaskId}
                      projects={projects}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{Math.round(completion)}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full"
                  style={{ width: `${completion}%` }}
                />
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <Tabs defaultValue="tasks" className="mt-6">
            <TabsList>
              <TabsTrigger value="tasks" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="api-reference" className="flex items-center gap-1">
                <FileCode className="h-4 w-4" />
                API Reference
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
              <div>
                <h3 className="text-lg font-medium mb-2">Project Overview</h3>
                <p className="text-muted-foreground">
                  {project.description} This project will help you learn how to build 
                  and structure a backend application using {project.technologies.join(', ')}.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Learning Objectives</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Understanding the fundamentals of {project.technologies[0]} architecture</li>
                  <li>Building robust API endpoints with proper error handling</li>
                  <li>Working with databases and data models</li>
                  <li>Implementing authentication and authorization</li>
                  <li>Writing tests for your backend application</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Prerequisites</h3>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Basic understanding of JavaScript/TypeScript</li>
                  <li>Familiarity with HTTP and RESTful APIs</li>
                  <li>Node.js installed on your machine</li>
                  <li>Git for version control</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Getting Started</h3>
                <Card>
                  <CardHeader>
                    <CardTitle>Step 1: Download the template</CardTitle>
                    <CardDescription>
                      Get started with our pre-configured project template
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      The template includes all the necessary files and configurations to get you started.
                      It also includes the test suite that will be used to evaluate your implementation.
                    </p>
                    <Button onClick={handleDownloadTemplate}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="api-reference" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API Reference</h3>
                  <p className="text-muted-foreground mb-4">
                    This section provides documentation for the API endpoints that you'll need to implement.
                  </p>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      POST /api/auth/register
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Register a new user.
                    </p>
                    <p className="text-sm font-semibold mb-1">Request Body:</p>
                    <pre className="code-block">
{`{
  "username": "string",
  "email": "string",
  "password": "string"
}`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1">Response (200):</p>
                    <pre className="code-block">
{`{
  "id": "string",
  "username": "string",
  "email": "string",
  "createdAt": "string"
}`}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      POST /api/auth/login
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Authenticate a user.
                    </p>
                    <p className="text-sm font-semibold mb-1">Request Body:</p>
                    <pre className="code-block">
{`{
  "email": "string",
  "password": "string"
}`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1">Response (200):</p>
                    <pre className="code-block">
{`{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}`}
                    </pre>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      GET /api/posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Get all posts.
                    </p>
                    <p className="text-sm font-semibold mb-1">Headers:</p>
                    <pre className="code-block">
{`{
  "Authorization": "Bearer {token}"
}`}
                    </pre>
                    <p className="text-sm font-semibold mt-3 mb-1">Response (200):</p>
                    <pre className="code-block">
{`[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": {
      "id": "string",
      "username": "string"
    },
    "createdAt": "string",
    "updatedAt": "string"
  }
]`}
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
