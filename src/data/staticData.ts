import { BlogPost, Review } from '../types';

export const faqList = [
  {
    category: "Product & Science",
    question: "What makes Dr Bar different from other protein bars on the market?",
    answer: "Dr Bar is engineered by a team of clinical nutritionists and athletic trainers to eliminate the artificial sweeteners and high sugar alcohols common in traditional protein bars. We use only ultra-filtered grass-fed whey isolate and prebiotic tapioca fibers, giving you a dense, bio-available clean energy source without bloating or glycemic spikes. Dr Bar acts as direct muscle defense and convenient high protein food."
  },
  {
    category: "Nutrition",
    question: "Do you use sugar alcohols like erythritol or maltitol?",
    answer: "Absolutely not. We believe that low sugar protein bars should not compromise your gastric health. Many brands use artificial sweetening chemicals or sugar alcohols that cause severe digestive issues. Dr Bar is sweetened exclusively with biological monk fruit and certified organic stevia leaves, resulting in exactly 0g to 1g of sugar per bar."
  },
  {
    category: "Subscriptions",
    question: "How does the subscription plan work? Can I cancel anytime?",
    answer: "Our subscription is fully automated and designed to save you 15% on every delivery. You can choose a custom interval (every week, every 2 weeks, or monthly). From your Account Dashboard, you can swap flavors, adjust quantities, pause, or cancel with a single click. There are zero commitment fees or cancellation penalties."
  },
  {
    category: "Diets & Allergens",
    question: "Are Dr Bars gluten-free and soy-free?",
    answer: "Yes, our entire production line is certified 100% gluten-free, soy-free, and non-GMO. We utilize plant proteins and grass-fed dairy isolates. Please note our Peanut Butter and Toffee Almond flavors contain actual peanuts and almonds respectively."
  },
  {
    category: "Shipping",
    question: "What is your shipping policy and delivery fee?",
    answer: "We offer complimentary express shipping on all orders over $60. For orders below $60, a standard flat-rate express delivery charge of $5.99 is applied. All shipping is cold-packed to prevent bars from melting in warm climates."
  },
  {
    category: "Active Performance",
    question: "Is Dr Bar optimized for pre-workout or post-workout nutrition?",
    answer: "Both! Dr Bar delivers an ideal 2:1 ratio of high-grade bio-active proteins to healthy amino-supporting fats. Eating a Dr Bar 30-45 minutes before a workout loads your blood supply with necessary amino-release grids. Eating a bar post-workout triggers immediate muscle macromolecular repair."
  }
];

