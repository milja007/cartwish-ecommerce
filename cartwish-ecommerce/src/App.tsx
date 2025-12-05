import "./App.css";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useState, useEffect, useCallback } from "react";
import { getJwt, getUser } from "./services/userServices";
import setAuthToken from "./utils/setAuthToken";
import {
  addToCartAPI,
  decreaseProductAPI,
  getCartAPI,
  increaseProductAPI,
  removeFromCartAPI,
} from "./services/cartSevices";
import { ToastContainer, toast } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import cartContext from "./contexts/CartContext";

interface JwtPayload {
  exp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
interface Product {
  _id: string;
  title: string;
  price: number;
  stock: number;
  images: string[];
}

interface CartItem {
  product: Product;
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
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
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
    },
    [cart]
  );
  const removeFromCart = useCallback(
    (id: string | number) => {
      const oldCart = [...cart];
      const newCart = oldCart.filter((item) => item.product._id !== id);
      setCart(newCart);
      removeFromCartAPI(id).catch(() => {
        toast.error("Something went wrong");
        setCart(oldCart);
      });
    },
    [cart]
  );
  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        setCart(res.data);
      })
      .catch(() => toast.error("Something went wrong!"));
  }, []);

  const updateCart = useCallback(
    (id: number | string, type: "increase" | "decrease") => {
      const OldCart = [...cart];
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        setCart(updatedCart);
        increaseProductAPI(id).catch(() => {
          toast.error("Something went wrong");
          setCart(OldCart);
        });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        setCart(updatedCart);
        decreaseProductAPI(id).catch(() => {
          toast.error("Something went wrong");
          setCart(OldCart);
        });
      }
    },
    [cart]
  );
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user, getCart]);

  return (
    <UserContext.Provider value={user}>
      <cartContext.Provider
        value={{ addToCart, cart, removeFromCart, updateCart, setCart }}
      >
        <div className="app">
          <Navbar />
          <main>
            <ToastContainer position="bottom-right" />
            <Routing />
          </main>
        </div>
      </cartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
