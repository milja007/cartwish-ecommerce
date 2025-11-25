import { Routes, Route } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProductPage from "../SingleProduct/SingleProductPage";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import LogoutPage from "../Authentication/LogoutPage";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<SingleProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/orders" element={<MyOrderPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/logout" element={<LogoutPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
