
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
  userId: string;
  inProgress?: boolean;
  completion?: number;
}

const ProjectCard = ({ project, userId, inProgress = false, completion = 0 }: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md hover:border-primary/50 hover:translate-y-[-4px] flex flex-col h-full animate-fade-in">
      <CardHeader className="pb-2 bg-gradient-to-r from-slate-50 to-white">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{project.title}</CardTitle>
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
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-4">
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs hover:bg-secondary/80 transition-colors">
              {tech}
            </Badge>
          ))}
        </div>
        
        {inProgress && (
          <div className="mt-auto pt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" /> In progress
              </span>
              <span className="text-primary">{Math.round(completion)}% complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-auto bg-gradient-to-r from-white to-slate-50">
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button 
            variant={inProgress ? "secondary" : "default"} 
            className="w-full transition-all duration-300 hover:shadow"
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
