import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight, AlertTriangle } from 'lucide-react';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Verify we have a real session ID
    if (!sessionId || sessionId.startsWith('mock_')) {
      console.error('Invalid session - no payment was processed');
      // Optionally redirect back to home
      // navigate('/');
    }
  }, [sessionId, navigate]);

  // Show warning if no valid session
  if (!sessionId || sessionId.startsWith('mock_')) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-red-900/50 rounded-xl p-6 sm:p-8 md:p-12 border border-red-700">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">
              Payment Not Processed
            </h1>
            <p className="text-gray-300 mb-6">
              No payment was completed. This appears to be a test or development session.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-900/50 rounded-xl p-6 sm:p-8 md:p-12 border border-gray-700">
          <div className="text-green-400 mb-6">
            <CheckCircle size={48} className="sm:w-16 sm:h-16 mx-auto" />
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8">
            Your Ghost Recovery Protocol has been sent to your email
          </p>

          <div className="bg-gray-800/50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-600">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4">Order Details</h3>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-medium">Ghost Recovery Guide</span>
              </div>
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-medium text-green-400">$99.00</span>
              </div>
              <div className="flex justify-between">
                <span>Order ID:</span>
                <span className="font-mono text-sm">{sessionId.slice(-8)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            <div className="bg-green-600/10 border border-green-500/30 rounded-lg p-4 sm:p-6 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-3">
                📧 Check Your Email
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-2">
                Your complete Ghost Recovery Protocol has been sent to your email address, including:
              </p>
              <ul className="text-left text-gray-300 text-sm space-y-1 max-w-md mx-auto">
                <li>• 127-Page Main Guide (PDF)</li>
                <li>• 4 Bonus Guides Worth $158</li>
                <li>• Quick Start Instructions</li>
                <li>• Message Templates Cheat Sheet</li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-4 sm:px-6 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Back to Homepage</span>
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 sm:p-6">
            <h4 className="text-sm sm:text-base text-orange-400 font-semibold mb-2">Important:</h4>
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              If you don't see the email within 5 minutes, check your spam folder. The email contains all your guides and comes from our secure delivery system. Save the files to your device for offline access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}