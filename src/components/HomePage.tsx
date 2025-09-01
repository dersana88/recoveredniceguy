import React, { useEffect, useState } from 'react';
import HeroSection from './HeroSection';
import MindReadingChecklist from './MindReadingChecklist';
import ValidationQuestions from './ValidationQuestions';
import SymptomsGrid from './SymptomsGrid';
import ActiveStatusPhases from './ActiveStatusPhases';
import ProductContentsSection from './ProductContentsSection';
import WhatsIncludedSection from './WhatsIncludedSection';
import PricingSection from './PricingSection';
import FinalSection from './FinalSection';
import StickyFooter from './StickyFooter';
import Header from './Header';
import TestimonialSingle from './TestimonialSingle';
import TestimonialDouble from './TestimonialDouble';
import { useScrollAnimations } from '../hooks/useScrollAnimations';
import { TimelineOption } from '../types/timeline';

// Track VIEW_CONTENT event when page loads
function trackViewContent() {
  if (typeof window !== 'undefined' && (window as any).rdt) {
    (window as any).rdt('track', 'VIEW_CONTENT', {
      conversion_id: `view_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    });
  }
}

export default function HomePage() {
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineOption>('3-days');

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

  // Track VIEW_CONTENT on page load
  useEffect(() => {
    trackViewContent();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f14] text-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-24">
        <HeroSection 
          selectedTimeline={selectedTimeline}
          setSelectedTimeline={setSelectedTimeline}
        />
        
        <TestimonialSingle 
          text="Best $15 I ever spent. Already sent 4 texts when I found this. Thought I'd ruined everything. The 'Emergency Protocol for Serial Texters' saved me. She responded to the recovery message in 3 hours."
          author="Michael K."
          location="Chicago"
        />
        
        <MindReadingChecklist />
        
        <ValidationQuestions />
        
        <SymptomsGrid />
        
        <TestimonialSingle 
          text="She hadn't replied in 8 days. Used template #7. Got 'sorry, been overwhelmed, want to grab drinks Friday?' For $15, this ended 8 days of mental torture. Cheaper than therapy."
          author="David R."
          location="Austin"
          darkBg={true}
        />
        
        <ActiveStatusPhases selectedTimeline={selectedTimeline} />
        
        <PricingSection />
        
        <WhatsIncludedSection />
        
        <TestimonialDouble 
          testimonials={[
            {
              text: "67% success rate is real. She replied in 2 hours: 'I needed space to think, but I miss talking to you.' Currently texting. $15 well spent - my hands aren't shaking anymore.",
              author: "James T.",
              location: "Denver",
              type: "success"
            },
            {
              text: "Didn't get her back. But for $15, the guide showed me she was never interested. The closure was worth way more than getting a response. Stopped feeling pathetic, started dating others.",
              author: "Ryan M.",
              location: "Seattle", 
              type: "closure"
            }
          ]}
        />
        
        <FinalSection />
      </div>
      
      <StickyFooter />
    </div>
  );
}