// src/components/ProjectDetails.tsx
import React from "react";
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

import { useProjectData } from "@/hooks/useProjectData";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectProgress } from "./ProjectProgress";
import { TasksTab } from "./TasksTab";
// import { DetailsTab } from "./DetailsTab";
// import { ContainerAPITab } from "./ContainerAPITab";

const ProjectDetails: React.FC = () => {
    const {
        project,
        user,
        testResults,
        completion,
        setTestResults,
        setCompletion,
    } = useProjectData();
    const { toast: uiToast } = useToast();
    const [selectedTaskId, setSelectedTaskId] = React.useState<string>();
    const [isHelpDialogOpen, setHelpDialogOpen] = React.useState(false);

    if (!project || !user) {
        return null;
    }

    const handleDownloadTemplate = () => {
        uiToast({
            title: "Template downloaded",
            description: `You have downloaded the starter template for ${project.title}.`,
        });
    };

    const handleRequestHelp = (taskId: string) => {
        setSelectedTaskId(taskId);
        setHelpDialogOpen(true);
        // you can re-track here if needed
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-slate-800">
            <Navbar />
            <main className="flex-1 py-8">
                <div className="container">
                    <ProjectHeader
                        project={project}
                        selectedTaskId={selectedTaskId}
                        isHelpDialogOpen={isHelpDialogOpen}
                        setHelpDialogOpen={setHelpDialogOpen}
                        onDownload={handleDownloadTemplate}
                    />

                    <ProjectProgress completion={completion} />

                    <Separator className="my-6 bg-slate-200" />

                    <Tabs defaultValue="tasks" className="mt-6">
                        <TabsList className="bg-slate-100 border border-slate-200 p-1">
                            <TabsTrigger value="tasks">Tasks</TabsTrigger>
                            {/*<TabsTrigger value="details">Details</TabsTrigger>*/}
                            {/*<TabsTrigger value="container-api">Container API</TabsTrigger>*/}
                        </TabsList>

                        <TabsContent value="tasks">
                            <TasksTab
                                project={project}
                                results={testResults}
                                onRequestHelp={handleRequestHelp}
                                // onStatusChange={handleStatusChange}
                            />
                        </TabsContent>

                        {/*<TabsContent value="details">*/}
                        {/*    <DetailsTab project={project} />*/}
                        {/*</TabsContent>*/}

                        {/*<TabsContent value="container-api">*/}
                        {/*    <ContainerAPITab />*/}
                        {/*</TabsContent>*/}
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default ProjectDetails;
