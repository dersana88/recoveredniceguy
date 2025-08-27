import React from 'react';

export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-4">
        <div className="text-center">
          <div className="text-xl font-bold text-white">
            Ghost Recovery Protocol
          </div>
        </div>
      </div>
    </header>
  );
}