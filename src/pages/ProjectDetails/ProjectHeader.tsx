import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VariantDropdown } from '@/components/ui/VariantDropdown';

import type { ProjectDTO } from '@/lib/types';

interface ProjectHeaderProps {
    project: ProjectDTO;
    variants: { value: string; label: string }[];
    selectedVariantId: string;
    onVariantChange: (newId: string) => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
                                                                project,
                                                                variants,
                                                                selectedVariantId,
                                                                onVariantChange,
                                                            }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6">
            <Button
                variant="ghost"
                className="mb-4 font-mono text-slate-600 hover:text-slate-800"
                onClick={() => navigate('/dashboard')}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-bold font-mono text-slate-800">{project.name}</h1>

                    <Badge
                        variant="outline"
                        className={`
              font-mono text-xs
              ${project.difficulty === 'easy' ? 'border-green-500/30 bg-green-100 text-green-700' : ''}
              ${project.difficulty === 'medium' ? 'border-yellow-500/30 bg-yellow-100 text-yellow-700' : ''}
              ${project.difficulty === 'hard' ? 'border-red-500/30 bg-red-100 text-red-700' : ''}
            `}
                    >
                        {project.difficulty}
                    </Badge>

                    {variants.length > 1 && (
                        <VariantDropdown
                            options={variants}
                            value={selectedVariantId}
                            onChange={onVariantChange}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
