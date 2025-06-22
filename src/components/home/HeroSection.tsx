import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isLoggedIn: boolean;
}

const HeroSection = ({ isLoggedIn }: HeroSectionProps) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative flex flex-col items-center bg-gradient-to-b from-[#f8fafc] to-[#e0e7ef] min-h-[80vh] py-32">
      <div className="container mx-auto px-4 text-center">
        {/* Copy */}
        <p className="text-sm font-semibold text-primary/90 uppercase tracking-wide mb-2">
          Tutorials don’t make you production-ready
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.18] mb-3 select-text">
          <span className="text-slate-900">Become a Better</span>
          <br />
          <span className="text-primary">Software Engineer</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 max-w-xl mx-auto mb-8">
          Build real-world software, get expert feedback, and accelerate your growth as an engineer.
        </p>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 mb-4">
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
          <span className="text-sm text-slate-500">No credit card required</span>
        </div>
      </div>

      {/* 🎥 Video Section Below */}
      <div className="w-full flex justify-center mt-10 px-4">
        <div className="relative w-full max-w-4xl aspect-video rounded-2xl ring-1 ring-slate-300/40 overflow-hidden">
          {/* Loader overlay */}
          {!videoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-100 animate-pulse">
              <span className="text-slate-400 text-sm">Loading demo…</span>
            </div>
          )}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover relative z-0"
            onLoadedData={() => setVideoLoaded(true)}
            poster="/fallback-poster.jpg"
          >
            <source src="/404skill-cli-demo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
