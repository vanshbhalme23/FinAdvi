import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Advisors from "./pages/Advisors";
import AdvisorProfile from "./pages/AdvisorProfile";
import Resources from "./pages/Resources";
import AuthPage from "./pages/Auth";
import BookingPage from "./pages/Booking";
import Dashboard from "./pages/Dashboard";
import AdvisorDashboard from "./pages/AdvisorDashboard";
import AdminPanel from "./pages/AdminPanel";
import ForAdvisors from "./pages/ForAdvisors";
import VideoCall from "./pages/VideoCall";
import Pricing from "./pages/Pricing";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/advisors" element={<Advisors />} />
            <Route path="/advisors/:id" element={<AdvisorProfile />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/booking/:advisorId" element={<BookingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/advisor" element={<AdvisorDashboard />} />
            <Route path="/for-advisors" element={<ForAdvisors />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/video-call" element={<VideoCall />} />
            <Route path="/video-call/:advisorId" element={<VideoCall />} />
            <Route path="/admin" element={<AdminPanel />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
