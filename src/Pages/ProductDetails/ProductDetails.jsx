import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5001/product/${id}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, [id]);

    const addToCartHandle = () => {
        const oneCart = {
            image: data.image,
            name: data.name,
            brandName: data.brandName,
            price: data.price,
            type: data.type,
        };

        fetch('http://localhost:5001/brandCarts', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(oneCart),
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                Swal.fire('Success!', 'Your Car is nicely selected', 'success');
            }
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
            <div className="card lg:card-side bg-white shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full">
                <figure className="lg:w-1/2 bg-gray-200 p-4">
                    <img src={data.image} alt={data.name} className="rounded-xl object-contain h-80 lg:h-96 w-full" />
                </figure>
                <div className="card-body lg:w-1/2 p-8">
                    <h2 className="card-title text-3xl font-extrabold text-slate-800 mb-2">{data.name}</h2>
                    <p className="text-gray-500 font-medium italic mb-4">{data.shortDescription}</p>
                    
                    <div className="flex gap-3 mb-6">
                        <span className="badge badge-primary p-3">{data.brandName}</span>
                        <span className="badge badge-neutral p-3">{data.type}</span>
                        <span className="badge badge-warning text-white p-3">⭐ {data.rating}</span>
                    </div>

                    <p className="text-3xl font-black text-green-600 mb-8">{data.price}</p>

                    <div className="card-actions mt-auto">
                        <button onClick={addToCartHandle} className="btn btn-block btn-success text-white text-lg shadow-lg hover:shadow-xl">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;