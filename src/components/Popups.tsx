import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trophy, Flame, Check, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Popups: React.FC = () => {
  const {
    showEmailPopup,
    setShowEmailPopup,
    showExitIntentPopup,
    setShowExitIntentPopup,
    emailSubmitted,
    setEmailSubmitted
  } = useShop();

  const [emailText, setEmailText] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailText) return;
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setEmailSubmitted(true);
      localStorage.setItem('dr_bar_subscribed', 'true');
      setShowEmailPopup(false);
      // Automatically show success details or coupon in exit intent instead or inline
    }, 1000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="popup-manager">
      <AnimatePresence>
        {/* 1. Timed Newsletter Capture Entry Popup */}
        {showEmailPopup && !emailSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#000000]"
              onClick={() => setShowEmailPopup(false)}
            />
            
            {/* Main Dialog Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 sm:p-10 w-full max-w-lg relative text-left shadow-2xl overflow-hidden"
              id="newsletter-timed-dialog"
            >
              {/* Abstract decorative graphic */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <button
                onClick={() => setShowEmailPopup(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer"
                aria-label="Dismiss Dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3.5">
                <div className="bg-lime-400 text-black p-1.5 rounded-lg">
                  <Flame className="w-5 h-5 fill-black" />
                </div>
                <span className="font-mono text-xs font-bold uppercase text-lime-400 tracking-wide">FITNESS REWARD ACTIVATED</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none mb-3">
                Want a <span className="text-lime-400">Free Nutrition Guide</span> + 15% Off?
              </h3>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Join our premium health-conscious community today. Get instant access to biochemical research, weekly fitness routines, early flavor drops, and <span className="text-white font-semibold">15% off your first checkout</span> box.
              </p>

              <form onSubmit={handleSubscribe} className="space-y-3.5">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-5 h-5" />
                  <input
                    type="email"
                    required
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Enter athletic email address"
                    className="bg-neutral-900 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-lime-400 hover:bg-lime-300 disabled:opacity-50 text-black font-bold uppercase text-xs tracking-wider py-4 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  {loading ? 'Securing Spot...' : 'Claim 15% Discount Voucher'}
                </button>
              </form>

              <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/5 text-[10px] sm:text-xs text-neutral-500 font-mono">
                <span>⚡ NO SPAM GUARANTEE</span>
                <span>🔥 UNLOAD IN 1-CLICK</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. High-converting Exit Intent Overlay Popup */}
        {showExitIntentPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#000000]"
              onClick={() => setShowExitIntentPopup(false)}
            />
            
            {/* Main Dialog Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#0f0f0f] border border-orange-500/20 rounded-2xl p-6 sm:p-10 w-full max-w-lg relative text-left shadow-2xl overflow-hidden"
              id="exit-intent-dialog"
            >
              {/* Orange aesthetic accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              
              <button
                onClick={() => setShowExitIntentPopup(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-full bg-neutral-900 border border-white/5 cursor-pointer"
                aria-label="Dismiss Dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3.5">
                <div className="bg-orange-500 text-black p-1.5 rounded-lg">
                  <Trophy className="w-5 h-5 fill-black" />
                </div>
                <span className="font-mono text-xs font-bold uppercase text-orange-400 tracking-wide">WAIT! LIMITED REWARD RESERVED</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none mb-3">
                Don't Leave Empty Handed. Take <span className="text-orange-400">25% Off</span> Today!
              </h3>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                We're so confident you'll love Dr Bar, we're giving you a <span className="text-white font-semibold">25% discount voucher</span> to try any of our premium flavor boxes risk-free today. Low stock remaining.
              </p>

              <div className="bg-neutral-900 rounded-xl p-4 border border-white/5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">YOUR SECURE PROMO CODE</span>
                  <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-wide">DRGOLD</span>
                </div>
                <button
                  onClick={() => handleCopyCode('DRGOLD')}
                  className="bg-orange-500 hover:bg-orange-400 text-black font-mono font-bold text-xs uppercase px-4.5 py-3 rounded-lg transition-all w-full sm:w-auto text-center cursor-pointer shadow flex items-center justify-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4.5 h-4.5" /> COPIED!
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4.5 h-4.5" /> COPY VOUCHER
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  setShowExitIntentPopup(false);
                  // navigate to shop to let them buy
                }}
                className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold uppercase text-xs tracking-wider py-3.5 rounded-xl transition-all cursor-pointer text-center"
              >
                Claim Coupon & View Products
              </button>

              <div className="flex justify-center gap-6 mt-6 pt-6 border-t border-white/5 text-[10px] sm:text-xs text-neutral-500 font-mono">
                <span>✨ 100% HAPPINESS GUARANTEE</span>
                <span>⌛ OVER IN 24 HOURS</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
