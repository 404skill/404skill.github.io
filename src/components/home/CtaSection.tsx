import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  isLoggedIn: boolean;
}

const CtaSection = ({ isLoggedIn }: CtaSectionProps) => {
  return (
    <section className="container py-24">
      <div className="mx-auto max-w-[58rem] space-y-6 text-center">
        <h2 className="text-3xl font-bold font-mono">Your Backend Career Starts Here</h2>
        <p className="text-muted-foreground max-w-[42rem] mx-auto">
          Join 1,000+ developers who've landed backend roles at companies like Monday.com, Microsoft, and Amazon. Your first project review is free.
        </p>
        {!isLoggedIn && (
          <div className="flex flex-col items-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="animate-pulse hover:animate-none font-mono">
                Start 14‑day risk‑free trial
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              No credit card required. Cancel anytime.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
