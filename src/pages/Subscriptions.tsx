import React from 'react';
import { useShop } from '../context/ShopContext';
import { Calendar, RefreshCw, Star, ShieldCheck, Heart, Trash, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { productsList } from '../data/products';

export const Subscriptions: React.FC = () => {
  const { navigateTo, addToCart } = useShop();

  const handleQuickSubscribe = (product: any, interval: 'weekly' | 'biweekly' | 'monthly') => {
    addToCart(product, 1, true, interval);
    navigateTo('shop'); // Go to shop to see visual cart success
  };

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="subscription-program-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header summary */}
        <div className="space-y-4" id="sub-header-texts">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">AUTOMATED NUTRITION MANAGEMENT</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            The Auto-Recovery Program
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Never miss fresh recovery fuel because of stock shortage events. Dr Bar's automated restock schedules ensure premium bars bypass warehouse blockages directly to your doorstep.
          </p>
        </div>

        {/* 1. Feature Benefits list */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="subscription-features-list">
          <div className="p-5.5 bg-neutral-900 border border-white/5 rounded-2xl">
            <span className="text-lime-400 font-mono font-bold block mb-2 text-sm uppercase">15% SAVINGS</span>
            <p className="text-neutral-405 text-xs leading-relaxed">Save exact dollars on every box, every cycle. Price is permanently locked against inflation.</p>
          </div>

          <div className="p-5.5 bg-neutral-900 border border-white/5 rounded-2xl">
            <span className="text-lime-400 font-mono font-bold block mb-2 text-sm uppercase">FREE COLD CARGO</span>
            <p className="text-neutral-405 text-xs leading-relaxed">Complimentary priority priority insulated cold shipping ensures bars never melt in warm transits.</p>
          </div>

          <div className="p-5.5 bg-neutral-900 border border-white/5 rounded-2xl">
            <span className="text-lime-400 font-mono font-bold block mb-2 text-sm uppercase">ZERO STRINGS TETHER</span>
            <p className="text-neutral-405 text-xs leading-relaxed">Swap flavors, pause quantities, edit shipping, or cancel plans anytime from your live Account Dashboard.</p>
          </div>

          <div className="p-5.5 bg-neutral-900 border border-white/5 rounded-2xl">
            <span className="text-lime-400 font-mono font-bold block mb-2 text-sm uppercase">STOCKS PRIORITY</span>
            <p className="text-neutral-405 text-xs leading-relaxed">VIP logistics reserve blocks. If warehouse inventories fall beneath 10%, subscribers are loaded first.</p>
          </div>
        </div>

        {/* 2. Three Easy Steps */}
        <div className="space-y-6" id="unloading-rules">
          <h3 className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">HOW TO ENROLL TODAY</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="sub-steps-grid">
            <div className="space-y-2 text-left">
              <span className="bg-neutral-900 border border-white/5 text-lime-400 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs">01</span>
              <h4 className="font-display font-bold text-white text-base">Select Your Formulation</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">Choose from our specialized amino and collagen recovery targets like Peanut Butter Salt, Intense Cocoa, or Wild Berry.</p>
            </div>

            <div className="space-y-2 text-left">
              <span className="bg-neutral-900 border border-white/5 text-lime-400 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs">02</span>
              <h4 className="font-display font-bold text-white text-base">Set Delivery Speeds</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">Configure restock intervals (weekly, bi-weekly, or monthly) matching your training logs and fitness schedules.</p>
            </div>

            <div className="space-y-2 text-left">
              <span className="bg-neutral-900 border border-white/5 text-lime-400 w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs">03</span>
              <h4 className="font-display font-bold text-white text-base">Manage under One Roof</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">Use the client-side Account Dashboard to comfortably pause deliveries when on vacation with a simple 1-click control.</p>
            </div>
          </div>
        </div>

        {/* 3. Catalog Fast Subscription triggers */}
        <div className="space-y-6" id="quick-subscribers-list">
          <h3 className="text-xs font-mono text-neutral-550 font-bold uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-lime-400" /> SELECT DIRECT AUTO-DELIVERY SCHEME
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="direct-sub-grid">
            {productsList.map(p => (
              <div 
                key={p.id}
                className="bg-neutral-900 border border-white/5 p-5 sm:p-6 rounded-2xl flex items-center justify-between gap-4"
              >
                <div className="space-y-2.5">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">{p.flavor.split(',')[0]}</span>
                    <h4 className="font-display font-bold text-white text-sm sm:text-base">{p.name}</h4>
                  </div>

                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="text-lime-400 font-bold text-lg">${p.subscriptionPrice.toFixed(2)}</span>
                    <span className="text-neutral-500 text-[10px] line-through">Reg. ${p.price.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  <button
                    onClick={() => handleQuickSubscribe(p, 'monthly')}
                    className="bg-lime-400 hover:bg-lime-300 text-black text-[9px] font-mono font-bold uppercase px-3.5 py-2.5 rounded-lg transition-all cursor-pointer text-center"
                  >
                    Subscribe Monthly
                  </button>
                  <button
                    onClick={() => navigateTo('product', { productId: p.id })}
                    className="border border-white/10 hover:border-white/20 text-neutral-400 hover:text-white text-[9px] font-mono font-bold uppercase px-3 py-2 rounded-lg transition-all text-center cursor-pointer"
                  >
                    Explore Specs &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy disclaimer */}
        <div className="bg-neutral-950 p-6 rounded-2xl border border-white/5 flex gap-4 items-start" id="subscription-disclaimer-panel">
          <AlertCircle className="w-5 h-5 text-lime-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-white uppercase block">SUB-PROGRAM CLEAR POLICIES</span>
            <p className="text-neutral-550 text-xs leading-relaxed">
              Subscription billing occurs automatically exactly twenty-four hours prior to box logistics dispatch. Pause indicators must be modified prior to the dispatch logging event. No contracts, cancellation fees, or early termination penalties apply in any circumstance. We preserve 100% customer sovereignty.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
