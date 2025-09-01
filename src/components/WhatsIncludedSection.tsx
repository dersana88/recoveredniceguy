import React from 'react';
import { BookOpen, Brain, Shield, Zap, Users, Mail, RefreshCw, Phone, AlertTriangle, Download } from 'lucide-react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';

export default function WhatsIncludedSection() {
  const { createCheckoutSession, loading } = useStripe();

  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const handlePurchase = async () => {
    if (!ghostRecoveryGuide) return;
    
    createCheckoutSession(ghostRecoveryGuide.priceId, ghostRecoveryGuide.mode)
      .catch(error => {
        console.error('Purchase failed:', error);
      });
  };

  const parts = [
    {
      title: "Part 1: DIAGNOSTIC DECODER",
      items: [
        "Ghost Type Identifier Quiz (15 questions)",
        "The 7 Types of Ghosts & Why Each Happens",
        "Her Psychology Timeline Hour-by-Hour",
        "Your Personal Recovery Odds Calculator"
      ]
    },
    {
      title: "Part 2: THE 72-HOUR PROTOCOL",
      items: [
        "Hour 0-24: The Mandatory Silence Period",
        "Hour 24-48: Strategic Positioning Phase",
        "Hour 48-72: The Recovery Window",
        "Emergency Protocols for Each Stage"
      ]
    },
    {
      title: "Part 3: THE MESSAGE VAULT",
      items: [
        "23 Copy-Paste Recovery Templates",
        "The Phoenix Message (67% response rate)",
        "Pattern Interrupt Method Scripts",
        "Voice Note vs Text Decision Tree"
      ]
    },
    {
      title: "Part 4: ADVANCED RECOVERY",
      items: [
        "The Story Bait Method",
        "Social Media Psychology Tactics",
        "The Indirect Recovery Approach",
        "Week+ Ghost Resurrection Protocol"
      ]
    },
    {
      title: "Part 5: POST-RECOVERY GAME",
      items: [
        "Rebuilding Attraction After Ghost",
        "Setting New Boundaries",
        "Maintaining Mystery & Interest",
        "Relationship Reset Protocol"
      ]
    }
  ];

  const bonuses = [
    {
      icon: Brain,
      title: "BONUS #1: PSYCHOLOGY DECODER",
      value: "$47 value",
      items: [
        "Why Women Really Ghost (7 Hidden Reasons)",
        "The Male Behaviors That Trigger It",
        "Mind Games vs Genuine Disinterest",
        "Her Attachment Style Analysis"
      ]
    },
    {
      icon: Shield,
      title: "BONUS #2: NEVER AGAIN PROTOCOL",
      value: "$47 value",
      items: [
        "12 Pre-Ghost Warning Signs",
        "Interest Level Thermometer",
        "Attraction Maintenance System",
        "Creating Unfinished Loops"
      ]
    },
    {
      icon: Zap,
      title: "BONUS #3: MINDSET MASTERY",
      value: "$37 value",
      items: [
        "Break Phone Addiction in 48 Hours",
        "Abundance Reality Check",
        "Outcome Independence Training",
        "Moving On Power Moves"
      ]
    },
    {
      icon: AlertTriangle,
      title: "BONUS #4: EMERGENCY PROTOCOL FOR SERIAL TEXTERS",
      value: "$27 value",
      items: [
        "Damage Control After Multiple Texts",
        "The \"Reset\" Message Template",
        "Recovery from Desperate Messaging",
        "Salvaging Over-Communication Mistakes"
      ]
    }
  ];

  const accessItems = [
    { icon: RefreshCw, text: "Monthly Template Updates" },
  ];
  const valueStack = [
    { item: "Main Guide (127 pages):", value: "$14.99" },
    { item: "Psychology Decoder (31 pages):", value: "$47" },
    { item: "Never Again Protocol (28 pages):", value: "$47" },
    { item: "Mindset Mastery (19 pages):", value: "$37" },
    { item: "Emergency Protocol (12 pages):", value: "$27" },
    { item: "Lifetime Updates & Support:", value: "$67" }
  ];

  return (
    <section className="mb-16 md:mb-24 fade-in whats-included-section">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-8 sm:mb-12 px-4">
        Here's Exactly What You Get:
      </h2>

      {/* Main Guide */}
      <div className="bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-xl p-4 sm:p-6 md:p-8 border border-green-500/30 mb-8 sm:mb-12 mx-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-2xl sm:text-3xl md:text-4xl">📚</span>
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                THE MAIN GUIDE: 5-PART RECOVERY SYSTEM
              </h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {parts.map((part, index) => (
            <div key={index} className="bg-gray-900/50 rounded-lg p-4 sm:p-6 border border-gray-700">
              <h4 className="text-base sm:text-lg font-semibold text-green-400 mb-2">
                {part.title}
              </h4>
              <ul className="space-y-1 sm:space-y-2">
                {part.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300 text-sm leading-relaxed flex items-start">
                    <span className="text-green-400 mr-2 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bonus Guides */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-6 sm:mb-8 text-orange-400 px-4">
          PLUS 4 BONUS GUIDES:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
          {bonuses.map((bonus, index) => (
            <div key={index} className="bg-gradient-to-br from-orange-900/20 to-orange-800/20 rounded-lg p-4 sm:p-6 border border-orange-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <bonus.icon className="text-orange-400 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-orange-400 leading-tight">
                      {bonus.title}
                    </h4>
                    <span className="text-orange-300 text-xs sm:text-sm font-medium">{bonus.value}</span>
                  </div>
                </div>
              </div>
              <ul className="space-y-1 sm:space-y-2">
                {bonus.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start">
                    <span className="text-orange-400 mr-2 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Lifetime Access */}
      <div className="bg-gray-900/50 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-700 mb-8 sm:mb-12 mx-4">
        <h4 className="text-lg sm:text-xl font-semibold text-center mb-4 sm:mb-6 text-blue-400">
          LIFETIME ACCESS INCLUDES:
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {accessItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 text-gray-300 justify-center">
              <item.icon className="text-blue-400 flex-shrink-0" size={18} />
              <span className="text-sm sm:text-base">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Value Stack */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 sm:p-6 md:p-8 border border-gray-600 mx-4">
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {valueStack.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-gray-300 text-sm sm:text-base">
              <span className="pr-2">{item.item}</span>
              <span className="font-semibold flex-shrink-0">{item.value}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-600 pt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-base sm:text-lg font-semibold text-gray-300">Total Value:</span>
            <span className="text-base sm:text-lg font-semibold text-gray-400 line-through">$324</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg sm:text-xl font-bold text-white">Today:</span>
            <span className="text-xl sm:text-2xl font-bold text-green-400">$14.99</span>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 leading-relaxed">
            Right now beeing ghosted is not your fault, but it will be if you don't take action.
          </p>
          
          <button 
            onClick={handlePurchase}
            disabled={loading}
            className="inline-flex items-center space-x-2 sm:space-x-3 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 pulse-slow"
          >
            {loading ? (
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>End The Torture Now</span>
                <Download size={20} className="sm:w-6 sm:h-6" />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}