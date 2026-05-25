import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, ShieldCheck, Flame, ShoppingBag, Percent, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    navigateTo,
    promoCode,
    discountPercent,
    promoError,
    applyPromoCode,
    removePromoCode
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = cartSubtotal * (discountPercent / 100);
  const finalSubtotal = cartSubtotal - discountAmount;
  const freeShippingThreshold = 60;
  const isFreeShipping = finalSubtotal >= freeShippingThreshold || promoCode === 'FREESHIP';
  const remainingForFree = Math.max(freeShippingThreshold - finalSubtotal, 0);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-wrapper">
          
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#000000]"
            onClick={onClose}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex">
            {/* Slide block panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-[#0e0e0e] border-l border-white/10 flex flex-col justify-between text-left h-full shadow-2xl relative"
              id="cart-drawer-panel"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-lime-400" />
                  <span className="font-display font-bold text-lg text-white">Your Shopping Bag</span>
                  <span className="bg-neutral-900 border border-white/5 text-[10px] font-mono text-neutral-400 px-2 py-0.5 rounded-full font-bold">
                    {cart.reduce((tc, i) => tc + i.quantity, 0)} Box(es)
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-neutral-800 text-neutral-400 hover:text-white rounded-full cursor-pointer transition-colors border-0 h-8 w-8 flex items-center justify-center bg-transparent"
                  aria-label="Close Bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping banner progress ticker */}
              <div className="bg-neutral-950 px-5 py-3 border-b border-white/5 font-mono text-[11px] leading-snug">
                {isFreeShipping ? (
                  <span className="text-lime-404 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-lime-400" /> FREE EXPRESS COLD-SHIPPING ACTIVATED!
                  </span>
                ) : (
                  <div className="space-y-1.5 text-neutral-400 text-left">
                    <div className="flex justify-between font-medium">
                      <span>Add <strong className="text-lime-400">${remainingForFree.toFixed(2)}</strong> more for free cold shipping!</span>
                      <span className="text-neutral-500 font-bold">{((finalSubtotal / freeShippingThreshold) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-lime-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((finalSubtotal / freeShippingThreshold) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List scroll view container */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" id="cart-drawer-items-list">
                {cart.length === 0 ? (
                  <div className="py-24 text-center text-neutral-500 space-y-3" id="blank-cart-drawer">
                    <ShoppingBag className="w-12 h-12 text-neutral-700 mx-auto" />
                    <span className="text-xs font-mono font-bold uppercase block tracking-wider">Your Shopping bag is empty</span>
                    <button
                      onClick={() => {
                        onClose();
                        navigateTo('shop');
                      }}
                      className="bg-lime-450/10 hover:bg-lime-450/20 border border-lime-450/20 text-lime-400 hover:text-lime-300 text-[10px] font-mono font-bold px-4 py-2 rounded-xl transition-all uppercase cursor-pointer"
                    >
                      Browse Specialized Products
                    </button>
                  </div>
                ) : (
                  cart.map((item) => {
                    const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
                    return (
                      <div 
                        key={item.id}
                        className="bg-neutral-900/40 border border-white/5 rounded-xl p-3.5 flex gap-4 text-left items-center justify-between"
                        id={`drawer-item-${item.id}`}
                      >
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-16 h-16 object-cover rounded-xl bg-black shrink-0"
                          referrerPolicy="no-referrer"
                        />

                        <div className="flex-1 min-w-0 space-y-1.5">
                          <div>
                            <h4 className="font-display font-bold text-white text-xs sm:text-sm truncate leading-snug">{item.product.name}</h4>
                            <p className="text-[10px] font-mono text-neutral-500 truncate uppercase mt-0.5">{item.product.flavor.split(',')[0]}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            {item.isSubscription ? (
                              <span className="bg-lime-950/80 border border-lime-500/20 text-lime-400 text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase">
                                {item.subscriptionInterval} Restock
                              </span>
                            ) : (
                              <span className="bg-neutral-950 text-neutral-400 text-[8px] font-mono font-semibold px-2 py-0.5 rounded uppercase">
                                One-time Box
                              </span>
                            )}
                          </div>

                          {/* Volume counters */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQty(item.id, item.quantity - 1)}
                              className="bg-neutral-850 hover:bg-neutral-800 text-white rounded text-xs px-2 py-1 select-none border-0 font-bold focus:outline-none cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs text-white font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.id, item.quantity + 1)}
                              className="bg-neutral-850 hover:bg-neutral-800 text-white rounded text-xs px-2 py-1 select-none border-0 font-bold focus:outline-none cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price and delete button */}
                        <div className="text-right flex flex-col justify-between items-end h-16 shrink-0 pl-1">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-red-400 p-1 rounded-full cursor-pointer transition-colors border-0 bg-transparent"
                            title="Delete Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="font-mono font-bold text-xs sm:text-sm text-lime-403">
                            ${(price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Subtotal, Promo block, and Checkout link */}
              {cart.length > 0 && (
                <div className="border-t border-white/10 p-5 bg-[#0a0a0a]" id="cart-drawer-summary">
                  
                  {/* Applied promo code marker */}
                  {promoCode ? (
                    <div className="bg-lime-900/20 border border-lime-500/15 p-3 rounded-xl flex items-center justify-between mb-4 font-mono text-xs">
                      <span className="text-lime-400 font-bold flex items-center gap-1.5">
                        <Percent className="w-4 h-4" /> CODE APPLIED: {promoCode}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-lime-400">-{discountPercent}%</span>
                        <button
                          onClick={removePromoCode}
                          className="text-neutral-400 hover:text-white hover:underline uppercase text-[10px] font-bold cursor-pointer bg-transparent border-0"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Promo Input Form */
                    <form onSubmit={handleApplyPromo} className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Discount code (e.g. SMARTFIT)"
                        className="bg-neutral-900 border border-white/10 rounded-xl px-4.5 py-2.5 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider px-4 rounded-xl cursor-pointer"
                        title="Apply code"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && <p className="text-red-405 font-mono text-[10px] pb-3 text-left">{promoError}</p>}

                  {/* Calculations details breakdown */}
                  <div className="space-y-2 pb-4 border-b border-white/5 text-xs font-mono" id="calculations-breakdowns">
                    <div className="flex justify-between text-neutral-450">
                      <span>Cart Subtotal</span>
                      <span>${cartSubtotal.toFixed(2)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-lime-400 font-medium">
                        <span>Corporate Discount ({discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-neutral-450">
                      <span>Express Shipping</span>
                      <span>{isFreeShipping ? <strong className="text-lime-400">FREE OVER $60</strong> : '$5.99'}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-baseline py-4 font-mono text-white">
                    <span className="text-xs font-semibold uppercase">ESTIMATED TOTAL</span>
                    <span className="text-xl sm:text-2xl font-black">${(finalSubtotal + (isFreeShipping ? 0 : 5.99)).toFixed(2)}</span>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={() => {
                      onClose();
                      navigateTo('checkout');
                    }}
                    className="w-full bg-lime-400 hover:bg-lime-300 text-black font-sans font-bold text-xs uppercase tracking-widest py-4.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-lime-400/5 hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
                    id="trigger-checkout-cta"
                  >
                    <span>Secure Checkout</span>
                    <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                  </button>

                  <p className="text-center text-[10px] font-mono text-neutral-600 mt-3 uppercase tracking-wider">
                    🔒 256-Bit Encrypted Payment Matrix
                  </p>
                </div>
              )}

            </motion.div>
          </div>

        </div>
      )}
    </AnimatePresence>
  );
};
