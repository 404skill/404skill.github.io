import React, { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { trackEvent, AnalyticsEvent } from '@/lib/analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface FeatureDetail {
  title: string;
  description: string;
}

interface PricingTierProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonText: string;
  customButton?: React.ReactNode;
  details?: FeatureDetail[];
  annualPrice?: string;
  badge?: ReactNode;
  disabled?: boolean;
}

const PricingTier = ({
  title,
  price,
  description,
  features,
  highlighted = false,
  buttonText,
  customButton,
  details,
  annualPrice,
  badge,
  disabled = false,
}: PricingTierProps) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handlePricingClick = () => {
    let eventType = AnalyticsEvent.CLICKED_ON_PRICING_FREE;

    if (title === 'Guided') {
      eventType = AnalyticsEvent.CLICKED_ON_PRICING_PRO;
    } else if (title === 'Premium Mentorship') {
      eventType = AnalyticsEvent.CLICKED_ON_PRICING_PRO_PLUS;
    }

    trackEvent({
      eventType,
      component: 'PricingTier',
      eventData: { plan: title, price },
    });

    toast({
      title: 'Demo Mode',
      description:
        "Our product is currently in development. Sign up for free, and we'll contact you once everything is ready!",
      duration: 5000,
      variant: 'demo',
      className: 'bg-[#8B5CF6] text-white border-0 shadow-2xl',
    });

    navigate('/auth');
  };

  return (
    <Card
      className={`relative flex flex-col h-full justify-between ${highlighted ? 'border-primary shadow-lg relative overflow-hidden' : ''} ${disabled ? 'opacity-50 pointer-events-none relative' : ''}`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <Badge className="rounded-bl-lg rounded-tr-lg rounded-br-none rounded-tl-none px-3 py-1 bg-primary text-primary-foreground">
            Popular
          </Badge>
        </div>
      )}
      {disabled && (
        <div className="absolute top-2 right-2">
          <Badge className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded">
            Coming Soon
          </Badge>
        </div>
      )}
      <CardHeader>
        {badge}
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            {price !== 'Free' && <span className="text-muted-foreground ml-1">/month</span>}
          </div>
          {annualPrice && (
            <div className="mt-1 text-sm text-muted-foreground">
              or {annualPrice}/year (save 2 months)
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-8">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {details && (
          <div className="relative mt-auto ">
            <Button
              variant="secondary"
              className="w-full flex items-center justify-between text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span>Learn more about these features</span>
              {showDetails ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {showDetails && (
              <div
                className="
                  absolute top-full left-0 w-full mt-2
                  bg-white dark:bg-gray-800
                  rounded-lg shadow-lg
                  p-4 space-y-4
                  z-50
                "
              >
                {details.map((detail, index) => (
                  <div key={index} className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">{detail.title}</h4>
                    <p className="text-sm text-muted-foreground">{detail.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {customButton ? (
          customButton
        ) : (
          <Button
             className={`w-full ${highlighted ? 'bg-primary hover:bg-primary/90' : ''}`}
             onClick={handlePricingClick}
             disabled={disabled}
           >
            {buttonText}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default PricingTier;
