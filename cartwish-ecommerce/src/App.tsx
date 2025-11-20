import "./App.css";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useState, useEffect } from "react";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import { addToCartAPI, getCartAPI } from "./services/cartSevices";
import { ToastContainer, toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";

interface JwtPayload {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface CartItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  quantity: number;
}
setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  useEffect(() => {
    try {
      {
        const jwtUser = getUser();
        if (
          jwtUser &&
          "exp" in jwtUser &&
          jwtUser.exp &&
          Date.now() >= jwtUser.exp * 1000
        ) {
          localStorage.removeItem("token");
          location.reload();
        } else if (jwtUser) {
          setUser(jwtUser as JwtPayload);
        }
      }
    } catch {
      // Prešutno ignoriši greške ako token ne postoji ili je nevažeći
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (product: any, quantity: number) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(
      (item) => item.product._id === product._id
    );
    if (productIndex === -1) {
      updatedCart.push({ product, quantity });
    }
    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += quantity;
    }
    setCart(updatedCart);
    addToCartAPI(product._id, quantity)
      .then(() => {
        toast.success("Product Added Succesfully");
      })
      .catch(() => {
        toast.error("Failed to Add Product");
        setCart(cart);
      });
  };
  const getCart = () => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch(() => toast.error("Something went wrong!"));
  };
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      <div className="app">
        <Navbar cartCount={cart.length} />
        <main>
          <ToastContainer position="bottom-right" />
          <Routing addToCart={addToCart} cart={cart} />
        </main>
      </div>
    </UserContext.Provider>
  );
};

export default App;
