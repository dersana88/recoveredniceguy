import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!sessionId) {
      navigate('/');
      return;
    }

    // Simulate loading order details
    setTimeout(() => {
      setOrderDetails({
        product: 'Ghost Recovery Guide',
        amount: '$99.00',
        sessionId
      });
      setLoading(false);
    }, 1500);
  }, [user, sessionId, navigate]);

  const handleDownload = () => {
    // Implement download logic here
    console.log('Download initiated for session:', sessionId);
  };

  const handleContinue = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Processing your purchase...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f14] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-gray-900/50 rounded-xl p-8 md:p-12 border border-gray-700">
          <div className="text-green-400 mb-6">
            <CheckCircle size={64} className="mx-auto" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Payment Successful!
          </h1>

          <p className="text-xl text-gray-300 mb-8">
            Your Ghost Recovery Protocol is ready for download
          </p>

          {orderDetails && (
            <div className="bg-gray-800/50 rounded-lg p-6 mb-8 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-4">Order Details</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="font-medium">{orderDetails.product}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-medium text-green-400">{orderDetails.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Order ID:</span>
                  <span className="font-mono text-sm">{orderDetails.sessionId.slice(-8)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <button
              onClick={handleDownload}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-3"
            >
              <Download size={24} />
              <span>Download Your Guide Now</span>
            </button>

            <button
              onClick={handleContinue}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
            <h4 className="text-orange-400 font-semibold mb-2">Important:</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              Save this guide to your device immediately. Check your email for the download link and receipt. 
              If you have any issues, contact support with your order ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}