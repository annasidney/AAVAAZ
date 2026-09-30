import { VoicePost, Category, CATEGORIES } from '../types';

export const INITIAL_VOICES: VoicePost[] = [
  {
    id: 'voice-1',
    title: 'To the girl who froze: you did not fail, your body kept you alive',
    content: `For three years after that night, my mind tortured me with one recurring question: "Why didn't you scream? Why didn't you fight back?" The shame was so suffocating that I convinced myself that my silence equaled consent.

It wasn't until I sat in a trauma group with seven other women that my therapist explained tonic immobility—the ancient evolutionary mammalian response to inescapable danger. Your nervous system didn't betray you; it flooded your limbs to protect your organs from lethal harm. You didn't submit. You survived.

If you froze, if you went numb, if you complied just to make it to the morning alive—hear me clearly: the fault belongs 100% to the perpetrator. None of it belongs to you. Not a single fraction.`,
    category: 'Healing & Reclaiming',
    author: 'Anonymous Survivor',
    isAnonymous: true,
    createdAt: '3 hours ago',
    readTime: '2 min read',
    contentWarning: 'Mentions tonic immobility, trauma recovery',
    tone: 'Empowering',
    reactions: {
      believe: 184,
      notAlone: 242,
      strength: 198,
      love: 167,
    },
    comments: [
      {
        id: 'c1',
        author: 'Maya R.',
        isAnonymous: false,
        content: 'I needed to hear this so badly today. I carried that self-blame for nearly a decade. Thank you for setting down words that heal.',
        createdAt: '2 hours ago',
      },
      {
        id: 'c2',
        author: 'Anonymous',
        isAnonymous: true,
        content: 'We believe you. Thank you for this truth.',
        createdAt: '1 hour ago',
      }
    ]
  },
  {
    id: 'voice-2',
    title: 'Why "Why didn\'t you report?" misses the violent reality of the aftermath',
    content: `When someone asks a survivor why they didn't immediately go to the police or dean's office, they imagine a sterile movie scene with gentle detectives and immediate justice.

They don't see the reality: having your personal text messages subpoenaed and scrutinized, being asked what you wore, sitting in classrooms or staff meetings with someone who violated your bodily autonomy, the retaliatory defamation, and the legal fees.

Reporting is a personal choice, not a prerequisite for being believed. Your pain is real whether you have a police report number or whether you only ever whispered it to your ceiling at 3 AM. We believe you right here, right now, as you are.`,
    category: 'Breaking the Silence',
    author: 'Elena K.',
    isAnonymous: false,
    createdAt: '6 hours ago',
    readTime: '3 min read',
    contentWarning: 'Discussion of institutional reporting and scrutiny',
    tone: 'Uncompromising',
    reactions: {
      believe: 312,
      notAlone: 289,
      strength: 275,
      love: 210,
    },
    comments: [
      {
        id: 'c3',
        author: 'Anonymous',
        isAnonymous: true,
        content: 'Institutional betrayal hurts almost as much as the initial assault. Standing with you in solidarity.',
        createdAt: '4 hours ago',
      }
    ]
  },
  {
    id: 'voice-3',
    title: 'The rage that came four years later—and why I finally welcomed it',
    content: `For the first few years, I was "the good survivor." I was soft, polite, swallowed my tears, and tried my hardest never to make anyone in my life uncomfortable. I apologized for having panic attacks in crowded elevators.

Last month, on the anniversary, a sudden, tidal wave of fury woke up in my chest. And for the first time, I didn't push it down. Rage isn't a symptom of relapse—it is proof that your self-worth has returned. Rage says: "How dare you touch me? How dare you steal my peace?"

Rage is the fire that burns away the false shame someone else handed you. Do not fear your anger. It is your soul demanding the respect you were owed all along.`,
    category: 'Rage & Rebirth',
    author: 'Tara V.',
    isAnonymous: false,
    createdAt: 'Yesterday',
    readTime: '3 min read',
    contentWarning: 'Exploration of anger and post-traumatic growth',
    tone: 'Fierce',
    reactions: {
      believe: 260,
      notAlone: 310,
      strength: 345,
      love: 195,
    },
    comments: []
  },
  {
    id: 'voice-4',
    title: 'Reclaiming intimacy when touch used to feel like a crime scene',
    content: `Nobody prepares you for the strange dissonance of falling in love with a gentle person after surviving violence. The first time my partner went to hug me from behind while I was washing dishes, I dropped the glass bowl. It shattered.

He didn't get offended. He didn't demand an explanation. He just stepped back, sat on the kitchen floor, and said, "You are safe. Take all the time you need."

Relearning that your body is your sovereign temple—and that touch can be tender, collaborative, and entirely on your terms—is slow, sacred work. If you aren't there yet, do not rush. Your timeline belongs to you.`,
    category: 'Healing & Reclaiming',
    author: 'Anonymous Survivor',
    isAnonymous: true,
    createdAt: '2 days ago',
    readTime: '3 min read',
    contentWarning: 'Mentions trauma triggers and intimacy recovery',
    tone: 'Tender',
    reactions: {
      believe: 215,
      notAlone: 278,
      strength: 189,
      love: 340,
    },
    comments: []
  },
  {
    id: 'voice-5',
    title: 'Dear 19-year-old me in the emergency room: You will laugh again',
    content: `I remember sitting on that cold crinkly paper examination table under fluorescent lights, clutching an oversized grey hoodie, convinced that my life had ended in that basement apartment. I thought I would forever be a broken thing that other people had to handle with caution.

I am writing this from ten years in your future. You have an apartment filled with sunlight and monstera plants. You have friends who hold your hand when sirens go off. You have traveled across continents. You laugh until your ribs hurt.

The assault is a chapter in your book, but it is not the author of your story. Hold on through tonight. The future is waiting for you, and it is vast and radiant.`,
    category: 'Letters to My Younger Self',
    author: 'Samira N.',
    isAnonymous: false,
    createdAt: '3 days ago',
    readTime: '3 min read',
    contentWarning: 'Medical setting / hospital aftermath mention',
    tone: 'Hopeful',
    reactions: {
      believe: 380,
      notAlone: 420,
      strength: 390,
      love: 480,
    },
    comments: []
  },
  {
    id: 'voice-6',
    title: 'The silence between friends: What happens when they pick the perpetrator',
    content: `The assault shattered me, but what almost destroyed my spirit was the week after—when our mutual "friend group" decided it was too uncomfortable to take sides. They still invited him to parties. They told me they "didn't want drama."

Losing your community in the aftermath is a secondary trauma that cuts straight to the bone. To anyone who had to walk away from everyone they knew just to protect their sanity: you were not being dramatic. You were choosing your survival over their complicit comfort. And you will find true sisters and comrades on the other side.`,
    category: 'Unheard Truths',
    author: 'Anonymous',
    isAnonymous: true,
    createdAt: '4 days ago',
    readTime: '3 min read',
    contentWarning: 'Social ostracization and complicity',
    tone: 'Raw',
    reactions: {
      believe: 295,
      notAlone: 350,
      strength: 310,
      love: 280,
    },
    comments: []
  },
  {
    id: 'voice-7',
    title: 'Everyday resilience: Today I walked past that street and did not run',
    content: `For two years I took an extra twenty-minute detour on my morning commute just to avoid passing the corner where it happened. My heart would start pounding four blocks away.

This morning, without planning it, I kept walking straight. I felt the tight grip in my throat. I planted my boots on the pavement, inhaled for four seconds, and said out loud: "This is just concrete. This street does not own me."

I walked past it. I bought my black coffee. A tiny victory, but monumental. We celebrate every inch of ground we reclaim.`,
    category: 'Everyday Resilience',
    author: 'Zoe C.',
    isAnonymous: false,
    createdAt: '5 days ago',
    readTime: '2 min read',
    contentWarning: 'Navigating triggers and somatic reclaiming',
    tone: 'Triumphant',
    reactions: {
      believe: 240,
      notAlone: 265,
      strength: 380,
      love: 290,
    },
    comments: []
  }
];

