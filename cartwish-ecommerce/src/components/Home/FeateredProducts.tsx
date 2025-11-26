import "./FeateredProducts.css";
import ProductCard from "../Products/ProductCard";
import useData from "../../hooks/useData";
import ProductCardSkeleton from "../Products/ProductCardSkeleton";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
  stock: number;
  reviews: {
    rate: number;
    counts: number;
  };
}

const FeateredProducts = () => {
  const { data, isLoading, error } = useData<Product[]>("/products/featured");
  // const { productsArrays } = data.products;
  console.log(data);
  return (
    <section className="featered_products">
      <h2>Featered Products</h2>
      <div className="featered_products_list align-center">
        {isLoading && [1, 2, 3].map((n) => <ProductCardSkeleton key={n} />)}
        {error && <em className="error_form">{error}</em>}
        {data &&
          data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default FeateredProducts;
