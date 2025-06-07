import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import type { ProjectDTO } from '@/lib/types';

interface MyProjectsTabProps {
  userProjects: ProjectDTO[];
  onProjectClick: (id: string) => void;
}

export const MyProjectsTab: React.FC<MyProjectsTabProps> = ({
                                                       userProjects,
                                                       onProjectClick,
                                                     }) => {
  return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userProjects.map((proj) => (
            <div key={proj.projectId}>
              <ProjectCard project={proj} isOwned={true} />
            </div>
        ))}
      </div>
  );
};

export default MyProjectsTab;
