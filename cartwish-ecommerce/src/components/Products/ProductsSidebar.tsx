import "./ProductsSidebar.css";
import Link from "../Navbar/Link";
import rocket from "../../assets/rocket.png";
const ProductsSidebar = () => {
  return (
    <aside className="products_sidebar">
      <h2>Category</h2>
      <div className="category_links">
        <Link
          title="Electronics"
          link="products?category=electronics"
          emoji={rocket}
          sidebar={true}
        />
      </div>
    </aside>
  );
};

export default ProductsSidebar;
