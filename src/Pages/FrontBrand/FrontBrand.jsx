import { useEffect, useRef, useState } from "react";

/* =========================================================
   1. Animated Counter Hook
========================================================= */

const useCountUp = (target, duration = 1800, start = false) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame;
    let startTime;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(target * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return value;
};

/* =========================================================
   2. Premium Stat Card
========================================================= */

const StatCard = ({
  icon,
  value,
  label,
  prefix = "",
  suffix = "",
  started,
  decimals = 0,
}) => {
  const animated = useCountUp(value, 2000, started);

  const formatted = animated.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-amber-400/10">
      {/* Background Glow */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl transition-all duration-500 group-hover:bg-amber-400/20" />

      {/* Top Accent */}
      <div className="absolute left-0 top-0 h-[2px] w-0 bg-gradient-to-r from-amber-400 to-transparent transition-all duration-700 group-hover:w-full" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-400 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
          {icon}
        </div>

        {/* Number */}
        <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {prefix}
          {formatted}
          {suffix}
        </h3>

        {/* Label */}
        <p className="mt-3 text-sm font-medium tracking-wide text-slate-400">
          {label}
        </p>

        {/* Bottom Line */}
        <div className="mt-6 h-[2px] w-10 rounded-full bg-amber-400 transition-all duration-500 group-hover:w-20" />
      </div>
    </div>
  );
};

/* =========================================================
   3. Main FrontBrand Component
========================================================= */

const FrontBrand = () => {
  const [started, setStarted] = useState(false);
  const sectionRef = useRef(null);

  /* Scroll Animation */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  /* Statistics */
  const stats = [
    {
      value: 8000,
      label: "Our Employees",
      suffix: "+",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M17 20h5v-2a4 4 0 00-5.5-3.7M9 20H2v-2a4 4 0 017-2.6M15 20v-2a6 6 0 00-12 0v2m12-11a4 4 0 11-8 0 4 4 0 018 0zm5 1a3 3 0 10-6 0"
          />
        </svg>
      ),
    },
    {
      value: 2.6,
      label: "Yearly Income",
      prefix: "$",
      suffix: "M",
      decimals: 1,
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M12 8c-2.2 0-4 1-4 2.5S9.8 13 12 13s4 1 4 2.5S14.2 18 12 18m0-10V6m0 2v10m0 0v2m8-8a8 8 0 11-16 0 8 8 0 0116 0z"
          />
        </svg>
      ),
    },
    {
      value: 96,
      label: "Sales Statistics",
      suffix: "%",
      icon: (
        <svg
          className="h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.7"
            d="M3 3v18h18M8 16V9m5 7V5m5 11v-4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-[#05070c] px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      {/* =====================================================
          Background Effects
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-amber-500/[0.08] blur-[130px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-500/[0.07] blur-[130px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:30px_30px] opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* =====================================================
            Section Heading
        ===================================================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            The Automotive Experience
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Beyond the Ordinary.
            <span className="mt-2 block text-amber-400">
              Driven by Excellence.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Experience a world of automotive excellence where innovation,
            engineering, luxury and performance come together.
          </p>

          <div className="mx-auto mt-8 h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>

        {/* =====================================================
            Dashboard Preview Image
        ===================================================== */}

        <div className="group relative mx-auto max-w-5xl">
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-400/20 via-white/5 to-amber-400/20 opacity-50 blur-xl transition-opacity duration-700 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
            <img
              src="https://i.ibb.co/5K5QKXG/Screenshot-2023-10-24-020055.png"
              alt="Automotive website dashboard preview"
              loading="lazy"
              className="block w-full object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

            <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/50 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md sm:bottom-6 sm:left-6">
              Premium Digital Experience
            </div>
          </div>
        </div>

        {/* =====================================================
            Promotional Banner
        ===================================================== */}

        <div className="group relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
          <img
            src="https://i.ibb.co.com/s9xym34S/Showcase.png"
            alt="Premium automotive promotional banner"
            loading="lazy"
            className="block w-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
        </div>

        {/* =====================================================
            Statistics Heading
        ===================================================== */}

        <div className="mb-8 mt-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            Our Performance
          </p>

          <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
            Numbers That Tell Our Story
          </h3>
        </div>

        {/* =====================================================
            Statistics Cards
        ===================================================== */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} {...stat} started={started} />
          ))}
        </div>

        {/* =====================================================
            Bottom Message
        ===================================================== */}

        <div className="mt-16 border-t border-white/10 pt-8 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
            Designed for Passion. Built for Performance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FrontBrand;
