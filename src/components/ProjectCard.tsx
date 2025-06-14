// src/components/ProjectCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ProjectDTO, ProjectMetricsDTO } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { useProjectCompletion } from '@/hooks/useProjectCompletion';

interface ProjectCardProps {
  project: ProjectDTO;
  isOwned: boolean; // whether the current user already “owns” this project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isOwned }) => {
  // If the user owns this project, fetch its completion metrics
  const {
    metrics: completion,
    isLoading: completionLoading,
    error: completionError,
  } = useProjectCompletion(isOwned ? project.projectId : '');

  // Compute percent complete, but only if we have metrics
  let percent = 0;
  if (completion && completion.totalTests > 0) {
    percent = Math.round((completion.passedTests / completion.totalTests) * 100);
  }

  return (
      <Card
          className={`overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full animate-fade-in project-card
        border-slate-200 hover:border-slate-300
        ${isOwned ? 'border-blue-500/50 border-l-4' : ''}`}
      >
        <CardHeader className="pb-2 relative">
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center">
              <CardTitle className="text-lg font-mono text-slate-800">
                {project.name}
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
          {isOwned && (
              <div className="mt-6 h-10 w-full">
                {completionLoading ? (
                    // Show a small loading placeholder for the progress bar
                    <div className="h-4 w-full bg-slate-200 animate-pulse rounded-md" />
                ) : completionError ? (
                    <p className="text-xs text-red-500 font-mono">Error loading progress</p>
                ) : completion ? (
                    <>
                      {/* Progress text */}
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span className="text-slate-500">Progress</span>
                        <span className="text-slate-700">
                    {completion.totalTests === 0
                        ? `(0/0)`
                        : `${percent}% complete (${completion.passedTests}/${completion.totalTests})`}
                  </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: `${percent}%` }}
                        />
                      </div>
                    </>
                ) : null}
              </div>
          )}
        </CardContent>

        <CardFooter className="pt-4 mt-auto">
          <Link to={`/projects/${project.projectId}`} className="w-full">
            <Button
                variant={isOwned ? 'secondary' : 'default'}
                className={`w-full transition-all duration-300 group font-mono
              ${
                    isOwned
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
            >
              {isOwned ? (
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
