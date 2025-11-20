import "./SingleProductPage.css";
// import iphoneImage from "../../assets/iphone.jpg";
// import iphoneProImage from "../../assets/iphone-14-pro.webp";
// import macImage from "../../assets/mac-system-cut.jfif";
// import userImage from "../../assets/user.webp";
import { useState } from "react";
import QuantityInput from "./QuantityInput";
import useData from "../../hooks/useData";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import cartContext from "../../contexts/CartContext";
import { useContext } from "react";
interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}

// const product = {
//   id: 1,
//   title: "Product Title",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime aliquid rerum a? Fugiat soluta facilis deleniti voluptatibus ab architecto dolores a, vero, beatae veniam error doloribus quia laudantium? Error fuga consequuntur quia accusantium? Consequatur modi laboriosam saepe culpa, ab atque.",
//   price: 9.99,
//   images: [iphoneImage, iphoneProImage, macImage, userImage],
//   stock: 10,
// };

const SingleProductPage = () => {
  const cartContextValue = useContext(cartContext);
  const addToCart = cartContextValue?.addToCart;
  const { id } = useParams();
  const {
    data: products,
    error,
    isLoading,
  } = useData<Product>(`/products/${id}`);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  return (
    <section className="align-center single_product">
      {error && <em className="form_error">{error}</em>}
      {isLoading && <LoadingSpinner />}
      {products && (
        <>
          <div className="align-center">
            <div className="single_product_thumbnails">
              {products.images.map((image, index) => (
                <img
                  key={index}
                  src={`http://localhost:8000/products/${image}`}
                  alt={products?.title}
                  className={selectedImage === index ? "selected_image" : ""}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>

            <img
              src={`http://localhost:8000/products/${products.images?.[selectedImage]}`}
              alt={products?.title}
              className="single_product_display"
            />
          </div>
          <div className="single_product_details ">
            <h1 className="single_product_title">{products?.title}</h1>
            <p className="single_product_description">
              {products?.description}
            </p>
            <p className="single_product_price">
              ${products?.price?.toFixed(2)}
            </p>
            <h2 className="quantity_title">Quantity:</h2>
            <div className="align-center quantity_input">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                stock={products.stock}
              />
            </div>
            <button
              className="search_button add_cart"
              onClick={() => addToCart?.(products, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default SingleProductPage;
