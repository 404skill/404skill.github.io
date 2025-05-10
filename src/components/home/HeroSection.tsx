import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
  isVisible: boolean;
}

const HeroSection = ({ isLoggedIn, isVisible }: HeroSectionProps) => {
  return (
    <section className="container py-24">
      <div className={`mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-8 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="space-y-4">
          <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Ship production‑grade<br />
            backend systems
          </h1>
          <p className="text-xl text-muted-foreground max-w-[42rem] mx-auto">
            Get senior engineer reviews on every line of code. Build a portfolio that gets you hired.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                  Go to Projects
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="gap-2 group animate-fade-in font-mono">
                  <Terminal className="h-5 w-5" />
                  Start 14‑day risk‑free trial
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            )}
          </div>
          <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime</p>
        </div>

        {/* Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-3xl mt-8">
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-2xl font-bold text-primary">24h</div>
            <div className="text-sm text-muted-foreground">Code review turnaround</div>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-2xl font-bold text-primary">1:1</div>
            <div className="text-sm text-muted-foreground">Weekly mentorship</div>
          </div>
          <div className="flex flex-col items-center text-center p-4">
            <div className="text-2xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">Money-back guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

