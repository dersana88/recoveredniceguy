import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { BookOpen, Clock, Users, Calculator, AlertTriangle, Gift, Download, Shield } from 'lucide-react';

export default function ProductContentsSection() {
  const { createCheckoutSession, loading } = useStripe();
  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const handlePurchase = () => {
    if (!ghostRecoveryGuide) return;
    
    createCheckoutSession(ghostRecoveryGuide.priceId, ghostRecoveryGuide.mode)
      .catch(error => {
        console.error('Purchase failed:', error);
      });
  };

  const features = [
    {
      icon: Clock,
      title: "The 72-Hour Recovery Window",
      description: "Why hour 47 is optimal for contact, hour 72 is your critical threshold, and day 7 becomes nearly impossible to recover from"
    },
    {
      icon: Users,
      title: "The 5 Ghost Types",
      description: "Learn to identify Testing Ghost, Overwhelmed Ghost, Option Ghost, Scared Ghost, and Done Ghost—plus the specific approach for each type"
    },
    {
      icon: BookOpen,
      title: "The 3-Message Recovery Sequence",
      description: "Pattern Interrupt (Hour 48), Story Bait (Hour 72), Phoenix Reset (final attempt)—with exact scripts and timing"
    },
    {
      icon: Calculator,
      title: "The \"Active But Not Replying\" Decoder",
      description: "What her online activity patterns actually reveal about her mental state"
    },
    {
      icon: AlertTriangle,
      title: "Double-Text Recovery Protocol",
      description: "How to salvage the situation if you've already sent desperate follow-ups"
    }
  ];

  const includes = [
    "147-page comprehensive guide (2-hour focused read)",
    "17 field-tested message templates with precise timing charts",
    "Ghost Type Diagnostic Quiz (identify her type in 60 seconds)",
    "Recovery Probability Calculator based on real data",
    "\"Never Say This\" quick reference sheet",
    "BONUS: Dating App Ghost Prevention Guide",
    "BONUS: The Nuclear Option (71% response rate, use only once)"
  ];

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <div className="text-center mb-12">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-4 px-4">
          The Ghost Recovery Protocol
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
          Turn "Active 12 Minutes Ago" Into An Actual Response
        </p>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 mb-8 sm:mb-12 mx-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Understanding Why She Went Silent
        </h3>
        
        <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <p>
            After analyzing <span className="text-green-400 font-semibold">1,847 documented ghost scenarios</span> between 2017-2023, 
            I discovered that ghosting isn't random—it follows predictable psychological patterns. She's not arbitrarily ignoring you. 
            She's in one of five specific mental states, each requiring a different recovery approach.
          </p>
          
          <p>
            The difference between men who get responses and those who stay ghosted? Understanding which psychological state 
            she's in and the precise timing of your outreach.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-6 sm:mb-8 text-center px-4">
          What You'll Master:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="text-green-400 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="sm:w-7 sm:h-7 flex-shrink-0" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-semibold mb-2 text-green-400">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-4 sm:p-6 md:p-8 border border-green-500/30 mb-8 sm:mb-12 mx-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-center text-green-400">
          Complete System Includes:
        </h3>
        
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {includes.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-green-400 mt-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className="sm:w-4 sm:h-4 flex-shrink-0">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {item.includes('BONUS') ? (
                  <>
                    <span className="text-orange-400 font-semibold">BONUS:</span>
                    {item.replace('BONUS:', '')}
                  </>
                ) : (
                  item
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 mb-8 sm:mb-12 mx-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 sm:mb-6 text-center">
          Proven Results from Real Data:
        </h3>
        
        <div className="text-sm sm:text-base text-gray-300 leading-relaxed space-y-3 sm:space-y-4 text-center">
          <p>
            This system documents patterns from <span className="text-green-400 font-semibold">1,847 actual ghost recoveries</span>—not 
            theoretical advice from dating coaches or "alpha male" posturing. These templates represent 
            <span className="text-orange-400 font-semibold"> $15,000 worth</span> of professional coaching, therapy sessions, 
            and documented trial-and-error, distilled into what actually generates responses.
          </p>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 sm:p-6 mt-4 sm:mt-6">
            <p className="text-sm sm:text-base text-green-300 font-medium">
              <span className="text-green-400 font-bold">67% receive responses</span> when still within the recovery window. 
              Most men send their first strategic recovery message within one hour of reading.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 mx-4">
        <div className="mb-6">
          <div className="text-base sm:text-lg text-gray-400 mb-2">Investment:</div>
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 mb-2">
            ${ghostRecoveryGuide?.price || 99}
          </div>
          <div className="text-sm sm:text-base text-gray-400 italic">
            (Less than two therapy sessions wondering why she's not responding)
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 text-gray-300">
          <p>
            <span className="font-semibold text-green-400">Immediate Access:</span> Download instantly. 
            Complete the diagnostic quiz on page 7 in 5 minutes.
          </p>
          
          <p>
            <span className="font-semibold text-orange-400">Risk-Free Guarantee:</span> 30-day full refund 
            if she doesn't respond using these proven methods.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 border border-gray-600 mb-6 sm:mb-8">
          <h4 className="text-base sm:text-lg font-semibold mb-3 text-gray-200">Personal Note:</h4>
          <p className="text-sm sm:text-base text-gray-400 italic leading-relaxed">
            "I spent 5 years trapped in the obsessive phone-checking cycle, losing sleep over women who were 
            'active 2 minutes ago' but never replied. This guide exists because 'Hey, everything okay?' never works—but this system does."
          </p>
        </div>

        <div className="text-center">
          <button 
            onClick={handlePurchase}
            disabled={loading}
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 pulse-slow mb-4 sm:mb-6"
          >
            {loading ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Get The Ghost Recovery Protocol</span>
                <Download size={20} className="sm:w-6 sm:h-6" />
              </>
            )}
          </button>
          
          <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">
            Download immediately. Send first message within hour.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm sm:text-base">
            <Shield size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
            <span>30-day guarantee: If she doesn't respond, full refund.</span>
          </div>
        </div>
      </div>
    </section>
  );
}