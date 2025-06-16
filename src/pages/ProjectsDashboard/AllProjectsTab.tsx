import {GroupedProject} from "@/lib/types.ts";
import ProjectCard from "@/components/ProjectCard.tsx";

interface AllProjectsTabProps {
    groups: GroupedProject[];
    onVariantSelect: (groupKey: string, projectId: string) => void;
}

export const AllProjectsTab: React.FC<AllProjectsTabProps> = ({
                                                                  groups,
                                                                  onVariantSelect,
                                                              }) => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(group => (
            <ProjectCard
                key={group.key}
                project={group.selected}
                isOwned={group.selected.isOwned}
                variants={group.variants}
                selectedVariantId={group.selected.projectId}
                onVariantSelect={(newId) => onVariantSelect(group.key, newId)}
            />
        ))}
    </div>
);
