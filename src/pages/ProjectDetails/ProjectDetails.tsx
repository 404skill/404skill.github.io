// src/pages/ProjectDetails/ProjectDetails.tsx
import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { useGetProject } from '@/hooks/useGetProject';
import { useProjectCompletion } from '@/hooks/useProjectCompletion';
import { useGetTasksByProject } from '@/hooks/useGetTasksByProject';
import { useGetTestsByTaskForProject } from '@/hooks/useGetTestsByTaskForProject';
import { useProjectVariants } from '@/hooks/useProjectVariants';

import { ProjectHeader } from './ProjectHeader';
import { ProjectProgress } from './ProjectProgress';
import { TasksTab } from './TasksTab';
import { GenericTasksTab } from './GenericTasksTab';
import { DetailsTab } from './DetailsTab';
import TestsTab from './TestsTab';
import GenericTestsTab from './GenericTestsTab';
import ProjectDetailsSkeleton from '@/components/skeletons/ProjectDetailsSkeleton';
import type {
  TaskWithMetricsDTO,
  GenericTaskDTO,
  TestsByTaskDTO,
  GenericTestsByTaskDTO,
} from '@/lib/types';
import { FileText } from 'lucide-react';

interface LocationState {
  isOwned?: boolean;
}

const ProjectDetails: React.FC = () => {
  const { projectId = '' } = useParams<{ projectId: string }>();
  const { state } = useLocation() as { state: LocationState };
  const navigate = useNavigate();
  const { toast } = useToast();

  // 1) Core data hooks
  const {
    project,
    isLoading: projLoading,
    error: projError,
    refetch: refetchProject,
  } = useGetProject(projectId);
  const {
    metrics: completion,
    isLoading: compLoading,
    error: compError,
    refetch: refetchCompletion,
  } = useProjectCompletion(projectId);

  const isOwned = state?.isOwned;

  const {
    tasks: tasksWithMetrics = [],
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useGetTasksByProject(projectId, isOwned);
  const {
    testsByTask = [],
    isLoading: testsLoading,
    error: testsError,
    refetch: refetchTests,
  } = useGetTestsByTaskForProject(projectId, isOwned);

  const {
    projectVariants = [],
    isLoading: variantsLoading,
    error: variantsError,
    refetch: refetchVariants,
  } = useProjectVariants(projectId);

  const variantOptions = useMemo(
    () =>
          projectVariants.map((variant) => ({
        value: variant?.projectId,
            label: variant?.technologies?.split(',').map((tech) => tech.trim()).join(', '),
      })),
      [projectVariants]
  );

  const handleVariantChange = (newId: string) => {
    const variant = projectVariants.find(variant => variant.projectId === newId)
    const isOwned = variant?.isOwned

    navigate(`/projects/${newId}`, {
      state: { isOwned: isOwned }
    })
  }
  // 5) Loading / error
  if (projLoading) return <ProjectDetailsSkeleton />;
  if (projError || !project)
    return (
      <div className="py-12 text-center font-mono text-red-500 space-y-4">
        <div>{projError ? 'Error loading project.' : 'Project not found.'}</div>
        <Button onClick={() => refetchProject} className="font-mono text-sm">
          Try Again
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      <Navbar />

      <main className="flex-1 py-8 container">
        <ProjectHeader
          project={project}
          variants={variantOptions}
          selectedVariantId={projectId}
          onVariantChange={handleVariantChange}
        />

        {/* Progress */}
        {compLoading ? (
          <div className="mt-6 h-4 bg-slate-200 animate-pulse rounded-md" />
        ) : compError ? (
          <div className="mt-6 text-xs font-mono text-red-500 space-y-2">
            <div>Error loading progress</div>
            <Button onClick={() => refetchCompletion} className="font-mono text-sm">
              Retry fetching progress
            </Button>
          </div>
        ) : completion?.hasAccess === false ? (
          <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-mono font-medium text-amber-800">
                  You do not own this project.
                </h4>
                <p className="font-mono text-sm text-amber-700 mt-1">
                  Want us to track your progress?
                  <br />
                  <Link
                    to="/getStarted"
                    className="underline font-medium text-amber-800 hover:text-amber-900"
                  >
                    Download this project through the 404skill CLI tool
                  </Link>{' '}
                  to track your test results and completion status.
                </p>
              </div>
            </div>
          </div>
        ) : (
          completion && <ProjectProgress completion={completion} />
        )}

        <Separator className="my-6 bg-slate-200" />

        {/* Tabs */}
        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="bg-slate-100 border border-slate-200 p-1">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks">
            {isOwned ? (
              <TasksTab
                projectId={project.projectId}
                tasksWithMetrics={tasksWithMetrics as TaskWithMetricsDTO[]}
                tasksLoading={tasksLoading}
                tasksError={tasksError}
                refetchTasks={refetchTasks}
                testsByTask={testsByTask as TestsByTaskDTO[]}
                testsLoading={testsLoading}
                testsError={testsError}
                refetchTests={refetchTests}
              />
            ) : (
              <GenericTasksTab
                projectId={project.projectId}
                tasks={tasksWithMetrics as GenericTaskDTO[]}
                tasksLoading={tasksLoading}
                tasksError={tasksError}
                refetchTasks={refetchTasks}
              />
            )}
          </TabsContent>

          <TabsContent value="tests">
            {isOwned ? (
              <TestsTab
                projectId={project.projectId}
                testsByTask={testsByTask as TestsByTaskDTO[]}
                testsLoading={testsLoading}
                testsError={testsError}
                refetchTests={refetchTests}
              />
            ) : (
              <GenericTestsTab
                projectId={project.projectId}
                testsByTask={testsByTask as GenericTestsByTaskDTO[]}
                testsLoading={testsLoading}
                testsError={testsError}
                refetchTests={refetchTests}
              />
            )}
          </TabsContent>

          <TabsContent value="details">
            <DetailsTab project={project} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ProjectDetails;
