import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5001"
).replace(/\/+$/, "");

const CarCard = ({ car = {}, onDelete }) => {
  const {
    _id,
    name,
    rating,
    price,
    type,
    image,
    brand_name,
    brandName,
    shortDescription,
  } = car;

  const displayBrand = brand_name || brandName;

  const [deleting, setDeleting] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Delete Vehicle
  const handleDelete = async () => {
    if (!_id || deleting) return;

    const result = await Swal.fire({
      title: "Delete This Vehicle?",
      text: `Are you sure you want to delete ${
        name || "this car"
      }? This action cannot be undone.`,
      icon: "warning",
      background: "#0f172a",
      color: "#ffffff",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Keep Vehicle",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#334155",
      reverseButtons: true,
      customClass: {
        popup: "rounded-2xl border border-white/10",
        confirmButton: "rounded-lg px-5 py-3",
        cancelButton: "rounded-lg px-5 py-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(`${API_BASE_URL}/car/${_id}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.deletedCount < 1) {
        throw new Error(data.message || "Unable to delete this vehicle.");
      }

      await Swal.fire({
        title: "Vehicle Deleted!",
        text: `${name || "Car"} has been deleted successfully.`,
        icon: "success",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#d97706",
        customClass: {
          popup: "rounded-2xl border border-white/10",
        },
      });

      if (typeof onDelete === "function") {
        onDelete(_id);
      }
    } catch (error) {
      console.error("Delete error:", error);

      await Swal.fire({
        title: "Delete Failed!",
        text: error.message || "Something went wrong.",
        icon: "error",
        background: "#0f172a",
        color: "#ffffff",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b101a] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-400/50 hover:shadow-2xl hover:shadow-amber-400/10">
      {/* Top Gold Accent */}
      <div className="absolute left-0 top-0 z-20 h-[2px] w-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-transparent transition-all duration-700 group-hover:w-full" />

      {/* Image Section */}
      <div className="relative h-60 overflow-hidden bg-slate-900 sm:h-64">
        {!imageError && image ? (
          <img
            src={image}
            alt={name || "Automobile"}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-16 w-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13l2-5h14l2 5M5 13v5m14-5v5M3 13h18M7 18h.01M17 18h.01"
                />
              </svg>
              <p className="mt-3 text-sm">Image unavailable</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b101a] via-black/10 to-black/30" />

        {/* Brand Badge */}
        {displayBrand && (
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/60 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur-lg sm:text-xs">
            {displayBrand}
          </span>
        )}

        {/* Type Badge */}
        {type && (
          <span className="absolute right-4 top-4 rounded-full border border-amber-400/30 bg-amber-400/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shadow-lg sm:text-xs">
            {type}
          </span>
        )}

        {/* Rating */}
        {rating !== undefined && rating !== null && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur-lg">
            <span className="text-amber-400">★</span>
            <span className="font-bold">{rating}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-amber-400/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Car Name */}
        <div className="mb-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
            Premium Collection
          </p>

          <h2 className="line-clamp-1 text-xl font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400 sm:text-2xl">
            {name || "Unnamed Automobile"}
          </h2>
        </div>

        {/* Description */}
        <p className="mb-6 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-400">
          {shortDescription ||
            "Discover exceptional performance, refined comfort and an extraordinary driving experience."}
        </p>

        {/* Price Section */}
        <div className="mb-6 flex items-center justify-between gap-3 border-y border-white/10 py-5">
          <div className="min-w-0">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Starting Price
            </p>

            <p className="truncate text-2xl font-black tracking-tight text-amber-400 sm:text-3xl">
              {price ?? "On Request"}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Category
            </p>

            <p className="text-sm font-bold text-slate-200">
              {type || "Automobile"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto space-y-3">
          {/* View Details */}
          <Link
            to={_id ? `/productDetails/${_id}` : "#"}
            onClick={(e) => {
              if (!_id) e.preventDefault();
            }}
            className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 px-4 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-400/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-400/20 ${
              !_id ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            View Details
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          {/* Edit & Delete */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={_id ? `/updateProduct/${_id}` : "#"}
              onClick={(e) => {
                if (!_id) e.preventDefault();
              }}
              className={`flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-sm font-bold text-slate-200 transition-all duration-300 hover:border-amber-400/50 hover:bg-amber-400/10 hover:text-amber-400 ${
                !_id ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M4 20l4.5-1 11-11a2.5 2.5 0 00-3.5-3.5l-11 11L4 20z"
                />
              </svg>
              Edit
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || !_id}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-3 text-sm font-bold text-red-400 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Deleting
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CarCard;
