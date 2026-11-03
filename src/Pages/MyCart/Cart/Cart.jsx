import React, { useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const Cart = ({ setCartItems, cartItems, item }) => {
  const [deleting, setDeleting] = useState(false);

  if (!item) return null;

  const { _id, name, price, image, type, rating, shortDescription } = item;

  const brandName = item.brandName || item.brand_name || "Premium Brand";

  const deleteBtn = async () => {
    const result = await Swal.fire({
      title: "Remove This Vehicle?",
      html: `
        <p style="color:#64748b;font-size:14px;line-height:1.7">
          Are you sure you want to remove
          <strong style="color:#172033">${name}</strong>
          from your collection?
        </p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove It",
      cancelButtonText: "Keep Vehicle",
      confirmButtonColor: "#b91c1c",
      cancelButtonColor: "#172033",
      reverseButtons: true,
      background: "#ffffff",
      color: "#172033",
      customClass: {
        popup: "rounded-3xl",
        confirmButton: "rounded-xl px-5 py-3",
        cancelButton: "rounded-xl px-5 py-3",
      },
    });

    if (!result.isConfirmed) return;

    try {
      setDeleting(true);

      const response = await fetch(`${API_URL}/brandCarts/${_id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || data.deletedCount === 0) {
        throw new Error(data.message || "Unable to remove this vehicle.");
      }

      // Remove deleted vehicle from current cart state
      setCartItems((previousItems) =>
        previousItems.filter((cart) => cart._id !== _id),
      );

      await Swal.fire({
        icon: "success",
        title: "Vehicle Removed!",
        text: `${name} has been removed from your collection.`,
        confirmButtonText: "Done",
        confirmButtonColor: "#b58a4b",
        background: "#ffffff",
        color: "#172033",
        customClass: {
          popup: "rounded-3xl",
          confirmButton: "rounded-xl px-7 py-3",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#172033",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_12px_45px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#172033] via-[#c59d5f] to-[#172033]"></div>

      <div className="grid grid-cols-1 md:grid-cols-[40%_60%]">
        {/* Vehicle Image */}
        <div className="relative flex min-h-[230px] items-center justify-center overflow-hidden bg-[#f5f6f8] p-5 sm:min-h-[280px] md:min-h-[300px]">
          <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-[#c59d5f]/10 blur-3xl"></div>

          {image ? (
            <img
              src={image}
              alt={name || "Vehicle"}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
              className="relative z-10 max-h-[240px] w-full object-contain transition-transform duration-700 group-hover:scale-105 md:max-h-[260px]"
            />
          ) : (
            <div className="relative z-10 text-center">
              <span className="text-6xl">🚘</span>
              <p className="mt-3 text-xs text-slate-400">
                Vehicle image unavailable
              </p>
            </div>
          )}

          {/* Image Badge */}
          <div className="absolute left-5 top-5 z-20 rounded-full border border-[#c59d5f]/30 bg-white/90 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9b713b] shadow-sm backdrop-blur">
            Premium Collection
          </div>

          <div className="absolute bottom-4 right-5 text-xs font-semibold uppercase tracking-widest text-slate-300">
            Abrars Automobile
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-9">
          <div>
            {/* Brand and Category */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#172033] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e5c58e]">
                {brandName}
              </span>

              {type && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {type}
                </span>
              )}
            </div>

            {/* Vehicle Name */}
            <h2 className="mt-5 text-2xl font-black tracking-tight text-[#172033] transition-colors duration-300 group-hover:text-[#a77c40] sm:text-3xl">
              {name || "Unnamed Vehicle"}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {shortDescription ||
                "Experience exceptional design, performance and comfort with this premium automobile."}
            </p>

            {/* Rating */}
            {rating !== undefined && rating !== null && rating !== "" && (
              <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                <span className="text-amber-500">★</span>
                <span className="text-sm font-bold text-slate-700">
                  {rating}
                </span>
                <span className="text-xs text-slate-400">Vehicle Rating</span>
              </div>
            )}
          </div>

          {/* Price and Actions */}
          <div className="mt-8 flex flex-col gap-5 border-t border-slate-100 pt-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Vehicle Price
              </p>

              <p className="mt-2 text-3xl font-black tracking-tight text-[#172033]">
                {price || "Price on request"}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Listed in your collection
              </p>
            </div>

            <button
              type="button"
              onClick={deleteBtn}
              disabled={deleting}
              className="group/delete inline-flex items-center justify-center gap-3 rounded-xl border border-red-100 bg-red-50 px-6 py-3.5 text-sm font-bold text-red-600 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {deleting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600 group-hover/delete:border-t-white"></span>
                  Removing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 11v5m4-5v5"
                    />
                  </svg>
                  Remove Vehicle
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Cart;
