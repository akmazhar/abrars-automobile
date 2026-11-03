import { useLoaderData } from "react-router-dom";
import CarCard from "../CarCard/CarCard";
import { useEffect, useState } from "react";

const Bmw = () => {
  const targetData = useLoaderData();
  const [cars, setCars] = useState([]);

  // Filter BMW vehicles
  useEffect(() => {
    if (Array.isArray(targetData)) {
      const bmwCars = targetData
        .filter(
          (car) =>
            (car?.brand_name || car?.brandName)?.trim().toUpperCase() === "BMW",
        )
        .slice(0, 4);

      setCars(bmwCars);
    } else {
      console.error("BMW Data is not an array:", targetData);
      setCars([]);
    }
  }, [targetData]);

  // Remove deleted vehicle from UI
  const handleDeleteCar = (id) => {
    setCars((previousCars) => previousCars.filter((car) => car._id !== id));
  };

  // BMW Banner Slides
  const slides = [
    {
      id: "slide1",
      image: "/cars/bmw-banner-1.png",
      prev: "#slide3",
      next: "#slide2",
      label: "01 / 03",
    },
    {
      id: "slide2",
      image: "/cars/bmw-banner-2.png",
      prev: "#slide1",
      next: "#slide3",
      label: "02 / 03",
    },
    {
      id: "slide3",
      image: "/cars/bmw-banner-3.png",
      prev: "#slide2",
      next: "#slide1",
      label: "03 / 03",
    },
  ];

  // BMW Small Gallery Images
  const highlights = [
    "/cars/bmw-small-1.png",
    "/cars/bmw-small-2.png",
    "/cars/bmw-small-3.png",
    "/cars/bmw-small-4.png",
  ];

  return (
    <main className="min-h-screen bg-[#080B12] text-white overflow-hidden">
      {/* ================= PREMIUM HERO SECTION ================= */}

      <section className="relative border-b border-white/10 bg-gradient-to-br from-[#101827] via-[#090D16] to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          {/* Wider Image Carousel - 60% / 40% Layout */}

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-center">
            {/* LEFT: BMW BANNER CAROUSEL */}

            <div className="relative w-full min-w-0">
              <div className="carousel w-full aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden bg-[#101722] border border-white/10 shadow-2xl">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    id={slide.id}
                    className="carousel-item relative w-full h-full flex-none"
                  >
                    <img
                      src={slide.image}
                      alt={`BMW Premium Collection ${slide.label}`}
                      className="w-full h-full object-contain p-1 sm:p-2"
                    />

                    {/* Image Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

                    {/* Slide Number */}

                    <div className="absolute bottom-4 left-5 text-white/80 text-xs tracking-[0.25em] font-semibold">
                      {slide.label}
                    </div>

                    {/* Carousel Navigation */}

                    <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 sm:px-5 pointer-events-none">
                      <a
                        href={slide.prev}
                        aria-label="Previous slide"
                        className="btn btn-circle btn-sm sm:btn-md bg-black/50 border border-white/20 text-white hover:bg-blue-600 hover:border-blue-600 pointer-events-auto"
                      >
                        ❮
                      </a>

                      <a
                        href={slide.next}
                        aria-label="Next slide"
                        className="btn btn-circle btn-sm sm:btn-md bg-black/50 border border-white/20 text-white hover:bg-blue-600 hover:border-blue-600 pointer-events-auto"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Line */}

              <div className="absolute -bottom-2 left-10 right-10 h-1 rounded-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 blur-sm"></div>
            </div>

            {/* RIGHT: HERO CONTENT */}

            <div className="text-center md:text-left space-y-6">
              <div className="inline-flex items-center gap-2 border border-blue-400/30 bg-blue-500/10 rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>

                <span className="text-blue-300 text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase">
                  Sheer Driving Pleasure
                </span>
              </div>

              <div>
                <p className="text-slate-400 text-sm font-medium tracking-[0.35em] uppercase mb-3">
                  The Ultimate Driving Machine
                </p>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.08]">
                  BMW
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-white mt-2">
                    Collection
                  </span>
                </h1>
              </div>

              <p className="text-slate-400 text-sm sm:text-base lg:text-lg leading-8 max-w-lg mx-auto md:mx-0">
                Discover the perfect balance of performance, precision
                engineering and timeless luxury. Explore our exclusive selection
                of BMW vehicles.
              </p>

              {/* Action Buttons */}

              <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                <a
                  href="#bmw-collection"
                  className="px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-blue-600/20 hover:-translate-y-1"
                >
                  Explore Collection
                  <span className="ml-2">→</span>
                </a>

                <a
                  href="#bmw-highlights"
                  className="px-7 py-3.5 rounded-xl border border-white/20 hover:border-blue-400 hover:bg-white/5 text-white font-semibold text-sm transition-all duration-300"
                >
                  View Highlights
                </a>
              </div>

              {/* Brand Information */}

              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    BMW
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1">
                    German Engineering
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Luxury
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1">
                    Refined Comfort
                  </p>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    Power
                  </h3>

                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1">
                    Dynamic Performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= BMW VEHICLE COLLECTION ================= */}

      <section
        id="bmw-collection"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
      >
        {/* Section Heading */}

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Discover Your Drive
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Our BMW <span className="text-blue-400">Selection</span>
            </h2>

            <p className="text-slate-500 text-sm mt-3">
              A curated collection of performance and luxury.
            </p>
          </div>

          <div className="text-slate-400 text-sm">
            <span className="text-white font-bold text-xl">
              {cars.length.toString().padStart(2, "0")}
            </span>

            <span className="ml-2">Vehicles Available</span>
          </div>
        </div>

        {/* 2 x 2 Vehicle Grid */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {cars.length === 0 ? (
            <div className="sm:col-span-2 text-center py-16 px-5 rounded-3xl bg-[#101722] border border-white/10">
              <div className="text-5xl mb-5">🚘</div>

              <h3 className="text-xl font-bold text-white">
                No BMW Vehicles Available
              </h3>

              <p className="text-slate-500 text-sm mt-3">
                Our BMW collection is currently being updated. Please check back
                soon.
              </p>
            </div>
          ) : (
            cars.map((car) => (
              <CarCard key={car._id} car={car} onDelete={handleDeleteCar} />
            ))
          )}
        </div>
      </section>

      {/* ================= BMW HIGHLIGHTS GALLERY ================= */}

      <section
        id="bmw-highlights"
        className="bg-gradient-to-b from-[#0D1420] to-[#080B12] border-t border-white/10 py-14 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Heading */}

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-[0.3em] uppercase mb-2">
                Design. Performance. Innovation.
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold">
                BMW <span className="text-blue-400">Highlights</span>
              </h2>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm">
              A closer look at automotive excellence.
            </p>
          </div>

          {/* Four Images - Single Row */}

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {highlights.map((image, index) => (
              <div
                key={image}
                className="group relative min-w-0 aspect-[4/3] overflow-hidden rounded-lg sm:rounded-2xl border border-white/10 bg-[#111827]"
              >
                <img
                  src={image}
                  alt={`BMW Highlight ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-contain p-1 sm:p-2 transition-transform duration-500 group-hover:scale-110"
                />

                {/* Image Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none"></div>

                {/* Image Label */}

                <div className="absolute bottom-1.5 left-1.5 sm:bottom-4 sm:left-4">
                  <span className="text-white text-[8px] sm:text-xs font-semibold tracking-wider">
                    BMW
                  </span>

                  <p className="text-blue-300 text-[8px] sm:text-[10px] mt-0.5">
                    0{index + 1} / 04
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRAND SIGNATURE ================= */}

      <footer className="border-t border-white/10 py-6 px-4 text-center">
        <p className="text-slate-600 text-[10px] sm:text-xs tracking-[0.25em] uppercase">
          BMW · Sheer Driving Pleasure
        </p>
      </footer>
    </main>
  );
};

export default Bmw;
