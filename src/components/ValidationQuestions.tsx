import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ValidationQuestions() {
  const questions = [
    {
      q: "Should I assume I've been ghosted?",
      a: "After 72 hours of silence with active social media? Yes."
    },
    {
      q: "Do you think she'll come back?",
      a: "Without the right approach? 12% chance after day 3."
    },
    {
      q: "Was I being too intense with my texting?",
      a: "The real question: Why does silence make you blame yourself?"
    },
    {
      q: "Should I break the no contact rule?",
      a: "Not with another \"hey\" or \"everything okay?\" - those never work."
    }
  ];

  const scrollToSolution = () => {
    document.querySelector('#solution-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        You Keep Asking Yourself:
      </h2>

      <div className="space-y-8 mb-12">
        {questions.map((item, index) => (
          <div key={index} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
            <div className="text-lg md:text-xl font-semibold mb-3 text-gray-200">
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
          onClick={scrollToSolution}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 pulse-slow"
        >
          <span>Show Me What Actually Works</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}