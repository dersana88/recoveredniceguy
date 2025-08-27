import React from 'react';
import { TimelineOption, timelineOptions } from '../types/timeline';

interface TimelineSelectorProps {
  selectedTimeline: TimelineOption;
  setSelectedTimeline: (timeline: TimelineOption) => void;
}

export default function TimelineSelector({ selectedTimeline, setSelectedTimeline }: TimelineSelectorProps) {
  const options = Object.entries(timelineOptions) as [TimelineOption, typeof timelineOptions[TimelineOption]][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
      {options.map(([key, option]) => (
        <button
          key={key}
          onClick={() => setSelectedTimeline(key)}
          className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 active:scale-98 ${
            selectedTimeline === key
              ? 'border-green-500 bg-green-500/10 text-green-400'
              : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
          }`}
        >
          <div className="font-medium">{option.label}</div>
        </button>
      ))}
    </div>
  );
}