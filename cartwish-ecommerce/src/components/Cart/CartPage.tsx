import "./CartPage.css";
import user from "../../assets/user.webp";
const CartPage = () => {
  return (
    <section className="align-center cart_page">
      <div className="align-center user_info">
        <img src={user} alt="user profile" />
        <div>
          <p className="user_name">Harley</p>
          <p className="user_email">harley@gmail.com</p>
        </div>
      </div>
      {/* cart table */}
      <table className="cart_bill">
        <tbody>
          <tr>
            <td>Subtotal</td>
            <td>$999</td>
          </tr>
          <tr>
            <td>Shipping Charge</td>
            <td>$5</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>$1004</td>
          </tr>
        </tbody>
      </table>
      <button className="search_button checkout_button">Checkout</button>
    </section>
  );
};

export default CartPage;
