import "./ProductsList.css";
import { useEffect } from "react";
import apiClient from "../../utils/api-client";
import ProductCard from "./ProductCard";
import { useState } from "react";

interface Product {
  _id: string;
  name?: string;
  price?: number;
  image?: string;
  rating?: number;
  [key: string]: unknown;
}

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    apiClient
      .get("/products")
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "An error occurred");
      });
  }, []);
  return (
    <section className="products_list_section">
      <header className="align_center products_list_header">
        <h2>Products</h2>
        <select name="sort" id="" className="products_sorting">
          <option value="">Relevance</option>
          <option value="price desc">Price HIGH to LOW</option>
          <option value="price asc">Price LOW to HIGH</option>
          <option value="rate desc">Rate HIGH to LOW</option>
          <option value="rate asc">Rate LOW to HIGH</option>
        </select>
      </header>
      <div className="products_list">
        {error && <em className="form_error">{error}</em>}
        {products.map((product) => (
          <ProductCard key={product._id} />
        ))}
      </div>
    </section>
  );
};

export default ProductsList;
