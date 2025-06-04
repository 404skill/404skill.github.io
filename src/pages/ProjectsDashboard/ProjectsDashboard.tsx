// src/pages/ProjectsDashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Code, Terminal } from 'lucide-react';
import { useAllProjects } from '@/hooks/useAllProjects';
import { useUserProjectsWithCompletion } from '@/hooks/useUserProjectsWithCompletion';
import type { User } from '@/lib/types';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';
import ProjectsDashboardHeader from '@/pages/ProjectsDashboard/ProjectsDashboardHeader';
import ProjectFilterBar from '@/pages/ProjectsDashboard/ProjectFilterBar';
import AllProjectsTab from '@/pages/ProjectsDashboard/AllProjectsTab';
import MyProjectsTab from '@/pages/ProjectsDashboard/MyProjectsTab';

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all-projects' | 'my-projects'>('all-projects');

  // 1) “All projects” hook
  const {
    projects: allProjects,
    filtered: filteredProjects,
    searchTerm,
    difficultyFilter,
    setSearchTerm,
    toggleDifficulty,
    loading: allLoading,
  } = useAllProjects();

  // 2) “My projects + completion” hook
  const { userProjects, loading: myProjectsLoading } = useUserProjectsWithCompletion();

  // 3) Load current user on mount (or redirect to /auth)
  useEffect(() => {
    const userStr = localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token');
    if (!userStr) {
      navigate('/auth');
      return;
    }
    const md = JSON.parse(userStr).user.user_metadata;
    setUser({ id: md.sub, name: md.name, email: md.email });
    trackEvent({
      eventType: AnalyticsEvent.ENTERED_PROJECTS_DASHBOARD,
      component: 'Dashboard',
    });
  }, [navigate]);

  if (!user) return null;

  const handleProjectClick = (projectId: string) => {
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_ON_PROJECT,
      component: 'Dashboard',
      eventData: { projectId },
    });
    navigate(`/projects/${projectId}`);
  };

  // --- Helper function to render a “card skeleton” ---
  const renderSkeletonCards = (count: number) => {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="animate-pulse">
            <div className="h-48 bg-slate-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <ProjectsDashboardHeader userName={user.name} />

      <main className="flex-1 py-6">
        <div className="container">
          <Tabs
            value={activeTab}
            onValueChange={v => setActiveTab(v as 'all-projects' | 'my-projects')}
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
                <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">
                  {allProjects.length}
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="my-projects"
                className={`flex items-center gap-1 tab-indicator ${
                  activeTab === 'my-projects' ? 'tab-selected' : ''
                }`}
              >
                <Code className="h-4 w-4" />
                <span className="font-mono text-sm">My Projects</span>
                <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">
                  {userProjects.length}
                </span>
              </TabsTrigger>
            </TabsList>

            {/*  --- ALL PROJECTS TAB ---  */}
            <TabsContent value="all-projects" className="animate-fade-in">
              <ProjectFilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                difficultyFilter={difficultyFilter}
                toggleDifficulty={toggleDifficulty}
              />

              {allLoading ? (
                // Show 6 skeleton cards while loading
                <div className="mt-6">{renderSkeletonCards(3)}</div>
              ) : filteredProjects.length === 0 ? (
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
                  allProjects={filteredProjects}
                  userProjects={userProjects}
                  onProjectClick={handleProjectClick}
                  currentUserId={user.id}
                />
              )}
            </TabsContent>

            {/*  --- MY PROJECTS TAB ---  */}
            <TabsContent value="my-projects" className="animate-fade-in">
              {myProjectsLoading ? (
                // Show 3 skeleton cards while loading “My Projects”
                <div className="mt-6">{renderSkeletonCards(3)}</div>
              ) : (
                <MyProjectsTab
                  userProjects={userProjects}
                  loading={myProjectsLoading}
                  onBrowseClick={() => setActiveTab('all-projects')}
                  currentUserId={user.id}
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
