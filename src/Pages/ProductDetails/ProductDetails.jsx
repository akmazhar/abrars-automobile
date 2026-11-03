
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

import API_URL from "../../config/api";

const ProductDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  // Fetch Product Details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/product/${id}`);

        if (!response.ok) {
          throw new Error("Unable to fetch product details.");
        }

        const productData = await response.json();

        setData(productData);
      } catch (error) {
        console.error("Product Details Error:", error);

        Swal.fire(
          "Error!",
          error.message || "Failed to load product details.",
          "error"
        );
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
          result.message || "Unable to add this car to your cart."
        );
      }

      await Swal.fire(
        "Success!",
        "Your Car is nicely selected",
        "success"
      );
    } catch (error) {
      console.error("Add to Cart Error:", error);

      Swal.fire(
        "Error!",
        error.message || "Something went wrong.",
        "error"
      );
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Product Not Found
  if (!data?._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Product Not Found
          </h2>
          <p className="mt-2 text-gray-500">
            Sorry, the requested vehicle could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
      <div className="card lg:card-side bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full">
        <figure className="lg:w-1/2 bg-gray-200 p-4">
          <img
            src={data.image}
            alt={data.name || "Automobile"}
            className="rounded-xl object-contain h-80 lg:h-96 w-full"
          />
        </figure>

        <div className="card-body lg:w-1/2 p-8">
          <h2 className="card-title text-3xl font-extrabold text-slate-800 mb-2">
            {data.name}
          </h2>

          <p className="text-gray-500 font-medium italic mb-4">
            {data.shortDescription}
          </p>

          <div className="flex gap-3 mb-6">
            <span className="badge badge-primary p-3">
              {data.brandName || data.brand_name}
            </span>

            <span className="badge badge-neutral p-3">
              {data.type}
            </span>

            <span className="badge badge-warning text-white p-3">
              ⭐ {data.rating}
            </span>
          </div>

          <p className="text-3xl font-black text-green-600 mb-8">
            {data.price}
          </p>

          <div className="card-actions mt-auto">
            <button
              onClick={addToCartHandle}
              disabled={addingToCart}
              className="btn btn-block btn-success text-white text-lg shadow-lg hover:shadow-xl disabled:opacity-60"
            >
              {addingToCart ? "Adding to Cart..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;