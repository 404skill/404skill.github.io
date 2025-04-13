
import React from "react";
import { Terminal, Server, Code, Lock, Check } from "lucide-react";
import { DatabaseIcon } from "@/components/icons/DatabaseIcon";
import { BoxIcon } from "@/components/icons/BoxIcon";
import { NetworkIcon } from "@/components/icons/NetworkIcon";
import { SignalIcon } from "@/components/icons/SignalIcon";
import { FileJsonIcon } from "@/components/icons/FileJsonIcon";
import { CheckIcon } from "@/components/icons/CheckIcon";

interface TechIconProps {
  name: string;
  icon: React.ReactNode;
}

export const TechIcon = ({ name, icon }: TechIconProps) => (
  <div className="rounded-lg bg-card px-4 py-2 shadow-sm border hover:shadow-md transition-all hover:translate-y-[-2px] flex items-center">
    {icon}
    <span className="font-medium">{name}</span>
  </div>
);

export const TechIcons = () => {
  const techList = [
    { name: "Node.js", icon: <Terminal className="h-4 w-4 mr-2" /> },
    { name: "Express", icon: <Server className="h-4 w-4 mr-2" /> },
    { name: "GraphQL", icon: <Code className="h-4 w-4 mr-2" /> },
    { name: "MongoDB", icon: <DatabaseIcon className="h-4 w-4 mr-2" /> },
    { name: "PostgreSQL", icon: <DatabaseIcon className="h-4 w-4 mr-2" /> },
    { name: "Redis", icon: <SignalIcon className="h-4 w-4 mr-2" /> },
    { name: "Docker", icon: <BoxIcon className="h-4 w-4 mr-2" /> },
    { name: "Microservices", icon: <NetworkIcon className="h-4 w-4 mr-2" /> },
    { name: "Socket.io", icon: <SignalIcon className="h-4 w-4 mr-2" /> },
    { name: "Authentication", icon: <Lock className="h-4 w-4 mr-2" /> },
    { name: "API Design", icon: <FileJsonIcon className="h-4 w-4 mr-2" /> },
    { name: "Testing", icon: <CheckIcon className="h-4 w-4 mr-2" /> },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {techList.map((tech) => (
        <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
      ))}
    </div>
  );
};
