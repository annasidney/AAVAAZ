import React from 'react';
import { Shield, Heart, Users, Flame, Lock } from 'lucide-react';
import communityCircleImg from '../assets/images/community_circle_bw_1790787304868.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#0A0A0C]">
      
      {/* Background ambient pink blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical 2-column layout: Story + Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <span>✊</span>
              <span>Our Stand & Mission</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              We believe you. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-pink-600">
                Without hesitation or trial.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              In a society that too often interrogates survivors, questions what they were wearing, or demands impossible perfection before granting empathy, <strong>AAVAAZ</strong> stands as an unshakeable sanctuary.
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              <em>Aavaaz</em> means <strong>Voice</strong>. This platform exists to break the culture of isolation. Here, your testimony is not up for debate. You do not need to defend your choices, explain why you froze, or justify how long you took to speak. Whether you share under sacred anonymity or under your own name, you are met with fierce, unwavering sisterhood and solidarity.
            </p>

            {/* Core Equation in Black & Pink */}
            <div className="p-5 rounded-2xl bg-[#141419] border border-pink-500/30 shadow-[0_0_20px_rgba(255,45,120,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <Shield className="w-4 h-4 text-pink-500" />
                <span>Our Unbreakable Vow:</span>
              </div>
              <div className="font-display text-sm sm:text-base font-bold text-pink-300">
                Belief + Total Safety + Collective Power
              </div>
            </div>
          </div>

          {/* Black & White Photo with Pink Ambient Framing */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-2 bg-gradient-to-br from-pink-500/40 via-neutral-900 to-pink-500/20 shadow-[0_0_40px_rgba(255,45,120,0.25)] border border-pink-500/40">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black">
                <img
                  src={communityCircleImg}
                  alt="Survivors gathered together in fierce quiet solidarity in dramatic monochrome"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-125 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-2 text-xs text-pink-400 font-bold mb-1 uppercase tracking-wider">
                    <span>✊ Circle of Solidarity</span>
                  </div>
                  <p className="text-sm font-light text-neutral-200 leading-snug">
                    "When one survivor breaks their silence, a thousand others breathe a little easier."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars in Black & Pink */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-[#121217] border border-pink-500/20 hover:border-pink-500/50 shadow-lg space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-pink-400 flex items-center justify-center text-xl">
              ✊
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Unconditional Belief
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              No cross-examinations, no victim-blaming, no toxic doubt. Your reality is affirmed and respected the moment you speak it.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121217] border border-pink-500/20 hover:border-pink-500/50 shadow-lg space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-pink-400 flex items-center justify-center text-xl">
              <Lock className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Sacred Anonymity & Safety
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Zero IP tracking, zero advertising cookies, and instant Quick-Exit features. You have total authority over your identity.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#121217] border border-pink-500/20 hover:border-pink-500/50 shadow-lg space-y-3 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-pink-950/60 border border-pink-500/40 text-pink-400 flex items-center justify-center text-xl">
              <Flame className="w-5 h-5 text-pink-400" />
            </div>
            <h3 className="font-display text-lg font-bold text-white">
              Reclaiming Power
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Healing is not linear, and neither is courage. Whether you are furious, grieving, or rediscovering joy, your journey is honored.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
