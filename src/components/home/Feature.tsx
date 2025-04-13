
import { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] duration-300">
    <div className="flex flex-col items-center text-center">
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default Feature;
