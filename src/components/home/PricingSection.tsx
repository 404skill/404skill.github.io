import React, { useState } from "react";
import PricingTier from "./PricingTier";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const PricingSection = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-mono">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground max-w-[42rem] mx-auto">
            Choose the plan that fits your learning style and goals
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <Label htmlFor="billing-toggle" className="text-muted-foreground">Monthly</Label>
          <Switch
            id="billing-toggle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <Label htmlFor="billing-toggle" className="text-muted-foreground">
            Annual <span className="text-primary">(Save 20%)</span>
          </Label>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingTier 
            title="Self-Paced"
            price={isAnnual ? "$240" : "$29"}
            description="Perfect for independent learners"
            features={[
              "Project library & test suites",
              "Progress dashboard",
              "Community Discord",
              "1 final project review",
              "Community support"
            ]}
            buttonText="Start Learning"
            details={[
              {
                title: "Project Access",
                description: "Get access to all our backend projects, from simple APIs to complex distributed systems."
              },
              {
                title: "Community Support",
                description: "Learn alongside other developers in our Discord community. Get help and share your progress."
              }
            ]}
          />
          
          <PricingTier 
            title="Guided"
            price={isAnnual ? "$720" : "$79"}
            description="Perfect if you want expert feedback without the price of live coaching"
            features={[
              "Everything in Self-Paced",
              "Direct mentor Q&A (< 24h)",
              "2 code-review credits/month",
              "Weekly written feedback",
              "Career assets & job board"
            ]}
            highlighted={true}
            buttonText="Get Guidance"
            details={[
              {
                title: "Async Mentorship",
                description: "Get detailed feedback on your code and answers to your questions within 24 hours."
              },
              {
                title: "Code Reviews",
                description: "Use your monthly credits to get expert feedback on any part of your project."
              },
              {
                title: "Career Support",
                description: "Access resume templates, job board, and weekly progress check-ins."
              }
            ]}
          />
          
          <PricingTier 
            title="Premium Mentorship"
            price={isAnnual ? "$1,920" : "$199"}
            description="Direct 1-on-1 calls with the founder"
            features={[
              "Everything in Guided",
              "2 × 30-min Zoom calls/month",
              "4 code-review credits/month",
              "Mock interview & resume makeover",
              "12-hour response SLA"
            ]}
            buttonText="Apply for Premium"
            details={[
              {
                title: "Live Coaching",
                description: "Two 30-minute calls per month to discuss your progress, challenges, and career goals."
              },
              {
                title: "Priority Support",
                description: "Get faster responses and more code reviews with priority access to mentorship."
              },
              {
                title: "Career Acceleration",
                description: "Mock interviews, resume makeover, and personalized job search strategy."
              }
            ]}
            badge={
              <Badge variant="secondary" className="mb-2">
                10 seats • Application only
              </Badge>
            }
          />
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            All plans include a 14‑day money‑back guarantee. No questions asked.
          </p>
          <div className="flex justify-center gap-8 text-sm text-muted-foreground">
            <p>MentorCruise equivalent: $150–$300/mo</p>
            <p>Bootcamp coaching cost: $400–$600/mo</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
