
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

interface ProjectCardProps {
  project: Project;
  userId: string;
  inProgress?: boolean;
  completion?: number;
}

const ProjectCard = ({ project, userId, inProgress = false, completion = 0 }: ProjectCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full animate-fade-in project-card-premium rainbow-border glow-effect ${inProgress ? 'border-indigo-200' : ''}`}>
      <CardHeader className="pb-2 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-violet-50/50"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center">
            <CardTitle className="text-lg gradient-text">
              {project.title}
            </CardTitle>
            {inProgress && (
              <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                <Star className="w-3 h-3 mr-1 text-yellow-500 fill-yellow-400" />
                Active
              </span>
            )}
          </div>
          <Badge 
            variant="outline" 
            className={`
              ${project.difficulty === 'easy' ? 'pill-easy animate-pulse-slow' : ''}
              ${project.difficulty === 'medium' ? 'pill-medium' : ''}
              ${project.difficulty === 'hard' ? 'pill-hard' : ''}
            `}
          >
            {project.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-4 relative z-10">
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="text-xs hover:bg-secondary/80 transition-colors tech-badge"
            >
              {tech}
            </Badge>
          ))}
        </div>
        
        {inProgress && (
          <div className="mt-auto pt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1 text-violet-600 font-medium">
                <Clock className="h-3 w-3" /> In progress
              </span>
              <span className="text-violet-700 font-medium">{Math.round(completion)}% complete</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-auto relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-violet-50/50"></div>
        
        <Link to={`/projects/${project.id}`} className="w-full relative z-10">
          <Button 
            variant={inProgress ? "secondary" : "default"} 
            className={`w-full transition-all duration-300 group ${inProgress ? 'bg-violet-100 text-violet-800 hover:bg-violet-200' : 'bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600'}`}
          >
            {inProgress ? (
              <>
                <span>Continue</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            ) : (
              <>
                <span>Start Project</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
