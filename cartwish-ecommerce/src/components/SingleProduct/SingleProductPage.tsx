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
  const { id } = useParams();
  const { data, error, isLoading } = useData<Product>(`/products/${id}`);
  const [selectedImage, setSelectedImage] = useState(0);
  const imageUrls = data?.images.map(
    (img) => `http://localhost:8000/products/${img}`
  );
  return (
    <section className="align-center single_product">
      <div className="align-center">
        <div className="single_product_thumbnails">
          {imageUrls?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={data?.title}
              className={selectedImage === index ? "selected_image" : ""}
              onClick={() => setSelectedImage(index)}
            />
          ))}
        </div>
        {error && <em className="form_error">{error}</em>}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <img
            src={imageUrls?.[selectedImage]}
            alt={data?.title}
            className="single_product_display"
          />
        )}
      </div>
      <div className="single_product_details ">
        {error && <em className="form_error">{error}</em>}
        <h1 className="single_product_title">{data?.title}</h1>
        {error && <em className="form_error">{error}</em>}
        <p className="single_product_description">{data?.description}</p>
        {error && <em className="form_error">{error}</em>}
        <p className="single_product_price">${data?.price?.toFixed(2)}</p>
        <h2 className="quantity_title">Quantity:</h2>
        <div className="align-center quantity_input">
          <QuantityInput />
        </div>
        <button className="search_button add_cart">Add to Cart</button>
      </div>
    </section>
  );
};

export default SingleProductPage;
