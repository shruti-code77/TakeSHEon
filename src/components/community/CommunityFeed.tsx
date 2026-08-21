import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  MessageSquare,
  ThumbsUp,
  PlusCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Tag,
  IndianRupee,
  Users,
} from 'lucide-react';
import { AskCommunityModal } from '../entrepreneur/AskCommunityModal';

export const CommunityFeed: React.FC = () => {
  const { posts, setSelectedPostId, setActiveView, currentRole } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [isAskModalOpen, setIsAskModalOpen] = useState(false);

  const categories = ['All', 'Clothing', 'Tailoring', 'Beauty', 'Bakery', 'Food', 'Jewellery', 'Chakki', 'Mehendi', 'Services'];
  const cities = ['All', 'Akola', 'Shegaon', 'Nagpur', 'Pune', 'Mumbai'];

  const filteredPosts = posts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesCity = selectedCity === 'All' || post.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesQuery && matchesCat && matchesCity;
  });

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#F3E8FF] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#1F2937]">Community Challenges</h1>
            <span className="text-xs font-bold text-[#7C3AED] bg-[#F5F3FF] border border-[#E9D5FF] px-2.5 py-0.5 rounded-full">
              {posts.length} Active Challenges
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real micro-business problems submitted by women entrepreneurs seeking community intelligence.
          </p>
        </div>

        {currentRole === 'entrepreneur' && (
          <button
            id="feed-ask-problem-btn"
            onClick={() => setIsAskModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:from-[#6D28D9] hover:to-[#BE185D] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Ask a Question</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#F3E8FF] shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by challenge, business name, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7C3AED] focus:outline-hidden"
            />
          </div>

          {/* City Dropdown */}
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#DB2777] shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#7C3AED] focus:outline-hidden bg-white font-medium"
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city === 'All' ? 'All Cities' : city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-[#F5F3FF] hover:text-[#7C3AED]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Post Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPosts.length === 0 ? (
          <div className="col-span-2 py-12 text-center bg-white rounded-2xl border border-[#F3E8FF] text-gray-400">
            <p className="text-sm font-semibold">No challenges match your search filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedCity('All');
              }}
              className="mt-2 text-xs text-[#7C3AED] font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => {
                setSelectedPostId(post.id);
                setActiveView('discussion');
              }}
              className="bg-white hover:bg-[#FDFCFE] p-5 rounded-2xl border border-[#F3E8FF] hover:border-[#E9D5FF] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Business Info Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F3FF] text-[#7C3AED] font-black flex items-center justify-center text-sm shrink-0 border border-[#E9D5FF]">
                      {post.businessName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold text-[#1F2937] group-hover:text-[#7C3AED] transition">
                          {post.businessName}
                        </h4>
                        {post.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 font-medium">
                        📍 {post.city} • {post.category}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                    {post.createdAt}
                  </span>
                </div>

                {/* Challenge Title & Snippet */}
                <div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#1F2937] leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                </div>

                {/* Current Situation Metrics Banner */}
                <div className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl text-[11px] text-gray-600 font-semibold border border-gray-100">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-[#7C3AED]" />
                    {post.currentCustomers} customers/mo
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IndianRupee className="w-3 h-3 text-emerald-600" />
                    ₹{post.currentRevenue.toLocaleString('en-IN')}/mo
                  </span>
                </div>
              </div>

              {/* Bottom Meta & Button */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                <div className="flex items-center gap-4 text-gray-500">
                  <span className="flex items-center gap-1 font-bold text-[#7C3AED]">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {post.suggestionCount} Ideas
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {post.votes}
                  </span>
                </div>

                <span className="font-bold text-[#7C3AED] group-hover:text-[#6D28D9] flex items-center gap-1">
                  <span>View Discussion</span>
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <AskCommunityModal
        isOpen={isAskModalOpen}
        onClose={() => setIsAskModalOpen(false)}
      />
    </div>
  );
};
