import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection = ({ isLoggedIn }: HeroSectionProps) => {
  return (
    <section className="relative flex items-center bg-gradient-to-b from-[#f8fafc] to-[#e0e7ef] min-h-[80vh]">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-10">
        {/* 📄  LEFT – copy */}
        <div className="flex-1 text-center lg:text-left">
          {/* Problem hook */}
          <p className="text-sm font-semibold text-primary/90 uppercase tracking-wide mb-2">
            Tutorials don’t make you production-ready
          </p>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.18] mb-3 select-text"
            style={{ minHeight: "1.5em" }}
          >
            <span className="text-slate-900">Become a Better</span>
            <br />
            <span className="text-primary">Software Engineer</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 mb-8">
          Build real-world software, get expert feedback, and accelerate your growth as an engineer.
          </p>

          {/* CTA + reassurance */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-3">
            {isLoggedIn ? (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="gap-2 font-mono bg-primary text-primary-foreground shadow-lg rounded-full px-8 py-3 hover:bg-primary/90 transition-all"
                >
                  Go to Projects
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button
                  size="lg"
                  className="gap-2 font-mono bg-primary text-primary-foreground shadow-lg rounded-full px-8 py-3 hover:bg-primary/90 transition-all"
                >
                  <Terminal className="h-5 w-5" />
                  Start for Free in&nbsp;5&nbsp;min
                  <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </Link>
            )}
            <span className="text-sm text-slate-500">
              No credit card required
            </span>
          </div>

          {/* Micro-proof */}
          {/* <p className="text-xs text-slate-400">4 443 tests run last week</p> */}
        </div>

        {/* 🎥  RIGHT – demo placeholder (hidden on mobile) */}
        <div className="flex-1 flex justify-center">
          <div className="relative w-full max-w-xl aspect-video rounded-2xl ring-1 ring-slate-300/40 overflow-hidden">
            {/* Swap src with your real demo.mp4 or a GIF */}
            <img
              src="/404skill-cli-demo.gif"
              alt="404Skill CLI demo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
