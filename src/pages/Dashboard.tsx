import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, PlusCircle, Search, Rocket } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Project, User } from "@/lib/types";
import { projects } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserProgress } from "@/hooks/useUserProgress";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [activeTab, setActiveTab] = useState("all-projects");
  
  // Use the new hook to get user projects from Supabase
  const { userProjects, loading } = useUserProgress(user?.id || null);
  
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(userStr) as User;
    setUser(userData);
  }, [navigate]);
  
  useEffect(() => {
    let filtered = projects;
    
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    
    if (difficulty.length > 0) {
      filtered = filtered.filter((project) =>
        difficulty.includes(project.difficulty)
      );
    }
    
    setFilteredProjects(filtered);
  }, [searchTerm, difficulty]);
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty([value]);
  };
  
  const switchToAllProjects = () => {
    setActiveTab("all-projects");
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}! Continue learning or start a new project.
              </p>
            </div>
            <Button variant="default" asChild>
              <a href="/help">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Request Help</span>
              </a>
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList>
              <TabsTrigger value="all-projects" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>All Projects</span>
              </TabsTrigger>
              <TabsTrigger value="my-projects" className="flex items-center gap-1" data-testid="my-projects-tab">
                <BookOpen className="h-4 w-4" />
                <span>My Projects</span>
                <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
                  {userProjects.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-projects">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                      {difficulty.length > 0 && (
                        <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium">
                          {difficulty.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("easy")}
                      onCheckedChange={() => handleDifficultyChange("easy")}
                    >
                      Easy
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("medium")}
                      onCheckedChange={() => handleDifficultyChange("medium")}
                    >
                      Medium
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("hard")}
                      onCheckedChange={() => handleDifficultyChange("hard")}
                    >
                      Hard
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {filteredProjects.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No projects found</h3>
                    <p className="text-muted-foreground mt-1">
                      Try adjusting your search or filters
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project) => {
                    const inProgress = userProjects.some(p => p.id === project.id);
                    const userProject = userProjects.find(p => p.id === project.id);
                    const completion = userProject?.progress?.completed_tasks.length 
                      ? (userProject.progress.completed_tasks.length / project.tasks.length) * 100
                      : 0;
                    
                    return (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        userId={user.id}
                        inProgress={inProgress}
                        completion={inProgress ? completion : 0}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-projects">
              {loading ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
                    <h3 className="text-lg font-medium mt-4">Loading your projects...</h3>
                  </CardContent>
                </Card>
              ) : userProjects.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <Rocket className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Start your learning journey</h3>
                    <p className="text-muted-foreground mt-1 mb-4 text-center max-w-md">
                      You haven't started any projects yet. Browse our catalog and choose a project to begin building your skills.
                    </p>
                    <Button 
                      variant="default" 
                      onClick={switchToAllProjects}
                      size="lg"
                      className="gap-2 animate-pulse hover:animate-none"
                    >
                      <BookOpen className="h-4 w-4" />
                      Browse Projects
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProjects.map((project) => {
                    const completion = project.progress?.completed_tasks.length 
                      ? (project.progress.completed_tasks.length / project.tasks.length) * 100
                      : 0;
                    
                    return (
                      <ProjectCard 
                        key={project.id} 
                        project={project} 
                        userId={user.id} 
                        inProgress={true}
                        completion={completion}
                      />
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
