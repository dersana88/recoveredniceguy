import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "I went from feeling completely worthless and unlovable to fearless in dating. The protocol didn't just help me recover from that one ghost—it transformed how I approach all my relationships. I haven't been ghosted since.",
      author: "Emily K.",
      context: "complete transformation after being ghosted",
      color: "text-pink-400",
      bgColor: "bg-pink-900/20",
      borderColor: "border-pink-500/30"
    },
    {
      text: "I was checking my phone every 30 seconds, losing sleep, feeling like a complete loser. The protocol gave me back my dignity. I went from desperate and needy to confident and in control. She responded within 6 hours of sending the right message.",
      author: "David M.",
      context: "recovered after 4 days of silence",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30"
    },
    {
      text: "I bought this at 3 AM after another sleepless night wondering what I did wrong. Within 20 minutes of reading, I understood exactly why he went silent and what to do about it. The relief was instant—I finally had a plan instead of just anxiety.",
      author: "Sofia R.",
      context: "purchased during her darkest moment",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30"
    }
  ];

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Real Stories from Real Recoveries
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            className={`${testimonial.bgColor} rounded-xl p-6 md:p-8 border ${testimonial.borderColor} hover:scale-105 transition-all duration-300`}
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-gray-300 leading-relaxed mb-6 italic">
              "{testimonial.text}"
            </blockquote>
            
            <div className="text-center">
              <cite className={`${testimonial.color} font-semibold`}>
                — {testimonial.author}
              </cite>
              <div className="text-gray-400 text-sm mt-1">
                {testimonial.context}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
          These aren't cherry-picked success stories. They represent the <span className="text-green-400 font-semibold">67% recovery rate</span> when 
          the protocol is applied correctly within the optimal time window.
        </p>
      </div>
    </section>
  );
}