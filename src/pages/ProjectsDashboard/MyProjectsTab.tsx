import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { GroupedProject } from '@/lib/types';

interface MyProjectsTabProps {
    groups: GroupedProject[];
    onVariantSelect: (groupKey: string, projectId: string) => void;
}

export const MyProjectsTab: React.FC<MyProjectsTabProps> = ({
                                                                groups,
                                                                onVariantSelect,
                                                            }) => {
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
                <ProjectCard
                    key={group.key}
                    project={group.selected}
                    isOwned={group.selected.isOwned}
                    variants={group.variants}
                    selectedVariantId={group.selected.projectId}
                    onVariantSelect={(newId) => onVariantSelect(group.key, newId)}
                />
            ))}
        </div>
    );
};

export default MyProjectsTab;
