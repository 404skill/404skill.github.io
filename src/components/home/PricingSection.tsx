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
              "Access to 2 starter projects",
              "Community support",
              "Basic project completion tracking"
            ]}
            buttonText="Sign Up Free"
          />
          
          <PricingTier 
            title="Pro"
            price="$29"
            description="Practice real-world backend skills"
            features={[
              "Access to all projects",
              "Detailed progress tracking",
              "Code review for final project submission",
              "Priority community support"
            ]}
            highlighted={true}
            buttonText="Get Started"
            annualPrice="$290"
          />
          
          <PricingTier 
            title="Pro+"
            price="$59"
            description="Accelerate your growth with expert guidance"
            features={[
              "Everything in Pro",
              "Code reviews at key project milestones",
              "45-minute 1:1 mentorship session per month",
              "Career guidance and portfolio review",
              "Priority support"
            ]}
            details={[
              {
                title: "Code Reviews",
                description: "Get expert feedback at important project milestones. Pro users get one review at project completion, while Pro+ users get reviews at key checkpoints throughout the project."
              },
              {
                title: "1:1 Mentorship Sessions",
                description: "Monthly 45-minute call with an industry expert to discuss your progress, career goals, and get personalized advice. Perfect for technical discussions, career planning, and interview preparation."
              },
              {
                title: "Career Support",
                description: "Get help with building your portfolio, crafting your resume, and preparing for technical interviews. Our experts will guide you through the job search process and help you stand out."
              }
            ]}
            buttonText="Get Started"
            annualPrice="$590"
          />
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
