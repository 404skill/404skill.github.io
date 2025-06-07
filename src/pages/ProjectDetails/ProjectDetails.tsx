import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button'; // ← for our Retry button
import { useToast } from '@/hooks/use-toast';

import { useGetProject } from '@/hooks/useGetProject';
import { useProjectCompletion } from '@/hooks/useProjectCompletion';
import { useGetTasksByProject } from '@/hooks/useGetTasksByProject';
import { useGetTestsByTaskForProject } from '@/hooks/useGetTestsByTaskForProject';

import { ProjectHeader } from './ProjectHeader';
import { ProjectProgress } from './ProjectProgress';
import { TasksTab } from './TasksTab';
import { DetailsTab } from './DetailsTab';
import TestsTab from './TestsTab';
import ProjectDetailsSkeleton from "@/components/skeletons/ProjectDetailsSkeleton.tsx";

const ProjectDetails: React.FC = () => {
  // 1) Read the param (we assume App.tsx uses `:projectId`)
  const { projectId } = useParams<{ projectId: string }>();

  // 2) Fetch project metadata, plus refetch
  const {
    project,
    isLoading: projectLoading,
    error: projectError,
    refetch: refetchProject,
  } = useGetProject(projectId || '');

  // 3) Fetch completion data, plus refetch
  const {
    metrics: completion,
    isLoading: completionLoading,
    error: completionError,
    refetch: refetchCompletion,
  } = useProjectCompletion(projectId || '');

  // 4) Fetch tasks with metrics, plus refetch
  const {
    tasks: tasksWithMetrics,   // TaskWithMetricsDTO[] | undefined
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useGetTasksByProject(projectId || '');

  // 5) Fetch “tests by task,” plus refetch
  const {
    testsByTask,         // TestsByTaskDTO[] | undefined
    isLoading: testsLoading,
    error: testsError,
    refetch: refetchTests,
  } = useGetTestsByTaskForProject(projectId || '');

  // 6) Local UI state for “Request Help”
  const [selectedTaskId, setSelectedTaskId] = useState<string | undefined>();
  const [isHelpDialogOpen, setHelpDialogOpen] = useState(false);
  const { toast: uiToast } = useToast();

  // 7) While project is loading or errored, show fallback
  if (projectLoading) {
    return <ProjectDetailsSkeleton />;
  }
  if (projectError || !project) {
    return (
        <div className="py-12 text-center font-mono text-red-500 space-y-4">
          <div>
            {projectError
                ? `Error loading project`
                : 'Project not found.'}
          </div>
          <Button onClick={() => refetchProject()} className="font-mono text-sm">
            Try Again
          </Button>
        </div>
    );
  }

  // 8) “Download Template” callback
  const handleDownloadTemplate = () => {
    uiToast({
      title: 'Template downloaded',
      description: `You have downloaded the starter template for ${project.name}.`,
    });
  };

  // 9) “Request Help” callback
  const handleRequestHelp = (taskId: string) => {
    setSelectedTaskId(taskId);
    setHelpDialogOpen(true);
  };

  return (
      <div className="min-h-screen flex flex-col bg-white text-slate-800">
        <Navbar />

        <main className="flex-1 py-8">
          <div className="container">
            {/* Project Header */}
            <ProjectHeader
                project={project}
                selectedTaskId={selectedTaskId}
                isHelpDialogOpen={isHelpDialogOpen}
                setHelpDialogOpen={setHelpDialogOpen}
                onDownload={handleDownloadTemplate}
            />

            {/* Project Progress: if it errors, show retry */}
            {completionLoading ? (
                <div className="mt-6 h-4 bg-slate-200 animate-pulse rounded-md" />
            ) : completionError ? (
                <div className="mt-6 text-xs font-mono text-red-500 space-y-2">
                  <div>Error loading progress</div>
                  <Button onClick={() => refetchCompletion()} className="font-mono text-sm">
                    Retry fetching project progress
                  </Button>
                </div>
            ) : completion ? (
                <ProjectProgress completion={completion} />
            ) : null}

            <Separator className="my-6 bg-slate-200" />

            {/* Tabs (Tasks / Tests / Details) */}
            <Tabs defaultValue="tasks" className="mt-6">
              <TabsList className="bg-slate-100 border border-slate-200 p-1">
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="tests">Tests</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="tasks">
                <TasksTab
                    projectId={project.projectId}
                    onRequestHelp={handleRequestHelp}
                    tasksWithMetrics={tasksWithMetrics || []}
                    tasksLoading={tasksLoading}
                    tasksError={tasksError}
                    refetchTasks={refetchTasks}
                    testsByTask={testsByTask || []}
                    testsLoading={testsLoading}
                    testsError={testsError}
                    refetchTests={refetchTests}
                />
              </TabsContent>

              <TabsContent value="tests">
                <TestsTab
                    projectId={project.projectId}
                    testsByTask={testsByTask || []}
                    testsLoading={testsLoading}
                    testsError={testsError}
                    refetchTests={refetchTests}
                />
              </TabsContent>

              <TabsContent value="details">
                <DetailsTab project={project} />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
  );
};

export default ProjectDetails;
