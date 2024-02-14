import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <NavLink href="/cart">
        <FaShoppingCart /> Cart
      </NavLink>
      <NavLink href="/login">
        <FaUser /> Sign In
      </NavLink>
    </header>
  );
};
export default Header;
