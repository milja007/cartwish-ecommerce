import "./ProductsSidebar.css";
import LinkWithIcon from "../Navbar/LinkWithIcon";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../utils/api-client";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const ProductsSidebar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    apiClient
      .get("/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "An error occurred");
      });
  }, []);
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        {error && <em className="form_error">{error}</em>}
        {categories.map((category) => (
          <LinkWithIcon
            key={category._id}
            title={category.name}
            link={`products?category=${category._id}`}
            emoji={`http://localhost:8000/category/${category.image}`}
            sidebar={true}
          />
        ))}
      </div>
    </aside>
  );
};

export default ProductsSidebar;
