import { createContext, Dispatch, SetStateAction } from "react";

interface CartItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  quantity: number;
}

interface CartContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: (product: any, quantity: number) => void;
  cart: CartItem[];
  removeFromCart: (id: string | number) => void;
  updateCart: (id: string | number, type: "increase" | "decrease") => void;
  setCart: Dispatch<SetStateAction<CartItem[]>>;
}

const cartContext = createContext<CartContextType | null>(null);

export default cartContext;
