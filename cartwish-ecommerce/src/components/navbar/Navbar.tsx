import "./Navbar.css";
import rocket from "../../assets/rocket.png";
import star from "../../assets/glowing-star.png";
import idButton from "../../assets/id-button.png";
import memo from "../../assets/memo.png";
import order from "../../assets/basket.png";
import lock from "../../assets/locked.png";
import LinkWithIcon from "./LinkWithIcon";
import { NavLink } from "react-router-dom";
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
        <LinkWithIcon title="Home" link="/" emoji={rocket} sidebar={false} />
        <LinkWithIcon
          title="Products"
          link="/products"
          emoji={star}
          sidebar={false}
        />
        <LinkWithIcon
          title="Login"
          link="/login"
          emoji={idButton}
          sidebar={false}
        />
        <LinkWithIcon
          title="SignUp"
          link="/signup"
          emoji={memo}
          sidebar={false}
        />
        <LinkWithIcon
          title="My Orders"
          link="/orders"
          emoji={order}
          sidebar={false}
        />
        <LinkWithIcon
          title="Logout"
          link="/logout"
          emoji={lock}
          sidebar={false}
        />
        <NavLink to="/cart" className="align-center">
          Cart <p className="align-center cart_counts">0</p>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
