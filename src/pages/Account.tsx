import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Calendar, RefreshCw, Star, ShieldCheck, Heart, Trash, ShieldAlert, Sparkles, User, Package, CreditCard, Compass, Check, X, Play } from 'lucide-react';

export const Account: React.FC = () => {
  const { 
    userProfile, 
    cancelUserSubscription, 
    pauseUserSubscription, 
    resumeUserSubscription,
    navigateTo
  } = useShop();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'subs' | 'billing'>('profile');
  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState<string | null>(null);

  const getOrderStatusColor = (status: string) => {
    if (status === 'Delivered') return 'text-lime-400 bg-lime-400/10 border-lime-400/20';
    if (status === 'Processing') return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-12 px-4 sm:px-6 text-left" id="account-page-parent">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Profile Welcome Banner */}
        <div className="bg-gradient-to-r from-neutral-900 to-[#121212] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden" id="profile-welcome-card">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 bg-lime-400 rounded-full flex items-center justify-center text-black font-display font-black text-2xl shadow-md">
              SK
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#a3e635] uppercase font-bold block mb-1">PRO-ATHLETE COMPLIANT MEMBERSHIP</span>
              <h1 className="font-display font-bold text-2xl sm:text-3.5xl text-white tracking-tight leading-none mb-2">Welcome Back, {userProfile.fullName}</h1>
              <p className="text-neutral-450 text-xs sm:text-xs">Email: {userProfile.email} &bull; Security UID: DRBAR-94021</p>
            </div>
          </div>
          
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-lime-400 hover:bg-lime-300 text-black font-mono font-bold text-[10px] uppercase tracking-wider py-2.5 px-4 rounded-xl cursor-pointer shadow"
            >
              Order New Box
            </button>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="flex flex-wrap border-b border-white/5" id="profile-tabs-selector">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3.5 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 text-left ${activeTab === 'profile' ? 'text-lime-450 border-lime-400' : 'text-neutral-500 border-transparent hover:text-white'}`}
          >
            My Profile Metrics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3.5 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 text-left ${activeTab === 'orders' ? 'text-lime-450 border-lime-400' : 'text-neutral-500 border-transparent hover:text-white'}`}
          >
            Physical order history ({userProfile.orderHistory.length})
          </button>
          <button
            onClick={() => setActiveTab('subs')}
            className={`py-3.5 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 text-left ${activeTab === 'subs' ? 'text-lime-450 border-lime-400' : 'text-neutral-500 border-transparent hover:text-white'}`}
          >
            Auto-restocks ({userProfile.activeSubscriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`py-3.5 px-5 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 text-left ${activeTab === 'billing' ? 'text-lime-450 border-lime-400' : 'text-neutral-500 border-transparent hover:text-white'}`}
          >
            Crypt logistics Billing
          </button>
        </div>

        {/* Interactive panels based on tab */}
        <div className="min-h-[300px]" id="tab-views">
          
          {/* TAB 1 — PROFILE DETAILS METRICS */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="profile-tab-box">
              <div className="lg:col-span-4 space-y-6 text-left">
                <div className="bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4">
                  <h3 className="font-display font-medium text-white text-base">Physiology Standards</h3>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500">Athlete License Status</span>
                      <span className="text-lime-405 font-bold">Compliant Tier I</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-550">Core target fiber</span>
                      <span className="text-white">Lean gains & Recuperation</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-550">Recommended macro</span>
                      <span className="text-white">Protein isolate 21g/meal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Coordinates list details */}
              <div className="lg:col-span-8 bg-neutral-900 border border-white/5 p-6 sm:p-7 rounded-2xl text-left space-y-6">
                <h3 className="font-display font-bold text-white text-lg">Secure Shipping Coordinates</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-neutral-350">
                  <div className="space-y-1">
                    <span className="text-neutral-550 block font-semibold">FULL LEGAL RECIPIENT</span>
                    <span className="text-white block font-bold text-sm">{userProfile.fullName}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-neutral-555 block font-bold">ATHLETE PHONE CHANNEL</span>
                    <span className="text-white block font-bold text-sm">{userProfile.phone}</span>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <span className="text-neutral-555 block font-bold">PHYSICAL TRANSIT GATEWAY ADDRESS</span>
                    <span className="text-white block text-sm leading-snug">{userProfile.addressLine1}, {userProfile.city}, {userProfile.zipCode}, {userProfile.country}</span>
                  </div>
                </div>

                <div className="bg-neutral-950 p-4 border border-white/5 rounded-xl text-left" id="change-address-warning">
                  <span className="text-[10px] text-neutral-500 font-bold block uppercase mb-1">Editing note</span>
                  <span className="text-xs text-neutral-450 block">Coordinates can be modified dynamically during the checkout sequence. Auto-restock dispatches will resolve to active gateway coordinates.</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2 — ORDER HISTORY WITH STEP-BY-STEP MAP TRACKING */}
          {activeTab === 'orders' && (
            <div className="space-y-6 text-left" id="orders-history-tab">
              {userProfile.orderHistory.length === 0 ? (
                <div className="py-12 bg-neutral-900/30 rounded-2xl border border-white/5 text-center text-neutral-500">
                  <Package className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                  <span className="text-xs font-mono block">No orders made on record yet</span>
                </div>
              ) : (
                <div className="space-y-6" id="orders-maplist">
                  {userProfile.orderHistory.map((order: any) => {
                    const isTrackingVisible = selectedTrackingOrder === order.id;
                    return (
                      <div 
                        key={order.id}
                        className="bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4"
                      >
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/5 pb-4">
                          <div className="space-y-1 font-mono text-xs">
                            <span className="text-neutral-500 uppercase block font-semibold">ORDER REFERENCE</span>
                            <span className="text-white font-bold text-sm block">{order.id} &bull; {order.date}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`border px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold ${getOrderStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                            
                            <button
                              onClick={() => setSelectedTrackingOrder(isTrackingVisible ? null : order.id)}
                              className="bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold py-1.5 px-4 rounded-lg cursor-pointer border border-white/5"
                            >
                              {isTrackingVisible ? 'Close Tracker' : 'Track Package'}
                            </button>
                          </div>
                        </div>

                        {/* Order details */}
                        <div className="space-y-3 font-sans text-xs sm:text-sm">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-neutral-350">
                              <span>
                                {item.productName} ({item.flavor.split(',')[0]}) &times; <strong className="text-white">{item.quantity}</strong>
                                {item.isSubscription && <span className="bg-lime-400 text-black text-[8px] font-mono font-bold px-1.5 py-0.2 rounded ml-2 uppercase">Sub</span>}
                              </span>
                              <span className="font-mono text-white font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono">
                          <div className="text-neutral-500">
                            <span>Ship Gateway: {order.shippingAddress.addressLine1}, {order.shippingAddress.city}</span>
                          </div>
                          <div className="text-white font-black text-sm">
                            <span>TRANSIT TOTAL: ${order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        {/* HIGH FIDELITY SIMULATED TRACKING INTERACTION PANEL */}
                        {isTrackingVisible && (
                          <div className="bg-neutral-950 rounded-xl p-5 border border-white/5 mt-4 space-y-4 text-left">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-2.5">
                              <div>
                                <span className="text-[10px] font-mono text-neutral-500 uppercase block font-bold">VIP EXPRESS CARGO ID</span>
                                <span className="font-mono text-xs font-bold text-lime-400">{order.trackingNumber}</span>
                              </div>
                              <span className="text-[10px] font-mono text-neutral-500">INSULATION: DRY ICE COLD-PACK CERTIFIED</span>
                            </div>

                            {/* Horizontal steps progress visualizer */}
                            <div className="grid grid-cols-4 gap-2.5 font-mono text-[9px] sm:text-xs">
                              <div className="space-y-1.5">
                                <div className="h-1.5 bg-lime-400 rounded-full" />
                                <span className="block text-white font-bold uppercase">Logistics Approved</span>
                                <span className="block text-neutral-550 font-normal leading-none">Warehouse packed</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className={`h-1.5 rounded-full ${order.status !== 'Processing' ? 'bg-lime-400' : 'bg-neutral-800'}`} />
                                <span className="block text-white font-bold uppercase">In Transit</span>
                                <span className="block text-neutral-550 font-normal leading-none">Cold cargo loaded</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className={`h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-lime-400' : 'bg-neutral-800'}`} />
                                <span className="block text-white font-bold uppercase">Out for Delivery</span>
                                <span className="block text-neutral-550 font-normal leading-none">Regional courier gateway</span>
                              </div>
                              <div className="space-y-1.5">
                                <div className={`h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-lime-400' : 'bg-neutral-800'}`} />
                                <span className="block text-white font-bold uppercase">S settled</span>
                                <span className="block text-neutral-550 font-normal leading-none">Arrived at Colorado Boulder</span>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3 — ACTIVE USER SUBSCRIPTION MANAGEMENT OPERATIONS */}
          {activeTab === 'subs' && (
            <div className="space-y-6 text-left" id="subs-management-tab">
              {userProfile.activeSubscriptions.length === 0 ? (
                <div className="py-12 bg-neutral-900/30 rounded-2xl border border-white/5 text-center text-neutral-400 space-y-3">
                  <RefreshCw className="w-8 h-8 text-neutral-600 mx-auto animate-spin-slow" />
                  <span className="text-xs font-mono block uppercase">No recurring schedules registered</span>
                  <p className="text-neutral-500 text-xs">Enroll inside our Auto-Delivery options to lock in 15% VIP loyalty savings permanently.</p>
                  <button 
                    onClick={() => navigateTo('subscriptions')}
                    className="bg-lime-400 hover:bg-lime-300 text-black font-semibold text-xs py-2 px-4 rounded-xl cursor-pointer"
                  >
                    View Auto Restock schemes
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="slots-recurrences">
                  {userProfile.activeSubscriptions.map((sub: any) => (
                    <div 
                      key={sub.id}
                      className="bg-neutral-900 border border-white/5 rounded-2xl p-5 sm:p-6 space-y-4 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-neutral-500 block uppercase">SUBSCRIPTION SPEC ID</span>
                          <span className="font-mono text-xs font-bold text-white block mt-0.5">{sub.id}</span>
                        </div>

                        <span className={`border px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase ${
                          sub.status === 'Active' ? 'text-lime-400 bg-lime-400/10 border-lime-400/20' : 
                          sub.status === 'Paused' ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' : 
                          'text-red-500 bg-red-500/10 border-red-500/20'
                        }`}>
                          {sub.status}
                        </span>
                      </div>

                      {/* Product copy info */}
                      <div>
                        <h4 className="font-display font-bold text-white text-base leading-tight">{sub.product.name}</h4>
                        <span className="text-neutral-550 text-xs font-mono">1 Box ({sub.product.flavor.split(',')[0]}) &times; {sub.quantity}</span>
                      </div>

                      {/* Interval & price details */}
                      <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5 font-mono text-[11px] text-neutral-400">
                        <div>
                          <span className="text-neutral-550 block text-[9px] uppercase font-bold">AUTOLOAD SPEED</span>
                          <span className="text-white font-bold tracking-wide uppercase">{sub.interval} Restock</span>
                        </div>
                        <div>
                          <span className="text-neutral-555 block text-[9px] uppercase font-bold">REDUCED BILLING</span>
                          <span className="text-lime-400 font-black">${(sub.price * sub.quantity).toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Controls panel: cancel/pause/resume */}
                      <div className="flex items-center justify-between gap-2 pt-2 text-[10px] font-mono font-semibold" id={`sub-operations-${sub.id}`}>
                        <div>
                          <span className="text-neutral-555 uppercase tracking-wide block leading-none">NEXT DELIVERY DATE</span>
                          <span className="text-white block mt-1">{sub.status === 'Active' ? sub.nextDelivery : 'Suspended'}</span>
                        </div>

                        <div className="flex gap-2">
                          {sub.status === 'Active' && (
                            <button
                              onClick={() => pauseUserSubscription(sub.id)}
                              className="bg-yellow-600/10 hover:bg-yellow-601/20 border border-yellow-500/20 text-yellow-455 px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold cursor-pointer"
                              title="Pause shipments"
                            >
                              Pause
                            </button>
                          )}

                          {sub.status === 'Paused' && (
                            <button
                              onClick={() => resumeUserSubscription(sub.id)}
                              className="bg-lime-400 hover:bg-lime-300 text-black px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold cursor-pointer flex items-center gap-1"
                              title="Resume shipments"
                            >
                              <Play className="w-2.5 h-2.5 fill-black" /> Resume
                            </button>
                          )}

                          {sub.status !== 'Cancelled' && (
                            <button
                              onClick={() => cancelUserSubscription(sub.id)}
                              className="bg-red-900/10 hover:bg-red-900/20 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold cursor-pointer"
                              title="Cancel auto-billing schedule"
                            >
                              Cancel
                            </button>
                          )}

                          {sub.status === 'Cancelled' && (
                            <span className="text-neutral-500 text-[10px] uppercase font-bold flex items-center pr-1">Suspended</span>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4 — BILLING CARD INFORMATION */}
          {activeTab === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="billing-crypto-panel">
              <div className="lg:col-span-7 bg-neutral-900 border border-white/5 p-6 sm:p-7 rounded-2xl text-left space-y-6">
                <div className="flex items-center gap-2 text-lime-400 border-b border-white/5 pb-3">
                  <CreditCard className="w-5 h-5" />
                  <h3 className="font-display font-black text-lg text-white font-mono uppercase">Logistics Settlement Instrument</h3>
                </div>

                <div className="font-mono text-xs space-y-4" id="simulated-payment-metrics">
                  <div className="p-4 bg-black rounded-xl border border-white/5 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-lime-400/5 rounded-full blur-2xl" />
                    <div>
                      <span className="text-[8px] text-neutral-500 block uppercase tracking-wider font-semibold">PREFERRED PAYMENT CARD</span>
                      <span className="text-white block font-bold text-sm tracking-widest mt-1">S VISA METALLIC &bull;&bull;&bull;&bull; 3042</span>
                      <span className="text-neutral-400 block text-[10px] mt-1">Expiry: 05/2030 &bull; Secure Protocol</span>
                    </div>

                    <span className="text-xs text-lime-450 border border-lime-400/20 rounded px-1.5 py-0.5">ACTIVE SECURE</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-neutral-550 uppercase text-[9px] tracking-widest block font-bold">VIP LOGISTICS BILLING GATEWAY REGISTER</span>
                    <span className="text-xs text-neutral-350 block">Charges will resolve cleanly under merchant label <strong className="text-white block font-mono">DR BAR WELLNESS ATHLETICS</strong>. Transaction is encrypted under 256-bit crypt gates.</span>
                  </div>
                </div>
              </div>

              {/* Right column secure labels */}
              <div className="lg:col-span-5 bg-neutral-900 border border-white/5 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-1.5 text-lime-400 font-mono text-[10px] uppercase font-bold">
                  <ShieldCheck className="w-5 h-5 text-lime-404 shrink-0" />
                  <span>Logistics Insurance Coverage</span>
                </div>
                <p className="text-neutral-450 text-xs sm:text-xs text-left leading-relaxed">
                  Every auto-restock box includes complimentary physical logistics insurance. If a carrier damage incident leaves protein bars crushed or melted during transits, our Colorado staff will immediately dispatch replacement boxes completely free of fees.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
