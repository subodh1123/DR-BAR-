import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList, bundleOffers } from '../data/products';
import { Heart, ShoppingBag, Eye, Calendar, Sparkles, Check, ChevronRight, Zap, Target, Star, Leaf, Dumbbell, StarHalf } from 'lucide-react';
import { motion } from 'motion/react';
import { FlavorRecommender } from '../components/FlavorRecommender';

export const Home: React.FC = () => {
  const { navigateTo, addToCart, wishlist, toggleWishlist, addBundleToCart } = useShop();
  const [activeLifestyleTab, setActiveLifestyleTab] = useState<'gym' | 'office' | 'travel' | 'workout'>('gym');

  const bestSellers = productsList.filter(p => p.isBestSeller || p.id === 'dense-dark-fudge-cocoa');

  const lifestyleContent = {
    gym: {
      title: "Anabolic Muscle Protection",
      tagline: "Post-workout structural cellular recovery",
      description: "When lifting weights, skeletal muscular tissues experience microscopical fiber tears. The 21g of bio-available grass-fed whey peptide isolate inside Dr Bar feeds muscles immediately. No chalky taste—just rapid glycogen recovery.",
      stats: "21g whey isolate & premium MCT energy",
      icon: Dumbbell
    },
    office: {
      title: "Cognitive Focus and High Focus-Acuity",
      tagline: "Replaces toxic chocolate vending treats",
      description: "Avoid the 3:00 PM boardroom sugar crash. Dr Bar uses pure slow-churn carbohydrate prebiotic tapioca fibers and organic monk fruit, supplying a steady stream of glycogen to the cerebral cortex without an insulin surge.",
      stats: "Sub-1g sugar & zero brain fog",
      icon: Target
    },
    travel: {
      title: "Satiety Security For Long Journeys",
      tagline: "Fits smoothly in flight carry-on bags",
      description: "Travel fatigue is exacerbated by high sodium, highly processed airport snacks. Packed tight with organic fats and pure amino acid structures, Dr Bar holds hunger patterns down for up to 5 hours cleanly.",
      stats: "Compact packaging & 100% bio-organic",
      icon: Zap
    },
    workout: {
      title: "Sustained Pre-Workout Power Release",
      tagline: "Thermogenic activation fats for ultimate pumps",
      description: "Loaded with medium-chain triglycerides (MCT Oil) designed for metabolic speed, consuming a Dr Bar 45 minutes prior to cardiac routines fuels ATP cellular pathways for steady output over 90 minutes.",
      stats: "MCT fuel carrier & athletic performance",
      icon: Sparkles
    }
  };

  const currentTab = lifestyleContent[activeLifestyleTab];

  return (
    <div className="bg-[#F5F5F4] text-[#0A0A0A]" id="home-page-container">
      
      {/* SECTION 1 — EPIC HERO AREA */}
      <section 
        className="relative overflow-hidden bg-[#F5F5F4] py-20 px-6 sm:px-10 lg:py-32 border-b border-black/5" 
        id="hero-section"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-200/50 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          
          {/* Left Hero Core Content */}
          <div className="text-left" id="hero-core-copy">
            <div className="flex items-center gap-2 mb-6">
              <span className="bg-[#D9FE00] text-black text-[10px] font-black px-2 py-0.5 rounded-none italic uppercase">NEW RELEASE</span>
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Fuel for high performance</span>
            </div>
            
            <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-[88px] leading-[0.88] tracking-tighter text-[#0A0A0A] mb-8 uppercase">
              PROTEIN THAT<br/>
              <span className="text-[#5D4037]">ACTUALLY</span><br/>
              TASTES GOOD.
            </h1>
            
            <p className="text-neutral-600 text-sm sm:text-base lg:text-lg leading-relaxed mb-10 max-w-md font-medium">
              Scientific nutrition meets culinary excellence. 21g whey isolate, zero sugar, and the snap of real dark chocolate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                onClick={() => navigateTo('shop')}
                className="px-10 py-5 bg-[#0A0A0A] text-white text-[13px] font-bold uppercase tracking-[0.2em] shadow-2xl hover:translate-y-[-2px] transition-transform cursor-pointer border-0 rounded-none flex items-center justify-center gap-2"
                id="hero-shop-cta"
              >
                <span>Shop Now</span>
                <ChevronRight className="w-4 h-4 text-white stroke-[3]" />
              </button>
              
              <button 
                onClick={() => navigateTo('shop')}
                className="px-10 py-5 border-2 border-black text-black text-[13px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all cursor-pointer rounded-none flex items-center justify-center gap-2"
                id="hero-explore-cta"
              >
                <span>Explore Flavors</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex items-center gap-12 border-t border-black/5 pt-8" id="hero-trust-indicators">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-[#0A0A0A]">21g</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Protein</span>
              </div>
              <div className="flex flex-col border-l border-black/10 pl-8">
                <span className="text-3xl font-black text-[#0A0A0A]">0g</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">Added Sugar</span>
              </div>
              <div className="flex flex-col border-l border-black/10 pl-8">
                <span className="text-3xl font-black text-[#7AA200] drop-shadow-sm">★ 4.9</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">5,000+ Reviews</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-6 text-xs text-neutral-400 font-sans">
              <span className="text-neutral-500 font-bold">&bull; Free shipping over $60</span>
              <span className="text-neutral-300">|</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Star className="w-3.5 h-3.5 fill-lime-600 text-lime-600" /> Rated 4.9/5 by 2,500+ Athletes
              </span>
            </div>
          </div>

          {/* Right Hero Product Float (Cinematic packaging visual) */}
          <div className="relative flex justify-center items-center py-6 sm:py-0" id="hero-graphics">
            <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-neutral-200/40 rounded-full blur-3xl pointer-events-none" />
            
            {/* The Floating generated Image */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="relative z-10 w-full max-w-[340px] sm:max-w-[480px] aspect-[16/9] rounded-none overflow-hidden border border-black/5 shadow-lg group bg-white"
              id="hero-floating-box"
            >
              <img 
                src="/src/assets/images/dr_bar_hero_1779685408998.png" 
                alt="Dr Bar Protein Packaging Cinematic shot" 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 sm:p-6 flex flex-col justify-end text-left select-none pointer-events-none">
                <span className="text-[10px] font-mono text-lime-400 font-bold tracking-widest mb-1 uppercase">ESTABLISHED ATHLETE APPROVED</span>
                <h4 className="font-display font-bold text-lg sm:text-xl text-white">Intense Cocoa & Hazel Fudge</h4>
                <p className="text-xs text-neutral-300">Smart fuel for high muscular performance recovery</p>
              </div>
            </motion.div>

            {/* Accent badge */}
            <div className="absolute -top-4 right-4 sm:-right-4 z-20 bg-[#D9FE00] text-black rounded-none px-4 py-3 rotate-12 shadow-md border border-black font-display font-black text-xs uppercase tracking-tighter flex items-center gap-1.5 animate-bounce">
              <Zap className="w-4 h-4 fill-black text-black shrink-0" />
              <span>STOCKS LIMITED</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY DR BAR? (Icons & Features) */}
      <section className="py-20 px-6 sm:px-10 border-b border-black/5 bg-white" id="why-choose-us">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 bg-neutral-900 border border-white/5 text-neutral-400 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase mb-4">
            <Leaf className="w-3.5 h-3.5 text-lime-400" /> Bio-Dynamic Science
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-4">
            Zero Glycemic Sweetener Junk.<br/>
            <span className="text-neutral-500 font-light">Pure Anabolic Performance.</span>
          </h2>
          
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-16">
            We spent 24 months in sports laboratories isolating proteins from dairy peptides to formulate healthy gym snacks that bypass insulin crashes and digestive bloating.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left" id="feature-grid">
            
            {/* Card 1 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Dumbbell className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">High Bio-Peptide Protein</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                21g to 23g of pure ultra-filtered, cold-pressed whey isolate structures designed for rapid absorption directly to skeletal tissues.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Exactly 1g Sugar</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Sweetened natural-style using prebiotic fibers, organic stevia, and pure monk fruit extracts. Absolute safety from insulin spikes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Clean Energy Carriage</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Infused with premium MCT brain lipids. Provides instant hepatic breakdown for steady focal outputs during tasks.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Gastric Support Base</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Absolutely zero artificial polyol chemicals like maltitol or sucralose that ferment in the intestine. Zero flatulence patterns.
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Pristine Flavor Texturing</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                We grind whole organic dry almonds and hazelnuts to achieve luxurious fudge crunchiness. Satisfies sensory centers.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 hover:border-lime-400/30 transition-all duration-300 hover:-translate-y-1">
              <div className="bg-lime-400/10 text-lime-400 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-2">Clinical Clean Standard</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Manufactured under GMP certification logs. Every batch is double lab-tested for heavy metals, gluten residues, and chemical pesticides.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2.5 — CLINICAL DOCTOR DIRECTIVE SHOWCASE — PDF INSPIRED */}
      <section className="py-20 px-6 sm:px-10 bg-gradient-to-br from-[#121212] via-[#0F0F0F] to-[#0A0A0A] border-y border-white/5 relative" id="doctor-directive-section">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[#7AA200]/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Awesome Generated Athletic Photo */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative group border border-white/10 p-2 bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-2xl">
                {/* Visual Label */}
                <span className="absolute top-4 left-4 z-20 bg-[#D9FE00] text-black text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-widest rounded-none shadow-sm">
                  ★ CLINICAL FORMULATION FOCUS
                </span>
                
                <img 
                  src="/src/assets/images/dr_bar_slate_photo_1779688124622.png" 
                  alt="DR BAR Athletic Setup on Slate with Gym Tools" 
                  className="w-full h-auto object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Elegant Motto Banner Overlay at bottom of Photo container */}
                <div className="absolute bottom-2 left-2 right-2 bg-black/85 backdrop-blur-md p-4 rounded-lg border border-white/5 text-center">
                  <p className="text-white font-display text-base sm:text-lg italic font-medium tracking-tight">
                    "Protein Bars keeping Doctors far."
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 px-1">
                <span>INTAKE BLUEPRINT #084-2026</span>
                <span>CALIBRATED FOR HEAVY MUSCULAR EFFORTS</span>
              </div>
            </div>

            {/* Right Column: PDF Content Cards & Interactive Ingredients Meter */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="inline-flex items-center gap-1.5 border border-[#7AA200]/30 bg-[#7AA200]/5 text-[#7AA200] px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase">
                  <Star className="w-3.5 h-3.5 fill-lime-400 text-lime-400" /> CLINICAL ENDORSEMENT DIRECTIVE
                </span>
                
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none uppercase">
                  One Protein Bar A Day Keeps The Doctor Away
                </h3>
                
                <div className="p-4 bg-[#7AA200]/10 border border-[#7AA200]/20 rounded-xl">
                  <p className="text-lime-400 font-bold font-mono text-xs uppercase tracking-wide">
                    "Recommended by Doctors"
                  </p>
                  <p className="text-neutral-300 text-xs mt-1 leading-relaxed">
                    Formulated under strict physical medicine standards to support everyday athletic recovery, cellular repairs, and pristine gastric transit.
                  </p>
                </div>
              </div>

              {/* Handcrafted Oatmeal Ingredients Chart from PDF */}
              <div className="border border-white/5 bg-[#161616]/70 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">FORMULA STABILITY PROFILE</span>
                    <h4 className="font-display font-bold text-base text-white uppercase">Handcrafted Oatmeal Blend</h4>
                  </div>
                  <span className="bg-[#D9FE00] text-black font-mono text-[9px] font-bold px-2 py-0.5 rounded-none uppercase">100% WHOLE FOODS</span>
                </div>

                <div className="space-y-2 text-xs">
                  {/* Oats */}
                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span className="font-medium">Organic Rolled Oats (High Recovery Carbohydrate)</span>
                      <span className="font-mono text-lime-450 font-bold text-[#D9FE00]">350g (35%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#7AA200] h-full rounded-full" style={{ width: '35%' }} />
                    </div>
                  </div>

                  {/* Jaggery */}
                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span className="font-medium">Jaggery (Unrefined Biological Minerals)</span>
                      <span className="font-mono text-lime-450 font-bold text-amber-400">200g (20%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '20%' }} />
                    </div>
                  </div>

                  {/* Nuts */}
                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span className="font-medium">Dry Cashews, Almonds & Roasted Peanuts</span>
                      <span className="font-mono text-lime-450 font-bold text-orange-400">250g (25%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '25%' }} />
                    </div>
                  </div>

                  {/* Raisins & Pumpkin Seeds */}
                  <div>
                    <div className="flex justify-between text-neutral-300 mb-1">
                      <span className="font-medium">Pumpkin Seeds & Antioxidant Raisins</span>
                      <span className="font-mono text-lime-450 font-bold text-purple-400">175g (17.5%)</span>
                    </div>
                    <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: '17.5%' }} />
                    </div>
                  </div>

                  {/* Pink Salt & Spices */}
                  <div className="flex flex-col gap-1 pt-1 text-neutral-400 text-[11px] font-mono">
                    <div className="flex justify-between">
                      <span>• Pink Himalayan Salt & Ceylon Cinnamon (0.5% Each)</span>
                      <span className="text-white">1% (10g)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>• Puffed Rice Crisp Base (Supportive Texture)</span>
                      <span className="text-white">1.5% (15g)</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between text-[10px] font-mono text-neutral-500 gap-2">
                  <span>CERTIFIED MANUFACTURE PARTNER:</span>
                  <a href="https://www.karmanepalfoods.com" target="_blank" rel="noopener noreferrer" className="text-white hover:underline transition-all">
                    KARMA FOODS CO., KATHMANDU, NEPAL
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3 — BEST SELLERS: PRODUCT CARDS */}
      <section className="py-20 px-4 sm:px-6" id="bestsellers">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 text-left">
            <div>
              <span className="text-xs font-mono text-lime-400 tracking-widest font-bold uppercase block mb-1">FITNESS COMMUNITY SELECTION</span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none">
                Best Sellers <span className="text-neutral-500 font-light">(Box of 12 Bars)</span>
              </h2>
            </div>
            
            <button 
              onClick={() => navigateTo('shop')}
              className="group text-lime-400 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase mt-4 md:mt-0 transition-all hover:translate-x-1 cursor-pointer bg-transparent border-0"
              id="view-all-flavors-link"
            >
              <span>View All 5 Specialized Flavors</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8" id="bestsellers-grid">
            {bestSellers.map((product) => {
              const isWishlisted = wishlist.includes(product.id);
              return (
                <div 
                  key={product.id}
                  className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:border-neutral-700/60 flex flex-col sm:flex-row text-left group"
                  id={`product-card-${product.id}`}
                >
                  {/* Left Column Image (1:1 styling) */}
                  <div className="relative sm:w-1/2 aspect-square bg-[#121212] overflow-hidden flex items-center justify-center shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 bg-[#0a0a0a]/90 backdrop-blur text-xs font-mono font-bold px-3 py-1 rounded-full text-lime-400 border border-lime-400/20">
                      ★ {product.rating} (Verified Order)
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 bg-[#030303]/75 hover:bg-[#030303] text-neutral-400 hover:text-white p-2.5 rounded-full transition-colors cursor-pointer border-0"
                      aria-label="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'text-red-500 fill-red-500' : ''}`} />
                    </button>
                  </div>

                  {/* Right Column Body */}
                  <div className="p-6.5 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] font-mono font-semibold tracking-widest text-neutral-500 block uppercase mb-1">{product.flavor}</span>
                      <h3 className="font-display font-bold text-xl text-white tracking-tight leading-tight mb-2 group-hover:text-lime-400 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Nutritional Pill Elements */}
                      <div className="grid grid-cols-3 gap-2 px-1 py-1 bg-neutral-950 rounded-xl border border-white/5 mb-6 text-center text-xs font-mono">
                        <div className="py-1">
                          <span className="text-white block font-bold text-sm">{product.nutritionalFacts.protein}g</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Protein</span>
                        </div>
                        <div className="border-l border-white/5 py-1">
                          <span className="text-white block font-bold text-sm">{product.nutritionalFacts.sugar}g</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Sugars</span>
                        </div>
                        <div className="border-l border-white/5 py-1">
                          <span className="text-lime-400 block font-bold text-sm">{product.nutritionalFacts.calories}</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-semibold">Cal</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {/* Pricing block */}
                      <div className="flex items-baseline gap-2.5 mb-4">
                        <span className="text-xl font-bold font-mono text-white">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-neutral-500 font-sans">or <span className="text-lime-400 font-bold">${product.subscriptionPrice.toFixed(2)}</span> with auto-delivery</span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            addToCart(product, 1, false);
                          }}
                          className="flex-1 bg-white hover:bg-neutral-200 text-black py-2.5 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          title="Add to Cart"
                        >
                          <ShoppingBag className="w-4 h-4 text-black" />
                          <span>Buy Box</span>
                        </button>
                        
                        <button
                          onClick={() => navigateTo('shop', { productId: product.id })}
                          className="bg-neutral-800 hover:bg-neutral-700 hover:text-white text-neutral-300 p-2.5 rounded-xl transition-colors cursor-pointer border border-white/5"
                          title="View Nutritional Facts"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DYNAMIC BIOLOGICAL FLAVOR RECOMMENDATIONS */}
      <FlavorRecommender variant="prominent" />

      {/* SECTION 4 — SOCIAL PROOF TICKERS & TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 bg-gradient-to-r from-neutral-950 via-[#101010] to-neutral-950 border-y border-white/5" id="social-proof">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">PROVEN BY 2,500+ RESILIENT LIFE-FORMS</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none mb-3">
              Trusted by Elite Physical Communities
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Read real user reviews from certified bodybuilders, busy corporate workers, competitive athletes, and health researchers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left" id="testimonial-highlights">
            
            {/* Review 1 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-lime-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-lime-400" />)}
                </div>
                <h4 className="font-display font-semibold text-white mb-2">“Astonishing gastric integrity”</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  “I lift weights twice daily. Standard high-sugar whey bars leave me painfully bloated during core lifts. Dr Bar's peanut formula absorption is incredibly clean, allowing deep squats without bloating.”
                </p>
              </div>
              
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=60&auto=format&fit=crop" 
                  alt="Reviewer Sarah Jenkins" 
                  className="w-10 h-10 rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-mono font-bold text-white">Sarah Jenkins, PT</span>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Verified Order / Denver</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-lime-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-lime-400" />)}
                </div>
                <h4 className="font-display font-semibold text-white mb-2">“My cognitive energy doesn't crash”</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  “The MCT oil infusion is brilliant. Eating one of these around 2 PM satisfies my sweet tooth and fuels my brain for intense afternoon spreadsheets. This is how premium snacking should work.”
                </p>
              </div>
              
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=60&auto=format&fit=crop" 
                  alt="Reviewer Alex Mercer" 
                  className="w-10 h-10 rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-mono font-bold text-white">Alex Mercer, COO</span>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Verified Subscriber / Boulder</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-neutral-900/50 border border-white/5 rounded-2xl p-6.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-lime-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-lime-400" />)}
                </div>
                <h4 className="font-display font-semibold text-white mb-2">“Best athletic macro profile”</h4>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-6">
                  “I've done clinical trials for biological recovery foods. Dr Bar holds up under peer review. Prebiotic tapioca yields a perfect blood level response compared to synthetic sucrose alcohols.”
                </p>
              </div>
              
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=60&auto=format&fit=crop" 
                  alt="Reviewer Derrick Vance" 
                  className="w-10 h-10 rounded-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-mono font-bold text-white">Prof. Derrick Vance</span>
                  <span className="block text-[10px] font-mono text-neutral-500 uppercase">Verified Order / Portland</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5 — INGREDIENT SPOTLIGHT (Floating items list) */}
      <section className="py-20 px-4 sm:px-6" id="ingredients-spotlight">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          <div className="lg:w-1/2 text-left" id="ingredient-spotlight-copy">
            <span className="text-xs font-mono text-lime-400 tracking-widest font-bold uppercase block mb-1">UNCOMPROMISING SELECTIONS</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white mb-6">
              Only Honest Raw Ingredients
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
              We list everything with complete clarity. Dr Bar is free of soy lecithin, heavy industrial palm oils, animal collagens, and chemical binders. We build flavor structure using dense, nutritious superfoods.
            </p>

            <div className="space-y-4" id="custom-ingredients-list-bullets">
              <div className="flex gap-4">
                <div className="bg-lime-400/10 text-lime-400 p-2 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">Grass-Fed Whey Isolate Peptides</h4>
                  <p className="text-neutral-400 text-xs sm:text-sm">Processed cleanly at cold temperatures to protect micro-protein fractions like GMac and immunoglobulins.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-lime-400/10 text-lime-400 p-2 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">Whole Organic Cashews & Hazelnuts</h4>
                  <p className="text-neutral-400 text-xs sm:text-sm">Slow-roasted dry to extract natural cardiovascular-protective monounsaturated oils.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-lime-400/10 text-lime-400 p-2 rounded-lg shrink-0 h-10 w-10 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white">Japanese Uji Matcha Grounding</h4>
                  <p className="text-neutral-400 text-xs sm:text-sm">Provides high reserves of polyphenol catechins and L-theanine for physical stamina.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigateTo('nutrition')}
              className="mt-8 bg-neutral-900 border border-white/10 hover:border-lime-400 text-xs font-mono font-bold tracking-widest uppercase px-6 py-3.5 rounded-full text-white transition-all cursor-pointer inline-block"
              id="view-science-btn"
            >
              Analyze Nutritional Chemistry &rarr;
            </button>
          </div>

          <div className="lg:w-1/2 relative flex justify-center py-6 sm:py-0" id="ingredient-spot-graphics">
            <div className="absolute w-[280px] h-[280px] bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6.5 w-full max-w-md text-left shadow-2xl relative" id="ingredient-factbox-card">
              <span className="text-[10px] font-mono text-lime-400 font-bold block mb-1">NUTRITIONAL COMPLIANCE FOR PATIENTS</span>
              <h3 className="font-display font-bold text-xl text-white mb-6">PB Caramel Salt Facts</h3>
              
              <div className="space-y-3 font-mono text-xs sm:text-sm" id="chemical-rows">
                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-neutral-400">Biological Energy (Calories)</span>
                  <span className="text-white font-bold">190 kCal</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-neutral-400">Ultra-Pure Peptide Protein</span>
                  <span className="text-lime-400 font-black">21 grams</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-neutral-400">Absorbable Sugars</span>
                  <span className="text-white font-bold">1 gram</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-neutral-400">Dietary Soluble Prebiotic Fiber</span>
                  <span className="text-white font-bold">9 grams</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2.5">
                  <span className="text-neutral-400">Saturated Carrier Lipids (MCTs)</span>
                  <span className="text-white">1.5 grams</span>
                </div>
                <div className="flex justify-between pb-1 text-[10px] text-neutral-500">
                  <span>* Percentage of Daily Values based on a 2,000 calorie athletic routine.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW IT FITS YOUR LIFESTYLE (Interactive Tabs) */}
      <section className="py-20 px-4 sm:px-6 bg-[#0a0a0a]" id="lifestyle-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-mono text-lime-400 tracking-widest font-bold uppercase block mb-1">VERSATILITY IN TARGETS</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight leading-none mb-3">
              Powering Every Activity
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm">
              Dr Bar solves nutritional deficits regardless of constraints. Select your active routine to see the performance path.
            </p>
          </div>

          {/* Interactive Navigation Grid Layout */}
          <div className="flex flex-wrap justify-center gap-3 mb-10" id="lifestyle-tab-triggers">
            {(['gym', 'office', 'travel', 'workout'] as const).map((tab) => {
              const uppercaseTab = tab.toUpperCase();
              return (
                <button
                  key={tab}
                  onClick={() => setActiveLifestyleTab(tab)}
                  className={`font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-6 rounded-xl cursor-pointer transition-all border ${
                    activeLifestyleTab === tab 
                      ? 'bg-lime-400 text-black border-lime-400 font-bold shadow' 
                      : 'bg-neutral-900 text-neutral-400 border-white/5 hover:border-white/10 hover:text-white'
                  }`}
                  id={`lifestyle-tab-trigger-${tab}`}
                >
                  {uppercaseTab}
                </button>
              );
            })}
          </div>

          {/* Animated Tab Panel Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-neutral-900/55 border border-white/5 rounded-3xl p-6 sm:p-10 text-left" id="lifestyle-tab-view">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded font-bold uppercase tracking-wide">
                ACTIVE INTEGRATION MODULE
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3.5xl text-white tracking-tight">
                {currentTab.title}
              </h3>
              <p className="text-lime-300/95 font-mono text-xs font-medium uppercase tracking-wide">
                {currentTab.tagline}
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {currentTab.description}
              </p>
              <div className="bg-neutral-950 border border-white/5 rounded-xl p-4 flex items-center gap-2.5 max-w-md font-mono text-xs">
                <span className="text-lime-400 font-bold shrink-0">OPTIMAL RANGE:</span>
                <span className="text-neutral-300">{currentTab.stats}</span>
              </div>
            </div>

            {/* Right graphic column */}
            <div className="lg:col-span-5 h-[240px] sm:h-[300px] rounded-2xl overflow-hidden relative">
              <img 
                src="/src/assets/images/dr_bar_lifestyle_1779685447822.png" 
                alt="Athlete enjoying Dr Bar workout energy" 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent flex items-end p-6">
                <div>
                  <span className="text-[10px] font-mono text-lime-400 font-bold block uppercase mb-1">ATHLETE IN FOCUS</span>
                  <span className="font-display font-bold text-white text-base">Elite Fuel Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — SUBSCRIPTION MODEL & COMBINATIONS */}
      <section className="py-20 px-4 sm:px-6" id="subscription-plan-ad">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-3xl p-6 sm:p-12 text-left relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12" id="subscription-bundle-panel">
            <div className="absolute top-0 right-0 w-80 h-80 bg-lime-400/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="max-w-xl space-y-4" id="subscription-bundle-copy">
              <span className="text-xs font-mono text-lime-400 font-bold tracking-widest uppercase block">LOYALTY ENERGY SAVINGS</span>
              <h2 className="font-display font-bold text-3xl sm:text-4.5xl text-white tracking-tight leading-none">
                Subscribe & Save 15% Free
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Receive continuous fresh boxes dynamically customized to your recovery targets on weekly or monthly schedules. Avoid missing physical milestones when stock shortages hit regional gyms.
              </p>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5" id="subscription-value-bullets">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-lime-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium font-sans">Save 15% on every box</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-lime-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium font-sans">Swap flavors anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-lime-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium font-sans">Cancel or pause in 1-click</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-lime-400 shrink-0" />
                  <span className="text-xs sm:text-sm text-neutral-300 font-medium font-sans">Free priority cold shipping</span>
                </div>
              </div>

              {/* Bundle list triggers */}
              <div className="space-y-4 pt-4">
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-widest block">CHOOSE AN INTERACTIVE BUNDLE BOX</span>
                {bundleOffers.map(bundle => (
                  <div 
                    key={bundle.id}
                    className="bg-black/40 border border-white/5 rounded-xl p-4.5 hover:border-lime-400/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="bg-lime-400 text-black text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full block w-fit mb-1.5">{bundle.badge}</span>
                      <h4 className="font-display font-bold text-white text-sm tracking-tight">{bundle.name}</h4>
                      <p className="text-neutral-400 text-xs mt-1.5 leading-snug">{bundle.description}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 py-1.5 sm:py-0">
                      <div className="text-right">
                        <span className="text-white block font-mono font-bold text-base sm:text-lg">${bundle.price.toFixed(2)}</span>
                        <span className="text-[9px] font-mono text-neutral-500 block uppercase line-through">Reg. ${bundle.originalPrice.toFixed(2)}</span>
                      </div>
                      <button
                        onClick={() => {
                          addBundleToCart(bundle.id, 1, false);
                          navigateTo('shop'); // Go to shop to see cart details
                        }}
                        className="bg-lime-400 hover:bg-lime-300 text-black text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-lg transition-all cursor-pointer"
                      >
                        Grab Bundle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side visual call for Subscriptions */}
            <div className="w-full lg:w-96 bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-white/5 space-y-6 shrink-0" id="subscription-card-formbox">
              <span className="text-lime-400 font-mono text-xs uppercase block font-bold leading-none">AUTO-RECOVERY SCHEDULE</span>
              <h3 className="font-display font-bold text-lg text-white">Dynamic Loyalty Sign-Up</h3>
              
              <div className="space-y-3 font-sans text-xs">
                <div className="p-3.5 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-white">Weekly Routine Reload</span>
                    <span className="text-neutral-500">Perfect for heavy gym schedules</span>
                  </div>
                  <span className="text-lime-400 font-bold font-mono text-sm">Save 15%</span>
                </div>
                
                <div className="p-3.5 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-white">Every 2 Weeks Cycle</span>
                    <span className="text-neutral-500">Best for professional travelers</span>
                  </div>
                  <span className="text-lime-400 font-bold font-mono text-sm">Save 15%</span>
                </div>

                <div className="p-3.5 bg-lime-400/5 border border-lime-400/20 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-bold block text-lime-400">Monthly Restock (1 Box)</span>
                    <span className="text-neutral-400">Standard community baseline</span>
                  </div>
                  <span className="bg-lime-400 text-black text-[10px] font-bold px-2 py-0.5 rounded uppercase font-sans">Best Deal</span>
                </div>
              </div>

              <button 
                onClick={() => navigateTo('subscriptions')}
                className="w-full bg-lime-400 hover:bg-lime-300 text-black font-bold uppercase text-xs tracking-wider py-4 rounded-xl transition-all cursor-pointer text-center"
              >
                Configure My Delivery Plan &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — EMAIL NEWSLETTER CAPTURE (Handled elegantly via Footer newsletter section) */}

      {/* SECTION 9 — FINAL COMPELLING EMOTIONAL CTA */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden border-t border-white/5" id="final-motivational-cta">
        <div className="absolute inset-0 bg-[#0c0c0c]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-lime-400/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-[#a3e635] uppercase font-bold block mb-2">DR BAR COMPLIANCE MOVEMENT</span>
          <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-white max-w-2xl mx-auto leading-none">
            Snack Smarter.<br/>
            Fuel Better.
          </h2>
          
          <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Eliminate low-quality artificial chemicals from your athletic life. Unlock sustained biological physical performance with Dr Bar today.
          </p>
          
          <div className="pt-4">
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-sans font-bold text-sm uppercase tracking-wider py-5 px-10 rounded-full transition-all duration-300 space-x-1 hover:scale-105 cursor-pointer shadow-lg shadow-lime-400/15"
              id="final-shop-btn"
            >
              <span>Join the Dr Bar Movement</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 text-[11px] font-mono text-neutral-500">
            <span>✅ FDA REGISTERED FACILITY</span>
            <span>⚡ COMPLIMENTARY BOX INSURANCE</span>
            <span>🔒 256-BIT SECURE GATEWAY</span>
          </div>
        </div>
      </section>

    </div>
  );
};
