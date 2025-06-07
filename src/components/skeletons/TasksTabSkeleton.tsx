// src/components/TasksTabSkeleton.tsx

import React from 'react';

const TasksTabSkeleton: React.FC = () => {
    // We’ll show 3 placeholder task‐rows as an example
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
                <div
                    key={idx}
                    className="border border-slate-200 bg-slate-100 rounded-lg p-4 animate-pulse flex items-start space-x-4"
                >
                    {/* Icon placeholder */}
                    <div className="h-5 w-5 bg-slate-200 rounded-full shrink-0" />

                    {/* Content placeholder */}
                    <div className="flex-1 space-y-2">
                        {/* Row 1: Title bar */}
                        <div className="h-4 w-1/3 bg-slate-200 rounded" />

                        {/* Row 2: Percentage bar */}
                        <div className="h-3 w-1/5 bg-slate-200 rounded" />

                        {/* Row 3 & 4: Two lines of description text */}
                        <div className="h-4 w-full bg-slate-200 rounded mt-2" />
                        <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TasksTabSkeleton;
