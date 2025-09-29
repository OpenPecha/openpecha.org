import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { UserbackProvider } from "./components/UserbackContext";

// Create the query client instance
const queryClient = new QueryClient();

// Wrap the App component in a function to ensure hooks are used within a function component
const App: React.FC = () => {

 



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <UserbackProvider>
        
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </UserbackProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
