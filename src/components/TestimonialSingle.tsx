import React from 'react';

interface TestimonialSingleProps {
  text: string;
  author: string;
  location: string;
  darkBg?: boolean;
}

export default function TestimonialSingle({ text, author, location, darkBg = false }: TestimonialSingleProps) {
  return (
    <div className={`max-w-4xl mx-auto my-8 sm:my-12 md:my-16 p-4 sm:p-6 md:p-8 rounded-lg border-l-4 fade-in mx-4 ${
      darkBg 
        ? 'bg-black/40 border-l-orange-500' 
        : 'bg-gradient-to-r from-green-500/5 to-transparent border-l-green-500'
    }`}>
      <div className="testimonial-content">
        <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed mb-4 sm:mb-6 italic">
          "{text}"
        </p>
        <div className="flex flex-col gap-1">
          <strong className="text-green-400 text-sm sm:text-base">
            - {author}, {location}
          </strong>
          <span className="text-xs text-gray-500 italic">
            (verified purchase - name changed for privacy)
          </span>
        </div>
      </div>
    </div>
  );
}