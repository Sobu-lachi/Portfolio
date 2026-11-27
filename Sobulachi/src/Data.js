import creatorImage from './assets/creatorImage.jpeg'
import edit1 from './assets/edit1.jpg'
// ===== EDIT THIS FILE to customise the site =====
export const SITE = {
  brand: "Soby",
  whatsapp: "2348102389057", // country code + number, no "+" or spaces
  email: "sobula07@gmail.com",
  instagram: "_sobulachi_",
};

export const NAV = [
  ["Home", "#home"], ["Video Editing", "#editing"],
  ["About", "#about"], ["Contact", "#contact"],
];
//  ["UGC", "#ugc"],

// Sample CC0 clip (MDN). Replace `src` with your own videos; `poster` is optional.
const SAMPLE = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const img = (seed, w = 600, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const HERO_IMAGE = creatorImage;

// Keep each video's MP4 URL separate from its still-image thumbnail URL.
// Replace each poster with a unique ImageKit JPG/PNG URL when available.
export const EDITING = [
  {
    id: "edit-1",
    title: "Sample Edit 1",
    src: "https://ik.imagekit.io/pyy7iucfe/lv_0_20261024194713.mp4?updatedAt=17957879418509",
    poster: edit1,
  },
  { id: "edit-2", title: "Sample Edit 2", src: SAMPLE, poster: img("edit2") },
  { id: "edit-3", title: "Sample Edit 3", src: SAMPLE, poster: img("edit3") },
  { id: "edit-4", title: "Sample Edit 4", src: SAMPLE, poster: img("edit4") },
];

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
