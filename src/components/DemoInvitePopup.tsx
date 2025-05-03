import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Clock } from "lucide-react";
import { trackEvent, AnalyticsEvent } from "@/lib/analytics";

const DemoInvitePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("hasSeenDemoPopup");
    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("hasSeenDemoPopup", "true");
      }, 2000); // 2 second delay

      return () => clearTimeout(timer);
    } else {
      // If user has seen the popup before, show minimized button
      setIsMinimized(true);
    }
  }, []);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsMinimized(true);
    }
  };

  const handleMaybeLater = () => {
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_MAYBE_LATER,
      component: "DemoInvitePopup"
    });
    setIsOpen(false);
  };

  const handleScheduleNow = () => {
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_SCHEDULE_NOW,
      component: "DemoInvitePopup"
    });
  };

  const handleScheduleButtonClick = () => {
    trackEvent({
      eventType: AnalyticsEvent.CLICKED_SCHEDULE_BUTTON,
      component: "DemoInvitePopup"
    });
    setIsOpen(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <span>Schedule a Quick Call with Me</span>
            </DialogTitle>
            <DialogDescription className="pt-2">
              Let's discuss your needs and how we can help you achieve your goals. 
              I'd love to learn more about your plans for the MVP and provide guidance.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>15-minute call</span>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleMaybeLater}
            >
              Maybe Later
            </Button>
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700"
            >
              <a 
                href="https://cal.com/elirant/15min" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={handleScheduleNow}
              >
                Schedule Now
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isMinimized && (
        <div className="fixed bottom-6 right-6 z-50">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleScheduleButtonClick}
                  className="rounded-full p-4 bg-blue-600/90 hover:bg-blue-700/90 
                    shadow-md hover:shadow-lg transition-all duration-200
                    hover:scale-[1.02]"
                  size="icon"
                >
                  <Calendar className="h-7 w-7 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-slate-800 text-white/90">
                <p>Let's chat about your project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      )}
    </>
  );
};

export default DemoInvitePopup; 