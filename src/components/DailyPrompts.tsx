import React from 'react';
import { SURVIVOR_PROMPTS } from '../data/initialVoices';
import { ArrowRight, Flame } from 'lucide-react';
import { Category } from '../types';

interface DailyPromptsProps {
  onSelectPrompt: (prompt: string, category: Category) => void;
}

export const DailyPrompts: React.FC<DailyPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <section id="prompts" className="py-20 relative bg-[#070709] border-t border-b border-pink-500/20">
      
      {/* Background ambient pink blur */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-950/10 via-transparent to-pink-950/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/30 text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
            <span>🔥</span>
            <span>Prompts for the Unspoken</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
            Finding Words for the Heavy Silence
          </h2>
          <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
            Trauma often robs us of our language. When you feel ready, choose a spark below to unlock what has been held inside for too long.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SURVIVOR_PROMPTS.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => onSelectPrompt(item.prompt, item.category)}
                className="relative bg-[#121217] hover:bg-[#181820] rounded-3xl p-6 border border-pink-500/20 hover:border-pink-500/60 shadow-lg hover:shadow-[0_0_25px_rgba(255,45,120,0.25)] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold bg-pink-950/60 border border-pink-500/40 text-pink-300">
                      {item.category}
                    </span>
                    <span className="text-pink-500 group-hover:scale-125 transition-transform">✦</span>
                  </div>

                  <p className="font-display text-base font-bold text-white group-hover:text-pink-200 transition-colors leading-snug">
                    "{item.prompt}"
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold text-pink-400 border-t border-neutral-800 mt-6">
                  <span>Write this truth</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
