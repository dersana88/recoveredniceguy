import React from 'react';
import { ArrowRight } from 'lucide-react';
import TimelineSelector from './TimelineSelector';
import RecoveryMeter from './RecoveryMeter';
import { TimelineOption } from '../types/timeline';

interface HeroSectionProps {
  selectedTimeline: TimelineOption;
  setSelectedTimeline: (timeline: TimelineOption) => void;
}

export default function HeroSection({ selectedTimeline, setSelectedTimeline }: HeroSectionProps) {
  return (
    <section className="text-center mb-16 md:mb-24 fade-in">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight px-2">
        It's Been 3 Days.
      </h1>
      
      <h2 className="text-xl sm:text-2xl md:text-4xl font-semibold mb-6 text-gray-300 px-2">
        You Sent The Dreaded Double Text.
      </h2>
      
      <h3 className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-400 font-medium px-2">
        She's Been Active On Social Media But Not Replying.
      </h3>
      
      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-12 text-gray-300 max-w-2xl mx-auto px-4">
        I know you're in the mad phone-checking cycle right now.<br />
        Checking if she's online. She is. Just not for you.
      </p>

      <TimelineSelector 
        selectedTimeline={selectedTimeline}
        setSelectedTimeline={setSelectedTimeline}
      />

      <RecoveryMeter 
        selectedTimeline={selectedTimeline}
      />

      <div className="text-center mt-8 sm:mt-12">
        <div className="bg-red-600/10 border border-red-500/30 rounded-lg p-4 sm:p-6 mb-6 mx-4">
          <p className="text-red-300 font-semibold text-sm sm:text-base mb-2">
            ⚠️ Your Recovery Window is Closing
          </p>
          <p className="text-gray-300 text-sm">
            Every hour you wait, your chances drop by 3-5%. Stop guessing what to send.
          </p>
        </div>
        
        <button 
          onClick={() => {
            const pricingSection = document.querySelector('.whats-included-section');
            if (pricingSection) {
              pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="inline-flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 pulse-slow"
        >
          <span>Get The Exact Messages That Work</span>
          <ArrowRight size={20} />
        </button>
        
        <p className="text-sm text-gray-400 mt-3">
          Just $14.99 • Less than lunch • Instant Download
        </p>
      </div>
          Every hour you wait, your chances drop by 3-5%. For less than a coffee date.
  );
}
  )
}