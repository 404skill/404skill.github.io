// src/components/ProjectProgress.tsx
import type { FC } from "react";
import {ProjectCompletion} from "@/lib/types.ts";

interface ProjectProgressProps {
    completion: ProjectCompletion;
}

export const ProjectProgress: FC<ProjectProgressProps> = ({ completion }) => (
    <div className="mt-6">
        <div className="flex justify-between text-xs mb-1 font-mono">
            <span className="text-slate-500">Progress</span>
            <span className="text-slate-700">{Math.round((completion.passed / completion.total) * 100)}% complete ({completion.passed}/{completion.total})</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
                className="bg-blue-500 h-1.5 rounded-full"
                style={{ width: `${(completion.passed / completion.total) * 100}%` }}
            />
        </div>
    </div>
);
