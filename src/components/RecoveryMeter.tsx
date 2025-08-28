import React, { useEffect, useState } from 'react';
import { TimelineOption, timelineOptions } from '../types/timeline';

interface RecoveryMeterProps {
  selectedTimeline: TimelineOption;
  currentHour: number;
}

export default function RecoveryMeter({ selectedTimeline, currentHour }: RecoveryMeterProps) {
  const [displayHour, setDisplayHour] = useState(currentHour);
  const timeline = timelineOptions[selectedTimeline];

  useEffect(() => {
    setDisplayHour(currentHour);
  }, [currentHour]);

  const getProgressColor = (chance: number) => {
    if (chance >= 60) return 'bg-green-500';
    if (chance >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          You're at Hour <span className="count-up text-orange-400">{displayHour}</span>
        </div>
        
        <div className="mb-4">
          <div className="text-base sm:text-lg mb-2">Recovery Chance:</div>
          <div className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className={`${timeline.recoveryChance >= 60 ? 'text-green-400' : timeline.recoveryChance >= 30 ? 'text-orange-400' : 'text-red-400'}`}>
              {timeline.recoveryChance}%
            </span>
          </div>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2 sm:h-3">
          <div 
            className={`h-2 sm:h-3 rounded-full progress-bar-animation ${getProgressColor(timeline.recoveryChance)}`}
            style={{ width: `${timeline.recoveryChance}%` }}
          />
        </div>
      </div>
    </div>
  );
}