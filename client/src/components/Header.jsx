import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaWpforms,
  FaUserEdit,
} from "react-icons/fa";
import { useAuth } from "../context/auth";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header>
      <nav>
        <NavLink to="/">
          <FaHome /> Home
        </NavLink>

        {user ? (
          <>
            <NavLink to="/cart">
              <FaShoppingCart /> Cart
            </NavLink>
            <NavLink to="/profile">
              <FaUserEdit /> Profile
            </NavLink>
            Hello, {user.name} !<button onClick={logout}>Logout</button>
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
      </nav>
    </header>
  );
};
export default Header;
