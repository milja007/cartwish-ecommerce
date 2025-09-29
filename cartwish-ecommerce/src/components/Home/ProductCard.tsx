import "./ProductCard.css";
import iphone from "../../assets/iphone.jpg";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
const ProductCard = () => {
  return (
    <article className="product_card">
      <div className="product_image">
        <a href="product/1">
          <img src={iphone} alt="product image" />
        </a>
      </div>
      <div className="product_details">
        <h3 className="product_price">$999</h3>
        <p className="product_title">iphone 14 Pro</p>
        <footer className="align-center product_info_footer">
          <div className="align-center">
            <p className="align-center product_rating">
              <img src={star} alt="star" /> 5.0
            </p>
            <p className="product_review_count">120</p>
          </div>
          <button className="add_to_cart">
            <img src={basket} alt="basket" />
          </button>
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
