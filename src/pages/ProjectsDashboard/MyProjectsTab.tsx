// src/components/Dashboard/MyProjectsTab.tsx
import React, { FC } from "react";
import type { UserProjectWithCompletion } from "@/hooks/useUserProjectsWithCompletion";
import {CardContent} from "@/components/ui/card.tsx";
import {Code, Terminal} from "lucide-react";
import ProjectCard from "@/components/ProjectCard.tsx";
import { Button } from "@/components/ui/button";

interface MyProjectsTabProps {
    userProjects: UserProjectWithCompletion[];
    loading: boolean;
    onBrowseClick: () => void;
    currentUserId: string;
}

const MyProjectsTab: FC<MyProjectsTabProps> = ({
                                                   userProjects,
                                                   loading,
                                                   onBrowseClick,
                                                   currentUserId,
                                               }) => {
    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* show a loading skeleton for 3 columns */}
                {[0, 1, 2].map((i) => (
                    <div key={i} className="animate-pulse border rounded-lg p-6 bg-white h-48" />
                ))}
            </div>
        );
    }

    if (!userProjects.length) {
        return (
            <div className="project-card overflow-hidden">
                <CardContent className="flex flex-col items-center justify-center py-16">
                    <div className="p-4 bg-blue-100 rounded-full mb-6">
                        <Terminal className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-medium font-mono">Start your learning journey</h3>
                    <p className="text-muted-foreground mt-2 mb-6 text-center max-w-md font-mono">
                        You haven't started any projects yet. Browse our catalog and choose a project to begin building your skills.
                    </p>
                    <Button variant="default" onClick={onBrowseClick} size="lg" className="gap-2 bg-blue-600 hover:bg-blue-700 font-mono">
                        <Code className="h-4 w-4" />
                        Browse Projects
                    </Button>
                </CardContent>
            </div>
        );
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {userProjects.map((proj, idx) => (
                <div
                    key={proj.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${idx * 75}ms` }}
                >
                    <ProjectCard
                        project={proj}
                        userId={currentUserId}
                        inProgress={true}
                        completion={{ passed: proj.passed, total: proj.total }}
                    />
                </div>
            ))}
        </div>
    );
};

export default MyProjectsTab;
