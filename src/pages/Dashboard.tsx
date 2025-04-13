
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
import { BookOpen, Filter, PlusCircle, Search, Rocket, Sparkles } from "lucide-react";
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div 
        ref={headerRef} 
        className={`sticky-header ${headerScrolled ? 'scrolled' : ''} py-6`}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="animate-fade-in">
              <h1 className="text-3xl font-bold mb-1 gradient-text">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="font-medium text-violet-600">{user.name}</span>! Continue learning or start a new project.
              </p>
            </div>
            <Button variant="default" asChild className="animate-fade-in bg-gradient-to-r from-violet-500 to-indigo-500 hover:from-violet-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300">
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
            <TabsList className="bg-slate-50 p-1 shadow-inner">
              <TabsTrigger 
                value="all-projects" 
                className={`flex items-center gap-1 tab-glow ${activeTab === 'all-projects' ? 'tab-selected' : ''}`}
              >
                <BookOpen className="h-4 w-4" />
                <span>All Projects</span>
              </TabsTrigger>
              <TabsTrigger 
                value="my-projects" 
                className={`flex items-center gap-1 tab-glow ${activeTab === 'my-projects' ? 'tab-selected' : ''}`} 
                data-testid="my-projects-tab"
              >
                <BookOpen className="h-4 w-4" />
                <span>My Projects</span>
                <span className="ml-1 rounded-full bg-indigo-100 text-indigo-700 px-2 py-0.5 text-xs font-medium">
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
                    className="pl-10 border-slate-200 focus:border-violet-300 focus:ring-violet-200 transition-all duration-300"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2 border-slate-200 hover:border-slate-300 transition-colors">
                      <Filter className="h-4 w-4 text-slate-500" />
                      <span>Filter</span>
                      {difficulty.length > 0 && (
                        <span className="ml-1 rounded-full bg-violet-100 text-violet-800 px-2 py-0.5 text-xs font-medium">
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
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        Easy
                      </span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("medium")}
                      onCheckedChange={() => handleDifficultyChange("medium")}
                      className="hover:bg-blue-50"
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        Medium
                      </span>
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={difficulty.includes("hard")}
                      onCheckedChange={() => handleDifficultyChange("hard")}
                      className="hover:bg-purple-50"
                    >
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        Hard
                      </span>
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {filteredProjects.length === 0 ? (
                <Card className="dashboard-card animate-fade-in">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="p-4 rounded-full bg-slate-100 mb-4 animate-pulse-slow">
                      <BookOpen className="h-10 w-10 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium">No projects found</h3>
                    <p className="text-muted-foreground mt-1">
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
                <Card className="dashboard-card animate-pulse-slow">
                  <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="relative w-12 h-12 mb-4">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-200 border-t-indigo-500 animate-spin"></div>
                    </div>
                    <h3 className="text-lg font-medium mt-2">Loading your projects...</h3>
                    <p className="text-muted-foreground mt-1">
                      Just a moment while we prepare your dashboard
                    </p>
                  </CardContent>
                </Card>
              ) : userProjects.length === 0 ? (
                <Card className="dashboard-card overflow-hidden">
                  <CardContent className="flex flex-col items-center justify-center py-16 relative">
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-violet-600"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="p-4 bg-indigo-100 rounded-full mb-6 animate-float">
                        <Rocket className="h-10 w-10 text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-medium">Start your learning journey</h3>
                      <p className="text-muted-foreground mt-2 mb-6 text-center max-w-md">
                        You haven't started any projects yet. Browse our catalog and choose a project to begin building your skills.
                      </p>
                      <Button 
                        variant="default" 
                        onClick={switchToAllProjects}
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        <Sparkles className="h-4 w-4" />
                        Browse Projects
                      </Button>
                    </div>
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
