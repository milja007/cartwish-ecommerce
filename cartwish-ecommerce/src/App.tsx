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
import { checkoutAPI } from "./services/orderServices";
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

  const getCart = useCallback(async () => {
    try {
      const res = await getCartAPI();
      dispatch({ type: "GET_CART", payload: { products: res.data } });
      return res.data as CartItem[];
    } catch {
      toast.error("Something went wrong!");
      return null;
    }
  }, []);

  const addToCart = useCallback(
    (product: Product, quantity: number) => {
      const previousCart = [...cart];
      dispatch({
        type: "ADD_TO_CART",
        payload: { product, quantity },
      });
      addToCartAPI(product._id, quantity)
        .then(() => {
          toast.success("Product Added Succesfully");
          getCart();
        })
        .catch((err: unknown) => {
          const apiMessage =
            (
              err as {
                response?: { data?: { message?: string; error?: string } };
              }
            )?.response?.data?.message ||
            (
              err as {
                response?: { data?: { message?: string; error?: string } };
              }
            )?.response?.data?.error;
          toast.error(apiMessage ?? "Failed to Add Product");
          dispatch({ type: "REVERT_CART", payload: { cart: previousCart } });
        });
    },
    [cart, getCart]
  );
  const removeFromCart = useCallback(
    (id: string | number) => {
      const previousCart = [...cart];
      dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

      removeFromCartAPI(id)
        .then(() => getCart())
        .catch((err: unknown) => {
          const apiMessage =
            (
              err as {
                response?: { data?: { message?: string; error?: string } };
              }
            )?.response?.data?.message ||
            (
              err as {
                response?: { data?: { message?: string; error?: string } };
              }
            )?.response?.data?.error;
          toast.error(apiMessage ?? "Something went wrong");
          dispatch({ type: "REVERT_CART", payload: { cart: previousCart } });
        });
    },
    [cart, getCart]
  );
  const updateCart = useCallback(
    (id: number | string, type: "increase" | "decrease") => {
      const updatedCart = [...cart];
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === id
      );
      if (productIndex === -1) return;

      const previousCart = [...cart];
      if (type === "increase") {
        updatedCart[productIndex].quantity += 1;
        dispatch({ type: "GET_CART", payload: { products: updatedCart } });
        increaseProductAPI(id)
          .then(() => getCart())
          .catch((err: unknown) => {
            const apiMessage =
              (
                err as {
                  response?: { data?: { message?: string; error?: string } };
                }
              )?.response?.data?.message ||
              (
                err as {
                  response?: { data?: { message?: string; error?: string } };
                }
              )?.response?.data?.error;
            toast.error(apiMessage ?? "Something went wrong");
            dispatch({ type: "REVERT_CART", payload: { cart: previousCart } });
          });
      }
      if (type === "decrease") {
        updatedCart[productIndex].quantity -= 1;
        dispatch({ type: "GET_CART", payload: { products: updatedCart } });
        decreaseProductAPI(id)
          .then(() => getCart())
          .catch((err: unknown) => {
            const apiMessage =
              (
                err as {
                  response?: { data?: { message?: string; error?: string } };
                }
              )?.response?.data?.message ||
              (
                err as {
                  response?: { data?: { message?: string; error?: string } };
                }
              )?.response?.data?.error;
            toast.error(apiMessage ?? "Something went wrong");
            dispatch({ type: "REVERT_CART", payload: { cart: previousCart } });
          });
      }
    },
    [cart, getCart]
  );
  const checkout = useCallback(async () => {
    if (!cart.length) {
      toast.info("Košarica je prazna");
      return;
    }

    // Prije checkouta sync-aj košaricu s backendom da cijene/količine budu točne
    const refreshedCart = (await getCart()) ?? cart;

    const unavailableItem = refreshedCart.find(
      (item) => item.quantity > item.product.stock
    );

    if (unavailableItem) {
      toast.error(`Nema dovoljno zaliha za ${unavailableItem.product.title}`);
      return;
    }

    // Optimistički ispraznimo košaricu da se UI odmah osvježi;
    // ako API padne, vratit ćemo stari sadržaj.
    const previousCart = [...refreshedCart];
    dispatch({ type: "CLEAR_CART" });

    checkoutAPI()
      .then((res) => {
        toast.success(res?.data?.message ?? "Narudžba je zaprimljena");
        // Za svaki slučaj povuci svježi cart sa servera.
        getCart();
      })
      .catch((err: unknown) => {
        const apiMessage =
          (
            err as {
              response?: { data?: { message?: string; error?: string } };
            }
          )?.response?.data?.message ||
          (
            err as {
              response?: { data?: { message?: string; error?: string } };
            }
          )?.response?.data?.error;

        dispatch({ type: "REVERT_CART", payload: { cart: previousCart } });
        toast.error(apiMessage ?? "Nešto je pošlo po zlu");
      });
  }, [cart, getCart]);
  useEffect(() => {
    if (user) {
      getCart();
    }
  }, [user, getCart]);

  return (
    <UserContext.Provider value={user}>
      <cartContext.Provider
        value={{ addToCart, cart, removeFromCart, updateCart, checkout }}
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
