
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";
import { calculateProjectCompletion } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  userId: string;
  inProgress?: boolean;
}

const ProjectCard = ({ project, userId, inProgress = false }: ProjectCardProps) => {
  const completion = inProgress ? calculateProjectCompletion(userId, project.id) : 0;
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50 flex flex-col h-full">
      <CardHeader className="pb-2">
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
            <Badge key={tech} variant="secondary" className="text-xs">
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
                className="bg-primary h-1.5 rounded-full"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button 
            variant={inProgress ? "secondary" : "default"} 
            className="w-full"
          >
            {inProgress ? (
              <>
                <span>Continue</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : (
              <>
                <span>Start Project</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
