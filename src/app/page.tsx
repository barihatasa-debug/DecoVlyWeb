"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ═══════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════ */

function LogoMark() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect width="34" height="34" rx="10" className="fill-accent" />
      <path
        d="M9 23V13a2 2 0 012-2h12a2 2 0 012 2v10"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M7 23h20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M14 17h6M17 14v6"
        stroke="white"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function UploadIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function PaletteIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  );
}

function SparkleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ArrowRightIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function MenuIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function GripIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="8" y1="6" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="18" />
      <polyline points="5 12 8 9 11 12" />
      <polyline points="13 12 16 9 19 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const SHOWCASE_SETS = [
  [
    { label: "Interior", before: "/showcase/interior-before.png", after: "/showcase/interior-after.png" },
    { label: "Interior 2", before: "/showcase/interior-before-2.png", after: "/showcase/interior-after-2.png" },
    { label: "Exterior", before: "/showcase/exterior-before.png", after: "/showcase/exterior-after.png" },
  ],
  [
    { label: "Interior 2", before: "/showcase/interior-before-2.png", after: "/showcase/interior-after-2.png" },
    { label: "Garden", before: "/showcase/garden-before.png", after: "/showcase/garden-after.png" },
    { label: "Interior", before: "/showcase/interior-before.png", after: "/showcase/interior-after.png" },
  ],
  [
    { label: "Exterior", before: "/showcase/exterior-before.png", after: "/showcase/exterior-after.png" },
    { label: "Interior", before: "/showcase/interior-before.png", after: "/showcase/interior-after.png" },
    { label: "Garden", before: "/showcase/garden-before.png", after: "/showcase/garden-after.png" },
  ],
  [
    { label: "Garden", before: "/showcase/garden-before.png", after: "/showcase/garden-after.png" },
    { label: "Exterior", before: "/showcase/exterior-before.png", after: "/showcase/exterior-after.png" },
    { label: "Interior 2", before: "/showcase/interior-before-2.png", after: "/showcase/interior-after-2.png" },
  ],
];

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Styles", href: "#styles" },
  { label: "Rooms", href: "#rooms" },
  { label: "FAQ", href: "#faq" },
];

const ROOM_TYPES = [
  { name: "Living Room", image: "/rooms/living-room.jpg" },
  { name: "Bedroom", image: "/rooms/bedroom.jpg" },
  { name: "Kitchen", image: "/rooms/kitchen.jpg" },
  { name: "Bathroom", image: "/rooms/bathroom.jpg" },
  { name: "Dining Room", image: "/rooms/dining-room.png" },
  { name: "Home Office", image: "/rooms/home-office.png" },
  { name: "Gaming Room", image: "/rooms/gaming-room.png" },
  { name: "Outdoor", image: "/rooms/outdoor.png" },
];

const DESIGN_STYLES = [
  { name: "Modern", images: ["/styles/modern-1.jpg", "/styles/modern-2.jpg"] },
  { name: "Minimalist", images: ["/styles/minimalist-1.jpg", "/styles/minimalist-2.jpg"] },
  { name: "Scandinavian", images: ["/styles/scandinavian-1.jpg", "/styles/scandinavian-2.jpg"] },
  { name: "Industrial", images: ["/styles/industrial-1.jpg", "/styles/industrial-2.png"] },
  { name: "Bohemian", images: ["/styles/bohemian-1.jpg", "/styles/bohemian-2.jpg"] },
  { name: "Mid-Century", images: ["/styles/mid-century-1.jpg", "/styles/mid-century-2.jpg"] },
  { name: "Contemporary", images: ["/styles/contemporary-1.jpg", "/styles/contemporary-2.jpg"] },
  { name: "Traditional", images: ["/styles/traditional-1.jpg", "/styles/traditional-2.png"] },
  { name: "Rustic", images: ["/styles/rustic-1.jpg", "/styles/rustic-2.jpg"] },
  { name: "Art Deco", images: ["/styles/art-deco-1.jpg", "/styles/art-deco-2.png"] },
  { name: "Japanese", images: ["/styles/japanese-1.jpg", "/styles/japanese-2.png"] },
  { name: "Coastal", images: ["/styles/coastal-1.jpg", "/styles/coastal-2.jpg"] },
];

