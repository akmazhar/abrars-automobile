import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Mar = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadBrands = async () => {
      try {
        const response = await fetch("/cars/brands.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load brands");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid brand data");
        }

        setBrands(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Brand loading error:", error);
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

  if (loading) {
    return (
      <section className="bg-slate-950 py-16 text-center text-slate-400">
        Loading brands...
      </section>
    );
  }

  if (!brands.length) return null;

  return (
    <section className="overflow-hidden border-y border-white/10 bg-slate-950 py-14 sm:py-16">
      {/* Section Heading */}
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-amber-400">
          Our Automotive Partners
        </p>

        <h2 className="text-3xl font-black text-white sm:text-4xl">
          Explore <span className="text-amber-400">Our Brands</span>
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
          Discover world-renowned automotive brands and their exceptional
          collections.
        </p>
      </div>

      {/* Brand Marquee */}
      <Marquee
        speed={45}
        pauseOnHover={true}
        gradient={true}
        gradientColor="#020617"
        gradientWidth={80}
      >
        {brands.map((brand, index) => {
          const image =
            brand.smallImages?.[0] || brand.image || brand.bannerImages?.[0];

          return (
            <a
              key={brand.id ?? brand.brand_name ?? index}
              href={brand.path || "#"}
              className="group mx-5 flex h-44 w-52 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white px-6 py-5 transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-400/10 sm:mx-8 sm:h-48 sm:w-60"
            >
              {image ? (
                <img
                  src={image}
                  alt={brand.brand_name}
                  loading="lazy"
                  className="h-24 w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <span className="text-lg font-bold text-slate-800">
                  {brand.brand_name}
                </span>
              )}

              <span className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-800 transition-colors group-hover:text-amber-600">
                {brand.brand_name}
              </span>
            </a>
          );
        })}
      </Marquee>
    </section>
  );
};

export default Mar;
