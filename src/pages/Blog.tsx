import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { blogPostsList } from '../data/staticData';
import { productsList } from '../data/products';
import { ArrowLeft, Clock, User, Calendar, Tag, ChevronRight, Share2, Sparkles } from 'lucide-react';

export const Blog: React.FC = () => {
  const { navigateTo, selectedBlogId, navigateTo: contextNavigate } = useShop();
  
  const [activeCategory, setActiveCategory] = useState<'all' | 'Fitness' | 'Nutrition' | 'Science'>('all');
  const [copied, setCopied] = useState(false);

  // Filters blogs
  const filteredBlogs = blogPostsList.filter(post => {
    if (activeCategory === 'all') return true;
    return post.category === activeCategory;
  });

  // Share URL simulation
  const handleShare = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find active reading post
  const activePost = blogPostsList.find(b => b.id === selectedBlogId);

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white py-16 px-4 sm:px-6 text-left" id="blog-page-parent">
      <div className="max-w-5xl mx-auto">
        
        {activePost ? (
          /* ---------------- DETAIL VIEW OF SINGLE ARTICLE ---------------- */
          <div className="space-y-10" id="blog-editorial-reader">
            
            {/* Back to feed button */}
            <button
              onClick={() => navigateTo('blog', { blogId: undefined })}
              className="group text-neutral-400 hover:text-white flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest uppercase cursor-pointer bg-transparent border-0"
              id="back-to-blogs-list"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Editorial Feed</span>
            </button>

            {/* Banner Header information */}
            <div className="space-y-4" id="details-header">
              <span className="bg-lime-450/15 text-lime-400 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full inline-block">
                {activePost.category}
              </span>
              
              <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                {activePost.title}
              </h1>

              {/* Meta info tags list */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-450">
                <span className="flex items-center gap-1"><User className="w-4 h-4 text-lime-400" /> {activePost.author}</span>
                <span className="hidden sm:inline text-neutral-700">|</span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {activePost.date}</span>
                <span className="hidden sm:inline text-neutral-700">|</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {activePost.readTime}</span>
              </div>
            </div>

            {/* Single hero header illustration image */}
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/5 bg-neutral-900" id="article-hero-panel">
              <img 
                src={activePost.image} 
                alt={activePost.title} 
                className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Editorial Content split paragraphs */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              <div className="lg:col-span-8 space-y-6 text-sm sm:text-base leading-relaxed text-neutral-300 font-sans text-left" id="article-body-p-rows">
                {activePost.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {/* Sub Tags display */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase h-6 flex items-center pr-1.5"><Tag className="w-3 h-3 text-neutral-600" /> SEO TARGETS:</span>
                  {activePost.tags.map((tg, i) => (
                    <span key={i} className="bg-neutral-900 border border-white/5 rounded px-2.5 py-1 text-[10px] font-mono text-neutral-400 uppercase">
                      #{tg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right column sidebar share and shop quick promo */}
              <div className="lg:col-span-4 bg-neutral-900 border border-white/5 rounded-2xl p-6.5 text-left space-y-6 shrink-0" id="article-widget-sidebar">
                
                {/* Share interaction */}
                <div className="space-y-2">
                  <span className="text-[9px] font-mono font-bold text-neutral-500 block uppercase">SHARE SCIENCE REPORT</span>
                  <button
                    onClick={handleShare}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-xs font-bold py-3.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-lime-400" />
                    <span>{copied ? 'COPIED TO CLIPBOARD' : 'SHARE UNIQUE RAW URL'}</span>
                  </button>
                </div>

                {/* Direct recovery box promotion */}
                <div className="bg-neutral-950 border border-white/5 p-4 rounded-xl text-left space-y-4">
                  <span className="bg-lime-400 text-black text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-full inline-block">Best recovery matchup</span>
                  <h4 className="font-display font-bold text-white text-xs sm:text-sm">Peanut Butter Caramel Salt</h4>
                  <p className="text-[11px] text-neutral-405 leading-snug">Designed precisely with 21g protein structure and only 1g net sugar response parameters.</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-mono">
                    <span className="font-bold text-white">$38.00 / Box</span>
                    <button
                      onClick={() => navigateTo('shop', { productId: 'peanut-butter-caramel-salt' })}
                      className="bg-lime-400 hover:bg-lime-300 text-black text-[9px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg cursor-pointer"
                    >
                      CLAIM FLAVOR
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>
        ) : (
          /* ---------------- DEFAULT GRID FEED LIST VIEW ---------------- */
          <div className="space-y-12" id="blog-main-feed">
            
            {/* Headers */}
            <div className="space-y-4" id="main-feed-header">
              <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">DR BAR CLINICAL NEWS</span>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
                Athletic Recipes & Research Tips
              </h1>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl leading-relaxed animate-pulse-micro">
                Discover muscle optimization guidelines, raw recipe additions, and glycemic intelligence reports compiled directly by metabolic research doctors.
              </p>
            </div>

            {/* Category tabs filters */}
            <div className="flex flex-wrap gap-2 pt-2" id="blog-category-tabs">
              {(['all', 'Fitness', 'Nutrition', 'Science'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer uppercase ${
                    activeCategory === cat ? 'bg-lime-400 text-black font-bold' : 'bg-neutral-900 border border-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Editorial Reports' : cat}
                </button>
              ))}
            </div>

            {/* Blog grids */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blog-cards-grid">
              {filteredBlogs.map(post => (
                <div 
                  key={post.id}
                  className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-neutral-700/60 transition-all flex flex-col justify-between text-left group"
                >
                  {/* Thumbnail */}
                  <div className="h-44 bg-[#121212] overflow-hidden relative shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    
                    <span className="absolute top-4 left-4 bg-[#0a0a0a]/90 border border-white/10 text-[9px] font-mono font-bold px-2 py-0.5 rounded text-lime-400 uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>

                  {/* Body info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                        <Clock className="w-3 h-3 text-lime-400" /> <span>{post.readTime}</span>
                        <span>&bull;</span>
                        <span>{post.date}</span>
                      </div>
                      
                      <h3 className="font-display font-bold text-white text-base sm:text-lg leading-tight group-hover:text-lime-400 transition-colors cursor-pointer" onClick={() => navigateTo('blog', { blogId: post.id })}>
                        {post.title}
                      </h3>
                      
                      <p className="text-neutral-450 text-xs leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('blog', { blogId: post.id })}
                      className="group/btn text-lime-400 hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all text-left pt-2 border-t border-white/5"
                    >
                      <span>Read Full Scientific Report</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
