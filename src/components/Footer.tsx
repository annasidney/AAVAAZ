import React from 'react';
import { Phone, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onOpenShareModal: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShareModal, onNavigate }) => {
  return (
    <footer className="bg-[#050507] border-t border-pink-500/20 pt-16 pb-12 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-neutral-800">
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-2">
              <span className="font-display text-2xl font-black tracking-widest text-white uppercase">
                AAVAAZ
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_8px_#FF2D78]" />
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Every voice matters. A sacred, confidential space for assault survivors. We believe you, we hold space for you, and you will never walk this road alone.
            </p>
          </div>

          {/* Quick links & action */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-neutral-300">
            <button
              onClick={() => onNavigate('hero')}
              className="hover:text-pink-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('explore')}
              className="hover:text-pink-400 transition-colors cursor-pointer"
            >
              Survivor Voices
            </button>
            <button
              onClick={() => onNavigate('prompts')}
              className="hover:text-pink-400 transition-colors cursor-pointer"
            >
              Truth Prompts
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-pink-400 transition-colors cursor-pointer"
            >
              Our Stand
            </button>
            <button
              onClick={onOpenShareModal}
              className="px-4.5 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-full transition-colors cursor-pointer shadow-[0_0_15px_rgba(255,45,120,0.4)]"
            >
              Break the Silence
            </button>
          </div>
        </div>

        {/* 24/7 Hotline Callout */}
        <div className="py-6 border-b border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-pink-400" />
            <span className="font-bold text-pink-300">National Sexual Assault Hotline (24/7 Confidential):</span>
            <a href="tel:18006564673" className="text-white font-mono font-bold hover:underline">1-800-656-4673</a>
          </div>
          <div>
            Crisis Text Line: <span className="text-white font-mono font-bold">Text HOME to 741741</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} AAVAAZ Sanctuary. Built in solidarity with survivors everywhere.
          </div>
          <div className="flex items-center gap-1.5 font-bold text-neutral-400">
            <span>You are believed. You are not broken.</span>
            <span className="text-pink-500">🖤</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
