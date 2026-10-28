
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Banner from "./../../Component/Banner/Banner";
import Mar from "./Mar";
import FrontBrand from "../FrontBrand/FrontBrand";

const Home = () => {
  const [brandCard, setBrandCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentTime, setCurrentTime] = useState(() => new Date());

  // Automatically fetch brand data from the JSON file
  useEffect(() => {
    const controller = new AbortController();

    const loadBrands = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/apidata.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load brand information.");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The brand data format is invalid.");
        }

        setBrandCard(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "We couldn't load the brands. Please refresh the page and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadBrands();

    return () => controller.abort();
  }, []);

  // Live date and time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(currentTime);

  const formattedTime = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(currentTime);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Main banner */}
      <Banner />

      {/* Premium automotive introduction */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl lg:grid-cols-2">
          <div className="relative min-h-[280px] overflow-hidden sm:min-h-[400px]">
            <img
              src="https://i.ibb.co.com/yc2C2kNn/ALLBRAND.png"
              alt="Premium automotive experience"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-md sm:bottom-8 sm:left-8">
              Discover the difference
            </span>
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-amber-400 sm:text-sm">
              Designed for the extraordinary
            </p>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl xl:text-6xl">
              Experience Luxury Behind{" "}
              <span className="mt-2 block text-amber-400">
                The Wheels.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
              Explore exceptional automotive brands, discover distinctive
              designs, and find the vehicle that matches your lifestyle.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#featured-brands"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
              >
                Explore Brands <span className="ml-2">→</span>
              </a>

              <a
                href="#showcase"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-amber-400 hover:text-amber-400"
              >
                Discover More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Live date and time */}
      <section
        aria-label="Current date and time"
        className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your time, your journey
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {formattedDate}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="font-mono text-2xl font-bold tracking-wider text-amber-400 sm:text-3xl">
              {formattedTime}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Local device time
            </p>
          </div>
        </div>
      </section>

      {/* Featured brands */}
      <section
        id="featured-brands"
        className="scroll-mt-20 bg-slate-900/70 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
                Curated for you
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Explore Our Brands
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                Discover renowned names and explore the vehicles that define
                performance, comfort, and style.
              </p>
            </div>

            <span className="w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
              {loading
                ? "Loading brands..."
                : `${brandCard.length} ${
                    brandCard.length === 1 ? "Brand" : "Brands"
                  }`}
            </span>
          </div>

          {loading && (
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading brands"
              aria-busy="true"
            >
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-slate-800"
                >
                  <div className="h-56 bg-slate-700" />
                  <div className="space-y-3 p-5">
                    <div className="h-5 w-2/3 rounded bg-slate-700" />
                    <div className="h-4 w-1/2 rounded bg-slate-700" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && error && (
            <div
              role="alert"
              className="rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
            >
              <p className="text-red-300">{error}</p>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && brandCard.length === 0 && (
            <p className="rounded-2xl border border-white/10 p-8 text-center text-slate-300">
              No brands are available at the moment.
            </p>
          )}

          {!loading && !error && brandCard.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {brandCard.map((brand) => (
                <Link
                  key={brand.id ?? brand.brand_name}
                  to={`/${brand.brand_name}`}
                  aria-label={`Explore ${brand.brand_name}`}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950 transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    <img
                      src={brand.image}
                      alt={brand.brand_name || "Automotive brand"}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-xl font-bold text-slate-950 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-white transition-colors group-hover:text-amber-400">
                      {brand.brand_name}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Discover the collection
                    </p>

                    <span className="mt-5 inline-block border-b border-amber-400/50 pb-1 text-sm font-semibold text-amber-400">
                      Explore Brand
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video showcase */}
      <section
        id="showcase"
        className="mx-auto max-w-7xl scroll-mt-20 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            Beyond the ordinary
          </p>

          <h2 className="mt-3 text-3xl font-black sm:text-4xl">
            The Art of Driving
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Step into a world where exceptional design meets the thrill of
            the open road.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Automotive video showcase"
            className="aspect-video max-h-[650px] w-full object-cover"
          >
            <source src="/y.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Existing components */}
      <section className="border-t border-white/10">
        <Mar />
      </section>

      <section>
        <FrontBrand />
      </section>
    </main>
  );
};

export default Home;
