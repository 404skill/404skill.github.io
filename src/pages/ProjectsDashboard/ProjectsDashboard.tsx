import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Code, Loader, Terminal } from 'lucide-react';
import { useAllProjects } from '@/hooks/useAllProjects';
import { useUserProjects } from '@/hooks/useUserProjects';
import type { User, ProjectDTO, Variant } from '@/lib/types';
import type { GroupedProject } from '@/lib/types';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';
import ProjectsDashboardHeader from './ProjectsDashboardHeader';
import ProjectFilterBar from './ProjectFilterBar';
import MyProjectsTab from './MyProjectsTab';
import { Button } from '@/components/ui/button';
import {AllProjectsTab} from "@/pages/ProjectsDashboard/AllProjectsTab.tsx";

function groupProjects(all: ProjectDTO[], user: ProjectDTO[]): GroupedProject[] {
  const lastRanMap = new Map(user.map(project => [project.projectId, project.lastRan]));
  const ownedSet = new Set(user.map(project => project.projectId));

  const buckets: Record<string, Variant[]> = {};

  all.forEach(project => {
    const techs = project.technologies?.split(',').map(t => t.trim()) ?? [];
    const lastRan = lastRanMap.get(project.projectId) ?? null;
    const variant: Variant = { ...project, techs, lastRan, isOwned: ownedSet.has(project.projectId) };
    (buckets[project.name] ||= []).push(variant);
  });

  return Object.entries(buckets).map(([key, variants]) => {
    variants.sort((a, b) => {
      if (a.isOwned !== b.isOwned) return a.isOwned ? -1 : 1;
      if (a.isOwned && b.isOwned) {
        const ta = a.lastRan ? new Date(a.lastRan).getTime() : 0;
        const tb = b.lastRan ? new Date(b.lastRan).getTime() : 0;
        return tb - ta;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return { key, variants, selected: variants[0] };
  });
}

const ProjectsDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'all-projects' | 'my-projects'>('all-projects');

  const { allProjects, allLoading, allError, refetchAllProjects } = useAllProjects();
  const { userProjects, myProjectsLoading, myProjectsError, refetchUserProjects } = useUserProjects();

  const rawGroups = useMemo(
      () => groupProjects(allProjects, userProjects),
      [allProjects, userProjects]
  );

  const [selectedMap, setSelectedMap] = useState<Record<string, string>>({});
  const onSelectVariant = useCallback((groupKey: string, projectId: string) => {
    setSelectedMap(prev => ({ ...prev, [groupKey]: projectId }));
  }, []);

  const groups = useMemo(() =>
      rawGroups.map(group => {
        const selId = selectedMap[group.key] ?? group.selected.projectId;
        const selected = group.variants.find(variant => variant.projectId === selId)!;
        return { ...group, selected };
      }), [rawGroups, selectedMap]
  );

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
  const toggleDifficulty = (level: string) =>
      setDifficultyFilter(prev => prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]);

  const filteredAll = useMemo(
      () => groups.filter(group => {
        const matchesSearch = group.selected.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDiff = !difficultyFilter.length || difficultyFilter.includes(group.selected.difficulty);
        return matchesSearch && matchesDiff;
      }),
      [groups, searchTerm, difficultyFilter]
  );

  const filteredMine = useMemo(
      () => filteredAll.filter(group => group.selected.isOwned),
      [filteredAll]
  );

  useEffect(() => {
    const str = localStorage.getItem('sb-smzmwxqzmiswsnvsvjms-auth-token');
    if (!str) return navigate('/auth');
    const md = JSON.parse(str).user.user_metadata;
    setUser({ id: md.sub, name: md.name, email: md.email });
    trackEvent({ eventType: AnalyticsEvent.ENTERED_PROJECTS_DASHBOARD, component: 'Dashboard' });
  }, [navigate]);
  if (!user) return null;

  const renderSkeleton = (count: number) => (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="animate-pulse"><div className="h-48 bg-slate-200 rounded-lg"/></div>
        ))}
      </div>
  );

  const renderError = (message: string, retry: () => void) => (
      <Card className="project-card">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 rounded-full bg-red-100 mb-4"><BookOpen className="h-10 w-10 text-red-400"/></div>
          <h3 className="text-lg font-medium font-mono">Error loading projects</h3>
          <p className="text-muted-foreground mt-1 font-mono">{message}</p>
          <Button onClick={retry} className="mt-4 font-mono text-sm">Try Again</Button>
        </CardContent>
      </Card>
  );

  return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <ProjectsDashboardHeader userName={user.name} />
        <main className="flex-1 py-6 container">
          <ProjectFilterBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              difficultyFilter={difficultyFilter}
              toggleDifficulty={toggleDifficulty}
          />
          <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)} className="space-y-8">
            <TabsList className="bg-slate-100 p-1">
              <TabsTrigger value="all-projects" className="flex items-center gap-1">
                <Terminal className="h-4 w-4" />
                <span className="font-mono text-sm">All Projects</span>
                {allLoading ? <Loader className="ml-1 h-4 w-4 animate-spin text-slate-600" />
                    : <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">{filteredAll.length}</span>}
              </TabsTrigger>
              <TabsTrigger value="my-projects" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                <span className="font-mono text-sm">My Projects</span>
                {myProjectsLoading ? <Loader className="ml-1 h-4 w-4 animate-spin text-slate-600" />
                    : <span className="ml-1 rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-mono">{filteredMine.length}</span>}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all-projects" className="animate-fade-in">
              {allLoading ? renderSkeleton(3)
                  : allError ? renderError(allError.message, () => { refetchAllProjects(); refetchUserProjects(); })
                      : filteredAll.length === 0 ? <p className="text-center font-mono">No projects found</p>
                          : <AllProjectsTab groups={filteredAll} onVariantSelect={onSelectVariant}/>}
            </TabsContent>

            <TabsContent value="my-projects" className="animate-fade-in">
              {myProjectsLoading ? renderSkeleton(3)
                  : myProjectsError ? renderError(myProjectsError.message, refetchUserProjects)
                      : filteredMine.length === 0 ? <p className="text-center font-mono">No matching projects</p>
                          : <MyProjectsTab groups={filteredMine} onVariantSelect={onSelectVariant}/>}
            </TabsContent>
          </Tabs>
        </main>
      </div>
  );
};

export default ProjectsDashboard;
