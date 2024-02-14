import { NavLink } from "react-router-dom";
import { FaHome, FaShoppingCart, FaUser, FaWpforms } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <nav>
        <NavLink href="/">
          <FaHome /> Home
        </NavLink>
        <NavLink href="/cart">
          <FaShoppingCart /> Cart
        </NavLink>
        <NavLink href="/login">
          <FaUser /> Sign In
        </NavLink>
        <NavLink href="/register">
          <FaWpforms /> Register
        </NavLink>
        <button>Logout</button>
      </nav>
    </header>
  );
};
export default Header;
