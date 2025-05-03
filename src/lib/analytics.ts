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
  CLICKED_ON_PRICING_PRO_PLUS = "ClickedOnPricingProPlus",
  VIEWED_SCOOTER_RENTAL = "ViewedScooterRental",
  // Demo popup events
  CLICKED_SCHEDULE_BUTTON = "ClickedScheduleButton",
  CLICKED_MAYBE_LATER = "ClickedMaybeLater",
  CLICKED_SCHEDULE_NOW = "ClickedScheduleNow"
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
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from('user_events').insert([
            {
                event_type: eventType,
                user_id: user?.id,
                page_path: window.location.pathname,
                component,
                event_data: eventData,
                session_id: sessionId
            }
        ]);
    } catch (error) {
    // Silent fail - don't interrupt user experience for analytics
    }
};

// Track page view
export const trackPageView = async () => {
    await trackEvent({
        eventType: 'page_view',
        component: 'Page',
        eventData: {
            title: document.title,
            referrer: document.referrer,
            url: window.location.href
        }
    });
};
