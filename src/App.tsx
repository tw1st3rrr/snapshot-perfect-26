import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Navigation from "./pages/Navigation";
import Loyalty from "./pages/Loyalty";
import Cinema from "./pages/Cinema";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AllStores from "./pages/AllStores";
import AllEvents from "./pages/AllEvents";
import StoreDetail from "./pages/StoreDetail";
import EventDetail from "./pages/EventDetail";
import SeatSelection from "./pages/SeatSelection";
import CinemaPayment from "./pages/CinemaPayment";
import BookingConfirmation from "./pages/BookingConfirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/cinema" element={<Cinema />} />
          <Route path="/cinema/seats" element={<SeatSelection />} />
          <Route path="/cinema/payment" element={<CinemaPayment />} />
          <Route path="/cinema/confirmation" element={<BookingConfirmation />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stores" element={<AllStores />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/event/:id" element={<EventDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
