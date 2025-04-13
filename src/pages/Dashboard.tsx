
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Filter, PlusCircle, Search, Code, Terminal } from "lucide-react";
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
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  
  // Use the hook to get user projects from Supabase
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

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const scrollTop = window.scrollY;
        setHeaderScrolled(scrollTop > 10);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const handleDifficultyChange = (value: string) => {
    setDifficulty((prev) => {
      if (prev.includes(value)) {
        return prev.filter(item => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  
  const switchToAllProjects = () => {
    setActiveTab("all-projects");
  };
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <div 
        ref={headerRef} 
        className={`sticky-header ${headerScrolled ? 'scrolled' : ''} py-6 bg-white border-b`}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold mb-1 font-mono">Dashboard</h1>
              <p className="text-muted-foreground text-sm font-mono">
                Welcome back, <span className="font-medium text-blue-700">{user.name}</span>! Continue learning or start a new project.
              </p>
            </div>
            <Button variant="default" asChild className="animate-fade-in bg-blue-600 hover:bg-blue-700 font-mono">
              <a href="/help">
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Request Help</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
      
      <main className="flex-1 py-6">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger 
                value="all-projects" 
                className={`flex items-center gap-1 tab-indicator ${activeTab === 'all-projects' ? 'tab-selected' : ''}`}
              >
                <Terminal className="h-4 w-4" />
                <span className="font-mono text-sm">All Projects</span>
              </TabsTrigger>
              <TabsTrigger 
                value="my-projects" 
                className={`flex items-center gap-1 tab-indicator ${activeTab === 'my-projects' ? 'tab-selected' : ''}`} 
                data-testid="my-projects-tab"
              >
                <Code className="h-4 w-4" />
                <span className="font-mono text-sm">My Projects</span>
                <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">
                  {userProjects.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all-projects" className="animate-fade-in">
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-slate-200 focus:border-blue-300 focus:ring-blue-200 transition-all duration-300 font-mono"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-slate-200 hover:border-slate-300 transition-colors font-mono">
                      <Filter className="h-4 w-4 text-slate-500" />
                      <span>Filter</span>
                      {difficulty.length > 0 && (
                        <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs">
                          {difficulty.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="animate-fade-in">
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("easy")}
                      onCheckedChange={() => handleDifficultyChange("easy")}
                      className="hover:bg-green-50"
                    >
                      <span className="flex items-center font-mono">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        Easy
                      </span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("medium")}
                      onCheckedChange={() => handleDifficultyChange("medium")}
                      className="hover:bg-blue-50"
                    >
                      <span className="flex items-center font-mono">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        Medium
                      </span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("hard")}
                      onCheckedChange={() => handleDifficultyChange("hard")}
                      className="hover:bg-purple-50"
                    >
                      <span className="flex items-center font-mono">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        Hard
                      </span>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {filteredProjects.length === 0 ? (
                <Card className="project-card animate-fade-in">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="p-4 rounded-full bg-slate-100 mb-4">
                      <BookOpen className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium font-mono">No projects found</h3>
                    <p className="text-muted-foreground mt-1 font-mono">
                      Try adjusting your search or filters
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProjects.map((project, index) => {
                    const inProgress = userProjects.some(p => p.id === project.id);
                    const userProject = userProjects.find(p => p.id === project.id);
                    const completion = userProject?.progress?.completed_tasks.length 
                      ? (userProject.progress.completed_tasks.length / project.tasks.length) * 100
                      : 0;
                    
                    return (
                      <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                        <ProjectCard
                          project={project} 
                          userId={user.id}
                          inProgress={inProgress}
                          completion={inProgress ? completion : 0}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-projects" className="animate-fade-in">
              {loading ? (
                <Card className="project-card">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="relative w-12 h-12 mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-blue-500 animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-medium mt-2 font-mono">Loading your projects...</h3>
                    <p className="text-muted-foreground mt-1 font-mono">
                      Just a moment while we prepare your dashboard
                    </p>
                  </CardContent>
                </Card>
              ) : userProjects.length === 0 ? (
                <Card className="project-card overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center py-16 relative">
                    <div className="p-4 bg-blue-100 rounded-full mb-6">
                      <Terminal className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-medium font-mono">Start your learning journey</h3>
                    <p className="text-muted-foreground mt-2 mb-6 text-center max-w-md font-mono">
                      You haven't started any projects yet. Browse our catalog and choose a project to begin building your skills.
                    </p>
                    <Button 
                      variant="default" 
                      onClick={switchToAllProjects}
                      size="lg"
                      className="gap-2 bg-blue-600 hover:bg-blue-700 font-mono"
                    >
                      <Code className="h-4 w-4" />
                      Browse Projects
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {userProjects.map((project, index) => {
                    const completion = project.progress?.completed_tasks.length 
                      ? (project.progress.completed_tasks.length / project.tasks.length) * 100
                      : 0;
                    
                    return (
                      <div key={project.id} className="animate-fade-in" style={{ animationDelay: `${index * 75}ms` }}>
                        <ProjectCard 
                          project={project} 
                          userId={user.id} 
                          inProgress={true}
                          completion={completion}
                        />
                      </div>
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
