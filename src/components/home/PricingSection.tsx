
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
            description="Try the platform with starter projects"
            features={[
              "Limited projects access",
              "Community support"
            ]}
            buttonText="Sign Up Free"
          />
          
          <PricingTier 
            title="Pro"
            price="$29"
            description="Practice real-world backend skills"
            features={[
              "Everything in Free",
              "Unlimited access to all projects",
            ]}
            highlighted={true}
            buttonText="Get Started"
          />
          
          <PricingTier 
            title="Pro+"
            price="$59"
            description="Accelerate your growth with expert feedback"
            features={[
              "Everything in Pro",
              "1 code review per project",
              "1 x 45-minute mentorship session per month"
            ]}
            buttonText="Get Started"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
