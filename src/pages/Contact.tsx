import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, PhoneCall, MapPin, Check, Send, AlertCircle, ShieldAlert } from 'lucide-react';

export const Contact: React.FC = () => {
  const { submitContactForm, contactSuccess } = useShop();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Product Formulation Inquiry');
  const [msg, setMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;

    submitContactForm(name, email, msg);

    // Clear
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="contact-support-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Title */}
        <div className="space-y-4" id="contact-headers">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">SECURE ENCRYPTION CHANNELS</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            Establish Secure Contact
          </h1>
          <p className="text-neutral-401 text-sm sm:text-base max-w-xl">
            Our active clinical support desk is staffed twenty-four hours daily by athletic trainers and metabolic researchers to handle ingredient inquiries or e-commerce delivery issues.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-body-grid">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-neutral-900 border border-white/5 p-6 sm:p-8 rounded-3xl" id="contact-form-box">
            
            {contactSuccess ? (
              <div className="bg-lime-900/10 border border-lime-400/20 text-lime-300 p-6 rounded-xl space-y-3 flex items-start gap-4" id="contact-success-notice">
                <Check className="w-8 h-8 text-lime-401 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-display font-medium text-white text-base">Transmission Secured Successfully!</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">Your support ticket has been encrypted under biological client-license terms. Our metabolic staff will respond on your registered email address within exactly 1 hour.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4" id="actual-contact-ticket">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-neutral-450 uppercase block">First & Last Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Liam Jenkins"
                      className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-[10px] font-mono text-neutral-450 uppercase block">Athlete Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. liam@athlete.com"
                      className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Subject Inquiry Category</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-[#121212] border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs focus:outline-none focus:border-lime-400 w-full font-mono select-theme h-[42px]"
                  >
                    <option value="Product Formulation Inquiry">Product Formulation Inquiry</option>
                    <option value="Billing & Subscription Plans">Billing & Subscription Plans</option>
                    <option value="Logistics Shipping delay tracking">Logistics Cold-Pack Shipping</option>
                    <option value="Secure Wholesale Partnership">Secure Wholesale Partnership</option>
                  </select>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Detailed Inquiry Message</label>
                  <textarea
                    required
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Provide full description. Please mention order IDs or tracking numbers if referring to transit delay issues..."
                    className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-550 focus:outline-none focus:border-lime-400 w-full font-sans leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-lime-400 hover:bg-lime-300 text-black font-mono font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>Settle Encrypted Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Support Cards */}
          <div className="lg:col-span-5 space-y-6 text-left" id="contact-info-cards">
            
            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6 space-y-4">
              <h3 className="font-display font-bold text-white text-base">Direct Channels</h3>
              
              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase block leading-none">LOGISTICS SUPPORT</span>
                    <span className="text-white">support@drbar.co</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase block leading-none">VIP ATHLETE HOTLINE</span>
                    <span className="text-white">+1 (800) 905-DRBAR</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-lime-400 shrink-0" />
                  <div>
                    <span className="text-[9px] text-neutral-500 uppercase block leading-none">BIOLAB LABS HEADQUARTERS</span>
                    <span className="text-white">124 Fitness Ridge Suite 4A, Boulder CO</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6.5 text-[11px] leading-relaxed text-neutral-450 space-y-3" id="biosafety-notice-card">
              <h4 className="font-display font-medium text-white flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-lime-400" /> Bio-Dynamic Safety Notice
              </h4>
              <p className="font-sans">
                For commercial security protocols, wholesale applications or ingredient audits require legal business registrations. We comply fully with FDA, cGMP, and local active fitness regulatory standards of metabolic health safety.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
