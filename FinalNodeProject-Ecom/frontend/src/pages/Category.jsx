import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getAllByCategoryId } from "../api";

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllByCategoryId(id).then((res) => {
      if (res.status) {
        setProducts(res.data);
      } else {
        alert(res.message);
      }
    });
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Category Products</h1>

      {products.length === 0 ? (
        <h2 className="text-center text-xl font-semibold">
          No Products Found
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;