const FEATURES = [
  {
    icon: <SparkleIcon className="w-7 h-7" />,
    title: "AI-Powered Redesign",
    description:
      "Advanced AI transforms your space into any style — photorealistic results in seconds.",
  },
  {
    icon: <PaletteIcon className="w-7 h-7" />,
    title: "50+ Design Styles",
    description:
      "From minimalist to maximalist, Scandinavian to Art Deco. Find your perfect aesthetic.",
  },
  {
    icon: <UploadIcon className="w-7 h-7" />,
    title: "Simple Upload",
    description:
      "Just snap a photo of any room. Our AI handles the rest — no design skills needed.",
  },
  {
    icon: <CheckCircleIcon className="w-7 h-7" />,
    title: "Any Room, Any Space",
    description:
      "Living rooms, kitchens, bedrooms, outdoors — transform every corner of your home.",
  },
];

const FAQS = [
  {
    question: "How does DecoAI work?",
    answer:
      "Simply upload a photo of your room, select a design style you love, and our AI will generate a photorealistic redesign of your space in seconds. No design experience needed.",
  },
  {
    question: "What types of rooms can I redesign?",
    answer:
      "You can redesign any room — living rooms, bedrooms, kitchens, bathrooms, dining rooms, home offices, kids rooms, and even outdoor spaces like patios and gardens.",
  },
  {
    question: "How many design styles are available?",
    answer:
      "We offer 50+ curated design styles including Modern, Minimalist, Scandinavian, Industrial, Bohemian, Mid-Century Modern, Art Deco, Japanese, Coastal, and many more.",
  },
  {
    question: "Is DecoAI free to use?",
    answer:
      "Yes! You can get started for free with no signup required. Upload your first room photo and see the transformation instantly.",
  },
  {
    question: "Can I use DecoAI for professional interior design?",
    answer:
      "Absolutely. Many interior designers and real estate agents use DecoAI to quickly visualize concepts for their clients, stage properties, and explore design directions.",
  },
  {
    question: "How realistic are the AI-generated designs?",
    answer:
      "Our AI produces photorealistic results that maintain your room's dimensions and architectural features while applying the chosen design style with stunning accuracy.",
  },
];

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [styleImageIndex, setStyleImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  /* ── Scroll listener for navbar ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── IntersectionObserver for reveal animations ── */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ── Showcase auto-rotation ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_SETS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ── Style images auto-rotation ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setStyleImageIndex((prev) => (prev + 1) % 2);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* ── Before/After slider logic ── */
  const handleSliderMove = useCallback((clientX: number) => {
    if (!isDragging.current || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPos(Math.max(2, Math.min(98, (x / rect.width) * 100)));
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleSliderMove(e.clientX);
    const onTouchMove = (e: TouchEvent) =>
      handleSliderMove(e.touches[0].clientX);
    const onUp = () => {
      isDragging.current = false;
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
    };
  }, [handleSliderMove]);

  return (
    <>
      {/* ═══════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1120px] items-center justify-between px-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <LogoMark />
            <span className="text-[20px] font-extrabold tracking-tight text-primary">
              DecoAI
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-text-light hover:text-primary"
                    : "text-text-light hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="hidden h-[46px] items-center rounded-full bg-accent px-7 text-[16px] font-bold text-white shadow-[0_12px_32px_rgba(255,68,56,0.35)] transition-all hover:bg-accent-hover hover:shadow-[0_16px_40px_rgba(255,68,56,0.45)] md:inline-flex"
            >
              Download the App
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-lg p-2 transition-colors md:hidden ${
                scrolled
                  ? "text-primary hover:bg-surface"
                  : "text-primary hover:bg-white/30"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="animate-fade-in border-t border-border bg-white px-6 py-6 md:hidden">
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-text-light transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#download"
                className="mt-2 h-[54px] flex items-center justify-center rounded-full bg-accent text-[16px] font-bold text-white shadow-[0_12px_32px_rgba(255,68,56,0.35)] transition-all hover:bg-accent-hover"
              >
                Download the App
              </a>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* ═══════════════════════════════════════
            HERO — Dark gradient background
            ═══════════════════════════════════════ */}
        <section
          id="hero"
          className="grain relative overflow-hidden pb-24 pt-32 lg:pb-32 lg:pt-44"
          style={{
            background:
              "linear-gradient(135deg, #FAF6F0 0%, #F5EFE6 40%, #EDE4D6 100%)",
          }}
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#E8D5B7]/40 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#D4C4A8]/30 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-[1120px] px-6 text-center">
            {/* Badge */}
            <div className="animate-fade-in-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <SparkleIcon className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold tracking-wide text-primary/70 uppercase">
                AI-Powered Home Redesign
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-1 mx-auto max-w-4xl text-[48px] font-extrabold leading-[1.1] tracking-[-0.03em] text-primary sm:text-[56px] lg:text-[72px]">
              Redesign Any Room{" "}
              <span className="text-accent">in Seconds</span>
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up delay-2 mx-auto mt-6 max-w-2xl text-[18px] leading-[1.6] text-text-light">
              Upload a photo of your space, choose from 50+ design styles, and
              watch AI transform your room into the home of your dreams.
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up delay-3 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#download"
                className="group inline-flex h-[54px] items-center gap-2 rounded-full bg-accent px-7 text-[16px] font-bold text-white shadow-[0_12px_32px_rgba(255,68,56,0.35)] transition-all hover:bg-accent-hover hover:shadow-[0_16px_40px_rgba(255,68,56,0.45)]"
              >
                Download the App
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-[46px] items-center gap-2 rounded-full border border-primary/20 bg-transparent px-6 text-[16px] font-bold text-primary transition-all hover:border-primary/40 hover:bg-white/50"
              >
                See How It Works
              </a>
            </div>

            {/* Hero Visual — Before/After Preview */}
            <div className="animate-scale-in delay-5 mx-auto mt-16 max-w-4xl">
              <div
                ref={sliderRef}
                className="group relative aspect-[16/9] cursor-ew-resize select-none overflow-hidden rounded-[20px] border border-border shadow-[0_18px_45px_rgba(0,0,0,0.1)]"
                onMouseDown={() => {
                  isDragging.current = true;
                }}
                onTouchStart={() => {
                  isDragging.current = true;
                }}
              >
                {/* AFTER — full background */}
                <div className="absolute inset-0">
                  <Image
                    src="/showcase/interior-after.png"
                    alt="Redesigned room"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* BEFORE — clipped overlay */}
                <div
                  className="absolute inset-0"
                  style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                  <Image
                    src="/showcase/interior-before.png"
                    alt="Original room"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Slider handle */}
                <div
                  className="absolute top-0 bottom-0 z-20 w-0.5 bg-white/80"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent text-white shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-110">
                    <GripIcon className="h-4 w-4" />
                  </div>
                </div>

                {/* Labels */}
                <div className="pointer-events-none absolute top-4 left-4 z-10 rounded-full bg-primary/60 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase backdrop-blur-sm">
                  Before
                </div>
                <div className="pointer-events-none absolute top-4 right-4 z-10 rounded-full bg-accent/90 px-3 py-1 text-xs font-bold tracking-wide text-white uppercase backdrop-blur-sm">
                  After
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-muted">
                Drag the slider to compare before &amp; after
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TRUST BAR
            ═══════════════════════════════════════ */}
        <section className="border-b border-border bg-white py-8">
          <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-8 px-6 sm:gap-14">
            {[
              { value: "100%", label: "Free to Start" },
              { value: "50+", label: "Design Styles" },
              { value: "30s", label: "Average Result" },
              { value: "No", label: "Signup Required" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 text-center"
              >
                <span className="text-[28px] font-extrabold tracking-tight text-accent">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-text-light">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            HOW IT WORKS
            ═══════════════════════════════════════ */}
        <section id="how-it-works" className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            {/* Section header */}
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Simple Process
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                Three Steps to Your Dream Room
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-text-light">
                No design skills needed. Our AI does the heavy lifting.
              </p>
            </div>

            {/* Steps */}
            <div className="reveal mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  step: "01",
                  icon: <UploadIcon className="h-7 w-7" />,
                  title: "Upload Your Photo",
                  desc: "Take a photo of any room you want to redesign and upload it to DecoAI.",
                },
                {
                  step: "02",
                  icon: <PaletteIcon className="h-7 w-7" />,
                  title: "Choose a Style",
                  desc: "Browse 50+ curated design styles and pick the one that speaks to you.",
                },
                {
                  step: "03",
                  icon: <SparkleIcon className="h-7 w-7" />,
                  title: "Get Your Redesign",
                  desc: "Watch as AI transforms your room into a photorealistic redesign in seconds.",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="group relative rounded-[12px] border border-border bg-white p-8 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {/* Step number */}
                  <span className="absolute -top-3.5 left-8 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                    {item.step}
                  </span>
                  {/* Icon */}
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[12px] bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-[20px] font-bold tracking-[-0.01em] text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-text-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            TRANSFORMATIONS SHOWCASE
            ═══════════════════════════════════════ */}
        <section className="bg-surface py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Real Results
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                See the Transformation
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-text-light">
                Real rooms redesigned by our AI.
              </p>
            </div>

            {/* Layered crossfade — all sets stacked, only active one visible */}
            <div className="reveal mt-16 relative">
              {SHOWCASE_SETS.map((set, setIdx) => (
                <div
                  key={setIdx}
                  className={`grid gap-6 md:grid-cols-3 transition-opacity duration-[1200ms] ease-in-out ${
                    setIdx === showcaseIndex
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0"
                  }`}
                >
                  {set.map((room, i) => (
                    <div
                      key={i}
                      className="group overflow-hidden rounded-[16px] border border-border bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                    >
                      {/* Before */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={room.before}
                          alt={`${room.label} before`}
                          fill
                          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-3 left-3 rounded-full bg-primary/60 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                          Before
                        </span>
                      </div>
                      {/* Arrow */}
                      <div className="flex items-center justify-center py-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <polyline points="19 12 12 19 5 12" />
                          </svg>
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={room.after}
                          alt={`${room.label} after`}
                          fill
                          className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                        />
                        <span className="absolute bottom-3 left-3 rounded-full bg-accent/90 px-2.5 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
                          After — {room.label}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Dot indicators */}
            <div className="mt-8 flex items-center justify-center gap-2.5">
              {SHOWCASE_SETS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setShowcaseIndex(i)}
                  className={`rounded-full transition-all duration-500 ease-in-out ${
                    i === showcaseIndex
                      ? "h-2.5 w-7 bg-accent"
                      : "h-2.5 w-2.5 bg-border hover:bg-muted"
                  }`}
                  aria-label={`Show set ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            ROOM TYPES
            ═══════════════════════════════════════ */}
        <section id="rooms" className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Every Space
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                Redesign Any Room
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-text-light">
                From kitchens to patios — every corner of your home can be
                transformed.
              </p>
            </div>

            <div className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {ROOM_TYPES.map((room) => (
                <button
                  key={room.name}
                  className="group relative overflow-hidden rounded-[12px] border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 py-3">
                    <span className="text-[14px] font-bold text-primary">
                      {room.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            DESIGN STYLES
            ═══════════════════════════════════════ */}
        <section id="styles" className="bg-surface py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Curated Collection
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                50+ Design Styles
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-text-light">
                Explore a world of aesthetics. Every style generates unique,
                photorealistic results.
              </p>
            </div>

            <div className="reveal mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {DESIGN_STYLES.map((style) => (
                <button
                  key={style.name}
                  className="group relative aspect-[4/3] overflow-hidden rounded-[12px] border border-border transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                >
                  {style.images.map((img, imgIdx) => (
                    <Image
                      key={img}
                      src={img}
                      alt={`${style.name} style ${imgIdx + 1}`}
                      fill
                      className={`object-cover transition-all duration-[1200ms] ease-in-out group-hover:scale-105 ${
                        imgIdx === styleImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <span className="text-[14px] font-bold text-white">
                      {style.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-10 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[14px] font-bold text-accent transition-colors hover:text-accent-hover"
              >
                Browse All 50+ Styles
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            FEATURES
            ═══════════════════════════════════════ */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1120px] px-6">
            <div className="reveal mx-auto max-w-2xl text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Why DecoAI
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                Design Made Effortless
              </h2>
              <p className="mt-4 text-[18px] leading-[1.6] text-text-light">
                Professional-quality room redesigns, accessible to everyone.
              </p>
            </div>

            <div className="reveal mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((feat, i) => (
                <div
                  key={feat.title}
                  className="group rounded-[12px] border border-border bg-white p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[12px] bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    {feat.icon}
                  </div>
                  <h3 className="text-[18px] font-bold tracking-[-0.01em] text-primary">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-text-light">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            FAQ
            ═══════════════════════════════════════ */}
        <section id="faq" className="bg-surface py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <div className="reveal text-center">
              <span className="text-[13px] font-bold tracking-widest text-accent uppercase">
                Questions
              </span>
              <h2 className="mt-3 text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[44px]">
                Frequently Asked
              </h2>
            </div>

            <div className="reveal mt-14 space-y-3">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-[12px] border border-border bg-white transition-colors hover:border-accent/30"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="pr-4 text-[16px] font-bold text-primary">
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === i
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[16px] leading-[1.6] text-text-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            DOWNLOAD SECTION
            ═══════════════════════════════════════ */}
        <section
          id="download"
          className="grain relative overflow-hidden py-20 lg:py-24"
          style={{
            background:
              "linear-gradient(135deg, #F5EFE6 0%, #EDE4D6 40%, #E3D5C0 100%)",
          }}
        >
          {/* Decorative */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#D4C4A8]/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#E8D5B7]/40 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="reveal text-[36px] font-extrabold leading-[1.15] tracking-[-0.02em] text-primary sm:text-[48px]">
              Ready to Transform{" "}
              <span className="text-accent">Your Space?</span>
            </h2>
            <p className="reveal mt-5 text-[18px] leading-[1.6] text-text-light">
              Download DecoAI and start redesigning your rooms today. Available
              on iOS and Android.
            </p>

            {/* Store Badges */}
            <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* App Store */}
              <a
                href="#"
                className="inline-flex h-[58px] items-center gap-3 rounded-[12px] bg-primary px-6 transition-all hover:bg-primary-light hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
              >
                <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium leading-none text-white/70">
                    Download on the
                  </div>
                  <div className="mt-0.5 text-[18px] font-bold leading-tight text-white">
                    App Store
                  </div>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="inline-flex h-[58px] items-center gap-3 rounded-[12px] bg-primary px-6 transition-all hover:bg-primary-light hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#4285F4" />
                  <path d="M17.727 8.063L5.201.862C4.899.69 4.57.617 4.25.636l9.542 9.542 3.935-2.115z" fill="#EA4335" />
                  <path d="M17.727 15.937l-3.935-3.935-9.542 9.542c.32.02.649-.054.951-.226l12.526-5.381z" fill="#34A853" />
                  <path d="M21.397 10.693l-3.67-1.63L13.792 12l3.935 3.937 3.67-1.63c.856-.492.856-1.723 0-2.614z" fill="#FBBC05" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] font-medium leading-none text-white/70">
                    GET IT ON
                  </div>
                  <div className="mt-0.5 text-[18px] font-bold leading-tight text-white">
                    Google Play
                  </div>
                </div>
              </a>
            </div>

            <p className="reveal mt-6 text-[13px] text-muted">
              Free to download. No credit card required.
            </p>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="border-t border-border bg-white py-16">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Brand */}
            <div className="md:col-span-1">
              <a href="#" className="flex items-center gap-2.5">
                <LogoMark />
                <span className="text-[20px] font-extrabold tracking-tight text-primary">
                  DecoAI
                </span>
              </a>
              <p className="mt-4 text-[14px] leading-[1.6] text-text-light">
                AI-powered room redesign for everyone. Transform your space in
                seconds.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-primary">
                Product
              </h4>
              <ul className="mt-4 space-y-3">
                {[
                  "AI Room Design",
                  "Design Styles",
                  "Room Types",
                  "How It Works",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-text-light transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-primary">
                Resources
              </h4>
              <ul className="mt-4 space-y-3">
                {["Style Quiz", "Gallery", "Blog", "FAQ"].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-text-light transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider text-primary">
                Company
              </h4>
              <ul className="mt-4 space-y-3">
                {[
                  "About",
                  "Contact",
                  "Privacy Policy",
                  "Terms of Service",
                ].map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14px] text-text-light transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
            <p className="text-[13px] text-muted">
              &copy; 2026 DecoAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Twitter", "Instagram", "LinkedIn"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="text-[13px] text-muted transition-colors hover:text-accent"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
