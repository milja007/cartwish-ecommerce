import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import SignupPage from "./components/Authentication/SignupPage";
// import HomePage from "./components/Home/HomePage";
// import ProductsPage from "./components/Products/ProductsPage";
// import SingleProductPage from "./components/SingleProduct/SingleProductPage";
// import CartPage from "./components/Cart/CartPage";
// import LoginPage from "./components/Authentication/LoginPage";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* <HomePage /> */}
        {/* <ProductsPage /> */}
        {/* <SingleProductPage /> */}
        {/* <CartPage /> */}
        {/* <MyOrderPage /> */}
        {/* <LoginPage /> */}
        <SignupPage />
      </main>
    </div>
  );
};

export default App;
