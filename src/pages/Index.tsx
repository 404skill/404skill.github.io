
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  CheckCircle, 
  Code, 
  Download, 
  HelpCircle, 
  LucideIcon, 
  ScrollText, 
  Terminal 
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const Index = () => {
  // Check if user is already logged in
  const isLoggedIn = localStorage.getItem('user') !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 space-y-8 md:space-y-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Master <span className="gradient-text">Backend Development</span><br />
              With Real-World Projects
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              Take your coding skills to the next level with practical projects that teach you how to build robust, scalable backend systems.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              {isLoggedIn ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Go to Projects
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="gap-2">
                    <Terminal className="h-5 w-5" />
                    Start Coding Now
                  </Button>
                </Link>
              )}
              
              <Link to="/auth">
                <Button variant="outline" size="lg" className="gap-2">
                  <HelpCircle className="h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="container py-16 md:py-20">
          <h2 className="mb-10 text-center text-2xl font-bold">How BackendHub Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Feature 
              icon={BookOpen}
              title="Choose a Project"
              description="Select from our curated list of backend projects covering various technologies and difficulty levels."
            />
            <Feature 
              icon={Download}
              title="Download Starter Template"
              description="Get started with our pre-configured templates that include tests and project structure."
            />
            <Feature 
              icon={Code}
              title="Implement Solution"
              description="Write your code to implement the required functionality based on the project specifications."
            />
            <Feature 
              icon={ScrollText}
              title="Run Tests"
              description="Execute the tests provided to verify your implementation against requirements."
            />
            <Feature 
              icon={CheckCircle}
              title="Track Progress"
              description="Monitor your progress through our dashboard as you complete each task."
            />
            <Feature 
              icon={HelpCircle}
              title="Get Support"
              description="Stuck on a problem? Request help or code reviews from our expert community."
            />
          </div>
        </section>
        
        {/* Technologies Section */}
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container">
            <h2 className="mb-10 text-center text-2xl font-bold">Technologies You'll Master</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {["Node.js", "Express", "GraphQL", "MongoDB", "PostgreSQL", "Redis", "Docker", "Microservices", "Socket.io", "Authentication", "API Design", "Testing"].map((tech) => (
                <div key={tech} className="rounded-lg bg-card px-4 py-2 shadow-sm border">
                  <span className="font-medium">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="container py-24">
          <div className="mx-auto max-w-[58rem] space-y-6 text-center">
            <h2 className="text-3xl font-bold">Ready to Level Up Your Backend Skills?</h2>
            <p className="text-muted-foreground">
              Join our community of developers and start building powerful, scalable backend applications today.
            </p>
            {!isLoggedIn && (
              <Link to="/auth">
                <Button size="lg">
                  Sign Up Now
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2025 BackendHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:underline">Terms</Link>
            <Link to="#" className="hover:underline">Privacy</Link>
            <Link to="#" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
