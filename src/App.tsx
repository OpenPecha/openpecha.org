import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Model from "./pages/Model";
import ModelDetail from "./pages/ModelDetail";
import Datasets from "./pages/Datasets";
import DatasetDetail from "./pages/DatasetDetail";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/Scrolltotop";

// Create the query client instance
const queryClient = new QueryClient();

// Wrap the App component in a function to ensure hooks are used within a function component
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/models" element={<Model />} />
            <Route path="/models/:id" element={<ModelDetail />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/datasets/:id" element={<DatasetDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </HashRouter>
    </QueryClientProvider>
  );
};

export default App;
