import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Routing from "./components/Routing/Routing";
import { useState, useEffect } from "react";
import { getUser } from "./services/userServices";

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
  };
  return (
    <div className="app">
      <Navbar user={user} cartCount={cart.length} />
      <main>
        <Routing addToCart={addToCart} />
      </main>
    </div>
  );
};

export default App;
