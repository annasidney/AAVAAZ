import React, { useState } from 'react';
import { Phone, Shield, ExternalLink, X, HeartHandshake, AlertCircle } from 'lucide-react';
import { CRISIS_RESOURCES } from '../data/initialVoices';

export const CrisisBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Pinned Top / Secondary Hotline Alert */}
      <div className="bg-gradient-to-r from-pink-950 via-black to-pink-950 border-b border-pink-500/30 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-pink-200">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="font-semibold text-white">Need immediate support?</span>
            <span className="hidden sm:inline text-pink-200/80">
              Free, confidential 24/7 hotlines are always here for you.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:18006564673"
              className="text-pink-400 hover:text-pink-300 font-bold flex items-center gap-1 underline underline-offset-2"
            >
              <Phone className="w-3 h-3" />
              <span>RAINN 1-800-656-4673</span>
            </a>
            <span className="text-pink-500/40">|</span>
            <button
              onClick={() => setIsOpen(true)}
              className="text-xs font-semibold text-pink-300 hover:text-white underline underline-offset-2 cursor-pointer"
            >
              All Crisis Resources
            </button>
          </div>
        </div>
      </div>

      {/* Full Crisis Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="relative w-full max-w-lg bg-[#121217] rounded-3xl p-6 sm:p-8 border border-pink-500/40 shadow-[0_0_50px_rgba(255,45,120,0.3)] text-white space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-pink-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-pink-600/30 border border-pink-500/60 flex items-center justify-center text-pink-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    Confidential Crisis Support
                  </h3>
                  <p className="text-xs text-pink-200/70">
                    You do not have to carry this alone.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {CRISIS_RESOURCES.map((res, i) => (
                <div 
                  key={i} 
                  className="p-4 rounded-2xl bg-black/50 border border-pink-500/20 hover:border-pink-500/50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-pink-200">{res.name}</span>
                    <span className="text-xs font-mono font-bold text-pink-400 bg-pink-950/60 px-2 py-0.5 rounded-md border border-pink-800/60">
                      {res.number}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {res.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 border-t border-pink-500/20 flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>
                All hotlines are confidential, anonymous, and operate 24 hours a day, 7 days a week.
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
