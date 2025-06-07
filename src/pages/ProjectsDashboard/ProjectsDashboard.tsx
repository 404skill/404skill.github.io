// src/pages/ProjectsDashboard/ProjectsDashboard.tsx

import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {BookOpen, Code, Loader, Terminal} from 'lucide-react';

import { useAllProjects } from '@/hooks/useAllProjects';
import { useUserProjects } from '@/hooks/useUserProjects';
import type { User, ProjectDTO } from '@/lib/types';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';

import ProjectsDashboardHeader from '@/pages/ProjectsDashboard/ProjectsDashboardHeader';
import ProjectFilterBar from '@/pages/ProjectsDashboard/ProjectFilterBar';
import { AllProjectsTab } from '@/pages/ProjectsDashboard/AllProjectsTab';
import { MyProjectsTab } from '@/pages/ProjectsDashboard/MyProjectsTab';

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all-projects' | 'my-projects'>('all-projects');

  // 1) Fetch data
  const { allProjects, allLoading, allError } = useAllProjects();
  const { userProjects, myProjectsLoading, myProjectsError } = useUserProjects();

  // 2) Filter state lifted here
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);

  const toggleDifficulty = (level: string) => {
    setDifficultyFilter((prev) =>
        prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  // 3a) Filter “All Projects”
  const filteredAllProjects = useMemo(() => {
    return allProjects.filter((proj: ProjectDTO) => {
      const matchesSearch =
          proj.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      const matchesDifficulty =
          difficultyFilter.length === 0 || difficultyFilter.includes(proj.difficulty);
      return matchesSearch && matchesDifficulty;
    });
  }, [allProjects, searchTerm, difficultyFilter]);

  // 3b) ALSO filter “My Projects” the exact same way
  const filteredUserProjects = useMemo(() => {
    return userProjects.filter((proj: ProjectDTO) => {
      const matchesSearch =
          proj.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      const matchesDifficulty =
          difficultyFilter.length === 0 || difficultyFilter.includes(proj.difficulty);
      return matchesSearch && matchesDifficulty;
    });
  }, [userProjects, searchTerm, difficultyFilter]);

  // 4) Load current user on mount (or redirect)
  useEffect(() => {
    const authStr = localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token');
    if (!authStr) {
      navigate('/auth');
      return;
    }
    const md = JSON.parse(authStr).user.user_metadata;
    setUser({ id: md.sub, name: md.name, email: md.email });
    trackEvent({
      eventType: AnalyticsEvent.ENTERED_PROJECTS_DASHBOARD,
      component: 'Dashboard',
    });
  }, [navigate]);

  if (!user) {
    // Either redirecting to /auth or waiting for user metadata
    return null;
  }

  const handleProjectClick = (projectId: string) => {
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_ON_PROJECT,
      component: 'Dashboard',
      eventData: { projectId },
    });
    navigate(`/projects/${projectId}`);
  };

  const renderSkeletonCards = (count: number) => (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="animate-pulse">
              <div className="h-48 bg-slate-200 rounded-lg" />
            </div>
        ))}
      </div>
  );

  return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <ProjectsDashboardHeader userName={user.name} />

        <main className="flex-1 py-6">
          <div className="container">
            {/* Filter bar is now outside TabsContent, so it’s always visible */}
            <ProjectFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                difficultyFilter={difficultyFilter}
                toggleDifficulty={toggleDifficulty}
            />

            <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as 'all-projects' | 'my-projects')}
                className="space-y-8"
            >
              <TabsList className="bg-slate-100 p-1">
                <TabsTrigger
                    value="all-projects"
                    className={`flex items-center gap-1 tab-indicator ${
                        activeTab === 'all-projects' ? 'tab-selected' : ''
                    }`}
                >
                  <Terminal className="h-4 w-4" />
                  <span className="font-mono text-sm">All Projects</span>
                  {allLoading ? (
                      <Loader className="ml-1 h-4 w-4 animate-spin text-slate-600" />
                  ) : (
                      <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">
                    {filteredAllProjects.length}
                  </span>
                  )}
                </TabsTrigger>

                <TabsTrigger
                    value="my-projects"
                    className={`flex items-center gap-1 tab-indicator ${
                        activeTab === 'my-projects' ? 'tab-selected' : ''
                    }`}
                >
                  <Code className="h-4 w-4" />
                  <span className="font-mono text-sm">My Projects</span>
                  {myProjectsLoading ? (
                      <Loader className="ml-1 h-4 w-4 animate-spin text-slate-600" />
                  ) : (
                      <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">
                    {filteredUserProjects.length}
                  </span>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* --- ALL PROJECTS TAB --- */}
              <TabsContent value="all-projects" className="animate-fade-in">
                {allLoading ? (
                    <div className="mt-6">{renderSkeletonCards(3)}</div>
                ) : allError ? (
                    <Card className="project-card animate-fade-in">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="p-4 rounded-full bg-red-100 mb-4">
                          <BookOpen className="h-10 w-10 text-red-400" />
                        </div>
                        <h3 className="text-lg font-medium font-mono">Error loading projects</h3>
                        <p className="text-muted-foreground mt-1 font-mono">
                          {allError.message}
                        </p>
                      </CardContent>
                    </Card>
                ) : filteredAllProjects.length === 0 ? (
                    <Card className="project-card animate-fade-in">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="p-4 rounded-full bg-slate-100 mb-4">
                          <BookOpen className="h-10 w-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium font-mono">No projects found</h3>
                        <p className="text-muted-foreground mt-1 font-mono">
                          Try adjusting your search or filters
                        </p>
                      </CardContent>
                    </Card>
                ) : (
                    <AllProjectsTab
                        allProjects={filteredAllProjects}
                        userProjects={userProjects}
                        onProjectClick={handleProjectClick}
                    />
                )}
              </TabsContent>

              {/* --- MY PROJECTS TAB --- */}
              <TabsContent value="my-projects" className="animate-fade-in">
                {myProjectsLoading ? (
                    <div className="mt-6">{renderSkeletonCards(3)}</div>
                ) : myProjectsError ? (
                    <Card className="project-card animate-fade-in">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="p-4 rounded-full bg-red-100 mb-4">
                          <BookOpen className="h-10 w-10 text-red-400" />
                        </div>
                        <h3 className="text-lg font-medium font-mono">Error loading your projects</h3>
                        <p className="text-muted-foreground mt-1 font-mono">
                          {myProjectsError.message}
                        </p>
                      </CardContent>
                    </Card>
                ) : filteredUserProjects.length === 0 ? (
                    <Card className="project-card animate-fade-in">
                      <CardContent className="flex flex-col items-center justify-center py-16">
                        <div className="p-4 rounded-full bg-slate-100 mb-4">
                          <BookOpen className="h-10 w-10 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium font-mono">No matching projects</h3>
                        <p className="font-mono">Adjust search or filters to see your projects.</p>
                      </CardContent>
                    </Card>
                ) : (
                    <MyProjectsTab
                        userProjects={filteredUserProjects}
                        onProjectClick={handleProjectClick}
                    />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  );
};

export default ProjectsDashboard;
