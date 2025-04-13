
import React from "react";
import PricingTier from "./PricingTier";

const PricingSection = () => {
  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-mono">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Choose the plan that's right for you and start building backend skills today.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier 
            title="Free"
            price="Free"
            description="Perfect for beginners"
            features={[
              "Access to 3 beginner projects",
              "Community support",
              "Basic progress tracking",
              "Run tests in the browser"
            ]}
            buttonText="Sign Up Free"
          />
          
          <PricingTier 
            title="Pro"
            price="$19"
            description="For serious learners"
            features={[
              "Access to all 20+ projects",
              "Priority community support",
              "Advanced progress tracking",
              "Code reviews (2 per month)",
              "Project certificates"
            ]}
            highlighted={true}
            buttonText="Get Started"
          />
          
          <PricingTier 
            title="Teams"
            price="$49"
            description="For teams & organizations"
            features={[
              "Everything in Pro",
              "Team dashboard",
              "Unlimited code reviews",
              "Custom projects",
              "Team leaderboards",
              "Admin controls"
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
