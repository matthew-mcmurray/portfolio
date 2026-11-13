/**
 * ─────────────────────────────────────────────────────────────
 *  ALL SITE CONTENT LIVES HERE.
 *  Edit text, links and media paths in this one file.
 *
 *  Media: drop files into /public/media and reference them as
 *  "/media/your-file.mp4" (or .webp / .png / .jpg).
 *  Leave `src` empty to show a placeholder slot.
 *  Videos (.mp4 / .webm) autoplay muted + loop while on screen.
 * ─────────────────────────────────────────────────────────────
 */

export type MediaItem = {
  src?: string;
  /** Still frame shown before a video loads (optional). */
  poster?: string;
  alt: string;
  /** CSS aspect-ratio, e.g. "16 / 10", "4 / 3", "3 / 4". */
  aspect?: string;
  position?: string;
  label?: string;
};

export type ChapterItem = MediaItem & {
  header: string;
  body: string;
};

export type Theme = {
  bg: string;
  fg: string;
  muted: string;
  line: string;
  accent: string;
};

export type CaseStudySection = {
  heading: string;
  body: string[];
  bullets?: { title: string; text: string }[];
  media?: MediaItem;
  code?: { title: string; text: string; filename: string; lang?: string; content: string }[];
};

export type Chapter = {
  slug: string;
  eyebrow: string;
  logo?: {
    src: string;
    alt: string;
    width: number;   // the PNG's real pixel size, used for its proportions
    height: number;
    invert?: boolean; // turns a dark logo white for dark sections
  };
  title: string;
  status?: string;
  summary: string;
  meta: { label: string; value: string }[];
  tags: string[];
  theme: Theme;
  items: ChapterItem[];
  caseStudy: {
    category: string;
    projectUrl?: string;
    intro: string;
    hero: MediaItem | MediaItem[];
    sections: CaseStudySection[];
  };
};

export const site = {
  name: "Matthew McMurray",
  initials: "MM",
  role: "Frontend Developer & Designer",
  // Shown under your name on the landing page.
  statementLead: "Frontend engineer who thinks like a designer.",
  statementRest:
    "I prototype in Figma and ship what I design",
  availability: "Open to Design Engineer roles",
  email: "matthew.mcmurray07@gmail.com", 
  resumeUrl: "/MatthewMcMurray2026ResumePortfolio.pdf",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/matthew-mcmurray-108517263" },
  ],
  sourceUrl: "https://github.com/your-handle/portfolio", // TODO: this repo
};

