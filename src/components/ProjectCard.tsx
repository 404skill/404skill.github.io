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
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ArrowRight, Tag, TagIcon } from 'lucide-react';
import { ProjectDTO, Variant } from '@/lib/types';
import { useProjectCompletion } from '@/hooks/useProjectCompletion';
import { VariantDropdown } from '@/components/ui/VariantDropdown';

interface ProjectCardProps {
  project: ProjectDTO;
  isOwned: boolean;
  variants?: Variant[];
  selectedVariantId?: string;
  onVariantSelect?: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  isOwned,
  variants,
  selectedVariantId,
  onVariantSelect,
}) => {
  const {
    metrics: completion,
    isLoading: completionLoading,
    error: completionError,
  } = useProjectCompletion(isOwned ? project.projectId : '');

  let percent = 0;
  if (completion && completion.totalTests > 0) {
    percent = Math.round((completion.passedTests / completion.totalTests) * 100);
  }

  const handleVariantChange = (newProjectId: string) => {
    onVariantSelect?.(newProjectId);
  };

  const formatTags = (tagsString?: string): string[] => {
    if (!tagsString) return [];
    return tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .map(tag => tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase());
  };

  const formattedTags = formatTags(project.tags);

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full animate-fade-in project-card
            border-slate-200 hover:border-slate-300
            ${isOwned ? 'border-blue-500/50 border-l-4' : ''}`}
    >
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-center relative z-10">
          <CardTitle className="text-lg font-mono text-slate-800">{project.name}</CardTitle>
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{project.shortDescription}</p>
          {formattedTags.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
            <button
                className="
                flex items-center gap-1
                px-2 py-1
                bg-amber-50 border border-amber-200 rounded-full
                text-sm font-medium text-amber-700
                hover:bg-amber-100 hover:border-amber-300
                transition
                "
            >
                <TagIcon className="w-4 h-4 text-amber-500" />
                Tech tag{formattedTags.length > 1 ? 's' : ''}
            </button>
            </PopoverTrigger>

            <PopoverContent
            side="bottom"
            align="start"
            className="
                mt-2
                bg-white
                shadow-md
                rounded-lg
                p-3
                border border-amber-100
                min-w-[12rem]
            "
            >
            <div className="flex flex-wrap gap-2">
                {formattedTags.map((tag) => (
                <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs font-mono capitalize bg-amber-100 text-amber-800 border-amber-200"
                >
                    {tag}
                </Badge>
                ))}
            </div>
            </PopoverContent>
            </Popover>
        )}
        </div>
      </CardHeader>

      <div className="h-10 flex items-center px-4">
        {variants && variants.length > 1 ? (
          <VariantDropdown
            options={variants.map(variant => ({
              value: variant.projectId,
              label: variant.techs.join(', '),
            }))}
            value={selectedVariantId}
            onChange={handleVariantChange}
          />
        ) : (
          <div className="h-6 w-full" />
        )}
      </div>

      <CardContent className="flex-1 flex flex-col pb-1 relative z-10">
        <div className="mt-6 h-10 w-full">
          {isOwned &&
            (completionLoading ? (
              <div className="h-4 w-full bg-slate-200 animate-pulse rounded-md" />
            ) : completionError ? (
              <p className="text-xs text-red-500 font-mono">Error loading progress</p>
            ) : completion ? (
              <>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-slate-700">
                    {completion.totalTests === 0
                      ? `(0/0)`
                      : `${percent}% complete (${completion.passedTests}/${completion.totalTests})`}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </>
            ) : null)}
        </div>
      </CardContent>

      <CardFooter className="pt-2 mt-auto">
        <Link to={`/projects/${project.projectId}`} className="w-full" state={{ isOwned }}>
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
