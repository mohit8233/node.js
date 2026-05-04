import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border hover:shadow-xl duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>

        <p className="text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>

        <p className="text-green-600 font-bold text-xl mt-3">
          ₹{product.price}
        </p>

        <Link
          to={`/product/${product._id}`}
          className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;