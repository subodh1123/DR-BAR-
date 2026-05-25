import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { faqList } from '../data/staticData';
import { HelpCircle, ChevronDown, Search, MessageCircle, AlertCircle, Heart } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { navigateTo } = useShop();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Filters based on query
  const filteredFaqs = faqList.filter(item => {
    return item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="faq-science-page">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Headers */}
        <div className="space-y-4 text-center max-w-xl mx-auto" id="faq-headers">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">TRANSPARENT ANSWERS</span>
          <h1 className="font-display font-bold text-4xl text-white tracking-tight leading-none mb-3">
            Physiology & Service Support FAQs
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm">
            Read complete physical research details, chemical disclosure files, auto-delivery options, and express cold-packet shipping schedules.
          </p>
        </div>

        {/* Search input accordions */}
        <div className="relative max-w-md mx-auto" id="faq-search-box">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-520 w-4.5 h-4.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search molecular definitions, subscriptions..."
            className="bg-neutral-900 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
          />
        </div>

        {/* Accordions */}
        {filteredFaqs.length === 0 ? (
          <div className="bg-neutral-900 border border-white/5 rounded-2xl py-12 px-4 text-center text-neutral-400" id="faq-empty-state">
            <AlertCircle className="w-8 h-8 text-neutral-650 mx-auto mb-3" />
            <span className="text-xs font-mono block uppercase">No questions matched search</span>
          </div>
        ) : (
          <div className="space-y-4" id="faq-accordions-group">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden transition-all text-left"
                  id={`accordion-item-${idx}`}
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full p-4.5 sm:p-5 flex items-center justify-between gap-4 cursor-pointer text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3.5 text-left">
                      <HelpCircle className="w-5 h-5 text-lime-400 shrink-0" />
                      <span className="font-display font-bold text-sm sm:text-base text-white hover:text-lime-400 transition-colors">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-lime-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-5.5 sm:px-5 sm:pb-6 text-neutral-350 text-xs sm:text-sm leading-relaxed border-t border-white/2 pt-4">
                      <span className="text-[9px] font-mono text-neutral-500 block uppercase mb-1.5 font-bold">CATEGORY: {faq.category}</span>
                      <p className="font-sans leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Form CTA block helper */}
        <div className="bg-neutral-900 border border-white/5 rounded-2xl p-6.5 text-center space-y-4" id="faq-footer">
          <MessageCircle className="w-6 h-6 text-lime-400 mx-auto" />
          <h4 className="font-display font-semibold text-white">Have a more complex athletic inquiry?</h4>
          <p className="text-neutral-450 text-xs max-w-md mx-auto">Our clinical nutrition consultants and metabolic staff are available round-the-clock for biosafety research reporting.</p>
          <button 
            type="button" 
            onClick={() => navigateTo('contact')}
            className="bg-lime-400 hover:bg-lime-300 text-black text-[10px] font-mono font-bold uppercase tracking-widest px-6 py-3 rounded-xl transition-all cursor-pointer inline-block"
          >
            Settle Support Tickets
          </button>
        </div>

      </div>
    </div>
  );
};
