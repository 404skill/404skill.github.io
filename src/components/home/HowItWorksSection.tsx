import React from "react";
import {
  PlayCircle,
  Wrench,
  BadgeCheck,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Trophy,
} from "lucide-react";
import Feature from "./Feature";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HowItWorksSectionProps {
  isVisible: boolean;
}

const HowItWorksSection = ({ isVisible }: HowItWorksSectionProps) => {
  // helper for fade/slide-in animation
  const fadeIn = (ms: number) => ({
    className: `transition-all duration-700 ${
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`,
    style: { transitionDelay: `${ms}ms` },
  });

  return (
    <section className="relative py-32 overflow-hidden">
      {/* layered background (unchanged) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/30" />
        <div className="absolute inset-0 opacity-[0.15] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      </div>

      <div className="container relative">
        {/* header */}
        <div {...fadeIn(150)} className="text-center mb-20">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-mono bg-primary/10 text-primary mb-6 shadow-lg shadow-primary/5">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            Your Path to Growth
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ship Production-Grade Back-Ends in&nbsp;3 Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-[42rem] mx-auto leading-relaxed">
            Follow the exact loop top companies use to level-up new hires—pick a
            challenge, beat the tests, polish with expert review.
          </p>
        </div>

        {/* 3-step rail */}
        <div className="mt-24 relative max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
          {/* connecting arrows (desktop) */}
          <ArrowRight className="hidden md:block absolute left-1/3 top-[40%] -translate-y-1/2 text-primary/30 w-12 h-12" />
          <ArrowRight className="hidden md:block absolute left-2/3 top-[40%] -translate-y-1/2 text-primary/30 w-12 h-12" />

          {/* step 1 */}
          <div {...fadeIn(200)}>
            <div className="flex flex-col items-center text-center">
              {/* <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                1
              </span> */}
              <PlayCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">
                Start a Real-World Challenge
              </h3>
              <p className="text-sm text-muted-foreground">
                Spin up a fully containerised starter repo, and implement the project requirements, task by task.
              </p>
            </div>
          </div>

          {/* step 2 */}
          <div {...fadeIn(250)}>
            <div className="flex flex-col items-center text-center">
              {/* <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                2
              </span> */}
              <Wrench className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">
                Build &amp; Beat the Test Suite
              </h3>
              <p className="text-sm text-muted-foreground">
                Test your implementation against our comprehensive test suite, and fix any issues.
              </p>
            </div>
          </div>

          {/* step 3 */}
          <div {...fadeIn(300)}>
            <div className="flex flex-col items-center text-center">
              {/* <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold shadow-lg">
                3
              </span> */}
              <BadgeCheck className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2">Get Senior Code Review</h3>
              <p className="text-sm text-muted-foreground">
                Submit your repo for line-by-line feedback from engineers who’ve
                shipped at scale—walk away with concrete lessons.
              </p>
            </div>
          </div>
        </div>

        {/* divider */}
        <div className="w-full flex justify-center mt-28 mb-20">
          <div className="h-0.5 w-32 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 rounded-full" />
        </div>

        {/* key benefits (unchanged) */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-4">
            Key Benefits
          </h3>
          <p className="text-md text-muted-foreground text-center mb-10">
            Why 404Skill is the fastest way to level-up and get hired.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div {...fadeIn(350)}>
              <Feature
                icon={Target}
                title="Skip the Guesswork"
                description="We hand you projects recruiters care about—no more todo apps."
              />
            </div>
            <div {...fadeIn(400)}>
              <Feature
                icon={Users}
                title="Learn From the Best"
                description="Personalised feedback from engineers who’ve built at scale."
              />
            </div>
            <div {...fadeIn(450)}>
              <Feature
                icon={Trophy}
                title="Close Offers Faster"
                description="Interview-ready portfolio and targeted prep materials."
              />
            </div>
          </div>
        </div>

        {/* CTA & testimonial unchanged – keep your existing JSX if you like */}
        {/* ... */}
      </div>
    </section>
  );
};

export default HowItWorksSection;
