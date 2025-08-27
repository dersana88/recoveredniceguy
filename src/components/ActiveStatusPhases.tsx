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
      title: "Hour 0-24: She Hasn't Decided Yet",
      content: [
        "She saw your message. She's thinking about it.",
        "That \"active but not replying\" means she's DECIDING, not ignoring.",
        "What you do next determines everything."
      ],
      timelineMatch: ['less-than-24h']
    },
    {
      title: "Hour 24-72: The Testing Window", 
      content: [
        "She's waiting to see if you'll send the dreaded double text.",
        "One desperate message = confirmed needy in her mind.",
        "The right message here gets 67% response rate."
      ],
      timelineMatch: ['3-days']
    },
    {
      title: "Hour 72-168: You're Being Archived",
      content: [
        "Moving from \"guy I'm talking to\" to \"guy who was texting me\"",
        "Like closing a browser tab she's done with.",
        "Only the Phoenix Protocol works here (31% success)."
      ],
      timelineMatch: ['1-week']
    },
    {
      title: "After Day 7: Digital Death",
      content: [
        "You're now in the same category as her high school ex.",
        "Would take something dramatic to resurrect this.",
        "12% success rate, requires nuclear option."
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