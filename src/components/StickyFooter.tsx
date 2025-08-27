import React from 'react';
import { Download } from 'lucide-react';

export default function StickyFooter() {
  const handleMobileCTA = () => {
    console.log('Mobile CTA clicked');
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 p-4 z-50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-green-400">$99</div>
          <div className="text-xs text-gray-400">Instant Download</div>
        </div>
        
        <button 
          onClick={handleMobileCTA}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform active:scale-95"
        >
          <span>Get Protocol</span>
          <Download size={18} />
        </button>
      </div>
    </div>
  );
}