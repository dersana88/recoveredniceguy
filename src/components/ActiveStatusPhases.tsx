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
      title: "She's Online But Ignoring You - Here's Why:",
      content: [
        "She sees your message notification every time she opens her phone",
        "She's not 'too busy' - she replied to 3 other people today",
        "She's in one of 5 psychological states (and each requires a different approach)",
        "The wrong message now = permanent archive status"
      ],
      timelineMatch: ['less-than-24h']
    },
    {
      title: "The 72-Hour Psychology Shift:",
      content: [
        "Hour 0-24: She's deciding if you're worth her energy",
        "Hour 24-48: She's testing your emotional reaction to silence",
        "Hour 48-72: She's moving you from 'current interest' to 'past conversation'",
        "After 72 hours: You need advanced psychology to break through"
      ],
      timelineMatch: ['3-days']
    },
    {
      title: "Why 'Hey, Everything Okay?' Never Works:",
      content: [
        "It signals you don't understand why she went silent",
        "Shows you're emotionally reactive (exactly what she's avoiding)",
        "Puts pressure on her to explain herself",
        "Makes you look like every other guy who got ghosted"
      ],
      timelineMatch: ['1-week']
    },
    {
      title: "What Actually Gets Responses:",
      content: [
        "Messages that show you understand her psychology",
        "Timing that works with her mental state, not against it",
        "Templates that create curiosity instead of pressure",
        "The exact words that 67% of women respond to within 6 hours"
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
      
      <div className="text-center mb-8">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
          She's not ignoring your message because she didn't see it. She's ignoring it because 
          <span className="text-orange-400 font-semibold"> she knows exactly what to expect</span> if she responds.
        </p>
      </div>

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
      
      <div className="text-center mt-12">
        <div className="bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700 max-w-2xl mx-auto">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            The difference between men who get responses and those who stay ghosted? 
            <span className="text-green-400 font-semibold">Understanding her psychology</span> and having the exact templates that work.
          </p>
          
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-300 font-medium">
              Every hour you wait without the right strategy, your chances drop by 3-5%. 
              Stop guessing what to send.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}