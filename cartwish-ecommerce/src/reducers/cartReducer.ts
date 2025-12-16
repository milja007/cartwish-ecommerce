type CartProduct = {
  _id: string;
  title: string;
  price: number;
  stock: number;
  images: string[];
};

type CartItem = {
  product: CartProduct;
  quantity: number;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: { product: CartProduct; quantity: number } }
  | { type: "GET_CART"; payload: { products: CartItem[] } }
  | { type: "REVERT_CART"; payload: { cart: CartItem[] } }
  | { type: "REMOVE_FROM_CART"; payload: { id: string | number } };

const cartReducer = (cart: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedCart = [...cart];
      const { product, quantity } = action.payload;
      const productIndex = updatedCart.findIndex(
        (item) => item.product._id === product._id
      );

      if (productIndex === -1) {
        updatedCart.push({ product, quantity });
      }
      if (productIndex !== -1) {
        updatedCart[productIndex].quantity += quantity;
      }
      return updatedCart;
    }

    case "GET_CART":
      return action.payload.products;

    case "REVERT_CART":
      return action.payload.cart;
    case "REMOVE_FROM_CART": {
      const oldCart = [...cart];
      const newCart = oldCart.filter(
        (item) => item.product._id !== action.payload.id
      );
      return newCart;
    }
    default:
      return cart;
  }
};
export default cartReducer;
