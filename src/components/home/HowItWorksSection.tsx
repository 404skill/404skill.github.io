import React from 'react';
import {
  BookOpen,
  CheckCircle,
  Code,
  Download,
  HelpCircle,
  ScrollText,
  ArrowRight,
  Zap,
  Rocket,
  Target,
  Users,
  Trophy,
  Sparkles,
} from 'lucide-react';
import Feature from './Feature';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection = ({ isVisible }: HowItWorksSectionProps) => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      <div className="container relative">
        {/* Section Header with enhanced styling */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-mono bg-primary/10 text-primary mb-6 shadow-lg shadow-primary/5">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Your Path to Growth
          </div>
          <h2
            className="font-display text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80"
            style={{ minHeight: '1.5em' }}
          >
            How You'll Level Up
          </h2>
          <p className="text-lg text-muted-foreground max-w-[42rem] mx-auto leading-relaxed">
            A structured approach to becoming a better backend engineer, with expert guidance every
            step of the way.
          </p>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">How It Works</h3>
          <p className="text-md text-muted-foreground text-center mb-10">
            Follow these three steps to accelerate your backend engineering journey.
          </p>
          <div className="relative max-w-6xl mx-auto">
            <div className="grid gap-12 md:grid-cols-3 relative">
              <div
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '200ms' }}
              >
                <Feature
                  icon={BookOpen}
                  title="1. Build Your Portfolio"
                  description="Build impressive projects that hiring managers actually care about. No more todo apps or weather APIs."
                />
              </div>
              <div
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '250ms' }}
              >
                <Feature
                  icon={Code}
                  title="2. Get Expert Reviews"
                  description="Every line of code gets reviewed by engineers who've built systems at scale. Learn exactly what employers want."
                />
              </div>
              <div
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: '300ms' }}
              >
                <Feature
                  icon={ScrollText}
                  title="3. Land Your Dream Job"
                  description="Use your polished portfolio and expert feedback to ace interviews and negotiate better offers."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full flex justify-center mb-20">
          <div className="h-0.5 w-32 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-full" />
        </div>

        {/* Key Benefits Section */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">Key Benefits</h3>
          <p className="text-md text-muted-foreground text-center mb-10">
            Why 404Skill is the best way to accelerate your growth as a backend engineer and get
            hired faster.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '350ms' }}
            >
              <Feature
                icon={Target}
                title="Skip the Learning Curve"
                description="No more guessing what to build. We give you the exact projects that get you hired, with step-by-step guidance."
              />
            </div>
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '400ms' }}
            >
              <Feature
                icon={Users}
                title="Learn From the Best"
                description="Get personalized feedback from engineers who've built systems at top companies."
              />
            </div>
            <div
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: '450ms' }}
            >
              <Feature
                icon={Trophy}
                title="Get Hired Faster"
                description="Get guidance on your resume, LinkedIn, and interview prep."
              />
            </div>
          </div>
        </div>

        {/* Social Proof with enhanced styling */}
        <div className="mt-24 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-mono bg-primary/10 text-primary mb-6 shadow-lg shadow-primary/5">
            <Users className="mr-2 h-3.5 w-3.5" />
            Real Developer Story
          </div>
          <blockquote className="mt-8 text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "I was always thinking about how to make my resume more impressive and my skills more
            attractive. You can't always get that experience while on the job, so I spent time
            building different projects using tech I wanted to learn. That's how I gained much more
            experience and became an attractive hire. Now I'm working at Microsoft."
          </blockquote>
          <div className="mt-6 text-sm text-muted-foreground font-medium">
            — Founder of 404Skill
          </div>
        </div>

        {/* Call to action with enhanced styling */}
        <div
          className={`text-center mt-24 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '550ms' }}
        >
          <Link to="/auth">
            <Button
              size="lg"
              className="gap-3 group hover-button font-mono gradient-primary text-primary-foreground px-8 py-6 text-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              Start Your Growth Journey
              <ArrowRight className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6">
            Try it risk-free for 14 days • Get your first project review free
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
