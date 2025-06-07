// src/components/TestsTabSkeleton.tsx

import React from 'react';

const TestsTabSkeleton: React.FC = () => {
    // Show 3 placeholder suites, each with 2 placeholder test‐rows
    return (
        <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, suiteIdx) => (
                <div
                    key={suiteIdx}
                    className="border border-slate-200 bg-slate-100 rounded-lg p-4 animate-pulse space-y-4"
                >
                    {/* Suite header: icon + suite‐title placeholder */}
                    <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 bg-slate-200 rounded-full" />
                        <div className="h-4 w-1/3 bg-slate-200 rounded" />
                    </div>

                    {/* Suite percentage bar placeholder */}
                    <div className="h-3 w-1/5 bg-slate-200 rounded" />

                    {/* Two placeholder test rows */}
                    <div className="space-y-2 mt-3">
                        {Array.from({ length: 2 }).map((_, testIdx) => (
                            <div
                                key={testIdx}
                                className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow-sm animate-pulse"
                            >
                                {/* Left: icon + test name placeholder */}
                                <div className="flex items-center space-x-2">
                                    <div className="h-5 w-5 bg-slate-200 rounded-full" />
                                    <div className="h-4 w-1/3 bg-slate-200 rounded" />
                                </div>
                                {/* Right: timestamp/status placeholder */}
                                <div className="flex items-center space-x-4">
                                    <div className="h-3 w-10 bg-slate-200 rounded" />
                                    <div className="h-3 w-12 bg-slate-200 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TestsTabSkeleton;
