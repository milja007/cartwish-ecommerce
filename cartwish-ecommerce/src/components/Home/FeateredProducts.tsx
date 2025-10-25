import "./FeateredProducts.css";
import ProductCard from "../Products/ProductCard";
const FeateredProducts = () => {
  return (
    <section className="featered_products">
      <h2>Featered Products</h2>
      <div className="featered_products_list align-center">
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default FeateredProducts;
