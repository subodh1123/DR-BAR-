import React from 'react';
import { useShop } from '../context/ShopContext';
import { Award, ShieldAlert, Check, Leaf, Star, ChevronRight } from 'lucide-react';

export const About: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="about-us-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* 1. Header Banner */}
        <div className="space-y-4" id="about-intro-title">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">DR BAR ROOTS</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-white leading-none">
            Humanized confidency.<br/>
            <span className="text-neutral-500 font-light">No fake chemical shortcuts.</span>
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Dr Bar was founded in 2024 by a coalition of metabolic research doctors and high-performance athletic trainers frustrated with the deceptive marketing of commercial energy bars.
          </p>
        </div>

        {/* 2. Visual Split & Core Manifesto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center border-t border-b border-white/5 py-12" id="about-manifesto-split">
          <div className="space-y-4">
            <h3 className="font-display font-medium text-lime-400 text-lg uppercase tracking-wider">The Founders Manifesto</h3>
            <p className="text-neutral-300 text-sm leading-relaxed font-sans">
              “We analyzed over five hundred commercial 'healthy' snack bars and were astounded by our findings. More than 92% used cheap soy binders that alter endocrine balances, and heavily processed sucrose syrups that lead to metabolic fatigue inside forty minutes. The remaining 8% used sucralose—a chemical artificial sweetener that clinical trials prove deteriorates digestive microflora.”
            </p>
            <span className="block text-xs font-mono text-neutral-550 italic">&mdash; Dr. Elena Rostov, Co-Founder & Metabolic Physiologist</span>
          </div>

          <div className="h-[280px] rounded-2xl overflow-hidden border border-white/5 bg-[#121212] relative">
            <img 
              src="/src/assets/images/dr_bar_lifestyle_1779685447822.png" 
              alt="Founders clinical space" 
              className="w-full h-full object-cover grayscale brightness-90 saturate-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 bg-neutral-950/80 p-4 font-mono text-[10px] text-neutral-400 text-center">
              Dr Bar Active Biosafety Research Group - Boulder, CO
            </div>
          </div>
        </div>

        {/* 3. Three Core Brand Values */}
        <div className="space-y-6" id="about-values">
          <h3 className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">Our Professional Scientific Mandates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="about-values-grid">
            <div className="p-6 bg-neutral-905 border border-white/5 rounded-2xl space-y-3">
              <span className="text-lime-300 font-mono text-xl font-bold">01/</span>
              <h4 className="font-display font-bold text-white text-base">Ingredient Transparency</h4>
              <p className="text-neutral-405 text-xs sm:text-xs leading-relaxed">We disclose everything down to the microgram. No hidden processing aids, no unlisted flavor agents, no soy lecithins. Standard medical grade honesty.</p>
            </div>

            <div className="p-6 bg-neutral-905 border border-white/5 rounded-2xl space-y-3">
              <span className="text-lime-300 font-mono text-xl font-bold">02/</span>
              <h4 className="font-display font-bold text-white text-base">Glycemic Safety</h4>
              <p className="text-neutral-405 text-xs sm:text-xs leading-relaxed">Our bars must maintain flat, stable blood glucose responses in clinical testers. Sweetness is achieved purely with biological stevia and raw monk fruit extracts.</p>
            </div>

            <div className="p-6 bg-neutral-905 border border-white/5 rounded-2xl space-y-3">
              <span className="text-lime-300 font-mono text-xl font-bold">03/</span>
              <h4 className="font-display font-bold text-white text-base">Bio-Active Nutrition</h4>
              <p className="text-neutral-405 text-xs sm:text-xs leading-relaxed">Every ingredient used must promote muscle synthesis, cardiac vascular output, or cellular joint hydration. Zero fillers or artificial thickness starches.</p>
            </div>
          </div>
        </div>

        {/* 4. Timeline list */}
        <div className="space-y-8" id="about-timeline">
          <h3 className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">The Development Sequence</h3>
          
          <div className="space-y-6 progress-timeline border-l-2 border-white/5 pl-6" id="about-milestones">
            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-lime-400 border-4 border-black" />
              <span className="text-lime-400 font-mono text-xs font-bold block mb-1">June 2024 &mdash; Lab Inception</span>
              <h4 className="font-display font-bold text-white text-sm">Formulating the core Whey Peptide Matrix</h4>
              <p className="text-neutral-400 text-xs mt-1">We completed clinical tests isolating bioactive whey peptide fractions from organic dairy isolates, ensuring high cellular bioavailability.</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-lime-400 border-4 border-black" />
              <span className="text-lime-400 font-mono text-xs font-bold block mb-1">January 2025 &mdash; Peanut and Cocoa trials</span>
              <h4 className="font-display font-bold text-white text-sm">Perfecting flavor profiles without Sucralose or Maltitol</h4>
              <p className="text-neutral-400 text-xs mt-1">Tested seventy-two natural prebiotic mixtures to achieve delicious salt-sweet balance using only Monk fruit and raw Himalayan crystallization.</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-lime-400 border-4 border-black" />
              <span className="text-lime-400 font-mono text-xs font-bold block mb-1">May 2026 &mdash; Active Release</span>
              <h4 className="font-display font-bold text-white text-sm">Approved for high-stakes athletic supply</h4>
              <p className="text-neutral-400 text-xs mt-1">Dr Bar launches e-commerce operations in the US, delivering fresh cold-packed boxes directly to local gym goers, triathletes, and busy professionals.</p>
            </div>
          </div>
        </div>

        {/* 5. CTA Ending */}
        <div className="bg-neutral-900 border border-white/5 rounded-2xl p-8 text-center space-y-4" id="about-cta-footer">
          <h3 className="font-display font-bold text-xl text-white">Perform With Complete Confidence</h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-lg mx-auto">Skip the chemical junk food. Feed your cellular repair mechanics with clean formulas built with scientific rigor.</p>
          <button 
            onClick={() => navigateTo('shop')}
            className="bg-lime-400 hover:bg-lime-300 text-black text-xs font-mono font-bold uppercase tracking-widest px-8 py-3.5 rounded-full transition-all cursor-pointer inline-block mt-2"
          >
            Review Clinical Formulations
          </button>
        </div>

      </div>
    </div>
  );
};
