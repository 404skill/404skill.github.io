// src/components/ProjectProgress.tsx
import type { FC } from "react";
import { ProjectCompletion } from "@/lib/types";

interface ProjectProgressProps {
    completion: ProjectCompletion;
}

export const ProjectProgress: FC<ProjectProgressProps> = ({ completion }) => {
    const { passed, total } = completion;
    const percent = total > 0 ? Math.round((passed / total) * 100) : 0;

    return (
        <div className="mt-6">
            <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-500">Progress</span>
                <span className="text-slate-700">
          {total === 0
              ? `(${passed}/${total})`
              : `${percent}% complete (${passed}/${total})`}
        </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};
