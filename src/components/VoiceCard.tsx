import React, { useState } from 'react';
import { VoicePost, Reactions } from '../types';
import { Heart, Sparkles, Volume2, VolumeX, MessageSquare, Bookmark, Share2, Shield, AlertCircle } from 'lucide-react';

interface VoiceCardProps {
  voice: VoicePost;
  onSelect: (voice: VoicePost) => void;
  onReact: (id: string, reactionKey: keyof Reactions) => void;
  onToggleBookmark: (id: string) => void;
  onShare: (voice: VoicePost) => void;
}

export const VoiceCard: React.FC<VoiceCardProps> = ({
  voice,
  onSelect,
  onReact,
  onToggleBookmark,
  onShare,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleListen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(`${voice.title}. ${voice.content}`);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  return (
    <article
      onClick={() => onSelect(voice)}
      className="survivor-card group relative rounded-3xl p-6 shadow-lg flex flex-col justify-between cursor-pointer border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300"
    >
      <div>
        {/* Top category & metadata */}
        <div className="flex items-center justify-between gap-2 text-xs text-neutral-400 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-pink-400 tracking-wide">
              {voice.category}
            </span>
            <span className="text-neutral-600">·</span>
            <span>{voice.createdAt}</span>
            <span className="text-neutral-600">·</span>
            <span>{voice.readTime}</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio Voice Player */}
            <button
              onClick={handleListen}
              title={isPlayingAudio ? "Stop reading" : "Listen to this voice"}
              className={`p-1.5 rounded-full transition-colors ${
                isPlayingAudio 
                  ? 'bg-pink-600 text-white animate-pulse' 
                  : 'text-neutral-400 hover:text-pink-400 hover:bg-neutral-800'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(voice.id);
              }}
              title={voice.isBookmarked ? "Saved in bookmarks" : "Save this testimony"}
              className={`p-1.5 rounded-full transition-colors ${
                voice.isBookmarked 
                  ? 'text-pink-400 bg-pink-950/60' 
                  : 'text-neutral-400 hover:text-pink-400 hover:bg-neutral-800'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${voice.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Content Warning if present */}
        {voice.contentWarning && (
          <div className="mb-3 px-2.5 py-1 rounded-lg bg-pink-950/40 border border-pink-500/30 text-[11px] font-semibold text-pink-300 flex items-center gap-1.5">
            <AlertCircle className="w-3 h-3 text-pink-400 shrink-0" />
            <span>CW: {voice.contentWarning}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-pink-200 transition-colors line-clamp-2 leading-snug mb-3">
          {voice.title}
        </h3>

        {/* Excerpt preview */}
        <p className="text-sm text-neutral-300 line-clamp-3 leading-relaxed mb-5 font-normal">
          {voice.content}
        </p>
      </div>

      <div>
        {/* Author info */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3.5 mb-3.5">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              voice.isAnonymous 
                ? 'bg-neutral-800 text-pink-400 border border-pink-500/30' 
                : 'bg-gradient-to-tr from-pink-600 to-rose-600 text-white'
            }`}>
              {voice.isAnonymous ? '🖤' : voice.author.charAt(0)}
            </div>
            <div>
              <span className="text-xs font-semibold text-neutral-200 block">
                {voice.isAnonymous ? 'Anonymous Survivor' : voice.author}
              </span>
              {voice.tone && (
                <span className="text-[11px] text-pink-400 font-medium block">
                  Tone: {voice.tone}
                </span>
              )}
            </div>
          </div>

          <span className="text-xs text-pink-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
            Read truth &rarr;
          </span>
        </div>

        {/* Survivor-specific Reactions */}
        <div className="flex items-center justify-between text-xs pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Believe */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReact(voice.id, 'believe');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                voice.userReactions?.believe
                  ? 'bg-pink-600 text-white font-bold shadow-[0_0_10px_rgba(255,45,120,0.5)]'
                  : 'bg-neutral-900 hover:bg-pink-950/60 text-neutral-300 hover:text-pink-300 border border-neutral-800'
              }`}
              title="I believe you"
            >
              <span>✊</span>
              <span className="tabular-nums font-semibold">{voice.reactions.believe}</span>
            </button>

            {/* Not alone */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReact(voice.id, 'notAlone');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                voice.userReactions?.notAlone
                  ? 'bg-rose-600 text-white font-bold shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                  : 'bg-neutral-900 hover:bg-rose-950/60 text-neutral-300 hover:text-rose-300 border border-neutral-800'
              }`}
              title="You are not alone"
            >
              <span>🖤</span>
              <span className="tabular-nums font-semibold">{voice.reactions.notAlone}</span>
            </button>

            {/* Strength */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReact(voice.id, 'strength');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                voice.userReactions?.strength
                  ? 'bg-amber-600 text-white font-bold'
                  : 'bg-neutral-900 hover:bg-amber-950/60 text-neutral-300 hover:text-amber-300 border border-neutral-800'
              }`}
              title="Fierce strength"
            >
              <span>🔥</span>
              <span className="tabular-nums font-semibold">{voice.reactions.strength}</span>
            </button>

            {/* Holding Space */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReact(voice.id, 'love');
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                voice.userReactions?.love
                  ? 'bg-pink-500 text-white font-bold'
                  : 'bg-neutral-900 hover:bg-pink-950/60 text-neutral-300 hover:text-pink-300 border border-neutral-800'
              }`}
              title="Holding space in love"
            >
              <span>🌸</span>
              <span className="tabular-nums font-semibold">{voice.reactions.love}</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-neutral-400">
            <span className="flex items-center gap-1 text-xs">
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="tabular-nums">{voice.comments.length}</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare(voice);
              }}
              title="Share voice"
              className="p-1 hover:text-pink-400 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
