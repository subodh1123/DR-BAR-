import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Heart, Info, AlertTriangle, HelpCircle, ChevronRight, Check } from 'lucide-react';
import { NutritionCalculator } from '../components/NutritionCalculator';

export const Nutrition: React.FC = () => {
  const { navigateTo } = useShop();

  const comparisonData = [
    { metric: "Protein Source", drbar: "Cold-filtered whey isolate & Marine Collagen (High bioavailability)", regular: "Cheap soy isolate (potential thyroid blocker) & gelatin" },
    { metric: "Sugar Content", drbar: "Exactly 0g to 1g (Prebiotic roots sweetened)", regular: "15g to 25g High-Fructose Corn Syrup, sugar alcohols" },
    { metric: "Digestive Profile", drbar: "Prebiotic chicory/tapioca fiber (Flat belly, prebiotic support)", regular: "Maltitol or Sorbitol (Causes painful bloating, gastric fermentation)" },
    { metric: "Energy Oil Carriers", drbar: "Pure MCT Brain Lipids (Immediate cognitive cellular fuel)", regular: "Highly hydrogenated palm kernel oil (high trans-fat marker)" },
    { metric: "Allergen Disclosures", drbar: "Certified Gluten-Free, Soy-Free, Non-GMO", regular: "Contains soy binders, corn starches, gluten stabilizers" }
  ];

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="nutrition-science-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title */}
        <div className="space-y-4" id="science-header">
          <span className="text-xs font-mono font-bold tracking-widest text-[#7AA200] block uppercase mb-1">CLINICAL DISCLOSURES</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            The Macromolecular Difference
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed">
            Our nutrition strategy prioritizes flat, stable glycemic indices combined with premium muscle rebuilding amino grids. See why athletic teams prefer Dr Bar over commercial snacks.
          </p>
        </div>

        {/* Biometric Interactive Nutrition Calculator */}
        <NutritionCalculator />

        {/* 1. Comparison Matrix table */}
        <div className="space-y-6" id="chemical-comparison-sheet">
          <h3 className="text-xs font-mono text-neutral-550 font-bold uppercase tracking-widest flex items-center gap-2">
            <Info className="w-4 h-4 text-lime-400" /> BIO-DYNAMIC RAW TESTING SHEETS
          </h3>
          
          <div className="border border-white/5 rounded-2xl overflow-hidden bg-neutral-900 shadow-2xl" id="comparison-table-wrapper">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse" id="comparison-table-actual">
                <thead>
                  <tr className="bg-black text-neutral-450 border-b border-white/5 font-mono text-[10px] uppercase tracking-wider">
                    <th className="p-4 sm:p-5">FORMULATION PARAMETER</th>
                    <th className="p-4 sm:p-5 text-lime-400">DR BAR SPECIFICATIONS</th>
                    <th className="p-4 sm:p-5 text-neutral-500">STANDARD FITNESS SNACKS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/2">
                      <td className="p-4 sm:p-5 font-mono font-bold text-white uppercase text-[11px] tracking-wide">{row.metric}</td>
                      <td className="p-4 sm:p-5 text-neutral-200">
                        <span className="flex items-start gap-1.5 leading-snug">
                          <span className="w-2.5 h-2.5 rounded-full bg-lime-400/20 text-lime-450 flex items-center justify-center font-bold text-[9px] shrink-0 mt-1">✓</span>
                          <span>{row.drbar}</span>
                        </span>
                      </td>
                      <td className="p-4 sm:p-5 text-neutral-400 font-light">
                        <span className="flex items-start gap-1.5 leading-snug">
                          <span className="text-red-500 shrink-0 mt-0.5">&times;</span>
                          <span>{row.regular}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 2. Key Bioactive Lipids explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="bioactive-elements-disclosure">
          
          <div className="bg-neutral-900 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-4" id="clean-lipids">
            <div className="bg-lime-450/15 text-lime-300 w-fit p-2.5 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">Biological Soluble Clean prebiotics</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              We replace cheap high-fructose corn binders with prebiotic soluble fibers extracted from organic chicory roots and tapioca plants. Prebiotics pass cleanly into your large intestine, feeding good probiotic cultures like bifidobacteria. This protects your immune barrier while delivering essential metabolic fuel values.
            </p>
          </div>

          <div className="bg-neutral-900 border border-white/5 p-6 sm:p-8 rounded-2xl space-y-4" id="mct-brain">
            <div className="bg-lime-450/15 text-lime-300 w-fit p-2.5 rounded-xl">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-white">MCT Carrier Lipid Matrix</h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Medium-Chain Triglycerides (MCT Oil) are saturated lipid compounds holding a shorter length chain. Because of this smaller chemical profile, MCTs bypass slow intestinal digesting processes, going directly to your liver to burn into ketone brain particles. This ensures sustained athletic alertness and fat-oxidation levels.
            </p>
          </div>

        </div>

        {/* 3. Eviction Lists (Why we banned raw compounds) */}
        <div className="space-y-6" id="evictionlist-section">
          <div className="border border-red-500/10 bg-red-500/5 rounded-2xl p-6 sm:p-8 text-left space-y-4" id="banned-compounds-disclosure">
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <h3 className="font-display font-bold text-lg tracking-tight uppercase font-mono text-red-400">Banned Industry Compositions</h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Dr Bar maintains an absolute biological embargo on the following hazardous compounds routinely found in competitor energy foods:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono" id="banned-bullets">
              <li className="flex gap-2 text-slate-300 leading-snug">
                <span className="text-red-500 font-bold shrink-0">&times;</span>
                <div>
                  <strong className="text-white block uppercase text-[10px]">MALTITOL & ERYTHRITOL SYRUP</strong>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">High-fermentation alcohols causing severe flatulence and bloating parameters.</span>
                </div>
              </li>
              <li className="flex gap-2 text-slate-300 leading-snug">
                <span className="text-red-500 font-bold shrink-0">&times;</span>
                <div>
                  <strong className="text-white block uppercase text-[10px]">SOY PROTEIN BINDING FLOUR</strong>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">Gluten-bonded texturizers that limit leucine release velocities during recovery.</span>
                </div>
              </li>
              <li className="flex gap-2 text-slate-300 leading-snug">
                <span className="text-red-500 font-bold shrink-0">&times;</span>
                <div>
                  <strong className="text-white block uppercase text-[10px]">HYDROGENATED COCONUT PALM OIL</strong>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">Cheap industrial cooking saturated fats blockading essential lipid pathways.</span>
                </div>
              </li>
              <li className="flex gap-2 text-slate-300 leading-snug">
                <span className="text-red-500 font-bold shrink-0">&times;</span>
                <div>
                  <strong className="text-white block uppercase text-[10px]">SUCRALOSE (ARTIFICIAL SWEETENER)</strong>
                  <span className="text-neutral-500 block text-[11px] mt-0.5">Synthetic chlorinated molecular compound shown to decrease stomach lining integrity.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* 4. Action CTA */}
        <div className="bg-[#0e0e0e] border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6" id="clean-nutrition-cta">
          <div className="max-w-xl text-left">
            <h3 className="font-display font-medium text-white text-xl">Ready for Pure Bioactive Energy?</h3>
            <p className="text-neutral-400 text-xs mt-2.5">Feed your active lifestyle. Select your customized box delivery scheme now.</p>
          </div>
          <button 
            onClick={() => navigateTo('shop')}
            className="w-full md:w-auto bg-lime-400 hover:bg-lime-300 text-black font-sans font-bold text-xs uppercase tracking-wider px-8 py-4.5 rounded-xl transition-all cursor-pointer text-center shrink-0"
          >
            Claim Certified Box Now &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};
