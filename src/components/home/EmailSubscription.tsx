import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const EmailSubscription = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: 'Email required',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('email_subscribers').insert([
        {
          email,
          name: name || null,
          source: 'tech_stack_section',
        },
      ]);

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already subscribed',
            description: 'This email is already on our list. Thank you!',
            variant: 'default',
          });
        } else {
          throw error;
        }
      } else {
        // Track subscription event
        await supabase.from('user_events').insert([
          {
            event_type: 'email_subscribe',
            page_path: window.location.pathname,
            component: 'EmailSubscription',
            event_data: { email, source: 'tech_stack_section' },
            session_id: sessionStorage.getItem('session_id'),
          },
        ]);

        toast({
          title: 'Subscribed!',
          description: 'Thank you for subscribing to our updates.',
          variant: 'default',
        });

        setEmail('');
        setName('');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Something went wrong',
        description: 'Unable to subscribe. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background rounded-lg border shadow-sm p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Stay Updated</h3>
      </div>
      <p className="text-muted-foreground mb-4">
        Subscribe to receive updates about our launch and new features.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmailSubscription;
