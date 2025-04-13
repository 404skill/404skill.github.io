
import React from "react";
import { BookOpen, CheckCircle, Code, Download, HelpCircle, ScrollText } from "lucide-react";
import Feature from "./Feature";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection = ({ isVisible }: HowItWorksSectionProps) => {
  return (
    <section className="container py-16 md:py-24">
      <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "150ms" }}>
        <h2 className="text-3xl font-bold font-mono mb-4">How BackendHub Works</h2>
        <p className="text-muted-foreground max-w-[42rem] mx-auto">
          Our platform provides a structured approach to learning backend development through practical, real-world projects.
        </p>
      </div>
      
      <div className="flow-container grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "200ms" }}>
          <Feature 
            icon={BookOpen}
            title="Choose a Project"
            description="Select from our curated list of backend projects covering various technologies and difficulty levels."
          />
        </div>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "250ms" }}>
          <Feature 
            icon={Download}
            title="Download Starter Template"
            description="Get started with our pre-configured templates that include tests and project structure."
          />
        </div>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "300ms" }}>
          <Feature 
            icon={Code}
            title="Implement Solution"
            description="Write your code to implement the required functionality based on the project specifications."
          />
        </div>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "350ms" }}>
          <Feature 
            icon={ScrollText}
            title="Run Tests"
            description="Execute the tests provided to verify your implementation against requirements."
          />
        </div>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "400ms" }}>
          <Feature 
            icon={CheckCircle}
            title="Track Progress"
            description="Monitor your progress through our dashboard as you complete each task."
          />
        </div>
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: "450ms" }}>
          <Feature 
            icon={HelpCircle}
            title="Get Support"
            description="Stuck on a problem? Request help or code reviews from our expert community."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
