import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lightbulb, Upload, AlertCircle, Sparkles, Image as ImageIcon } from 'lucide-react';

interface AskCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AskCommunityModal: React.FC<AskCommunityModalProps> = ({ isOpen, onClose }) => {
  const { currentBusiness, createPost, posts, currentUser, setActiveView } = useApp();

  const userPosts = posts.filter((p) => p.businessId === currentBusiness?.id);
  const postLimit = currentUser.isPro ? 5 : 2;
  const postsRemaining = Math.max(0, postLimit - userPosts.length);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentCustomers, setCurrentCustomers] = useState(currentBusiness?.averageCustomers || 100);
  const [currentRevenue, setCurrentRevenue] = useState(currentBusiness?.monthlyRevenue || 50000);
  const [mainChallenge, setMainChallenge] = useState('');
  const [category, setCategory] = useState(currentBusiness?.category || 'Clothing');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title || !description || !mainChallenge) {
      setErrorMsg('Please fill in the problem title, challenge, and description.');
      return;
    }

    const result = createPost({
      businessId: currentBusiness?.id || 'biz-priya',
      title,
      description,
      currentCustomers: Number(currentCustomers),
      currentRevenue: Number(currentRevenue),
      mainChallenge,
      category,
      imageUrl: imageUrl || currentBusiness?.imageUrl,
    });

    if (!result.success) {
      setErrorMsg(result.error || 'Failed to post question');
      return;
    }

    onClose();
    setActiveView('community-feed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-purple-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-950 to-pink-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-purple-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-between pr-8">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-300 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" /> Ask the Community
            </span>
            <span className="text-xs font-bold bg-white/20 px-2.5 py-0.5 rounded-full text-purple-100">
              Posts remaining: {postsRemaining}/{postLimit}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            Share Your Business Problem
          </h2>
          <p className="text-xs text-purple-200 mt-0.5">
            Your business challenge will be shared with the TechSHEon community so advisors can suggest practical solutions.
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Business Problem Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. How can I increase repeat customers for my boutique?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
              >
                <option value="Clothing">Clothing / Boutique</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Beauty">Beauty Parlour</option>
                <option value="Bakery">Bakery</option>
                <option value="Food">Home Food / Papad</option>
                <option value="Jewellery">Handmade Jewellery</option>
                <option value="Chakki">Chakki / Flour Mill</option>
                <option value="Mehendi">Mehendi Designer</option>
                <option value="Services">Local Service</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Main Single Challenge *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Many customers buy once but don't return."
                value={mainChallenge}
                onChange={(e) => setMainChallenge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Current Monthly Customers
              </label>
              <input
                type="number"
                min="0"
                value={currentCustomers}
                onChange={(e) => setCurrentCustomers(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Current Monthly Revenue (₹)
              </label>
              <input
                type="number"
                min="0"
                value={currentRevenue}
                onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Detailed Description & Context *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Provide background on your store location, pricing range, what you have already tried, and what constraints you have..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Business Photo / Product Image (Optional URL)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => setImageUrl('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80')}
                className="text-xs px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition shrink-0"
              >
                Use Sample
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              id="submit-ask-community-btn"
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition"
            >
              Ask the Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
