// src/components/DetailsTab.tsx
import React from 'react';
import type { FC } from 'react';
import type { ProjectDTO } from '@/lib/types';
import MarkdownRenderer from '@/components/markdown-renderer/MarkdownRenderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Code, Layers, TrendingUp, ExternalLink } from 'lucide-react';

interface DetailsTabProps {
  project: ProjectDTO;
}

export const DetailsTab: FC<DetailsTabProps> = ({ project }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Project Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-mono">
            <Layers className="h-5 w-5" />
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground font-mono">Difficulty</p>
                <Badge className={`${getDifficultyColor(project.difficulty)} font-mono`}>
                  {project.difficulty}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground font-mono">Duration</p>
                <p className="font-mono font-medium">{project.estimatedDurationMinutes} min</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
              <Layers className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground font-mono">Type</p>
                <p className="font-mono font-medium">{project.type}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Description Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-mono">Project Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <MarkdownRenderer content={project.description} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
