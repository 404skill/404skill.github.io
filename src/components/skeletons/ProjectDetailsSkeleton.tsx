import React from 'react';
import Navbar from '@/components/Navbar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const ProjectDetailsSkeleton: React.FC = () => {
    return (
        <>
            {/* Navbar skeleton (just a bar at top) */}
            <div className="h-12 bg-slate-200 animate-pulse" />

            <main className="flex-1 py-8">
                <div className="container space-y-6">
                    {/* 1) Header skeleton */}
                    <div className="space-y-4">
                        <div className="h-8 w-1/3 bg-slate-200 rounded animate-pulse" />
                        <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
                    </div>

                    {/* 2) Progress bar skeleton */}
                    <div className="space-y-2">
                        <div className="h-4 w-1/5 bg-slate-200 rounded animate-pulse" />
                        <div className="h-2 w-full bg-slate-200 rounded animate-pulse" />
                    </div>

                    <Separator className="bg-slate-200" />

                    {/* 3) Tabs header skeleton */}
                    <div className="flex space-x-4">
                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
                        <div className="h-8 w-24 bg-slate-200 rounded animate-pulse" />
                    </div>

                    {/* 4) Tab content skeleton (for “Tasks” tab placeholder) */}
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="border border-slate-200 bg-slate-100 rounded-lg p-4 space-y-2 animate-pulse">
                                {/* Task row title bar */}
                                <div className="h-5 w-1/3 bg-slate-200 rounded" />
                                {/* Task progress bar placeholder */}
                                <div className="h-3 w-2/5 bg-slate-200 rounded" />
                                {/* Task detail lines */}
                                <div className="h-4 w-full bg-slate-200 rounded" />
                                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProjectDetailsSkeleton;
