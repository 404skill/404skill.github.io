// src/components/Dashboard/AllProjectsTab.tsx
import React, { FC } from 'react';
import type { Project } from '@/lib/types';
import { UserProjectWithCompletion } from '@/hooks/useUserProjectsWithCompletion.ts';
import ProjectCard from '@/components/ProjectCard.tsx';

interface AllProjectsTabProps {
  allProjects: Project[];
  userProjects: UserProjectWithCompletion[];
  onProjectClick: (projectId: string) => void;
  currentUserId: string;
}

const AllProjectsTab: FC<AllProjectsTabProps> = ({
  allProjects,
  userProjects,
  onProjectClick,
  currentUserId,
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {allProjects.map((proj, idx) => {
        const inProgress = userProjects.some(up => up.id === proj.id);
        // If inProgress, grab passed/total from userProjects
        const userProj = userProjects.find(up => up.id === proj.id);
        const percent = userProj?.total ? Math.round((userProj.passed / userProj.total) * 100) : 0;

        return (
          <div
            key={proj.id}
            className="animate-fade-in"
            style={{ animationDelay: `${idx * 75}ms` }}
            onClick={() => onProjectClick(proj.id)}
          >
            <ProjectCard
              project={proj}
              userId={currentUserId}
              inProgress={inProgress}
              completion={inProgress ? { passed: userProj!.passed, total: userProj!.total } : null}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllProjectsTab;
