import "./Footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        You can also find us on: <FaInstagram />
        <FaFacebook />
      </p>
      <p>E-shop &copy; {currentYear}</p>
    </footer>
  );
};
export default Footer;
