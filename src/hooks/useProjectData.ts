// src/hooks/useProjectData.ts
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
    fetchProject,
    fetchProjectTasks,
    fetchProjectTestResults,
    fetchTaskTests,
} from "@/lib/api";
import { convertProject } from "@/lib/converter";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";
import type {Project, ProjectCompletion, TestResult} from "@/lib/types";

export function useProjectData() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [project, setProject] = useState<Project | null>(null);
    const [user, setUser] = useState<{ id: string; email: string } | null>(null);
    const [testResults, setTestResults] = useState<TestResult[]>([]);

    const [completion, setCompletion] = useState<ProjectCompletion>({ passed: 0, total: 0 });
    useEffect(() => {
        (async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data.user) {
                navigate("/auth");
                return;
            }
            setUser({ id: data.user.id, email: data.user.email || "" });

            if (!id) return;

            try {
                // 1. Fetch & convert project
                const raw = await fetchProject(id);
                const proj = convertProject(raw);

                // 2. Fetch tasks & tests-per-task
                const tasks = await fetchProjectTasks(id);
                proj.tasks = tasks;

                const testsMap: Record<string, { id: string }[]> = {};
                for (const t of tasks) {
                    testsMap[t.id] = await fetchTaskTests(t.id);
                }

                setProject(proj);

                // 3. Fetch profile test results & map into our TestResult[]
                const profileResults = await fetchProjectTestResults(id);
                const results: TestResult[] = profileResults.map((pt) => {
                    const taskId =
                        Object.entries(testsMap).find(([, arr]) =>
                            arr.some((test) => test.id === pt.testId)
                        )?.[0] || "";
                    return {
                        taskId,
                        projectId: id,
                        status: pt.passed ? "passed" : "failed",
                        timestamp: pt.lastRun ?? new Date().toISOString(),
                        name: pt.testName,
                    };
                });
                setTestResults(results);

                // 4. Compute completion %
                let total = 0,
                    passed = 0;
                for (const [taskId, arr] of Object.entries(testsMap)) {
                    total += arr.length;
                    passed += arr.filter((t) =>
                        profileResults.find((r) => r.testId === t.id && r.passed)
                    ).length;
                }
                setCompletion({ passed, total });

                // 5. Analytics
                trackEvent({
                    eventType: AnalyticsEvent.READ_PROJECT_DETAILS,
                    component: "ProjectDetails",
                    eventData: { projectId: id },
                });
            } catch (e) {
                console.error("Error loading project data:", e);
                navigate("/dashboard");
            }
        })();
    }, [id, navigate]);

    return {
        project,
        user,
        testResults,
        completion,
        setTestResults,
        setCompletion,
    };
}
