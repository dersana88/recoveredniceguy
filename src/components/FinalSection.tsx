import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { ArrowRight } from 'lucide-react';

export default function FinalSection() {
  const { createCheckoutSession, loading } = useStripe();
  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const paths = [
    {
      title: "Without Protocol:",
      items: [
        "Keep asking yourself \"what did I do wrong?\"",
        "Stay in the mad phone-checking cycle", 
        "Watch her stories while she ignores you",
        "Eventually send that desperate text",
        "Get blocked or continued silence",
        "Develop ghostaphobia for future dating"
      ],
      negative: true
    },
    {
      title: "With Protocol:",
      items: [
        "Know exactly why this happened",
        "Send the right message at the right time",
        "67% chance she responds (if under 72 hours)",
        "Stop the obsessive phone checking", 
        "Either recover or get closure",
        "Never get ghosted again"
      ],
      negative: false
    }
  ];

  const handleFinalCTA = () => {
    if (!ghostRecoveryGuide) return;
    
    createCheckoutSession(ghostRecoveryGuide.priceId, ghostRecoveryGuide.mode)
      .catch(error => {
        console.error('Purchase failed:', error);
      });
  };

  return (
    <section className="fade-in">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Two Paths From Here:
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {paths.map((path, index) => (
          <div 
            key={index}
            className={`rounded-xl p-6 md:p-8 border-2 ${
              path.negative 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-green-500/30 bg-green-500/5'
            }`}
          >
            <h3 className={`text-xl font-bold mb-6 ${
              path.negative ? 'text-red-400' : 'text-green-400'
            }`}>
              {path.title}
            </h3>
            
            <ul className="space-y-3">
              {path.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-300 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center bg-gray-900/50 rounded-xl p-8 border border-gray-700">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
          You searched 'why did she ghost me' and found this page.<br />
          That's not accident. That's alignment.<br />
          You have <span className="text-orange-400 font-semibold count-up">47</span> hours left in your recovery window.
        </p>

        <button 
          onClick={handleFinalCTA}
          disabled={loading}
          className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 pulse-slow mb-6"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Stop The Mad Phone-Checking Cycle</span>
              <ArrowRight size={24} />
            </>
          )}
        </button>
        
        <div className="text-gray-400">${ghostRecoveryGuide?.price || 99} - Instant Download</div>
      </div>

      <div className="text-center mt-8 p-6 border-t border-gray-700">
        <p className="text-gray-400 italic">
          P.S. - While you're reading this, she's online. She sees your message sitting there. 
          The question is: Will you send another 'hey' or something that actually works?
        </p>
      </div>
    </section>
  );
}