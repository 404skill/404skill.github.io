
import React from "react";
import { CheckCircle, Code, Globe, Layers, Wrench } from "lucide-react";
import { TechIcon } from "./IconsContainer";
import EmailSubscription from "./EmailSubscription";

const TechStackSection = () => {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="container">
        <h2 className="mb-4 text-center text-2xl font-bold font-mono">Use Your Preferred Technologies</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Our platform is language-agnostic, allowing you to use any programming languages, 
          frameworks, or tools you prefer for solving challenges.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <TechIcon name="Any Language" icon={<Code className="h-5 w-5 mr-2 text-blue-500" />} />
          <TechIcon name="Any Framework" icon={<Layers className="h-5 w-5 mr-2 text-purple-500" />} />
          <TechIcon name="Any Database" icon={<Globe className="h-5 w-5 mr-2 text-green-500" />} />
          <TechIcon name="Any Tools" icon={<Wrench className="h-5 w-5 mr-2 text-orange-500" />} />
          <TechIcon name="Standardized Testing" icon={<CheckCircle className="h-5 w-5 mr-2 text-red-500" />} />
        </div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto mb-12">
          <p>Focus on solving problems your way while our standardized testing interface verifies your solution works correctly.</p>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
