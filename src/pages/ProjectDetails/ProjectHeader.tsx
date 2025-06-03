// src/components/ProjectHeader.tsx
import { ArrowLeft, Download, HelpCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import HelpRequestForm from "@/components/HelpRequestForm";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

interface ProjectHeaderProps {
    project: Project;
    selectedTaskId: string | undefined;
    isHelpDialogOpen: boolean;
    setHelpDialogOpen: (open: boolean) => void;
    onDownload: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
                                                                project,
                                                                selectedTaskId,
                                                                isHelpDialogOpen,
                                                                setHelpDialogOpen,
                                                                onDownload,
                                                            }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-6">
            <Button
                variant="ghost"
                className="mb-4 font-mono text-slate-600 hover:text-slate-800"
                onClick={() => {
                    navigate("/dashboard");
                }}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
            </Button>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold font-mono text-slate-800">
                            {project.title}
                        </h1>
                        <Badge
                            variant="outline"
                            className={`
                font-mono text-xs
                ${project.difficulty === "easy" ? "border-green-500/30 bg-green-100 text-green-700" : ""}
                ${project.difficulty === "medium" ? "border-yellow-500/30 bg-yellow-100 text-yellow-700" : ""}
                ${project.difficulty === "hard" ? "border-red-500/30 bg-red-100 text-red-700" : ""}
              `}
                        >
                            {project.difficulty}
                        </Badge>
                    </div>
                    {/*<p className="text-slate-600 font-mono">{project.description}</p>*/}
                </div>

                <div className="flex gap-2">
                    <Dialog open={isHelpDialogOpen} onOpenChange={setHelpDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-mono">
                                <HelpCircle className="mr-2 h-4 w-4" />
                                Get Help
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg bg-white border-slate-200">
                            <HelpRequestForm
                                projectId={project.id}
                                taskId={selectedTaskId}
                                projects={projects}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};
