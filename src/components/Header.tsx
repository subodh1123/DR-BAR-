import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Menu, X, User, Heart, Leaf, ShieldCheck, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const { navigateTo, activePage, cart, wishlist } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cart total calculations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => {
    const itemPrice = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  // Free shipping threshold
  const freeShippingThreshold = 60;
  const progressToFreeShipping = Math.min((cartSubtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - cartSubtotal, 0);

  const navigationItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'About Us', id: 'about' },
    { label: 'Nutrition', id: 'nutrition' },
    { label: 'Subscriptions', id: 'subscriptions' },
    { label: 'Community', id: 'reviews' },
    { label: 'Recipes & Tips', id: 'blog' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full" id="site-header">
      {/* 1. Global Promo and Free Shipping Progress Micro-Bar */}
      <div className="bg-[#0A0A0A] text-[10px] font-mono font-bold tracking-widest text-[#F5F5F4] border-b border-black/10 py-2.5 px-4" id="shipping-banner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-1 sm:gap-2">
          <div className="flex items-center gap-1.5 uppercase">
            <Flame className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
            <span>CLINICAL RECOVERY FUEL: GET <span className="text-lime-400 font-bold">15% OFF</span> RECURRING SUBSCRIPTIONS</span>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto max-w-sm md:max-w-none">
            {remainingForFreeShipping > 0 ? (
              <div className="flex items-center gap-2 w-full justify-center md:justify-end">
                <span>ADD <span className="text-lime-400 font-bold">${remainingForFreeShipping.toFixed(2)}</span> FOR FREE EXPRESS SHIPPING!</span>
                <div className="w-16 sm:w-24 bg-neutral-800 h-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-lime-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            ) : (
              <span className="text-lime-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> FREE EXPRESS SHIPPING ACTIVATED!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-black/5 py-4.5 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-1 group cursor-pointer text-left focus:outline-none"
            id="brand-logo-btn"
          >
            <span className="flex items-center gap-1 font-display font-black text-2xl tracking-tighter uppercase italic select-none">
              <span className="text-[#0A0A0A] group-hover:text-[#5D4037] transition-colors">DR.</span>
              <span className="relative flex items-center justify-center px-0.5">
                <svg className="w-5.5 h-6 text-amber-500 fill-current shrink-0 scale-110 drop-shadow-[0_1.5px_3px_rgba(217,254,0,0.6)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Caduceus Staff vertical shaft */}
                  <path d="M12 21V4" stroke="#D9FE00" strokeWidth="2.2" strokeLinecap="round"/>
                  <circle cx="12" cy="3.5" r="1.5" fill="#FFA500" stroke="#000" strokeWidth="0.8"/>
                  {/* Wings left */}
                  <path d="M11.5 5.5C10 3 6 4 4 6.5C5.5 8 9.5 8.5 11.5 8" fill="#FFA500" stroke="#000" strokeWidth="0.8" strokeLinejoin="round"/>
                  {/* Wings right */}
                  <path d="M12.5 5.5C14 3 18 4 20 6.5C18.5 8 14.5 8.5 12.5 8" fill="#FFA500" stroke="#000" strokeWidth="0.8" strokeLinejoin="round"/>
                  {/* Coiling Left Snake */}
                  <path d="M12 20C8 17 10 13.5 12 11.5C14 9.5 16 7.5 12 5" stroke="#D9FE00" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  {/* Coiling Right Snake */}
                  <path d="M12 20C16 17 14 13.5 12 11.5C10 9.5 8 7.5 12 5" stroke="#FFA500" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </span>
              <span className="text-[#D32F2F] font-black italic relative" style={{ textShadow: '1.5px 1.5px 0px #FFD700' }}>Bar</span>
            </span>
          </button>

          {/* Large Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" id="desktop-nav">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`font-sans font-bold text-[11px] tracking-widest uppercase transition-colors text-left py-1 cursor-pointer focus:outline-none ${
                  activePage === item.id 
                    ? 'text-[#0A0A0A]' 
                    : 'text-[#0A0A0A]/40 hover:text-[#0A0A0A]'
                }`}
              >
                {item.label}
                {activePage === item.id && (
                  <motion.div 
                    layoutId="activeNavIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0A0A0A]" 
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Quick Commerce Action Controls */}
          <div className="flex items-center gap-4" id="header-commerce-actions">
            
            {/* Wishlist Indicator */}
            <button 
              onClick={() => navigateTo('shop')} 
              className="text-[#0A0A0A]/40 hover:text-[#0A0A0A] cursor-pointer relative p-1.5 transition-colors hidden md:block focus:outline-none"
              title="View Wishlist"
              id="wishlist-btn"
            >
              <Heart className={`w-4.5 h-4.5 ${wishlist.length > 0 ? 'text-red-500 fill-red-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#0a0a0a] text-[#F5F5F4] font-mono text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Profile Dashboard Account */}
            <button 
              onClick={() => navigateTo('account')} 
              className={`cursor-pointer p-1.5 transition-colors rounded focus:outline-none ${
                activePage === 'account' ? 'text-[#0A0A0A] bg-black/5' : 'text-[#0A0A0A]/40 hover:text-[#0A0A0A]'
              }`}
              title="Account Dashboard"
              id="account-dashboard-btn"
            >
              <User className="w-4.5 h-4.5" />
            </button>

            {/* Sticky Shopping Cart Bag and Counter */}
            <button 
              onClick={() => navigateTo('shop')} 
              id="sticky-cart-btn"
              className="px-6 py-2.5 bg-[#0A0A0A] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-black/90 transition-all shadow-md group cursor-pointer flex items-center gap-2.5 rounded-none"
            >
              <ShoppingBag className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              <span>CART ({cartItemCount})</span>
              <span className="hidden sm:inline font-mono font-bold opacity-45 border-l border-white/20 pl-2">
                ${cartSubtotal.toFixed(2)}
              </span>
            </button>

            {/* Mobile Navigation Sandwich Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#0A0A0A]/60 hover:text-[#0A0A0A] p-1.5 cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-burger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawers (Flyout) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-black/5 w-full overflow-hidden"
            id="mobile-navigation-drawer"
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigateTo(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-sans text-xs font-bold tracking-widest uppercase py-3 px-4 transition-all rounded-none ${
                    activePage === item.id 
                      ? 'text-white bg-[#0A0A0A] font-bold' 
                      : 'text-[#0A0A0A]/60 hover:bg-black/5 hover:text-[#0A0A0A]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="border-t border-black/5 pt-4 mt-2 flex items-center justify-between px-4">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Active Profile: Subodh Khadka</span>
                <button 
                  onClick={() => {
                    navigateTo('shop');
                    setMobileMenuOpen(false);
                  }}
                  className="text-[10px] font-bold tracking-widest text-[#0A0A0A] uppercase hover:underline flex items-center gap-1 text-left"
                >
                  Quick Reorder &rarr;
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
