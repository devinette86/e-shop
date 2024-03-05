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
        <div>
          <NavLink to="/">
            <FaHome /> Home
          </NavLink>
          <NavLink to="">
            <FaPeopleGroup />
            About Us
          </NavLink>
          <NavLink to="">
            <FaPhoneSquareAlt />
            Contact
          </NavLink>
        </div>
        <div>
          {user ? (
            <>
              Hello, {user.name} !
              <NavLink to="/cart">
                <FaShoppingCart /> Cart
                {cart.length > 0 && (
                  <span
                    style={{
                      width: "25px", // Set to the desired size
                      height: "25px", // Set to the desired size
                      borderRadius: "50%",
                      padding: "5px",
                      marginLeft: "2px",
                      color: "white",
                      backgroundColor: "violet",
                      display: "inline-block", // Ensures the element respects width and height
                    }}
                  >
                    {cart.reduce(
                      (accumulator, item) => accumulator + item.quantity,
                      0
                    )}
                  </span>
                )}
              </NavLink>
              <NavLink to="/profile">
                <FaUserEdit /> Profile
              </NavLink>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <FaUser /> Login
              </NavLink>
              <NavLink to="/register">
                <FaWpforms /> Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
