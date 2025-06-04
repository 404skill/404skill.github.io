import React, { FC } from 'react';
import type { Project } from '@/lib/types';
import MarkdownRenderer from '@/components/MarkdownRenderer.tsx';

interface DetailsTabProps {
  project: Project;
}

export const DetailsTab: FC<DetailsTabProps> = ({ project }) => (
  <div className="space-y-6">
    <h3 className="text-lg font-medium font-mono">Project Overview</h3>
    <MarkdownRenderer content={project.description} />
  </div>
);
