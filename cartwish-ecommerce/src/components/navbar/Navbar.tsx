import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/basket.png";
import lock from "../../assets/locked.png";
import Link from "./Link";
const Navbar = () => {
  return (
    <nav className="navbar align-center">
      <div className="align-center">
        <h1 className="navbar_heading">CartWish</h1>
        <form className="navbar_form align-center">
          <input
            type="text"
            className="navbar_search"
            placeholder="Search Products"
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </form>
      </div>
      <div className="navbar_links align-center">
        <Link title="Home" link="/" emoji={rocket} />
        <Link title="Products" link="/products" emoji={star} />
        <Link title="Login" link="/login" emoji={idButton} />
        <Link title="SignUp" link="/signup" emoji={memo} />
        <Link title="My Orders" link="/orders" emoji={order} />
        <Link title="Logout" link="/logout" emoji={lock} />
        <a href="/cart" className="align-center">
          Cart <p className="align-center cart_counts">0</p>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
