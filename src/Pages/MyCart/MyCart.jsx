import React, { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Cart from "./Cart/Cart";

const MyCart = () => {
  const loadedData = useLoaderData();

  const [cartItems, setCartItems] = useState(
    Array.isArray(loadedData) ? loadedData : [],
  );

  // Keep cart synchronized with loader data
  useEffect(() => {
    setCartItems(Array.isArray(loadedData) ? loadedData : []);
  }, [loadedData]);

  // Calculate collection statistics
  const totalVehicles = cartItems.length;

  const uniqueBrands = new Set(
    cartItems
      .map((item) =>
        (item.brandName || item.brand_name || "").trim().toUpperCase(),
      )
      .filter(Boolean),
  ).size;

  const getBrandName = (item) => item.brandName || item.brand_name || "Other";

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-slate-800">
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#101827]">
        {/* Background Effects */}
        <div className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-[#c59d5f]/10 blur-3xl"></div>

        <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 md:py-20 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Hero Text */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c59d5f]/30 bg-[#c59d5f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c58e]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#c59d5f]"></span>
                Your Personal Collection
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Your Dream.
                <span className="block text-[#c59d5f]">Your Collection.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Every exceptional automobile tells a story. Explore your
                selected vehicles, discover their details and keep your
                favourite machines together in one exclusive collection.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/frontBrand"
                  className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#c59d5f] px-7 py-3.5 text-sm font-bold text-[#172033] shadow-lg shadow-[#c59d5f]/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#e5c58e]"
                >
                  Explore Vehicles
                  <span className="text-lg">→</span>
                </Link>

                <a
                  href="#my-collection"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#c59d5f] hover:text-[#e5c58e]"
                >
                  View Collection
                </a>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute inset-5 rounded-full bg-[#c59d5f]/20 blur-3xl"></div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
                <img
                  src="https://i.ibb.co.com/FbcZbDM1/y.jpg"
                  alt="Luxury automobile collection"
                  className="h-[250px] w-full rounded-2xl object-cover sm:h-[320px] lg:h-[350px]"
                />

                <div className="absolute bottom-7 left-7 right-7 rounded-2xl border border-white/20 bg-black/50 p-4 backdrop-blur-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e5c58e]">
                    ABRARS AUTOMOBILE
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-white">
                    Driven by Excellence.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COLLECTION STATISTICS ================= */}
      <section className="relative z-10 mx-auto -mt-7 max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total Vehicles */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Total Vehicles
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#172033]">
                  {totalVehicles.toString().padStart(2, "0")}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  In your collection
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#172033] text-2xl text-[#e5c58e]">
                🚘
              </div>
            </div>
          </div>

          {/* Unique Brands */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Selected Brands
                </p>

                <h2 className="mt-3 text-3xl font-black text-[#172033]">
                  {uniqueBrands.toString().padStart(2, "0")}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Different automobile brands
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c59d5f]/15 text-2xl text-[#a77c40]">
                ✦
              </div>
            </div>
          </div>

          {/* Collection Status */}
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Collection Status
                </p>

                <h2 className="mt-3 text-2xl font-black text-[#172033]">
                  {totalVehicles > 0 ? "Active" : "Empty"}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  {totalVehicles > 0
                    ? "Your collection is ready"
                    : "Start adding your favourites"}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                  totalVehicles > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                {totalVehicles > 0 ? "✓" : "＋"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MAIN COLLECTION ================= */}
      <section
        id="my-collection"
        className="mx-auto max-w-7xl scroll-mt-8 px-4 py-14 sm:px-8 lg:px-12 lg:py-20"
      >
        {/* Section Heading */}
        <div className="mb-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b58a4b]">
              Your Automotive Selection
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
              My Collection
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              Manage and explore your selected automobiles.
            </p>
          </div>

          {totalVehicles > 0 && (
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              {totalVehicles} {totalVehicles === 1 ? "Vehicle" : "Vehicles"}{" "}
              Saved
            </div>
          )}
        </div>

        {/* Vehicle Collection */}
        {totalVehicles > 0 ? (
          <div className="grid grid-cols-1 gap-7">
            {cartItems.map((item) => (
              <Cart
                key={item._id}
                item={item}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        ) : (
          /* Empty Cart Design */
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(15,23,42,0.05)]">
            <div className="relative px-5 py-16 text-center sm:px-10 sm:py-20">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#c59d5f]/10 blur-3xl"></div>

              <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#172033] text-5xl shadow-xl shadow-slate-900/10">
                🚘
              </div>

              <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#b58a4b]">
                Nothing Selected Yet
              </p>

              <h3 className="relative mt-3 text-2xl font-black text-[#172033] sm:text-3xl">
                Your Collection Awaits.
              </h3>

              <p className="relative mx-auto mt-4 max-w-md text-sm leading-7 text-slate-500">
                Your collection is currently empty. Explore our automobile
                brands and add your favourite vehicles to get started.
              </p>

              <Link
                to="/frontBrand"
                className="relative mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#172033] px-8 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#b58a4b]"
              >
                Discover Automobiles
                <span className="text-lg">→</span>
              </Link>
            </div>

            <div className="border-t border-slate-100 bg-[#f8f9fb] px-5 py-5 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                Abrars Automobile · Driven by Excellence
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ================= BOTTOM SIGNATURE ================= */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-7 text-center sm:flex-row sm:px-8 sm:text-left lg:px-12">
          <div>
            <p className="text-sm font-black tracking-[0.2em] text-[#172033]">
              ABRARS AUTOMOBILE
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Your passion. Your collection. Your journey.
            </p>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Abrars Automobile. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default MyCart;
