import React from 'react';

interface TestimonialProps {
  text: string;
  author: string;
  location: string;
  type: 'success' | 'closure';
}

interface TestimonialDoubleProps {
  testimonials: [TestimonialProps, TestimonialProps];
}

export default function TestimonialDouble({ testimonials }: TestimonialDoubleProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto my-8 sm:my-12 md:my-16 px-4 fade-in">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index}
          className={`p-4 sm:p-6 md:p-8 rounded-xl border transition-all duration-300 ${
            testimonial.type === 'success'
              ? 'border-green-500 bg-gradient-to-br from-green-500/10 to-green-500/5'
              : 'border-orange-500 bg-gradient-to-br from-orange-500/10 to-orange-500/5'
          }`}
        >
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-4 sm:mb-6 italic">
            "{testimonial.text}"
          </p>
          <div className="flex flex-col gap-1">
            <strong className={`text-sm sm:text-base ${
              testimonial.type === 'success' ? 'text-green-400' : 'text-orange-400'
            }`}>
              - {testimonial.author}, {testimonial.location}
            </strong>
            <span className="text-xs text-gray-500 italic">
              (name changed for privacy)
            </span>
            <span className="text-xs text-gray-500 italic">
            (verified purchase - name changed for privacy)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}