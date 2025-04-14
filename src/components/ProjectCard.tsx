
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Project } from "@/lib/types";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { CheckIcon } from "@/components/icons/CheckIcon";

interface ProjectCardProps {
  project: Project;
  userId: string;
  inProgress?: boolean;
  completion?: number;
}

const ProjectCard = ({ project, userId, inProgress = false, completion = 0 }: ProjectCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full animate-fade-in project-card 
      border-slate-200 hover:border-slate-300 
      ${inProgress ? 'border-blue-500/50 border-l-4' : ''}`}>
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center">
            <CardTitle className="text-lg font-mono text-slate-800">
              {project.title}
            </CardTitle>
          </div>
          <Badge 
            variant="outline" 
            className={`
              font-mono text-xs uppercase
              ${project.difficulty === 'easy' ? 'border-green-500/30 bg-green-100 text-green-700' : ''}
              ${project.difficulty === 'medium' ? 'border-yellow-500/30 bg-yellow-100 text-yellow-700' : ''}
              ${project.difficulty === 'hard' ? 'border-red-500/30 bg-red-100 text-red-700' : ''}
            `}
          >
            {project.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col pb-4 relative z-10">
        <p className="text-slate-600 text-sm mb-4 font-mono">{project.description}</p>
        
        {inProgress && (
          <div className="mt-auto pt-4">
            <div className="flex justify-between text-xs mb-1.5 font-mono">
              <span className="flex items-center gap-1 text-blue-700 font-medium">
                <Clock className="h-3 w-3" /> In progress
              </span>
              <span className="text-slate-700 font-medium">{Math.round(completion)}% complete</span>
            </div>
            <Progress value={completion} className="h-1 bg-slate-200" />
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Link to={`/projects/${project.id}`} className="w-full">
          <Button 
            variant={inProgress ? "secondary" : "default"} 
            className={`w-full transition-all duration-300 group font-mono 
              ${inProgress ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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
