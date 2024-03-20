import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaPhoneSquareAlt,
  FaShoppingCart,
  FaUser,
  FaWpforms,
  FaUserEdit,
} from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import "./Header.css";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cartContext.jsx";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">
              <FaHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <FaPeopleGroup />
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="">
              <FaPhoneSquareAlt />
              Contact
            </NavLink>
          </li>
        </ul>

        {user ? (
          <ul>
            <li>
              <p>Hello, {user.name} !</p>
            </li>
            <li>
              <NavLink to="/profile">
                <FaUserEdit /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart">
                <FaShoppingCart /> Cart
                {cart.length > 0 && (
                  <span class="cart-count-badge">
                    {cart.reduce(
                      (accumulator, item) => accumulator + item.quantity,
                      0
                    )}
                  </span>
                )}
              </NavLink>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <NavLink to="/login">
                <FaUser /> Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register">
                <FaWpforms /> Register
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};
export default Header;