export { CATEGORIES };

export const SURVIVOR_PROMPTS = [
  {
    prompt: "What is a truth about your aftermath that people who haven't lived it rarely understand?",
    category: "Unheard Truths" as Category,
  },
  {
    prompt: "Write a letter to yourself on the morning after: what do you wish someone had whispered to you?",
    category: "Letters to My Younger Self" as Category,
  },
  {
    prompt: "Describe an ordinary boundary or safe space you fought hard to reclaim.",
    category: "Healing & Reclaiming" as Category,
  },
  {
    prompt: "What does solidarity look like to you when words aren't enough?",
    category: "Solidarity & Community" as Category,
  }
];

export const CRISIS_RESOURCES = [
  {
    name: "National Sexual Assault Telephone Hotline (RAINN)",
    number: "1-800-656-4673",
    description: "24/7 free, confidential support for survivors across the US",
    online: "rainn.org"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 free crisis counseling via SMS text",
    online: "crisistextline.org"
  },
  {
    name: "Love Is Respect (Dating Abuse & Consent)",
    number: "1-866-331-9474",
    description: "Support for young adults and students navigating intimate partner safety",
    online: "loveisrespect.org"
  },
  {
    name: "International Resources (Global Directory)",
    number: "findahelpline.com",
    description: "Confidential sexual assault hotlines in 130+ countries worldwide",
    online: "findahelpline.com"
  }
];
