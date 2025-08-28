import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PickedCounter from './PickedCounter';

export default function MindReadingChecklist() {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const checklistItems = [
    "Checked her Instagram stories to see if she's posting",
    "Reread your last message thinking \"what did I do wrong?\"",
    "Typed \"Hey, everything okay?\" then deleted it",
    "Considered sending a meme to restart the conversation",
    "Googled \"why did she ghost me\" at 2 AM",
    "Checked if she unfollowed you (she didn't, somehow worse)",
    "Lost sleep for the first time over someone"
  ];

  const handleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">
        Here's What You've Done In The Last 48 Hours:
      </h2>

      <div className="space-y-3 sm:space-y-4 mb-8 px-4">
        {checklistItems.map((item, index) => (
          <label key={index} className="flex items-start space-x-4 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only checkbox-custom"
                checked={checkedItems.includes(index)}
                onChange={() => handleCheck(index)}
              />
              <div 
                className={`w-6 h-6 border-2 rounded transition-all duration-300 flex items-center justify-center ${
                  checkedItems.includes(index)
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-500 group-hover:border-gray-400'
                }`}
              >
                {checkedItems.includes(index) && (
                  <Check size={14} className="text-white" />
                )}
              </div>
            </div>
            <span className="text-base sm:text-lg leading-relaxed group-hover:text-gray-300 transition-colors">
              {item}
            </span>
          </label>
        ))}
      </div>

      <PickedCounter />
      
      <div className="text-center">
        {checkedItems.length >= 4 && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 sm:p-6 fade-in mx-4">
            <p className="text-orange-300 text-base sm:text-lg font-medium">
              This isn't coincidence. You found this page because you need it.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}