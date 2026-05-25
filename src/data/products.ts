import { Product } from '../types';

export const productsList: Product[] = [
  {
    id: "peanut-butter-caramel-salt",
    name: "Peanut Butter Caramel Salt",
    flavor: "Peanut Butter, Salted Caramel & Roasted Almonds",
    tagline: "The Perfect Salty-Sweet Recovery Shield",
    price: 38.00, // Box of 12
    subscriptionPrice: 32.30, // 15% discount
    rating: 4.9,
    reviewsCount: 1420,
    description: "Our signature blend is a masterpiece of smart nutrition. Roasted crunch, silky peanut butter, and hand-harvested flaked sea salt. Formulated with clinical precision for rapid protein assimilation and biological value.",
    nutritionalFacts: {
      calories: 190,
      protein: 21,
      carbs: 4,
      fat: 6,
      sugar: 1, // 1g Sugars!
      fiber: 9
    },
    benefits: [
      { title: "21g Precision Protein", description: "Multi-stage release whey isolate & milk protein isolate to support sustained muscle protein synthesis." },
      { title: "Only 1g Natural Sugar", description: "Sweetened naturally with stevia extract and prebiotic tapioca fiber. Zero glycemic spikes." },
      { title: "MCT Carrier Fats", description: "Infused with pure medium-chain triglycerides for clean cellular energy and thermogenesis support." }
    ],
    ingredients: [
      "Grass-Fed Whey Protein Isolate",
      "Milk Protein Isolate",
      "Organic Roasted Peanuts",
      "Prebiotic Soluble Tapioca Fiber",
      "Glycerin (Vegetable Source)",
      "Medium Chain Triglycerides (MCT Oil)",
      "Flaked Sea Salt",
      "Natural Caramel Extract",
      "Stevia Leaf Sweetener",
      "Organic Ground Almonds"
    ],
    color: "bg-amber-500/10 border-amber-500/30",
    accentColor: "text-amber-500 border-amber-500 hover:bg-amber-500/10",
    badgeColor: "#f59e0b",
    image: "/src/assets/images/dr_bar_peanut_crunch_1779685431055.png",
    isBestSeller: true,
    isPopular: true,
    stock: 45
  },
  {
    id: "dense-dark-fudge-cocoa",
    name: "Intense Dark Fudge & Cocoa",
    flavor: "Fudge Chocolate, Cocoa Nibs & Roasted Hazelnut",
    tagline: "Uncompromised Pure Cocoa Neuro-Fuel",
    price: 38.00,
    subscriptionPrice: 32.30,
    rating: 4.8,
    reviewsCount: 980,
    description: "An intense cocoa experience designed for cognitive acuity and muscle replenishment. Packed with pure antioxidant-rich 80% dark cocoa nibs and our high-potency premium peptide protein blend.",
    nutritionalFacts: {
      calories: 195,
      protein: 22,
      carbs: 3,
      fat: 5.5,
      sugar: 0, // 0g sugar!
      fiber: 10
    },
    benefits: [
      { title: "22g Anti-Catabolic Protein", description: "Ultra-filtered peptides that bypass digestion directly into blood circulation." },
      { title: "Polyphenol Dense Cocoa", description: "Improves cerebral blood flow, memory, and high-intensity workout performance." },
      { title: "Zero Sugar Impurities", description: "Formulated without sucralose or sugar alcohols. No gastric discomfort." }
    ],
    ingredients: [
      "Ultra-Filtered Whey Peptides",
      "Calcium Caseinate",
      "Organic Raw Cocoa Margins",
      "Dutch Processed Cocoa Powder",
      "Almond Flour",
      "Prebiotic Chicory Root Extract",
      "Roasted Hazelnuts",
      "Organic Coconut Butter",
      "Natural Vanilla Bean Extract",
      "Pink Himalayan Salt",
      "Monk Fruit Extract"
    ],
    color: "bg-orange-500/10 border-orange-500/30",
    accentColor: "text-orange-500 border-orange-500 hover:bg-orange-500/10",
    badgeColor: "#f97316",
    image: "/src/assets/images/dr_bar_hero_1779685408998.png", // Uses our extreme high-res hero shot!
    isBestSeller: false,
    isPopular: true,
    stock: 12
  },
  {
    id: "lime-matcha-active-renew",
    name: "Lime Matcha Active Renew",
    flavor: "Organic Matcha Uji, Cold-Pressed Lime & Cashews",
    tagline: "The Bio-Active Cellular Reset",
    price: 40.00,
    subscriptionPrice: 34.00,
    rating: 4.7,
    reviewsCount: 610,
    description: "A clean, revitalizing bar marrying premium-grade Japanese Uji Matcha with cold-pressed Key Lime juice. Crafted to supply sustained L-theanine energy combined with rich anti-inflammatory lipids.",
    nutritionalFacts: {
      calories: 180,
      protein: 20,
      carbs: 5,
      fat: 4.5,
      sugar: 1,
      fiber: 8
    },
    benefits: [
      { title: "L-Theanine Alpha Energy", description: "Matcha green tea offers smooth energy without jitters or cortisol spikes." },
      { title: "Metabolic Boosters", description: "EGCG catechins boost fat-oxidation efficiencies and post-workout cooling." },
      { title: "Collagen Synthesizers", description: "Lime-derived bioflavonoids stimulate internal structural tissue repair." }
    ],
    ingredients: [
      "Pea Protein Isolate",
      "Brown Rice Protein Peptides",
      "Organic Japanese Matcha Powder (Uji Grade)",
      "Organic Raw Cashew Butter",
      "Cold-Pressed Mexican Lime Peel Oil",
      "Prebiotic Soluble Fiber",
      "Organic Chia Seed Mucilage",
      "Sunflower Lecithin",
      "Whole Stevia Leaves",
      "Shredded Coconut Nectar"
    ],
    color: "bg-lime-500/10 border-lime-500/30",
    accentColor: "text-lime-400 border-lime-400 hover:bg-lime-400/10",
    badgeColor: "#84cc16",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop", // Matcha latte inspired premium mockup
    isBestSeller: false,
    isPopular: false,
    stock: 58
  },
  {
    id: "salted-toffee-almond-bold",
    name: "Salted Toffee Almond Bold",
    flavor: "Toffee Flavor, Roasted Salted Almonds & Oats",
    tagline: "Clean Athletic Endurance Matrix",
    price: 38.00,
    subscriptionPrice: 32.30,
    rating: 4.9,
    reviewsCount: 884,
    description: "Engineered specifically for extreme distance runners, triathletes, and hikers. Dr Bar Salted Toffee satisfies high-end sensory cravings while loading 20g of pure muscle protection and premium essential fiber.",
    nutritionalFacts: {
      calories: 185,
      protein: 20,
      carbs: 6,
      fat: 5,
      sugar: 1,
      fiber: 9
    },
    benefits: [
      { title: "20g Sustained Yield Protein", description: "Maintains positive nitrogen balance during strenuous muscular exertion." },
      { title: "Almond Magnesium Focus", description: "High natural magnesium profiles inside premium non-gmo roasted Californian almonds." },
      { title: "Zero Artificial Colorants", description: "The deep rich toffee tone is achieved purely with organic toasted peanut skins." }
    ],
    ingredients: [
      "Milk Protein Concentrate",
      "Organic Roasted Californian Almonds",
      "Soluble Corn Fiber",
      "Prebiotic Tapioca Extract",
      "Glycerin (Vegetable Root)",
      "Organic Quinoa Crisps",
      "Raw Coconut Nectar",
      "Toffee Natural Oil",
      "Melted Organic Cocoa Butter",
      "Pure Dead Sea Salt Crystals",
      "Stevia Rebaudiana Extract"
    ],
    color: "bg-yellow-600/10 border-yellow-600/30",
    accentColor: "text-yellow-600 border-yellow-600 hover:bg-yellow-600/10",
    badgeColor: "#ca8a04",
    image: "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=600&auto=format&fit=crop", // Nuts premium shot
    isBestSeller: true,
    isPopular: false,
    stock: 25
  },
  {
    id: "wild-berry-marine-collagen",
    name: "Wild Berry & Marine Collagen",
    flavor: "Red Raspberries, Blueberries & Atlantic Collagen",
    tagline: "The Active Structural Formula",
    price: 42.00,
    subscriptionPrice: 35.70,
    rating: 4.9,
    reviewsCount: 512,
    description: "An innovative dynamic functional food featuring 5000mg of hydrolysed Type I Marine Collagen combined with cold-processed handpicked berries. Recharges joint elasticity and cellular radiance from within.",
    nutritionalFacts: {
      calories: 175,
      protein: 23, // 18g whey + 5g marine collagen
      carbs: 4,
      fat: 3.5,
      sugar: 1,
      fiber: 7
    },
    benefits: [
      { title: "5000mg Bio-Active Collagen", description: "Hydrolysed peptides that build skin radiance, strengthen cartilage, and accelerate joint repair." },
      { title: "Elite Antioxidant Load", description: "Contains anthocyanins from freeze-dried raspberries and wild blueberries." },
      { title: "Active Recovery Catalyst", description: "BCAA rich profile to fastpack recovery cells immediately post-workout." }
    ],
    ingredients: [
      "Grass-Fed Whey Protein Isolate",
      "Hydrolysed Atlantic Marine Collagen Peptides",
      "Freeze-Dried Organic Red Raspberries",
      "Freeze-Dried Wild Blueberries",
      "Organic Cassava Root Prebiotic Fiber",
      "Cashew Nut Paste",
      "Almond Flour",
      "Natural Raspberry Juice Infusion",
      "Himalayan Pink Salt",
      "Monk Fruit Extract"
    ],
    color: "bg-red-500/10 border-red-500/30",
    accentColor: "text-red-400 border-red-400 hover:bg-red-400/10",
    badgeColor: "#ef4444",
    image: "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=600&auto=format&fit=crop", // Bright vibrant berries theme
    isBestSeller: false,
    isPopular: true,
    stock: 31
  }
];

