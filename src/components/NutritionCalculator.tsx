import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList } from '../data/products';
import { Zap, ChevronRight, Check } from 'lucide-react';

export const NutritionCalculator: React.FC = () => {
  const { addToCart } = useShop();

  // Input states
  const [age, setAge] = useState<number>(26);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<number>(165);
  const [weightUnit, setWeightUnit] = useState<'lbs' | 'kg'>('lbs');
  const [height, setHeight] = useState<number>(70); // inches or cm
  const [heightUnit, setHeightUnit] = useState<'inches' | 'cm'>('inches');
  const [activity, setActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'extreme'>('moderate');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('gain');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  // Constants
  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    extreme: 1.9,
  };

  const activityLabels = {
    sedentary: "Sedentary (desk job, low exercise)",
    light: "Lightly Active (light exercise 1-3 days/week)",
    moderate: "Moderately Active (intense training 3-5 days/week)",
    active: "Very Active (hard daily athletic workouts)",
    extreme: "Extremely Active (elite double training or hard labor)",
  };

  // Calculations
  const results = useMemo(() => {
    // Standardized weight in kg
    const wKg = weightUnit === 'lbs' ? weight * 0.45359237 : weight;
    const wLbs = weightUnit === 'lbs' ? weight : weight / 0.45359237;

    // Standardized height in cm
    const hCm = heightUnit === 'inches' ? height * 2.54 : height;

    // BMR via Mifflin-St Jeor Equation
    let bmr = 10 * wKg + 6.25 * hCm - 5 * age;
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // TDEE
    const tdee = bmr * activityFactors[activity];

    // Target Calorie adjustment
    let targetCalories = Math.round(tdee);
    if (goal === 'lose') {
      targetCalories = Math.round(tdee - 500);
      // Floor calorie safety limits
      const minKcal = gender === 'male' ? 1500 : 1200;
      if (targetCalories < minKcal) targetCalories = minKcal;
    } else if (goal === 'gain') {
      targetCalories = Math.round(tdee + 350);
    }

    // Protein target (1.0g per lb for cutting/muscle gain, 0.8g for maintenance)
    let proteinMultiplier = 0.85;
    if (goal === 'lose') proteinMultiplier = 1.0; // High protein in deficit to preserve lean mass
    if (goal === 'gain') proteinMultiplier = 1.1;  // Hypertrophy positive nitrogen state
    
    let targetProtein = Math.round(wLbs * proteinMultiplier);
    // Limit to safe realistic percentage
    const maxProteinByKcal = Math.round((targetCalories * 0.35) / 4);
    if (targetProtein > maxProteinByKcal) targetProtein = maxProteinByKcal;

    // Fats (approx 25% of total calories)
    const targetFats = Math.round((targetCalories * 0.25) / 9);

    // Carbs (the remainder of daily energy)
    const activeKcalLeft = targetCalories - (targetProtein * 4) - (targetFats * 9);
    const targetCarbs = Math.max(Math.round(activeKcalLeft / 4), 50);

    // Mapped product recommendation
    let recommendedProduct = productsList[0]; // PB Caramel is default bestseller
    let reason = "Peanut Butter Caramel Salt's dual-stage high bio-availability whey proteins perfectly load dynamic nitrogen amino chains onto active cardiac recovery windows.";

    if (goal === 'lose') {
      recommendedProduct = productsList[2]; // Lime Matcha Active Renew (180 kcal, 20g protein, lowest cal)
      reason = "Lime Matcha Active Renew offers the absolute leanest biological macro profiles (only 180 kcal) infused with active Uji Matcha EGCG green compounds that naturally boost slow lipid oxidation rates during calorie deficits.";
    } else if (goal === 'gain') {
      recommendedProduct = productsList[1]; // Intense Dark Fudge & Cocoa (22g protein)
      reason = "Intense Dark Fudge & Cocoa features Dr Bar's highest density 22g ultra-filtered protein peptide sequence coupled with premium antioxidant cocoa to support peak cognitive focus and muscle fiber hypertrophy.";
    } else if (activity === 'active' || activity === 'extreme') {
      recommendedProduct = productsList[3]; // Salted Toffee Almond Bold (Endurance matrix)
      reason = "Salted Toffee Almond Bold features a complex low-index carb binder and mineral-dense almonds specifically formatted to protect long-duration endurance limits from muscle collapse.";
    }

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      calories: targetCalories,
      protein: targetProtein,
      carbs: targetCarbs,
      fat: targetFats,
      recommendedProduct,
      reason
    };
  }, [age, gender, weight, weightUnit, height, heightUnit, activity, goal]);

  const handleAddToCart = (product: typeof productsList[0]) => {
    addToCart(product, 1, false);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 2500);
  };

  return (
    <div className="bg-white border border-black/10 p-6 sm:p-10 text-left my-8 font-sans" id="nutrition-engine-calculator-wrapper">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="border-b border-black/5 pb-6">
          <span className="inline-block bg-[#D9FE00] text-black text-[10px] font-mono tracking-widest font-black uppercase px-2 py-0.5 mb-2 rounded-none">
            BIOMETRIC ANALYSIS MODULE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-black tracking-tight leading-none uppercase">
            Interactive Muscle Fuel & Macroengine
          </h2>
          <p className="text-[#0A0A0A]/60 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
            Input your biological parameters below. Our clinical-grade macro engine calculates your exact metabolic TDEE profiles and matches a precise Dr Bar integration program.
          </p>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-5">
            <h3 className="text-xs font-mono tracking-widest uppercase font-bold text-black border-l-2 border-black pl-2">
              1. Biometric Demographics
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Gender</label>
                <div className="grid grid-cols-2 bg-[#F5F5F4] p-1 border border-black/5 rounded-none">
                  <button
                    type="button"
                    onClick={() => setGender('male')}
                    className={`py-1.5 px-3 text-xs font-bold uppercase transition-all focus:outline-none ${
                      gender === 'male' 
                        ? 'bg-[#0A0A0A] text-white' 
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    MALE
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('female')}
                    className={`py-1.5 px-3 text-xs font-bold uppercase transition-all focus:outline-none ${
                      gender === 'female' 
                        ? 'bg-[#0A0A0A] text-white' 
                        : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    FEMALE
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Age</label>
                <input
                  type="number"
                  min="12"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Math.max(12, parseInt(e.target.value) || 0))}
                  className="bg-white border border-black/10 py-1.5 px-3 text-xs font-mono font-bold w-full rounded-none focus:border-black text-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Weight</label>
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="500"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(1, parseInt(e.target.value) || 0))}
                    className="bg-white border border-black/10 py-1.5 pl-3 pr-12 text-xs font-mono font-bold w-full rounded-none focus:border-black text-center"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (weightUnit === 'lbs') {
                        setWeightUnit('kg');
                        setWeight(Math.round(weight * 0.453592));
                      } else {
                        setWeightUnit('lbs');
                        setWeight(Math.round(weight / 0.453592));
                      }
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold bg-[#0A0A0A]/5 px-1.5 py-0.5 hover:bg-[#0A0A0A]/10 border border-black/10"
                  >
                    {weightUnit.toUpperCase()}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Height</label>
                <div className="relative">
                  <input
                    type="number"
                    min="30"
                    max="300"
                    value={height}
                    onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 0))}
                    className="bg-white border border-black/10 py-1.5 pl-3 pr-16 text-xs font-mono font-bold w-full rounded-none focus:border-black text-center"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (heightUnit === 'inches') {
                        setHeightUnit('cm');
                        setHeight(Math.round(height * 2.54));
                      } else {
                        setHeightUnit('inches');
                        setHeight(Math.round(height / 2.54));
                      }
                    }}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold bg-[#0A0A0A]/5 px-1.5 py-0.5 hover:bg-[#0A0A0A]/10 border border-black/10"
                  >
                    {heightUnit.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs font-mono tracking-widest uppercase font-bold text-black border-l-2 border-black pl-2">
              2. Activity & Biomotions
            </h3>

            <div>
              <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5">Weekly Active Levels</label>
              <select
                value={activity}
                onChange={(e: any) => setActivity(e.target.value)}
                className="bg-white border border-black/10 py-1.5 px-3 text-xs font-bold w-full rounded-none focus:border-black"
              >
                <option value="sedentary">Sedentary (desk job, low exercise)</option>
                <option value="light">Lightly Active (light exercise 1-3 days/week)</option>
                <option value="moderate">Moderately Active (intense training 3-5 days/week)</option>
                <option value="active">Very Active (hard daily athletic workouts)</option>
                <option value="extreme">Extremely Active (elite double sessions)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">Physical Muscle Goal</label>
              <div className="grid grid-cols-3 gap-2">
                {(['lose', 'maintain', 'gain'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGoal(g)}
                    className={`py-2 px-1 text-[10px] font-mono font-bold transition-all border shrink-0 ${
                      goal === g 
                        ? 'bg-[#0A0A0A] border-black text-white' 
                        : 'bg-[#F5F5F4] border-black/5 text-neutral-500 hover:text-black'
                    }`}
                  >
                    {g === 'lose' ? 'SHRED (FAT LOSS)' : g === 'maintain' ? 'MAINTAIN' : 'BULK ( lean muscle )'}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Output Targets Section */}
        {isCalculated && (
          <div className="bg-[#FAF9F6] border border-black/5 p-6 sm:p-8 space-y-6" id="calculator-results-sheet">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-black/5 p-4 text-center">
                <span className="block text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">Target Daily Energy</span>
                <span className="block font-display font-medium text-3xl text-black mt-2">{results.calories} kcal</span>
                <span className="block text-[9px] font-mono text-neutral-400 uppercase mt-1">To achieve goals</span>
              </div>

              <div className="bg-white border border-black/5 p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#D9FE00]" />
                <span className="block text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">Anabolic Protein</span>
                <span className="block font-display font-medium text-3xl text-[#0A0A0A] mt-2">{results.protein}g</span>
                <span className="block text-[9px] font-mono text-neutral-400 uppercase mt-1">({results.protein * 4} kcal target)</span>
              </div>

              <div className="bg-white border border-black/5 p-4 text-center">
                <span className="block text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">Complex Carbohydrates</span>
                <span className="block font-display font-medium text-3xl text-black mt-2">{results.carbs}g</span>
                <span className="block text-[9px] font-mono text-neutral-400 uppercase mt-1">({results.carbs * 4} kcal energy)</span>
              </div>

              <div className="bg-white border border-black/5 p-4 text-center">
                <span className="block text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">Clean Lipids (Fat)</span>
                <span className="block font-display font-medium text-3xl text-black mt-2">{results.fat}g</span>
                <span className="block text-[9px] font-mono text-neutral-400 uppercase mt-1">({results.fat * 9} kcal hormones)</span>
              </div>

            </div>

            {/* Dr Bar Product Integration Box */}
            <div className="border border-black/5 bg-white p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-3">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                  <Zap className="w-3.5 h-3.5 text-[#7AA200]" /> CLINICALLY VERIFIED BIOLOGICAL FIT
                </div>

                <h4 className="font-display font-bold text-lg text-black uppercase leading-tight">
                  Suggested Supplement: DR BAR {results.recommendedProduct.name.toUpperCase()}
                </h4>

                <p className="text-neutral-500 text-xs leading-relaxed">
                  {results.reason}
                </p>

                {/* Macro integration math stats */}
                <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-md text-left">
                  <div className="bg-[#F5F5F4]/70 p-2.5 border border-black/5">
                    <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">PROTEIN CONTRIBUTION</span>
                    <span className="block text-sm font-bold text-black mt-0.5">
                      +{results.recommendedProduct.nutritionalFacts.protein}g / Bar
                    </span>
                    <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">
                      ({((results.recommendedProduct.nutritionalFacts.protein / results.protein) * 100).toFixed(0)}% daily goal)
                    </span>
                  </div>

                  <div className="bg-[#F5F5F4]/70 p-2.5 border border-black/5">
                    <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">CALORIE OCCUPATION</span>
                    <span className="block text-sm font-bold text-black mt-0.5">
                      {results.recommendedProduct.nutritionalFacts.calories} kcal
                    </span>
                    <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">
                      ({((results.recommendedProduct.nutritionalFacts.calories / results.calories) * 100).toFixed(0)}% daily budget)
                    </span>
                  </div>

                  <div className="bg-[#F5F5F4]/70 p-2.5 border border-black/5">
                    <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">NET ADDED SUGAR</span>
                    <span className="block text-sm font-bold text-black mt-0.5">
                      {results.recommendedProduct.nutritionalFacts.sugar}g
                    </span>
                    <span className="block text-[8px] font-mono font-bold text-[#7AA200] uppercase">
                      ✓ spikes zero glycemic index
                    </span>
                  </div>
                </div>
              </div>

              {/* Recommended Product CTA */}
              <div className="md:col-span-4 flex flex-col items-center justify-center space-y-3.5 border-t md:border-t-0 md:border-l border-black/5 pt-4 md:pt-0 md:pl-6 text-center">
                <div className="relative w-32 aspect-square bg-[#F5F5F4] overflow-hidden border border-black/5 p-2 flex items-center justify-center shrink-0">
                  <img 
                    src={results.recommendedProduct.image} 
                    alt={results.recommendedProduct.name} 
                    className="w-full h-full object-cover shrink-0" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-1 left-1 bg-[#0a0a0a] text-white text-[7px] font-mono px-1 py-0.5 uppercase font-bold">
                    {results.recommendedProduct.nutritionalFacts.protein}g protein
                  </div>
                </div>

                <div className="text-center w-full">
                  <span className="block font-bold text-xs tracking-tight text-neutral-800 leading-snug">
                    {results.recommendedProduct.name}
                  </span>
                  <span className="block text-[10px] font-mono text-neutral-400 mt-0.5 uppercase tracking-wider">
                    Pack of 12 &bull; ${results.recommendedProduct.price.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(results.recommendedProduct)}
                  disabled={addedProductId !== null}
                  className="w-full py-2.5 text-[11px] font-bold text-white uppercase tracking-widest focus:outline-none transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 shrink-0"
                >
                  {addedProductId === results.recommendedProduct.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#D9FE00]" />
                      <span>ADDED TO CART!</span>
                    </>
                  ) : (
                    <>
                      <span>ADD FORMULA</span>
                      <ChevronRight className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
