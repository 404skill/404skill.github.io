
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, PlusCircle, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Project, User } from "@/lib/types";
import { projects, getUserProjects } from "@/lib/data";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      navigate("/auth");
      return;
    }
    
    const userData = JSON.parse(userStr) as User;
    setUser(userData);
    
    // Get user's projects
    const userProjectsData = getUserProjects(userData.id);
    setUserProjects(userProjectsData);
  }, [navigate]);
  
  useEffect(() => {
    // Filter projects based on search term and difficulty
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
    setDifficulty((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
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
          
          <Tabs defaultValue="all-projects" className="space-y-8">
            <TabsList>
              <TabsTrigger value="all-projects" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>All Projects</span>
              </TabsTrigger>
              <TabsTrigger value="my-projects" className="flex items-center gap-1">
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
                  {filteredProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      userId={user.id}
                      inProgress={userProjects.some(p => p.id === project.id)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-projects">
              {userProjects.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <BookOpen className="h-10 w-10 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No projects started yet</h3>
                    <p className="text-muted-foreground mt-1 mb-4">
                      Choose a project to begin your learning journey
                    </p>
                    <Button 
                      variant="default" 
                      onClick={() => document.querySelector('[data-value="all-projects"]')?.click()}
                    >
                      Browse Projects
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProjects.map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      userId={user.id} 
                      inProgress 
                    />
                  ))}
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
