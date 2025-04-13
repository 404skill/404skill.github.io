
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
}

const PricingTier = ({ title, price, description, features, highlighted = false, buttonText }: PricingTierProps) => (
  <Card className={`flex flex-col h-full ${highlighted ? 'border-primary shadow-lg relative overflow-hidden' : ''}`}>
    {highlighted && (
      <div className="absolute top-0 right-0">
        <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none px-3 py-1 bg-primary text-primary-foreground">
          Popular
        </Badge>
      </div>
    )}
    <CardHeader>
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <div className="mt-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Free' && <span className="text-muted-foreground ml-1">/month</span>}
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}>
        {buttonText}
      </Button>
    </CardFooter>
  </Card>
);

export default PricingTier;
