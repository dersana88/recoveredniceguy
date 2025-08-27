import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/auth/LoginPage';
import SignupPage from './components/auth/SignupPage';
import SuccessPage from './components/auth/SuccessPage';
import HomePage from './components/HomePage';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <SignupPage />} />
      <Route path="/success" element={user ? <SuccessPage /> : <Navigate to="/login" />} />
      <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
import HeroSection from './components/HeroSection';
import MindReadingChecklist from './components/MindReadingChecklist';
import ValidationQuestions from './components/ValidationQuestions';
import SymptomsGrid from './components/SymptomsGrid';
import ActiveStatusPhases from './components/ActiveStatusPhases';
import ProductContentsSection from './components/ProductContentsSection';
import SolutionSection from './components/SolutionSection';
import PricingSection from './components/PricingSection';
import FinalSection from './components/FinalSection';
import StickyFooter from './components/StickyFooter';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import { TimelineOption } from './types/timeline';

function App() {
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption>('3-days');
  const [currentHour, setCurrentHour] = useState(72);

  useScrollAnimations();

  // Load timeline from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ghost-timeline');
    if (saved) {
      setSelectedTimeline(saved as TimelineOption);
    }
  }, []);

  // Save timeline to localStorage when changed
  useEffect(() => {
    localStorage.setItem('ghost-timeline', selectedTimeline);
  }, [selectedTimeline]);

  // Hour counter that increments every 60 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHour(prev => prev + 1);
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-24">
        <HeroSection 
          selectedTimeline={selectedTimeline}
          setSelectedTimeline={setSelectedTimeline}
          currentHour={currentHour}
        />
        
        <MindReadingChecklist />
        
        <ValidationQuestions />
        
        <SymptomsGrid />
        
        <ActiveStatusPhases selectedTimeline={selectedTimeline} />
        
        <ProductContentsSection />
        
        <PricingSection />
        
        <FinalSection />
      </div>
      
      <StickyFooter />
    </div>
  );
}

export default App;