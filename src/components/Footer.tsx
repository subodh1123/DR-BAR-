import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Check, Leaf, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, emailSubmitted, setEmailSubmitted } = useShop();
  const [emailText, setEmailText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailText) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setEmailSubmitted(true);
      localStorage.setItem('dr_bar_subscribed', 'true');
      setEmailText('');
    }, 1200);
  };

  return (
    <footer className="bg-white border-t border-black/5 text-neutral-600 font-sans" id="site-footer">
      
      {/* 1. Newsletter Email Bar */}
      <div className="border-b border-black/5 py-16 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#0A0A0A]/5 text-[#0A0A0A] px-3.5 py-1.5 rounded-none text-[10px] font-mono font-bold tracking-widest mb-3 uppercase">
              <Leaf className="w-3.5 h-3.5" /> MEMBERSHIP EARLY ACCESS
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#0A0A0A] tracking-tight leading-none mb-3">
              Smart Fuel. No Glycemic Crashes.
            </h3>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Subscribe to unlock 15% off your first purchase, free nutrition blueprints, recipe upgrades, and early access to clinical flavor releases.
            </p>
          </div>

          <div className="w-full lg:w-auto max-w-md">
            {success || emailSubmitted ? (
              <div className="bg-[#D9FE00]/30 border border-black/10 text-neutral-900 p-4 rounded-none flex items-center gap-3">
                <Check className="w-5 h-5 text-neutral-900 shrink-0" />
                <div className="text-left text-xs sm:text-sm">
                  <p className="font-bold">Welcome to the Dr Bar Movement!</p>
                  <p className="opacity-90">Enjoy 15% off using code <span className="font-mono bg-[#0A0A0A] text-white px-2 py-0.5 rounded-none font-bold text-[10px]">SMARTFIT</span> at checkout.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4.5 h-4.5" />
                  <input
                    type="email"
                    required
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Enter your athletic email..."
                    className="bg-white border border-black/10 rounded-none py-3.5 pl-11 pr-4 text-[#0A0A0A] text-sm placeholder-neutral-400 focus:outline-none focus:border-black w-full font-mono"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#0A0A0A] hover:bg-black/90 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-none transition-all cursor-pointer shadow-md shrink-0 focus:outline-none"
                >
                  {loading ? 'Securing...' : 'Claim 15% Off'}
                </button>
              </form>
            )}
            <p className="text-left text-[10px] font-mono text-neutral-400 mt-2.5 uppercase tracking-wide">
              Secure biological compliance guaranteed. We never spam. Unsubscribe anytime in 1-click.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Core Navigation Directory */}
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-10 grid grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Overview & Physical Seals */}
        <div className="col-span-2 text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center gap-1 font-display font-black text-xl tracking-tighter uppercase italic select-none">
              <span className="text-[#0A0A0A]">DR.</span>
              <span className="relative flex items-center justify-center px-0.5 scale-90">
                <svg className="w-5.5 h-6 text-amber-500 fill-current shrink-0 scale-110 drop-shadow-[0_1px_2px_rgba(122,162,0,0.4)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21V4" stroke="#7AA200" strokeWidth="2.2" strokeLinecap="round"/>
                  <circle cx="12" cy="3.5" r="1.5" fill="#FFA500" stroke="#000" strokeWidth="0.8"/>
                  <path d="M11.5 5.5C10 3 6 4 4 6.5C5.5 8 9.5 8.5 11.5 8" fill="#FFA500" stroke="#000" strokeWidth="0.8" strokeLinejoin="round"/>
                  <path d="M12.5 5.5C14 3 18 4 20 6.5C18.5 8 14.5 8.5 12.5 8" fill="#FFA500" stroke="#000" strokeWidth="0.8" strokeLinejoin="round"/>
                  <path d="M12 20C8 17 10 13.5 12 11.5C14 9.5 16 7.5 12 5" stroke="#7AA200" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <path d="M12 20C16 17 14 13.5 12 11.5C10 9.5 8 7.5 12 5" stroke="#FFA500" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
              <span className="text-[#D32F2F]" style={{ textShadow: '1px 1px 0px #FFD700' }}>Bar</span>
            </span>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed mb-6 max-w-sm">
            Dr Bar is a science-first wellness brand replacing outdated junk snacks with premium, protein isolate-driven nutrition profiles. Built with zero artificial chemistry, low glycemic triggers, and optimal high bio-value protein counts.
          </p>
          
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-mono tracking-widest font-bold text-neutral-400 uppercase">Certified Compliance Seals</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="border border-black/5 bg-[#F5F5F4] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 text-neutral-750 rounded-none flex items-center gap-1">
                <Check className="w-3 h-3 text-neutral-800" /> Non-GMO
              </span>
              <span className="border border-black/5 bg-[#F5F5F4] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 text-neutral-750 rounded-none flex items-center gap-1">
                <Check className="w-3 h-3 text-neutral-800" /> Gluten-Free
              </span>
              <span className="border border-black/5 bg-[#F5F5F4] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 text-neutral-750 rounded-none flex items-center gap-1">
                <Check className="w-3 h-3 text-neutral-800" /> Soy-Free
              </span>
              <span className="border border-black/5 bg-[#F5F5F4] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 text-neutral-750 rounded-none flex items-center gap-1">
                <Check className="w-3 h-3 text-neutral-800" /> Grass-Fed
              </span>
            </div>
          </div>
        </div>

        {/* Column 1 — Products */}
        <div className="text-left">
          <h4 className="text-[11px] font-mono text-[#0A0A0A] tracking-widest uppercase font-bold mb-4">FUEL SHOP</h4>
          <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
            <li>
              <button onClick={() => navigateTo('shop')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                All Flavor Bundles
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('shop', { productId: 'peanut-butter-caramel-salt' })} 
                className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left"
              >
                Peanut Butter Crunch
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('shop', { productId: 'dense-dark-fudge-cocoa' })} 
                className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left"
              >
                Intense Dark Cocoa
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigateTo('shop', { productId: 'lime-matcha-active-renew' })} 
                className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left"
              >
                Lime Matcha Renew
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('subscriptions')} className="text-black font-bold uppercase tracking-wider cursor-pointer hover:underline text-left text-[10px]">
                Subscribe & Save (15%)
              </button>
            </li>
          </ul>
        </div>

        {/* Column 2 — Brand Science */}
        <div className="text-left">
          <h4 className="text-[11px] font-mono text-[#0A0A0A] tracking-widest uppercase font-bold mb-4">SCIENCE</h4>
          <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
            <li>
              <button onClick={() => navigateTo('nutrition')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Ingredients & Nutrition
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('about')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                The Dr Bar History
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('blog')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Research Blog
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('reviews')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Community Stories
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Chemical Disclosures
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 — Support & Security */}
        <div className="text-left py-2 sm:py-0">
          <h4 className="text-[11px] font-mono text-[#0A0A0A] tracking-widest uppercase font-bold mb-4">SECURE TRANSIT</h4>
          <ul className="space-y-2.5 text-xs text-neutral-500 font-medium">
            <li>
              <button onClick={() => navigateTo('faq')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Cold-Pack Shipping
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('contact')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Support Service Lines
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('account')} className="hover:text-[#0A0A0A] cursor-pointer hover:underline text-left">
                Manage Subscriptions
              </button>
            </li>
            <li>
              <span className="text-neutral-400 font-mono flex items-center gap-1.5 pt-1 text-left text-[10px] tracking-wider uppercase font-bold">
                <Lock className="w-3.5 h-3.5 text-neutral-600" /> SSL SECURE CHECKOUT
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. SEO Explanatory Content block (Rich Keyword Density for search indexes!) */}
      <div className="border-t border-black/5 bg-[#F5F5F4] py-10 px-6 sm:px-10 text-left">
        <div className="max-w-7xl mx-auto">
          <h5 className="text-[10px] font-mono tracking-widest text-[#0A0A0A]/40 uppercase font-bold mb-3">
            SEARCH INDEX PREVIEWS (SEO SCHEMA MARKS)
          </h5>
          <p className="text-[11px] leading-relaxed text-neutral-400 max-w-6xl">
            Searching for premium organic <strong className="text-neutral-550">protein bars</strong>? Dr Bar provides high-performance, biological <strong className="text-neutral-550">gym snacks</strong> engineered with pristine macros of exactly 21g protein and sub-1g sugar targets. If your athletic life requires wholesome, scientifically clean <strong className="text-neutral-550">high protein food</strong>, our custom formulations serve as your muscular recovery shield. Unlike traditional fitness brand foods that are contaminated with chalky starches, heavy binders, artificial glycemic catalysts, and chemical sugar alcohols, Dr Bar represents the elite paradigm of <strong className="text-neutral-550">low sugar protein bars</strong> and <strong className="text-neutral-550">healthy energy bars</strong>. Maintain consistent positive amino-nitrogen levels, amplify metabolic velocities, and secure high-energy focus-modes with certified non-GMO, gluten-free <strong className="text-neutral-550">fitness nutrition</strong>. Smart snacks built with clinical precision—nothing less than pure recovery.
          </p>
        </div>
      </div>

      {/* 4. Bottom Copy rights and verification badges */}
      <div className="bg-[#FAF9F6] border-t border-black/5 py-6 px-6 sm:px-10 text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-left">
            <span>&copy; {new Date().getFullYear()} Dr Bar Wellness, Inc. All rights registered.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hover:text-black transition-colors cursor-pointer">Privacy & Biosafety</span>
            <span>&bull;</span>
            <span className="hover:text-black transition-colors cursor-pointer">Terms of Formulation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
