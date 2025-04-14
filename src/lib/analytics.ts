
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Custom event types
export enum AnalyticsEvent {
  // Page views
  PAGE_VIEW = 'page_view',
  
  // User journey events
  ENTERED_PROJECTS_DASHBOARD = 'EnteredProjectsDashboard',
  CLICKED_ON_PROJECT = 'ClickedOnAProject',
  OPENED_PROJECT_TASKS = 'OpenedProjectTasks',
  READ_PROJECT_DETAILS = 'ReadProjectDetails',
  CLICKED_REQUEST_HELP = 'ClickedRequestHelp',
  
  // Pricing events
  CLICKED_PRICING_FREE = 'ClickedOnPricingFree',
  CLICKED_PRICING_PRO = 'ClickedOnPricingPro',
  CLICKED_PRICING_TEAMS = 'ClickedOnPricingTeams'
}

// Initialize session ID if not exists
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

interface TrackEventProps {
  eventType: string;
  component?: string;
  eventData?: Record<string, any>;
}

export const trackEvent = async ({ 
  eventType, 
  component, 
  eventData = {} 
}: TrackEventProps): Promise<void> => {
  try {
    const sessionId = getSessionId();
    const userId = (await supabase.auth.getUser()).data.user?.id;
    
    await supabase
      .from('user_events')
      .insert([
        {
          event_type: eventType,
          user_id: userId,
          page_path: window.location.pathname,
          component,
          event_data: eventData,
          session_id: sessionId
        }
      ]);
    
    console.log(`Event tracked: ${eventType}`);
  } catch (error) {
    console.error("Error tracking event:", error);
    // Silent fail - don't interrupt user experience for analytics
  }
};

// Track page view
export const trackPageView = async (): Promise<void> => {
  await trackEvent({ 
    eventType: AnalyticsEvent.PAGE_VIEW,
    eventData: { 
      title: document.title,
      referrer: document.referrer,
      url: window.location.href 
    }
  });
};
