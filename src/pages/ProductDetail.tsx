import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList } from '../data/products';
import { ShoppingBag, Eye, Heart, Check, ArrowLeft, Star, Leaf, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { FlavorRecommender } from '../components/FlavorRecommender';

export const ProductDetail: React.FC = () => {
  const { selectedProductId, navigateTo, addToCart, wishlist, toggleWishlist, reviews } = useShop();
  
  // Find active product
  const product = productsList.find(p => p.id === selectedProductId) || productsList[0];

  // Progressive Volume discount selection state local to page
  const [selectedBoxCount, setSelectedBoxCount] = useState<1 | 2 | 3>(1);
  const [purchaseType, setPurchaseType] = useState<'once' | 'sub'>('once');
  const [subInterval, setSubInterval] = useState<'weekly' | 'biweekly' | 'monthly'>('monthly');

  // Related products (cross sell)
  const related = productsList.filter(p => p.id !== product.id).slice(0, 2);

  // Filter reviews matching current flavor product name
  const matchedReviews = reviews.filter(rev => rev.flavor.toLowerCase().includes(product.name.toLowerCase()));

  // Pricing calculations based on box discounts
  const basePrice = purchaseType === 'sub' ? product.subscriptionPrice : product.price;
  let volumeMultiplier = 1;
  let volumeDiscountPct = 0;
  
  if (selectedBoxCount === 2) {
    volumeMultiplier = 1.9; // 5% discount
    volumeDiscountPct = 5;
  } else if (selectedBoxCount === 3) {
    volumeMultiplier = 2.7; // 10% discount
    volumeDiscountPct = 10;
  }

  const finalBoxGroupPrice = basePrice * volumeMultiplier;

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-12 px-4 sm:px-6 text-left" id="product-detail-page">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK LINE */}
        <button 
          onClick={() => navigateTo('shop')}
          className="group text-neutral-400 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase mb-10 cursor-pointer bg-transparent border-0"
          id="back-to-shop-btn"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Clinical Range Catalog</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-start">
          
          {/* IMAGE PORT (Hover zoom simulated cleanly with css trans) */}
          <div className="space-y-6" id="product-media-port">
            <div className="relative aspect-square rounded-3xl bg-[#121212] border border-white/5 overflow-hidden flex items-center justify-center p-6 sm:p-10 group" id="main-product-gallery">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />

              {/* Verified quality seal overlay */}
              <div className="absolute bottom-4 right-4 bg-black/80 border border-white/10 text-neutral-405 text-[10px] font-mono font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Award className="w-4 h-4 text-lime-400" /> RAW METALLIC SCREENED
              </div>

              {/* Wishlist Heart overlays in high contrast */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-6 right-6 bg-[#030303]/85 hover:bg-[#030303] text-neutral-400 hover:text-white p-3 rounded-full transition-colors cursor-pointer border-0 shadow-lg"
                aria-label="Wishlist Add"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'text-red-500 fill-red-500' : ''}`} />
              </button>
            </div>

            {/* Quick trust assurances */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono text-[9px] sm:text-xs text-neutral-500" id="trust-assurances-row">
              <div className="bg-neutral-900/40 border border-white/5 py-3 rounded-xl flex flex-col justify-center items-center gap-1">
                <Check className="w-4 h-4 text-lime-400" />
                <span>Cold-Pack Delivery</span>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 py-3 rounded-xl flex flex-col justify-center items-center gap-1">
                <Check className="w-4 h-4 text-lime-400" />
                <span>Zero Soy Lecithin</span>
              </div>
              <div className="bg-neutral-900/40 border border-white/5 py-3 rounded-xl flex flex-col justify-center items-center gap-1">
                <Check className="w-4 h-4 text-lime-400" />
                <span>100% Gluten Checked</span>
              </div>
            </div>
          </div>

          {/* DETAIL CONTROLS */}
          <div className="space-y-8" id="product-action-controls">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">{product.flavor}</span>
              <h1 className="font-display font-bold text-3xl sm:text-4.5xl text-white tracking-tight leading-none mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-3.5 mb-4">
                <div className="flex items-center gap-0.5 text-lime-400 text-xs font-mono font-bold">
                  ★ {product.rating} <span className="text-neutral-500 font-normal pl-1">({product.reviewsCount} customer reviews)</span>
                </div>
                <span className="text-neutral-600">|</span>
                <span className="text-[10px] font-mono text-lime-400 bg-lime-400/10 px-2 py-0.5 rounded uppercase font-bold">Clinical Level Priority</span>
              </div>

              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Flavor Quick Cross Selector */}
            <div className="space-y-3" id="flavor-cross-selector">
              <span className="text-[10px] font-mono font-semibold tracking-wider text-neutral-500 block uppercase">BROWSE SPECIALIZED FORMULATIONS:</span>
              <div className="flex flex-wrap gap-2.5">
                {productsList.map(p => (
                  <button
                    key={p.id}
                    onClick={() => navigateTo('product', { productId: p.id })}
                    className={`py-2 px-3 rounded-xl text-xs transition-all cursor-pointer font-sans border text-left flex items-center gap-2 ${
                      p.id === product.id 
                        ? 'bg-lime-400 text-black border-lime-400 font-bold' 
                        : 'bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
                    }`}
                  >
                    <span>{p.name.split(' & ')[0].split(' &amp; ')[0]}</span>
                    {p.id === product.id && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Scientific Benefits Bullet Rows */}
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-5 space-y-4" id="science-benefit-box">
              <span className="text-[10px] font-mono text-lime-400 font-bold uppercase block tracking-widest">SCIENTIFIC BENEFIT DESIGN MODULE</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="font-display font-medium text-xs sm:text-sm text-white block flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-lime-400 inline-block shrink-0" />
                      {benefit.title}
                    </span>
                    <span className="text-neutral-400 text-xs block leading-relaxed">{benefit.description}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchase Program Options Form */}
            <div className="space-y-4 border-t border-b border-white/5 py-6" id="purchase-programme-form">
              
              {/* Option toggle buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPurchaseType('once')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    purchaseType === 'once' 
                      ? 'bg-neutral-850 border-white/20 text-white' 
                      : 'bg-transparent border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold font-sans">
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${purchaseType === 'once' ? 'border-lime-400 bg-lime-400' : 'border-neutral-500'}`}>
                      {purchaseType === 'once' && <span className="w-1 h-1 rounded-full bg-black" />}
                    </span>
                    <span>One-Time Purchase</span>
                  </span>
                  <span className="font-mono font-bold text-lg text-white block mt-2">${product.price.toFixed(2)} <span className="text-[10px] text-neutral-500 font-normal">/ Box of 12</span></span>
                </button>

                <button
                  type="button"
                  onClick={() => setPurchaseType('sub')}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                    purchaseType === 'sub' 
                      ? 'bg-lime-400/5 border-lime-400/30 text-white' 
                      : 'bg-transparent border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="absolute top-2 right-2 bg-lime-400 text-black text-[8px] font-mono font-black uppercase px-1.5 py-0.2 rounded">Save 15%</div>
                  <span className="flex items-center gap-1.5 text-xs font-bold font-sans">
                    <span className={`w-3 h-3 rounded-full border flex items-center justify-center ${purchaseType === 'sub' ? 'border-lime-400 bg-lime-400' : 'border-neutral-500'}`}>
                      {purchaseType === 'sub' && <span className="w-1 h-1 rounded-full bg-black" />}
                    </span>
                    <span>Subscribe & Save Program</span>
                  </span>
                  <span className="font-mono font-bold text-lg text-lime-400 block mt-2">${product.subscriptionPrice.toFixed(2)} <span className="text-[10px] text-neutral-500 font-normal">/ Box of 12</span></span>
                </button>
              </div>

              {/* Sub schedule intervals menu nested */}
              {purchaseType === 'sub' && (
                <div className="bg-neutral-950 rounded-xl p-3.5 border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold">SELECT YOUR BIO-RELOAD INTERVAL:</span>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setSubInterval('weekly')}
                      className={`py-2 rounded-lg cursor-pointer transition-all uppercase font-bold text-[10px] ${subInterval === 'weekly' ? 'bg-lime-400 text-black' : 'bg-neutral-900 hover:text-white border border-white/5'}`}
                    >
                      weekly
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubInterval('biweekly')}
                      className={`py-2 rounded-lg cursor-pointer transition-all uppercase font-bold text-[10px] ${subInterval === 'biweekly' ? 'bg-lime-400 text-black' : 'bg-neutral-900 hover:text-white border border-white/5'}`}
                    >
                      2 weeks
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubInterval('monthly')}
                      className={`py-2 rounded-lg cursor-pointer transition-all uppercase font-bold text-[10px] ${subInterval === 'monthly' ? 'bg-lime-400 text-black' : 'bg-neutral-900 hover:text-white border border-white/5'}`}
                    >
                      monthly
                    </button>
                  </div>
                </div>
              )}

              {/* Volume selector box progressive quantity triggers */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-semibold block">SELECT VOLUME MULTIPLIER & PROGRESSIVE SAVINGS:</span>
                <div className="grid grid-cols-3 gap-2.5 text-xs font-mono">
                  
                  <button 
                    type="button"
                    onClick={() => setSelectedBoxCount(1)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border text-center ${selectedBoxCount === 1 ? 'bg-neutral-800 border-white/20' : 'bg-neutral-950 border-white/5 text-neutral-400 hover:text-white'}`}
                  >
                    <span className="block font-black text-white text-sm">1 Box</span>
                    <span className="text-[10px] text-neutral-500 uppercase">12 Bars Total</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setSelectedBoxCount(2)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border text-center relative ${selectedBoxCount === 2 ? 'bg-neutral-800 border-white/25 text-white' : 'bg-neutral-950 border-white/5 text-neutral-400 hover:text-white'}`}
                  >
                    <div className="absolute top-1 right-1 bg-lime-400 text-black text-[7px] font-bold px-1 rounded uppercase">5% off</div>
                    <span className="block font-black text-white text-sm">2 Boxes</span>
                    <span className="text-[10px] text-neutral-500 uppercase">24 Bars Total</span>
                  </button>

                  <button 
                    type="button"
                    onClick={() => setSelectedBoxCount(3)}
                    className={`p-3 rounded-xl transition-all cursor-pointer border text-center relative ${selectedBoxCount === 3 ? 'bg-neutral-800 border-white/25 text-white' : 'bg-neutral-950 border-white/5 text-neutral-400 hover:text-white'}`}
                  >
                    <div className="absolute top-1 right-1 bg-lime-400 text-black text-[7px] font-bold px-1 rounded uppercase">10% off</div>
                    <span className="block font-black text-white text-sm">3 Boxes</span>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold">36 Bars Total</span>
                  </button>

                </div>
              </div>

            </div>

            {/* QUANTITY SUMMARY & CHECKOUT TRIGGERS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5 bg-neutral-950/80 border border-white/5 p-5 rounded-2xl" id="product-volume-checkout-summary">
              <div className="text-left font-mono">
                <span className="text-[10px] text-neutral-500 block uppercase">YOUR SELECTIONS TOTAL PRICE:</span>
                <span className="text-2xl sm:text-3xl font-black text-white block mt-0.5">${finalBoxGroupPrice.toFixed(2)}</span>
                {volumeDiscountPct > 0 && <span className="text-lime-400 text-[10px] font-bold">Includes {volumeDiscountPct}% Volume Discount!</span>}
              </div>

              <button
                type="button"
                onClick={() => {
                  addToCart(product, selectedBoxCount, purchaseType === 'sub', subInterval);
                  navigateTo('shop'); // route back to let them review bag or checkout
                }}
                className="w-full sm:w-auto bg-lime-400 hover:bg-lime-300 text-black text-xs font-bold uppercase tracking-wider py-4.5 px-8 rounded-xl transition-all cursor-pointer shadow-lg shadow-lime-400/5 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                id="product-add-to-bag-cta"
              >
                <ShoppingBag className="w-4 h-4 text-black shrink-0" />
                <span>Secure Selected Bars</span>
              </button>
            </div>

          </div>
        </div>

        {/* 5. LABORATORY NUTRITION BREAKDOWN GRID Facts table */}
        <div className="py-16 border-t border-white/5 mt-16" id="laboratory-nutrition-panel">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Nutrition Column */}
            <div className="lg:col-span-5 border border-white/10 bg-neutral-900 rounded-2xl p-6 sm:p-8 relative" id="clinical-nutrition-sheet">
              <h3 className="font-display font-black text-xl text-white border-b-2 border-white pb-1 tracking-tight">Nutrition Facts</h3>
              <p className="text-xs font-sans text-neutral-400 py-1.5 leading-none">Serving Size 1 Bar (55g)</p>
              
              <div className="border-t-8 border-white mt-1.5 py-1.5 flex justify-between font-mono font-bold text-sm">
                <span>Amount Per Serving</span>
                <span></span>
              </div>

              <div className="border-b border-neutral-600 pb-1.5 flex justify-between font-mono font-black text-xl">
                <span>Energy Calories</span>
                <span>{product.nutritionalFacts.calories}</span>
              </div>

              <div className="py-2 flex justify-between font-mono text-xs border-b border-white/5">
                <span><strong className="text-white">Active Cellular Protein Peptide</strong></span>
                <span><strong className="text-white">{product.nutritionalFacts.protein}g</strong></span>
              </div>

              <div className="py-2 flex justify-between font-mono text-xs border-b border-white/5">
                <span><strong className="text-white">Absorbable Sugars</strong> (Prebiotics)</span>
                <span><strong>{product.nutritionalFacts.sugar}g</strong></span>
              </div>

              <div className="py-2 flex justify-between font-mono text-xs border-b border-white/5">
                <span><strong>Dietary Soluble Prebiotic Fiber</strong></span>
                <span><strong>{product.nutritionalFacts.fiber}g</strong></span>
              </div>

              <div className="py-2 flex justify-between font-mono text-xs border-b border-white/5">
                <span><strong>Total Medium Lipids (Fats)</strong></span>
                <span><strong>{product.nutritionalFacts.fat}g</strong></span>
              </div>

              <div className="py-2 flex justify-between font-mono text-xs border-b border-white/5">
                <span>Total Non-Complex Carbohydrate</span>
                <span><strong>{product.nutritionalFacts.carbs}g</strong></span>
              </div>

              <div className="text-[10px] font-mono leading-relaxed text-neutral-500 pt-4 text-left">
                <strong>Ingredients Disclosure:</strong> {product.ingredients.join(', ')}. Manufactured cleanly inside GMP facilities. Free of soy, palm oil, heavy emulsifiers, animal tallow, and synthetic sucralose. Highly bio-available parameters.
              </div>
            </div>

            {/* Right clinical reasons */}
            <div className="lg:col-span-7 space-y-6 text-left" id="nutrition-disclosure-text">
              <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-widest block">BIOCHEMICAL ROAD PANEL</span>
              <h2 className="font-display font-bold text-2xl sm:text-3.5xl text-white tracking-tight leading-none">
                Clinical Disclosures & Integrity
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Most cheap supermarket protein bars are filled with unrefined industrial sucrose syrup, cheap soy proteins that block thyroid levels, and synthetic chemicals like sucralose that harm gut microflora.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="science-points">
                <div className="p-4.5 bg-neutral-900 border border-white/5 rounded-xl">
                  <span className="font-display font-semibold text-white block mb-1">Cold-Pressed Fractions</span>
                  <p className="text-neutral-400 text-xs">Our whey isolates are filtered at 4&deg;C using ceramic micro-filtration grids, keeping recovery structures fully functional.</p>
                </div>
                <div className="p-4.5 bg-neutral-900 border border-white/5 rounded-xl">
                  <span className="font-display font-semibold text-white block mb-1">Prebiotics Only</span>
                  <p className="text-neutral-400 text-xs">Prebiotic plant root tapioca fiber provides structural volume, feeding positive gut microbiome health.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 6. COMPREHENSIVE FLAVOR-SPECIFIC CUSTOMER REVIEWS */}
        <div className="py-16 border-t border-white/5 mt-8" id="flavor-customer-reviews">
          <div className="flex items-center justify-between mb-10 text-left">
            <div>
              <span className="text-xs font-mono text-lime-400 font-bold uppercase block tracking-widest">VERIFIED ATHLETE CORNER</span>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight">Verified Feedback on {product.name}</h3>
            </div>
          </div>

          {matchedReviews.length === 0 ? (
             <div className="bg-neutral-900/40 border border-white/5 p-8 rounded-2xl text-neutral-400" id="no-matched-reviews">
               <span className="text-xs font-mono block">No flavor-specific reviews compiled yet. Check out other product reviews in the Community view!</span>
             </div>
          ) : (
            <div className="space-y-6" id="flavor-reviews-grid">
              {matchedReviews.map(rev => (
                <div key={rev.id} className="bg-neutral-900 border border-white/5 p-6 rounded-2xl text-left space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      {rev.avatar ? (
                        <img 
                          src={rev.avatar} 
                          alt={rev.name} 
                          className="w-10 h-10 rounded-full object-cover grayscale border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-mono font-bold text-lime-400 text-sm">
                          {rev.name[0]}
                        </div>
                      )}
                      <div>
                        <span className="block text-xs font-mono font-bold text-white flex items-center gap-1">
                          {rev.name} 
                          {rev.verified && <span className="text-lime-400 text-[9px] bg-lime-400/10 px-1 py-0.2 rounded font-bold uppercase tracking-wider">Verified Purchase</span>}
                        </span>
                        <span className="block text-[10px] font-mono text-neutral-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-lime-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-lime-400' : 'text-neutral-700'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-white text-sm sm:text-base">{rev.title}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{rev.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* COMPATIBILITY ANALYZER WIDGET */}
        <div className="py-12 border-t border-white/5 mt-8">
          <FlavorRecommender variant="compact" />
        </div>

        {/* 7. CROSS SELLS SECTION (Dynamic related products) */}
        <div className="py-16 border-t border-white/5 mt-12" id="flavor-cross-sell">
          <h3 className="font-display font-black text-xl text-white mb-10 text-left">Highly Recommended Pairings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {related.map(rec => (
              <div key={rec.id} className="bg-neutral-900 border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 text-left items-center group">
                <img 
                  src={rec.image} 
                  alt={rec.name} 
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl bg-black shrink-0 transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                
                <div className="space-y-3 flex-1 w-full sm:w-auto">
                  <div>
                    <span className="bg-neutral-950 border border-white/5 text-neutral-500 text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase block w-fit mb-1">{rec.flavor.split(',')[0]}</span>
                    <h4 className="font-display font-bold text-white text-sm sm:text-base leading-tight group-hover:text-lime-400 transition-colors cursor-pointer" onClick={() => navigateTo('product', { productId: rec.id })}>{rec.name}</h4>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mt-1 leading-snug">{rec.tagline}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1.5 border-t border-white/5">
                    <span className="font-mono font-bold text-sm text-white">${rec.price.toFixed(2)}</span>
                    <button
                      onClick={() => navigateTo('product', { productId: rec.id })}
                      className="bg-lime-400 hover:bg-lime-300 text-black text-[9px] font-mono font-bold uppercase px-3 py-2 rounded-lg cursor-pointer"
                    >
                      Configure Specs
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
