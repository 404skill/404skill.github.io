// src/sections/ProjectsSection.tsx
import React from "react";
import {
  Server,
  Shuffle,
  KeyRound,
  Clock3,
  CloudLightning,
  Database,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
}

interface ProjectsSectionProps {
  projects?: Project[];      // optional override
  isVisible?: boolean;       // for fade-in if you hook to an IO observer
}

const defaultProjects: Project[] = [
  {
    id: "rate-limited-api",
    title: "Rate-Limited REST API",
    blurb: "Design a high-throughput API with IP-based throttling & retry headers.",
    icon: <Server className="h-6 w-6" />,
  },
  {
    id: "event-pipeline",
    title: "Event-Driven Order Service",
    blurb: "Publish & consume events with exactly-once guarantees using Kafka.",
    icon: <Shuffle className="h-6 w-6" />,
  },
  {
    id: "auth-service",
    title: "JWT Auth Service",
    blurb: "Issue, verify, and rotate JWTs with refresh-token strategy.",
    icon: <KeyRound className="h-6 w-6" />,
  }
];

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects = defaultProjects,
  isVisible = true,
}) => {
  // utility for staggered fade-in; mimic pattern used elsewhere
  const fade = (idx: number) => ({
    className: `transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
    }`,
    style: { transitionDelay: `${200 + idx * 50}ms` },
  });

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl sm:text-4xl font-bold mb-12">
          Build Projects That Impress Hiring Managers
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              {...fade(idx)}
              className="group border border-gray-200 rounded-xl p-6 flex flex-col bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              {/* icon */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                {p.icon}
              </div>

              {/* title */}
              <h3 className="font-semibold text-lg mb-2 text-slate-900">
                {p.title}
              </h3>

              {/* blurb */}
              <p className="text-sm text-muted-foreground flex-1">{p.blurb}</p>

              {/* subtle hover arrow */}
              <span className="mt-4 inline-flex items-center text-primary text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                View spec
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
