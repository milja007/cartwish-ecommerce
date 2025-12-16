import "./CartPage.css";
import cartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useContext, useMemo, memo } from "react";
import { toast } from "react-toastify";

type CartProduct = {
  _id: string;
  title: string;
  price: number;
  stock: number;
};

type CartItem = {
  product: CartProduct;
  quantity: number;
};

const CartPage = () => {
  const user = useContext(UserContext);
  const cartContextValue = useContext(cartContext);
  const removeFromCart = cartContextValue?.removeFromCart;
  const cart = cartContextValue?.cart;
  const updateCart = cartContextValue?.updateCart;
  const checkout = cartContextValue?.checkout;
  const subTotal = useMemo(() => {
    let total = 0;
    cart?.forEach((item: CartItem) => {
      total += item.product.price * item.quantity;
    });
    return total;
  }, [cart]);

  const handleCheckout = () => {
    if (!checkout) {
      toast.error("Checkout trenutno nije dostupan");
      return;
    }
    checkout();
  };
  return (
    <section className="align-center cart_page">
      <div className="align-center user_info">
        <img
          src={`http://localhost:8000/profile/${user?.profilePic}`}
          alt="user profile"
        />
        <div>
          <p className="user_name">Name:{user?.name}</p>
          <p className="user_email">Email:{user?.email}</p>
        </div>
      </div>
      {/* cart table */}
      <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
        <tbody>
          {(cart ?? []).map(({ product, quantity }: CartItem) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align-center table_quantity_input">
                <QuantityInput
                  quantity={quantity}
                  stock={product.stock}
                  setQuantity={(type, productId) => {
                    updateCart?.(productId, type);
                  }}
                  cartPage={true}
                  productId={product._id}
                />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
                  onClick={() => removeFromCart?.(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>${subTotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subTotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button
        className="search_button checkout_button"
        onClick={handleCheckout}
        disabled={!cart || cart.length === 0}
      >
        Checkout
      </button>
    </section>
  );
};

export default memo(CartPage);