export const chapters: Chapter[] = [
  {
    slug: "product-work",
    eyebrow: "Synchrony (Professional work)",
    logo: {
      src: "/media/SYFlogo.svg",
      alt: "",
      width: 800,
      height: 240,
      invert: false,
    },
    title: "Synchrony", 
    summary:
      "I design high-fidelity prototypes in Figma and build them into production, keeping patterns, branding, components, and interactions consistent across every product.",
    meta: [
      { label: "Role", value: "Software Engineer, Frontend & Design" },
      { label: "Year", value: "2024 – Now" },
      { label: "Stack", value: "React · JavaScript · Figma" },
    ],
    tags: ["Prototyping", "Design systems", "Production UI"],
    theme: {
      bg: "#111110",
      fg: "#f3f1ec",
      muted: "rgba(243, 241, 236, 0.58)",
      line: "rgba(243, 241, 236, 0.14)",
      accent: "#8f9bff",
    },
    items: [
      {
        src: "/media/CreditDecisioningFINAL.mp4",
        alt: "High-fidelity Figma prototype of the main dashboard",
        aspect: "18 / 12",
        header: "Prototype first",
        body: "Every feature starts as a high-fidelity Figma prototype, reviewed with stakeholders before a line of production code is written.",
      },
      {
        src: "/media/codeExample.png",
        alt: "Shared components used across several apps",
        aspect: "16 / 10",
        position: "30%  100%",
        header: "Building the product",
        body: "After designing, I build the final interfaces in React, ensuring all components are consistent and tested.",
      },
      {
        src: "/media/ShippedProduct.mp4",
        alt: "The shipped interface running in production",
        aspect: "16 / 10.5",
        header: "Shipped to production",
        body: "I build the final interfaces in React, taking care of the states, edge cases and motion details the prototype implies.",
      },
    ],
    caseStudy: {
      category: "Professional work",
      intro:
        "How I take features from a Figma prototype to a shipped, production-ready interface, and keep a family of apps feeling like one product.",
      hero: [
        { src: "/media/CreditDecisioningFINAL.mp4", alt: "CreditDecisioning Console overview", aspect: "31 / 20", label: "Prototype · Figma (remade without sensitive data)" },
        { src: "/media/ShippedProduct.mp4", alt: "Shipped Product Video", aspect: "31 / 20", label: "Production · React (remade without sensitive data)" }
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Teams needed to test credit decisioning logic, but the existing tool was so hard to learn that new users gave up and handed their work over to experienced colleagues. That slowed everyone down the business and frustrated the people the tool was meant to serve.",
            "",
            "The main pain points:",
          ],
          bullets: [
            { title: "No real navigation", text: "users couldn't tell where they were or how to get around" },
            { title: "Unclear inputs", text: "nothing showed what was required versus optional" },
            { title: "No feedback", text: "users couldn't tell what the system was actually doing" },
            { title: "No visible results", text: "users couldn't see the outcome of their actions" },
          ],
        },
        {
          heading: "User Research & Early Process",
          body: [
            "I began by talking to users who used the old tool and ones who didn't, and watched them try to complete tasks. Then, I put early mockups in front of them and iterated based on their feedback.",
            "",
            "Their input shaped both the design and the features:",
          ],
          bullets: [
            { title: "Cut the home page", text: "users said they’d skip straight past a landing screen, so the app opens directly into their work" },
            { title: "Role-based access", text: "different users needed different powers, which became the permission system behind every action" },
            { title: "Cloning", text: "users asked for a fast way to start from an existing record instead of from scratch" },
          ],
          media: { src: "/media/FigmaEarlyMockups.png", alt: "Early Figma explorations", aspect: "16.3 / 10" },
        },
        {
  heading: "Building it",
  body: [
    "An important feature to highlight is the permission system, which controls who can do what. It was designed to be flexible and easy to maintain for developers, while providing a clear and consistent experience for the user.",
  ],
  code: [
    {
      title: "One source of truth for permissions",
      text: "To keep action rules from drifting out of sync, every decision lives in a single rules file documented by a role matrix. It separates each action to be used across the website for permission checks in a simple way.",
      filename: "permissions.js",
      lang: "javascript",
      content: `/**
 * Permission rules: the single source of truth for what each role can do.
 *
 *               read  create  edit  override  duplicate  delete   lock    unlock
 *  ADMIN         ✓      ✓      ✓       ✓          ✓        ✓       ✓        ✓
 *  EDITOR        ✓      ✓      ✓       ✓          ·      owner     ✓    holder/owner
 *  MEMBER        ✓      ·      ·       ·          ·        ·     owner  holder/owner
 *  AUTOMATION    ✓      ·      ·       ·          ✓        ·       ·        ·
 *
 *  owner  = created the record
 *  holder = currently holds the lock (not always the owner)
 */
export const ROLES = Object.freeze({
  ADMIN: "admin",
  EDITOR: "editor",
  MEMBER: "member",
  AUTOMATION: "automation",
});

const RULES = {
  read: () => true,
  create: ({ role }) => role === ROLES.EDITOR,
  edit: ({ role }) => role === ROLES.EDITOR,
  override: ({ role }) => role === ROLES.EDITOR,
  duplicate: ({ role }) => role === ROLES.AUTOMATION,
  delete: ({ role, isOwner }) => role === ROLES.EDITOR && isOwner,

  toggleLock: ({ role, isOwner, lock }) => {
    if (role === ROLES.AUTOMATION) return false;
    // Unlocking: the current lock holder or the record's owner can release it.
    if (lock.isLocked) return lock.isHolder || isOwner;
    // Locking: editors can lock any record; members only their own.
    return role === ROLES.EDITOR || (role === ROLES.MEMBER && isOwner);
  },
};

export function can(action, { role, isOwner = false, lock = {} } = {}) {
  if (role === ROLES.ADMIN) return true;

  const rule = RULES[action];
  if (!rule) return false;

  return rule({
    role,
    isOwner,
    lock: { isLocked: false, isHolder: false, ...lock },
  });
}`,
    },
  ],
},
        {
          heading: "Outcome",
          body: [
            "The redesign replaced a legacy application with a modern React web app that now supports the testing behind 1,000–3,000 credit applications every day",
            "What changed:",
          ],
          bullets: [
            { title: "Faster", text: "load times dropped by up to 65% through lazy loading and caching" },
            { title: "Easier to learn", text: "clear navigation, labeled required fields and added tooltips when hovering so users can easily understand why things happen the way they do" },
            { title: "Safer to share", text: "role-based access and record locking let teams work on the same data without stepping on each other's toes" },
            { title: "Works anywhere", text: "responsive layouts and wrapping rules keep data-heavy screens usable on any screen size" },
          ],
        },
      ],
    },
  },
  {
    slug: "app-in-progress",
    eyebrow: "Personal project",
    title: "Music Notes",
    status: "In progress",
    summary:
      "A personal app I'm designing and building end to end. Music Notes is an app where you can keep track of and share your thoughts about music. You also have a gamified room you can customize to your liking!",
    meta: [
      { label: "Role", value: "Designer & Developer" },
      { label: "Year", value: "2026" },
      { label: "Stack", value: "Figma · Next.js" },
    ],
    tags: ["Product design", "Mobile", "Work in progress"],
    theme: {
      bg: "#013729",
      fg: "#f4f5ff",
      muted: "rgba(244, 245, 255, 0.68)",
      line: "rgba(244, 245, 255, 0.2)",
      accent: "#ffd84d",
    },
    items: [
      {
        src: "/media/MyAppScreenshots.png",
        alt: "Core user flow screens",
        aspect: "4 / 3",
        header: "The core app",
        body: "Creating a home page that feels familiar and puts user's most desired features front and center",
      },
      {
        src: "/media/MyAppSS2.png",
        alt: "Visual direction and type explorations",
        aspect: "4 / 3",
        header: "Visual direction",
        body: "Settled on clean type with pixelated accent details, which will match the blocky design of the roo created in three.js",
      },
    ],
    caseStudy: {
      category: "Personal project",
      intro:
        "An app I'm designing and building from scratch. This page tracks the decisions as they happen.",
      hero: { src: "/media/AppDemoVid.mp4", alt: "App concept overview", aspect: "16 / 9" },
      sections: [
        {
          heading: "Why I'm building it",
          body: ["I've always wanted a place to keep track of my thoughts about music, new releases, andshare them with friends. Taking it a step further, I wanted to create a space that felt like a room you could customize and make your own, and one that is shaped based on your listening habits."],
        },
        {
          heading: "Where it stands",
          body: ["Currently I am in the design phase, and have created a couple core screens. Next steps will be to prototype the full core flow, build the app in React, and then add the three.js room experience."],
          media: { src: "/media/MyAppScreenshots.png", alt: "Current screens", aspect: "4 / 3" },
        },
      ],
    },
  },
];

