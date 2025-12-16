import "./App.css";
import UserContext from "./contexts/UserContext";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useState, useEffect, useCallback, useReducer } from "react";

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
import cartReducer from "./reducers/cartReducer";

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

type CartItem = {
  product: Product;
  quantity: number;
};

setAuthToken(getJwt());
const App = () => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  // const [cart, setCart] = useState<CartItem[]>([]);
  const [cart, dispatch] = useReducer(cartReducer, [] as CartItem[]);
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
      dispatch({
        type: "ADD_TO_CART",
        payload: { product, quantity },
      });
      addToCartAPI(product._id, quantity)
        .then(() => {
          toast.success("Product Added Succesfully");
        })
        .catch(() => {
          toast.error("Failed to Add Product");
          dispatch({ type: "REVERT_CART", payload: { cart } });
        });
    },
    [cart]
  );
  const removeFromCart = useCallback(
    (id: string | number) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

      removeFromCartAPI(id).catch(() => {
        toast.error("Something went wrong");
        dispatch({ type: "REVERT_CART", payload: { cart } });
      });
    },
    [cart]
  );
  const getCart = useCallback(() => {
    getCartAPI()
      .then((res) => {
        dispatch({ type: "GET_CART", payload: { products: res.data } });
      })
      .catch(() => toast.error("Something went wrong!"));
  }, []);

  const updateCart = useCallback(
    (id: number | string, type: "increase" | "decrease") => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        dispatch({ type: "GET_CART", payload: { products: updatedCart } });
        increaseProductAPI(id).catch(() => {
          toast.error("Something went wrong");
          dispatch({ type: "REVERT_CART", payload: { cart } });
        });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        dispatch({ type: "GET_CART", payload: { products: updatedCart } });
        decreaseProductAPI(id).catch(() => {
          toast.error("Something went wrong");
          dispatch({ type: "REVERT_CART", payload: { cart } });
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
        value={{ addToCart, cart, removeFromCart, updateCart }}
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