export const blogPostsList: BlogPost[] = [
  {
    id: "clean-protein-bars-athletic-edge",
    title: "How Low Sugar Protein Bars Deliver the Ultimate Athletic Edge",
    category: "Nutrition",
    author: "Dr. Elena Rostov, PhD",
    date: "May 18, 2026",
    readTime: "4 min read",
    excerpt: "Understand the biochemical pathway of slow-release whey peptides vs commercial high-glucose gym snacks, and why glycemic load controls your raw performance output.",
    content: [
      "When evaluating fitness nutrition, the type and quality of food you absorb directly determines your metabolic speed. Traditional performance bars are loaded with up to 25 grams of hidden high-fructose corn syrup, causing an immediate rush of insulin followed by a severe energy crash mid-workout.",
      "At Dr Bar, we utilize grass-fed whey peptide structures. These custom isolates bypass primary gastric breaking networks, allowing rapid diffusion of leucine, isoleucine, and valine straight into your working muscle fibers. This keeps your vascular system energized without the blood sugar spike.",
      "By combining these premium proteins with medium-chain triglycerides (MCT Oil), the body transitions into a state of cellular endurance, utilizing clean fats as background cellular energy. This is how smart, low sugar protein bars ensure physical progression without compromise."
    ],
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=800&auto=format&fit=crop", // Healthy food flatlay
    tags: ["low sugar protein bars", "protein bars", "fitness nutrition", "gym snacks"]
  },
  {
    id: "mct-oil-brain-fuel-explained",
    title: "MCT Oil: The Secret Energy Carrier and Cognitive Sharpness Matrix",
    category: "Science",
    author: "Prof. Tyler Sterling, Neurochemist",
    date: "April 24, 2026",
    readTime: "5 min read",
    excerpt: "Why premium health-food startups are adding medium-chain triglycerides to energy bars to empower corporate professionals, travelers, and students.",
    content: [
      "Medium-Chain Triglycerides (MCTs) are unique lipid particles that behave differently from standard dietary fats. Instead of slowly digesting through lymphatic grids, MCTs go straight to your liver, where they are converted into clean ketones.",
      "Ketones are the preferred energy currency of the human brain. When you are studying or in a high-stakes board meeting, a Dr Bar rich in MCTs and high-purity whey fuels both your physical body and your cerebral clarity simultaneously.",
      "This double-benefit makes it the perfect healthy snack for busy travelers, high-performance athletes, and anyone replacing junk snacks with smart nutrition."
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop", // Focus yoga/fitness
    tags: ["healthy snacks", "high protein food", "gym snacks", "healthy energy bars"]
  },
  {
    id: "post-workout-window-optimization",
    title: "Maximizing the 45-Minute Anabolic Recovery Window",
    category: "Fitness",
    author: "Coach Marcus Vance, CSCS",
    date: "May 02, 2026",
    readTime: "3 min read",
    excerpt: "The critical timing protocol for elite athletes to boost cellular repair, muscle growth, and metabolic recovery using high protein food.",
    content: [
      "Post-exercise muscular tissue is highly receptive to nutrient uptake. Within 45 minutes of a strenuous resistance gym routine, your cellular gates are opened and looking for protein chains to repair structural micro-tears.",
      "Delaying protein nourishment for as little as two hours can significantly reduce your skeletal muscle repair output. This is why having a portable, high protein food option like Dr Bar is so critical for top-tier athletic progress.",
      "We recommend storing a premium Peanut Butter Crunch or Cocoa Fudge Dr Bar in your gym bag to consume within minutes of finishing your last set. Your physical recovery rate will skyrocket, leaving you prepared for the next battle."
    ],
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop", // Gym weights
    tags: ["gym snacks", "high protein food", "fitness nutrition", "healthy energy bars"]
  }
];

export const defaultReviewsList: Review[] = [
  {
    id: "rev-1",
    name: "Alex Mercer",
    rating: 5,
    title: "Finally, a bar that doesn't upset my stomach!",
    comment: "I have tried every single high protein bar out there, and they all either taste like pure chalk or leave me extremely bloated. Dr Bar is a revelation. The Intense Dark cocoa tastes like high-end artisanal chocolate, and the macros are outstanding! Zero bloating, just clean power. Highly recommend subscribing.",
    date: "May 10, 2026",
    verified: true,
    flavor: "Intense Dark Fudge & Cocoa",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    likes: 42
  },
  {
    id: "rev-2",
    name: "Sarah Jenkins",
    rating: 5,
    title: "Best gym snack I've bought in years",
    comment: "Working 10-hour days and trying to lift weights means I'm constantly scrambling for pre-workout meals. Dr Bar's Peanut Butter Salted Caramel has saved me. It tastes like a real peanut butter cup but provides 21g of solid, clean protein with zero crash. The subscription arrives on time, cold-packed. Flawless execution.",
    date: "April 29, 2026",
    verified: true,
    flavor: "Peanut Butter Caramel Salt",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    likes: 29
  },
  {
    id: "rev-3",
    name: "Derrick Vance",
    rating: 5,
    title: "Incredible science-backed nutrition structure",
    comment: "As a professional athletic coach, I analyze ingredient profiles intensely. I was blown away when I saw that Dr Bar has absolutely zero maltitol or hidden sugars. The grass-fed whey isolate protein absorption is incredibly immediate. The Lime Matcha also has a surprisingly clean green tea kick that I love before running.",
    date: "May 15, 2026",
    verified: true,
    flavor: "Lime Matcha Active Renew",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    likes: 18
  },
  {
    id: "rev-4",
    name: "Miranda Cole",
    rating: 4,
    title: "Delightful change from heavy chalky fake foods",
    comment: "I replace my mid-afternoon junk snack with Dr Bar. The Wild Berry Marine Collagen bar is a unique snack. It feels light but has 23g of protein, and after three weeks of eating them, I actually think my skin looks brighter! Only docked 1 star because it's slightly more expensive than cheap store bars, but the absolute premium quality justifies it.",
    date: "May 22, 2026",
    verified: true,
    flavor: "Wild Berry & Marine Collagen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    likes: 11
  }
];
