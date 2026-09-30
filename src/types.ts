export type Category = 
  | 'Breaking the Silence'
  | 'Healing & Reclaiming'
  | 'Unheard Truths'
  | 'Letters to My Younger Self'
  | 'Rage & Rebirth'
  | 'Solidarity & Community'
  | 'Navigating the Aftermath'
  | 'Everyday Resilience';

export const CATEGORIES: Category[] = [
  'Breaking the Silence',
  'Healing & Reclaiming',
  'Unheard Truths',
  'Letters to My Younger Self',
  'Rage & Rebirth',
  'Solidarity & Community',
  'Navigating the Aftermath',
  'Everyday Resilience'
];

export interface Comment {
  id: string;
  author: string;
  isAnonymous: boolean;
  content: string;
  createdAt: string;
}

export interface Reactions {
  believe: number;    // "I believe you" ✊
  notAlone: number;   // "You are not alone" 🖤
  strength: number;   // "Fierce strength" 🔥
  love: number;       // "Holding space" 🌸
}

export interface VoicePost {
  id: string;
  title: string;
  content: string;
  category: Category;
  author: string;
  isAnonymous: boolean;
  createdAt: string;
  readTime: string;
  contentWarning?: string;
  tone?: string;
  reactions: Reactions;
  userReactions?: { [key in keyof Reactions]?: boolean };
  comments: Comment[];
  isBookmarked?: boolean;
}