export const bundleOffers = [
  {
    id: "clinical-trio",
    name: "Clinical Core Trio Bundle",
    description: "Get our three elite, top-reviewed formulations (3 Boxes — 36 Bars total) for maximum wellness coverage",
    price: 98.00, // Saves $20 compared to buying individually (usually $114)
    originalPrice: 116.00,
    includedProducts: ["peanut-butter-caramel-salt", "dense-dark-fudge-cocoa", "lime-matcha-active-renew"],
    savings: 18.00,
    badge: "Most Popular Bundle",
    customDescription: "1x Peanut Butter, 1x Intense Dark Cocoa, 1x Lime Matcha Renew. Perfect for keeping your athletic fuel varied and optimized."
  },
  {
    id: "infinite-performance-six",
    name: "Maximum Athlete Performance Sixplex",
    description: "For the rigorous fitness lifestyle. 6 Boxes (72 Bars) representing our entire clean-fuel lineup",
    price: 180.00, // Usually $228
    originalPrice: 228.00,
    includedProducts: ["peanut-butter-caramel-salt", "dense-dark-fudge-cocoa", "salted-toffee-almond-bold", "wild-berry-marine-collagen"],
    savings: 48.00,
    badge: "Ultimate Savings",
    customDescription: "2x Peanut Butter, 2x Intense Dark Cocoa, 1x Salted Toffee, 1x Wild Mary Marine Collagen. Best for athletes, group households, and offices."
  }
];
