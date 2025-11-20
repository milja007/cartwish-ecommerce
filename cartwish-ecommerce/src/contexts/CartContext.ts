import { createContext } from "react";

interface CartItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  quantity: number;
}

interface CartContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: (product: any, quantity: number) => void;
  cart: CartItem[];
}

const cartContext = createContext<CartContextType | null>(null);

export default cartContext;
