// ===== EDIT THIS FILE to customise the site =====
export const SITE = {
  brand: "Soby",
  whatsapp: "2348102389057", // country code + number, no "+" or spaces
  email: "sobula07@gmail.com",
  instagram: "_sobulachi_",
};

export const NAV = [
  ["Home", "#home"], ["Video Editing", "#editing"], ["UGC", "#ugc"],
  ["About", "#about"], ["Contact", "#contact"],
];

// Sample CC0 clip (MDN). Replace `src` with your own videos; `poster` is optional.
const SAMPLE = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const img = (seed, w = 600, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const HERO_IMAGE = img("portrait-main", 800, 1000); // swap for your portrait

export const EDITING = [1, 2, 3, 4].map((n) => ({
  id: `edit-${n}`, title: `Sample Edit ${n}`, src: SAMPLE, poster: img(`edit${n}`),
}));

export const UGC = [1, 2, 3, 4].map((n) => ({
  id: `ugc-${n}`, src: SAMPLE, poster: img(`ugc${n}`),
  brand: `Sample Brand ${n}`,
  description: "Sample campaign description. Replace with a real project summary.",
  objective: ["Awareness", "Conversions", "Product demo", "Launch"][n % 4],
  details: "Sample deliverable: 1 x 30s vertical video (placeholder).",
}));
export const UGC_INITIAL = 4;

export const CAROUSEL = [1, 2, 3, 4, 5].map((n) => img(`about${n}`, 700, 900));

export const FAQS = [
  { q: "What are your rates?", a: "Placeholder: rates depend on video length, complexity and number of revisions. Message me with your project for a quote." },
  { q: "What's your turnaround time?", a: "Placeholder: most edits are delivered in 2-5 business days. Rush options may be available." },
];
