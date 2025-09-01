import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { ArrowRight } from 'lucide-react';

export default function FinalSection() {
  const { createCheckoutSession, loading } = useStripe();
  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const handlePurchase = () => {
    if (!ghostRecoveryGuide) return;
    
    createCheckoutSession(ghostRecoveryGuide.priceId, ghostRecoveryGuide.mode)
      .catch(error => {
        console.error('Purchase failed:', error);
      });
  };

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

  return (
    <section className="fade-in">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">
        Two Paths From Here:
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12 px-4">
        {paths.map((path, index) => (
          <div 
            key={index}
            className={`rounded-xl p-4 sm:p-6 md:p-8 border-2 ${
              path.negative 
                ? 'border-red-500/30 bg-red-500/5' 
                : 'border-green-500/30 bg-green-500/5'
            }`}
          >
            <h3 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${
              path.negative ? 'text-red-400' : 'text-green-400'
            }`}>
              {path.title}
            </h3>
            
            <ul className="space-y-2 sm:space-y-3">
              {path.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 mx-4">
        <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed mb-4 sm:mb-6">
          You found this page because you need it.<br />
          For the price of lunch, you can end the torture.<br />
          You have <span className="text-orange-400 font-semibold count-up">47</span> hours left in your recovery window.
        </p>

        <button 
          onClick={handlePurchase}
          disabled={loading}
          className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 rounded-lg font-semibold text-lg sm:text-xl md:text-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 pulse-slow mb-6 sm:mb-8"
        >
          {loading ? (
            <div className="w-6 h-6 sm:w-7 sm:h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Stop The Mad Phone-Checking Cycle</span>
              <ArrowRight size={24} className="sm:w-7 sm:h-7" />
            </>
          )}
        </button>
        
        <div className="text-sm sm:text-base text-gray-400">${ghostRecoveryGuide?.price || 14.99} - Less than lunch - Instant Download</div>
      </div>

      <div className="text-center mt-6 sm:mt-8 p-4 sm:p-6 border-t border-gray-700 mx-4">
        <p className="text-sm sm:text-base text-gray-400 italic">
          P.S. - While you're reading this, she's online. She sees your message sitting there.<br />
          For $14.99, you can send something that actually works instead of another "hey."
        </p>
      </div>
    </section>
  );
}