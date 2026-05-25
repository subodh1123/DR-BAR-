import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Star, ShieldCheck, Heart, Trash, ShieldAlert, Sparkles, CreditCard, Lock, Check, Send } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { 
    cart, 
    promoCode, 
    discountPercent, 
    checkout, 
    navigateTo 
  } = useShop();

  const [fullName, setFullName] = useState('Subodh Khadka');
  const [email, setEmail] = useState('subodhkhadka36@gmail.com');
  const [phone, setPhone] = useState('+1 (555) 902-3042');
  const [addressLine1, setAddressLine1] = useState('12 North Ridge Ave');
  const [city, setCity] = useState('Boulder');
  const [zipCode, setZipCode] = useState('80301');
  const [country, setCountry] = useState('United States');

  const [cardNumber, setCardNumber] = useState('4111 2222 3333 3042');
  const [expiry, setExpiry] = useState('05/30');
  const [cvv, setCvv] = useState('555');

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'priority'>('standard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Math
  const cartSubtotal = cart.reduce((acc, item) => {
    const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = cartSubtotal * (discountPercent / 100);
  const finalSubtotal = cartSubtotal - discountAmount;
  const isFreeShipping = finalSubtotal >= 60 || promoCode === 'FREESHIP';
  
  const shippingCost = isFreeShipping ? 0 : 5.99;
  const finalTotalValue = finalSubtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate clinical settlement transaction latency
    setTimeout(() => {
      checkout({
        fullName,
        email,
        phone,
        addressLine1,
        city,
        zipCode,
        country
      });
      setIsProcessing(false);
      setIsFinished(true);

      // Route to account tracking within 3 seconds
      setTimeout(() => {
        navigateTo('account');
      }, 2500);

    }, 3000);
  };

  if (cart.length === 0 && !isFinished) {
    return (
      <div className="bg-[#0b0b0b] min-h-[500px] text-white flex flex-col justify-center items-center p-6 space-y-4 text-center">
        <ShoppingBag className="w-12 h-12 text-neutral-600" />
        <h2 className="font-display font-medium text-lg uppercase tracking-wider">No active items in bag to checkout</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-lime-400 hover:bg-lime-300 text-black text-xs font-mono font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer"
        >
          Explore Specialized Range
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-12 px-4 sm:px-6 text-left" id="checkout-gateway-page">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Title */}
        <div className="space-y-2 border-b border-white/5 pb-6" id="checkout-header">
          <span className="text-xs font-mono font-bold tracking-widest text-[#a3e635] uppercase block mb-1">SECURED INTEL CHECKOUT</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white leading-none">
            Physiology Order Settlement
          </h1>
        </div>

        {isFinished ? (
          <div className="max-w-xl mx-auto p-10 bg-neutral-900 border border-lime-400/20 text-center rounded-3xl space-y-6" id="success-checkout-portal">
            <div className="w-16 h-16 bg-lime-400 text-black rounded-full flex items-center justify-center font-bold text-3xl mx-auto shadow-lg">
              ✓
            </div>
            
            <div className="space-y-2">
              <h3 className="font-display font-bold text-xl text-white">Payment Authorized Successfully!</h3>
              <p className="text-neutral-400 text-xs sm:text-sm">We compiled order details and locked logistics priorities. Setting up automated subscription contracts if requested.</p>
            </div>

            <div className="bg-neutral-950 p-4 border border-white/5 rounded-2xl text-left font-mono text-xs text-neutral-450">
              Your registered order history has been updated. Routing you securely to <strong className="text-white font-bold">your Customer Account panel</strong> to track active shipments...
            </div>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start" id="checkout-main-form">
            
            {/* Left Inputs */}
            <div className="lg:col-span-7 space-y-8" id="checkout-address-payment-inputs">
              
              {/* Address Form */}
              <div className="bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4">
                <span className="text-xs font-mono text-lime-400 uppercase font-bold block">01 / Transit Coordinates</span>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-550 uppercase">Recipient Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">Recipient Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 text-left col-span-2">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">Gateway shipping Address</label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">Country</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Card Form */}
              <div className="bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4">
                <span className="text-xs font-mono text-lime-400 uppercase font-bold block">02 / Secured Financial Card</span>
                
                <div className="space-y-1 text-left">
                  <label className="text-[10px] font-mono text-neutral-555 uppercase">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="bg-black border border-white/10 rounded-xl p-3 pl-10 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">Expiry Month/Year</label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="e.g. 05/30"
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono text-left"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-[10px] font-mono text-neutral-555 uppercase">CVV Code</label>
                    <input
                      type="text"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="e.g. 555"
                      className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono text-left"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary Basket recap */}
            <div className="lg:col-span-5 bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-6" id="checkout-summary-bar">
              <span className="text-xs font-mono text-neutral-500 uppercase font-bold block">ORDER RECAP SUMMARY</span>
              
              <div className="space-y-3 font-sans max-h-56 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const price = item.isSubscription ? item.product.subscriptionPrice : item.product.price;
                  return (
                    <div key={item.id} className="flex justify-between items-center text-xs text-neutral-350 py-1 font-mono">
                      <div className="text-left max-w-[70%]">
                        <span className="block font-bold text-white truncate leading-none mb-1">{item.product.name}</span>
                        <span className="block text-[10px] text-neutral-500 leading-none">
                          {item.quantity} &times; {item.isSubscription ? 'Sub Autoreload' : 'One-time'}
                        </span>
                      </div>
                      <span className="text-white font-bold">${(price * item.quantity).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Math totals detail */}
              <div className="border-t border-white/5 pt-4 space-y-2 font-mono text-xs" id="maths-checkout-logs">
                <div className="flex justify-between text-neutral-450">
                  <span>Cart Items Raw Price</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-lime-400">
                    <span>Applied Coupon Code Deduct</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-neutral-450">
                  <span>Priority Dry Ice Transit</span>
                  <span>{isFreeShipping ? <strong className="text-lime-400">FREE OVER $60</strong> : `$5.99`}</span>
                </div>

                <div className="flex justify-between items-baseline pt-4 border-t border-white/5 font-mono text-white text-sm">
                  <span>TRANSIT TO PAY TOTAL</span>
                  <span className="text-xl font-black text-lime-400">${finalTotalValue.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order CTA lock */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-lime-400 hover:bg-lime-300 disabled:bg-neutral-800 disabled:text-neutral-500 text-black font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow"
                id="place-order-actual-cta"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'SETTLING PROTOCOLS...' : 'AUTHORIZE PAYMENT ORDER'}</span>
              </button>

              <div className="p-3.5 bg-neutral-950 border border-white/5 rounded-xl font-mono text-[9px] text-neutral-550 flex gap-2.5 items-start">
                <ShieldAlert className="w-5 h-5 text-lime-400 shrink-0" />
                <span>Standard compliance: Under metabolic raw licensing standards, clicking Authorize will charge your preferred visa account with precise values. No hidden cancellation penalties apply.</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
