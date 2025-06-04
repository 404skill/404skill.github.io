import React from 'react';
import { Code2, MessageSquare, Timer, CheckCircle2 } from 'lucide-react';

const WhyChooseSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 to-background" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="container relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-mono bg-primary/10 text-primary mb-4">
            <CheckCircle2 className="mr-2 h-3 w-3" />
            Trusted by 1000+ Developers
          </div>

          <h2 className="font-display text-4xl font-bold mb-4">Why 404Skill Works</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto text-lg">
            Learn backend development through practical projects with expert guidance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-8 rounded-xl hover-card glass">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Code2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Production‑Ready Code</h3>
            <p className="text-muted-foreground leading-relaxed">
              Get detailed code reviews from experienced backend engineers who have worked at top
              tech companies
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-xl hover-card glass">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <Timer className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">24‑Hour Turnaround</h3>
            <p className="text-muted-foreground leading-relaxed">
              Receive comprehensive feedback on your code within 24 hours, keeping your momentum
              going
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 rounded-xl hover-card glass">
            <div className="bg-primary/10 p-4 rounded-full mb-6">
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1‑on‑1 Mentorship</h3>
            <p className="text-muted-foreground leading-relaxed">
              Weekly calls with your mentor to discuss progress, challenges, and career development
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-mono text-sm">
            <CheckCircle2 className="h-4 w-4" />
            Start with a 14-day risk-free trial
          </div>
          <p className="text-muted-foreground max-w-[42rem] mx-auto mt-4">
            No credit card required • Cancel anytime • Full refund if not satisfied
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
