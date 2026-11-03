import { useLoaderData } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import { useEffect, useState } from "react";

const Honda = () => {
  const targetData = useLoaderData();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    if (Array.isArray(targetData)) {
      const hondaCars = targetData
        .filter(
          (car) =>
            (car?.brand_name || car?.brandName)?.trim().toUpperCase() ===
            "HONDA",
        )
        .slice(0, 4);

      setCars(hondaCars);
    } else {
      console.error("Honda Data is not an array:", targetData);
      setCars([]);
    }
  }, [targetData]);

  const handleDeleteCar = (id) => {
    setCars((previousCars) => previousCars.filter((car) => car._id !== id));
  };

  const slides = [
    {
      id: "honda-slide1",
      image: "/cars/honda-banner-1.png",
      prev: "#honda-slide3",
      next: "#honda-slide2",
      label: "01 / 03",
    },
    {
      id: "honda-slide2",
      image: "/cars/honda-banner-2.png",
      prev: "#honda-slide1",
      next: "#honda-slide3",
      label: "02 / 03",
    },
    {
      id: "honda-slide3",
      image: "/cars/honda-banner-3.png",
      prev: "#honda-slide2",
      next: "#honda-slide1",
      label: "03 / 03",
    },
  ];

  const highlights = [
    "/cars/honda-small-1.png",
    "/cars/honda-small-2.png",
    "/cars/honda-small-3.png",
    "/cars/honda-small-4.png",
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#080B12] text-white">
      {/* PREMIUM HERO SECTION */}

      <section className="relative border-b border-white/10 bg-gradient-to-br from-[#171827] via-[#0D101B] to-black">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1.2fr_0.8fr] lg:gap-10">
            {/* HONDA BANNER CAROUSEL */}

            <div className="relative w-full min-w-0">
              <div className="carousel aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#101722] shadow-2xl md:rounded-3xl">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    id={slide.id}
                    className="carousel-item relative h-full w-full flex-none"
                  >
                    <img
                      src={slide.image}
                      alt={`Honda Premium Collection ${slide.label}`}
                      className="h-full w-full object-contain p-1 sm:p-2"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-5 text-xs font-semibold tracking-[0.25em] text-white/80">
                      {slide.label}
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-5">
                      <a
                        href={slide.prev}
                        aria-label="Previous slide"
                        className="btn btn-circle btn-sm pointer-events-auto border border-white/20 bg-black/50 text-white hover:border-red-600 hover:bg-red-600 sm:btn-md"
                      >
                        ❮
                      </a>

                      <a
                        href={slide.next}
                        aria-label="Next slide"
                        className="btn btn-circle btn-sm pointer-events-auto border border-white/20 bg-black/50 text-white hover:border-red-600 hover:bg-red-600 sm:btn-md"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute -bottom-2 left-10 right-10 h-1 rounded-full bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 blur-sm" />
            </div>

            {/* HERO CONTENT */}

            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-500/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-300 sm:text-sm">
                  The Power of Dreams
                </span>
              </div>

              <div>
                <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-slate-400">
                  Technology Meets Passion
                </p>

                <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                  HONDA
                  <span className="mt-2 block bg-gradient-to-r from-red-400 via-rose-300 to-white bg-clip-text text-transparent">
                    Collection
                  </span>
                </h1>
              </div>

              <p className="mx-auto max-w-lg text-sm leading-8 text-slate-400 sm:text-base lg:mx-0 lg:text-lg">
                Experience Japanese engineering, innovative technology and
                exceptional reliability. Explore our exclusive selection of
                Honda vehicles.
              </p>

              <div className="flex flex-wrap justify-center gap-3 pt-2 md:justify-start">
                <a
                  href="#honda-collection"
                  className="rounded-xl bg-red-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
                >
                  Explore Collection <span className="ml-2">→</span>
                </a>

                <a
                  href="#honda-highlights"
                  className="rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-red-400 hover:bg-white/5"
                >
                  View Highlights
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">HONDA</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Japanese Engineering
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">Innovation</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Smart Technology
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">Reliability</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-slate-500 sm:text-xs">
                    Trusted Quality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HONDA VEHICLE COLLECTION */}

      <section
        id="honda-collection"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8"
      >
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
              Discover Your Drive
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Honda <span className="text-red-400">Selection</span>
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              A collection of innovation, comfort and reliability.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            <span className="text-xl font-bold text-white">
              {cars.length.toString().padStart(2, "0")}
            </span>
            <span className="ml-2">Vehicles Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {cars.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-[#101722] px-5 py-16 text-center sm:col-span-2">
              <div className="mb-5 text-5xl">🚘</div>
              <h3 className="text-xl font-bold text-white">
                No Honda Vehicles Available
              </h3>
              <p className="mt-3 text-sm text-slate-500">
                Our Honda collection is currently being updated. Please check
                back soon.
              </p>
            </div>
          ) : (
            cars.map((car) => (
              <CarCard key={car._id} car={car} onDelete={handleDeleteCar} />
            ))
          )}
        </div>
      </section>

      {/* HONDA HIGHLIGHTS GALLERY */}

      <section
        id="honda-highlights"
        className="border-t border-white/10 bg-gradient-to-b from-[#0D1420] to-[#080B12] py-14 md:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-red-400">
                Design. Technology. Reliability.
              </p>
              <h2 className="text-2xl font-bold sm:text-3xl">
                Honda <span className="text-red-400">Highlights</span>
              </h2>
            </div>

            <p className="text-xs text-slate-500 sm:text-sm">
              A closer look at automotive excellence.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {highlights.map((image, index) => (
              <div
                key={image}
                className="group relative aspect-[4/3] min-w-0 overflow-hidden rounded-lg border border-white/10 bg-[#111827] sm:rounded-2xl"
              >
                <img
                  src={image}
                  alt={`Honda Highlight ${index + 1}`}
                  loading="lazy"
                  className="h-full w-full object-contain p-1 transition-transform duration-500 group-hover:scale-110 sm:p-2"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-1.5 left-1.5 sm:bottom-4 sm:left-4">
                  <span className="text-[8px] font-semibold tracking-wider text-white sm:text-xs">
                    HONDA
                  </span>
                  <p className="mt-0.5 text-[8px] text-red-300 sm:text-[10px]">
                    0{index + 1} / 04
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SIGNATURE */}

      <footer className="border-t border-white/10 px-4 py-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 sm:text-xs">
          HONDA · The Power of Dreams
        </p>
      </footer>
    </main>
  );
};

export default Honda;