export const visualWork = {
  eyebrow: "Visual work",
  title: "Posters & Motion",
  summary:
    "Outside of work I design posters and edit videos! It's where I experiment with design further than a UI usually allows.",
  theme: {
    bg: "#D8622C",
    fg: "#141210",
    muted: "rgba(20, 18, 16, 0.68)",
    line: "rgba(20, 18, 16, 0.2)",
    accent: "#2236e8",
  } satisfies Theme,
  // Add as many as you like; the row scrolls horizontally.
  items: [
    { src: "/media/TheWeekndSplitPosterCopy.png", alt: "The Weeknd Split Poster", aspect: "4 / 5" },
    { src: "/media/JeanDawsonPixelBathPosterBLUEVid.mp4", alt: "Jean Dawson Moving Poster", aspect: "4 / 5" },
    { src: "/media/DarkSouls3PathBlurPostercopy.png", alt: "Dark Souls 3 Poster", aspect: "4 / 5" },
    { src: "/media/LUXposterFINALFINALcopy.png", alt: "LUX Poster", aspect: "4 / 5" },
    { src: "/media/FrankOceanMixedMediaCopy.png", alt: "Frank Ocean Mixed Media", aspect: "4 / 5" },
    { src: "/media/epistolaresakriilaposterCopy.PNG", alt: "Akriila Poster", aspect: "4 / 5" },
    { src: "/media/tiffanyDaysFINALVertical.png", alt: "Tiffany Day Vertical Poster", aspect: "4 / 5", position: "50% 10%" },
    { src: "/media/GraveoftheFirefliesPosternobordercopy.png", alt: "Grave of the Fireflies Poster", aspect: "4 / 5" }
  ] satisfies MediaItem[],
};

export const about = {
  photo: { src: "/media/AboutMePic.jpg", alt: "Matthew McMurray" },
  paragraphs: [
    "I'm a software engineer working mostly on the frontend, and I care most about the part people actually touch. At work I design high-fidelity prototypes in Figma, then build them into the production product myself.",
    "Before that I worked as a design assistant at UConn, and I've taken design coursework alongside my engineering classes. Outside of work I create posters and edit videos.",
  ],
  toolkit: [
    { group: "Design", items: ["Figma", "Photoshop", "Illustrator", "Premiere Pro", "After Effects"] },
    { group: "Languages & Frameworks", items: ["React", "JavaScript","TypeScript", "Next.js", "CSS & motion"] },
    { group: "Tools", items: ["Cloudbees CI/CD Pipeline", "MCP Servers", "Github Copilot", "Pivotal Cloud Foundry (PCF)"] },
  ],
};
