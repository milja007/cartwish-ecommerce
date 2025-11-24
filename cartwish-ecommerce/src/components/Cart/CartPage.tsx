import "./CartPage.css";
import cartContext from "../../contexts/CartContext";
import UserContext from "../../contexts/UserContext";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useState, useEffect, useContext } from "react";
import { checkoutAPI } from "../../services/orderServices";
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
  const [subtotal, setSubtotal] = useState(0);
  const user = useContext(UserContext);
  const cartContextValue = useContext(cartContext);
  const removeFromCart = cartContextValue?.removeFromCart;
  const cart = cartContextValue?.cart;
  const updateCart = cartContextValue?.updateCart;
  const setCart = cartContextValue?.setCart;
  useEffect(() => {
    let total = 0;
    cart?.forEach((item: CartItem) => {
      total += item.product.price * item.quantity;
    });
    setSubtotal(total);
  }, [cart]);

  const checkout = () => {
    const oldCart = [...(cart ?? [])];
    setCart?.([]);
    checkoutAPI()
      .then(() => {
        toast.success("Order Placed Successfully!");
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setCart?.(oldCart);
      });
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
            <td>${subtotal}</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr className="cart_bill_final">
            <td>Total</td>
            <td>${subtotal + 5}</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button" onClick={checkout}>
        Checkout
      </button>
    </section>
  );
};

export default CartPage;
