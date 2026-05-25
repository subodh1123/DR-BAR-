import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList } from '../data/products';
import { Sparkles, Check, ChevronRight, ThumbsUp, ShoppingCart, UserCheck } from 'lucide-react';

export const FlavorRecommender: React.FC<{ variant?: 'prominent' | 'compact' }> = ({ variant = 'prominent' }) => {
  const { userProfile, navigateTo, addToCart } = useShop();

  // Quiz states
  const [tastePref, setTastePref] = useState<'chocolate' | 'nutty' | 'matcha' | 'all'>('all');
  const [dietary, setDietary] = useState<'dairy-free' | 'no-peanuts' | 'whey' | 'any'>('any');
  const [athleticGoal, setAthleticGoal] = useState<'endurance' | 'strength' | 'renew'>('strength');
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Check purchase history for past tastes
  const purchaseHistoryFlavors = useMemo(() => {
    const historyItems = userProfile.orderHistory.flatMap(o => o.items);
    const flavorsBought = new Set<string>();
    historyItems.forEach(item => {
      if (item.productName.toLowerCase().includes('peanut')) {
        flavorsBought.add('peanut-butter-caramel-salt');
      }
      if (item.productName.toLowerCase().includes('cocoa') || item.productName.toLowerCase().includes('dark') || item.productName.toLowerCase().includes('fudge')) {
        flavorsBought.add('dense-dark-fudge-cocoa');
      }
      if (item.productName.toLowerCase().includes('matcha') || item.productName.toLowerCase().includes('lime')) {
        flavorsBought.add('lime-matcha-active-renew');
      }
      if (item.productName.toLowerCase().includes('toffee')) {
        flavorsBought.add('salted-toffee-almond-bold');
      }
    });
    return Array.from(flavorsBought);
  }, [userProfile.orderHistory]);

  // Scoring function based on order history and quiz choices
  const scoredProducts = useMemo(() => {
    return productsList.map(product => {
      let score = 75; // Baseline compatibility percentage

      // Apply modifiers from Purchase History
      if (purchaseHistoryFlavors.includes(product.id)) {
        score += 15; // Re-order recommendation weight
      } else if (purchaseHistoryFlavors.length > 0) {
        // Offer variety for regular buyers
        score += 5;
      }

      // Apply modifiers from Taste Preferences
      if (tastePref === 'chocolate' && product.id === 'dense-dark-fudge-cocoa') score += 20;
      if (tastePref === 'nutty' && (product.id === 'peanut-butter-caramel-salt' || product.id === 'salted-toffee-almond-bold')) score += 20;
      if (tastePref === 'matcha' && product.id === 'lime-matcha-active-renew') score += 25;

      // Apply modifiers from Dietary choices
      if (dietary === 'dairy-free') {
        if (product.id === 'lime-matcha-active-renew') {
          score += 25; // Vegan/cashew pea protein
        } else {
          score -= 40; // Contains whey
        }
      }
      if (dietary === 'no-peanuts') {
        if (product.id === 'peanut-butter-caramel-salt') {
          score -= 60; // Has intense peanuts
        } else {
          score += 10;
        }
      }

      // Apply athletic outcome maps
      if (athleticGoal === 'endurance' && product.id === 'salted-toffee-almond-bold') score += 15;
      if (athleticGoal === 'strength' && (product.id === 'peanut-butter-caramel-salt' || product.id === 'dense-dark-fudge-cocoa')) score += 15;
      if (athleticGoal === 'renew' && product.id === 'lime-matcha-active-renew') score += 20;

      // Bound between 10% and 99% for professional presentation
      const finalScore = Math.min(Math.max(score, 10), 99);

      // Core matching drivers descriptions
      let drivers = ["Grass-Fed Whey", "MCT Ketones"];
      if (product.id === 'dense-dark-fudge-cocoa') drivers = ["Cocoa Polyphenols", "Antioxidants", "Peptide Acids"];
      if (product.id === 'lime-matcha-active-renew') drivers = ["Uji Matcha", "L-Theanine", "Vegan Plant Amino"];
      if (product.id === 'salted-toffee-almond-bold') drivers = ["Almond Magnesium", "Low Glycemic", "Endurance Fuel"];

      return {
        ...product,
        compatibilityScore: finalScore,
        drivers
      };
    }).sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  }, [purchaseHistoryFlavors, tastePref, dietary, athleticGoal]);

  const handleAddToCart = (productId: string) => {
    const prod = productsList.find(p => p.id === productId);
    if (prod) {
      addToCart(prod, 1, false);
      setAddedProductId(productId);
      setTimeout(() => setAddedProductId(null), 2500);
    }
  };

  const hasHistory = purchaseHistoryFlavors.length > 0;

  // Render for compact mode (sidebar / product page addon)
  if (variant === 'compact') {
    return (
      <div className="bg-white border border-black/10 p-5 text-left font-sans text-[#0a0a0a]" id="compact-recommender-panel">
        <div className="flex items-center gap-1.5 mb-3">
          <Sparkles className="w-4 h-4 text-[#7AA200]" />
          <h3 className="text-xs font-mono font-bold tracking-widest uppercase">Bio-Taste Compatibility Match</h3>
        </div>
        
        {hasHistory && (
          <div className="bg-[#FAF9F6] border border-black/5 p-2.5 mb-4 text-[10px] leading-relaxed text-neutral-600">
            <span className="font-bold text-black uppercase block font-mono text-[9px] mb-0.5">✓ MATCHING SECURED BY ACCRETED HISTORY</span>
            Because you ordered and checked out of <strong className="text-black">Peanut Butter Caramel Salt</strong>, our engine calibrated your preferred profile:
          </div>
        )}

        {/* Top 2 Scored Matches */}
        <div className="space-y-3">
          {scoredProducts.slice(0, 2).map((prod) => (
            <div key={prod.id} className="border border-black/5 bg-[#FAF9F6]/50 p-3 flex gap-3 items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white border border-black/10 flex items-center justify-center p-0.5 relative shrink-0">
                  <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs text-black leading-tight">{prod.name}</span>
                    <span className="text-[8px] font-mono font-bold bg-[#D9FE00] text-black px-1.5 py-0.5 rounded-none shrink-0 uppercase">
                      {prod.compatibilityScore}% Match
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono block uppercase tracking-wider mt-0.5">
                    {prod.drivers.slice(0, 2).join(' &bull; ')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(prod.id)}
                disabled={addedProductId !== null}
                className="p-1 px-3 bg-[#0A0A0A] text-white hover:bg-black/80 font-mono text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer focus:outline-none"
              >
                {addedProductId === prod.id ? 'ADDED!' : 'BUY MATCH'}
              </button>
            </div>
          ))}
        </div>

        {/* Small Quiz Trigger */}
        <div className="mt-4 pt-4 border-t border-black/5 flex justify-between items-center">
          <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest">Adjust profile priorities:</span>
          <button
            onClick={() => navigateTo('nutrition')}
            className="text-[9px] font-bold font-mono tracking-widest text-[#0a0a0a] uppercase hover:underline cursor-pointer"
          >
            Refine Bio-Metrics &rarr;
          </button>
        </div>
      </div>
    );
  }

  // Render for prominent mode (Homepage master section)
  return (
    <section className="bg-white border-t border-b border-black/5 py-16 px-6 sm:px-10 font-sans" id="homepage-flavor-match-recommender">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title Content */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 border border-[#7AA200]/30 bg-[#7AA200]/5 text-[#7AA200] px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> PERSONALIZED RANGE SELECTOR
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-black leading-none uppercase tracking-tight">
            Find Your Absolute Biological Flavor Match
          </h2>
          <p className="text-neutral-500 text-xs sm:text-sm">
            {hasHistory 
              ? "We analyzed your history as an active athlete (Subodh Khadka) to generate precise bio-matching indexes." 
              : "Complete our quick 3-step cellular taste quiz to rank Dr Bar formulations for your physical life."}
          </p>
        </div>

        {/* Dashboard split: controls (left), results (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left panel: Quiz Questions */}
          <div className="lg:col-span-5 bg-[#FAF9F6] border border-black/5 p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-black/5 pb-3">
                <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">BIOLOGICAL CONFIGURATORS</span>
                <h3 className="font-display font-bold text-base text-black mt-1">Calibrate Your Preferences</h3>
              </div>

              {/* 1. Taste */}
              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wide">1. Core Flavor Profile Preference</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'Surprise Me / All' },
                    { id: 'chocolate', label: 'Rich Fudge & Cocoa' },
                    { id: 'nutty', label: 'Peanuts & Salted Toffee' },
                    { id: 'matcha', label: 'Matcha Uji & Cashew' }
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setTastePref(t.id as any); setIsQuizCompleted(true); }}
                      className={`p-2.5 text-left text-xs font-bold uppercase transition-all border ${
                        tastePref === t.id 
                          ? 'bg-[#0A0A0A] border-black text-white' 
                          : 'bg-white border-black/10 hover:border-black/30 text-neutral-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Dietary Restricts */}
              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wide">2. Dietary Limits & Sensitivity</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'any', label: 'None (Pure Whey Isolate)' },
                    { id: 'dairy-free', label: 'Dairy-Free (Plant-Based)' },
                    { id: 'no-peanuts', label: 'Peanut-Free Targets' }
                  ].map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { setDietary(d.id as any); setIsQuizCompleted(true); }}
                      className={`p-2.5 text-left text-xs font-bold uppercase transition-all border ${
                        dietary === d.id 
                          ? 'bg-[#0A0A0A] border-black text-white' 
                          : 'bg-white border-black/10 hover:border-black/30 text-neutral-600'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Goal Focus */}
              <div className="space-y-2">
                <span className="block text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wide">3. Primary Athletic Output Priority</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'strength', label: 'Strength' },
                    { id: 'endurance', label: 'Endurance' },
                    { id: 'renew', label: 'Renew' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => { setAthleticGoal(g.id as any); setIsQuizCompleted(true); }}
                      className={`p-2 text-center text-[10px] font-bold uppercase transition-all border ${
                        athleticGoal === g.id 
                          ? 'bg-[#0A0A0A] border-black text-white' 
                          : 'bg-white border-black/10 hover:border-[#0a0a0a] text-[#0a0a0a]/60'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Clear state or reset action */}
            <div className="pt-6 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-neutral-400">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-green-500" /> Profiling: Subodh Khadka
              </span>
              <button
                onClick={() => {
                  setTastePref('all');
                  setDietary('any');
                  setAthleticGoal('strength');
                }}
                className="hover:text-black font-bold uppercase tracking-wider underline cursor-pointer"
              >
                Reset Calibration
              </button>
            </div>
          </div>

          {/* Right panel: Rated Match Output Cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Display Top Recommendation Card */}
            <div className="border border-black/10 bg-white p-6 relative overflow-hidden flex flex-col sm:flex-row gap-6 items-center">
              {/* Highlight ribbon */}
              <div className="absolute top-0 right-0 bg-[#D9FE00] text-black text-[9px] font-mono font-black py-1 px-4 uppercase tracking-widest border-l border-b border-black/10 shadow-xs">
                {scoredProducts[0].compatibilityScore}% MATCH RATING
              </div>

              {/* Image box */}
              <div className="w-32 h-32 bg-[#FAF9F6] border border-black/5 flex items-center justify-center p-2 relative shrink-0">
                <img 
                  src={scoredProducts[0].image} 
                  alt={scoredProducts[0].name} 
                  className="w-full h-full object-cover shrink-0" 
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Desc content block */}
              <div className="flex-1 text-left space-y-3 w-full">
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-widest">YOUR ULTIMATE BIOLOGICAL PAIRING</span>
                  <h4 className="font-display font-bold text-xl text-black uppercase leading-tight mt-0.5">
                    {scoredProducts[0].name}
                  </h4>
                  <p className="text-[10px] font-mono text-[#7AA200] font-bold uppercase tracking-wider mt-1">
                    {scoredProducts[0].flavor}
                  </p>
                </div>

                <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
                  {scoredProducts[0].description}
                </p>

                {/* Compatibility driver tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {scoredProducts[0].drivers.map((driver, idx) => (
                    <span 
                      key={idx} 
                      className="border border-black/5 bg-[#F5F5F4] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 text-neutral-600 rounded-none font-medium"
                    >
                      {driver}
                    </span>
                  ))}
                  <span className="border border-green-500/10 bg-green-50 text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 text-green-700 rounded-none font-bold">
                    ✓ Low Glycemic
                  </span>
                </div>

                {/* Quick Add Match To Cart */}
                <div className="pt-3 flex items-center gap-3 w-full">
                  <button
                    onClick={() => handleAddToCart(scoredProducts[0].id)}
                    disabled={addedProductId !== null}
                    className="flex-1 py-3 px-5 bg-[#0A0A0A] text-white hover:bg-black/90 font-mono text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 rounded-none"
                  >
                    {addedProductId === scoredProducts[0].id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D9FE00]" />
                        <span>ADDED TO YOUR ACTIVE CART</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>CLAIM 12-BAR BOX Match &bull; ${scoredProducts[0].price.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Alternates grid blocks */}
            <div className="space-y-3">
              <span className="block text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black">ALTERNATIVE COMPATIBLE FORMULATIONS (80%+ SCORE)</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {scoredProducts.slice(1, 4).map((altProd) => (
                  <div key={altProd.id} className="border border-black/5 bg-[#FAF9F6]/50 p-4 text-left flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold bg-[#FAF9F6] text-[#0A0A0A]/40 uppercase tracking-wider border border-black/10 px-1.5 py-0.5">
                          {altProd.compatibilityScore}% Compatibility
                        </span>
                      </div>
                      
                      <h5 className="font-display font-medium text-xs text-black mt-2 leading-snug uppercase">
                        {altProd.name}
                      </h5>
                      <span className="text-[9px] font-mono text-neutral-450 uppercase tracking-widest block leading-tight mt-0.5">
                        {altProd.flavor.split(',')[0]}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(altProd.id)}
                      disabled={addedProductId !== null}
                      className="w-full text-center py-2 border border-black text-[#0a0a0a] hover:bg-black hover:text-white font-mono text-[9px] font-bold uppercase tracking-widest transition-all cursor-pointer focus:outline-none"
                    >
                      {addedProductId === altProd.id ? 'ADDED' : 'BUY ALTERNATING'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
