import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  1. Animated Counter Hook — 0 থেকে target পর্যন্ত গণনা করে        */
/* ------------------------------------------------------------------ */
const useCountUp = (target, duration = 1800, start = false) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(target * eased);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, start]);

  return value;
};

/* ------------------------------------------------------------------ */
/*  2. StatCard — Glow animation সহ কার্ড                            */
/* ------------------------------------------------------------------ */
const StatCard = ({ icon, value, label, suffix = "", prefix = "", started, delay = 0 }) => {
  const numeric = Number(value);
  const animated = useCountUp(numeric, 1800, started);

  const formatted =
    numeric >= 1_000_000
      ? (animated / 1_000_000).toFixed(1) + "M"
      : numeric >= 1_000
      ? (animated / 1_000).toFixed(1) + "K"
      : Math.round(animated).toString();

  return (
    <div
      className="group relative flex flex-col items-center justify-center gap-2 p-6 rounded-2xl
                 bg-white/5 border border-white/10 backdrop-blur-sm
                 transition-all duration-500 hover:-translate-y-1
                 animate-glowPulse hover:animate-none"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Rotating conic glow ring (visible on hover) */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0
                   group-hover:opacity-100 transition-opacity duration-500
                   [background:conic-gradient(from_0deg,transparent_0%,rgba(6,182,212,0.6)_20%,transparent_40%,transparent_60%,rgba(6,182,212,0.6)_80%,transparent_100%)]
                   animate-glowRotate blur-[2px]"
      />

      {/* Inner solid background so content stays readable above the glow */}
      <div className="absolute inset-[1px] rounded-2xl bg-slate-950/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="text-cyan-400 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(6,182,212,0.7)]">
          {icon}
        </div>
        <div className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-[0_0_12px_rgba(6,182,212,0.35)]">
          {prefix}
          {formatted}
          {suffix}
        </div>
        <div className="text-sm md:text-base text-cyan-100/70 font-medium text-center">
          {label}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  3. Main FrontBrand Component                                       */
/* ------------------------------------------------------------------ */
const FrontBrand = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  // Auto-start counters when section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="w-9 h-9 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      value: 8000,
      label: "Our Employees",
      suffix: "+",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="w-9 h-9 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      value: 2.6,
      label: "Yearly Income",
      prefix: "$",
      suffix: "M",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             className="w-9 h-9 stroke-current">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      value: 96,
      label: "Sales Statistics",
      suffix: "%",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-gradient-to-b from-black via-slate-950 to-black py-20 px-4"
    >
      {/* Ambient pulsing glow behind the whole section */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                   bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none
                   animate-glowPulse"
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px]
                   bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none
                   animate-glowPulse"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col items-center gap-12">

        {/* ---------- Brand Screenshot ---------- */}
        <div className="w-full flex justify-center animate-fadeIn">
          <img
            src="https://i.ibb.co/5K5QKXG/Screenshot-2023-10-24-020055.png"
            alt="FrontBrand dashboard preview"
            className="w-full max-w-3xl rounded-2xl shadow-2xl shadow-cyan-500/30
                       ring-1 ring-white/10 transition-transform duration-500
                       hover:scale-[1.02] hover:shadow-cyan-400/50"
          />
        </div>

        {/* ---------- Brand Banner ---------- */}
        <div
          className="w-full flex justify-center animate-fadeIn"
          style={{ animationDelay: "150ms" }}
        >
          <img
            src="https://i.ibb.co.com/7Ngqt9Ny/car.png"
            alt="FrontBrand promotional banner"
            className="w-full max-w-3xl rounded-2xl shadow-xl shadow-cyan-500/20
                       ring-1 ring-white/10 transition-transform duration-500
                       hover:scale-[1.02] hover:shadow-cyan-400/40"
          />
        </div>

        {/* ---------- Stats Grid (staggered glow) ---------- */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {stats.map((s, i) => (
            <StatCard
              key={i}
              {...s}
              started={started}
              delay={i * 400} // 0ms, 400ms, 800ms — staggered glow
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FrontBrand;