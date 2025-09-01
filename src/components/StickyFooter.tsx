import React from 'react';
import { useStripe } from '../hooks/useStripe';
import { products } from '../stripe-config';
import { Download } from 'lucide-react';

export default function StickyFooter() {
  const { createCheckoutSession, loading } = useStripe();
  const ghostRecoveryGuide = products.find(p => p.name === 'Ghost Recovery Guide');

  const handleMobileCTA = () => {
    if (!ghostRecoveryGuide) return;
    
    createCheckoutSession(ghostRecoveryGuide.priceId, ghostRecoveryGuide.mode)
      .catch(error => {
        console.error('Purchase failed:', error);
      });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50 pb-safe">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl sm:text-2xl font-bold text-green-400">${ghostRecoveryGuide?.price || 14.99}</div>
          <div className="text-xs text-gray-400">Instant Download</div>
        </div>
        
        <button 
          onClick={handleMobileCTA}
          disabled={loading}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 transform active:scale-95 disabled:scale-100"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Get Protocol</span>
              <Download size={16} className="sm:w-5 sm:h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}