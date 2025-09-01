import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { ArrowRight } from 'lucide-react';

export default function ValidationQuestions() {
  const { createCheckoutSession, loading } = useStripe();
  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const questions = [
    {
      q: "Should I assume I've been ghosted?",
      a: "After 72 hours of silence with active social media? Yes. But it's fixable."
    },
    {
      q: "Do you think she'll come back?",
      a: "Without the right approach? 12% chance. With it? 67%."
    },
    {
      q: "Was I being too intense with my texting?",
      a: "If you're asking this question, probably yes. But there's a fix."
    },
    {
      q: "Should I break the no contact rule?",
      a: "Not with \"hey\" or \"everything okay?\" Use the templates that actually work."
    }
  ];

  const scrollToWhatsIncluded = () => {
    const whatsIncludedSection = document.querySelector('.whats-included-section');
    if (whatsIncludedSection) {
      whatsIncludedSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">
        You Keep Asking Yourself:
      </h2>

      <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12 px-4">
        {questions.map((item, index) => (
          <div key={index} className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-700">
            <div className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-gray-200">
              "{item.q}"
            </div>
            <div className="text-base md:text-lg text-gray-400 leading-relaxed">
              → {item.a}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button 
          onClick={scrollToWhatsIncluded}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 pulse-slow mx-4"
        >
          <span>Show Me What Actually Works</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}