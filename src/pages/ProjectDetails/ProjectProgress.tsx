// src/components/ProjectProgress.tsx

import React from 'react';
import type { FC } from 'react';
import type { ProjectMetricsDTO } from '@/lib/types';

interface ProjectProgressProps {
    completion: ProjectMetricsDTO;
}

export const ProjectProgress: FC<ProjectProgressProps> = ({ completion }) => {
    const { passedTests, totalTests } = completion;
    const percent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

    return (
        <div className="mt-6 h-10">
            <div className="flex justify-between text-xs mb-1 font-mono">
                <span className="text-slate-500">Progress</span>
                <span className="text-slate-700">
          {totalTests === 0
              ? `(${passedTests}/${totalTests})`
              : `${percent}% complete (${passedTests}/${totalTests})`}
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
