import "./ProductCard.css";
import star from "../../assets/white-star.png";
import basket from "../../assets/basket.png";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import cartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    price: number;
    images: string | string[];
    stock: number;
    reviews: {
      rate: number;
      counts: number;
    };
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const cartContextValue = useContext(cartContext);
  const addToCart = cartContextValue?.addToCart;
  const user = useContext(UserContext);
  return (
    <article className="product_card">
      <div className="product_image">
        <NavLink to={`/product/${product?._id}`}>
          <img
            src={`http://localhost:8000/products/${product?.images[0]}`}
            alt="product image"
          />
        </NavLink>
      </div>
      <div className="product_details">
        <h3 className="product_price">${product?.price}</h3>
        <p className="product_title">{product?.title}</p>
        <footer className="align-center product_info_footer">
          <div className="align-center">
            <p className="align-center product_rating">
              <img src={star} alt="star" /> {product?.reviews.rate}
            </p>
            <p className="product_review_count">{product?.reviews.counts}</p>
          </div>
          {product?.stock > 0 && user && addToCart && (
            <button
              className="add_to_cart"
              onClick={() => addToCart(product, 1)}
            >
              <img src={basket} alt="basket" />
            </button>
          )}
        </footer>
      </div>
    </article>
  );
};

export default ProductCard;
