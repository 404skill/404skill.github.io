import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { ProjectDTO } from '@/lib/types';

interface AllProjectsTabProps {
  allProjects: ProjectDTO[];
  userProjects: ProjectDTO[];
  onProjectClick: (id: string) => void;
}

export const AllProjectsTab: React.FC<AllProjectsTabProps> = ({
                                                         allProjects,
                                                         userProjects,
                                                         onProjectClick,
                                                       }) => {
  // Build a Set of owned IDs for quick lookup
  const ownedIds = new Set(userProjects.map((p) => p.projectId));

  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {allProjects.map((proj) => (
            <div key={proj.projectId}>
              <ProjectCard
                  project={proj}
                  isOwned={ownedIds.has(proj.projectId)}
              />
            </div>
        ))}
      </div>
  );
};

export default AllProjectsTab;
