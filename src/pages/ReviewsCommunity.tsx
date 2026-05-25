import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { productsList } from '../data/products';
import { Star, ShieldCheck, Heart, Sparkles, MessageSquare, Check, UserCheck } from 'lucide-react';

export const ReviewsCommunity: React.FC = () => {
  const { reviews, addNewReview } = useShop();

  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(productsList[0].id);
  const [success, setSuccess] = useState(false);

  // Likes state tracking locally 
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});
  const [extraLikes, setExtraLikes] = useState<{ [id: string]: number }>({});

  const handleToggleLike = (id: string) => {
    if (likedReviews[id]) {
      setLikedReviews(prev => ({ ...prev, [id]: false }));
      setExtraLikes(prev => ({ ...prev, [id]: (prev[id] || 0) - 1 }));
    } else {
      setLikedReviews(prev => ({ ...prev, [id]: true }));
      setExtraLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !comment) return;

    addNewReview(selectedProduct, rating, title, comment, name);
    setSuccess(true);
    
    // Clear
    setName('');
    setRating(5);
    setTitle('');
    setComment('');

    setTimeout(() => setSuccess(false), 4000);
  };

  // Calculations
  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);
  const fiveStarsCount = reviews.filter(r => r.rating === 5).length;
  const fourStarsCount = reviews.filter(r => r.rating === 4).length;
  
  const fiveStarPct = ((fiveStarsCount / reviews.length) * 100).toFixed(0);
  const fourStarPct = ((fourStarsCount / reviews.length) * 100).toFixed(0);

  return (
    <div className="bg-[#0b0b0b] text-white py-16 px-4 sm:px-6 text-left" id="community-reviews-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4" id="community-headers">
          <span className="text-xs font-mono font-bold tracking-widest text-lime-400 block uppercase mb-1">STRENGTH IN COHESION</span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            The Active Community Log
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl">
            Read certified recovery logs from clinical testers and gym-goers. Add your custom physical performance data to help others optimize their macronutrient choices.
          </p>
        </div>

        {/* 1. Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center" id="reviews-stats-row">
          
          {/* Average Badge card */}
          <div className="md:col-span-4 bg-neutral-900 border border-white/5 p-6 sm:p-7 rounded-2xl text-center space-y-3" id="scores-metric-badge">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block font-semibold">CUMULATIVE EXPERT AVERAGE</span>
            <span className="block font-sans font-black text-5xl sm:text-6xl text-lime-400">{averageRating}</span>
            
            <div className="flex justify-center items-center gap-1 text-lime-400 py-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-lime-400" />)}
            </div>
            
            <span className="block text-xs text-neutral-400">Based on {reviews.length} total certified athlete logs</span>
          </div>

          {/* Distribution bar chart */}
          <div className="md:col-span-8 bg-neutral-900 border border-white/5 p-6 sm:p-7 rounded-2xl space-y-4" id="distribution-metric-card">
            <span className="text-[10px] font-mono text-neutral-555 uppercase tracking-widest block font-bold">RATING PROFILE DISTRIBUTION</span>
            
            <div className="space-y-3 font-mono text-xs">
              {/* 5 Star */}
              <div className="flex items-center gap-3">
                <span className="w-12 text-neutral-400">5 Star</span>
                <div className="flex-1 bg-black h-2.5 rounded-full overflow-hidden">
                  <div className="bg-lime-400 h-full rounded-full" style={{ width: `${fiveStarPct}%` }} />
                </div>
                <span className="w-10 text-right text-white font-bold">{fiveStarPct}%</span>
              </div>

              {/* 4 Star */}
              <div className="flex items-center gap-3">
                <span className="w-12 text-neutral-400">4 Star</span>
                <div className="flex-1 bg-black h-2.5 rounded-full overflow-hidden">
                  <div className="bg-lime-400 h-full rounded-full opacity-60" style={{ width: `${fourStarPct}%` }} />
                </div>
                <span className="w-10 text-right text-white font-bold">{fourStarPct}%</span>
              </div>

              {/* Others */}
              <div className="flex items-center gap-3 opacity-40">
                <span className="w-12 text-neutral-500">3 Star</span>
                <div className="flex-1 bg-black h-2.5 rounded-full overflow-hidden">
                  <div className="bg-lime-400 h-full rounded-full" style={{ width: `0%` }} />
                </div>
                <span className="w-10 text-right text-neutral-500">0%</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. Interactive Review Submission form */}
        <div className="bg-neutral-900/60 border border-white/5 p-6 sm:p-8 rounded-3xl" id="review-composer-formbox">
          
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-lime-400" />
            <h3 className="font-display font-bold text-lg text-white font-mono uppercase tracking-tight">Record Your Custom Performance Log</h3>
          </div>

          {success ? (
            <div className="bg-lime-900/10 border border-lime-400/20 text-lime-300 p-6 rounded-xl space-y-2 flex items-center gap-4" id="feedback-submitted-success">
              <Check className="w-8 h-8 text-lime-400 shrink-0" />
              <div>
                <h4 className="font-display font-medium text-white">Log Compiled Successfully!</h4>
                <p className="text-xs text-neutral-400">Your customer data matches our scientific verification blocks. It is now loaded into the active stream.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4" id="compost-review-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Athlete Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Liam Sterling, PT"
                    className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono"
                  />
                </div>

                {/* Score Selector */}
                <div className="space-y-1.5 animate-pulse-tiny">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Score Rating</label>
                  <div className="flex gap-2.5 items-center bg-[#121212] border border-white/10 rounded-xl px-4 py-2.5">
                    {[1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setRating(val)}
                        className={`text-2xl cursor-pointer focus:outline-none transition-colors border-0 ${val <= rating ? 'text-lime-400' : 'text-neutral-700'}`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="font-mono text-xs font-bold text-lime-400 pl-2">{rating}/5 Stars</span>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Title */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Title Headline</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Tremendous pre-workout digest speed"
                    className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-sans"
                  />
                </div>

                {/* Flavor Selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-450 uppercase block">Flavor Tested</label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                    className="bg-[#121212] border border-white/10 rounded-xl py-2.5 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-mono select-theme h-[42px]"
                  >
                    {productsList.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Text comment */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-450 uppercase block">Your Functional Report Detail</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Explain flavor, crunch texturing, bloating absence, and physical training performance changes..."
                  className="bg-[#121212] border border-white/10 rounded-xl py-3 px-4 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-lime-400 w-full font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="bg-lime-400 hover:bg-lime-300 text-black text-xs font-mono font-bold uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-pointer w-full sm:w-auto"
              >
                Compile My Recovery Log
              </button>
            </form>
          )}
        </div>

        {/* 3. Stream List Feedback feed */}
        <div className="space-y-6" id="certified-logs-feed">
          <h3 className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-widest">ACTIVE RAW COMMUNICATION STREAM</h3>
          
          <div className="space-y-6" id="reviews-actual-cards-list">
            {reviews.map(rev => {
              const matchesLiked = likedReviews[rev.id] || false;
              const currentLikesCount = rev.likes + (extraLikes[rev.id] || 0);

              return (
                <div 
                  key={rev.id}
                  className="bg-neutral-900 border border-white/5 p-6 sm:p-7 rounded-2xl space-y-4"
                  id={`review-item-card-${rev.id}`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left">
                    <div className="flex items-center gap-3">
                      
                      {rev.avatar ? (
                        <img 
                          src={rev.avatar} 
                          alt={rev.name} 
                          className="w-10 h-10 rounded-full object-cover grayscale border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center font-mono font-bold text-lime-400 text-sm">
                          {rev.name[0]}
                        </div>
                      )}

                      <div className="text-left">
                        <span className="block text-xs font-mono font-bold text-white flex items-center gap-1.5">
                          {rev.name}
                          {rev.verified && (
                            <span className="text-lime-404 bg-lime-400/10 text-lime-400 text-[8px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider flex items-center gap-0.5">
                              <UserCheck className="w-3 h-3 text-lime-400" /> Verified Order
                            </span>
                          )}
                        </span>
                        <span className="block text-[10px] font-mono text-neutral-500">{rev.date} &bull; Formulation: {rev.flavor}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-lime-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-lime-400' : 'text-neutral-700'}`} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <h4 className="font-display font-semibold text-white text-sm sm:text-base">{rev.title}</h4>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">{rev.comment}</p>
                  </div>

                  {/* Likes / Upvote counter */}
                  <div className="border-t border-white/5 pt-3.5 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => handleToggleLike(rev.id)}
                      className={`flex items-center gap-1.5 cursor-pointer border-0 bg-transparent py-1 ${matchesLiked ? 'text-lime-450 font-bold' : 'text-neutral-500 hover:text-white'}`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${matchesLiked ? 'text-red-500 fill-red-500' : ''}`} />
                      <span>Upvote Log ({currentLikesCount})</span>
                    </button>
                    
                    <span className="text-[10px] text-neutral-600 uppercase">256-BIT CRYPT SECURED</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
