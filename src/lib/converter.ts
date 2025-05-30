import {Project} from "@/lib/types.ts";

export const convertProjects = (projects: any[]): Project[] => {
    return projects.map(project => ({
        title: project.name,
        ...project,
        estimatedDurationHours: (project.estimatedDurationMinutes / 60).toFixed(1),
    }));
};

export const convertProject = (project: any): Project => {
    return {
        ...project,
        title: project.name,
        estimatedDurationHours: (project.estimatedDurationMinutes / 60).toFixed(1),
    };
};
