import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProjectsDashboard from '@/pages/ProjectsDashboard/ProjectsDashboard.tsx';
import Auth from './pages/Auth/Auth.tsx';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import Help from './pages/Help';
import NotFound from './pages/NotFound';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RefundPolicy from './pages/legal/RefundPolicy';
import GetStarted from '@/pages/GetStarted/GetStarted.tsx';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<ProjectsDashboard />} />
          <Route path="/getStarted" element={<GetStarted />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/help" element={<Help />} />
          <Route path="/legal/terms" element={<TermsOfService />} />
          <Route path="/legal/privacy" element={<PrivacyPolicy />} />
          <Route path="/legal/refund" element={<RefundPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
