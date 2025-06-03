// src/hooks/useAllProjects.ts
import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { fetchAllProjects } from "@/lib/api";
import { convertProjects } from "@/lib/converter";

interface UseAllProjects {
    projects: Project[];
    filtered: Project[];
    searchTerm: string;
    difficultyFilter: string[];
    setSearchTerm: (s: string) => void;
    toggleDifficulty: (level: string) => void;
    loading: boolean;
}

export function useAllProjects(): UseAllProjects {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filtered, setFiltered] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchAllProjects();
                const converted = convertProjects(data);
                setProjects(converted);
                setFiltered(converted);
            } catch (err) {
                console.error("useAllProjects: failed to load all projects", err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        let temp = projects;
        if (searchTerm) {
            temp = temp.filter((p) =>
                    p.title.toLowerCase().includes(searchTerm.toLowerCase())
                // || p.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (difficultyFilter.length) {
            temp = temp.filter((p) => difficultyFilter.includes(p.difficulty));
        }
        setFiltered(temp);
    }, [searchTerm, difficultyFilter, projects]);

    const toggleDifficulty = (level: string) => {
        setDifficultyFilter((prev) =>
            prev.includes(level) ? prev.filter((x) => x !== level) : [...prev, level]
        );
    };

    return {
        projects,
        filtered,
        searchTerm,
        difficultyFilter,
        setSearchTerm,
        toggleDifficulty,
        loading,
    };
}
