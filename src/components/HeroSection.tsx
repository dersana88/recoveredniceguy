import React from 'react';
import TimelineSelector from './TimelineSelector';
import RecoveryMeter from './RecoveryMeter';
import { TimelineOption } from '../types/timeline';
import { Star } from 'lucide-react';

interface HeroSectionProps {
  selectedTimeline: TimelineOption;
  setSelectedTimeline: (timeline: TimelineOption) => void;
  currentHour: number;
}

export default function HeroSection({ selectedTimeline, setSelectedTimeline, currentHour }: HeroSectionProps) {
  return (
    <section className="text-center mb-16 md:mb-24 fade-in">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
        It's Been 3 Days.
      </h1>
      
      <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-gray-300">
        You Sent The Dreaded Double Text.
      </h2>
      
      <h3 className="text-xl md:text-2xl mb-8 text-gray-400 font-medium">
        She's Been Active On Social Media But Not Replying.
      </h3>
      
      <p className="text-lg md:text-xl leading-relaxed mb-12 text-gray-300 max-w-2xl mx-auto">
        I know you're in the mad phone-checking cycle right now.<br />
        Checking if she's online. She is. Just not for you.
      </p>

      {/* Hero Testimonial - David's transformation */}
      <div className="bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700 mb-12 max-w-3xl mx-auto">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={20} className="text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 italic">
          "I was checking my phone every 30 seconds, losing sleep, feeling like a complete loser. The protocol gave me back my dignity. 
          I went from desperate and needy to confident and in control. She responded within 6 hours of sending the right message."
        </blockquote>
        <cite className="text-green-400 font-semibold">— David M., recovered after 4 days of silence</cite>
      </div>
      <TimelineSelector 
        selectedTimeline={selectedTimeline}
        setSelectedTimeline={setSelectedTimeline}
      />

      <RecoveryMeter 
        selectedTimeline={selectedTimeline}
        currentHour={currentHour}
      />
    </section>
  );
}