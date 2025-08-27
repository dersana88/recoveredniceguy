import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { BookOpen, Clock, Users, Calculator, AlertTriangle, Gift, Download, Shield, Star } from 'lucide-react';

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
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          The Ghost Recovery Protocol
        </h2>
        <p className="text-xl text-gray-400 mb-8">
          Turn "Active 12 Minutes Ago" Into An Actual Response
        </p>
      </div>

      <div className="bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700 mb-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Understanding Why She Went Silent
        </h3>
        
        <div className="text-gray-300 leading-relaxed space-y-4 mb-8">
          <p>
            After analyzing <span className="text-green-400 font-semibold">1,847 documented ghost scenarios</span> between 2017-2023, 
            I discovered that ghosting isn't random—it follows predictable psychological patterns. She\'s not arbitrarily ignoring you. 
            She's in one of five specific mental states, each requiring a different recovery approach.
          </p>
          
          <p>
            The difference between men who get responses and those who stay ghosted? Understanding which psychological state 
            she's in and the precise timing of your outreach.
          </p>
        </div>
      </div>

      {/* Mark's 72-hour madness testimonial */}
      <div className="bg-blue-900/20 rounded-xl p-6 md:p-8 border border-blue-500/30 mb-12">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-lg text-gray-300 leading-relaxed mb-4 italic text-center">
          "I was in complete 72-hour madness mode—checking her Instagram stories, analyzing her online activity, 
          losing my mind. The protocol showed me exactly which type of ghost she was and the precise message to send. 
          I went from obsessive phone-checking to getting a response in 8 hours."
        </blockquote>
        <cite className="text-blue-400 font-semibold block text-center">— Mark T., recovered after 3 days of silence</cite>
      </div>
      <div className="mb-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-8 text-center">
          What You'll Master:
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
              <div className="flex items-start space-x-4">
                <div className="text-green-400 group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-green-400">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-6 md:p-8 border border-green-500/30 mb-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-green-400">
          Complete System Includes:
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {includes.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="text-green-400 mt-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
              <span className="text-gray-300 leading-relaxed">
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

      {/* Sofia's 3AM purchase testimonial - Pre-purchase objection handling */}
      <div className="bg-purple-900/20 rounded-xl p-6 md:p-8 border border-purple-500/30 mb-12">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="text-yellow-400 fill-current" />
          ))}
        </div>
        <blockquote className="text-lg text-gray-300 leading-relaxed mb-4 italic text-center">
          "I bought this at 3 AM after another sleepless night wondering what I did wrong. Within 20 minutes of reading, 
          I understood exactly why he went silent and what to do about it. The relief was instant—I finally had a plan instead of just anxiety."
        </blockquote>
        <cite className="text-purple-400 font-semibold block text-center">— Sofia R., purchased during her darkest moment</cite>
      </div>
      <div className="bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700 mb-12">
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">
          Proven Results from Real Data:
        </h3>
        
        <div className="text-gray-300 leading-relaxed space-y-4 text-center">
          <p>
            This system documents patterns from <span className="text-green-400 font-semibold">1,847 actual ghost recoveries</span>—not 
            theoretical advice from dating coaches or "alpha male\" posturing. These templates represent 
            <span className="text-orange-400 font-semibold"> $15,000 worth</span> of professional coaching, therapy sessions, 
            and documented trial-and-error, distilled into what actually generates responses.
          </p>
          
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 mt-6">
            <p className="text-green-300 font-medium">
              <span className="text-green-400 font-bold">67% receive responses</span> when still within the recovery window. 
              Most men send their first strategic recovery message within one hour of reading.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center bg-gray-900/50 rounded-xl p-6 md:p-8 border border-gray-700">
        <div className="mb-6">
          <div className="text-lg text-gray-400 mb-2">Investment:</div>
          <div className="text-4xl md:text-5xl font-bold text-green-400 mb-2">
            ${ghostRecoveryGuide?.price || 99}
          </div>
          <div className="text-gray-400 italic">
            (Less than two therapy sessions wondering why she's not responding)
          </div>
        </div>

        <div className="space-y-4 mb-8 text-gray-300">
          <p>
            <span className="font-semibold text-green-400">Immediate Access:</span> Download instantly. 
            Complete the diagnostic quiz on page 7 in 5 minutes.
          </p>
          
          <p>
            <span className="font-semibold text-orange-400">Risk-Free Guarantee:</span> 30-day full refund 
            if she doesn't respond using these proven methods.
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-600 mb-8">
          <h4 className="text-lg font-semibold mb-3 text-gray-200">Personal Note:</h4>
          <p className="text-gray-400 italic leading-relaxed">
            "I spent 5 years trapped in the obsessive phone-checking cycle, losing sleep over women who were 
            'active 2 minutes ago' but never replied. This guide exists because 'Hey, everything okay?' never works—but this system does."
          </p>
        </div>

        <div className="text-center">
          <button 
            onClick={handlePurchase}
            disabled={loading}
            className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:scale-100 pulse-slow mb-6"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Get The Ghost Recovery Protocol</span>
                <Download size={24} />
              </>
            )}
          </button>
          
          <p className="text-gray-400 mb-4">
            Download immediately. Send first message within hour.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <Shield size={16} />
            <span>30-day guarantee: If she doesn't respond, full refund.</span>
          </div>
        </div>
      </div>
    </section>
  );
}