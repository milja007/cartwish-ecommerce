import "./CartPage.css";
import UserContext from "../../contexts/UserContext";
import remove from "../../assets/remove.png";
import Table from "../Common/Table";
import QuantityInput from "../SingleProduct/QuantityInput";
import { useState, useEffect, useContext } from "react";

interface CartItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  product: any;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
}

const CartPage = ({ cart }: CartProps) => {
  const [subtotal, setSubtotal] = useState(0);
  const user = useContext(UserContext);
  console.log(user);
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.product.price * item.quantity;
    });
    setSubtotal(total);
  }, [cart]);
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
          {cart.map(({ product, quantity }) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td className="align-center table_quantity_input">
                <QuantityInput quantity={quantity} stock={product.stock} />
              </td>
              <td>${quantity * product.price}</td>
              <td>
                <img
                  src={remove}
                  alt="remove icon"
                  className="cart_remove_icon"
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
      <button className="search_button checkout_button">Checkout</button>
    </section>
  );
};

export default CartPage;
