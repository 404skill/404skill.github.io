import React from "react";
import { Code2, MessageSquare, Timer } from "lucide-react";

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-mono mb-4">Why 404Skill Works</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Learn backend development through practical projects with expert guidance
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-lg mb-4">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Production‑Ready Code</h3>
            <p className="text-muted-foreground">
              Get detailed code reviews from experienced backend engineers
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-lg mb-4">
              <Timer className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">24‑Hour Turnaround</h3>
            <p className="text-muted-foreground">
              Receive feedback on your code within 24 hours
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-lg mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">1‑on‑1 Mentorship</h3>
            <p className="text-muted-foreground">
              Weekly calls with your mentor to discuss progress and challenges
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Start with a 14-day risk-free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
