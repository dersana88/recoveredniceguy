import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { TimelineOption } from '../types/timeline';

interface ActiveStatusPhasesProps {
  selectedTimeline: TimelineOption;
}

export default function ActiveStatusPhases({ selectedTimeline }: ActiveStatusPhasesProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  const phases = [
    {
      title: "Day 1 (0-24 Hours): The Decision Window",
      content: [
        "78% recovery rate - Your highest chance window",
        "She's actively weighing her options about you right now",
        "The right move here locks in a response within 6 hours"
      ],
      timelineMatch: ['less-than-24h']
    },
    {
      title: "Day 2-3 (24-72 Hours): The Make-or-Break Zone",
      content: [
        "67% recovery rate with the Phoenix Protocol",
        "She's testing your emotional control and confidence level",
        "One wrong move drops your chances to under 20%"
      ],
      timelineMatch: ['3-days']
    },
    {
      title: "Day 3-7 (72-168 Hours): The Archive Phase",
      content: [
        "31% recovery rate - Requires advanced strategy",
        "You're shifting from 'current interest' to 'past conversation'",
        "Only the Nuclear Option breaks through this mental barrier"
      ],
      timelineMatch: ['1-week']
    },
    {
      title: "Week 2+ (168+ Hours): The Resurrection Challenge",
      content: [
        "12% recovery rate - Last resort territory",
        "You're now filed under 'guys from my past'",
        "Success requires perfect timing + dramatic pattern interrupt"
      ],
      timelineMatch: ['2-weeks-plus']
    }
  ];

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Here's What "Active 12 Minutes Ago" Actually Means:
      </h2>

      <div className="space-y-4">
        {phases.map((phase, index) => {
          const isHighlighted = phase.timelineMatch.includes(selectedTimeline);
          const isExpanded = expandedPhase === index;
          
          return (
            <div 
              key={index}
              className={`rounded-lg border-2 transition-all duration-300 ${
                isHighlighted
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-gray-700 bg-gray-900/50 hover:border-gray-600'
              }`}
            >
              <button
                onClick={() => togglePhase(index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <h3 className={`text-lg md:text-xl font-semibold ${
                  isHighlighted ? 'text-orange-400' : 'text-white'
                }`}>
                  {phase.title}
                </h3>
                {isExpanded ? (
                  <ChevronDown className="text-gray-400" size={24} />
                ) : (
                  <ChevronRight className="text-gray-400" size={24} />
                )}
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6">
                  <ul className="space-y-3">
                    {phase.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-300 leading-relaxed">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}