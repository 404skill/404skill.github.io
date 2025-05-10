import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => {
  return (
    <div className="group relative flex items-center gap-4 p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      {/* Glow effect */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-sm pointer-events-none" />
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div className="absolute -inset-[100%] group-hover:inset-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000" />
      </div>
      {/* Icon container with enhanced animation */}
      <div className="relative flex-shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:blur-sm" />
        <div className="relative p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-500">
          <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-500" />
        </div>
      </div>
      {/* Text content */}
      <div className="relative z-10 flex flex-col text-left">
        <h3 className="text-lg font-semibold mb-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary/80 transition-all duration-500">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Feature;
