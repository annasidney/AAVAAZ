import React from 'react';
import { ArrowDown, Shield, Heart, Users, Sparkles, Feather, AlertTriangle } from 'lucide-react';
import heroFiguresImg from '../assets/images/hero_figures_bw_1790787290770.jpg';

interface HeroProps {
  onOpenShareModal: () => void;
  onExploreClick: () => void;
  totalVoicesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenShareModal,
  onExploreClick,
  totalVoicesCount,
}) => {
  return (
    <section id="hero" className="relative pt-6 pb-20 md:pt-10 md:pb-28 overflow-hidden bg-[#0A0A0C]">
      
      {/* VIBRANT BLACK & HOT PINK AMBIENT BACKDROP GLOWS */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Hot pink neon flare left */}
        <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] bg-pink-600/20 rounded-full blur-[120px] animate-aura-pink" />
        
        {/* Deep rose magenta flare right */}
        <div className="absolute top-10 right-0 w-[40rem] h-[40rem] bg-rose-700/18 rounded-full blur-[130px]" />
        
        {/* Soft pink core bottom center */}
        <div className="absolute bottom-0 left-1/3 w-[32rem] h-[32rem] bg-pink-500/15 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Solidarity Banner */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/40 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(255,45,120,0.25)]">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span>UNCONDITIONAL SOLIDARITY · WE BELIEVE SURVIVORS</span>
          </div>
        </div>

        {/* The Black and White Photo with Bright Eye-Catching CAPITALIZED AAVAAZ */}
        <div className="relative mx-auto rounded-3xl p-1.5 sm:p-2 bg-gradient-to-r from-pink-500/30 via-neutral-800 to-pink-500/30 shadow-[0_0_50px_rgba(255,45,120,0.2)] border border-pink-500/30">
          
          {/* Subtle badges on corner */}
          <div className="hidden sm:flex absolute -top-3.5 -left-3 z-20 items-center gap-1.5 px-3.5 py-1 bg-black rounded-full border border-pink-500/50 shadow-lg text-xs text-pink-300 font-bold uppercase tracking-wider">
            <span>✊ Break the silence</span>
          </div>

          <div className="hidden sm:flex absolute -bottom-3.5 -right-3 z-20 items-center gap-1.5 px-3.5 py-1 bg-black rounded-full border border-pink-500/50 shadow-lg text-xs text-pink-300 font-bold uppercase tracking-wider">
            <span>🖤 You are never alone</span>
          </div>

          {/* Inner Photo Container */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] md:aspect-[2.35/1] w-full overflow-hidden rounded-2xl bg-black group">
            <img
              src={heroFiguresImg}
              alt="Diverse collective of human figures united in solidarity in high-contrast black and white"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center grayscale contrast-130 brightness-95 transform scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out"
            />

            {/* High-contrast black gradient overlays for stark legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/70 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/85 pointer-events-none" />

            {/* CAPITALIZED, EYE-CATCHING B&W AAVAAZ IN MIDDLE */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
              
              {/* Top kicker */}
              <div className="flex items-center gap-3 mb-2 opacity-95">
                <span className="h-[1px] w-6 sm:w-16 bg-pink-500/80" />
                <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-[0.35em] text-pink-300 uppercase drop-shadow-md">
                  SURVIVORS RECLAIMING THEIR TRUTH
                </span>
                <span className="h-[1px] w-6 sm:w-16 bg-pink-500/80" />
              </div>

              {/* CAPITALIZED, EYE-CATCHING TITLE IN STARK WHITE */}
              <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-[0.14em] sm:tracking-[0.20em] text-white uppercase select-none transition-transform duration-500 ease-out group-hover:scale-102 drop-shadow-[0_12px_45px_rgba(0,0,0,1)] drop-shadow-[0_0_20px_rgba(255,45,120,0.5)]">
                AAVAAZ
              </h1>

              {/* High-Contrast Motto */}
              <div className="mt-2 sm:mt-4 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-pink-500/40 text-white shadow-xl">
                <span className="text-xs sm:text-base md:text-xl font-bold tracking-[0.12em] uppercase text-pink-100 drop-shadow">
                  “Every voice matters. We believe you.”
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Action Block right below the visual */}
        <div className="mt-10 sm:mt-14 text-center max-w-2xl mx-auto space-y-6">
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            A safe, confidential haven built exclusively for assault survivors. 
            Shed the shame that was never yours to carry. Speak your story on your own terms—openly or in sacred anonymity—and find unbreakable community with those who stand beside you.
          </p>

          {/* Action buttons in Black and Pink */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenShareModal}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 rounded-full shadow-[0_0_25px_rgba(255,45,120,0.5)] hover:shadow-[0_0_35px_rgba(255,45,120,0.7)] transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Share Your Truth</span>
              <span className="text-lg">✊</span>
            </button>

            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-3.5 text-base font-bold text-neutral-200 bg-[#141419] hover:bg-[#1C1C24] border border-pink-500/40 hover:border-pink-500 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Read Survivor Voices</span>
              <ArrowDown className="w-4 h-4 text-pink-400 animate-bounce" />
            </button>
          </div>

          {/* Survivor Trust Marks */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 text-xs text-neutral-400">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
              <Shield className="w-3.5 h-3.5 text-pink-400" />
              <span>100% Anonymous & Untracked</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
              <Heart className="w-3.5 h-3.5 text-pink-400" />
              <span>Zero Tolerance for Victim-Blaming</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
              <Users className="w-3.5 h-3.5 text-pink-400" />
              <span>{totalVoicesCount} Survivor Testimonies Published</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
