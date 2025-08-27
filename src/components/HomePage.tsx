import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import MindReadingChecklist from './MindReadingChecklist';
import ValidationQuestions from './ValidationQuestions';
import SymptomsGrid from './SymptomsGrid';
import ActiveStatusPhases from './ActiveStatusPhases';
import ProductContentsSection from './ProductContentsSection';
import PricingSection from './PricingSection';
import FinalSection from './FinalSection';
import StickyFooter from './StickyFooter';
import Header from './Header';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { TimelineOption } from '../types/timeline';

export default function HomePage() {
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
      <Header />
      
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
        
        <PricingSection />
        
        <FinalSection />
      </div>
      
      <StickyFooter />
    </div>
  );
}