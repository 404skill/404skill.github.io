import React, { useState, useMemo } from 'react';
import PricingTier from './PricingTier';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

// Basic Modal Implementation
const BasicModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <button onClick={onClose} className="absolute top-2 right-2">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

const PricingSection = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);
  const [premiumSeatsAvailable, setPremiumSeatsAvailable] = useState(10);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    email: '',
    experience: '',
    goals: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setApplicantInfo({
      ...applicantInfo,
      [name]: value,
    });
  };

  const handleSubmitApplication = async e => {
    e.preventDefault();
    console.log('Application submitted:', applicantInfo);
    try {
      const { error } = await supabase.from('applications').insert([
        {
          name: applicantInfo.name,
          email: applicantInfo.email,
          experience: applicantInfo.experience,
          goals: applicantInfo.goals,
          submitted_at: new Date().toISOString(),
        },
      ]);
      if (error) throw error;
      setApplicationSubmitted(true);
    } catch (error) {
      console.error('Error submitting application:', error);
      // Handle error (e.g., show a toast notification)
    }
  };

  const resetApplication = () => {
    setApplicationStep(1);
    setApplicationSubmitted(false);
    setApplicantInfo({
      name: '',
      email: '',
      experience: '',
      goals: '',
    });
  };

  const ApplicationForm = useMemo(
    () => (
      <>
        {!applicationSubmitted ? (
          <>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold mb-2">Premium Mentorship Application</h2>
              <div className="flex justify-center mb-4">
                <div
                  className={`h-2 w-2 mx-1 rounded-full ${applicationStep >= 1 ? 'bg-primary' : 'bg-gray-200'}`}
                ></div>
                <div
                  className={`h-2 w-2 mx-1 rounded-full ${applicationStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}
                ></div>
              </div>
            </div>

            {applicationStep === 1 ? (
              <form
                className="space-y-4"
                onSubmit={e => {
                  e.preventDefault();
                  if (applicantInfo.name && applicantInfo.email) {
                    setApplicationStep(2);
                  }
                }}
              >
                <p className="text-sm text-muted-foreground">
                  We review applications to ensure our mentorship program is a good fit for your
                  goals and experience level.
                </p>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={applicantInfo.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={applicantInfo.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <Button type="submit" disabled={!applicantInfo.name || !applicantInfo.email}>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmitApplication}>
                <div className="space-y-2">
                  <Label htmlFor="experience">Years of experience in backend development</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={applicantInfo.experience}
                    onChange={handleInputChange}
                    placeholder="e.g. 1-2 years"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goals">What are your career goals for the next 6 months?</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={applicantInfo.goals}
                    onChange={handleInputChange}
                    placeholder="Share your goals and what you hope to achieve with premium mentorship"
                    rows={3}
                  />
                </div>
                <div className="pt-2 flex justify-between">
                  <Button variant="outline" onClick={() => setApplicationStep(1)} type="button">
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={!applicantInfo.experience || !applicantInfo.goals}
                  >
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold">Application Received!</h2>
            <p className="text-muted-foreground">
              Thanks for applying! We'll review your application and get back to you within 48
              hours.
            </p>
            <Button
              onClick={() => {
                resetApplication();
                setIsModalOpen(false);
                navigate('/auth');
              }}
            >
              Close
            </Button>
          </div>
        )}
      </>
    ),
    [applicationSubmitted, applicationStep, applicantInfo, handleInputChange],
  );

  const WaitlistForm = useMemo(
    () => (
      <>
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold mb-2">Join the Premium Waitlist</h2>
        </div>
        <p className="text-muted-foreground mb-4">
          All premium seats are currently filled. Join our waitlist to be notified when a spot opens
          up.
        </p>
        <form
          onSubmit={e => {
            e.preventDefault();
            setIsWaitlistModalOpen(false);
          }}
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="waitlist-email">Email</Label>
              <Input id="waitlist-email" placeholder="your@email.com" type="email" />
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Join Waitlist
              </Button>
            </div>
          </div>
        </form>
      </>
    ),
    [],
  );

  const PremiumApplicationButton = () => {
    if (premiumSeatsAvailable <= 0) {
      return (
        <Button variant="outline" className="w-full" onClick={() => setIsWaitlistModalOpen(true)}>
          Join Waitlist
        </Button>
      );
    }

    return (
      <Button
        variant="default"
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
        onClick={() => setIsModalOpen(true)}
      >
        Apply for Premium
      </Button>
    );
  };

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
          <Label htmlFor="billing-toggle" className="text-muted-foreground">
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={isAnnual} onCheckedChange={setIsAnnual} />
          <Label htmlFor="billing-toggle" className="text-muted-foreground">
            Annual <span className="text-primary">(Save 20%)</span>
          </Label>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingTier
            title="Self-Paced"
            price={isAnnual ? '$240' : '$29'}
            description="Perfect for independent learners"
            features={[
              'Project library & test suites',
              'Progress dashboard',
              'Community Discord',
              '1 final project review',
              'Community support',
            ]}
            buttonText="Start Learning"
            details={[
              {
                title: 'Project Access',
                description:
                  'Get access to all our backend projects, from simple APIs to complex distributed systems.',
              },
              {
                title: 'Community Support',
                description:
                  'Learn alongside other developers in our Discord community. Get help and share your progress.',
              },
            ]}
          />

          <PricingTier
            title="Guided"
            price={isAnnual ? '$720' : '$79'}
            description="Perfect if you want expert feedback without the price of live coaching"
            features={[
              'Everything in Self-Paced',
              'Direct mentor Q&A (< 24h)',
              '2 code-review credits/month',
              'Weekly written feedback',
              'Career assets & job board',
            ]}
            highlighted={true}
            buttonText="Get Guidance"
            details={[
              {
                title: 'Async Mentorship',
                description:
                  'Get detailed feedback on your code and answers to your questions within 24 hours.',
              },
              {
                title: 'Code Reviews',
                description:
                  'Use your monthly credits to get expert feedback on any part of your project.',
              },
              {
                title: 'Career Support',
                description: 'Access resume templates, job board, and weekly progress check-ins.',
              },
            ]}
          />

          <PricingTier
            title="Premium Mentorship"
            price={isAnnual ? '$1,920' : '$199'}
            description="Direct 1-on-1 calls with the founder"
            features={[
              'Everything in Guided',
              '2 × 30-min Zoom calls/month',
              '4 code-review credits/month',
              'Mock interview & resume makeover',
              '12-hour response SLA',
            ]}
            customButton={<PremiumApplicationButton />}
            buttonText="Apply for Premium"
            details={[
              {
                title: 'Live Coaching',
                description:
                  'Two 30-minute calls per month to discuss your progress, challenges, and career goals.',
              },
              {
                title: 'Priority Support',
                description:
                  'Get faster responses and more code reviews with priority access to mentorship.',
              },
              {
                title: 'Career Acceleration',
                description:
                  'Mock interviews, resume makeover, and personalized job search strategy.',
              },
            ]}
            badge={<Badge variant="secondary">{premiumSeatsAvailable} seats available</Badge>}
          />
        </div>

        <div className="mt-16 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            All plans include a 14‑day money‑back guarantee. No questions asked.
          </p>
        </div>
      </div>

      {/* Application Modal */}
      <BasicModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {ApplicationForm}
      </BasicModal>

      {/* Waitlist Modal */}
      <BasicModal isOpen={isWaitlistModalOpen} onClose={() => setIsWaitlistModalOpen(false)}>
        {WaitlistForm}
      </BasicModal>
    </section>
  );
};

export default PricingSection;
