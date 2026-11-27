import { useEffect, useRef, useState } from "react";
import {
  Menu, X, Volume2, VolumeX, ChevronDown, MessageCircle, Mail, Camera, ArrowUpRight, Play, Moon, Sun,
} from "lucide-react";
import { SITE, NAV, HERO_IMAGE, EDITING, CAROUSEL, FAQS } from "./Data"; //UGC, 
import { useTheme } from "./themeContext.jsx";

const display = "font-display uppercase tracking-wide";
const btnPink = "inline-flex items-center gap-2 rounded-full bg-pink-500 px-6 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-pink-600 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500";
const btnLight = "inline-flex items-center gap-2 rounded-full border-2 border-black px-6 py-3 font-bold transition hover:-translate-y-0.5 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black";

/* Fade/slide in when scrolled into view */
function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.12 });
    ref.current && io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`}>{children}</div>;
}

function Nav({ isDark, toggleTheme }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav aria-label="Main" className="mx-auto max-w-5xl rounded-3xl border border-black/10 bg-white/70 px-5 py-3 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-neutral-900/80">
        <div className="flex items-center justify-between">
          <a href="#home" className={`${display} text-2xl`}>{SITE.brand}</a>
          <ul className="hidden items-center gap-4 md:flex lg:gap-6">
            {NAV.map(([l, h]) => (
              <li key={h}><a href={h} className="group relative text-sm font-semibold">{l}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-pink-500 transition-all group-hover:w-full" /></a></li>
            ))}
            <li>
              <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-3 py-2 text-sm font-semibold transition hover:border-pink-500 hover:text-pink-500 dark:border-white/20">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
            </li>
          </ul>
          <div className="hidden md:block">    
          <a href="#contact" className={`${btnPink} !py-2 text-sm`}>Let's Work Together</a>
          </div>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <ul className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4 md:hidden dark:border-white/10">
            {NAV.map(([l, h]) => <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-1 font-semibold">{l}</a></li>)}
            <li>
              <button type="button" onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="inline-flex items-center gap-2 py-1 font-semibold">
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                <span>{isDark ? "Light mode" : "Dark mode"}</span>
              </button>
            </li>
            <li><a href="#contact" onClick={() => setOpen(false)} className={`${btnPink} w-full justify-center`}>Let's Work Together</a></li>
          </ul>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pb-16 pt-32 sm:px-8 md:grid-cols-2 md:gap-12"
    >
      <Reveal className="relative mx-auto w-full max-w-sm sm:max-w-md">
        <div className="absolute -bottom-3 -right-3 h-full w-full rounded-[2rem] bg-pink-500 sm:-bottom-4 sm:-right-4 sm:rounded-[2.5rem]" aria-hidden />
        <img
          src={HERO_IMAGE}
          alt="Portrait of the creator"
          className="relative aspect-[4/5] w-full rounded-[2rem] border-2 border-black object-cover dark:border-white sm:rounded-[2.5rem]"
        />
        <span className="absolute -left-2 top-6 flex items-center gap-1 rounded-full bg-black px-3 py-2 text-xs font-bold text-white dark:bg-white dark:text-black sm:-left-3 sm:top-8 sm:px-4 sm:text-sm">
          <Play size={14} className="fill-pink-500 text-pink-500" />
          Now editing
        </span>
      </Reveal>

      <Reveal className="text-center md:text-left">
        <p className="text-lg font-bold sm:text-xl">A</p>
        <h1 className={`${display} text-6xl leading-[0.9] sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl`}>
          Video <span className="text-pink-500">Editor</span>
          <br />& Content Creator
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base text-black/70 dark:text-white/70 sm:text-lg md:mx-0">
          I create engaging videos and visual content that stop the scroll and tell your story.
        </p>
        <div className="mt-8 flex text-xs md:text-base flex-row items-center justify-center gap-3 w-full md:justify-start">
          <a href="#editing" className={btnPink}>Explore My Work</a>
          <a href="#contact" className={btnLight}>Let's Collaborate</a>
        </div>
      </Reveal>
    </section>
  );
}


/* One video: hover (mouse) / tap (touch) / focus to preview; sound button on the right */
function VideoCard({ item, soundId, setSoundId }) {
  const vid = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const sound = soundId === item.id;
  // const youtubeEmbedUrl = getYouTubeEmbedUrl(item.src);

  useEffect(() => { if (vid.current && !sound) vid.current.muted = true; }, [sound]);

  const start = () => {
    const v = vid.current; if (!v) return;
    v.muted = true; v.play().catch(() => {}); setPlaying(true);
  };
  const stop = () => {
    const v = vid.current; if (!v) return;
    v.pause(); v.muted = true; v.currentTime = 0; setPlaying(false);
    setSoundId((cur) => (cur === item.id ? null : cur));
  };
  const toggleSound = (e) => {
    e.stopPropagation();
    if (!playing) start();
    const on = !sound;
    vid.current.muted = !on;
    setSoundId(on ? item.id : null);
  };
  const touch = useRef(false);

  return (
    <div
      tabIndex={0} role="group" aria-label={`Video preview: ${item.title || item.brand}`}
      className="group relative aspect-[9/13] sm-aspect-[9/14] overflow-hidden rounded-3xl border border-black/10 bg-black shadow-md transition hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-pink-500"
      onPointerEnter={(e) => { touch.current = e.pointerType !== "mouse"; if (!touch.current) start(); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") stop(); }}
      onClick={() => touch.current && (playing ? stop() : start())}
      onFocus={start}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && stop()}
    >
      {!ready && <div className="absolute inset-0 animate-pulse bg-neutral-800" />}
      <video ref={vid} src={item.src} poster={item.poster} muted loop playsInline preload="metadata"
        onLoadedData={() => setReady(true)} onError={() => setReady(true)}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      {!playing && <div className="pointer-events-none absolute inset-0 grid place-items-center"><span className="rounded-full bg-white/90 p-4"><Play className="fill-black" /></span></div>}
      <button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Mute video" : "Unmute video"}
        className={`absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full backdrop-blur transition ${sound ? "bg-pink-500 text-white" : "bg-white/80 text-black hover:bg-white"}`}>
        {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
      </button>
    </div>
  );
}


const Heading = ({ kicker, children }) => (
  <div className="mb-8 sm:mb-10">
    <p className="text-sm font-bold text-pink-500 sm:text-base">{kicker}</p>
    <h2 className={`${display} text-4xl sm:text-6xl lg:text-7xl`}>
      {children}
    </h2>
  </div>
);


function Editing() {
  const [soundId, setSoundId] = useState(null);

  return (
    <section
      id="editing"
      className="mx-auto max-w-7xl bg-gray-200 px-4 py-16 dark:bg-zinc-900 sm:px-6 sm:py-20 lg:px-10 lg:py-24"
    >
      <Reveal>
        <Heading kicker="Selected work">Video Editing</Heading>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {EDITING.map((v) => (
            <VideoCard
              key={v.id}
              item={v}
              soundId={soundId}
              setSoundId={setSoundId}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}


// function UGCItem({ u, soundId, setSoundId }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <article className="min-w-0 overflow-hidden rounded-3xl border border-black/10 bg-slate-100 shadow-sm transition hover:shadow-lg dark:border-white/10 dark:bg-neutral-900">
//       <VideoCard item={u} soundId={soundId} setSoundId={setSoundId} />

//       <div className="p-2 sm:p-3">
//         <div className="flex items-center justify-between gap-2 min-w-0">
//           <h3 className={`${display} min-w-0 truncate text-sm text-pink-500 sm:text-base`}>
//             {u.brand}
//           </h3>

//           <button
//             onClick={() => setOpen(!open)}
//             aria-expanded={open}
//             aria-controls={`${u.id}-details`}
//             className="flex shrink-0 items-center gap-1 rounded-full md:border md:border-pink-500 px-2.5 py-2 text-xs font-bold text-pink-500 transition hover:bg-pink-500 hover:text-white"
//           >
//             <span className= "hidden sm:inline">
//             {open ? "See Less" : "See More"}
//             </span>
//             <ChevronDown
//               size={15}
//               className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
//             />
//           </button>
//         </div>

//         <div
//           id={`${u.id}-details`}
//           className={`grid transition-all duration-300 ${
//             open ? "mt-4 grid-rows-[1fr]" : "grid-rows-[0fr]"
//           }`}
//         >
//           <div className="overflow-hidden text-sm text-black/70 dark:text-white/70">
//             <dl className="space-y-3">
//               <div>
//                 <dt className="font-bold text-black dark:text-white">Campaign</dt>
//                 <dd>{u.description}</dd>
//               </div>
//               <div>
//                 <dt className="font-bold text-black dark:text-white">Objective</dt>
//                 <dd>{u.objective}</dd>
//               </div>
//               <div>
//                 <dt className="font-bold text-black dark:text-white">Details</dt>
//                 <dd>{u.details}</dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

// function UGCSection() {
//   const [soundId, setSoundId] = useState(null);

//   return (
//     <section
//       id="ugc"
//       className="bg-white py-16 text-black dark:bg-black dark:text-white sm:py-20 lg:py-24"
//     >
//       <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
//         <Reveal>
//           <div className="mb-8 sm:mb-10">
//             <p className="font-bold text-pink-500">Brand collaborations</p>
//             <h2 className={`${display} text-5xl sm:text-6xl lg:text-7xl`}>
//               UGC Creator
//             </h2>
//           </div>

//           <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
//             {UGC.map((u) => (
//               <UGCItem
//                 key={u.id}
//                 u={u}
//                 soundId={soundId}
//                 setSoundId={setSoundId}
//               />
//             ))}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }



function WhyWorkWithMe() {
  const reasons = [
    {
      number: "01",
      title: "Intentional Storytelling",
      description:
        "I believe every video should have a purpose. I focus on creating edits that communicate your message and keep your audience engaged.",
    },
    {
      number: "02",
      title: "Attention to Detail",
      description:
        "From pacing and transitions to typography and sound design, I pay attention to the little things that bring a video together.",
    },
    {
      number: "03",
      title: "A Collaborative Approach",
      description:
        "Your vision matters. I take time to understand your ideas, welcome feedback and work with you to bring your creative direction to life.",
    },
  ];

  return (
    <section className="bg-white px-5 py-20 text-black dark:bg-black dark:text-white sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="font-bold text-pink-500">
              The value I bring
            </p>
            <h2 className={`${display} text-5xl sm:text-7xl`}>
              More Than Just The Edit.
            </h2>
            <p className="mt-4 text-lg text-black/70 dark:text-white/70">
              Great creative work goes beyond the final output.
              Here's what you can expect when we work together.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {reasons.map((reason) => (
              <article
                key={reason.number}
                className="rounded-3xl border border-black/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-pink-500 hover:shadow-xl dark:border-white/10 dark:bg-neutral-950 sm:p-9"
              >
                <span className="font-display text-4xl text-pink-500">
                  {reason.number}
                </span>

                <h3 className={`${display} mt-6 text-3xl`}>
                  {reason.title}
                </h3>

                <p className="mt-4 leading-relaxed text-black/70 dark:text-white/70">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}



const CAPTIONS = ["Behind the lens", "On set", "Late-night edits", "Creative mode", "Good vibes"]; // edit freely

/* Coverflow carousel: centred polaroid, smaller frames receding on both sides */
function AboutCarousel() {
  const n = CAROUSEL.length;
  const [i, setI] = useState(0);
  const x0 = useRef(null);
  const half = Math.floor(n / 2);

  const go = (d) => setI((c) => (c + d + n) % n);

  const offsetOf = (k) => ((k - i + n + half) % n) - half;

  const slot = (off) => {
    const a = Math.abs(off);
    const s = Math.sign(off);

    const mobile = window.innerWidth < 640;

    const sizes = mobile
      ? [
          { x: 0, w: 72, h: 94 },
          { x: 35, w: 27, h: 72 },
          { x: 45, w: 16, h: 55 },
        ]
      : [
          { x: 0, w: 50, h: 100 },
          { x: 31, w: 26, h: 80 },
          { x: 42, w: 16, h: 60 },
        ];

    const c = sizes[Math.min(a, 2)];

    return {
      left: `${50 + s * c.x}%`,
      width: `${c.w}%`,
      height: `${c.h}%`,
      transform: "translate(-50%, -50%)",
      zIndex: 10 - a,
      opacity: a > 2 ? 0 : 1,
      pointerEvents: a > 2 ? "none" : "auto",
    };
  };

  return (
    <div className="relative px-8 sm:px-11" aria-roledescription="carousel">
      <div
        className="relative aspect-[4/5] w-full select-none sm:aspect-[4/3]"
        onTouchStart={(e) => {
          x0.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (x0.current === null) return;
          const d = e.changedTouches[0].clientX - x0.current;
          if (Math.abs(d) > 40) go(d < 0 ? 1 : -1);
          x0.current = null;
        }}
      >
        {CAROUSEL.map((src, k) => {
          const off = offsetOf(k);

          return (
            <figure
              key={k}
              onClick={() => off !== 0 && go(off)}
              style={slot(off)}
              className={`absolute top-1/2 flex flex-col overflow-hidden rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-black/10 transition-all duration-700 ease-out dark:p-0 dark:bg-transparent sm:rounded-sm sm:p-[1.5%] ${
                off !== 0 ? "cursor-pointer" : ""
              }`}
            >
              <img
                src={src}
                alt={`Photo ${k + 1}`}
                draggable={false}
                className="min-h-0 w-full flex-1 rounded-xl object-cover sm:rounded-2xl"
              />

              <figcaption
                className={`overflow-hidden text-center font-display text-sm tracking-wide text-neutral-500 transition-all duration-500 sm:text-xl sm:leading-8 ${
                  off === 0 ? "h-6 opacity-100 sm:h-8" : "h-0 opacity-0"
                }`}
              >
                {CAPTIONS[k % CAPTIONS.length]}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </div>
  );
}


function About() {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-7xl items-center gap-12 bg-gray-200 px-4 py-16 dark:bg-zinc-900 sm:px-8 sm:py-20 md:grid-cols-2 lg:px-12 lg:py-24"
    >
      <Reveal className="w-full min-w-0">
        <AboutCarousel />
      </Reveal>

      <Reveal>
        <Heading kicker="Hi, I'm Amaewhule Sobulachi">About Me</Heading>

        <div className="space-y-4 text-base text-black/75 dark:text-white/75 sm:text-lg">
          <p>
            Placeholder: I'm a video editor and UGC creator who loves turning ideas into stories people actually want to watch.
          </p>
          <p>
            Placeholder: I edit for creators and brands, and I also film honest, relatable content in front of the camera.
          </p>
          <p>
            Placeholder: Working with me means clear communication, quick feedback loops and videos with real attention to detail.
          </p>
        </div>
      </Reveal>
    </section>
  );
}


function Contact() {
  const links = [
    { Icon: MessageCircle, label: "WhatsApp", sub: "Chat with me", href: `https://wa.me/${SITE.whatsapp}` },
    { Icon: Mail, label: "Gmail", sub: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: Camera, label: "Instagram", sub: `@${SITE.instagram}`, href: `https://instagram.com/${SITE.instagram}` },
  ];
  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-24 ">
      <Reveal>
        <div className="rounded-[2.5rem] border-2 border-black bg-pink-500/10 p-8 sm:p-14 dark:border-white/20 dark:bg-pink-500/10">
          <h2 className={`${display} text-5xl sm:text-7xl`}>Let's make something <span className="text-pink-500">great</span></h2>
          <p className="mt-3 max-w-lg text-black/70 dark:text-white/70">Reach out on whichever platform suits you.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {links.map(({ Icon, label, sub, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-3xl border border-black/10 bg-white p-5 transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-neutral-900">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-white transition group-hover:bg-pink-500"><Icon size={22} /></span>
                <span className="min-w-0 flex-1"><b className="block">{label}</b><span className="block truncate text-sm text-black/60 dark:text-white/60">{sub}</span></span>
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className=" rounded-3xl border border-black/15 transition hover:border-pink-500 hover:shadow-md dark:border-white/15">
      <button onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-lg font-bold">
        {q}<ChevronDown className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-pink-500" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden"><p className="px-6 pb-5 text-black/70 dark:text-white/70">{a}</p></div>
      </div>
    </div>
  );
}



function FAQ() {
  return (
    <section
      id="faq"
      className="mx-auto max-w-7xl bg-gray-100 px-4 py-16 dark:bg-zinc-900 sm:px-6 sm:py-20 md:px-12 lg:px-20 lg:py-24"
    >
      <Reveal>
        <Heading kicker="Good to know">FAQ</Heading>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((f) => (
            <FAQItem key={f.q} {...f} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}




function Footer() {
  return (
    <footer className="bg-black px-5 py-12 text-white sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-12">
        <div>
          <p className={`${display} text-4xl`}>{SITE.brand}</p>
          <p className="mt-2 max-w-xs text-sm text-white/60 sm:text-base">
            Stories worth watching, edited with care.
          </p>
        </div>

        <ul className="space-y-3">
          {NAV.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="transition hover:text-pink-500">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <a aria-label="Instagram" href={`https://instagram.com/${SITE.instagram}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-pink-500">
            <Camera size={20} />
          </a>
          <a aria-label="WhatsApp" href={`https://wa.me/${SITE.whatsapp}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-pink-500">
            <MessageCircle size={20} />
          </a>
          <a aria-label="Email" href={`mailto:${SITE.email}`} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 transition hover:bg-pink-500">
            <Mail size={20} />
          </a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-white/15 pt-6 text-xs text-white/50 sm:text-sm">
        © {new Date().getFullYear()} {SITE.brand}. All rights reserved.
      </p>
    </footer>
  );
}


export default function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen font-body transition-colors ${isDark ? "dark bg-neutral-950 text-white" : "bg-white text-black"}`}>
      <Nav isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Editing />
        {/* <UGCSection /> */}
        <WhyWorkWithMe />
        <About />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
