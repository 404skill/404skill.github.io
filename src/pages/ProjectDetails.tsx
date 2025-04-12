
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
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import ProgressTracker from "@/components/ProgressTracker";
import { Project, TestResult, User } from "@/lib/types";
import { getProject, getTaskResults, calculateProjectCompletion } from "@/lib/data";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import HelpRequestForm from "@/components/HelpRequestForm";
import { Link } from "react-router-dom";
import { projects } from "@/lib/data";

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [completion, setCompletion] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>(undefined);
  const [isHelpDialogOpen, setIsHelpDialogOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(userStr) as User;
    setUser(userData);
    
    // Get project data
    if (id) {
      const projectData = getProject(id);
      if (projectData) {
        setProject(projectData);
        
        // Get test results for this project
        const results = getTaskResults(userData.id, id);
        setTestResults(results);
        
        // Calculate completion percentage
        const completionPercentage = calculateProjectCompletion(userData.id, id);
        setCompletion(completionPercentage);
      } else {
        navigate("/dashboard");
      }
    }
  }, [id, navigate]);
  
  const handleDownloadTemplate = () => {
    if (!project) return;
    
    // In a real app, this would trigger a download of the project template
    // For demo purposes, we'll just show a toast
    toast({
      title: "Template downloaded",
      description: `You have downloaded the starter template for ${project.title}.`,
    });
  };
  
  const handleRequestHelp = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsHelpDialogOpen(true);
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
              <div className="flex justify-between text-sm mb-1">
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
