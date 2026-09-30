import React, { useState, useEffect } from 'react';
import { Bookmark, Menu, X, ShieldAlert, LogOut, Flame, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenShareModal: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookmarkedCount: number;
  onToggleBookmarksOnly: () => void;
  showOnlyBookmarks: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenShareModal,
  activeTab,
  setActiveTab,
  bookmarkedCount,
  onToggleBookmarksOnly,
  showOnlyBookmarks
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick Escape (critical survivor safety feature)
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleQuickExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (sectionId: string, tabName: string) => {
    setActiveTab(tabName);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0C]/95 backdrop-blur-lg border-b border-pink-500/25 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('hero', 'home')}
            className="group flex items-center gap-2 text-left focus-visible:outline-none cursor-pointer"
          >
            <span className="font-display text-2xl sm:text-3xl font-black tracking-widest text-white group-hover:text-pink-400 transition-colors uppercase">
              AAVAAZ
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_12px_#FF2D78] animate-pulse" />
          </button>

          <span className="hidden lg:inline-block text-[11px] font-bold tracking-wider uppercase text-pink-400/90 border border-pink-500/30 bg-pink-950/40 px-2.5 py-0.5 rounded-full">
            Survivors Sanctuary
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-neutral-300">
          <button
            onClick={() => handleNavClick('hero', 'home')}
            className={`transition-colors hover:text-pink-400 cursor-pointer ${activeTab === 'home' ? 'text-pink-400 font-bold' : ''}`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('explore', 'explore')}
            className={`transition-colors hover:text-pink-400 cursor-pointer ${activeTab === 'explore' ? 'text-pink-400 font-bold' : ''}`}
          >
            Survivor Voices
          </button>
          <button
            onClick={() => handleNavClick('prompts', 'prompts')}
            className={`transition-colors hover:text-pink-400 cursor-pointer ${activeTab === 'prompts' ? 'text-pink-400 font-bold' : ''}`}
          >
            Truth Prompts
          </button>
          <button
            onClick={() => handleNavClick('about', 'about')}
            className={`transition-colors hover:text-pink-400 cursor-pointer ${activeTab === 'about' ? 'text-pink-400 font-bold' : ''}`}
          >
            Our Stand
          </button>
          
          {bookmarkedCount > 0 && (
            <button
              onClick={onToggleBookmarksOnly}
              className={`flex items-center gap-1.5 transition-all text-xs py-1 px-3 rounded-full cursor-pointer ${
                showOnlyBookmarks 
                  ? 'bg-pink-600 text-white font-bold shadow-[0_0_12px_rgba(255,45,120,0.5)]' 
                  : 'text-neutral-400 hover:text-pink-300 bg-neutral-900 border border-neutral-700'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Saved ({bookmarkedCount})</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions + Quick Exit Safety */}
        <div className="flex items-center gap-3">
          {/* Quick Exit Button (Vital Safety) */}
          <button
            onClick={handleQuickExit}
            title="Immediately redirects to Google for your privacy and safety (Shortcut: ESC)"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-full transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-pink-500" />
            <span className="hidden sm:inline">Quick Exit</span>
            <span className="text-[10px] text-neutral-500 bg-neutral-800 px-1 rounded">ESC</span>
          </button>

          {/* Share Voice CTA */}
          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 px-4.5 py-2 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full shadow-[0_0_20px_rgba(255,45,120,0.4)] hover:shadow-[0_0_30px_rgba(255,45,120,0.6)] transition-all transform hover:scale-102 whitespace-nowrap cursor-pointer"
          >
            <span>Break the Silence</span>
            <span>✊</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus-visible:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0C] border-b border-pink-500/20 px-6 py-4 space-y-3">
          <button
            onClick={() => handleNavClick('hero', 'home')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-300 hover:text-pink-400"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('explore', 'explore')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-300 hover:text-pink-400"
          >
            Survivor Voices
          </button>
          <button
            onClick={() => handleNavClick('prompts', 'prompts')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-300 hover:text-pink-400"
          >
            Truth Prompts
          </button>
          <button
            onClick={() => handleNavClick('about', 'about')}
            className="block w-full text-left py-2 text-sm font-semibold text-neutral-300 hover:text-pink-400"
          >
            Our Stand
          </button>
          <button
            onClick={handleQuickExit}
            className="flex items-center gap-2 py-2 text-sm font-bold text-pink-400"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Quick Exit (Leave Page Instantly)</span>
          </button>
        </div>
      )}
    </header>
  );
};
