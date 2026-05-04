import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api";


const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getSingleProduct(id).then((res) => {
      if (res.status) {
        setProduct(res.data);
      } else {
        alert(res.message);
      }
    });
  }, [id]);

  if (!product) {
    return (
      <h2 className="text-center text-2xl font-bold mt-10">
        Loading...
      </h2>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-xl"
        />

        <h1 className="text-3xl font-bold mt-5">{product.name}</h1>

        <p className="text-gray-600 mt-3">{product.description}</p>

        <p className="text-green-600 font-bold text-2xl mt-4">
          ₹{product.price}
        </p>
      </div>
    </div>
  );
};

export default Product;