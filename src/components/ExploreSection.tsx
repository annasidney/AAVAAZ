import React, { useState, useMemo } from 'react';
import { VoicePost, CATEGORIES, Reactions } from '../types';
import { VoiceCard } from './VoiceCard';
import { Search, PlusCircle, Bookmark, Shield, Sparkles } from 'lucide-react';

interface ExploreSectionProps {
  voices: VoicePost[];
  onSelectVoice: (voice: VoicePost) => void;
  onReact: (id: string, reactionKey: keyof Reactions) => void;
  onToggleBookmark: (id: string) => void;
  onShare: (voice: VoicePost) => void;
  onOpenShareModal: () => void;
  showOnlyBookmarks: boolean;
  setShowOnlyBookmarks: (val: boolean) => void;
}

export const ExploreSection: React.FC<ExploreSectionProps> = ({
  voices,
  onSelectVoice,
  onReact,
  onToggleBookmark,
  onShare,
  onOpenShareModal,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'most-believed' | 'responses'>('latest');

  // Filter and sort survivor voices
  const filteredVoices = useMemo(() => {
    return voices
      .filter((v) => {
        if (showOnlyBookmarks && !v.isBookmarked) return false;
        if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = v.title.toLowerCase().includes(q);
          const matchContent = v.content.toLowerCase().includes(q);
          const matchAuthor = v.author.toLowerCase().includes(q);
          const matchCategory = v.category.toLowerCase().includes(q);
          return matchTitle || matchContent || matchAuthor || matchCategory;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'most-believed') {
          return (b.reactions.believe + b.reactions.notAlone + b.reactions.strength) - 
                 (a.reactions.believe + a.reactions.notAlone + a.reactions.strength);
        }
        if (sortBy === 'responses') {
          return b.comments.length - a.comments.length;
        }
        return 0;
      });
  }, [voices, selectedCategory, searchQuery, sortBy, showOnlyBookmarks]);

  return (
    <section id="explore" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative bg-[#0A0A0C]">
      
      {/* Background ambient pink blur */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-700/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-pink-500/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
            <span>✊</span>
            <span>The Living Archive of Truth</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Survivor Voices
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-2xl">
            Uncensored testimonies, healing reflections, and hard truths. Read with reverence, hold space, and remember: we believe you.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              showOnlyBookmarks 
                ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(255,45,120,0.5)]' 
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : ''}`} />
            <span>{showOnlyBookmarks ? 'Showing Saved' : 'Saved Testimonies'}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full shadow-[0_0_20px_rgba(255,45,120,0.4)] transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Break the Silence</span>
          </button>
        </div>
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-pink-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search truths, recovery journeys, reflections..."
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-pink-500/30 bg-[#121217] focus:bg-[#181820] focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-xs text-white transition-all placeholder:text-neutral-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs self-end sm:self-auto">
          <span className="text-neutral-400 font-medium">Sort:</span>
          <div className="inline-flex rounded-full bg-[#121217] border border-pink-500/25 p-0.5">
            <button
              onClick={() => setSortBy('latest')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                sortBy === 'latest' ? 'bg-pink-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Latest
            </button>
            <button
              onClick={() => setSortBy('most-believed')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                sortBy === 'most-believed' ? 'bg-pink-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Most Supported ✊
            </button>
            <button
              onClick={() => setSortBy('responses')}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                sortBy === 'responses' ? 'bg-pink-600 text-white shadow-xs' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Solidarity Notes 💌
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills in Black and Pink */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(255,45,120,0.5)]'
              : 'bg-[#121217] text-neutral-300 hover:text-pink-300 border border-neutral-800 hover:border-pink-500/40'
          }`}
        >
          All Testimonies ({voices.length})
        </button>

        {CATEGORIES.map((cat) => {
          const count = voices.filter((v) => v.category === cat).length;
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(255,45,120,0.5)] scale-102'
                  : 'bg-[#121217] text-neutral-300 hover:text-pink-300 border border-neutral-800 hover:border-pink-500/40'
              }`}
            >
              {cat} <span className="opacity-70 font-normal">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Voice Cards Grid */}
      {filteredVoices.length === 0 ? (
        <div className="text-center py-20 bg-[#121217] rounded-3xl border border-pink-500/20 p-8 max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-400 flex items-center justify-center mx-auto mb-4 text-2xl">
            🖤
          </div>
          <h3 className="font-display text-lg font-bold text-white mb-2">
            No testimonies found
          </h3>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            {showOnlyBookmarks 
              ? "You haven't bookmarked any testimonies yet. Click the bookmark icon on any card to keep it close."
              : "No testimonies under this category yet. When you are ready, your truth has an unconditional place here."}
          </p>
          <button
            onClick={onOpenShareModal}
            className="px-5 py-2.5 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-full transition-colors cursor-pointer"
          >
            Break the Silence
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVoices.map((voice) => (
            <VoiceCard
              key={voice.id}
              voice={voice}
              onSelect={onSelectVoice}
              onReact={onReact}
              onToggleBookmark={onToggleBookmark}
              onShare={onShare}
            />
          ))}
        </div>
      )}
    </section>
  );
};
