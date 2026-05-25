import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList, bundleOffers } from '../data/products';
import { Search, Heart, ShoppingBag, Eye, Calendar, Sparkles, Filter, Check, ShieldCheck, Flame, ArrowUpDown } from 'lucide-react';

export const Shop: React.FC = () => {
  const { navigateTo, addToCart, addBundleToCart, wishlist, toggleWishlist } = useShop();
  
  // Search and Filter and Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'best' | 'high_protein' | 'low_cal'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high' | 'rating'>('default');

  // Subscription vs One-Time selection states local to each card
  const [purchaseOption, setPurchaseOption] = useState<{ [productId: string]: 'once' | 'sub' }>({});
  const [subscriptionInterval, setSubscriptionInterval] = useState<{ [productId: string]: 'weekly' | 'biweekly' | 'monthly' }>({});

  const handleTogglePurchase = (productId: string, option: 'once' | 'sub') => {
    setPurchaseOption(prev => ({ ...prev, [productId]: option }));
  };

  const handleToggleInterval = (productId: string, interval: 'weekly' | 'biweekly' | 'monthly') => {
    setSubscriptionInterval(prev => ({ ...prev, [productId]: interval }));
  };

  // Filter Catalog
  const filteredProducts = productsList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.flavor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterType === 'all') return true;
    if (filterType === 'best') return product.isBestSeller === true;
    if (filterType === 'high_protein') return product.nutritionalFacts.protein >= 21;
    if (filterType === 'low_cal') return product.nutritionalFacts.calories <= 185;

    return true;
  });

  // Sort Catalog
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Default
  });

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-12 px-4 sm:px-6" id="shop-page-wrapper">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Header Hero Panel */}
        <div className="text-left mb-12" id="shop-header-texts">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">DR BAR CLINICAL RANGE</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight">
            Perform Better. Recover Smarter.
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
            Choose your athletic delivery plan. Standard Box of 12 Bars fully packed to maintain sustained nutrient yields. Choose automatic subscription for loyalty savings.
          </p>
        </div>

        {/* 2. Bundle Promotion banner */}
        <div className="bg-gradient-to-r from-neutral-900 to-[#121212] border border-white/5 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 text-left" id="bundle-shop-offer">
          <div className="flex items-center gap-4">
            <div className="bg-lime-400 text-black p-3 rounded-lg hidden sm:flex shrink-0">
              <Sparkles className="w-6 h-6 fill-black" />
            </div>
            <div>
              <span className="bg-lime-400 text-black text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full inline-block mb-1.5">Bundle Deal Active</span>
              <h3 className="font-display font-bold text-lg text-white">Save $18 with Clinical Core Trio Bundle</h3>
              <p className="text-neutral-400 text-xs mt-1 leading-snug">Get Peanut Butter Salt, Intense Cocoa, and Lime Matcha Renew in one massive box sequence.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              addBundleToCart('clinical-trio', 1, false);
            }}
            className="w-full md:w-auto bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-sm text-center"
          >
            Claim Trio Bundle ($98.00)
          </button>
        </div>

        {/* 3. Catalog Filters Panel bar */}
        <div className="bg-neutral-900/40 border border-white/5 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-left" id="filter-controls-bar">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search flavors, ingredients..."
              className="bg-[#121212] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
            />
          </div>

          {/* Filters category */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto" id="shop-tag-filters">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer uppercase ${
                filterType === 'all' ? 'bg-lime-400 text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              All Formulations
            </button>
            <button
              onClick={() => setFilterType('best')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer uppercase ${
                filterType === 'best' ? 'bg-lime-400 text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilterType('high_protein')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer uppercase ${
                filterType === 'high_protein' ? 'bg-lime-400 text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              High Protein (&ge;21g)
            </button>
            <button
              onClick={() => setFilterType('low_cal')}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium transition-all cursor-pointer uppercase ${
                filterType === 'low_cal' ? 'bg-lime-400 text-black font-bold' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/5'
              }`}
            >
              Low Cal (&le;185)
            </button>
          </div>

          {/* Sorters */}
          <div className="relative w-full md:w-auto shrink-0 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-neutral-500 hidden sm:block" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-[#121212] border border-white/10 rounded-xl py-2 px-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full sm:w-44 font-mono select-theme"
            >
              <option value="default">Default Chemistry</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Reviews Rating</option>
            </select>
          </div>
        </div>

        {/* 4. Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="bg-neutral-900/30 border border-white/5 rounded-3xl py-16 px-4 text-center text-neutral-400" id="empty-shop-state">
            <Flame className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-sm font-mono font-bold uppercase mb-1">NO CLINICAL FORMULAS MATCHED</p>
            <p className="text-xs">Adjust your searching criteria or select 'All Formulations'.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="shop-catalog-grid">
            {sortedProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              const option = purchaseOption[product.id] || 'once';
              const interval = subscriptionInterval[product.id] || 'monthly';
              const displayPrice = option === 'sub' ? product.subscriptionPrice : product.price;

              return (
                <div 
                  key={product.id}
                  className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl hover:border-neutral-700/50 transition-all flex flex-col justify-between text-left group"
                  id={`product-grid-card-${product.id}`}
                >
                  
                  {/* Thumbnail */}
                  <div className="relative aspect-square bg-[#121212] overflow-hidden flex items-center justify-center shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Stock Alert Badge */}
                    {product.stock < 15 && (
                      <div className="absolute top-4 left-4 bg-red-950/90 border border-red-500/20 text-red-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                        Only {product.stock} boxes left!
                      </div>
                    )}
                    {product.stock >= 15 && product.isBestSeller && (
                      <div className="absolute top-4 left-4 bg-lime-950/90 border border-lime-500/20 text-lime-400 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                        Best Seller
                      </div>
                    )}

                    {/* Quick navigation eye */}
                    <button
                      onClick={() => navigateTo('product', { productId: product.id })}
                      className="absolute bottom-4 left-4 bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg text-[10px] font-mono font-semibold tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-1.5"
                      title="View Clinical Details"
                    >
                      <Eye className="w-3.5 h-3.5" /> Specs
                    </button>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 bg-[#030303]/75 hover:bg-[#030303] text-neutral-400 hover:text-white p-2.5 rounded-full transition-colors cursor-pointer border-0"
                      aria-label="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">{product.flavor}</span>
                        <div className="flex items-center gap-0.5 text-lime-400 text-xs font-mono font-bold">
                          ★ {product.rating}
                        </div>
                      </div>

                      <h3 className="font-display font-bold text-lg text-white leading-tight mb-2">
                        {product.name}
                      </h3>
                      
                      <p className="text-neutral-400 text-xs leading-relaxed mb-5 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Nutritional Pill Elements */}
                      <div className="grid grid-cols-3 gap-2 px-1 py-1 bg-neutral-950 rounded-xl border border-white/5 mb-6 text-center text-xs font-mono">
                        <div className="py-1">
                          <span className="text-white block font-bold text-xs">{product.nutritionalFacts.protein}g</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Protein</span>
                        </div>
                        <div className="border-l border-white/5 py-1">
                          <span className="text-white block font-bold text-xs">{product.nutritionalFacts.sugar}g</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Sugars</span>
                        </div>
                        <div className="border-l border-white/5 py-1">
                          <span className="text-lime-400 block font-bold text-xs">{product.nutritionalFacts.calories}</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Cal</span>
                        </div>
                      </div>

                      {/* Purchase Options Selector Buttons */}
                      <div className="space-y-2 mb-6" id={`purchase-selection-group-${product.id}`}>
                        <button
                          onClick={() => handleTogglePurchase(product.id, 'once')}
                          className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                            option === 'once' 
                              ? 'bg-neutral-800/80 border-white/20 text-white font-semibold' 
                              : 'bg-transparent border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${option === 'once' ? 'border-lime-400 bg-lime-400 text-black' : 'border-neutral-500'}`}>
                              {option === 'once' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                            </span>
                            <span>One-time Purchase</span>
                          </span>
                          <span className="font-mono font-bold">${product.price.toFixed(2)}</span>
                        </button>

                        <div className="relative">
                          <button
                            onClick={() => handleTogglePurchase(product.id, 'sub')}
                            className={`w-full p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between ${
                              option === 'sub' 
                                ? 'bg-lime-400/5 border-lime-400/30 text-white font-semibold' 
                                : 'bg-transparent border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${option === 'sub' ? 'border-lime-400 bg-lime-400 text-black' : 'border-neutral-500'}`}>
                                {option === 'sub' && <span className="w-1.5 h-1.5 rounded-full bg-black" />}
                              </span>
                              <span className="flex items-center gap-1">
                                <span>Auto-Delivery Program</span>
                                <span className="bg-lime-450 text-black text-[9px] font-bold px-1 py-0.2 rounded">Save 15%</span>
                              </span>
                            </span>
                            <span className="font-mono font-bold text-lime-400">${product.subscriptionPrice.toFixed(2)}</span>
                          </button>

                          {/* Sub schedule intervals menu nested */}
                          {option === 'sub' && (
                            <div className="bg-neutral-950 rounded-xl p-2 border border-white/5 mt-1.5 flex items-center justify-between gap-1 text-[10px] font-mono">
                              <span className="text-neutral-500 pl-1 uppercase font-semibold">INTERVAL:</span>
                              <div className="flex gap-1">
                                {(['weekly', 'biweekly', 'monthly'] as const).map((int) => (
                                  <button
                                    key={int}
                                    onClick={() => handleToggleInterval(product.id, int)}
                                    className={`px-2 py-1 rounded cursor-pointer uppercase font-bold text-[9px] ${
                                      interval === int 
                                        ? 'bg-lime-400 text-black' 
                                        : 'bg-neutral-900 text-neutral-400 hover:text-white'
                                    }`}
                                  >
                                    {int === 'biweekly' ? '2 Weeks' : int}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* CTA buying */}
                    <div>
                      <button
                        onClick={() => {
                          addToCart(product, 1, option === 'sub', interval);
                        }}
                        className="w-full bg-lime-400 hover:bg-lime-300 text-black font-sans font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                      >
                        <ShoppingBag className="w-4 h-4 text-black" />
                        <span>Add Box to Bag</span>
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
