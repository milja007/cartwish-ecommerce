import { Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import LogoutPage from "../Authentication/LogoutPage";

interface RoutingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: (product: any, quantity: number) => void;
}

const Routing = ({ addToCart }: RoutingProps) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/product/:id"
        element={<SingleProductPage addToCart={addToCart} />}
      />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<MyOrderPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default Routing;
