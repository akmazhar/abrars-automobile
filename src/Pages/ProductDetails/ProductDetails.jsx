import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import API_URL from "../../config/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fetch Product Details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setImageError(false);

        const response = await fetch(`${API_URL}/product/${id}`);

        if (!response.ok) {
          throw new Error("Unable to fetch product details.");
        }

        const productData = await response.json();
        setData(productData);
      } catch (error) {
        console.error("Product Details Error:", error);

        Swal.fire({
          title: "Unable to Load",
          text: error.message || "Failed to load product details.",
          icon: "error",
          confirmButtonColor: "#c99a45",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // Add to Cart
  const addToCartHandle = async () => {
    if (!data?._id || addingToCart) return;

    const oneCart = {
      image: data.image,
      name: data.name,
      brandName: data.brandName || data.brand_name,
      price: data.price,
      type: data.type,
    };

    try {
      setAddingToCart(true);

      const response = await fetch(`${API_URL}/brandCarts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oneCart),
      });

      const result = await response.json();

      if (!response.ok || !result.insertedId) {
        throw new Error(
          result.message || "Unable to add this car to your cart.",
        );
      }

      await Swal.fire({
        title: "Added to Your Collection!",
        text: "Your selected automobile has been added to your cart.",
        icon: "success",
        confirmButtonText: "Wonderful",
        confirmButtonColor: "#c99a45",
        background: "#111827",
        color: "#ffffff",
      });
    } catch (error) {
      console.error("Add to Cart Error:", error);

      Swal.fire({
        title: "Something Went Wrong",
        text: error.message || "Unable to add this car to your cart.",
        icon: "error",
        confirmButtonColor: "#c99a45",
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const brand = data.brandName || data.brand_name || "Premium Brand";

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d16]">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-amber-400/20 border-t-amber-400" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            Preparing Your Experience
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Loading automobile details...
          </p>
        </div>
      </div>
    );
  }

  // Product Not Found
  if (!data?._id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080d16] px-6">
        <div className="max-w-md rounded-3xl border border-white/10 bg-[#111827] p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-3xl text-red-400">
            !
          </div>

          <h2 className="mt-6 text-2xl font-black text-white">
            Product Not Found
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Sorry, the requested vehicle could not be found. It may have been
            removed or is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080d16] px-4 py-12 text-white sm:px-6 lg:px-10 lg:py-20">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-amber-400 sm:text-xs">
              Abrars Automobile / Collection
            </p>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-4xl">
              Discover Excellence<span className="text-amber-400">.</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-lg">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              Premium Selection
            </span>
          </div>
        </div>

        {/* Main Product Card */}
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#151e2d] via-[#101827] to-[#0b111c] shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-2">
            {/* Image Presentation */}
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#1c2738] via-[#111a29] to-[#080d16] p-6 sm:min-h-[460px] sm:p-10 lg:min-h-[600px]">
              {/* Image Glow */}
              <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-amber-400/10 blur-[100px]" />

              {/* Image Frame */}
              <div className="relative z-10 flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-3 sm:min-h-[400px] sm:p-6">
                {!imageError && data.image ? (
                  <img
                    src={data.image}
                    alt={data.name || "Automobile"}
                    onError={() => setImageError(true)}
                    className="max-h-[480px] w-full object-contain transition-transform duration-1000 hover:scale-105"
                  />
                ) : (
                  <div className="text-center text-slate-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mx-auto h-24 w-24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13l2-5h14l2 5M5 13v5m14-5v5M3 13h18"
                      />
                    </svg>
                    <p className="mt-4 text-sm">Vehicle image unavailable</p>
                  </div>
                )}
              </div>

              {/* Image Corner Label */}
              <div className="absolute bottom-6 left-6 z-20 sm:bottom-10 sm:left-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400">
                  The Art of Driving
                </p>
              </div>

              {/* Image Number */}
              <div className="absolute right-7 top-7 z-20 text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Collection
                </p>
                <p className="mt-1 text-lg font-black text-white">01</p>
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
              {/* Brand & Category */}
              <div className="mb-7 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-[0.2em] text-amber-400">
                  {brand}
                </span>

                {data.type && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">
                    {data.type}
                  </span>
                )}
              </div>

              {/* Product Name */}
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Introducing
                </p>

                <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {data.name}
                  <span className="text-amber-400">.</span>
                </h2>
              </div>

              {/* Description */}
              <p className="mt-6 max-w-xl text-sm leading-8 text-slate-400 sm:text-base">
                {data.shortDescription ||
                  "Experience refined engineering, exceptional comfort and outstanding automotive performance."}
              </p>

              {/* Rating */}
              <div className="mt-7 flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
                  <span className="text-xl text-amber-400">★</span>
                  <span className="text-lg font-black text-white">
                    {data.rating ?? "N/A"}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Customer Rating
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    Product rating information
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-9 h-px bg-gradient-to-r from-amber-400/40 via-white/10 to-transparent" />

              {/* Pricing */}
              <div className="mb-9">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
                  Exclusive Price
                </p>

                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-4xl font-black tracking-tight text-amber-400 sm:text-5xl">
                    {data.price ?? "On Request"}
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Contact us for availability and further information.
                </p>
              </div>

              {/* Premium Add to Cart Button */}
              <button
                type="button"
                onClick={addToCartHandle}
                disabled={addingToCart}
                className="group/cart relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-amber-300/40 bg-gradient-to-r from-[#b77b27] via-[#f4ce78] to-[#c9943d] px-5 py-5 text-left text-[#111827] shadow-[0_10px_35px_rgba(217,166,75,0.16)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-[0_15px_45px_rgba(217,166,75,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:px-7"
              >
                {/* Shine Animation */}
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover/cart:translate-x-full" />

                <span className="relative flex items-center gap-4">
                  {/* Cart Icon */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-black/10">
                    {addingToCart ? (
                      <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-black/20 border-t-black" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l2.2 11.2a2 2 0 002 1.6h8.9a2 2 0 002-1.6L22 7H6"
                        />
                        <circle cx="10" cy="20" r="1" />
                        <circle cx="18" cy="20" r="1" />
                      </svg>
                    )}
                  </span>

                  {/* Button Text */}
                  <span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
                      {addingToCart ? "Please Wait" : "Make It Yours"}
                    </span>

                    <span className="mt-1 block text-base font-black tracking-wide sm:text-lg">
                      {addingToCart ? "Adding to Collection..." : "Add to Cart"}
                    </span>
                  </span>
                </span>

                {/* Arrow */}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-black/10 transition-all duration-300 group-hover/cart:translate-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-6-6 6 6-6 6"
                    />
                  </svg>
                </span>
              </button>

              {/* Trust Note */}
              <div className="mt-6 flex items-center justify-center gap-2 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5-3a2 2 0 00-1-1.73l-6-3.27a2 2 0 00-2 0L5 5.27A2 2 0 004 7v5c0 5 4 8 8 10 4-2 8-5 8-10V7z"
                  />
                </svg>

                <span className="text-[10px] font-medium tracking-wide text-slate-500">
                  Premium Automotive Experience
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Brand Statement */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            ABRARS AUTOMOBILE
          </p>

          <p className="text-xs text-slate-600">Excellence in Every Drive.</p>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
