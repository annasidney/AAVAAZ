import React, { useState } from 'react';
import { Category, CATEGORIES } from '../types';
import { X, Send, Eye, Edit3, Shield, AlertTriangle, Lock, AlertCircle } from 'lucide-react';

interface ShareVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (voiceData: {
    title: string;
    content: string;
    category: Category;
    author: string;
    isAnonymous: boolean;
    tone: string;
    contentWarning?: string;
  }) => void;
  initialPrompt?: string;
  initialCategory?: Category;
}

const SURVIVOR_TONES = [
  { name: 'Empowering', emoji: '✊' },
  { name: 'Raw Truth', emoji: '🖤' },
  { name: 'Fierce', emoji: '🔥' },
  { name: 'Tender', emoji: '🌸' },
  { name: 'Hopeful', emoji: '✨' },
  { name: 'Uncompromising', emoji: '⚡' },
];

export const ShareVoiceModal: React.FC<ShareVoiceModalProps> = ({
  isOpen,
  onClose,
  onPublish,
  initialPrompt = '',
  initialCategory = 'Breaking the Silence',
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState(initialPrompt ? 'Truth: ' + initialPrompt.slice(0, 45) + '...' : '');
  const [content, setContent] = useState(initialPrompt ? initialPrompt + '\n\n' : '');
  const [category, setCategory] = useState<Category>(initialCategory);
  const [isAnonymous, setIsAnonymous] = useState(true); // Anonymous by default for survivor safety!
  const [authorName, setAuthorName] = useState('');
  const [contentWarning, setContentWarning] = useState('');
  const [tone, setTone] = useState('Empowering');
  const [isPreview, setIsPreview] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const estimatedReadTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please give your testimony or reflection a title.');
      return;
    }
    if (content.trim().length < 20) {
      setErrorMessage('Please share a few more words (at least 20 characters). We want to hear you.');
      return;
    }
    if (!isAnonymous && !authorName.trim()) {
      setErrorMessage('Please provide your name/pseudonym or select "Post Anonymously".');
      return;
    }

    setErrorMessage('');
    onPublish({
      title: title.trim(),
      content: content.trim(),
      category,
      author: isAnonymous ? 'Anonymous Survivor' : authorName.trim(),
      isAnonymous,
      tone,
      contentWarning: contentWarning.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#121217] rounded-3xl shadow-[0_0_60px_rgba(255,45,120,0.35)] border border-pink-500/40 overflow-hidden my-8 max-h-[92vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-pink-500/25 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-pink-600/30 border border-pink-500/60 text-pink-400 flex items-center justify-center font-bold text-lg">
              ✊
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <span>Break the Silence</span>
                <span className="text-xs font-mono text-pink-400 font-normal">· Your Truth Matters</span>
              </h3>
              <p className="text-xs text-neutral-400">
                You are safe here. No judgment, no interrogation, unconditional belief.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="px-3.5 py-1.5 text-xs font-bold text-neutral-300 bg-neutral-900 border border-neutral-700 rounded-full hover:text-white hover:border-pink-500 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isPreview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPreview ? 'Back to Editor' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form or Preview Area */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-5 bg-[#0D0D12]">
          {errorMessage && (
            <div className="p-3.5 text-xs font-bold text-pink-200 bg-pink-950/80 border border-pink-500 rounded-2xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isPreview ? (
            /* Live Preview */
            <div className="space-y-4">
              <div className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>👀</span>
                <span>How your voice will be displayed:</span>
              </div>
              <div className="p-6 bg-[#16161D] rounded-3xl border border-pink-500/30 shadow-lg space-y-4">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-950/60 border border-pink-500/40 text-pink-300 font-bold">{category}</span>
                    <span>·</span>
                    <span>Just now</span>
                    <span>·</span>
                    <span>{estimatedReadTime}</span>
                    <span>·</span>
                    <span className="text-pink-400 font-bold">{tone}</span>
                  </div>
                </div>

                {contentWarning && (
                  <div className="px-2.5 py-1 rounded-lg bg-pink-950/60 border border-pink-500/40 text-xs font-bold text-pink-300">
                    CW: {contentWarning}
                  </div>
                )}

                <h2 className="font-display text-2xl font-bold text-white leading-snug">
                  {title || 'Untitled Voice'}
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                  {content || 'No words written yet...'}
                </p>

                <div className="pt-3 border-t border-neutral-800 flex items-center gap-2 text-xs text-neutral-400">
                  <div className="w-6 h-6 rounded-full bg-neutral-800 text-pink-400 flex items-center justify-center font-bold">
                    {isAnonymous ? '🖤' : (authorName.charAt(0) || 'S')}
                  </div>
                  <span className="font-semibold text-neutral-300">{isAnonymous ? 'Anonymous Survivor' : (authorName || 'Your Name')}</span>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase tracking-wider">
                  Select Theme
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                        category === cat
                          ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(255,45,120,0.5)]'
                          : 'bg-[#181820] text-neutral-400 hover:text-pink-300 border border-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1.5 uppercase tracking-wider">
                  Testimony Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your experience, letter, or reflection a headline..."
                  maxLength={120}
                  className="w-full px-4 py-3 rounded-2xl border border-pink-500/30 bg-[#16161D] focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm text-white placeholder:text-neutral-500 transition-all"
                />
              </div>

              {/* Optional Content Warning */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                  <label className="font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Content Warning / Trigger Warning (Optional)</span>
                  </label>
                  <span className="text-[11px] text-pink-400 font-medium">helps fellow survivors read safely</span>
                </div>
                <input
                  type="text"
                  value={contentWarning}
                  onChange={(e) => setContentWarning(e.target.value)}
                  placeholder="e.g. Mentions hospital aftermath, reporting scrutiny, panic attacks"
                  maxLength={100}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-800 bg-[#16161D] focus:border-pink-500 outline-none text-xs text-white placeholder:text-neutral-500 transition-all"
                />
              </div>

              {/* Content textarea */}
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5">
                  <label className="font-bold text-neutral-300 uppercase tracking-wider">
                    Your Testimony / Words
                  </label>
                  <span className="tabular-nums font-mono text-pink-400">{wordCount} words · {estimatedReadTime}</span>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Speak your truth with complete freedom. Whatever you have held inside, whatever felt too terrifying or messy to say anywhere else—this room is yours."
                  rows={6}
                  className="w-full p-4 rounded-2xl border border-pink-500/30 bg-[#16161D] focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none text-sm text-neutral-200 leading-relaxed transition-all resize-y"
                />
              </div>

              {/* Tone selector */}
              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-2 uppercase tracking-wider">
                  Emotional Tone
                </label>
                <div className="flex flex-wrap gap-2">
                  {SURVIVOR_TONES.map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => setTone(t.name)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        tone === t.name
                          ? 'bg-pink-600 text-white shadow-[0_0_12px_rgba(255,45,120,0.5)]'
                          : 'bg-[#181820] text-neutral-400 hover:text-white border border-neutral-800'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Anonymity Security Toggle */}
              <div className="p-4 bg-[#16161D] rounded-3xl border border-pink-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-5 h-5 text-pink-400" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        Post Anonymously (Recommended)
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        No name, no IP, no digital fingerprint. Your identity is 100% guarded.
                      </div>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-neutral-300 mb-1">
                      Your Name or Chosen Pseudonym
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Maya S. or Warrior Sister"
                      maxLength={40}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-700 bg-neutral-900 focus:border-pink-500 outline-none text-xs text-white"
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-pink-500/20 flex items-center justify-between bg-[#0A0A0C]">
          <span className="text-xs text-neutral-500 flex items-center gap-1.5 font-bold">
            <span className="text-pink-500">🖤</span>
            <span>We believe you unconditionally.</span>
          </span>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 rounded-full shadow-[0_0_20px_rgba(255,45,120,0.5)] transition-all flex items-center gap-2 cursor-pointer transform hover:scale-102"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Truth</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
