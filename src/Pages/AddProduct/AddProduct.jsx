import React, { useState } from "react";
import Swal from "sweetalert2";

import API_URL from "../../config/api";

const brands = [
  { name: "BMW", label: "BMW", color: "from-blue-600 to-sky-400" },
  {
    name: "MERCEDES-BENZ",
    label: "Mercedes-Benz",
    color: "from-slate-600 to-slate-400",
  },
  { name: "TESLA", label: "Tesla", color: "from-red-600 to-rose-400" },
  { name: "TOYOTA", label: "Toyota", color: "from-red-500 to-orange-400" },
  { name: "FORD", label: "Ford", color: "from-blue-700 to-indigo-400" },
  { name: "HONDA", label: "Honda", color: "from-red-700 to-pink-400" },
];

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");

  const handleAddProduct = async (event) => {
    event.preventDefault();

    const form = event.target;

    const newCar = {
      name: form.name.value.trim(),
      type: form.type.value.trim(),
      rating: form.rating.value,
      price: form.price.value.trim(),
      brandName: form.brandName.value.toUpperCase(),
      shortDescription: form.shortDescription.value.trim(),
      image: form.image.value.trim(),
    };

    if (Number(newCar.rating) < 0 || Number(newCar.rating) > 5) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Rating",
        text: "Rating must be between 0 and 5.",
        confirmButtonColor: "#c59d5f",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/car`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCar),
      });

      const data = await response.json();

      if (!response.ok || !data.insertedId) {
        throw new Error(data.message || "Unable to add vehicle.");
      }

      await Swal.fire({
        icon: "success",
        title: "Vehicle Added Successfully!",
        text: `${newCar.name} has been added to your collection.`,
        confirmButtonText: "Excellent!",
        confirmButtonColor: "#b58a4b",
        background: "#ffffff",
        color: "#172033",
      });

      form.reset();
      setImageUrl("");
      setImageError(false);
      setSelectedBrand("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong!",
        text: error.message || "Please check your server connection.",
        confirmButtonColor: "#b91c1c",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3.5 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#b58a4b] focus:bg-white focus:ring-4 focus:ring-[#b58a4b]/10";

  const labelClass =
    "mb-2 block text-sm font-semibold tracking-wide text-slate-700";

  return (
    <main className="min-h-screen bg-[#f4f5f7] text-slate-800">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-[#101827]">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-[#b58a4b]/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"></div>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-2 lg:px-12">
          <div className="z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c59d5f]/30 bg-[#c59d5f]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#e5c58e]">
              <span className="h-2 w-2 rounded-full bg-[#c59d5f]"></span>
              Premium Vehicle Management
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Add Your
              <span className="block text-[#c59d5f]">Dream Machine.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Expand your automotive collection with exceptional vehicles. Add
              detailed specifications, select a brand and showcase every machine
              with its finest image.
            </p>

            <div className="mt-9 flex flex-wrap gap-8">
              <div>
                <p className="text-2xl font-bold text-white">06</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  Premium Brands
                </p>
              </div>

              <div className="h-12 w-px bg-white/15"></div>

              <div>
                <p className="text-2xl font-bold text-white">01</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  Simple Process
                </p>
              </div>

              <div className="h-12 w-px bg-white/15"></div>

              <div>
                <p className="text-2xl font-bold text-[#c59d5f]">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  Your Collection
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-5 rounded-3xl bg-[#c59d5f]/20 blur-2xl"></div>

            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <img
                src="https://i.ibb.co.com/Dfp87WgS/Add-Y.jpg"
                alt="Premium luxury automobile"
                className="h-[260px] w-full rounded-2xl object-cover sm:h-[340px] lg:h-[390px]"
              />

              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/20 bg-black/50 p-4 backdrop-blur-md">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#e5c58e]">
                    Abrars Automobile
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-white">
                    Excellence in Motion
                  </h3>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c59d5f]/50 text-xl text-[#e5c58e]">
                  ↗
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mb-9 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#b58a4b]">
            Vehicle Registration
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#172033] sm:text-4xl">
            Add a New Vehicle
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Complete the information below to add a new automobile to your
            exclusive collection.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-[#c59d5f]"></div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px]">
            {/* Main Form */}
            <div className="p-5 sm:p-8 lg:p-10">
              <form onSubmit={handleAddProduct}>
                {/* Section 01 */}
                <div className="mb-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#172033] text-sm font-bold text-[#e5c58e]">
                      01
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Vehicle Identity
                      </h3>
                      <p className="text-xs text-slate-400">
                        Basic information about the automobile
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Vehicle Name *</label>

                      <input
                        type="text"
                        name="name"
                        placeholder="e.g. BMW X7 M60i"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Vehicle Brand *</label>

                      <select
                        name="brandName"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className={inputClass}
                        required
                      >
                        <option value="">Select a Brand</option>

                        {brands.map((brand) => (
                          <option key={brand.name} value={brand.name}>
                            {brand.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Vehicle Type *</label>

                      <input
                        type="text"
                        name="type"
                        placeholder="e.g. SUV, Sedan, Coupe"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Customer Rating *</label>

                      <div className="relative">
                        <input
                          type="number"
                          name="rating"
                          min="0"
                          max="5"
                          step="0.1"
                          placeholder="e.g. 4.8"
                          className={`${inputClass} pr-16`}
                          required
                        />

                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-amber-500">
                          ★ / 5
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8 border-t border-slate-100"></div>

                {/* Section 02 */}
                <div className="mb-8">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#172033] text-sm font-bold text-[#e5c58e]">
                      02
                    </span>

                    <div>
                      <h3 className="font-bold text-slate-800">
                        Vehicle Details
                      </h3>
                      <p className="text-xs text-slate-400">
                        Pricing and product description
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Vehicle Price *</label>

                      <input
                        type="text"
                        name="price"
                        placeholder="e.g. $85,000"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Vehicle Image URL (Optional)
                      </label>

                      <input
                        type="text"
                        name="image"
                        value={imageUrl}
                        onChange={(e) => {
                          setImageUrl(e.target.value);
                          setImageError(false);
                        }}
                        placeholder="Enter image URL (Optional)"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className={labelClass}>Short Description *</label>

                    <textarea
                      name="shortDescription"
                      placeholder="Describe the vehicle's design, performance, features and driving experience..."
                      className={`${inputClass} min-h-[130px] resize-y`}
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="mb-8 border-t border-slate-100"></div>

                {/* Submit */}
                <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-slate-400">
                    * Required fields must be completed.
                    <br />
                    Vehicle Image URL is optional. You can leave it empty.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#172033] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-[#b58a4b] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                        Adding Vehicle...
                      </>
                    ) : (
                      <>
                        Add Vehicle to Collection
                        <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Live Preview Sidebar */}
            <aside className="border-t border-slate-200 bg-[#f8f9fb] p-5 sm:p-8 lg:border-l lg:border-t-0">
              <div className="sticky top-8">
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58a4b]">
                    Live Preview
                  </p>

                  <h3 className="mt-2 text-xl font-black text-[#172033]">
                    Vehicle Showcase
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Vehicle image is optional. Add an image URL or continue
                    without one.
                  </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100">
                    {imageUrl && !imageError ? (
                      <img
                        src={imageUrl}
                        alt="Vehicle preview"
                        onError={() => setImageError(true)}
                        className="h-full w-full object-contain p-3"
                      />
                    ) : (
                      <div className="px-5 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm">
                          🚘
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-500">
                          {imageError
                            ? "Unable to load image"
                            : "Image Preview"}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {imageError
                            ? "Please check your image URL"
                            : "Add an image URL or continue without one"}
                        </p>
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-[#172033] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Preview
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b58a4b]">
                      {selectedBrand || "SELECTED BRAND"}
                    </p>

                    <h4 className="mt-2 text-lg font-black text-[#172033]">
                      Your Vehicle Name
                    </h4>

                    <p className="mt-2 text-sm text-slate-400">
                      Your vehicle details will be added to the collection.
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        Abrars Automobile
                      </span>

                      <span className="text-sm font-bold text-[#b58a4b]">
                        ★ Premium
                      </span>
                    </div>
                  </div>
                </div>

                {/* Brand List */}
                <div className="mt-7">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                    Available Brands
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <span
                        key={brand.name}
                        className={`rounded-lg border px-3 py-2 text-[10px] font-bold tracking-wide transition ${
                          selectedBrand === brand.name
                            ? "border-[#b58a4b] bg-[#b58a4b]/10 text-[#946c35]"
                            : "border-slate-200 bg-white text-slate-500"
                        }`}
                      >
                        {brand.label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-7 rounded-2xl bg-[#172033] p-5 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#e5c58e]">
                    Pro Tip
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Use a high-resolution vehicle image with a clean background
                    for a more professional product presentation.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Bottom Signature */}
        <div className="mt-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            ABRARS AUTOMOBILE
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Driven by Excellence. Defined by Innovation.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AddProduct;
