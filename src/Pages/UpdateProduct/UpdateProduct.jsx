import React, { useState } from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL =
  import.meta.env.VITE_API_URL || "https://abrars-automobile-server.vercel.app";

const UpdateProduct = () => {
  const car = useLoaderData();
  const navigate = useNavigate();

  const {
    _id,
    name = "",
    brandName = "",
    brand_name = "",
    rating = "",
    price = "",
    type = "",
    image = "",
  } = car || {};

  const [imagePreview, setImagePreview] = useState(image);
  const [loading, setLoading] = useState(false);
  const [ratingValue, setRatingValue] = useState(String(rating));

  const currentBrand = brandName || brand_name;

  const handleUpdateProduct = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    const updatedName = form.name.value.trim();
    const updatedBrand = form.brandName.value.trim();
    const updatedType = form.type.value.trim();
    const updatedRating = Number(form.rating.value);
    const updatedPrice = form.price.value.trim();
    const updatedImage = form.image.value.trim();

    if (
      !updatedName ||
      !updatedBrand ||
      !updatedType ||
      !updatedPrice ||
      !updatedImage
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please complete all required fields.",
        confirmButtonColor: "#b58a4b",
      });
      return;
    }

    if (
      !Number.isFinite(updatedRating) ||
      updatedRating < 0 ||
      updatedRating > 5
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Rating",
        text: "Rating must be between 0 and 5.",
        confirmButtonColor: "#b58a4b",
      });
      return;
    }

    const updatedCar = {
      name: updatedName,
      brandName: updatedBrand.toUpperCase(),
      rating: updatedRating,
      price: updatedPrice,
      type: updatedType,
      image: updatedImage,
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/product/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        await Swal.fire({
          icon: "success",
          title: "Vehicle Updated!",
          text: `${updatedName} has been successfully updated.`,
          confirmButtonText: "Excellent!",
          confirmButtonColor: "#b58a4b",
          background: "#ffffff",
          color: "#101827",
        });

        navigate(-1);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Detected",
          text: "The vehicle information remains unchanged.",
          confirmButtonColor: "#b58a4b",
        });
      }
    } catch (error) {
      console.error("Update Product Error:", error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message || "Unable to update vehicle. Please try again.",
        confirmButtonColor: "#b58a4b",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f5f7] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#b58a4b]">
              <span className="h-2 w-2 rounded-full bg-[#b58a4b]" />
              Vehicle Management
            </div>

            <h1 className="text-3xl font-extrabold text-[#101827] sm:text-4xl">
              Update Your Vehicle
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Refine the details and keep your automobile collection up to date.
            </p>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-[#101827] shadow-sm transition hover:border-[#b58a4b] hover:text-[#b58a4b]"
          >
            ← Back to Home
          </Link>
        </div>

        {/* MAIN CARD */}
        <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_20px_70px_rgba(16,24,39,0.09)] lg:grid-cols-[0.85fr_1.15fr]">
          {/* LEFT: IMAGE PREVIEW */}
          <section className="relative flex flex-col justify-between overflow-hidden bg-[#101827] p-7 text-white sm:p-10 lg:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#c59d5f]/20" />
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#c59d5f]/20" />

            <div className="relative z-10">
              <span className="rounded-full border border-[#c59d5f]/40 bg-[#c59d5f]/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e5c58e]">
                Premium Collection
              </span>

              <h2 className="mt-7 text-3xl font-bold leading-tight sm:text-4xl">
                Every Detail
                <br />
                <span className="text-[#d5b47c]">Matters.</span>
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-7 text-gray-300">
                Keep your vehicle listing accurate, attractive and ready for its
                next automotive enthusiast.
              </p>
            </div>

            {/* IMAGE */}
            <div className="relative z-10 my-10">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt={name || "Vehicle preview"}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="aspect-[4/3] w-full rounded-xl object-contain"
                  />
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-white/5 text-sm text-gray-400">
                    Vehicle image preview
                  </div>
                )}
              </div>

              <p className="mt-4 text-center text-xs text-gray-400">
                LIVE VEHICLE IMAGE PREVIEW
              </p>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#e5c58e]">
                Currently Editing
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {name || "Vehicle Information"}
              </h3>

              <p className="mt-1 text-sm text-gray-400">
                {currentBrand || "Automobile Brand"}
                {type ? ` • ${type}` : ""}
              </p>
            </div>
          </section>

          {/* RIGHT: UPDATE FORM */}
          <section className="p-6 sm:p-10 lg:p-12">
            <div className="mb-8 border-b border-gray-100 pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b58a4b]">
                Edit Vehicle Details
              </p>

              <h2 className="mt-2 text-2xl font-extrabold text-[#101827]">
                Vehicle Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Update the fields below and save your changes.
              </p>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-6">
              {/* NAME + BRAND */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="car-name"
                    className="mb-2 block text-sm font-semibold text-[#263246]"
                  >
                    Car Name *
                  </label>

                  <input
                    id="car-name"
                    type="text"
                    name="name"
                    defaultValue={name}
                    placeholder="e.g. BMW 5 Series"
                    required
                    maxLength={100}
                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="car-brand"
                    className="mb-2 block text-sm font-semibold text-[#263246]"
                  >
                    Brand Name *
                  </label>

                  <select
                    id="car-brand"
                    name="brandName"
                    defaultValue={currentBrand.toUpperCase()}
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                  >
                    <option value="">Select a Brand</option>
                    <option value="BMW">BMW</option>
                    <option value="MERCEDES-BENZ">Mercedes-Benz</option>
                    <option value="TESLA">Tesla</option>
                    <option value="TOYOTA">Toyota</option>
                    <option value="HONDA">Honda</option>
                    <option value="FORD">Ford</option>
                  </select>
                </div>
              </div>

              {/* TYPE + RATING */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="car-type"
                    className="mb-2 block text-sm font-semibold text-[#263246]"
                  >
                    Model / Type *
                  </label>

                  <input
                    id="car-type"
                    type="text"
                    name="type"
                    defaultValue={type}
                    placeholder="e.g. SUV, Sedan"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="car-rating"
                    className="mb-2 block text-sm font-semibold text-[#263246]"
                  >
                    Customer Rating *
                  </label>

                  <div className="relative">
                    <input
                      id="car-rating"
                      type="number"
                      name="rating"
                      min="0"
                      max="5"
                      step="0.1"
                      value={ratingValue}
                      onChange={(e) => setRatingValue(e.target.value)}
                      placeholder="0.0 - 5.0"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 pr-12 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                    />

                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#c59d5f]">
                      ★
                    </span>
                  </div>
                </div>
              </div>

              {/* PRICE */}
              <div>
                <label
                  htmlFor="car-price"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Vehicle Price *
                </label>

                <input
                  id="car-price"
                  type="text"
                  name="price"
                  defaultValue={price}
                  placeholder="e.g. $45,000"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                />
              </div>

              {/* IMAGE URL */}
              <div>
                <label
                  htmlFor="car-image"
                  className="mb-2 block text-sm font-semibold text-[#263246]"
                >
                  Vehicle Image URL *
                </label>

                <input
                  id="car-image"
                  type="url"
                  name="image"
                  defaultValue={image}
                  placeholder="Enter image URL (Optional)"
                  required
                  onChange={(e) => setImagePreview(e.target.value.trim())}
                  className="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3.5 text-sm outline-none transition focus:border-[#c59d5f] focus:bg-white focus:ring-4 focus:ring-[#c59d5f]/10"
                />

                <p className="mt-2 text-xs text-gray-400">
                  Paste a valid publicly accessible image URL.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-[#101827] px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-lg shadow-[#101827]/15 transition duration-300 hover:bg-[#b58a4b] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Updating...
                    </>
                  ) : (
                    <>
                      Save Changes
                      <span className="text-lg">→</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  disabled={loading}
                  className="rounded-xl border border-gray-200 px-6 py-4 text-sm font-semibold text-gray-600 transition hover:border-[#b58a4b] hover:text-[#b58a4b] disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>

              <p className="text-center text-xs text-gray-400">
                Your vehicle information will be saved to Abrars Automobile.
              </p>
            </form>
          </section>
        </div>

        {/* BOTTOM BRAND SIGNATURE */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 px-2 text-xs text-gray-400">
          <span>ABRARS AUTOMOBILE</span>
          <span className="font-medium tracking-widest text-[#b58a4b]">
            DRIVE YOUR DREAM
          </span>
        </div>
      </div>
    </main>
  );
};

export default UpdateProduct;
