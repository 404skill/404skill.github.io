// src/components/Dashboard/DashboardHeader.tsx
import React, { FC, useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import DemoInvitePopup from "@/components/DemoInvitePopup";

interface ProjectsDashboardHeaderProps {
    userName: string;
}

const ProjectsDashboardHeader: FC<ProjectsDashboardHeaderProps> = ({ userName }) => {
    const [scrolled, setScrolled] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onScroll = () => {
            if (headerRef.current) {
                setScrolled(window.scrollY > 10);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <Navbar />
            <DemoInvitePopup />
            <div
                ref={headerRef}
                className={`sticky-header ${scrolled ? "scrolled" : ""} py-6 bg-white border-b`}
            >
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div className="animate-fade-in">
                            <h1 className="text-2xl font-bold mb-1 font-mono">Projects</h1>
                            <p className="text-muted-foreground text-sm font-mono">
                                Welcome back, <span className="font-medium text-blue-700">{userName}</span>! Continue learning or start a new project.
                            </p>
                        </div>
                        <Button variant="default" asChild className="animate-fade-in bg-blue-600 hover:bg-blue-700 font-mono">
                            <a href="/help" className="flex items-center gap-2">
                                <PlusCircle className="h-4 w-4" />
                                <span>Request Help</span>
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectsDashboardHeader;
