import { Button } from "@/components/ui/button";
import { 
  ArrowRight,
  BookOpen, 
  CheckCircle, 
  Code, 
  CreditCard,
  Download, 
  HelpCircle, 
  Lock,
  LucideIcon, 
  RocketIcon,
  ScrollText, 
  Server,
  Shield,
  Terminal,
  Zap,
  Briefcase,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] duration-300">
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const PricingTier = ({ title, price, description, features, highlighted = false, buttonText }: PricingTierProps) => (
  <Card className={`flex flex-col h-full ${highlighted ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}>
    {highlighted && (
      <div className="absolute top-0 right-0">
        <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none px-3 py-1 bg-primary text-primary-foreground">
          Popular
        </Badge>
      </div>
    )}
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground ml-1">/month</span>}
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

const TeamMember = ({ name, role, company, avatar }: { name: string; role: string; company: string; avatar: string }) => (
  <div className="flex flex-col items-center p-4">
    <Avatar className="h-20 w-20 mb-3">
      <AvatarImage src={avatar} alt={name} />
      <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
    </Avatar>
    <h3 className="font-medium text-lg">{name}</h3>
    <p className="text-sm text-muted-foreground">{role}</p>
    <Badge variant="outline" className="mt-1">{company}</Badge>
  </div>
);

const Index = () => {
  const isLoggedIn = localStorage.getItem('user') !== null;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="container py-24 space-y-8 md:space-y-12">
          <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Master <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Backend Development</span><br />
              With Real-World Projects
            </h1>
            <p className="max-w-[42rem] text-muted-foreground sm:text-xl">
              Take your coding skills to the next level with practical, hands-on projects that teach you how to build robust, secure, and scalable backend systems.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              {isLoggedIn ? (
                <Link to="/dashboard">
                  <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                    <BookOpen className="h-5 w-5" />
                    Go to Projects
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                    <Terminal className="h-5 w-5" />
                    Start Coding Now
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              )}
              
              <Link to="/auth">
                <Button variant="outline" size="lg" className="gap-2 hover:bg-primary/10 animate-fade-in font-mono" style={{ animationDelay: "100ms" }}>
                  <HelpCircle className="h-5 w-5" />
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold font-mono mb-2">Learn From FAANG Engineering Leaders</h2>
              <p className="text-muted-foreground max-w-[42rem] mx-auto">
                Our platform was founded and is run by senior backend engineers from top tech companies who review your code and provide personalized feedback.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <TeamMember 
                name="Alex Chen" 
                role="Co-Founder & CTO" 
                company="Ex-Google Staff Engineer" 
                avatar="/placeholder.svg" 
              />
              <TeamMember 
                name="Sarah Patel" 
                role="Co-Founder & Lead Mentor" 
                company="Ex-Amazon Principal SDE" 
                avatar="/placeholder.svg" 
              />
              <TeamMember 
                name="Marcus Kim" 
                role="Head of Curriculum" 
                company="Ex-Netflix Tech Lead" 
                avatar="/placeholder.svg" 
              />
            </div>
            
            <div className="mt-12 p-6 bg-card rounded-lg border max-w-3xl mx-auto shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="italic text-muted-foreground">
                    "Our mission is to bridge the gap between theoretical knowledge and practical backend engineering skills. 
                    Every project is designed based on real challenges we've faced at scale, and every code review is done 
                    by someone who has built and maintained systems serving millions of users."
                  </p>
                  <p className="mt-3 font-medium">— The BackendHub Founding Team</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="container py-16 md:py-24">
          <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "150ms" }}>
            <h2 className="text-3xl font-bold font-mono mb-4">How BackendHub Works</h2>
            <p className="text-muted-foreground max-w-[42rem] mx-auto">
              Our platform provides a structured approach to learning backend development through practical, real-world projects.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "200ms" }}>
              <Feature 
                icon={BookOpen}
                title="Choose a Project"
                description="Select from our curated list of backend projects covering various technologies and difficulty levels."
              />
            </div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "250ms" }}>
              <Feature 
                icon={Download}
                title="Download Starter Template"
                description="Get started with our pre-configured templates that include tests and project structure."
              />
            </div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "300ms" }}>
              <Feature 
                icon={Code}
                title="Implement Solution"
                description="Write your code to implement the required functionality based on the project specifications."
              />
            </div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "350ms" }}>
              <Feature 
                icon={ScrollText}
                title="Run Tests"
                description="Execute the tests provided to verify your implementation against requirements."
              />
            </div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "400ms" }}>
              <Feature 
                icon={CheckCircle}
                title="Track Progress"
                description="Monitor your progress through our dashboard as you complete each task."
              />
            </div>
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "450ms" }}>
              <Feature 
                icon={HelpCircle}
                title="Get Support"
                description="Stuck on a problem? Request help or code reviews from our expert community."
              />
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-mono mb-4">Why Choose BackendHub?</h2>
              <p className="text-muted-foreground max-w-[42rem] mx-auto">
                Our platform is designed to provide a comprehensive learning experience for backend developers of all levels.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Real-World Projects</h3>
                    <p className="text-muted-foreground">
                      Our projects are based on real-world scenarios that you'll encounter in your career as a backend developer.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Industry Best Practices</h3>
                    <p className="text-muted-foreground">
                      Learn and apply the latest industry standards and best practices for backend development.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <RocketIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Progressive Learning Path</h3>
                    <p className="text-muted-foreground">
                      Start with the basics and gradually advance to more complex concepts and technologies.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-75 animate-pulse"></div>
                <div className="relative bg-background rounded-lg p-6 shadow-xl">
                  <div className="rounded-lg overflow-hidden border border-muted">
                    <div className="bg-muted p-3 flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-xs font-mono text-muted-foreground">server.js</div>
                    </div>
                    <pre className="bg-black text-green-400 p-4 text-xs font-mono overflow-x-auto">
                      <code>
{`const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route
app.get('/api/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  });
});

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`}
                      </code>
                    </pre>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-medium">All tests passing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-muted/50 py-16 md:py-20">
          <div className="container">
            <h2 className="mb-10 text-center text-2xl font-bold font-mono">Technologies You'll Master</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Node.js", icon: <Terminal className="h-4 w-4 mr-2" /> },
                { name: "Express", icon: <Server className="h-4 w-4 mr-2" /> },
                { name: "GraphQL", icon: <Code className="h-4 w-4 mr-2" /> },
                { name: "MongoDB", icon: <Database className="h-4 w-4 mr-2" /> },
                { name: "PostgreSQL", icon: <Database className="h-4 w-4 mr-2" /> },
                { name: "Redis", icon: <Zap className="h-4 w-4 mr-2" /> },
                { name: "Docker", icon: <Box className="h-4 w-4 mr-2" /> },
                { name: "Microservices", icon: <Network className="h-4 w-4 mr-2" /> },
                { name: "Socket.io", icon: <Signal className="h-4 w-4 mr-2" /> },
                { name: "Authentication", icon: <Lock className="h-4 w-4 mr-2" /> },
                { name: "API Design", icon: <FileJson className="h-4 w-4 mr-2" /> },
                { name: "Testing", icon: <Check className="h-4 w-4 mr-2" /> },
              ].map((tech) => (
                <div key={tech.name} className="rounded-lg bg-card px-4 py-2 shadow-sm border hover:shadow-md transition-all hover:translate-y-[-2px] flex items-center">
                  {tech.icon}
                  <span className="font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-mono mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-[42rem] mx-auto">
                Choose the plan that's right for you and start building backend skills today.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <PricingTier 
                title="Free"
                price="Free"
                description="Perfect for beginners"
                features={[
                  "Access to 3 beginner projects",
                  "Community support",
                  "Basic progress tracking",
                  "Run tests in the browser"
                ]}
                buttonText="Sign Up Free"
              />
              
              <PricingTier 
                title="Pro"
                price="$19"
                description="For serious learners"
                features={[
                  "Access to all 20+ projects",
                  "Priority community support",
                  "Advanced progress tracking",
                  "Code reviews (2 per month)",
                  "Project certificates"
                ]}
                highlighted={true}
                buttonText="Get Started"
              />
              
              <PricingTier 
                title="Teams"
                price="$49"
                description="For teams & organizations"
                features={[
                  "Everything in Pro",
                  "Team dashboard",
                  "Unlimited code reviews",
                  "Custom projects",
                  "Team leaderboards",
                  "Admin controls"
                ]}
                buttonText="Contact Sales"
              />
            </div>
          </div>
        </section>
        
        <section className="container py-24">
          <div className="mx-auto max-w-[58rem] space-y-6 text-center">
            <h2 className="text-3xl font-bold font-mono">Ready to Level Up Your Backend Skills?</h2>
            <p className="text-muted-foreground max-w-[42rem] mx-auto">
              Join our community of developers and start building powerful, scalable backend applications today with feedback from FAANG engineering leaders.
            </p>
            {!isLoggedIn && (
              <Link to="/auth">
                <Button size="lg" className="animate-pulse hover:animate-none font-mono">
                  Sign Up Now
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground font-mono">
            &copy; 2025 BackendHub. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground font-mono">
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

const Database = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
  </svg>
);

const Box = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.29 7 12 12 20.71 7"></polyline>
    <line x1="12" y1="22" x2="12" y2="12"></line>
  </svg>
);

const Network = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="5" r="3"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <circle cx="6" cy="15" r="3"></circle>
    <line x1="6" y1="18" x2="6" y2="20"></line>
    <line x1="9" y1="15" x2="9" y2="15"></line>
    <circle cx="18" cy="15" r="3"></circle>
    <line x1="18" y1="18" x2="18" y2="20"></line>
  </svg>
);

const Signal = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 20h.01"></path>
    <path d="M7 20v-4"></path>
    <path d="M12 20v-8"></path>
    <path d="M17 20V8"></path>
    <path d="M22 4v16"></path>
  </svg>
);

const FileJson = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"></path>
    <path d="M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"></path>
  </svg>
);

const Check = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);
