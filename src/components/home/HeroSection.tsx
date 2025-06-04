import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isLoggedIn: boolean;
  isVisible: boolean;
}

const HeroSection = ({ isLoggedIn, isVisible }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#f8fafc] to-[#e0e7ef] px-4">
      {/* Badge */}
      <div className="mb-8 mt-12 sm:mt-0">
        <span className="inline-flex items-center px-4 py-1.5 rounded-full font-mono text-base bg-primary/10 text-primary border border-primary/20 shadow-sm">
          <span className="mr-2 text-lg">✨</span> Level Up Your Backend Skills
        </span>
      </div>
      {/* Headline with blue highlight */}
      <h1
        className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-center leading-[1.18] mb-1 pb-2 select-text"
        style={{ minHeight: '1.5em' }}
      >
        <span className="text-slate-900">Become a Better</span>
        <br />
        <span className="text-primary">Backend Engineer</span>
      </h1>
      {/* Subheadline */}
      <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto text-center mb-10">
        Build real-world backend systems, get expert feedback, and accelerate your growth as an
        engineer.
      </p>
      {/* CTA Button */}
      <div className="flex flex-col items-center gap-3 w-full">
        {isLoggedIn ? (
          <Link to="/dashboard">
            <Button
              size="lg"
              className="gap-2 font-mono bg-primary text-primary-foreground shadow-lg rounded-full px-8 py-3 hover:bg-primary/90 transition-all duration-200"
            >
              Go to Projects
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        ) : (
          <Link to="/auth">
            <Button
              size="lg"
              className="gap-2 font-mono bg-primary text-primary-foreground shadow-lg rounded-full px-8 py-3 hover:bg-primary/90 transition-all duration-200"
            >
              <Terminal className="h-5 w-5" />
              Start Your Growth Journey
              <ArrowRight className="ml-1 h-5 w-5" />
            </Button>
          </Link>
        )}
        <span className="text-sm text-slate-500 mt-2">
          14-day risk-free trial • No credit card required
        </span>
      </div>
    </section>
  );
};

export default HeroSection;
