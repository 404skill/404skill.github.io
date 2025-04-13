
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
        <h2 className="text-3xl font-bold font-mono">Ready to Level Up Your Backend Skills?</h2>
        <p className="text-muted-foreground max-w-[42rem] mx-auto">
          Join our community of developers and start building powerful, scalable backend applications today with feedback from FAANG engineering leaders.
        </p>
        {!isLoggedIn && (
          <Link to="/auth">
            <Button size="lg" className="animate-pulse hover:animate-none font-mono">
              Sign Up Now
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CtaSection;
