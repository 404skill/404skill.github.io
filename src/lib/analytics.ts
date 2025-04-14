
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// Analytics event types
export enum AnalyticsEvent {
  ENTERED_PROJECTS_DASHBOARD = "EnteredProjectsDashboard",
  CLICKED_ON_PROJECT = "ClickedOnProject",
  OPENED_PROJECT_TASKS = "OpenedProjectTasks",
  READ_PROJECT_DETAILS = "ReadProjectDetails",
  CLICKED_REQUEST_HELP = "ClickedRequestHelp",
  CLICKED_ON_PRICING_FREE = "ClickedOnPricingFree",
  CLICKED_ON_PRICING_PRO = "ClickedOnPricingPro",
  CLICKED_ON_PRICING_TEAMS = "ClickedOnPricingTeams",
  VIEWED_SCOOTER_RENTAL = "ViewedScooterRental"
}

// Initialize session ID if not exists
const getSessionId = () => {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
        sessionId = uuidv4();
        sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
};

export const trackEvent = async ({ eventType, component, eventData = {} }) => {
    try {
        const sessionId = getSessionId();
        const userId = (await supabase.auth.getUser()).data.user?.id;
        await supabase.from('user_events').insert([
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
export const trackPageView = async () => {
    await trackEvent({
        eventType: 'page_view',
        eventData: {
            title: document.title,
            referrer: document.referrer,
            url: window.location.href
        }
    });
};
