/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VoicePost, Category, Reactions } from './types';
import { INITIAL_VOICES } from './data/initialVoices';
import { CrisisBanner } from './components/CrisisBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExploreSection } from './components/ExploreSection';
import { DailyPrompts } from './components/DailyPrompts';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { ShareVoiceModal } from './components/ShareVoiceModal';
import { VoiceDetailModal } from './components/VoiceDetailModal';
import { Toast } from './components/Toast';

const STORAGE_KEY = 'aavaaz_survivors_v2';

export default function App() {
  const [voices, setVoices] = useState<VoicePost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_VOICES;
  });

  const [activeVoice, setActiveVoice] = useState<VoicePost | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [promptData, setPromptData] = useState<{ prompt: string; category?: Category }>({ prompt: '' });
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(voices));
    } catch {
      // ignore
    }
  }, [voices]);

  // Keep activeVoice in sync if reactions or comments update
  useEffect(() => {
    if (activeVoice) {
      const updated = voices.find((v) => v.id === activeVoice.id);
      if (updated) {
        setActiveVoice(updated);
      }
    }
  }, [voices]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handlePublishVoice = (voiceData: {
    title: string;
    content: string;
    category: Category;
    author: string;
    isAnonymous: boolean;
    tone: string;
    contentWarning?: string;
  }) => {
    const wordCount = voiceData.content.trim().split(/\s+/).filter(Boolean).length;
    const newPost: VoicePost = {
      id: `voice-${Date.now()}`,
      title: voiceData.title,
      content: voiceData.content,
      category: voiceData.category,
      author: voiceData.author,
      isAnonymous: voiceData.isAnonymous,
      createdAt: 'Just now',
      readTime: `${Math.max(1, Math.ceil(wordCount / 180))} min read`,
      tone: voiceData.tone,
      contentWarning: voiceData.contentWarning,
      reactions: { believe: 1, notAlone: 1, strength: 1, love: 1 },
      userReactions: { believe: true },
      comments: [],
      isBookmarked: false,
    };

    setVoices([newPost, ...voices]);
    showToast('Your truth has been received with care and solidarity.');
    
    // Scroll smoothly to the explore section
    const exploreEl = document.getElementById('explore');
    if (exploreEl) {
      exploreEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReact = (id: string, reactionKey: keyof Reactions) => {
    setVoices((prevVoices) =>
      prevVoices.map((v) => {
        if (v.id !== id) return v;

        const currentActive = v.userReactions?.[reactionKey] || false;
        const newCount = currentActive ? v.reactions[reactionKey] - 1 : v.reactions[reactionKey] + 1;

        return {
          ...v,
          reactions: {
            ...v.reactions,
            [reactionKey]: Math.max(0, newCount),
          },
          userReactions: {
            ...v.userReactions,
            [reactionKey]: !currentActive,
          },
        };
      })
    );

    const labels: Record<keyof Reactions, string> = {
      believe: 'You affirmed: I believe you. ✊',
      notAlone: 'You held space: You are not alone. 🖤',
      strength: 'Honored with fierce strength. 🔥',
      love: 'Enfolded in love and sisterhood. 🌸',
    };
    showToast(labels[reactionKey]);
  };

  const handleToggleBookmark = (id: string) => {
    let newState = false;
    setVoices((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          newState = !v.isBookmarked;
          return { ...v, isBookmarked: newState };
        }
        return v;
      })
    );

    showToast(newState ? 'Testimony saved to your private bookmarks.' : 'Removed from bookmarks.');
  };

  const handleAddComment = (
    voiceId: string,
    commentText: string,
    authorName: string,
    isAnon: boolean
  ) => {
    setVoices((prev) =>
      prev.map((v) => {
        if (v.id === voiceId) {
          return {
            ...v,
            comments: [
              ...v.comments,
              {
                id: `c-${Date.now()}`,
                author: authorName,
                isAnonymous: isAnon,
                content: commentText,
                createdAt: 'Just now',
              },
            ],
          };
        }
        return v;
      })
    );
    showToast('Your words of solidarity were sent with love.');
  };

  const handleShare = (voice: VoicePost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `"${voice.title}" on AAVAAZ Survivors Platform — We Believe You.\nRead more: ${window.location.origin}`
      );
      showToast('Link copied to clipboard.');
    } else {
      showToast('Testimony ready to share.');
    }
  };

  const handleOpenPrompt = (prompt: string, category: Category) => {
    setPromptData({ prompt, category });
    setIsShareModalOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bookmarkedCount = voices.filter((v) => v.isBookmarked).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0C] text-neutral-100 font-sans selection:bg-pink-600 selection:text-white relative">
      {/* 24/7 Crisis Hotline Bar */}
      <CrisisBanner />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenShareModal={() => {
          setPromptData({ prompt: '' });
          setIsShareModalOpen(true);
        }}
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        bookmarkedCount={bookmarkedCount}
        onToggleBookmarksOnly={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
        showOnlyBookmarks={showOnlyBookmarks}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenShareModal={() => {
            setPromptData({ prompt: '' });
            setIsShareModalOpen(true);
          }}
          onExploreClick={() => handleNavigate('explore')}
          totalVoicesCount={voices.length}
        />

        {/* Survivor Voices Living Archive */}
        <ExploreSection
          voices={voices}
          onSelectVoice={(voice) => setActiveVoice(voice)}
          onReact={handleReact}
          onToggleBookmark={handleToggleBookmark}
          onShare={handleShare}
          onOpenShareModal={() => {
            setPromptData({ prompt: '' });
            setIsShareModalOpen(true);
          }}
          showOnlyBookmarks={showOnlyBookmarks}
          setShowOnlyBookmarks={setShowOnlyBookmarks}
        />

        {/* Daily Truth Prompts */}
        <DailyPrompts onSelectPrompt={handleOpenPrompt} />

        {/* Our Stand & Mission */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenShareModal={() => {
          setPromptData({ prompt: '' });
          setIsShareModalOpen(true);
        }}
        onNavigate={handleNavigate}
      />

      {/* Modals & Overlays */}
      <ShareVoiceModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onPublish={handlePublishVoice}
        initialPrompt={promptData.prompt}
        initialCategory={promptData.category}
      />

      <VoiceDetailModal
        voice={activeVoice}
        onClose={() => setActiveVoice(null)}
        onReact={handleReact}
        onToggleBookmark={handleToggleBookmark}
        onAddComment={handleAddComment}
        onShare={handleShare}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
