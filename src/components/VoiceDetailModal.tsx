import React, { useState } from 'react';
import { VoicePost, Reactions } from '../types';
import { X, Volume2, VolumeX, Bookmark, Share2, Send, Lock, Type, MessageSquare, AlertCircle } from 'lucide-react';

interface VoiceDetailModalProps {
  voice: VoicePost | null;
  onClose: () => void;
  onReact: (id: string, reactionKey: keyof Reactions) => void;
  onToggleBookmark: (id: string) => void;
  onAddComment: (voiceId: string, commentText: string, authorName: string, isAnon: boolean) => void;
  onShare: (voice: VoicePost) => void;
}

export const VoiceDetailModal: React.FC<VoiceDetailModalProps> = ({
  voice,
  onClose,
  onReact,
  onToggleBookmark,
  onAddComment,
  onShare,
}) => {
  if (!voice) return null;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [largeFont, setLargeFont] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');
  const [isAnonymousComment, setIsAnonymousComment] = useState(true);

  const handleListen = () => {
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

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment(
      voice.id,
      newComment.trim(),
      isAnonymousComment || !commentAuthor.trim() ? 'Anonymous Comrade' : commentAuthor.trim(),
      isAnonymousComment
    );
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-2xl bg-[#121217] rounded-3xl shadow-[0_0_60px_rgba(255,45,120,0.3)] border border-pink-500/40 overflow-hidden my-8 max-h-[90vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-pink-500/20 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="font-bold text-pink-400 bg-pink-950/60 border border-pink-500/40 px-2.5 py-0.5 rounded-full">{voice.category}</span>
            <span>·</span>
            <span>{voice.createdAt}</span>
            <span>·</span>
            <span>{voice.readTime}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLargeFont(!largeFont)}
              title={largeFont ? "Standard text size" : "Comfortable large text"}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
            >
              <Type className="w-4 h-4" />
            </button>
            <button
              onClick={handleListen}
              title={isPlayingAudio ? "Stop reading" : "Read aloud"}
              className={`p-2 rounded-full transition-colors ${
                isPlayingAudio ? 'bg-pink-600 text-white animate-pulse' : 'text-neutral-400 hover:text-pink-400 hover:bg-neutral-800'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => onToggleBookmark(voice.id)}
              className={`p-2 rounded-full transition-colors ${
                voice.isBookmarked ? 'text-pink-400 bg-pink-950/60' : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${voice.isBookmarked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onShare(voice)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Scroll area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-[#0D0D12]">
          {/* Content warning banner if present */}
          {voice.contentWarning && (
            <div className="p-3.5 rounded-2xl bg-pink-950/50 border border-pink-500/40 text-xs text-pink-300 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
              <span>Content Warning: {voice.contentWarning}</span>
            </div>
          )}

          {/* Author lockup */}
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              voice.isAnonymous 
                ? 'bg-neutral-800 text-pink-400 border border-pink-500/30' 
                : 'bg-gradient-to-tr from-pink-600 to-rose-600 text-white'
            }`}>
              {voice.isAnonymous ? '🖤' : voice.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {voice.isAnonymous ? 'Anonymous Survivor' : voice.author}
              </div>
              <div className="text-xs text-neutral-400">
                {voice.isAnonymous ? 'Shared under the protection of absolute anonymity' : 'Survivor Contributor'}
                {voice.tone && ` · Tone: ${voice.tone}`}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {voice.title}
          </h2>

          {/* Body Prose */}
          <div className={`text-neutral-200 leading-relaxed font-normal whitespace-pre-line ${
            largeFont ? 'text-lg leading-loose' : 'text-base leading-relaxed'
          }`}>
            {voice.content}
          </div>

          {/* Survivor-specific Reactions Bar */}
          <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => onReact(voice.id, 'believe')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  voice.userReactions?.believe
                    ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,45,120,0.6)]'
                    : 'bg-[#181820] hover:bg-pink-950/60 text-neutral-300 hover:text-pink-300 border border-neutral-800'
                }`}
              >
                <span>✊</span>
                <span>I believe you</span>
                <span className="tabular-nums font-bold">({voice.reactions.believe})</span>
              </button>

              <button
                onClick={() => onReact(voice.id, 'notAlone')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  voice.userReactions?.notAlone
                    ? 'bg-rose-600 text-white shadow-[0_0_12px_rgba(244,63,94,0.6)]'
                    : 'bg-[#181820] hover:bg-rose-950/60 text-neutral-300 hover:text-rose-300 border border-neutral-800'
                }`}
              >
                <span>🖤</span>
                <span>You are not alone</span>
                <span className="tabular-nums font-bold">({voice.reactions.notAlone})</span>
              </button>

              <button
                onClick={() => onReact(voice.id, 'strength')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  voice.userReactions?.strength
                    ? 'bg-amber-600 text-white'
                    : 'bg-[#181820] hover:bg-amber-950/60 text-neutral-300 hover:text-amber-300 border border-neutral-800'
                }`}
              >
                <span>🔥</span>
                <span>Fierce strength</span>
                <span className="tabular-nums font-bold">({voice.reactions.strength})</span>
              </button>

              <button
                onClick={() => onReact(voice.id, 'love')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  voice.userReactions?.love
                    ? 'bg-pink-500 text-white'
                    : 'bg-[#181820] hover:bg-pink-950/60 text-neutral-300 hover:text-pink-300 border border-neutral-800'
                }`}
              >
                <span>🌸</span>
                <span>Holding space</span>
                <span className="tabular-nums font-bold">({voice.reactions.love})</span>
              </button>
            </div>

            <div className="text-xs text-neutral-400 font-bold">
              {voice.comments.length} solidarity responses
            </div>
          </div>

          {/* Comments / Solidarity Notes */}
          <div className="pt-6 border-t border-neutral-800 space-y-4">
            <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-pink-500" />
              <span>Notes of Solidarity & Strength</span>
            </h4>

            {voice.comments.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-500 bg-[#16161D] rounded-2xl border border-neutral-800">
                No replies yet. Be the first to let this survivor know their voice is believed and honored.
              </div>
            ) : (
              <div className="space-y-3">
                {voice.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-[#16161D] rounded-2xl text-xs space-y-1.5 border border-pink-500/20">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="font-bold text-pink-300">
                        {comment.isAnonymous ? 'Anonymous Comrade 🖤' : comment.author}
                      </span>
                      <span>{comment.createdAt}</span>
                    </div>
                    <p className="text-neutral-200 leading-normal">{comment.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Response Form */}
            <form onSubmit={handleSubmitComment} className="pt-2 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Leave an empowering, trauma-informed note of solidarity..."
                rows={2}
                className="w-full text-xs p-3.5 rounded-2xl border border-pink-500/30 bg-[#16161D] focus:border-pink-500 outline-none resize-none transition-all text-white placeholder:text-neutral-500"
              />

              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-neutral-300 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={isAnonymousComment}
                      onChange={(e) => setIsAnonymousComment(e.target.checked)}
                      className="rounded text-pink-600 focus:ring-pink-500 bg-neutral-800"
                    />
                    <span>Reply anonymously</span>
                  </label>

                  {!isAnonymousComment && (
                    <input
                      type="text"
                      value={commentAuthor}
                      onChange={(e) => setCommentAuthor(e.target.value)}
                      placeholder="Your name"
                      className="text-xs px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900 focus:border-pink-500 outline-none text-white w-32 sm:w-40"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-40 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Solidarity</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
