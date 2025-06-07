// src/components/DetailsTab.tsx
import React from 'react';
import type { FC } from 'react';
import type { ProjectDTO } from '@/lib/types';

interface DetailsTabProps {
    project: ProjectDTO;
}

export const DetailsTab: FC<DetailsTabProps> = ({ project }) => {
    return (
        <div className="prose max-w-none">
            <h2 className="font-mono text-lg mb-4">Project Details</h2>
            <p className="font-mono">
                <strong>Description:</strong>
            </p>
            <div
                className="prose prose-slate"
                dangerouslySetInnerHTML={{ __html: project.description }}
            />

            <ul className="mt-6 space-y-2 font-mono text-sm">
                <li>
                    <strong>Difficulty:</strong> {project.difficulty}
                </li>
                <li>
                    <strong>Language:</strong> {project.language}
                </li>
                <li>
                    <strong>Type:</strong> {project.type}
                </li>
                <li>
                    <strong>Estimated Duration:</strong> {project.estimatedDurationMinutes} minutes
                </li>
                <li>
                    <strong>Access Tier:</strong> {project.accessTier}
                </li>
            </ul>

            {project.repoUrl && (
                <p className="mt-4 font-mono">
                    Repository:{' '}
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        {project.repoUrl}
                    </a>
                </p>
            )}
        </div>
    );
};
