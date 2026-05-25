import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Popups } from './components/Popups';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Nutrition } from './pages/Nutrition';
import { Subscriptions } from './pages/Subscriptions';
import { ReviewsCommunity } from './pages/ReviewsCommunity';
import { Blog } from './pages/Blog';
import { FAQ } from './pages/FAQ';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';

import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { navPath } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Simple router based on context state
  const renderPage = () => {
    switch (navPath) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'about':
        return <About />;
      case 'nutrition':
        return <Nutrition />;
      case 'subscriptions':
        return <Subscriptions />;
      case 'reviews':
        return <ReviewsCommunity />;
      case 'blog':
        return <Blog />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return <Contact />;
      case 'checkout':
        return <Checkout />;
      case 'account':
        return <Account />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="bg-[#F5F5F4] min-h-screen text-[#0A0A0A] flex flex-col font-sans" id="root-app-layout">
      {/* Dynamic Promotion & Multi-level Header */}
      <Header onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Pages with Fade Transition */}
      <main className="flex-grow relative overflow-x-hidden min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={navPath}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
            id={`page-wrapper-${navPath}`}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Static Footer element with SEO parameters */}
      <Footer />

      {/* Cart Drawer sliding flyout panels */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Delayed popups timed triggers */}
      <Popups />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
