import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  return (
    <Link     to={`/category/${category._id}`}
      className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl duration-300 border"
    >
      <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
    </Link>
  );
};

export default CategoryCard;