import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import MyTrips from "./pages/MyTrips";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/home" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/trips" element={<Layout />}>
            <Route index element={<MyTrips />} />
          </Route>
          <Route path="/family" element={<Layout />}>
            <Route index element={<Placeholder title="My Family" />} />
          </Route>
          <Route path="/groups" element={<Layout />}>
            <Route index element={<Placeholder title="Groups" />} />
          </Route>
          <Route path="/itinerary" element={<Layout />}>
            <Route index element={<Placeholder title="Itinerary" />} />
          </Route>
          <Route path="/budget" element={<Layout />}>
            <Route index element={<Placeholder title="Budget" />} />
          </Route>
          <Route path="/settings" element={<Layout />}>
            <Route index element={<Placeholder title="Settings" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
